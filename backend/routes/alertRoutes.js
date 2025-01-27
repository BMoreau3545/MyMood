import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { createAlert, deleteAlert, getAlertByUser, getAlerts, getAlertsUnresolved, resolveAlert } from '../controllers/alertController.js';

const router = express.Router();

router.use(authenticate);

router.post('/user/:user_id', createAlert);
router.get('/all', getAlerts);
router.get('/user/all/:user_id', getAlertByUser);
router.get('/unresolved', getAlertsUnresolved);
router.patch('/user/:user_id', resolveAlert);
router.delete('/:alert_id', deleteAlert);

export default router;
