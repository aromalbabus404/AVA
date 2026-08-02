"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { 
  CalendarRange, 
  ShoppingCart, 
  Briefcase, 
  Utensils, 
  GraduationCap 
} from "lucide-react";

interface BuildItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const ITEMS: BuildItem[] = [
  {
    id: 1,
    icon: <CalendarRange className="w-6 h-6 text-cyan-400" />,
    title: "Booking Systems",
    description: "We build online reservation platforms for salons, clinics, hotels, and rentals. Includes real-time calendar, automated reminders, and secure payment at booking.",
    features: ["Real-time Calendars", "Auto SMS/Email Reminders", "Secure Deposits & Payments"],
  },
  {
    id: 2,
    icon: <ShoppingCart className="w-6 h-6 text-violet-400" />,
    title: "E-commerce Websites",
    description: "Full online stores with product catalog, cart, checkout, and payment gateway integration. Includes inventory and order management with an easy-to-use admin panel.",
    features: ["Dynamic Product Catalog", "Secure Stripe/PayPal Checkout", "Admin Inventory Control"],
  },
  {
    id: 3,
    icon: <Briefcase className="w-6 h-6 text-emerald-400" />,
    title: "Business & Portfolio Websites",
    description: "Professional websites to showcase your company, services, or personal work. Clean design, fast loading, and mobile-friendly layouts.",
    features: ["Highly Optimized PageSpeed", "Responsive & Mobile-First", "Lead Generation Forms"],
  },
  {
    id: 4,
    icon: <Utensils className="w-6 h-6 text-amber-400" />,
    title: "Restaurant & Menu Websites",
    description: "Digital menus with online ordering and table reservation options. Great for boosting takeout and dine-in convenience.",
    features: ["Interactive Digital Menu", "Online Ordering System", "Table Booking Integrations"],
  },
  {
    id: 5,
    icon: <GraduationCap className="w-6 h-6 text-rose-400" />,
    title: "Educational / LMS Platforms",
    description: "Course listing, student dashboards, and quiz/assessment tools. Ideal for coaching centers, trainers, and online academies.",
    features: ["Student & Teacher Portals", "Course Progress Tracking", "Interactive Quiz Builders"],
  },
];

function Card({ item, index }: { item: BuildItem; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <div
      ref={cardRef}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      className={`relative group rounded-2xl border border-white/10 bg-[#0c0a17]/50 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] ${
        isInView ? "animate-fade-rise" : "opacity-0"
      }`}
    >
      {/* Top section */}
      <div>
        <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {item.icon}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3 group-hover:text-cyan-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-body mb-6">
          {item.description}
        </p>
      </div>

      {/* Features list */}
      <ul className="space-y-2 mt-auto border-t border-white/5 pt-4">
        {item.features.map((feat) => (
          <li key={feat} className="flex items-center text-xs font-semibold text-white/80 font-body">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2" />
            {feat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WhatWeBuild() {
  const containerRef = useRef(null);
  const isHeaderInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="what-we-build" 
      className="relative py-24 px-6 w-full select-none"
    >
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 blur-[100px] z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div 
          ref={containerRef}
          className={`flex flex-col gap-4 mb-16 max-w-2xl ${
            isHeaderInView ? "animate-fade-rise" : "opacity-0"
          }`}
        >
          <span className="text-xs text-cyan-400 uppercase tracking-widest font-body font-semibold">
            Our Offerings
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight">
            What We Build
          </h2>
          <p className="text-[#94A3B8] text-sm leading-[1.6] max-w-md font-body">
            Tailored digital solutions engineered for speed, responsiveness, and premium user experience.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ITEMS.map((item, index) => (
            <Card key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
