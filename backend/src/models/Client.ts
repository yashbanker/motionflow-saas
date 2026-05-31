import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  company?: string;
  notes?: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    company: { type: String, trim: true },
    notes: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true }
  },
  { timestamps: true }
);

ClientSchema.index({ name: 'text', company: 'text' });

export default mongoose.model<IClient>('Client', ClientSchema);
