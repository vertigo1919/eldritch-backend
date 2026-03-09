import { handleJoinRoom } from './handleJoinRoom.js';
import { handleStartGame } from './handleStartGame.js';
import { handleSubmitAnswer } from './handleSubmitAnswer.js';
import { handleDisconnect } from './handleDisconnect.js';

export function loadSocketHandlers(io, socket) {
  socket.on('joinRoom', (payload) => handleJoinRoom(io, socket, payload));
  socket.on('startGame', (payload) => handleStartGame(io, socket, payload));
  socket.on('submitAnswer', (payload) => handleSubmitAnswer(io, socket, payload));
  socket.on('disconnect', () => handleDisconnect(io, socket));
}
