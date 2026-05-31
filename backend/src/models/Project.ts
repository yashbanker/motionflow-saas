import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description?: string;
  client: mongoose.Types.ObjectId;
  status: 'Pending' | 'Active' | 'Review' | 'Revision' | 'Approved' | 'Delivered';
  deadline?: Date;
  budget?: number;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true, index: true },
    status: { 
      type: String, 
      enum: ['Pending', 'Active', 'Review', 'Revision', 'Approved', 'Delivered'], 
      default: 'Pending',
      index: true
    },
    deadline: { type: Date },
    budget: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true }
  },
  { timestamps: true }
);

ProjectSchema.index({ title: 'text', description: 'text' });

export default mongoose.model<IProject>('Project', ProjectSchema);
