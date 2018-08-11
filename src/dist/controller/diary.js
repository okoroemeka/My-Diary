'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import diary from '../seed/entry';


var _config = require('../model/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Diary = function () {
  function Diary() {
    _classCallCheck(this, Diary);
  }

  _createClass(Diary, null, [{
    key: 'getAllDiaryEntries',

    /**
     * @return {array} getAllDiaryEntries
     * @param {*} req
     * @param {*} res
     */
    value: function getAllDiaryEntries(req, res) {
      var query = {
        text: 'SELECT * FROM entry WHERE user_id = $1',
        values: [req.decoded.user_id]
      };
      _config2.default.query(query).then(function (entries) {
        if (entries.rowCount === 0) {
          return res.status(404).send({
            status: 'fail',
            message: 'No diary entry found'
          });
        }
        return res.status(200).send({
          status: 'success',
          data: entries.rows
        });
      }).catch(function (error) {
        return res.status(500).send({
          status: 'fail',
          message: 'internal server error'
        });
      });
    }

    /**
     * @return {object} getSingleEntry
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'getSingleEntry',
    value: function getSingleEntry(req, res) {
      var entryId = parseInt(req.params.entryId, 10);
      var query = {
        text: 'SELECT * FROM entry WHERE id = $1',
        values: [entryId]
      };
      _config2.default.query(query).then(function (entry) {
        if (entry.rows[0].user_id !== req.decoded.user_id) {
          return res.status(403).send({
            status: 'fail',
            message: 'You do not have permission to view this entry'
          });
        }
        return res.status(200).send({
          status: 'success',
          data: {
            id: entry.rows[0].id,
            title: entry.rows[0].title,
            body: entry.rows[0].body
          }
        });
      }).catch(function (err) {
        return res.status(500).send({
          status: 'error',
          message: 'Internal server error, please try again'
        });
      });
    }

    /**
     * @return {object}createDiaryEntry
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'createDiaryEntry',
    value: function createDiaryEntry(req, res) {
      var _req$body = req.body,
          title = _req$body.title,
          text = _req$body.text;

      var query = {
        text: 'INSERT INTO entry(title,body,user_id) VALUES($1, $2, $3) RETURNING *',
        values: [title.trim(), text.trim(), req.decoded.user_id]
      };
      if (title && title.trim().length > 0 && text && text.trim().length > 0) {
        return _config2.default.query(query).then(function (entry) {
          return res.status(201).send({
            status: 'success',
            data: {
              id: entry.rows[0].id,
              title: entry.rows[0].title,
              body: entry.rows[0].body
            }
          });
        }).catch(function (err) {
          return res.status(500).send(err);
        });
      }
      return res.status(400).send({
        status: 'fail',
        message: 'Some fields are empty'
      });
    }

    /**
     * @return {object} updateEntry
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'updateEntry',
    value: function updateEntry(req, res) {
      var entryId = parseInt(req.params.entryId, 10);
      var _req$body2 = req.body,
          title = _req$body2.title,
          text = _req$body2.text;

      var updateQuery = {
        text: 'UPDATE entry SET title=$1,body=$2 WHERE id=$3 RETURNING *',
        values: [title, text, entryId]
      };
      var checkEntryQuery = {
        text: 'SELECT * FROM entry WHERE id = $1',
        values: [entryId]
      };
      _config2.default.query(checkEntryQuery).then(function (entry) {
        if (entry.rowCount === 0) {
          return res.status(404).send({
            status: 'fail',
            message: 'entry not found'
          });
        }
        if (entry.rows[0].user_id !== req.decoded.user_id) {
          return res.status(403).send({
            status: 'fail',
            message: 'you do not have permission to update this'
          });
        }
        _config2.default.query(updateQuery).then(function (updatedEntry) {
          return res.status(200).send({
            status: 'success',
            message: 'entry updated successfull',
            data: {
              id: updatedEntry.rows[0].id,
              title: updatedEntry.rows[0].title,
              body: updatedEntry.rows[0].body
            }
          });
        }).catch(function (err) {
          return res.status(500).send(err);
        });
      }).catch(function (err) {
        return res.status(500).send(err);
      });
    }

    /**
     * @returns{object} deleteEntry
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'deleteEntry',
    value: function deleteEntry(req, res) {
      var entryId = parseInt(req.params.entryId, 10);
      var deleteEntryQuery = {
        text: 'DELETE FROM entry WHERE id=$1',
        values: [entryId]
      };
      var checkEntryQuery = {
        text: 'SELECT * FROM entry WHERE id = $1',
        values: [entryId]
      };

      _config2.default.query(checkEntryQuery).then(function (entry) {
        if (entry.rowCount === 0) {
          return res.status(404).send({
            status: 'fail',
            message: 'entry not found'
          });
        }
        if (entry.rows[0].user_id !== req.decoded.user_id) {
          return res.status(403).send({
            status: 'fail',
            message: 'You do not have permission to delete this entry'
          });
        }
        return _config2.default.query(deleteEntryQuery).then(function () {
          return res.status(200).send({
            status: 'success',
            message: 'Entry deleted successfully'
          });
        }).catch(function (err) {
          return res.status(500).send({
            status: 'error',
            message: 'internal server error, please try again later'
          });
        });
      }).catch(function (err) {
        return res.status(500).send({
          status: 'error',
          message: 'internal server error, please try again later'
        });
      });
    }
  }]);

  return Diary;
}();

exports.default = Diary;