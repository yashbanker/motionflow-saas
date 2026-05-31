"use client";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Sarah J.", role: "Creative Director", text: "MotionFlow completely transformed how our agency handles revisions and invoices. Highly recommended." },
  { name: "Mike T.", role: "Freelance Editor", text: "Finally, a tool that actually understands the video editing workflow. No more lost Dropbox links." },
  { name: "Elena R.", role: "Motion Designer", text: "The Stripe integration alone saved me 10 hours a week in chasing down late payments." },
  { name: "David L.", role: "Studio Owner", text: "We migrated our entire team of 15 to MotionFlow. The centralized dashboard is a lifesaver." },
];

export const Testimonials = () => {
  return (
    <section className="py-32 overflow-hidden border-y border-white/5 bg-[#050505]/50 backdrop-blur-sm">
      <div className="text-center mb-16 px-4">
         <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Loved by Creatives</h2>
         <p className="text-muted-foreground text-lg">Don&apos;t just take our word for it.</p>
      </div>

      <div className="relative flex whitespace-nowrap overflow-hidden py-4">
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-6 px-4"
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="glass p-8 rounded-3xl border border-white/5 w-[400px] shrink-0 whitespace-normal shadow-xl">
              <p className="text-white/80 text-lg italic mb-6">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/50" />
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
