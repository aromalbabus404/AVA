"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { STATS_DATA, StatItem } from "@/lib/constants";

function AnimatedStat({ stat, index }: { stat: StatItem; index: number }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = stat.value;
    const duration = 2000;
    const startTime = performance.now();

    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * end);
      
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, stat.value]);

  return (
    <div
      ref={containerRef}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      className={`rounded-2xl border border-slate-200/50 bg-white/60 backdrop-blur-md p-6 text-center flex-1 min-w-[140px] hover:border-cyan-500/30 transition-all duration-300 shadow-sm shadow-slate-100/50 ${
        isInView ? "animate-fade-rise" : "opacity-0"
      }`}
    >
      <div className="text-4xl text-cyan-600 font-display font-bold mb-2">
        {count}
        {stat.suffix}
      </div>
      <p className="text-xs text-slate-500 font-bold font-body leading-tight uppercase tracking-wider">
        {stat.label}
      </p>
    </div>
  );
}

export default function About() {
  const infoRef = useRef(null);
  const isInfoInView = useInView(infoRef, { once: true, margin: "-20px" });

  return (
    <section
      id="about"
      className="relative py-[30px] md:py-[50px] px-6 max-w-5xl mx-auto z-10 text-center select-none bg-transparent"
    >
      {/* Intro Text Block */}
      <div
        ref={infoRef}
        className={`flex flex-col items-center gap-6 max-w-3xl mx-auto mb-20 ${
          isInfoInView ? "animate-fade-rise" : "opacity-0"
        }`}
      >
        <span className="text-xs text-cyan-600 uppercase tracking-widest font-body font-semibold">
          Who We Are
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-slate-900 leading-tight">
          A dedicated team, obsessed with precision.
        </h2>
        <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mt-2 font-medium font-body">
          NextHubTechnologies is a premium software engineering and design studio. We partner with clients to deliver high-performance Node.js backend architectures, responsive Next.js & React user interfaces, and automated cloud deployment pipelines — ensuring perfect execution and the best design practices.
        </p>
      </div>

      {/* Counters Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {STATS_DATA.map((stat, index) => (
          <AnimatedStat key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}
