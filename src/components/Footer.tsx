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
    <footer className="relative w-full border-t border-slate-200/60 bg-transparent py-12 px-6 font-body text-xs select-none z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Wordmark Left */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span 
            className="text-2xl font-display font-bold tracking-tight text-slate-800 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            NextHubTechnologies
          </span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
            Engineering, perfected.
          </span>
        </div>

        {/* Links Repeat */}
        <div className="flex flex-wrap justify-center gap-8 font-medium text-slate-500">
          <a href="#home" onClick={(e) => handleScroll(e, "#home")} className="hover:text-slate-950 transition-colors duration-200">
            Home
          </a>
          <a href="#how-we-work" onClick={(e) => handleScroll(e, "#how-we-work")} className="hover:text-slate-950 transition-colors duration-200">
            How We Work
          </a>
          <a href="#about" onClick={(e) => handleScroll(e, "#about")} className="hover:text-slate-950 transition-colors duration-200">
            About
          </a>
          <a href="#contact" onClick={(e) => handleScroll(e, "#contact")} className="hover:text-slate-950 transition-colors duration-200">
            Contact
          </a>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-200/60 text-center text-[10px] text-slate-500">
        &copy; {currentYear} NextHubTechnologies. All rights reserved.
      </div>
    </footer>
  );
}
