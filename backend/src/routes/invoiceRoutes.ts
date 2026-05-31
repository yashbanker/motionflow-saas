import { Router } from 'express';
import { getInvoices, createInvoice, payInvoice, updateInvoice, deleteInvoice } from '../controllers/invoiceController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.route('/').get(protect, getInvoices).post(protect, createInvoice);
router.route('/:id').put(protect, updateInvoice).delete(protect, deleteInvoice);
router.route('/:id/pay').post(protect, payInvoice);

export default router;
