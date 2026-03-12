import express from 'express';
import { getAllCharacters } from './characters.controller';

const charactersRouter = express.Router();

charactersRouter.route('/').get(getAllCharacters);

module.exports = charactersRouter;
