import { db } from '../connection.js';

import format from 'pg-format';
import { formatQuestions } from '../utils/formatQuestionData.js';

async function seed({ questionData, monsterData, characterData }) {
  await db.query(`DROP TABLE IF EXISTS match_players`);
  await db.query(`DROP TABLE IF EXISTS matches`);
  await db.query(`DROP TABLE IF EXISTS rooms`);
  await db.query(`DROP TABLE IF EXISTS users`);
  await db.query(`DROP TABLE IF EXISTS characters`);
  await db.query(`DROP TABLE IF EXISTS monsters`);
  await db.query(`DROP TABLE IF EXISTS questions`);
  await db.query(`DROP TABLE IF EXISTS items`);

  await db.query(`
        CREATE TABLE items (
        item_id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        image_name TEXT,
        type TEXT NOT NULL,
        boost_attack INT DEFAULT 0,
        boost_defense INT DEFAULT 0,
        boost_sanity INT DEFAULT 0
        )`);

  await db.query(`
        CREATE TABLE questions (
        question_id SERIAL PRIMARY KEY,
        prompt TEXT NOT NULL,
        option_a TEXT NOT NULL,
        option_b TEXT NOT NULL,
        option_c TEXT NOT NULL,
        option_d TEXT NOT NULL,
        correct_option TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        category TEXT NOT NULL
        )`);

  await db.query(`
        CREATE TABLE monsters (
        monster_id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        max_hp INT NOT NULL,
        attack_damage INT NOT NULL,
        difficulty_level TEXT NOT NULL,
        image_name TEXT
        )`);

  await db.query(`
        CREATE TABLE characters (
        character_id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        image_name TEXT,
        bio TEXT,
        base_attack INT NOT NULL,
        base_sanity INT NOT NULL,
        difficulty_scaling INT
        )`);

  await db.query(`
        CREATE TABLE users (
        user_id TEXT PRIMARY KEY,
        display_name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        
        )`);

  await db.query(`
        CREATE TABLE rooms (
        code TEXT PRIMARY KEY,
        host_user_id TEXT REFERENCES users(user_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ended_at TIMESTAMP
        )`);

  await db.query(`
        CREATE TABLE matches (
        match_id SERIAL PRIMARY KEY,
        room_code TEXT NOT NULL REFERENCES rooms(code),
        host_user_id TEXT REFERENCES users(user_id),
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ended_at TIMESTAMP,
        result TEXT
        )`);

  await db.query(`
        CREATE TABLE match_players (
        match_id INT REFERENCES matches(match_id),
        user_id TEXT REFERENCES users(user_id),
        accuracy NUMERIC,
        PRIMARY KEY (match_id, user_id)
        )`);

  const formattedQuestions = formatQuestions(questionData).map((question) => [
    question.prompt,
    question.option_a,
    question.option_b,
    question.option_c,
    question.option_d,
    question.correct_option,
    question.difficulty,
    question.category,
  ]);
  await db.query(
    format(
      `INSERT INTO questions(
prompt,
option_a,
option_b,
option_c,
option_d,
correct_option,
difficulty,
category) VALUES %L`,
      formattedQuestions
    )
  );

  const formattedMonsters = monsterData.map((monster) => [
    monster.monster_name,
    monster.max_hp,
    monster.attack_dmg,
    monster.difficulty,
    monster.img_name,
  ]);
  await db.query(
    format(
      `INSERT INTO monsters(name,
max_hp,
attack_damage,
difficulty_level,
image_name) VALUES %L`,
      formattedMonsters
    )
  );
  const formattedCharacters = characterData.map((char) => [
    char.name,
    char.image_name,
    char.bio,
    char.base_attack,
    char.base_sanity,
    char.difficulty_scaling,
  ]);
  await db.query(
    format(
      `INSERT INTO characters(
name,
image_name,
bio,
base_attack,
base_sanity,
difficulty_scaling) VALUES %L`,
      formattedCharacters
    )
  );
}

export { seed };
