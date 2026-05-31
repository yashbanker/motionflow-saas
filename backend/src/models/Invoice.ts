import mongoose, { Schema, Document } from 'mongoose';

export interface IInvoice extends Document {
  invoiceNumber: string;
  project: mongoose.Types.ObjectId;
  client: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  amount: number;
  gst?: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  dueDate: Date;
  stripeSessionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceSchema: Schema = new Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true, index: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    amount: { type: Number, required: true },
    gst: { type: Number, default: 0 },
    status: { 
      type: String, 
      enum: ['Draft', 'Sent', 'Paid', 'Overdue'], 
      default: 'Draft',
      index: true
    },
    dueDate: { type: Date, required: true },
    stripeSessionId: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IInvoice>('Invoice', InvoiceSchema);
