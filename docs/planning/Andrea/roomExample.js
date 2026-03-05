function roomExample() {
  const roomStatusExample = {
    code: 'ABCD',
    hostUserId: 'uuid-123',
    roomStatus: 'lobby', // or "in-game" or "ended"
    players: [
      { userId: 'uuid-123', socketId: 'socket-1', name: 'Alice' },
      { userId: 'uuid-456', socketId: 'socket-2', name: 'Bob' },
    ],
    teamHp: 100,
    monsterHp: 80,
    monsterId: 1,
    questionIds: [10, 25, 7, 3, 19],
    currentQuestionIndex: 0,
    currentQuestionId: 10,
    roundDeadline: Date.now() + 15000,
    answers: {
      'uuid-123': null,
      'uuid-456': null,
    },
  };

  // Globaltore for all active rooms
  const rooms = { ABCD: roomStatusExample };

  console.log(rooms, roomStatusExample);
}

roomExample();
