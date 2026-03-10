export async function saveUser({ id: _id, name: _name }) {
  // to be filled in
  // datta format: { id: uuid, name: string }
}

export async function getMonsterForStage(stageNumber) {
  //stages for now are 1,2,3 and map to easy medium hard mosnter difficulty_level
  // for now it returns a hardcoded monster, to update to query DB
  const mockMonsters = [
    {
      id: 1,
      name: 'Skeleton Knight',
      max_hp: 80,
      attack_damage: 10,
      image_url: '',
      difficulty_level: 'easy',
    },
    {
      id: 2,
      name: 'Crypt Warden',
      max_hp: 120,
      attack_damage: 15,
      image_url: '',
      difficulty_level: 'medium',
    },
    {
      id: 3,
      name: 'Eldritch Horror',
      max_hp: 160,
      attack_damage: 20,
      image_url: '',
      difficulty_level: 'hard',
    },
  ];

  return mockMonsters[stageNumber - 1];
}

// PLACEHOLDER FUNCTION for when we want to add custom mosnter selection
// export async function getMonster(_id) {
// }

export async function getRandomQuestions(_quantity, _difficulty) {
  // Return mock questions for now
  const allQuestions = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
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
      id: 9,
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
      id: 10,
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
      id: 11,
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
      id: 12,
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
      id: 13,
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
      id: 14,
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
      id: 15,
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
      id: 16,
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

export async function saveMatch(_data) {
  // to be filled in
  // data format { roomCode, hostUserId, monsterId, startedAt, endedAt, result }
  // called at: gameEnded, once per match
  // must return { id } — the new match id, needed by saveMatchPlayers
}
export async function saveMatchPlayers(_data) {
  // to be filled in
  // data format [{ matchId, userId, accuracy }, ...]
  // called at: gameEnded, once per match, after saveMatch
}

// functions needed for room table

export async function createRoomRecord(_roomCode) {
  // to be filled in
  // insert new row into ROOMS table with code = roomCode and created_at = current timestamp
  // called at: joinRoom
}

export async function updateRoomEnded(_roomCode) {
  // to be filled in
  // action: update existing row in ROOMS table where code = roomCode, set ended_at = current timestamp
  // called at: gameEnded
}

export async function getCharacter(characterId) {
  // to be filled in
  // called at: joinRoom
  // Action: retrieves entire selected character object
  const mockCharacters = [
    {
      id: 1,
      name: 'The Scholar',
      image_url: 'character1.png',
      description: 'A seeker of forbidden knowledge.',
      base_attack: 5,
      base_defense: 5,
      base_sanity: 150,
      difficulty_scaling: 1,
    },
    {
      id: 2,
      name: 'The Investigator',
      image_url: 'character2.png',
      description: 'Used to dealing with the unknown.',
      base_attack: 10,
      base_defense: 10,
      base_sanity: 120,
      difficulty_scaling: 1,
    },
    {
      id: 3,
      name: 'The Occultist',
      image_url: 'character3.png',
      description: 'Dabbles in the dark arts.',
      base_attack: 15,
      base_defense: 5,
      base_sanity: 90,
      difficulty_scaling: 2,
    },
    {
      id: 4,
      name: 'The Veteran',
      image_url: 'character4.png',
      description: 'Hardened by past conflicts.',
      base_attack: 20,
      base_defense: 15,
      base_sanity: 70,
      difficulty_scaling: 2,
    },
  ];

  return mockCharacters.find((c) => c.id === Number(characterId));
}
