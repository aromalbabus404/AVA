"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Sticky Fixed Header Navigation */}
      <div className="fixed top-0 left-0 right-0 w-full z-50 px-4 py-4 select-none">
        <header className="rounded-full max-w-7xl mx-auto px-8 py-4 flex flex-row justify-between items-center backdrop-blur-md bg-black/40 border-b border-white/5 shadow-2xl">
          {/* Logo */}
          <span 
            className="text-2xl font-display font-bold tracking-tight text-white cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            AVA Developers
          </span>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex flex-row items-center gap-8 font-body">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <button
            onClick={(e) => handleScroll(e, "#contact")}
            className="hidden md:inline-flex rounded-full px-6 py-2.5 text-sm font-semibold text-white border border-cyan-400/40 hover:bg-cyan-400/10 hover:border-cyan-400 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          >
            Start a Project
          </button>

          {/* Mobile Hamburg Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex md:hidden p-2 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 w-full h-full z-45 flex flex-col justify-center items-center bg-[#07070d]/95 backdrop-blur-2xl animate-fade-rise">
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-3xl font-display font-bold text-white hover:text-accent-cyan transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={(e) => handleScroll(e, "#contact")}
              className="rounded-full px-8 py-3 text-base font-semibold text-white mt-4 border border-cyan-400/40 hover:bg-cyan-400/10 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            >
              Start a Project
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
