import { Router } from 'express';
import { getHistory, chat } from '../controllers/aiController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.route('/history').get(protect, getHistory);
router.route('/chat').post(protect, chat);

export default router;
