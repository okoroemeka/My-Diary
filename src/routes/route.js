import express from 'express';
import diaryController from '../controller/diary';

const router = express.Router();
router.get('/entries', diaryController.getAllDiaryEntries);
router.get('/entries/:entryId', diaryController.getSingleEntry);
router.post('/entries', diaryController.createDiaryEntry);
router.put('/entries/:entryId', diaryController.updateEntry);
router.delete('/entries/:entryId', diaryController.deleteEntry);
export default router;
