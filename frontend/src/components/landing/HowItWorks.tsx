"use client";
import { motion } from "framer-motion";

const steps = [
  { step: "01", title: "Add Client", desc: "Send an invite or add them directly to your CRM." },
  { step: "02", title: "Create Project", desc: "Define scope, deadlines, and project deliverables." },
  { step: "03", title: "Collaborate", desc: "Share files and messages in a unified workspace." },
  { step: "04", title: "Deliver Project", desc: "Upload final assets securely for client review." },
  { step: "05", title: "Receive Payment", desc: "Send an automated invoice and get paid instantly." }
];

export const HowItWorks = () => {
  return (
    <section className="py-32 px-4 max-w-6xl mx-auto relative">
      <div className="text-center mb-24">
         <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How It Works</h2>
         <p className="text-muted-foreground text-lg">A streamlined pipeline from pitch to payment.</p>
      </div>

      <div className="relative">
         {/* Connecting Line */}
         <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-transparent -translate-x-1/2 hidden md:block" />
         
         <div className="space-y-12 relative z-10">
            {steps.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                   <div className="flex-1 w-full flex justify-start md:justify-end">
                      {isEven && (
                         <div className="glass p-6 rounded-2xl border border-white/5 w-full md:w-4/5 md:text-right hover:-translate-y-2 transition-transform shadow-xl hover:border-primary/50">
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground">{item.desc}</p>
                         </div>
                      )}
                   </div>
                   
                   {/* Timeline Node */}
                   <div className="w-14 h-14 rounded-full bg-[#050505] border-2 border-primary flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                      <span className="font-bold text-primary">{item.step}</span>
                   </div>

                   <div className="flex-1 w-full flex justify-start">
                      {!isEven && (
                         <div className="glass p-6 rounded-2xl border border-white/5 w-full md:w-4/5 md:text-left hover:-translate-y-2 transition-transform shadow-xl hover:border-primary/50">
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground">{item.desc}</p>
                         </div>
                      )}
                   </div>
                </motion.div>
              );
            })}
         </div>
      </div>
    </section>
  );
};
