"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createInvoice, fetchClients, fetchProjects } from "@/lib/api";

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InvoiceFormData {
  invoiceNumber: string;
  project: string;
  client: string;
  amount: number;
  gst: number;
  dueDate: string;
  status: string;
}

export function CreateInvoiceModal({ isOpen, onClose }: CreateInvoiceModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<InvoiceFormData>();
  const queryClient = useQueryClient();

  const { data: clients = [] } = useQuery({ queryKey: ['clients'], queryFn: fetchClients, enabled: isOpen });
  const { data: projects = [] } = useQuery({ queryKey: ['projects'], queryFn: fetchProjects, enabled: isOpen });

  const mutation = useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      reset();
      onClose();
    }
  });

  if (!isOpen) return null;

  const onSubmit = (data: InvoiceFormData) => {
    mutation.mutate(data as any);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#111] border border-white/10 rounded-xl w-full max-w-lg p-6 relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-6">Create Invoice</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Invoice Number</label>
              <input 
                {...register("invoiceNumber", { required: true })}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="INV-2023-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Due Date</label>
              <input 
                type="date"
                {...register("dueDate", { required: true })}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Client</label>
              <select 
                {...register("client", { required: true })}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select a client...</option>
                {clients.map((c: any) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Project</label>
              <select 
                {...register("project", { required: true })}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select a project...</option>
                {projects.map((p: any) => (
                  <option key={p._id} value={p._id}>{p.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Amount ($)</label>
              <input 
                type="number"
                {...register("amount", { required: true })}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">GST / Tax (%)</label>
              <input 
                type="number"
                {...register("gst")}
                defaultValue={0}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
            <select 
              {...register("status")}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            >
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={mutation.isPending}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors disabled:opacity-50"
            >
              {mutation.isPending ? 'Saving...' : 'Create Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
