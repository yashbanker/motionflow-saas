import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Conversation from '../models/Conversation';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getHistory = async (req: AuthRequest, res: Response) => {
  try {
    let conversation = await Conversation.findOne({ user: req.user._id }).sort({ updatedAt: -1 });
    
    if (!conversation) {
      conversation = await Conversation.create({
        user: req.user._id,
        messages: [{ role: 'model', content: "Hello! I am MotionFlow AI, your creative copilot. How can I help you manage your projects today?" }]
      });
    }

    res.status(200).json(conversation);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const chat = async (req: AuthRequest, res: Response) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    let conversation = await Conversation.findOne({ user: req.user._id }).sort({ updatedAt: -1 });
    if (!conversation) {
      conversation = await Conversation.create({ user: req.user._id, messages: [] });
    }

    // Add user message to DB
    conversation.messages.push({ role: 'user', content: prompt, timestamp: new Date() });
    await conversation.save();

    // Prepare history for Gemini
    const contents = conversation.messages.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Call Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: "You are MotionFlow AI, an intelligent copilot for creative professionals, freelancers, and agencies. Be helpful, concise, and professional."
      }
    });

    const aiResponse = response.text || "I'm sorry, I couldn't generate a response.";

    // Add AI message to DB
    conversation.messages.push({ role: 'model', content: aiResponse, timestamp: new Date() });
    await conversation.save();

    res.status(200).json(conversation);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
