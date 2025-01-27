import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { createCohortAssign, getAllAssignForOneCohort, getAllAssignForOneUser, deleteUserFromCohortAssign } from '../controllers/cohortAssignController.js';

const router = express.Router();

router.use(authenticate);

router.post('/:cohort_id', createCohortAssign);
router.get('/:cohort_id', getAllAssignForOneCohort);
router.get('/user/:user_id', getAllAssignForOneUser);
router.delete('/user/:cohort_id', deleteUserFromCohortAssign);

export default router;