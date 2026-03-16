import { rooms } from '../rooms.js';
import { updateRoomEnded } from '../db/queries.js';

export async function handleLeaveRoom(io, socket) {
  const code = socket.data.roomCode;
  const userId = socket.data.userId;

  if (!code || !rooms[code]) return;

  rooms[code].players = rooms[code].players.filter((player) => player.userId !== userId);

  socket.leave(code);

  socket.data.roomCode = null;

  if (rooms[code].players.length === 0) {
    try {
      await updateRoomEnded(code);
    } catch (err) {
      console.error('DB Error failed to update room ended_at', err);
    } finally {
      delete rooms[code];
    }
  } else {
    if (rooms[code].hostUserId === userId) {
      rooms[code].hostUserId = rooms[code].players[0].userId;
    }
    const publicPlayers = rooms[code].players.map((p) => ({
      userId: p.userId,
      name: p.name,
      character: p.character,
    }));
    const lobbyUpdatedPayload = {
      roomCode: code,
      players: publicPlayers,
      hostUserId: rooms[code].hostUserId,
      roomStatus: rooms[code].roomStatus,
    };
    io.to(code).emit('lobbyUpdated', lobbyUpdatedPayload);
  }
}
