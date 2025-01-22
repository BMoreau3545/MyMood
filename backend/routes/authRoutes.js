import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { login, logout } from '../controllers/authController';

const router = express.Router();

router.use(authenticate);

router.post('/login', login);
router.delete('/logout', logout);