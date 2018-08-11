'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var connectionString = void 0;
var ssl = void 0;
var _process$env = process.env,
    DB_USER = _process$env.DB_USER,
    DB_URL = _process$env.DB_URL,
    DB_PASS = _process$env.DB_PASS,
    DB_PORT = _process$env.DB_PORT;

var config = {
  user: DB_USER,
  database: DB_URL,
  password: DB_PASS,
  port: DB_PORT,
  max: 10,
  idleTimeoutMillis: 3000
};
// if (process.env.NODE_ENV === 'test') {
//   connectionString = 'DiaryTestDb'
// } if () {

// }
var dbConnection = new _pg2.default.Pool(config);
exports.default = dbConnection;