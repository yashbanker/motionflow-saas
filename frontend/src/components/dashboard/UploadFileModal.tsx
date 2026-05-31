"use client";

import { useState } from "react";
import { X, UploadCloud } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFileAPI } from "@/lib/api";

interface UploadFileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadFileModal({ isOpen, onClose }: UploadFileModalProps) {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);

  const mutation = useMutation({
    mutationFn: uploadFileAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
      setFile(null);
      onClose();
    }
  });

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    // Optionally append project ID if needed
    mutation.mutate(formData as any);
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
        
        <h2 className="text-2xl font-bold text-white mb-6">Upload File</h2>
        
        <div className="border-2 border-dashed border-white/20 rounded-xl p-10 flex flex-col items-center justify-center text-center bg-black/40 hover:bg-black/60 hover:border-primary/50 transition-colors cursor-pointer relative">
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
          {file ? (
            <p className="text-primary font-medium">{file.name}</p>
          ) : (
            <>
              <p className="text-white font-medium mb-1">Click or drag file to this area to upload</p>
              <p className="text-sm text-gray-400">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files.</p>
            </>
          )}
        </div>

        <div className="pt-6 flex justify-end gap-3">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleUpload}
            disabled={!file || mutation.isPending}
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors disabled:opacity-50"
          >
            {mutation.isPending ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
      </div>
    </div>
  );
}
