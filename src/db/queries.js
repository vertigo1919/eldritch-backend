// these are all the SQL query function the backend needs for the game
// For now they return mock data
// Yeray is working on rewriting them to query the database

export async function saveUser({ user_id: _id, display_name: _display_name }) {
  // Function content: to be filled in
  // Inserts or updates a user record in the USERS table using their UUID and display name.
  // data format: { user_id: uuid, display_name: string }
}

export async function getMonsterForStage(stageNumber) {
  // Function content: to be replaced (currently returns mocks)
  // Retrieves a single monster object from the MONSTERS table corresponding to the current game stage.
  // N.B. stages for now are 1,2,3 and map to easy medium hard mosnter difficulty_level

  const mockMonsters = [
    {
      monster_id: 1,
      name: 'Skeleton Knight',
      max_hp: 80,
      attack_damage: 10,
      image_name: '',
      difficulty_level: 'easy',
    },
    {
      monster_id: 2,
      name: 'Crypt Warden',
      max_hp: 120,
      attack_damage: 15,
      image_name: '',
      difficulty_level: 'medium',
    },
    {
      monster_id: 3,
      name: 'Eldritch Horror',
      max_hp: 160,
      attack_damage: 20,
      image_name: '',
      difficulty_level: 'hard',
    },
  ];

  return mockMonsters[stageNumber - 1];
}

export async function getRandomQuestions(_quantity, _difficulty) {
  // Function content: to be replaced (currently returns mocks)
  // Selects a specific quantity of random rows from the QUESTIONS table that match the requested difficulty level.

  const allQuestions = [
    {
      question_id: 1,
      prompt: 'What is 2+2?',
      option_a: '3',
      option_b: '4',
      option_c: '5',
      option_d: '6',
      correct_option: 'b',
      difficulty: 'easy',
      category: 'math',
    },

    {
      question_id: 2,
      prompt: 'What is 5−2?',
      option_a: '2',
      option_b: '3',
      option_c: '4',
      option_d: '5',
      correct_option: 'b',
      difficulty: 'easy',
      category: 'math',
    },
    {
      question_id: 3,
      prompt: 'Capital of France?',
      option_a: 'Berlin',
      option_b: 'Madrid',
      option_c: 'Paris',
      option_d: 'Rome',
      correct_option: 'c',
      difficulty: 'easy',
      category: 'geography',
    },
    {
      question_id: 4,
      prompt: 'What color is the sky on a clear day?',
      option_a: 'Blue',
      option_b: 'Green',
      option_c: 'Red',
      option_d: 'Yellow',
      correct_option: 'a',
      difficulty: 'easy',
      category: 'general',
    },
    {
      question_id: 5,
      prompt: 'Which is an even number?',
      option_a: '3',
      option_b: '5',
      option_c: '8',
      option_d: '9',
      correct_option: 'c',
      difficulty: 'easy',
      category: 'math',
    },
    {
      question_id: 6,
      prompt: 'How many days in a week?',
      option_a: '5',
      option_b: '6',
      option_c: '7',
      option_d: '8',
      correct_option: 'c',
      difficulty: 'easy',
      category: 'general',
    },

    // difficulty 2 (medium)
    {
      question_id: 7,
      prompt: 'What is 12÷3?',
      option_a: '3',
      option_b: '4',
      option_c: '5',
      option_d: '6',
      correct_option: 'b',
      difficulty: 'medium',
      category: 'math',
    },
    {
      question_id: 8,
      prompt: 'H2O is the chemical formula for?',
      option_a: 'Oxygen',
      option_b: 'Hydrogen',
      option_c: 'Water',
      option_d: 'Salt',
      correct_option: 'c',
      difficulty: 'medium',
      category: 'science',
    },
    {
      question_id: 9,
      prompt: 'Largest planet in our solar system?',
      option_a: 'Earth',
      option_b: 'Jupiter',
      option_c: 'Mars',
      option_d: 'Venus',
      correct_option: 'b',
      difficulty: 'medium',
      category: 'science',
    },
    {
      question_id: 10,
      prompt: 'Binary of decimal 2?',
      option_a: '10',
      option_b: '11',
      option_c: '01',
      option_d: '00',
      correct_option: 'a',
      difficulty: 'medium',
      category: 'tech',
    },
    {
      question_id: 11,
      prompt: 'Prime number?',
      option_a: '9',
      option_b: '15',
      option_c: '17',
      option_d: '21',
      correct_option: 'c',
      difficulty: 'medium',
      category: 'math',
    },

    // difficulty 3 (hard)
    {
      question_id: 12,
      prompt: 'Derivative of x²?',
      option_a: 'x',
      option_b: '2x',
      option_c: 'x²',
      option_d: '2',
      correct_option: 'b',
      difficulty: 'hard',
      category: 'math',
    },
    {
      question_id: 13,
      prompt: 'Schrödinger is associated with which field?',
      option_a: 'Chemistry',
      option_b: 'Biology',
      option_c: 'Quantum physics',
      option_d: 'Geology',
      correct_option: 'c',
      difficulty: 'hard',
      category: 'science',
    },
    {
      question_id: 14,
      prompt: 'Time complexity of binary search?',
      option_a: 'O(1)',
      option_b: 'O(log n)',
      option_c: 'O(n)',
      option_d: 'O(n²)',
      correct_option: 'b',
      difficulty: 'hard',
      category: 'tech',
    },
    {
      question_id: 15,
      prompt: 'What does SQL stand for?',
      option_a: 'Structured Query Language',
      option_b: 'Simple Query Logic',
      option_c: 'Sequential Queue Language',
      option_d: 'Server Query Layer',
      correct_option: 'a',
      difficulty: 'hard',
      category: 'tech',
    },
    {
      question_id: 16,
      prompt: 'Speed of light in vacuum (approx)?',
      option_a: '3×10⁶ m/s',
      option_b: '3×10⁸ m/s',
      option_c: '3×10⁴ m/s',
      option_d: '3×10¹⁰ m/s',
      correct_option: 'b',
      difficulty: 'hard',
      category: 'science',
    },
  ];

  const filtered = allQuestions.filter((q) => q.difficulty === _difficulty);
  return filtered.slice(0, _quantity);
}

