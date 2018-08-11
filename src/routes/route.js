import express from 'express';
import diaryController from '../controller/diary';
import user from '../controller/users';
import verifyToken from '../middleware/auth';

const router = express.Router();

router.post('/auth/signup', user.signUp);
router.post('/auth/signin', user.signIn);
router.get('/entries', verifyToken, diaryController.getAllDiaryEntries);
router.get('/entries/:entryId', verifyToken, diaryController.getSingleEntry);
router.post('/entries', verifyToken, diaryController.createDiaryEntry);
router.put('/entries/:entryId', verifyToken, diaryController.updateEntry);
router.delete('/entries/:entryId', verifyToken, diaryController.deleteEntry);

export default router;
