import { fetchLeaderboard } from './leaderboard.model.js';

export function getLeaderboardService(offset) {
  return fetchLeaderboard(offset).then((users) => {
    return users;
  });
}
