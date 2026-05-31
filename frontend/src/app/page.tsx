"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { TrustBar } from "@/components/landing/TrustBar";
import { HeroDashboard } from "@/components/landing/HeroDashboard";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { LiveAnalytics } from "@/components/landing/LiveAnalytics";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-primary/30 relative">
      <HeroSection />
      <TrustBar />
      
      {/* 3D Dashboard Section */}
      <section id="demo" className="py-24 px-4 max-w-6xl mx-auto">
         <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Experience The Difference</h2>
            <p className="text-muted-foreground mt-4 text-lg">A unified WebGL workspace designed for creatives.</p>
         </div>
         <HeroDashboard />
      </section>

      <ProblemSolution />
      <HowItWorks />
      <FeatureShowcase />
      <LiveAnalytics />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
