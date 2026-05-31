"use client";

import { FileOutput } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Blog</h1>
        <p className="text-muted-foreground mt-1">Manage your agency&apos;s public blog posts.</p>
      </div>
      <div className="glass rounded-xl border border-white/10 p-6">
        <div className="py-20 text-center text-gray-500">
           <FileOutput className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-50" />
           <p>Blog CMS coming soon.</p>
        </div>
      </div>
    </div>
  );
}
