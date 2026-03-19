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

  // basic guards
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

  // check if user is already in a room
  let existingRoomCodeFound = null;
  for (const key in rooms) {
    const isUserInThisRoom = rooms[key].players.some((player) => player.userId === userId);
    if (isUserInThisRoom) {
      existingRoomCodeFound = key;
      break;
    }
  }

  // logic for reconnection and duplicate tabs
  if (existingRoomCodeFound) {
    if (code === existingRoomCodeFound) {
      // we find the user by user ID and we update the socket id with the new id followign the reconnection
      const player = rooms[code].players.find((p) => p.userId === userId);
      const isDisconnecting = rooms[code].disconnectTimers && rooms[code].disconnectTimers[userId];

      // is it a second tab?
      if (player && !isDisconnecting) {
        const oldSocket = io.sockets.sockets.get(player.socketId);
        if (oldSocket && oldSocket.connected && oldSocket.id !== socket.id) {
          // if so block
          socket.emit('joinError', {
            message: 'You are already playing in this room in another tab.',
            code: 'ALREADY_IN_THIS_ROOM',
          });
          return;
        }
      }

      // RECONNECTION FLOW

      // Clear grace period timer if running
      if (isDisconnecting) {
        console.log(`SUCCESS! User ${userId} returned within the grace period.`);
        clearTimeout(rooms[code].disconnectTimers[userId]);
        delete rooms[code].disconnectTimers[userId];
      }

      socket.join(code);
      socket.data.name = name;
      socket.data.userId = userId;
      socket.data.roomCode = code;
      if (player) {
        player.socketId = socket.id; // Update  player profile with the new socket ID
      }

      // resync players array
      const publicPlayers = rooms[code].players.map((p) => ({
        userId: p.userId,
        name: p.name,
        character: p.character,
      }));

      // tell front-end they are in lobby
      socket.emit('lobbyUpdated', {
        roomCode: code,
        hostUserId: rooms[code].hostUserId,
        players: publicPlayers,
        roomStatus: rooms[code].roomStatus,
      });

      // if the game is in course fast foward to game by emitting roundStarted
      if (rooms[code].roomStatus === 'in-game') {
        const currentQuestionIndex = rooms[code].currentQuestionIndex;
        const question = rooms[code].questions[currentQuestionIndex];

        socket.emit('roundStarted', {
          monster: {
            name: rooms[code].monster.name,
            hp: rooms[code].monsterHp,
            maxHp: rooms[code].monster.max_hp,
            image_name: rooms[code].monster.image_name,
          },
          question: {
            id: question.question_id,
            prompt: question.prompt,
            options: {
              a: question.option_a,
              b: question.option_b,
              c: question.option_c,
              d: question.option_d,
            },
          },
          gameState: {
            teamHp: rooms[code].teamHp,
            maxTeamHp: rooms[code].maxTeamHp,
            roundNumber: rooms[code].roundNumber,
            roundDeadline: rooms[code].roundDeadline,
          },
        });
      }
      return;
    } else {
      socket.emit('joinError', {
        message: `You are already playing in room ${existingRoomCodeFound}. Please finish or leave that game first.`,
        code: 'IN_DIFFERENT_ROOM',
      });
      return;
    }
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
    let isRoomCreated = false;

    let attempt = 0;

    while (!isRoomCreated && attempt < 5) {
      code = generateRoomCode();
      attempt++;
      if (rooms[code]) continue; // i.e. generate a new code
      // optimistic insertion
      try {
        await createRoomRecord(code, userId);
        isRoomCreated = true;
      } catch (err) {
        // '23505' is the PostgreSQL error code for a Unique Violation (duplicate Primary Key), i.e. room with this code already exists in DB
        if (err.code === '23505') {
          console.warn(`Room code ${code} already exists in DB. Retrying...`);
          continue;
        } else {
          console.error('DB Error creating room:', err);
          socket.emit('joinError', {
            message: 'Unable to create room record in DB',
            code: 'SERVER_ERROR',
          });
        }
        return;
      }
    }

    if (!isRoomCreated) {
      console.error('Failed to generate a unique room code after 5 attempts.');
      socket.emit('joinError', {
        message: 'Server is busy, unable to create a room. Please try again.',
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
