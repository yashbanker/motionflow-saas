import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Invoice from '../models/Invoice';

export const getInvoices = async (req: AuthRequest, res: Response) => {
  try {
    const invoices = await Invoice.find({ user: req.user._id })
      .populate('client', 'name company')
      .populate('project', 'title')
      .sort({ createdAt: -1 });
    res.status(200).json(invoices);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const { invoiceNumber, project, client, amount, gst, dueDate, status } = req.body;
    const invoice = await Invoice.create({
      invoiceNumber, project, client, amount, gst, dueDate, status, user: req.user._id
    });
    res.status(201).json(invoice);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const payInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const invoice = await Invoice.findOne({ _id: req.params.id, user: req.user._id });
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    
    invoice.status = 'Paid';
    await invoice.save();
    
    res.status(200).json(invoice);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    res.status(200).json(invoice);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const invoice = await Invoice.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
