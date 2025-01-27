import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { createCohortAssign, getAllAssignForOneCohort, getAllAssignForOneUser, deleteUserFromCohortAssign } from '../controllers/cohortAssignController.js';

const router = express.Router();

router.use(authenticate);

router.post('/:cohort_id', authorize(['admin']), createCohortAssign);
router.get('/:cohort_id', authorize(['admin', 'supervisor']), getAllAssignForOneCohort);
router.get('/user/:user_id', authorize(['admin']), getAllAssignForOneUser);
router.delete('/user/:cohort_id', authorize(['admin']), deleteUserFromCohortAssign);

export default router;