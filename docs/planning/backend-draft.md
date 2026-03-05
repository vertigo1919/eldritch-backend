# Eldritch-Backend Initial Draft

## DB schema

```mermaid
erDiagram
  USERS {
    UUID id
    TEXT display_name
    TIMESTAMPTZ created_at
    TIMESTAMPTZ last_seen
  }

  QUESTIONS {
    SERIAL id
    TEXT prompt
    TEXT option_a
    TEXT option_b
    TEXT option_c
    TEXT option_d
    CHAR correct_option
    TEXT difficulty
    TEXT category
  }

  MONSTERS {
    SERIAL id
    TEXT name
    INT max_hp
    INT attack_damage
    TEXT image_url
  }

  CHARACTERS {
    SERIAL id
    TEXT name
    TEXT image_url
    TEXT description
    INT base_attack
    INT base_defense
    INT base_sanity
    INT difficulty_scaling
  }

  ROOMS {
    TEXT code
    UUID host_user_id
    TIMESTAMPTZ created_at
    TIMESTAMPTZ started_at
    TIMESTAMPTZ ended_at
  }

  MATCHES {
    SERIAL id
    TEXT room_code
    UUID host_user_id
    INT monster_id
    TIMESTAMPTZ started_at
    TIMESTAMPTZ ended_at
    TEXT result
  }

  MATCH_PLAYERS {
    INT match_id
    UUID user_id
    NUMERIC accuracy
  }

  %% Relationships
  USERS ||--o{ ROOMS : "hosts"
  USERS ||--o{ MATCHES : "hosts"
  USERS ||--o{ MATCH_PLAYERS : "plays in"
  MONSTERS ||--o{ MATCHES : "used in"
  ROOMS ||--o{ MATCHES : "created from"
  MATCHES ||--o{ MATCH_PLAYERS : "has"
```

## In-memory game state

```js
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
}
```

## Imporntant considerations

- No need for API endpoints at least initially
- No need for OOP, at least initially, just plain objects.

## Sockets : custom events we will probably need

**joinRoom** (client to server)
When: user enters name + code (or creates a new room).

- The server updates the user table using UIID
- Generates a new room code if needed
- Updates room table
- Server creates/updates the in‑memory rooms[code]
- matches table is untouched as it's only used for finished games

**lobbyUpdated** (server to client)
When: either after joinRoom or when someone disconnects

- Server sends out latest lobby state for that room
- frontened updates players list

**startGame** (client to server)

- When? Host clicks “Start” in the lobby.
- Server loads monster, a fixed set of questions
- server initial match state (team HP, mosnter HP , questionIDs, currentQuestion, etc)
- Triggers roundStarted

**roundStarted** (server to client)
when: at the beginnong of every round

- server sends current question data front ends shows question and starts countdown

**submitAnswer** (client to Server)
when:player clicks an answer button on Battle screen.

- the server saves the answer in memory
- When all players have answered, or the round timer expires, server resolves the round.

**roundResult** (server to client)
When: after all players answer all rounds questions

- check correct options
- calculate player correcntess
- calculate damage

Front end shows:
Correct answers
Who was right/wrong?
Updated HP bars.

**gameEnded** (server to client)
when? when monster is deafted

- saves match in DB and save accuracy per user per match
- Frontend navigates to Game Over screen.
