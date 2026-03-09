import { saveUser, createRoomRecord } from '../db/queries.js';
import { generateRoomCode } from '../utils/generateRoomCode.js';
import { rooms } from '../rooms.js';
import { MAX_PLAYERS } from '../constants.js';

export async function handleJoinRoom(io, socket, payload) {
  // if we recive a roomCode it means that are trying to join
  // if not that they are creating a room

  let { name, roomCode: incomingCode, userId } = payload;

  if (!name) {
    socket.emit('joinError', { message: 'Name is required', code: 'NO_NAME' });
    return;
  }

  if (!userId) {
    socket.emit('joinError', { message: 'User is required', code: 'NO_USER' });
    return;
  }

  await saveUser({ id: userId, name: name });

  let code = incomingCode?.trim().toUpperCase();

  const task = code ? 'joinRoom' : 'createRoom';

  // CREATE ROOM FLOW
  if (task === 'createRoom') {
    code = generateRoomCode();

    while (rooms[code]) {
      code = generateRoomCode();
    }

    try {
      await createRoomRecord(code);
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
      players: [{ userId: userId, socketId: socket.id, name: name }],
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
    rooms[code].players.push({ userId: userId, socketId: socket.id, name: name });
  }

  socket.join(code);

  socket.data.name = name;
  socket.data.userId = userId;
  socket.data.roomCode = code;

  const publicPlayers = rooms[code].players.map((player) => ({
    userId: player.userId,
    name: player.name,
  }));

  const lobbyUpdatedPayload = {
    roomCode: code,
    hostUserId: rooms[code].hostUserId,
    players: publicPlayers,
    roomStatus: 'lobby',
  };

  io.to(code).emit('lobbyUpdated', lobbyUpdatedPayload);
}
