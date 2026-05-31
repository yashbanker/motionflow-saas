import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Project from '../models/Project';

export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const projects = await Project.find({ user: req.user._id }).populate('client').sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, client, status, deadline, budget } = req.body;
    const project = await Project.create({ 
      title, description, client, status, deadline, budget, user: req.user._id 
    });
    res.status(201).json(project);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json(project);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
