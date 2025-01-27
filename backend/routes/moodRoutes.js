import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { createMood, getAllMoodsForOneUser, getLastMoodForOneUser } from '../controllers/moodController.js';


const router = express.Router();

router.use(authenticate);

router.post('/user/:user_id', createMood);
router.get('/user/:user_id', getAllMoodsForOneUser);
router.get('/user/:user_id/last', getLastMoodForOneUser);

export default router;
