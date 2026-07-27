"use client";

import React, { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Server, Layout, Boxes, Layers, Cpu, Zap } from "lucide-react";
import { SERVICES_DATA, ServiceItem } from "@/lib/constants";

// Icon mapping
const iconMap = {
  Server: <Server className="w-6 h-6 text-cyan-400" />,
  Layout: <Layout className="w-6 h-6 text-cyan-400" />,
  Cube: <Boxes className="w-6 h-6 text-cyan-400" />,
  Layers: <Layers className="w-6 h-6 text-cyan-400" />,
  Cpu: <Cpu className="w-6 h-6 text-cyan-400" />,
  Zap: <Zap className="w-6 h-6 text-cyan-400" />,
};

function TiltCard({ service, index }: { service: ServiceItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Calculate tilt: multiply by a gentle max tilt angle of 8 degrees for premium user friendliness
    setCoords({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        animationDelay: `${index * 0.1}s`,
        transform: isHovered 
          ? `perspective(1000px) rotateY(${coords.x}deg) rotateX(${coords.y}deg) scale(1.02)` 
          : "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)",
        transition: isHovered ? "none" : "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`glass-card p-8 rounded-2xl flex flex-col gap-4 border border-white/5 bg-[#0a0c12]/45 backdrop-blur-md cursor-pointer ${
        isInView ? "animate-fade-rise" : "opacity-0"
      }`}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/5 shadow-inner">
        {iconMap[service.iconName] || <Server className="w-6 h-6 text-cyan-400" />}
      </div>
      <h3 className="text-xl font-bold font-display text-white mt-2">
        {service.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed font-body">
        {service.description}
      </p>
    </div>
  );
}

export default function Services() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section 
      id="services" 
      className="relative py-32 px-6 max-w-7xl mx-auto z-10 select-none bg-transparent"
    >
      {/* Header */}
      <div 
        ref={headerRef}
        className={`flex flex-col gap-4 max-w-2xl mb-16 ${
          isHeaderInView ? "animate-fade-rise" : "opacity-0"
        }`}
      >
        <span className="text-xs text-cyan-400 uppercase tracking-widest font-body font-semibold">
          What We Do
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
          Engineering, designed.
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {SERVICES_DATA.map((service, index) => (
          <TiltCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
