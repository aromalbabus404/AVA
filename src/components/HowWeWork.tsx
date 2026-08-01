"use client";

import React from "react";

const STEPS = [
  {
    num: "01",
    title: "Discover",
    description: "We understand your business, target audience, goals, and project requirements."
  },
  {
    num: "02",
    title: "Plan",
    description: "We define the website structure, features, technology stack, and development roadmap."
  },
  {
    num: "03",
    title: "Design",
    description: "We create a clean, modern, responsive interface focused on user experience."
  },
  {
    num: "04",
    title: "Develop",
    description: "Our developers build the frontend, backend, APIs, CMS, database, and required integrations."
  },
  {
    num: "05",
    title: "Test",
    description: "We test responsiveness, performance, functionality, forms, APIs, security, and browser compatibility."
  },
  {
    num: "06",
    title: "Deploy",
    description: "We deploy your website to production and configure domains, hosting, SSL, and required services."
  },
  {
    num: "07",
    title: "Support",
    description: "We provide maintenance, updates, improvements, and technical support."
  }
];

export default function HowWeWork() {
  return (
    <section 
      id="how-we-work" 
      className="relative py-[50px] px-6 w-full overflow-hidden select-none bg-[#0A0E27]"
    >
      {/* Subtle background glow */}
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
            OUR PROCESS
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white font-sans tracking-tight">
            How We Work
          </h2>
          <p className="text-[#94A3B8] text-sm leading-[1.6] max-w-md font-body">
            A professional, structured approach designed to deliver perfect results from start to finish.
          </p>
        </div>

        {/* 7 Step Grid Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {STEPS.map((step, index) => {
            const isLast = index === STEPS.length - 1;
            return (
              <div 
                key={step.num}
                className={`rounded-2xl p-5 sm:p-8 bg-[#0F1330] border border-white/8 flex flex-col items-start transition-all duration-200 ease-in-out hover:border-[#22D3EE] hover:-translate-y-[2px] hover:bg-[#14193d] ${
                  isLast ? "col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Step Number Badge */}
                <span className="text-3xl font-extrabold text-[#22D3EE] font-display mb-4">
                  {step.num}
                </span>

                {/* Step Title */}
                <h3 className="text-xl font-bold text-white font-sans mb-2">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[14px] leading-[1.6] text-[#94A3B8] font-body">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
