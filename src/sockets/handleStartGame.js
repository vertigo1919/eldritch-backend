import { rooms } from '../rooms.js';
import { DIFFICULTY_MAP, MIN_PLAYERS, QUESTIONS_PER_MONSTER } from '../constants.js';
import { getMonsterForStage, getRandomQuestions } from '../db/queries.js';
import { startNextRound } from '../logic/startNextRound.js';

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
  rooms[code].startedAt = Date.now();
  rooms[code].currentStage = 1;
  rooms[code].roundNumber = 0; // it's startNextRound()'s task to increment this of 1

  // calculate and set team HP
  rooms[code].teamHp = rooms[code].players.reduce((teamHP, player) => {
    teamHP += player.character.base_sanity;
    return teamHP;
  }, 0);

  // Load first monster
  rooms[code].monster = await getMonsterForStage(1);
  rooms[code].monsterHp = rooms[code].monster.max_hp;

  // Load questions in memory

  const stageDifficulty = DIFFICULTY_MAP[rooms[code].currentStage - 1];

  const monsterQuestions = await getRandomQuestions(QUESTIONS_PER_MONSTER, stageDifficulty);
  rooms[code].questions = monsterQuestions;
  rooms[code].questionIds = monsterQuestions.map((question) => question.question_id);
  rooms[code].currentQuestionIndex = -1; // // it's startNextRound()'s task to increment this index to 0

  // initialise empty answer object
  rooms[code].answers = {};
  startNextRound(io, code);
}
