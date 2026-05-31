"use client";

import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information and portfolio details.</p>
      </div>
      <div className="glass rounded-xl border border-white/10 p-6">
        <div className="py-20 text-center text-gray-500">
           <User className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-50" />
           <p>Profile management coming soon.</p>
        </div>
      </div>
    </div>
  );
}
