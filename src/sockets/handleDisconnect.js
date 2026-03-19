import {
  updateRoomEnded,
  saveMatchPlayers,
  saveMatch,
  updateUserQuestions,
  saveUser,
} from '../db/queries.js';
import { ROOM_CLEANUP_DELAY_MS, DISCONNECT_GRACE_PERIOD_MS } from '../constants.js';
import { rooms } from '../rooms.js';
import { calculateAccuracy } from '../utils/calculateAccuracy.js';

export async function handleDisconnect(io, socket) {
  const code = socket.data.roomCode;
  const userId = socket.data.userId;
  const name = socket.data.name;

  // update last_seen time stamp
  if (userId && name) {
    try {
      await saveUser(userId, name);
    } catch (err) {
      console.error('Failed to update last_seen on disconnect', err);
    }
  }

  // GUARDS
  if (!code) {
    return;
  }

  if (!rooms[code]) {
    return;
  }

  if (rooms[code].roomStatus === 'ended') {
    return;
  }

  const player = rooms[code].players.find((p) => p.userId === userId);
  if (player && player.socketId !== socket.id) {
    console.log(`Ignoring disconnect for user ${userId}. Socket ID mismatch.`);
    return;
  }
  // DISCONNECTION TIMER INITIALISATION
  if (!rooms[code].disconnectTimers) {
    rooms[code].disconnectTimers = {};
  }
  console.log(
    `User ${userId} disconnected from room ${code}. Starting ${DISCONNECT_GRACE_PERIOD_MS / 1000}s grace period...`
  );
  // WE assign every user who disconnects a 10s timer, full disconnection only happens after timer

  rooms[code].disconnectTimers[userId] = setTimeout(async () => {
    console.log(`Grace period expired for ${userId}. Proceeding with abandonment...`);
    if (!rooms[code] || rooms[code].roomStatus === 'ended') return;

    // CLEAR player (but saves snaposhots of players for stats)
    const allPlayersSnapshot = [...rooms[code].players];
    rooms[code].players = rooms[code].players.filter((player) => player.userId !== userId);

    if (rooms[code].players.length === 0) {
      try {
        await updateRoomEnded(code);
      } catch (err) {
        console.error('DB Error: Failed to update room ended_at on empty room', { code, err });
      } finally {
        delete rooms[code];
      }
      return;
    }

    // IN-GAME INTERRUPTION FLOW
    if (rooms[code].roomStatus === 'in-game') {
      const perPlayerAccuracy = calculateAccuracy(allPlayersSnapshot);

      clearTimeout(rooms[code].timerId);
      rooms[code].roomStatus = 'ended';

      const gameEndedPayload = {
        result: 'abandoned',
        reason: 'player_disconnected',
        monsterId: rooms[code].monster.monster_id,
        teamHpFinal: rooms[code].teamHp,
        monsterHpFinal: rooms[code].monsterHp,
        perPlayerAccuracy: perPlayerAccuracy,
      };

      io.to(code).emit('gameEnded', gameEndedPayload);

      try {
        const matchResult = await saveMatch({
          roomCode: code,
          hostUserId: rooms[code].hostUserId,
          startedAt: rooms[code].startedAt,
          result: 'abandoned',
        });

        const extractedMatchId = matchResult[0].match_id;

        await saveMatchPlayers(
          perPlayerAccuracy.map((p) => ({
            match_id: extractedMatchId,
            user_id: p.userId,
            accuracy: p.accuracy,
          }))
        );

        await updateUserQuestions(allPlayersSnapshot);
      } catch (err) {
        console.error('Failed to save match to DB after player disconnect', { code, userId, err });
      }

      setTimeout(async () => {
        //check if the room was already deleted by another process e.g. the last player left during the 3 min window
        if (!rooms[code]) return;

        try {
          await updateRoomEnded(code);
        } catch (err) {
          console.error('DB Error: Failed to update room ended_at on timeout', { code, err });
        } finally {
          delete rooms[code];
        }
      }, ROOM_CLEANUP_DELAY_MS); // 3 min delay before deleting the room to allow for stuff to happen if it needs to
    }

    // LOBBY DISCONNECTION FLOW

    if (rooms[code].roomStatus === 'lobby') {
      if (rooms[code].hostUserId === userId) {
        rooms[code].hostUserId = rooms[code].players[0].userId;
      }

      const publicPlayers = rooms[code].players.map((player) => ({
        userId: player.userId,
        name: player.name,
        character: player.character,
      }));

      const lobbyUpdatedPayload = {
        roomCode: code,
        hostUserId: rooms[code].hostUserId,
        players: publicPlayers,
        roomStatus: 'lobby',
      };

      io.to(code).emit('lobbyUpdated', lobbyUpdatedPayload);
    }
    delete rooms[code].disconnectTimers[userId];
  }, DISCONNECT_GRACE_PERIOD_MS);
}
