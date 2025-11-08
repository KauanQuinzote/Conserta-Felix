import knex, { Knex } from 'knex';
import { join } from 'path';

const DB_PATH = process.env.SQLITE_FILE || join(__dirname, '../../data/database.sqlite');

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: DB_PATH,
  },
  useNullAsDefault: true,
  pool: {
    afterCreate: (conn: any, done: any) => conn.run('PRAGMA foreign_keys = ON', done),
  },
};

const db = knex(config);

export default db;
