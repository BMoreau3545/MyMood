import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { createBlacklist, deleteBlacklist, getBlacklistByStudent, getBlacklistBySupervisor } from '../controllers/blacklistController';


const router = express.Router();

router.use(authenticate);

router.post('/', createBlacklist);
router.get('/supervisor/:id', getBlacklistBySupervisor);
router.get('/student/:id', getBlacklistByStudent);
router.delete('/:supervisor_id/:student_id', deleteBlacklist);