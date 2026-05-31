"use client";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export const ProblemSolution = () => {
  return (
    <section className="py-32 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
         <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Creative Workflows Are <span className="text-destructive">Broken</span></h2>
         <p className="text-muted-foreground text-lg">Stop managing clients through WhatsApp and lost email threads.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
         {/* Problems */}
         <motion.div 
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           className="glass p-8 rounded-3xl border border-destructive/20 relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 w-64 h-64 bg-destructive/10 rounded-full blur-3xl" />
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><AlertCircle className="text-destructive" /> The Old Way</h3>
            <ul className="space-y-6">
               {[
                 "WhatsApp communication chaos",
                 "Lost project files in endless threads",
                 "Revision confusion and scope creep",
                 "Missed payments and late invoices",
                 "Deadline tracking issues"
               ].map((item, i) => (
                 <motion.li 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 text-muted-foreground"
                 >
                    <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">
                       <div className="w-2 h-2 rounded-full bg-destructive" />
                    </div>
                    {item}
                 </motion.li>
               ))}
            </ul>
         </motion.div>

         {/* Solutions */}
         <motion.div 
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           className="glass p-8 rounded-3xl border border-primary/20 relative overflow-hidden"
         >
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><CheckCircle2 className="text-primary" /> Meet MotionFlow</h3>
            <ul className="space-y-6">
               {[
                 "Centralized client and project management",
                 "Real-Time updates and automated tracking",
                 "Organized workflow with unified file storage",
                 "Built-in secure Stripe payment links",
                 "Clear timelines and milestone tracking"
               ].map((item, i) => (
                 <motion.li 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 text-white"
                 >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                       <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    {item}
                 </motion.li>
               ))}
            </ul>
         </motion.div>
      </div>
    </section>
  );
};
