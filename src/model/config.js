import Pg from 'pg';
import Dotenv from 'dotenv';

Dotenv.config();
let connectionString;
let ssl;
const {
  DB_USER, DB_URL, DB_PASS, DB_PORT,
} = process.env;
const config = {
  user: DB_USER,
  database: DB_URL,
  password: DB_PASS,
  port: DB_PORT,
  max: 10,
  idleTimeoutMillis: 3000,
};
// if (process.env.NODE_ENV === 'test') {
//   connectionString = 'DiaryTestDb'
// } if () {
  
// }
const dbConnection = new Pg.Pool(config);
export default dbConnection;
