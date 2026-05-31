"use client";

import { FolderUp, FileText } from "lucide-react";
import { useState } from "react";
import { fetchFiles } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { UploadFileModal } from "@/components/dashboard/UploadFileModal";

export default function FilesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: files = [], isLoading: loading } = useQuery({
    queryKey: ['files'],
    queryFn: fetchFiles
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Files & Assets</h1>
          <p className="text-muted-foreground mt-1">Manage all your project files, brand assets, and deliverables.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <FolderUp className="w-5 h-5" />
          Upload Files
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* File placeholders */}
          {files.length === 0 ? (
            <div className="col-span-full py-20 text-center text-gray-500 glass rounded-xl border border-white/10">
              <FolderUp className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-50" />
              <p>No files uploaded yet. Upload your first asset!</p>
            </div>
          ) : (
            files.map((file: any) => (
              <a 
                href={file.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                key={file._id} 
                className="glass p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-colors flex flex-col items-center text-center cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-white font-medium truncate w-full mb-1">{file.name}</h3>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </a>
            ))
          )}
        </div>
      )}
      <UploadFileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
