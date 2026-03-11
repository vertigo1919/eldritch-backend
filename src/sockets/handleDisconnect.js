// import { updateRoomEnded } from '../db/queries.js';
import { ROOM_CLEANUP_DELAY_MS } from '../constants.js';
import { rooms } from '../rooms.js';
import { calculateAccuracy } from '../utils/calculateAccuracy.js';
// import { saveMatch, saveMatchPlayers } from '../db/queries.js';

export async function handleDisconnect(io, socket) {
  const code = socket.data.roomCode;
  const userId = socket.data.userId;

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

  // CLEAR player (but saves snaposhots of players for stats)
  const allPlayersSnapshot = [...rooms[code].players];
  rooms[code].players = rooms[code].players.filter((player) => player.userId !== userId);

  if (rooms[code].players.length === 0) {
    // SAVE room ended time stamp to DB - commented out until DB is implemented
    // try {
    //     await updateRoomEnded(code);
    //   } catch (err) {
    //     console.error('DB Error: Failed to update room ended_at on empty room', { code, err });
    //   } finally {
    //     delete rooms[code];
    //   }
    //   return;
    // }

    delete rooms[code];
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

    // SAVE RESULTS TO DB - commented out until DB is operational
    // try {
    //   const match_id = await saveMatch({
    //     roomCode: code,
    //     hostUserId: rooms[code].hostUserId,
    //     startedAt: rooms[code].startedAt,
    //     result: 'abandoned',
    //   });
    //   await saveMatchPlayers(
    //     perPlayerAccuracy.map((p) => ({
    //       match_id: match_id,
    //       user_id: p.userId,
    //       accuracy: p.accuracy,
    //     }))
    //   );
    // } catch (err) {
    //   console.error('Failed to save match to DB after player disconnect', { code, userId, err });
    // }

    setTimeout(async () => {
      //check if the room was already deleted by another process e.g. the last player left during the 3 min window
      if (!rooms[code]) return;

      try {
        // await updateRoomEnded(code); commented out until DB is implemented
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
}
