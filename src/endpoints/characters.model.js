import db from '../db/connection';

export function fetchAllCharacters() {
  return db.query(`SELECT * FROM characters`).then(({ rows }) => {
    return rows;
  });
}
