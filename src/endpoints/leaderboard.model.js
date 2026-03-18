import { db } from '../db/connection.js';

export function fetchLeaderboard(offset = 0) {
  return db
    .query(
      `SELECT 
display_name,
created_at,
last_seen,
total_questions_attempted,
hard_questions_correct,
medium_questions_correct,
easy_questions_correct FROM users WHERE total_questions_attempted> 0 ORDER BY easy_questions_correct* 10+ medium_questions_correct*20 + hard_questions_correct*30 DESC, (easy_questions_correct + medium_questions_correct + hard_questions_correct)/total_questions_attempted DESC
LIMIT 10 OFFSET $1`,
      [offset]
    )
    .then(({ rows }) => {
      return rows;
    });
}
