'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../model/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = function () {
  function Users() {
    _classCallCheck(this, Users);
  }

  _createClass(Users, null, [{
    key: 'signUp',
    value: function signUp(req, res) {
      var checkUserQuery = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [req.body.email.trim()]
      };
      var query = {
        text: 'INSERT INTO users(firstname,lastname,email,password) VALUES($1, $2, $3, $4) RETURNING *',
        values: [req.body.firstname.trim(), req.body.lastname.trim(), req.body.email.trim(), _bcrypt2.default.hashSync(req.body.password.trim(), 10)]
      };
      if (req.body.firstname === undefined && req.body.firstname.trim().length === 0 && req.body.lastname === undefined && req.body.lastname.trim().length === 0 && req.body.email === undefined && req.body.email.trim().length === 0 && req.body.password === undefined && req.body.password.trim().length === 0) {
        return res.status(400).send({
          status: 'fail',
          message: 'all fields are required'
        });
      }if (req.body.password.trim() !== req.body.confirmPassword.trim()) {
        return res.status(400).send({
          status: 'fail',
          message: 'please confirm your password and retype again'
        });
      }if (req.body.password.trim().length < 6) {
        return res.status(400).send({
          status: 'fail',
          message: 'password length must be more than 6'
        });
      }
      _config2.default.query(checkUserQuery).then(function (users) {
        if (users.rowCount !== 0) {
          return res.status(409).send({
            status: 'fail',
            message: 'user already exist'
          });
        }
        return _config2.default.query(query).then(function (newUser) {
          res.status(201).send({
            status: 'success',
            message: 'user created, you can now log in',
            data: {
              firstname: newUser.rows[0].firstname,
              lastname: newUser.rows[0].lastname,
              email: newUser.rows[0].email
            }
          });
        });
      }).catch(function (err) {
        return res.status(500).send({
          status: 'error',
          mesage: 'internal server error, please try again'
        });
      });
    }
  }, {
    key: 'signIn',
    value: function signIn(req, res) {
      var query = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [req.body.email.trim()]
      };

      _config2.default.query(query).then(function (user) {
        if (user.rowCount === 0) {
          return res.status(400).send({
            status: 'fail',
            message: 'please Sign up'
          });
        }
        if (_bcrypt2.default.compareSync(req.body.password.trim(), user.rows[0].password)) {
          var token = _jsonwebtoken2.default.sign({
            user_id: user.rows[0].id,
            firstname: user.rows[0].firstname,
            email: user.rows[0].email
          }, process.env.SECRET_KEY, {
            expiresIn: '24hr'
          });
          return res.status(200).send({
            status: 'success',
            message: 'welcome to My Dairy',
            token: token
          });
        }

        return res.status(400).send({
          status: 'fail',
          message: 'wrong email or password'
        });
      }).catch(function (err) {
        return res.status(500).send(err);
      });
    }
  }]);

  return Users;
}();

exports.default = Users;