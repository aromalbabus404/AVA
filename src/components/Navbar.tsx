"use client";

import React from "react";

export default function Navbar() {
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#how-we-work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95vw] select-none">
      <header className="flex flex-row items-center justify-between bg-[#111111]/90 border border-white/10 px-6 py-2.5 rounded-full shadow-2xl backdrop-blur-md gap-8 md:gap-16">
        
        {/* AVA Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleScroll(e, "#home")} 
          className="flex items-center group cursor-pointer"
        >
          <div className="h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-violet-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#111111] rounded-[7px] px-3.5 flex items-center justify-center transition-all duration-300 group-hover:bg-transparent">
              <span className="font-display font-black text-xs tracking-widest bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent group-hover:text-white transition-colors duration-200">
                AVA
              </span>
            </div>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="flex flex-row items-center gap-5 md:gap-7 font-body">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-xs md:text-sm font-semibold text-white/70 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

      </header>
    </div>
  );
}

