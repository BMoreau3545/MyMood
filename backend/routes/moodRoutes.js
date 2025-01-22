import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { createMood, getAllMoodsForOneUser, getLastMoodForOneUser } from '../controllers/moodController';


const router = express.Router();

router.use(authenticate);

router.post('/', createMood);
router.get('/user/:id', getAllMoodsForOneUser);
router.get('/user/:id/last', getLastMoodForOneUser);
