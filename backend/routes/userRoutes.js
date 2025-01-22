import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userControllers';

const router = express.Router();

router.use(authenticate);

router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);