import { Router } from 'express';
import { getClients, createClient, updateClient, deleteClient } from '../controllers/clientController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.route('/').get(protect, getClients).post(protect, createClient);
router.route('/:id').put(protect, updateClient).delete(protect, deleteClient);

export default router;
