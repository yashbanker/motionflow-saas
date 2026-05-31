"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, MoreVertical, Mail, Building2, ExternalLink } from "lucide-react";
import { fetchClients } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { CreateClientModal } from "@/components/dashboard/CreateClientModal";

export default function ClientsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: clients = [], isLoading: loading } = useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Clients</h1>
          <p className="text-muted-foreground mt-1">Manage your creative agency clients and contacts.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Client
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search clients..." 
            className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client: { _id: string, name: string, company?: string, email: string, createdAt: string }, i: number) => (
            <motion.div
              key={client._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-colors relative group"
            >
              <div className="absolute top-6 right-6">
                <button className="text-gray-500 hover:text-white transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg font-bold text-white shadow-lg">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{client.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Building2 className="w-3 h-3" />
                    {client.company || 'Independent'}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a href={`mailto:${client.email}`} className="hover:text-primary transition-colors">{client.email}</a>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs text-gray-500">Added {new Date(client.createdAt).toLocaleDateString()}</span>
                <button className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                  View Profile <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
          {clients.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500">
              No clients found. Add your first client to get started!
            </div>
          )}
        </div>
      )}
      <CreateClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
