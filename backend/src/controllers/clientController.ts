import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Client from '../models/Client';

export const getClients = async (req: AuthRequest, res: Response) => {
  try {
    const clients = await Client.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(clients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createClient = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, company, notes, phone, address } = req.body;
    const client = await Client.create({ name, email, company, notes, phone, address, user: req.user._id });
    res.status(201).json(client);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateClient = async (req: AuthRequest, res: Response) => {
  try {
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.status(200).json(client);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteClient = async (req: AuthRequest, res: Response) => {
  try {
    const client = await Client.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
