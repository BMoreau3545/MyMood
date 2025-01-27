import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { createAlert, deleteAlert, getAlertByUser, getAlerts, getAlertsUnresolved, resolveAlert } from '../controllers/alertController.js';

const router = express.Router();

router.use(authenticate);

router.post('/user/:user_id', authorize(['student']), createAlert);
router.get('/all', authorize(['admin', 'supervisor']), getAlerts);
router.get('/user/all/:user_id', authorize(['admin', 'supervisor']), getAlertByUser);
router.get('/unresolved', authorize(['admin', 'supervisor']), getAlertsUnresolved);
router.patch('/user/:user_id', authorize(['admin', 'supervisor']), resolveAlert);
router.delete('/:alert_id', authorize(['admin']), deleteAlert);

export default router;
