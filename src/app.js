import express from 'express';
import charactersRouter from './endpoints/characters.routes';
const app = express();

// placeholder for routes for API endpoints if we add them later down the line

app.use(`/api/characters`, charactersRouter);

export { app };
