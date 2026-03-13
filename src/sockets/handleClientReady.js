import { rooms } from '../rooms.js';
import { startNextRound } from '../logic/startNextRound.js';

export function handleClientReady(io, socket) {
  const code = socket.data.roomCode;
  const userId = socket.data.userId;

  if (!rooms[code]) return;
  if (rooms[code].roomStatus !== 'in-game') return;
  if (!rooms[code].waitingForHostReady) return;

  // we rely only on the host to be able to move everyone to the next question
  // in order to avoid a slow connection to stall the game
  if (userId !== rooms[code].hostUserId) return;

  rooms[code].waitingForHostReady = false;
  startNextRound(io, code);
}
