"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowWeWork from "@/components/HowWeWork";
import About from "@/components/About";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
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

      {/* 2. Premium Static Ambient Glow Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-violet-600/5 blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[10%] w-[45vw] h-[45vw] rounded-full bg-teal-500/4 blur-[100px] pointer-events-none z-0" />

      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Scrolling Content Panels */}
      <div className="relative z-10 w-full bg-transparent">
        {/* 1. Hero Page Section */}
        <Hero />

        {/* 2. How We Work Section */}
        <HowWeWork />

        {/* 3. About Company Section */}
        <About />

        {/* 4. Team Section */}
        <Team />

        {/* 5. Validated Contact Interface */}
        <Contact />

        {/* Footer Branding Columns */}
        <Footer />
      </div>
    </div>
  );
}

