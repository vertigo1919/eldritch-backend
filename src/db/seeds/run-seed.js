import * as devData from '../data/dev-data/index.js';
import { seed } from './seed.js';
import { db } from '../connection.js';

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();
