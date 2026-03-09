export async function saveUser({ id: _id, name: _name }) {
  // to be filled in
  // datta format: { id: uuid, name: string }
}

export async function getMonster(_id) {
  // for now it returns a hardcoded monster, to update to query DB
  return { id: 1, name: 'TestUser', max_hp: 100, attack_damage: 20, image_url: '' };
}

export async function getRandomQuestions(_n) {
  // Return mock questions for now
  return [
    {
      id: 1,
      prompt: 'What is 2+2?',
      option_a: '3',
      option_b: '4',
      option_c: '5',
      option_d: '6',
      correct_option: 'b',
      difficulty: '1',
      category: 'math',
    },
  ];
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
