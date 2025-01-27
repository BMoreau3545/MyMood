import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { createCohort, deleteCohort, getAllCohorts, getCohort, updateCohort } from '../controllers/cohortController.js';

const router = express.Router();

router.use(authenticate);

router.post('/', authorize(['admin', 'supervisor']), createCohort);
router.get('/', authorize(['admin']), getAllCohorts);
router.get('/:id', authorize(['admin', 'supervisor']), getCohort);
router.patch('/:id', authorize(['admin']), updateCohort);
router.delete('/:id', authorize(['admin']), deleteCohort);

export default router;