export async function saveMatch({ _roomCode, _hostUserId, _startedAt, _result }) {
  // Function content: to be filled in
  // Inserts a completed game's high-level stats into the MATCHES table and returns the newly generated match_id, needed by saveMatchPlayers
  // data format { roomCode, hostUserId, startedAt, result }
  // N.B. Result witll be either "defeat", "victory", "abandoned".
  // N.B. endedAt is generated automatically on record entry in the DB as well as match_id
  // called at: gameEnded, once per match or if a player disconnects and game ends early
}

export async function saveMatchPlayers(_playersArray) {
  // Function content: to be filled in
  // Inserts individual player accuracy scores for a specific match into the MATCH_PLAYERS junction table.
  // playersArray format [{ match_id, user_id, accuracy }, ...]
  // called at: gameEnded, once per match, after saveMatch
}

export async function createRoomRecord(_roomCode) {
  // Function content: to be filled in
  // Inserts a new row into the ROOMS table to log the creation time of a specific room code.
  // insert new row into ROOMS table with code = roomCode and created_at = current timestamp
  // called at: joinRoom
}

export async function updateRoomEnded(_roomCode) {
  // to be filled in
  // Updates an existing row in the ROOMS table with the final timestamp when that game concludes. update existing row in ROOMS table where code = roomCode, set ended_at = current timestamp
  // called at: gameEnded
}

export async function getAllCharacters() {
  // Function content: to be filled in
  // Retrieves the complete list of available characters from the CHARACTERS table for the frontend selection API GET /api/characters
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
