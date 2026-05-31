import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // For development without a real MongoDB Atlas URI, we might want to skip or use a local one
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/motionflow';
    
    // In a real environment, we'd strictly require MONGO_URI
    if (!process.env.MONGO_URI) {
      console.warn('Warning: MONGO_URI is not defined in .env, falling back to local MongoDB.');
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
