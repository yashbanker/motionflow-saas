"use client";
import { motion } from "framer-motion";
import { Users, Briefcase, FileText, MessageSquare, BarChart, Bot } from "lucide-react";

const features = [
  { icon: Users, title: "Client Management", desc: "Keep all client details, notes, and contacts in one secure CRM." },
  { icon: Briefcase, title: "Project Tracking", desc: "Monitor milestones, deadlines, and deliverables effortlessly." },
  { icon: FileText, title: "File Storage", desc: "Securely host and share video files, project assets, and documents." },
  { icon: MessageSquare, title: "Messaging", desc: "Real-time chat integrated directly into your project workflows." },
  { icon: BarChart, title: "Analytics", desc: "Visual dashboards for revenue, client growth, and team performance." },
  { icon: Bot, title: "AI Assistant", desc: "Automate task creation, draft proposals, and generate invoices." },
];

export const FeatureShowcase = () => {
  return (
    <section className="py-32 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
         <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Everything You Need</h2>
         <p className="text-muted-foreground text-lg">Powerful features wrapped in a beautiful, intuitive interface.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all group hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(124,58,237,0.3)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-primary/20 transition-colors">
              <feat.icon className="text-white/70 group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
