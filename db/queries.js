const db = require('./connection');
const format = require('pg-format');

exports.saveUser = async ({ user_id, display_name }) => {
  await db.query(
    format(`INSERT INTO users(user_id, display_name) VALUES %L`, [user_id, display_name])
  );
};

// export async function getMonster(_id) {
//   // for now it returns a hardcoded monster, to update to query DB
//   return { id: 1, name: 'TestUser', max_hp: 100, attack_damage: 20, image_url: '' };
// }

exports.getRandomQuestions = async (difficulty, quantity) => {
  const response = await db.query(
    `SELECT * FROM questions WHERE difficulty=$1 ORDER BY RANDOM() LIMIT $2`,
    [difficulty, quantity]
  );
  const body = response.rows;

  return body;
};

exports.saveMatch = async ({ roomCode, hostUserId, monsterId, startedAt, endedAt, result }) => {
  await db.query(
    format(
      `INSERT INTO matches(roomCode, hostUserId, monsterId, startedAt, endedAt, result) VALUES %L`,
      [roomCode, hostUserId, monsterId, startedAt, endedAt, result]
    )
  );

  const response = await db.query(`SELECT match_id FROM matches`);

  const body = response.rows;

  return body;
};
exports.saveMatchPlayers = async ({ matchId, userId, accuracy }) => {
  await db.query(
    format(`INSERT INTO match_players(matchId, userId, accuracy) VALUES %L`, [
      matchId,
      userId,
      accuracy,
    ])
  );
};

exports.createRoomRecord = async (roomCode) => {
  // Function content: to be filled in
  // Inserts a new row into the ROOMS table to log the creation time of a specific room code.
  // insert new row into ROOMS table with code = roomCode and created_at = current timestamp
  // called at: joinRoom
  await db.query(format(`INSERT INTO rooms(code) VALUES %L`, roomCode));
};

export async function updateRoomEnded(roomCode) {
  // to be filled in
  // Updates an existing row in the ROOMS table with the final timestamp when that game concludes. update existing row in ROOMS table where code = roomCode, set ended_at = current timestamp
  // called at: gameEnded
  await db.query(`UPDATE rooms SET ended_at = CURRENT_TIMESTAMP WHERE code = $1`, [roomCode]);
}

export async function getCharacter(characterId) {
  // Function content: to be replaced (currently returns mocks)
  // Retrieves a specific character's stats from the CHARACTERS table using their character_id for backend game initialization.
  // we still need this (even if the charcter selection screen feteches via API) because backend needs to load character from BE not from FE

  const mockCharacters = [
    {
      character_id: 1,
      name: 'The Scholar',
      image_name: 'character1.png',
      description: 'A seeker of forbidden knowledge.',
      bio: 'Once a professor at Miskatonic, they saw too much in the restricted archives.',
      base_attack: 5,
      base_sanity: 150,
      difficulty_scaling: 1,
    },
    {
      character_id: 2,
      name: 'The Investigator',
      image_name: 'character2.png',
      description: 'Used to dealing with the unknown.',
      bio: 'A former private eye who specializes in missing persons cases that "dont exist."',
      base_attack: 10,
      base_sanity: 120,
      difficulty_scaling: 1,
    },
    {
      character_id: 3,
      name: 'The Occultist',
      image_name: 'character3.png',
      description: 'Dabbles in the dark arts.',
      bio: 'They realized early on that to fight the darkness, one must understand its language.',
      base_attack: 15,
      base_sanity: 90,
      difficulty_scaling: 2,
    },
    {
      character_id: 4,
      name: 'The Veteran',
      image_name: 'character4.png',
      description: 'Hardened by past conflicts.',
      bio: 'Survived a trench assault that defied the laws of physics. They haven’t slept since.',
      base_attack: 20,
      base_sanity: 70,
      difficulty_scaling: 2,
    },
  ];

  return mockCharacters.find((c) => c.character_id === Number(characterId));
}

db.query(`SELECT * FROM questions WHERE question_id>80`).then((res) => console.log(res.rows));

// getRandomQuestions('easy', 3).then((questions) => console.log(questions));
