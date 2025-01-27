import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { createCohort, deleteCohort, getAllCohorts, getCohort, updateCohort } from '../controllers/cohortController.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createCohort);
router.get('/', getAllCohorts);
router.get('/:id', getCohort);
router.patch('/:id', updateCohort);
router.delete('/:id', deleteCohort);

export default router;