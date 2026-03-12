import { rooms } from '../rooms.js';
import { resolveRound } from './resolveRound.js';
import { ROUND_DURATION_MS } from '../constants.js';

export function startNextRound(io, code) {
  rooms[code].roundNumber++;
  rooms[code].currentQuestionIndex++;

  const currentQuestionIndex = rooms[code].currentQuestionIndex;
  const questionId = rooms[code].questions[currentQuestionIndex].question_id;
  rooms[code].currentQuestionId = questionId;

  rooms[code].answers = {};

  // start timer: we need roundDeadline property for FE to display countdown and timeout to know when to resolveRound()
  rooms[code].roundDeadline = Date.now() + ROUND_DURATION_MS;

  rooms[code].timerId = setTimeout(() => {
    resolveRound(io, code);
  }, ROUND_DURATION_MS);

  // emit roundStarted - NB we must not send the correct answer, it stays in backend
  const question = rooms[code].questions[currentQuestionIndex];

  const roundStartedPayload = {
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
  };

  io.to(code).emit('roundStarted', roundStartedPayload);
}
