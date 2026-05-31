"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

// Lazy load the 3D scene to keep initial bundle size small and prevent SSR issues
const ThreeScene = dynamic(() => import("./ThreeScene").then(m => m.ThreeScene), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]/50 rounded-3xl border border-white/5">
      <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
    </div>
  )
});

export const HeroDashboard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Scale the container as it comes into view
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ scale, opacity }}
      className="w-full h-[500px] md:h-[700px] relative mt-16 rounded-3xl"
    >
      {isMobile ? (
         <div className="w-full h-full gradient-border glass rounded-2xl p-6 shadow-2xl relative overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-3xl flex flex-col">
            <div className="h-8 w-32 bg-white/10 rounded-md mb-8" />
            <div className="flex-1 flex flex-col gap-6">
               <div className="flex justify-between items-center">
                  <div className="h-6 w-40 bg-white/10 rounded-md" />
                  <div className="h-8 w-8 bg-white/10 rounded-full" />
               </div>
               <div className="flex-1 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col">
                  <div className="h-4 w-32 bg-white/10 rounded-md mb-4" />
                  <div className="flex-1 flex items-end justify-between gap-2">
                     {[30, 50, 40, 70, 60, 90, 80, 100].map((h, i) => (
                        <div key={i} className="w-full bg-primary/30 rounded-t-sm" style={{ height: `${h}%` }} />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      ) : (
         <ThreeScene />
      )}
    </motion.div>
  );
};
