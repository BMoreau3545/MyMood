import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { createMood, getAllMoodsForOneUser, getLastMoodForOneUser } from '../controllers/moodController.js';


const router = express.Router();

router.use(authenticate);

router.post('/user/:user_id', authorize(['student']), createMood);
router.get('/user/:user_id', authorize(['supervisor']), getAllMoodsForOneUser);
router.get('/user/:user_id/last', authorize(['student', 'supervisor']), getLastMoodForOneUser);

export default router;
