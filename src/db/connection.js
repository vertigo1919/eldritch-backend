import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ENV = process.env.NODE_ENV || 'development';

dotenv.config({ path: `${__dirname}/../../.env.${ENV}` });

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE or DATABASE_URL not set');
}

const config = {};

if (ENV === 'production') {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
} else {
  if (!process.env.PGDATABASE) {
    throw new Error('No PGDATABASE configured');
  }
  console.log(`Connected to ${process.env.PGDATABASE}`);
}

const db = new Pool(config);

export { db };
