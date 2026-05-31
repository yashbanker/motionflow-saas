"use client";
import { motion } from "framer-motion";

const labels = ["Creative Agencies", "Video Editors", "Motion Designers", "Freelancers", "Marketing Teams", "Design Studios"];

export const TrustBar = () => {
  return (
    <div className="w-full py-12 border-y border-white/5 bg-[#050505]/50 backdrop-blur-sm overflow-hidden flex relative">
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        className="flex whitespace-nowrap items-center gap-16 px-8"
      >
        {/* Quadruple array for seamless slow loop */}
        {[...labels, ...labels, ...labels, ...labels].map((label, i) => (
          <div key={i} className="flex items-center gap-3 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
            <span className="text-xl font-bold text-white/80">{label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
