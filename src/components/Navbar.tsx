"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      try {
        video.load();
        video.play().catch((err) => {
          console.log("Navbar video autoplay blocked", err);
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

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
        {/* Main Header Row - Solid White Theme matching video background */}
        <header className="flex flex-row items-center justify-between bg-white border border-slate-200/50 px-6 py-0.5 sm:py-1 rounded-full shadow-lg shadow-slate-200/50 gap-4 md:gap-16">
          
          {/* Animated Video Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleScroll(e, "#home")} 
            className="flex items-center group cursor-pointer"
          >
            <div 
              className="relative overflow-hidden flex items-center justify-center h-9 w-20 sm:h-10 sm:w-24"
              style={{
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
              }}
            >
              <video
                ref={videoRef}
                key="/animateb.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none',
                  overflow: 'hidden',
                  objectFit: 'contain',
                  display: 'block',
                }}
                className="w-full h-full object-contain object-center scale-[1.05]"
              >
                <source src="/animateb.webm" type="video/webm" />
              </video>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex flex-row items-center gap-7 font-body">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-xs md:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden items-center justify-center w-8 h-8 rounded-full bg-slate-100/80 border border-slate-200/60 text-slate-800 hover:text-slate-950 hover:bg-slate-200 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </header>

        {/* Mobile Dropdown Panel */}
        {isOpen && (
          <div className="absolute top-[calc(100%+12px)] left-0 right-0 md:hidden bg-white/95 border border-slate-200/60 rounded-2xl p-4 shadow-xl shadow-slate-200/40 backdrop-blur-lg flex flex-col gap-1.5 animate-dropdown-fade z-40">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="w-full px-4 py-2.5 rounded-xl hover:bg-slate-50 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-all duration-200 border border-transparent hover:border-slate-100 flex items-center"
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

