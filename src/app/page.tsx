"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeBuild from "@/components/WhatWeBuild";
import HowWeWork from "@/components/HowWeWork";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Safely load SpaceScene on client side only to avoid WebGL/window SSR issues
const SpaceScene = dynamic(() => import("@/components/SpaceScene"), { ssr: false });

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className="relative min-h-screen text-white overflow-x-hidden font-body"
      style={{
        backgroundColor: "#030206",
        backgroundImage: "radial-gradient(circle at 50% 0%, #151030 0%, #07060e 55%, #030206 100%)",
      }}
    >
      {/* 1. Global Subtle Grain Texture Overlay */}
      <div className="grain-overlay" />

      {/* 2. Interactive 3D Space Scene Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-80">
        <SpaceScene scrollProgress={scrollProgress} />
      </div>

      {/* 3. Premium Static & Animating Ambient Glow Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0 animate-pulse-slow" />
      <div className="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-violet-600/5 blur-[150px] pointer-events-none z-0 animate-pulse-slower" />
      <div className="absolute bottom-[10%] left-[10%] w-[45vw] h-[45vw] rounded-full bg-teal-500/4 blur-[100px] pointer-events-none z-0 animate-pulse-slow" />

      {/* 4. Standard Beautiful Floating Particles (HTML/CSS animations) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
        <div className="absolute top-[15%] left-[15%] w-2 h-2 rounded-full bg-cyan-400/30 animate-float-slow" />
        <div className="absolute top-[35%] right-[20%] w-3 h-3 rounded-full bg-violet-400/25 animate-float-medium" />
        <div className="absolute top-[60%] left-[8%] w-1.5 h-1.5 rounded-full bg-teal-400/35 animate-float-fast" />
        <div className="absolute top-[80%] right-[15%] w-2.5 h-2.5 rounded-full bg-cyan-300/20 animate-float-slow" />
        <div className="absolute top-[50%] right-[45%] w-2 h-2 rounded-full bg-white/20 animate-float-medium" />
      </div>

      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Scrolling Content Panels */}
      <div className="relative z-10 w-full bg-transparent">
        {/* 1. Hero Page Section */}
        <Hero />

        {/* 2. What We Build Section */}
        <WhatWeBuild />

        {/* 3. How We Work Section */}
        <HowWeWork />

        {/* 4. About Company Section */}
        <About />

        {/* 6. Validated Contact Interface */}
        <Contact />

        {/* Footer Branding Columns */}
        <Footer />
      </div>
    </div>
  );
}


