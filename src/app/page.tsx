"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Dynamic loading of interactive 3D Space Scene Canvas
const SpaceScene = dynamic(() => import("@/components/SpaceScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 w-full h-full bg-[#05050d] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
        <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-cyan-400/60">
          Syncing Universe Coordinates...
        </p>
      </div>
    </div>
  ),
});

export default function Home() {
  const [scrollVal, setScrollVal] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive screen checker
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll();

  // Track global viewport scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollVal(latest);
  });

  return (
    <div className="relative min-h-screen bg-[#05050d] text-white overflow-x-hidden font-body">
      {/* 1. Global Subtle Grain Texture Overlay */}
      <div className="grain-overlay" />

      {/* 2. Fullscreen Space Scene Layer (Fades slightly on scroll) */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
        style={{
          opacity: Math.max(1.0 - scrollVal * 1.5, 0.18)
        }}
      >
        <div className="w-full h-full pointer-events-auto">
          <SpaceScene scrollProgress={scrollVal} />
        </div>
      </div>

      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Scrolling Content Panels */}
      <div className="relative z-10 w-full bg-transparent">
        {/* 1. Hero Page Section */}
        <Hero />

        {/* 2. Services Grid Card Section */}
        <Services />

        {/* 3. Projects Portfolio Grid */}
        <Projects />

        {/* 4. About Company Section */}
        <About />

        {/* 5. Validated Contact Interface */}
        <Contact />

        {/* Footer Branding Columns */}
        <Footer />
      </div>
    </div>
  );
}
