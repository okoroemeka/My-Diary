// import diary from '../seed/entry';
import dbConnection from '../model/config';

class Diary {
  /**
   * @return {array} getAllDiaryEntries
   * @param {*} req
   * @param {*} res
   */
  static getAllDiaryEntries(req, res) {
    const query = {
      text: 'SELECT * FROM entry WHERE user_id = $1',
      values: [req.decoded.user_id],
    };
    dbConnection.query(query)
      .then((entries) => {
        if (entries.rowCount === 0) {
          return res.status(404).send({
            status: 'fail',
            message: 'No diary entry found',
          });
        }
        return res.status(200).send({
          status: 'success',
          data: entries.rows,
        });
      })
      .catch(error => res.status(500).send({
        status: 'fail',
        message: 'internal server error',
      }));
  }

  /**
   * @return {object} getSingleEntry
   * @param {*} req
   * @param {*} res
   */
  static getSingleEntry(req, res) {
    const entryId = parseInt(req.params.entryId, 10);
    const query = {
      text: 'SELECT * FROM entry WHERE id = $1',
      values: [entryId],
    };
    dbConnection.query(query)
      .then((entry) => {
        if (entry.rows[0].user_id !== req.decoded.user_id) {
          return res.status(403).send({
            status: 'fail',
            message: 'You do not have permission to view this entry',
          });
        }
        return res.status(200).send({
          status: 'success',
          data: {
            id: entry.rows[0].id,
            title: entry.rows[0].title,
            body: entry.rows[0].body,
          },
        });
      })
      .catch(err => res.status(500).send({
        status: 'error',
        message: 'Internal server error, please try again',
      }));
  }

  /**
   * @return {object}createDiaryEntry
   * @param {*} req
   * @param {*} res
   */
  static createDiaryEntry(req, res) {
    const { title, text } = req.body;
    const query = {
      text: 'INSERT INTO entry(title,body,user_id) VALUES($1, $2, $3) RETURNING *',
      values: [title.trim(), text.trim(), req.decoded.user_id],
    };
    if ((title && title.trim().length > 0)
     && (text && text.trim().length > 0)) {
      return dbConnection.query(query)
        .then(entry => res.status(201).send({
          status: 'success',
          data: {
            id: entry.rows[0].id,
            title: entry.rows[0].title,
            body: entry.rows[0].body,
          },
        }))
        .catch(err => res.status(500).send(err));
    }
    return res.status(400).send({
      status: 'fail',
      message: 'Some fields are empty',
    });
  }

  /**
   * @return {object} updateEntry
   * @param {*} req
   * @param {*} res
   */
  static updateEntry(req, res) {
    const entryId = parseInt(req.params.entryId, 10);
    const { title, text } = req.body;
    const updateQuery = {
      text: 'UPDATE entry SET title=$1,body=$2 WHERE id=$3 RETURNING *',
      values: [title, text, entryId],
    };
    const checkEntryQuery = {
      text: 'SELECT * FROM entry WHERE id = $1',
      values: [entryId],
    };
    dbConnection.query(checkEntryQuery)
      .then((entry) => {
        if (entry.rowCount === 0) {
          return res.status(404).send({
            status: 'fail',
            message: 'entry not found',
          });
        }
        if (entry.rows[0].user_id !== req.decoded.user_id) {
          return res.status(403).send({
            status: 'fail',
            message: 'you do not have permission to update this',
          });
        }
        dbConnection.query(updateQuery)
          .then(updatedEntry => res.status(200).send({
            status: 'success',
            message: 'entry updated successfull',
            data: {
              id: updatedEntry.rows[0].id,
              title: updatedEntry.rows[0].title,
              body: updatedEntry.rows[0].body,
            },
          }))
          .catch(err => res.status(500).send(err));
      })
      .catch(err => res.status(500).send(err));
  }

  /**
   * @returns{object} deleteEntry
   * @param {*} req
   * @param {*} res
   */
  static deleteEntry(req, res) {
    const entryId = parseInt(req.params.entryId, 10);
    const deleteEntryQuery = {
      text: 'DELETE FROM entry WHERE id=$1',
      values: [entryId],
    };
    const checkEntryQuery = {
      text: 'SELECT * FROM entry WHERE id = $1',
      values: [entryId],
    };

    dbConnection.query(checkEntryQuery)
      .then((entry) => {
        if (entry.rowCount === 0) {
          return res.status(404).send({
            status: 'fail',
            message: 'entry not found',
          });
        }
        if (entry.rows[0].user_id !== req.decoded.user_id) {
          return res.status(403).send({
            status: 'fail',
            message: 'You do not have permission to delete this entry',
          });
        }
        return dbConnection.query(deleteEntryQuery)
          .then(() => res.status(200).send({
            status: 'success',
            message: 'Entry deleted successfully',
          }))
          .catch(err => res.status(500).send({
            status: 'error',
            message: 'internal server error, please try again later',
          }));
      })
      .catch(err => res.status(500).send({
        status: 'error',
        message: 'internal server error, please try again later',
      }));
  }
}

export default Diary;
