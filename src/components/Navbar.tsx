"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "What We Build", href: "#what-we-build" },
    { label: "Process", href: "#how-we-work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90vw] md:w-auto max-w-[95vw] select-none transition-all duration-300">
      <div className="relative w-full">
        {/* Main Header Row */}
        <header className="flex flex-row items-center justify-between bg-[#111111]/90 border border-white/10 px-6 py-2.5 rounded-full shadow-2xl backdrop-blur-md gap-4 md:gap-16">
          
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleScroll(e, "#home")} 
            className="flex items-center group cursor-pointer"
          >
            <div className="h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-violet-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#111111] rounded-[7px] px-3.5 flex items-center justify-center transition-all duration-300 group-hover:bg-transparent">
                <span className="font-display font-black text-xs tracking-widest bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent group-hover:text-white transition-colors duration-200">
                  NextHubTechnologies
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex flex-row items-center gap-7 font-body">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-xs md:text-sm font-semibold text-white/70 hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </header>

        {/* Mobile Dropdown Panel */}
        {isOpen && (
          <div className="absolute top-[calc(100%+12px)] left-0 right-0 md:hidden bg-[#111111]/95 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-lg flex flex-col gap-1.5 animate-dropdown-fade z-40">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="w-full px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm font-semibold text-white/75 hover:text-white transition-all duration-200 border border-transparent hover:border-white/5 flex items-center"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

