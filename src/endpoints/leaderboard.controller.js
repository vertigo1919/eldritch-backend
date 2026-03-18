import { getLeaderboardService } from './leaderboard.service.js';

export function getLeaderboard(req, res, next) {
  const { offset } = req.query;
  getLeaderboardService(offset)
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      next(err);
    });
}
