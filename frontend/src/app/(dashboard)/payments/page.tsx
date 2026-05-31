"use client";

import { CreditCard } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Payments</h1>
        <p className="text-muted-foreground mt-1">Track your earnings and manage payout methods.</p>
      </div>
      <div className="glass rounded-xl border border-white/10 p-6">
        <div className="py-20 text-center text-gray-500">
           <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-50" />
           <p>Payment integration coming soon.</p>
        </div>
      </div>
    </div>
  );
}
