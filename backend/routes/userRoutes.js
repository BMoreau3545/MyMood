import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.use(authenticate);

router.post('/', authorize(['admin']), createUser);
router.get('/', authorize(['admin']), getAllUsers);
router.get('/:id', authorize(['admin', 'supervisor', 'student']), getUser);
router.patch('/:id', authorize(['admin', 'supervisor', 'student']), updateUser);
router.delete('/:id', authorize(['admin']), deleteUser);

export default router;