import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Message from '../models/Message';

export const getMessages = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const messages = await Message.find({ project: projectId })
      .populate('sender', 'name email role')
      .sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId, content } = req.body;
    const message = await Message.create({
      project: projectId,
      sender: req.user._id,
      content
    });
    
    // We would emit a socket event here, but typically we emit directly from the controller or socket handler
    
    res.status(201).json(message);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
