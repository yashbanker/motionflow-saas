"use client";

import { Plus, Receipt } from "lucide-react";
import { useState } from "react";
import { fetchInvoices } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { CreateInvoiceModal } from "@/components/dashboard/CreateInvoiceModal";

export default function InvoicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: invoices = [], isLoading: loading } = useQuery({
    queryKey: ['invoices'],
    queryFn: fetchInvoices
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Invoices</h1>
          <p className="text-muted-foreground mt-1">Manage and track your client invoices.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Create Invoice
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="glass rounded-xl border border-white/10 p-6">
          {invoices.length === 0 ? (
             <div className="py-20 text-center text-gray-500">
               <Receipt className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-50" />
               <p>No invoices created yet.</p>
             </div>
          ) : (
             <div className="space-y-4">
               {invoices.map((inv: any) => (
                 <div key={inv._id} className="flex justify-between items-center p-4 border border-white/5 rounded-lg bg-black/20 hover:bg-black/40 transition-colors">
                   <div>
                     <h3 className="text-lg font-medium text-white">{inv.invoiceNumber}</h3>
                     <p className="text-sm text-gray-400">Client: {inv.client?.name || 'Unknown'}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-lg font-bold text-white">${inv.amount}</p>
                     <span className={`text-xs px-2 py-1 rounded-full ${inv.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                       {inv.status}
                     </span>
                   </div>
                 </div>
               ))}
             </div>
          )}
        </div>
      )}
      <CreateInvoiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
