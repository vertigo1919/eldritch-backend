import { getLeaderboardService } from './leaderboard.service.js';

export function getLeaderboard(req, res, next) {
  const { offset } = req.query;
  console.log('query', offset);
  getLeaderboardService(offset)
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      next(err);
    });
}
