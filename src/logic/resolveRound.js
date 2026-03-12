import { rooms } from '../rooms.js';
import {
  getMonsterForStage,
  getRandomQuestions,
  saveMatch,
  saveMatchPlayers,
  updateRoomEnded,
} from '../db/queries.js';

import {
  QUESTIONS_PER_MONSTER,
  DIFFICULTY_MAP,
  TOTAL_STAGES,
  ROOM_CLEANUP_DELAY_MS,
} from '../constants.js';
import { startNextRound } from './startNextRound.js';
import { calculateAccuracy } from '../utils/calculateAccuracy.js';

export async function resolveRound(io, code) {
  // INTIALISATION
  clearTimeout(rooms[code].timerId);

  const currentQuestionIndex = rooms[code].currentQuestionIndex;
  const currentQuestion = rooms[code].questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.correct_option;

  let totalMonsterDamage = 0;

  let totalTeamDamage = 0;

  let playerResults = [];

  // CHECK ANSWERS AND UPDATE TEAM AND MONSTER HP

  for (let player of rooms[code].players) {
    player.totalQuestions++;

    const playerAnswer = rooms[code].answers[player.userId];
    const isAnswerCorrect = playerAnswer === correctAnswer;

    // if player has won round
    if (isAnswerCorrect) {
      player.correctAnswers++;
      totalMonsterDamage += player.character.base_attack;
    }

    // if monster has won round
    else {
      totalTeamDamage += rooms[code].monster.attack_damage;
    }

    let playerResult = {
      userId: player.userId,
      name: player.name,
      answer: playerAnswer,
      isCorrect: isAnswerCorrect,
      correctAnswers: player.correctAnswers,
      totalQuestions: player.totalQuestions,
    };

    playerResults.push(playerResult);
  }

  rooms[code].monsterHp -= totalMonsterDamage;
  rooms[code].teamHp -= totalTeamDamage;
  if (rooms[code].monsterHp < 0) rooms[code].monsterHp = 0;
  if (rooms[code].teamHp < 0) rooms[code].teamHp = 0;

  // GAME BRANCHING: 1) GAMEOVER (defeat or vicotory) or 2) LEVEL UP 3) NEXT ROUND
  const isOutOfQuestions =
    rooms[code].currentQuestionIndex >= rooms[code].questions.length - 1 &&
    rooms[code].monsterHp > 0;

  const isDefeat = rooms[code].teamHp === 0 || isOutOfQuestions;
  const isVictory = rooms[code].monsterHp === 0 && rooms[code].currentStage === TOTAL_STAGES;
  const isGameOver = isDefeat || isVictory;
  const result = isVictory ? 'victory' : 'defeat';

  let reason = '';
  if (isVictory) {
    reason = 'monster_defeated';
  } else if (rooms[code].teamHp === 0) {
    reason = 'team_hp_zero';
  } else {
    reason = 'out_of_questions';
  }

  const baseResultPayload = {
    roundNumber: rooms[code].roundNumber,
    questionId: currentQuestion.question_id,
    correctOption: correctAnswer,
    playerResults: playerResults,
    teamDamageTaken: totalTeamDamage,
    monsterDamageTaken: totalMonsterDamage,
    teamHpAfter: rooms[code].teamHp,
    monsterHpAfter: rooms[code].monsterHp,
    isFinalRound: isGameOver,
  };

  // 1) GAME OVER FLOW
  if (isGameOver) {
    rooms[code].roomStatus = 'ended';
    io.to(code).emit('roundResult', baseResultPayload);

    const perPlayerAccuracyArray = calculateAccuracy(rooms[code].players);

    const gameEndedPayload = {
      result: result,
      reason: reason,
      monsterId: rooms[code].monster.monster_id,
      teamHpFinal: rooms[code].teamHp,
      monsterHpFinal: rooms[code].monsterHp,
      perPlayerAccuracy: perPlayerAccuracyArray,
    };

    io.to(code).emit('gameEnded', gameEndedPayload);

    try {
      const matchResult = await saveMatch({
        roomCode: code,
        hostUserId: rooms[code].hostUserId,
        startedAt: rooms[code].startedAt,
        result: result,
      });

      const match_id = matchResult[0].match_id;

      await saveMatchPlayers(
        perPlayerAccuracyArray.map((p) => ({
          match_id: match_id,
          user_id: p.userId,
          accuracy: p.accuracy,
        }))
      );
    } catch (err) {
      console.error('Failed to save match to DB', { code, result, err });
    }

    setTimeout(async () => {
      if (!rooms[code]) return;

      try {
        await updateRoomEnded(code);
      } catch (err) {
        console.error('DB Error: Failed to update room ended_at on timeout', { code, err });
      } finally {
        delete rooms[code];
      }
    }, ROOM_CLEANUP_DELAY_MS);
  }

  // 2) NEXT MONSTER FLOW
  else if (rooms[code].monsterHp === 0) {
    rooms[code].currentStage++;

    // load new monster
    rooms[code].monster = await getMonsterForStage(rooms[code].currentStage);
    rooms[code].monsterHp = rooms[code].monster.max_hp;

    // Load new questions in memory
    const newDifficulty = DIFFICULTY_MAP[rooms[code].currentStage - 1];
    const monsterQuestions = await getRandomQuestions(QUESTIONS_PER_MONSTER, newDifficulty);
    rooms[code].questions = monsterQuestions;
    rooms[code].questionIds = monsterQuestions.map((question) => question.question_id);

    // new stage resets
    rooms[code].currentQuestionIndex = -1; // // it's startNextRound()'s task to increment this index to 0
    rooms[code].currentQuestionId = null;
    rooms[code].answers = {};

    const roundResultNextStagePayload = {
      ...baseResultPayload,
      isNextStage: true,
      nextMonster: rooms[code].monster,
      nextStage: rooms[code].currentStage,
    };

    io.to(code).emit('roundResult', roundResultNextStagePayload);

    startNextRound(io, code);
  }

  // 3)  NEXT ROUND FLOW
  else {
    rooms[code].answers = {};
    io.to(code).emit('roundResult', baseResultPayload);
    startNextRound(io, code);
  }
}
