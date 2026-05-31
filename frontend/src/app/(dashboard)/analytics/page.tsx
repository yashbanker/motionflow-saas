"use client";

import { PieChart } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Analytics</h1>
        <p className="text-muted-foreground mt-1">Deep dive into your business metrics and growth.</p>
      </div>
      <div className="glass rounded-xl border border-white/10 p-6">
        <div className="py-20 text-center text-gray-500">
           <PieChart className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-50" />
           <p>Detailed analytics dashboard coming soon.</p>
        </div>
      </div>
    </div>
  );
}
