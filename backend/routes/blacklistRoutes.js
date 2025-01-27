import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { createBlacklist, deleteBlacklist, getBlacklistByStudent, getBlacklistBySupervisor } from '../controllers/blacklistController.js';


const router = express.Router();

router.use(authenticate);

router.post('/', createBlacklist);
router.get('/supervisor/:supervisor_id', getBlacklistBySupervisor);
router.get('/student/:student_id', getBlacklistByStudent);
router.delete('/:supervisor_id/:student_id', deleteBlacklist);

export default router;