"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export const CTA = () => {
  return (
    <section className="py-32 px-4 max-w-4xl mx-auto text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 space-y-8"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Ready To Simplify <br/>Creative Project Management?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join thousands of freelancers and agencies who are already scaling their creative businesses with MotionFlow.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link href="/register" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105">
            Start Free Trial
          </Link>
          <Link href="#demo" className="px-8 py-4 rounded-full glass font-bold hover:bg-white/10 transition-all">
            Book Demo
          </Link>
        </div>
      </motion.div>
    </section>
  );
};
