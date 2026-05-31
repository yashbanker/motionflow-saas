"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

// A simple counter component that animates from 0 to value
const AnimatedCounter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{count}</span>;
};

const PARTICLES = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: Math.random() * 10 + 10,
  delay: Math.random() * 10,
}));

export const HeroSection = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms based on scroll
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const yParticles = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);
  const yText = useTransform(scrollY, [0, 500], [0, -100]);

  // Staggered text reveal
  const text = "Manage Creative Projects";
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 100,
    },
  };

  return (
    <section ref={ref} className="relative min-h-[100vh] flex flex-col items-center justify-center pt-32 pb-16 px-4 overflow-hidden bg-[#020202]">
      {/* Parallax Layer 1: Aurora Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000" style={{ animationDuration: '12s' }} />
      </motion.div>

      {/* Parallax Layer 2: Particles */}
      <motion.div style={{ y: yParticles }} className="absolute inset-0 overflow-hidden pointer-events-none z-10">
         {PARTICLES.map((p) => (
           <motion.div
             key={p.id}
             className="absolute w-1 h-1 bg-white/40 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
             style={{
               left: p.left,
               top: p.top,
             }}
             animate={{
               y: [0, -500],
               opacity: [0, 1, 0],
             }}
             transition={{
               duration: p.duration,
               repeat: Infinity,
               ease: "linear",
               delay: p.delay,
             }}
           />
         ))}
      </motion.div>

      {/* Parallax Layer 3: Main Typography */}
      <motion.div style={{ y: yText, opacity: opacityText }} className="relative z-20 max-w-5xl mx-auto text-center space-y-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-extrabold tracking-tighter leading-[1.1] flex flex-wrap justify-center gap-x-4">
            {words.map((word, index) => (
              <motion.span variants={child} key={index} className="inline-block overflow-hidden pb-4">
                <span className="inline-block">{word}</span>
              </motion.span>
            ))}
            <motion.span variants={child} className="inline-block overflow-hidden w-full mt-2 pb-4">
               <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent bg-[length:200%_auto] animate-[gradient_8s_ease_infinite]">
                 Like a Pro
               </span>
            </motion.span>
          </h1>
          <motion.p 
            variants={child}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium"
          >
            One platform for freelancers, motion designers, video editors, agencies, and creative teams.
          </motion.p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1, type: "spring" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
        >
          <Link 
            href="/register" 
            data-cursor-magnetic 
            className="relative px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:scale-105 overflow-hidden group"
          >
            <span className="relative z-10">Start Free Trial</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link 
            href="#demo" 
            data-cursor-magnetic 
            className="px-10 py-5 rounded-full glass font-bold text-lg hover:bg-white/10 transition-all hover:scale-105"
          >
            Book Demo
          </Link>
        </motion.div>

        {/* Animated Statistics */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 max-w-4xl mx-auto border-t border-white/5 mt-20"
        >
          <div className="flex flex-col items-center group cursor-default" data-cursor-magnetic>
            <span className="text-5xl font-black text-white group-hover:text-primary transition-colors tracking-tighter">
               <AnimatedCounter value={5000} />+
            </span>
            <span className="text-sm text-muted-foreground mt-2 uppercase tracking-widest font-semibold">Projects Managed</span>
          </div>
          <div className="flex flex-col items-center group cursor-default" data-cursor-magnetic>
            <span className="text-5xl font-black text-white group-hover:text-primary transition-colors tracking-tighter">
               <AnimatedCounter value={1200} />+
            </span>
            <span className="text-sm text-muted-foreground mt-2 uppercase tracking-widest font-semibold">Clients Served</span>
          </div>
          <div className="flex flex-col items-center group cursor-default" data-cursor-magnetic>
            <span className="text-5xl font-black text-white group-hover:text-primary transition-colors tracking-tighter">
               99.9%
            </span>
            <span className="text-sm text-muted-foreground mt-2 uppercase tracking-widest font-semibold">Uptime</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
