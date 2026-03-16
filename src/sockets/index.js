import { handleJoinRoom } from './handleJoinRoom.js';
import { handleStartGame } from './handleStartGame.js';
import { handleSubmitAnswer } from './handleSubmitAnswer.js';
import { handleDisconnect } from './handleDisconnect.js';
import { handleLeaveRoom } from './handleLeaveRoom.js';
import { handleRequestLobby } from './handleRequestLobby.js';

export function loadSocketHandlers(io, socket) {
  socket.on('joinRoom', (payload) => handleJoinRoom(io, socket, payload));
  socket.on('startGame', () => handleStartGame(io, socket));
  socket.on('submitAnswer', (payload) => handleSubmitAnswer(io, socket, payload));
  socket.on('leaveRoom', () => handleLeaveRoom(io, socket));
  socket.on('disconnect', () => handleDisconnect(io, socket));
  socket.on('requestLobby', () => handleRequestLobby(io, socket));
}
