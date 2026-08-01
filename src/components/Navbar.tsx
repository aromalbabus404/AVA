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
      <header className="flex flex-row items-center bg-[#111111]/90 border border-white/10 px-6 py-2.5 rounded-full shadow-2xl backdrop-blur-md">
        
        {/* Navigation Links */}
        <nav className="flex flex-row items-center gap-6 font-body">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-xs md:text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

      </header>
    </div>
  );
}
