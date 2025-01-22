import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { createCohort, deleteCohort, getAllCohorts, getCohort, updateCohort } from '../controllers/cohortController';

const router = express.Router();

router.use(authenticate);

router.post('/', createCohort);
router.get('/', getAllCohorts);
router.get('/:id', getCohort);
router.put('/:id', updateCohort);
router.delete('/:id', deleteCohort);