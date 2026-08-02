"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { WHATSAPP_CONTACTS } from "@/lib/constants";

interface TeamMember {
  name: string;
  avatarText: string;
  number: string;
  link: string;
  description: string;
}

function TeamMemberCard({ member, index, className = "" }: { member: TeamMember; index: number; className?: string }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <div
      ref={cardRef}
      style={{
        animationDelay: `${index * 0.15}s`,
      }}
      className={`glass-card p-8 rounded-2xl flex flex-col items-center text-center gap-4 bg-[#0a0c12]/45 border border-white/5 shadow-2xl backdrop-blur-md hover:scale-[1.03] transition-all duration-300 ${
        isInView ? "animate-fade-rise" : "opacity-0"
      } ${className}`}
    >
      {/* Avatar Circle */}
      <div className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-tr from-cyan-400 to-violet-500 text-white font-display text-2xl font-bold shadow-lg">
        {member.avatarText}
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1 mt-2">
        <h3 className="text-lg font-bold font-display text-white">
          {member.name}
        </h3>
      </div>

      <p className="text-xs text-muted-foreground font-body leading-relaxed max-w-[220px] mt-2 font-medium">
        {member.description}
      </p>

      {/* Direct WhatsApp Call to Action */}
      <a
        href={member.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba56] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
      >
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M12.004 0C5.378 0 0 5.38 0 12.004c0 2.116.55 4.103 1.513 5.84L.07 24l6.32-1.656c1.7.923 3.633 1.417 5.617 1.42h.005c6.626 0 12.004-5.38 12.004-12.004C24.016 5.38 18.636 0 12.004 0zm6.59 17.026c-.27.76-1.56 1.396-2.146 1.485-.58.09-1.3-.016-2.13-.284-3.418-1.1-5.613-4.57-5.782-4.8-.17-.23-1.348-1.792-1.348-3.41 0-1.617.846-2.41 1.15-2.735.3-.325.68-.407.9-.407.22 0 .444.002.637.01.2.01.468-.073.73.575.27.66.93 2.27 1.01 2.43.08.16.134.35.027.565-.107.21-.16.34-.32.525-.16.185-.33.41-.47.55-.16.16-.327.33-.14.65.188.32.833 1.37 1.787 2.217.953.847 1.758 1.112 2.08 1.274.32.163.51.137.7-.08.187-.22.8-.93 1.015-1.25.215-.32.43-.268.73-.16.3.1.1.9 1.91 1.25 1.01.16 2.015.32 2.17.48.16.16-.16.92-.43 1.68z"/>
        </svg>
        WhatsApp Chat
      </a>
    </div>
  );
}

export default function Team() {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-50px" });

  return (
    <section
      id="team"
      className="relative py-[30px] md:py-[50px] px-6 max-w-5xl mx-auto z-10 text-center select-none bg-transparent"
    >
      {/* Header */}
      <div
        ref={headingRef}
        className={`flex flex-col items-center gap-4 max-w-2xl mx-auto mb-20 ${
          isHeadingInView ? "animate-fade-rise" : "opacity-0"
        }`}
      >
        <span className="text-xs text-cyan-400 uppercase tracking-widest font-body font-semibold">
          Our Team
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
          Meet the Developers
        </h2>
        <p className="text-muted-foreground text-sm font-medium font-body leading-relaxed max-w-md">
          AVA Web Developers are a team of expert software engineers and designers building high-performance web ecosystems.
        </p>
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto justify-center">
        {WHATSAPP_CONTACTS.map((member, index) => {
          const isLast = index === WHATSAPP_CONTACTS.length - 1;
          return (
            <TeamMemberCard 
              key={member.name} 
              member={member} 
              index={index} 
              className={isLast ? "sm:col-span-2 md:col-span-1 sm:max-w-[calc(50%-12px)] md:max-w-none sm:mx-auto md:mx-0 w-full" : "w-full"}
            />
          );
        })}
      </div>
    </section>
  );
}

