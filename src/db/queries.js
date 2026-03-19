import { db } from './connection.js';
import format from 'pg-format';

export async function saveUser({ user_id, display_name }) {
  // Inserts or updates a user record in the USERS table using their UUID and display name.
  await db.query(
    `INSERT INTO users (user_id, display_name) 
     VALUES ($1, $2) 
     ON CONFLICT (user_id) DO UPDATE SET
     displayname = EXCLUDED.displayname,
     last_seen = CURRENT_TIMESTAMP`,
    [user_id, display_name]
  );
  // added on conflict for returning users
}

export async function getMonsterForStage(stageNumber) {
  // Retrieves a single monster object from the MONSTERS table corresponding to the current game stage.
  // N.B. stages for now are 1,2,3 and map to easy medium hard mosnter difficulty_level
  const difficulties = ['easy', 'medium', 'hard'];
  const difficulty = difficulties[stageNumber - 1];

  const { rows } = await db.query(
    `SELECT monster_id, name, max_hp, attack_damage, image_name 
     FROM monsters WHERE difficulty_level = $1 ORDER BY RANDOM() LIMIT 1`,
    [difficulty]
  );
  return rows[0];
}

export async function getRandomQuestions(quantity, difficulty) {
  // Selects a specific quantity of random rows from the QUESTIONS table that match the requested difficulty level.
  const response = await db.query(
    `SELECT * FROM questions WHERE difficulty = $1 ORDER BY RANDOM() LIMIT $2`,
    [difficulty, quantity]
  );

  const body = response.rows;
  return body;
}

export async function saveMatch({ roomCode, hostUserId, startedAt, result }) {
  // Inserts a completed game's high-level stats into the MATCHES table and returns the newly generated match_id
  const response = await db.query(
    `INSERT INTO matches (room_code, host_user_id, started_at, result, ended_at) 
     VALUES ($1, $2, TO_TIMESTAMP($3 / 1000.0), $4, CURRENT_TIMESTAMP)
     RETURNING match_id`,
    [roomCode, hostUserId, startedAt, result]
  );

  return response.rows;
}

export async function saveMatchPlayers(playersArray) {
  // Inserts individual player accuracy scores for a specific match into the MATCH_PLAYERS junction table.
  // called at: gameEnded, once per match, after saveMatch
  const formattedRows = playersArray.map((p) => [p.match_id, p.user_id, p.accuracy]);
  await db.query(
    format(`INSERT INTO match_players (match_id, user_id, accuracy) VALUES %L`, formattedRows)
  );
}

export async function createRoomRecord(roomCode, hostUserId) {
  // Inserts a new row into the ROOMS table to log the creation time of a specific room code.
  await db.query(`INSERT INTO rooms (code, host_user_id) VALUES ($1, $2)`, [roomCode, hostUserId]);
}

export async function updateRoomEnded(roomCode) {
  // Updates an existing row in the ROOMS table with the final timestamp when that game concludes. update existing row in ROOMS table where code = roomCode, set ended_at = current timestamp
  // called at: gameEnded
  await db.query(`UPDATE rooms SET ended_at = CURRENT_TIMESTAMP WHERE code = $1`, [roomCode]);
}

export async function getAllCharacters() {
  // Function content: to be filled in
  // Retrieves the complete list of available characters from the CHARACTERS table for the frontend selection API GET /api/characters
}

export async function getCharacter(characterId) {
  // Function content: to be replaced (currently returns mocks)
  // Retrieves a specific character's stats from the CHARACTERS table using their character_id for backend game initialization.
  // we still need this (even if the charcter selection screen feteches via API) because backend needs to load character from BE not from FE

  const { rows } = await db.query(`SELECT * FROM characters WHERE character_id = $1`, [
    characterId,
  ]);
  return rows[0];
}

// export async function updateUserQuestions({
//   user_id,
//   total_questions_attempted,
//   hard_questions_correct,
//   medium_questions_correct,
//   easy_questions_correct,
// }) {
//   await db.query(
//     `UPDATE users SET total_questions_attempted = total_questions_attempted+$1, hard_questions_correct= hard_questions_correct+$2, medium_questions_correct=medium_questions_correct+$3, easy_questions_correct=easy_questions_correct+$4 WHERE user_id =$5 `,
//     [
//       total_questions_attempted,
//       hard_questions_correct,
//       medium_questions_correct,
//       easy_questions_correct,
//       user_id,
//     ]
//   );
// }

export async function updateUserQuestions(playersArray) {
  const formattedUsers = playersArray.map((p) => [
    p.totalQuestions,
    p.hardCorrectAnswers,
    p.mediumCorrectAnswers,
    p.easyCorrectAnswers,
    p.userId,
  ]);

  await Promise.all(
    formattedUsers.map((array) =>
      db.query(
        `UPDATE users SET total_questions_attempted = total_questions_attempted+$1, hard_questions_correct= hard_questions_correct+$2, medium_questions_correct=medium_questions_correct+$3, easy_questions_correct=easy_questions_correct+$4 WHERE user_id =$5`,
        array
      )
    )
  );
}
