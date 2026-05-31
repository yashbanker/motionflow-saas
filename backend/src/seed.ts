import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User';
import Client from './models/Client';
import Project from './models/Project';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/motionflow');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Client.deleteMany();
    await Project.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    const createdUser = await User.create({
      name: 'Admin User',
      email: 'admin@motionflow.com',
      passwordHash,
      role: 'Admin'
    });

    const client1 = await Client.create({
      name: 'Acme Corp',
      email: 'contact@acme.com',
      company: 'Acme Corporation'
    });

    const client2 = await Client.create({
      name: 'Stark Industries',
      email: 'tony@stark.com',
      company: 'Stark Industries'
    });

    await Project.create([
      {
        title: 'Q3 Motion Graphics',
        description: 'Creating 30s motion graphics for Q3 campaign',
        client: client1._id,
        status: 'Active',
        user: createdUser._id,
        budget: 5000,
        deadline: new Date(Date.now() + 864000000)
      },
      {
        title: 'Product Launch Video',
        description: 'Full product launch video editing',
        client: client2._id,
        status: 'Pending',
        user: createdUser._id,
        budget: 12000,
        deadline: new Date(Date.now() + 1728000000)
      }
    ]);

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error: any) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
