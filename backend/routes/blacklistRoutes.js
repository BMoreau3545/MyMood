import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { createBlacklist, deleteBlacklist, getBlacklistByStudent, getBlacklistBySupervisor } from '../controllers/blacklistController.js';


const router = express.Router();

router.use(authenticate);

router.post('/', authorize(['admin']),createBlacklist);
router.get('/supervisor/:supervisor_id', authorize(['admin']), getBlacklistBySupervisor);
router.get('/student/:student_id', authorize(['admin']), getBlacklistByStudent);
router.delete('/:supervisor_id/:student_id', authorize(['admin']), deleteBlacklist);

export default router;