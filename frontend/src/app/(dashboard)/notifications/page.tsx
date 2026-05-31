"use client";

import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Notifications</h1>
        <p className="text-muted-foreground mt-1">Stay updated with your latest project activity.</p>
      </div>
      <div className="glass rounded-xl border border-white/10 p-6">
        <div className="py-20 text-center text-gray-500">
           <Bell className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-50" />
           <p>No new notifications at this time.</p>
        </div>
      </div>
    </div>
  );
}
