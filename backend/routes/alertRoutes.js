import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { createAlert, getAlertByUserUnresolved, getAlertsUnresolved, resolveAlert } from '../controllers/alertController';


const router = express.Router();

router.use(authenticate);

router.post('/', createAlert);
router.get('/', getAlertsUnresolved);
router.get('/user/:id', getAlertByUserUnresolved);
router.patch('/:id', resolveAlert);
