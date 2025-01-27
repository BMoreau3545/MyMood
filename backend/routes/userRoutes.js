import express from 'express';
// import { authenticate } from '../middleware/authMiddleware.js';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

// router.use(authenticate);

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;