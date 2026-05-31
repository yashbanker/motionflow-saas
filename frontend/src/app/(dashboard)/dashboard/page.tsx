"use client";

import { DollarSign, Briefcase, Users, Activity } from "lucide-react";

export default function DashboardOverview() {
  const stats = [
    { label: "Total Revenue", value: "$45,231", icon: DollarSign, change: "+20%" },
    { label: "Active Projects", value: "12", icon: Briefcase, change: "+2" },
    { label: "Total Clients", value: "48", icon: Users, change: "+14%" },
    { label: "Activity Score", value: "98/100", icon: Activity, change: "+5%" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Overview</h1>
        <p className="text-muted-foreground mt-1">Here&apos;s what&apos;s happening with your creative business today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="glass p-6 rounded-xl border border-white/10 relative overflow-hidden group animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon className="w-16 h-16 text-primary" />
            </div>
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="p-3 bg-primary/20 rounded-lg text-primary">
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-gray-400">{stat.label}</p>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-xs text-green-400 font-medium">
                {stat.change} <span className="text-gray-500 font-normal">from last month</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div 
          className="lg:col-span-2 glass rounded-xl border border-white/10 p-6 h-[400px] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-[400ms]"
        >
          <h3 className="text-lg font-bold mb-4">Revenue Analytics</h3>
          <div className="flex-1 flex items-end gap-2 pb-4 pt-10">
            {/* Mock Chart */}
            {[40, 60, 30, 80, 50, 90, 70, 100, 60, 40, 80, 60].map((h, i) => (
              <div key={i} className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary transition-colors relative group" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 z-20">
                  ${(h * 123).toFixed(0)}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2 border-t border-white/10 pt-4">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        <div 
          className="glass rounded-xl border border-white/10 p-6 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-[500ms]"
        >
          <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2">
            {[
              { title: "Invoice Paid", desc: "Acme Corp paid $5,000", time: "2h ago", color: "bg-green-500" },
              { title: "New Project", desc: "UI Kit Design started", time: "5h ago", color: "bg-primary" },
              { title: "File Uploaded", desc: "Brand_Assets.zip", time: "1d ago", color: "bg-blue-500" },
              { title: "Message", desc: "Tony left a comment", time: "1d ago", color: "bg-yellow-500" },
            ].map((act, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative mt-1">
                  <div className={`w-3 h-3 rounded-full ${act.color} shadow-[0_0_10px_currentColor]`} />
                  {i !== 3 && <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-10 bg-white/10" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{act.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{act.desc}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
