import { Router } from 'express';
import { getMessages, createMessage } from '../controllers/messageController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.route('/').post(protect, createMessage);
router.route('/:projectId').get(protect, getMessages);

export default router;
