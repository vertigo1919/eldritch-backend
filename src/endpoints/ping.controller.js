import { db } from '../db/connection.js';

export async function ping(req, res, next) {
  try {
    await db.query('SELECT 1 AS awake');
    res.status(200).send('Render and Supabase are both awake!');
  } catch (error) {
    next(error);
  }
}
