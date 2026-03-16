import express from 'express';
import { ping } from './ping.controller.js';

const pingRouter = express.Router();

pingRouter.get('/', ping);

export { pingRouter };
