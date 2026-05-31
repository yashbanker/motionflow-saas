import mongoose, { Schema, Document } from 'mongoose';

export interface IFile extends Document {
  name: string;
  url: string;
  cloudinaryId: string;
  type: string;
  size: number;
  project?: mongoose.Types.ObjectId;
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FileSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: Number, required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', index: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true }
  },
  { timestamps: true }
);

export default mongoose.model<IFile>('File', FileSchema);
