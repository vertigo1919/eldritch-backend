import { rooms } from '../rooms.js';

export function handleRequestLobby(io, socket) {
  const code = socket.data.roomCode;

  if (!code) {
    socket.emit('lobbyError', { message: 'You are not in room', code: 'NO_ROOM' });
    return;
  }

  if (!rooms[code]) {
    socket.emit('lobbyError', { message: 'Room not found', code: 'ROOM_NOT_FOUND' });
    return;
  }

  const publicPlayers = rooms[code].players.map((player) => ({
    userId: player.userId,
    name: player.name,
    character: player.character,
  }));

  const lobbyUpdatedPayload = {
    roomCode: code,
    hostUserId: rooms[code].hostUserId,
    players: publicPlayers,
    roomStatus: rooms[code].roomStatus,
  };

  socket.emit('lobbyUpdated', lobbyUpdatedPayload);
}
