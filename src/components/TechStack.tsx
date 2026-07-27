"use client";

import React from "react";

const TECH_ITEMS = [
  { name: "Node.js", color: "text-[#339933]" },
  { name: "Next.js", color: "text-white" },
  { name: "React", color: "text-[#61DAFB]" },
  { name: "Three.js", color: "text-[#ffffff]" },
  { name: "TypeScript", color: "text-[#3178C6]" },
  { name: "Tailwind CSS", color: "text-[#06B6D4]" },
  { name: "MongoDB", color: "text-[#47A248]" },
  { name: "Express", color: "text-[#ffffff]" },
  { name: "PostgreSQL", color: "text-[#4169E1]" },
];

export default function TechStack() {
  // Duplicate list twice to make a seamless infinite loop scrolling marquee
  const marqueeItems = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <section className="relative py-20 w-full overflow-hidden bg-black/10 border-b border-white/5 z-10 select-none">
      {/* Absolute left/right gradient masking to hide edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#05060a] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#05060a] to-transparent z-20 pointer-events-none" />

      {/* Marquee Row Container */}
      <div className="flex w-[300%] md:w-[200%] gap-12 items-center animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
        {marqueeItems.map((tech, index) => (
          <div 
            key={index}
            className="flex items-center gap-4 px-6 py-3 rounded-full border border-white/5 bg-[#0a0c12]/30 backdrop-blur shadow-lg min-w-[160px] justify-center hover:border-accent/40 transition-colors"
          >
            {/* Tech Name */}
            <span className={`text-sm font-mono font-bold uppercase tracking-wider ${tech.color}`}>
              {tech.name}
            </span>
          </div>
        ))}
      </div>

      {/* Inline styles for keyframe if not added to stylesheet */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}
