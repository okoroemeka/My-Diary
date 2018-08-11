'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _diary = require('../controller/diary');

var _diary2 = _interopRequireDefault(_diary);

var _users = require('../controller/users');

var _users2 = _interopRequireDefault(_users);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/auth/signup', _users2.default.signUp);
router.post('/auth/signin', _users2.default.signIn);
router.get('/entries', _auth2.default, _diary2.default.getAllDiaryEntries);
router.get('/entries/:entryId', _auth2.default, _diary2.default.getSingleEntry);
router.post('/entries', _auth2.default, _diary2.default.createDiaryEntry);
router.put('/entries/:entryId', _auth2.default, _diary2.default.updateEntry);
router.delete('/entries/:entryId', _auth2.default, _diary2.default.deleteEntry);

exports.default = router;