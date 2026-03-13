import express from 'express';
import charactersRouter from './endpoints/characters.routes.js';
import { pingRouter } from './endpoints/ping.routes.js';

const app = express();

app.use(`/api/characters`, charactersRouter);

app.use('/ping', pingRouter);

app.use((err, req, res, _next) => {
  console.error(err.stack); // log the error
  res.status(500).send('Something went wrong!'); // send 500 response
});

export { app };
