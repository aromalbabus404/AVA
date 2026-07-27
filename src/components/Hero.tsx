"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const handleScroll = (e: React.MouseEvent<any>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex flex-col justify-center items-center z-10 select-none bg-transparent"
    >
      {/* Hero Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 max-w-7xl mx-auto">
        
        {/* Animated Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold tracking-tight leading-[0.95] text-white max-w-5xl overflow-hidden">
          <motion.span
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            Engineering scalable{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              web ecosystems.
            </span>
          </motion.span>
        </h1>

        {/* Animated Subheading */}
        <p className="overflow-hidden max-w-2xl mt-8">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block text-muted-foreground text-base sm:text-lg leading-relaxed font-body font-medium"
          >
            AVA Developers engineers fast, scalable Node.js and Next.js applications, and premium 3D web experiences with Three.js.
          </motion.span>
        </p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-row flex-wrap items-center justify-center gap-6 mt-12"
        >
          <button 
            onClick={(e) => handleScroll(e, "#contact")}
            className="rounded-full px-10 py-4 text-base font-semibold text-white border border-cyan-400/50 hover:bg-cyan-400/10 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          >
            Start a Project
          </button>
          
          <button 
            onClick={(e) => handleScroll(e, "#projects")}
            className="text-sm font-medium text-muted-foreground hover:text-cyan-400 transition-colors duration-300 cursor-pointer bg-transparent border-none"
          >
            View Our Work &rarr;
          </button>
        </motion.div>

        {/* Bobbing Scroll Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={(e) => handleScroll(e, "#services")}
        >
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-body font-semibold">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
