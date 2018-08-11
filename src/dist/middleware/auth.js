'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var secreteKey = process.env.SECRET_KEY;

var verifyUserToken = function verifyUserToken(req, res, next) {
  var token = req.headers['x-access-token'] || req.body.token || req.headers.auth;
  if (token) {
    _jsonwebtoken2.default.verify(token, secreteKey, function (err, decoded) {
      if (err) {
        return res.status(401).send({
          status: 'fail',
          message: 'You do not have permission to use this resources'
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).send({
      status: 'fail',
      message: 'Please login'
    });
  }
};
exports.default = verifyUserToken;