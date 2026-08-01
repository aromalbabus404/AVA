"use client";

import React from "react";

export default function Footer() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-white/5 bg-transparent py-12 px-6 font-body text-xs select-none z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Wordmark Left */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span 
            className="text-2xl font-display font-bold tracking-tight text-white cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            AVA Developers
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
            Construction, perfected.
          </span>
        </div>

        {/* Links Repeat */}
        <div className="flex flex-wrap justify-center gap-8 font-medium text-muted-foreground">
          <a href="#home" onClick={(e) => handleScroll(e, "#home")} className="hover:text-white transition-colors duration-200">
            Home
          </a>
          <a href="#how-we-work" onClick={(e) => handleScroll(e, "#how-we-work")} className="hover:text-white transition-colors duration-200">
            How We Work
          </a>
          <a href="#about" onClick={(e) => handleScroll(e, "#about")} className="hover:text-white transition-colors duration-200">
            About
          </a>
          <a href="#contact" onClick={(e) => handleScroll(e, "#contact")} className="hover:text-white transition-colors duration-200">
            Contact
          </a>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/5 text-center text-[10px] text-muted-foreground">
        &copy; {currentYear} AVA Developers. All rights reserved.
      </div>
    </footer>
  );
}
