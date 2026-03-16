import express from 'express';
import charactersRouter from './endpoints/characters.routes.js';
import leaderboardRouter from './endpoints/leaderboard.routes.js';
import { pingRouter } from './endpoints/ping.routes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Eldritch Backend is Awake!');
});

app.use(`/api/characters`, charactersRouter);

app.use(`/api/leaderboard`, leaderboardRouter);
app.use('/ping', pingRouter);

app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

export { app };
