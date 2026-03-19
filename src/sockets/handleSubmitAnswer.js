import { rooms } from '../rooms.js';
import { resolveRound } from '../logic/resolveRound.js';
import { saveUser } from '../db/queries.js';

export async function handleSubmitAnswer(io, socket, payload) {
  //Get socket details
  const code = socket.data.roomCode;
  const userId = socket.data.userId;
  const name = socket.data.name;

  //Destructure payload
  let { questionId, answer } = payload;

  //Guards
  if (rooms[code].roomStatus !== 'in-game') {
    socket.emit('answerError', {
      message: 'Room is not in-game',
      code: 'WRONG_STATUS',
    });
  }

  if (rooms[code].roundDeadline < Date.now()) {
    socket.emit('answerError', {
      message: 'The answer deadline has passed',
      code: 'DEADLINE_PASSED',
    });
    return;
  }

  if (rooms[code].currentQuestionId !== questionId) {
    socket.emit('answerError', {
      message: 'Question ID does not match current round',
      code: 'WRONG_QUESTION',
    });
    return;
  }

  if (rooms[code].answers[userId]) {
    socket.emit('answerError', {
      message: 'You have already submitted an answer this round',
      code: 'ALREADY_ANSWERED',
    });
    return;
  }

  // save the answer
  rooms[code].answers[userId] = answer;

  try {
    await saveUser({ user_id: userId, display_name: name });
  } catch (err) {
    console.error('Failed to update last_seen on answer', err);
  }

  // if all players reply before timer we reoslve the round
  // N.B. if timer expires we resolve the round too (see handle Start)
  if (Object.keys(rooms[code].answers).length === rooms[code].players.length) {
    clearTimeout(rooms[code].timerId);
    resolveRound(io, code);
  }
}
