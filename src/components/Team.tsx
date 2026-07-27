"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  avatarText: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Alex Rivera",
    role: "Lead Node.js Architect",
    avatarText: "AR",
  },
  {
    name: "Viktor Chen",
    role: "Full-Stack & Three.js Developer",
    avatarText: "VC",
  },
  {
    name: "Sarah Jenkins",
    role: "Next.js UI/UX Engineer",
    avatarText: "SJ",
  },
];

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
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
      }`}
    >
      {/* Avatar Circle */}
      <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-accent to-accent-violet text-white font-display text-2xl font-bold shadow-lg">
        {member.avatarText}
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1 mt-2">
        <h3 className="text-lg font-bold font-display text-white">
          {member.name}
        </h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent font-body">
          {member.role}
        </p>
      </div>

      <p className="text-xs text-muted-foreground font-body leading-relaxed max-w-[200px] mt-2">
        Designing elegant interfaces and compiling high-efficiency code structures.
      </p>
    </div>
  );
}

export default function Team() {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-50px" });

  return (
    <section
      id="team"
      className="relative py-32 px-6 max-w-5xl mx-auto z-10 text-center select-none bg-transparent"
    >
      {/* Header */}
      <div
        ref={headingRef}
        className={`flex flex-col items-center gap-4 max-w-2xl mx-auto mb-20 ${
          isHeadingInView ? "animate-fade-rise" : "opacity-0"
        }`}
      >
        <span className="text-xs text-accent uppercase tracking-widest font-body font-semibold">
          Our Team
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
          Meet the Developers
        </h2>
        <p className="text-muted-foreground text-sm font-medium font-body leading-relaxed max-w-md">
          A small team of engineering specialists crafting premium, immersive web ecosystems.
        </p>
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full justify-center">
        {TEAM_MEMBERS.map((member, index) => (
          <TeamMemberCard key={member.name} member={member} index={index} />
        ))}
      </div>
    </section>
  );
}
