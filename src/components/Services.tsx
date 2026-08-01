"use client";

import React from "react";
import { Building2, Compass, ClipboardCheck, Paintbrush, Calculator, ShieldCheck, Server, Layout, Zap } from "lucide-react";

const SERVICES = [
  {
    icon: <Building2 className="w-6 h-6 text-[#22D3EE]" />,
    title: "Civil & Structural Design",
    description: "Perfect engineering plans for robust building foundations, reinforced concrete columns, and load-bearing structures."
  },
  {
    icon: <Compass className="w-6 h-6 text-[#22D3EE]" />,
    title: "Architectural Drafting",
    description: "Best design blueprints, custom space utilization floorplans, and detailed 2D/3D elevation layouts."
  },
  {
    icon: <ClipboardCheck className="w-6 h-6 text-[#22D3EE]" />,
    title: "Project Coordination",
    description: "Complete site management, safety compliance monitoring, material quality checks, and execution scheduling."
  },
  {
    icon: <Paintbrush className="w-6 h-6 text-[#22D3EE]" />,
    title: "Interior Layout Details",
    description: "Drafting premium finishing designs, optimal indoor lighting configurations, and customized interior spaces."
  },
  {
    icon: <Calculator className="w-6 h-6 text-[#22D3EE]" />,
    title: "Estimation & Valuations",
    description: "Accurate cost planning, precise material quantity surveys, and budget estimations for structural works."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#22D3EE]" />,
    title: "Quality Supervision",
    description: "Conducting regular structural audits, concrete mix validations, and on-site material strength certifications."
  },
  {
    icon: <Server className="w-6 h-6 text-[#22D3EE]" />,
    title: "Node.js Backend Systems",
    description: "High-throughput server architectures, secure REST/GraphQL API design, and database configurations built for speed."
  },
  {
    icon: <Layout className="w-6 h-6 text-[#22D3EE]" />,
    title: "Next.js & React Frontend",
    description: "SEO-friendly, production-grade web interfaces with server-side rendering, responsiveness, and premium animations."
  },
  {
    icon: <Zap className="w-6 h-6 text-[#22D3EE]" />,
    title: "DevOps & Hosting Pipelines",
    description: "CI/CD deployment pipelines, automated cloud hosting, and server configurations that ship updates without downtime."
  }
];

export default function Services() {
  return (
    <section 
      id="services" 
      className="relative py-20 px-6 w-full overflow-hidden select-none bg-[#0A0E27]"
    >
      {/* Subtle radial glow in top-left */}
      <div 
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-16 max-w-2xl">
          <span className="text-[12px] font-bold text-[#22D3EE] uppercase tracking-[2px] font-body">
            OUR EXPERTISE
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white font-sans tracking-tight">
            Construction, perfected.
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {SERVICES.map((service, index) => {
            const isFirst = index === 0;
            return (
              <div 
                key={service.title}
                className="rounded-2xl p-8 bg-[#0F1330] flex flex-col items-start transition-all duration-200 ease-in-out hover:border-[#22D3EE] hover:-translate-y-[2px] hover:bg-[#14193d]"
                style={{
                  border: isFirst 
                    ? "1px solid rgba(34, 211, 238, 0.4)" 
                    : "1px solid rgba(255, 255, 255, 0.08)"
                }}
              >
                {/* 48x48 Icon container */}
                <div className="w-12 h-12 rounded-xl bg-[#22D3EE]/10 flex items-center justify-center">
                  {service.icon}
                </div>

                {/* Card Title */}
                <h3 className="text-[20px] font-bold text-white mt-5 font-sans">
                  {service.title}
                </h3>

                {/* Card Description */}
                <p className="text-[14px] leading-[1.6] text-[#94A3B8] mt-2 font-body">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

