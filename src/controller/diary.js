import diary from '../seed/entry';

class Diary {
  static getAllDiaryEntries(req, res) {
    if (diary.length === 0) {
      return res.status(404).send({
        status: 'fail',
        message: 'no dairy entries found',
      });
    }
    return res.status(200).send({
      status: 'success',
      data: diary,
    });
  }

  static getSingleEntry(req, res) {
    const diaryEntry = diary.find(entry => parseInt(entry.id, 10) === parseInt(req.params.entryId, 10));
    if (diaryEntry) {
      return res.status(200).send(diaryEntry);
    }
    return res.status(404).send({
      status: 'fail',
      message: 'Not found',
    });
  }

  static createDiaryEntry(req, res) {
    if ((req.body.title && req.body.title.trim().length > 0)
    && (req.body.text && req.body.text.trim().length > 0)) {
      const entry = {
        id: diary.length + 1,
        title: req.body.title,
        text: req.body.text,
      };
      diary.push(entry);
      return res.status(201).send({
        status: 'success',
        message: 'entry created successfully',
        data: entry,
      });
    }
    return res.status(404).send({
      status: 'fail',
      message: 'Not found',
    });
  }

  static updateEntry(req, res) {
    const { entryId } = req.params;
    const diaryEntry = diary.filter(entry => (parseInt(entryId, 10) === parseInt(entry.id, 10)));
    if (diaryEntry.length === 0) {
      return res.status(404).send({
        status: 'fail',
        message: 'The entry you want to update does not exist',
      });
    } if ((!req.body.title && req.body.title.trim().length === 0)
      && (!req.body.text && req.body.text.trim().length === 0)) {
      return res.status(400).send({
        status: 'fail',
        message: 'The title and text fields are empty',
      });
    }
    const updateDetails = req.body;
    const entryPosition = parseInt(entryId, 10);
    diary[entryPosition - 1] = updateDetails;
    return res.status(200).send({
      status: 'success',
      message: 'Updated successully',
      data: diary[entryPosition - 1],
    });
  }

  static deleteEntry(req, res) {
    const { entryId } = req.params;
    const diaryEntry = diary.filter(entry => parseInt(entryId, 10) === parseInt(entry.id, 10));
    if (!diaryEntry.length === 0) {
      return res.status(404).send({
        status: 'fail',
        message: 'The entry does not exist',
      });
    }
    const id = parseInt(entryId, 10);
    diary.splice(id - 1, 1);
    return res.status(204).send();
  }
}

export default Diary;
