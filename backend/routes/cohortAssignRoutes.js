import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { createCohortAssign, getAllAssignForOneCohort, getAllAssignForOneUser, deleteUserFromCohortAssign } from '../controllers/CohortAssignController';

const router = express.Router();

router.use(authenticate);

router.post('/', createCohortAssign);
router.get('/cohort/:id', getAllAssignForOneCohort);
router.get('/user/:id', getAllAssignForOneUser);
router.delete('/cohort/:id/user/:id', deleteUserFromCohortAssign);