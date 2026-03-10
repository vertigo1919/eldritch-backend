import { rooms } from '../rooms.js';
import { MIN_PLAYERS } from '../constants.js';
import { QUESTIONS_PER_MONSTER } from '../constants.js';
import { getMonsterForStage } from '../db/queries.js';
import { getRandomQuestions } from '../db/queries.js';
import { ROUND_DURATION_MS } from '../constants.js';
import { resolveRound } from './resolveRound.js';

export async function handleStartGame(io, socket) {
  //Get socket details
  const code = socket.data.roomCode;
  const name = socket.data.name;
  const userId = socket.data.userId;

  console.log('handleStartGame called', code, name, userId);

  // GUARDS
  if (rooms[code].hostUserId !== userId) {
    socket.emit('startError', { message: 'Only the host can start the game', code: 'NOT_HOST' });
    return;
  }

  if (rooms[code].roomStatus !== 'lobby') {
    socket.emit('startError', {
      message: 'Room is not in lobby state',
      code: 'WRONG_STATUS',
    });
    return;
  }

  if (rooms[code].players.length < MIN_PLAYERS) {
    socket.emit('startError', {
      message: `At least ${MIN_PLAYERS} player(s) required to start`,
      code: 'NOT_ENOUGH_PLAYERS',
    });
    return;
  }

  // Set initial game state
  rooms[code].roomStatus = 'in-game';
  rooms[code].currentStage = 1;
  rooms[code].roundNumber = 1;

  // calculate and set team HP
  rooms[code].teamHp = rooms[code].players.reduce((teamHP, player) => {
    teamHP += player.character.base_sanity;
    return teamHP;
  }, 0);

  // Load first monster
  rooms[code].monster = await getMonsterForStage(1);
  rooms[code].monsterHp = rooms[code].monster.max_hp;

  // Load questions in memory
  const monsterQuestions = await getRandomQuestions(QUESTIONS_PER_MONSTER, 'easy');
  rooms[code].questionIds = monsterQuestions.map((question) => question.question_id);
  rooms[code].currentQuestionIndex = 0;
  rooms[code].currentQuestionId = rooms[code].questionIds[0];

  // set quetions timer: we need timout to resolve round in BE and deadline timestamp to send FE
  rooms[code].roundDeadline = Date.now() + ROUND_DURATION_MS;

  rooms[code].timerId = setTimeout(() => {
    resolveRound(io, code);
  }, ROUND_DURATION_MS);

  // initialise empty answer object
  rooms[code].answers = {};

  // emit roundStarted - NB we must not send the correct answer, it stays in backend
  const firstQuestion = monsterQuestions[0];

  const roundStartedPayload = {
    monster: {
      name: rooms[code].monster.name,
      hp: rooms[code].monsterHp,
      maxHp: rooms[code].monster.max_hp,
      image: rooms[code].monster.image,
    },
    question: {
      prompt: firstQuestion.prompt,
      options: {
        a: firstQuestion.option_a,
        b: firstQuestion.option_b,
        c: firstQuestion.option_c,
        d: firstQuestion.option_d,
      },
    },
    gameState: {
      teamHp: rooms[code].teamHp,
      roundNumber: rooms[code].roundNumber,
      roundDeadline: rooms[code].roundDeadline,
    },
  };

  io.to(code).emit('roundStarted', roundStartedPayload);
}
