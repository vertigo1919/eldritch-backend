import { saveUser, createRoomRecord } from '../db/queries.js';
import { generateRoomCode } from '../utils/generateRoomCode.js';
import { rooms } from '../rooms.js';
import { MAX_PLAYERS } from '../constants.js';
import { getCharacter } from '../db/queries.js';

export async function handleJoinRoom(io, socket, payload) {
  // if we recive a roomCode it means that are trying to join
  // if not that they are creating a room

  let { name, roomCode: incomingCode, userId, characterId } = payload;

  let code = incomingCode?.trim().toUpperCase();

  if (!name) {
    socket.emit('joinError', { message: 'Name is required', code: 'NO_NAME' });
    return;
  }

  if (!userId) {
    socket.emit('joinError', { message: 'User is required', code: 'NO_USER' });
    return;
  }

  if (!characterId) {
    socket.emit('joinError', { message: 'Character selection is required', code: 'NO_CHARACTER' });
    return;
  }

  let existingRoomCodeFound = null;
  for (const key in rooms) {
    const isUserInThisRoom = rooms[key].players.some((player) => player.userId === userId);
    if (isUserInThisRoom) {
      existingRoomCodeFound = key;
      break;
    }
  }

  if (existingRoomCodeFound) {
    if (code === existingRoomCodeFound) {
      socket.emit('joinError', {
        message: 'You are already in this room.',
        code: 'ALREADY_IN_THIS_ROOM',
      });
    } else {
      socket.emit('joinError', {
        message: `You are already playing in room ${existingRoomCodeFound}. Please finish or leave that game first.`,
        code: 'IN_DIFFERENT_ROOM',
      });
    }
    return;
  }

  let selectedCharacter;
  try {
    selectedCharacter = await getCharacter(characterId);

    if (!selectedCharacter) {
      socket.emit('joinError', {
        message: 'Invalid character selected',
        code: 'INVALID_CHARACTER',
      });
      return;
    }
  } catch (err) {
    console.error('DB Error:', err);
    return socket.emit('joinError', {
      message: 'Could not fetch character',
      code: 'SERVER_ERROR',
    });
  }

  try {
    await saveUser({ user_id: userId, display_name: name });
  } catch (err) {
    console.error('DB Error:', err);
    return socket.emit('joinError', { message: 'Could not write to DB', code: 'SERVER_ERROR' });
  }

  const task = code ? 'joinRoom' : 'createRoom';

  // CREATE ROOM FLOW
  if (task === 'createRoom') {
    code = generateRoomCode();

    while (rooms[code]) {
      code = generateRoomCode();
    }

    try {
      await createRoomRecord(code, userId);
    } catch {
      socket.emit('joinError', {
        message: 'Unable to create room record in DB',
        code: 'SERVER_ERROR',
      });
      return;
    }

    const roomObject = {
      code: code,
      hostUserId: userId,
      roomStatus: 'lobby',
      players: [
        {
          userId: userId,
          socketId: socket.id,
          name: name,
          character: selectedCharacter,
          correctAnswers: 0,
          hardCorrectAnswers: 0,
          mediumCorrectAnswers: 0,
          easyCorrectAnswers: 0,
          totalQuestions: 0,
        },
      ],
    };

    rooms[code] = roomObject;
  }

  // JOIN ROOM FLOW
  if (task === 'joinRoom') {
    if (!rooms[code]) {
      socket.emit('joinError', { message: 'Room not found', code: 'ROOM_NOT_FOUND' });
      return;
    }

    if (rooms[code].roomStatus === 'in-game') {
      socket.emit('joinError', { message: 'Game already started', code: 'ROOM_IN_GAME' });
      return;
    }

    if (rooms[code].roomStatus === 'ended') {
      socket.emit('joinError', { message: 'Game has already ended', code: 'ROOM_ENDED' });
      return;
    }

    if (rooms[code].roomStatus !== 'lobby') {
      socket.emit('joinError', { message: 'Unexpected room status value', code: 'SERVER_ERROR' });
      return;
    }

    if (rooms[code].players.length >= MAX_PLAYERS) {
      socket.emit('joinError', {
        message: `The maximum number of players is (${MAX_PLAYERS}) and it's already been reached`,
        code: 'ROOM_FULL',
      });
      return;
    }

    rooms[code].players.push({
      userId: userId,
      socketId: socket.id,
      name: name,
      character: selectedCharacter,
      correctAnswers: 0,
      hardCorrectAnswers: 0,
      mediumCorrectAnswers: 0,
      easyCorrectAnswers: 0,
      totalQuestions: 0,
    });
  }

  socket.join(code);

  socket.data.name = name;
  socket.data.userId = userId;
  socket.data.roomCode = code;

  const publicPlayers = rooms[code].players.map((player) => ({
    userId: player.userId,
    name: player.name,
    character: player.character,
  }));

  const lobbyUpdatedPayload = {
    roomCode: code,
    hostUserId: rooms[code].hostUserId,
    players: publicPlayers,
    roomStatus: 'lobby',
  };

  // console.log('player joined room', {
  //   socketId: socket.id,
  //   userId: socket.data.userId,
  //   name: socket.data.name,
  //   roomCode: socket.data.roomCode,
  // });

  io.to(code).emit('lobbyUpdated', lobbyUpdatedPayload);
}
