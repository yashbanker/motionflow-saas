"use client";
import { motion } from "framer-motion";

export const LiveAnalytics = () => {
  return (
    <section className="py-32 px-4 max-w-6xl mx-auto relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="text-center mb-16 relative z-10">
         <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Deep Insights</h2>
         <p className="text-muted-foreground text-lg">Monitor your creative business growth in real-time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-3xl border border-white/5 h-[400px] flex flex-col"
        >
          <h3 className="text-xl font-bold mb-8">Revenue Growth</h3>
          <div className="flex-1 flex items-end justify-between gap-4">
            {[40, 55, 45, 75, 60, 95, 80, 100].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-t-md relative group cursor-pointer"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#050505] border border-white/10 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  ${(h * 124).toFixed(0)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass p-8 rounded-3xl border border-white/5 h-[400px] flex flex-col"
        >
          <h3 className="text-xl font-bold mb-8">Project Completion</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <motion.div
              initial={{ rotate: -90, scale: 0.5 }}
              whileInView={{ rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-64 h-64 rounded-full border-[16px] border-white/5 border-t-accent border-r-accent border-b-accent/50 shadow-[0_0_30px_rgba(244,63,94,0.3)] relative flex items-center justify-center"
            >
              <div className="text-center">
                <span className="text-5xl font-bold text-white">87%</span>
                <p className="text-sm text-muted-foreground mt-2">Success Rate</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
