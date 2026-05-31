"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, MoreVertical, Clock, Calendar, CheckCircle, CircleDashed } from "lucide-react";
import { fetchProjects } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { CreateProjectModal } from "@/components/dashboard/CreateProjectModal";

export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: projects = [], isLoading: loading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Review': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Pending': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default: return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Active': return <CircleDashed className="w-4 h-4 animate-spin-slow" />;
      case 'Review': return <Clock className="w-4 h-4" />;
      case 'Pending': return <CircleDashed className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage all your active and upcoming creative projects.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search projects..." 
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project: { _id: string, status: string, title: string, description: string, deadline: string, budget?: number }, i: number) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-colors group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                  {getStatusIcon(project.status)}
                  {project.status}
                </div>
                <button className="text-gray-500 hover:text-white transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-6 line-clamp-2">{project.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {new Date(project.deadline).toLocaleDateString()}
                </div>
                <div className="text-sm font-bold text-white">
                  ${project.budget?.toLocaleString()}
                </div>
              </div>
            </motion.div>
          ))}
          {projects.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500">
              No projects found. Create your first project to get started!
            </div>
          )}
        </div>
      )}
      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
