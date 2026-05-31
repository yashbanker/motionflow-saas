import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import File from '../models/File';

export const getFiles = async (req: AuthRequest, res: Response) => {
  try {
    const files = await File.find({ uploadedBy: req.user._id }).populate('uploadedBy', 'name').sort({ createdAt: -1 });
    res.status(200).json(files);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadFile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { project } = req.body;

    const file = await File.create({
      name: req.file.originalname,
      url: req.file.path, // Cloudinary URL
      cloudinaryId: req.file.filename,
      type: req.file.mimetype,
      size: req.file.size,
      project: project || undefined,
      uploadedBy: req.user._id
    });

    res.status(201).json(file);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFile = async (req: AuthRequest, res: Response) => {
  try {
    const file = await File.findOneAndDelete({ _id: req.params.id, uploadedBy: req.user._id });
    if (!file) return res.status(404).json({ error: 'File not found' });
    
    // In a real scenario, also delete from Cloudinary here:
    // await cloudinary.uploader.destroy(file.cloudinaryId);

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
