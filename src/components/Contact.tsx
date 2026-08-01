"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { WHATSAPP_CONTACTS } from "@/lib/constants";

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={containerRef}
      className={`relative py-[50px] px-6 max-w-4xl mx-auto z-10 text-center select-none bg-transparent transition-all duration-1000 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Title & Subtext */}
      <h2 className="text-4xl sm:text-5xl font-display font-bold text-white leading-tight">
        Let&apos;s build something great.
      </h2>
      <p className="text-muted-foreground text-lg mt-4 font-medium font-body max-w-2xl mx-auto">
        We coordinate our design, engineering, and working details directly. Chat with any of our team members on WhatsApp to get started.
      </p>

      {/* WhatsApp Directory Cards */}
      <div className="grid grid-cols-2 gap-6 mt-12 w-full max-w-4xl mx-auto text-left font-body justify-center">
        {WHATSAPP_CONTACTS.map((member, index) => {
          const isLast = index === WHATSAPP_CONTACTS.length - 1;
          return (
            <div 
              key={member.name} 
              className={`rounded-2xl p-6 bg-white/[0.02] border border-white/10 hover:border-[#25D366]/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between h-full group ${
                isLast ? "col-span-2 justify-self-center w-full max-w-[calc(50%-12px)]" : "w-full"
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-cyan-400 to-violet-500 text-white font-display text-lg font-bold shadow-lg">
                    {member.avatarText}
                  </div>
                  <div>
                    <h4 className="text-white font-bold font-display group-hover:text-[#25D366] transition-colors">
                      {member.name}
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  Tap below to send a message directly to {member.name.split(" ")[0]} regarding working details.
                </p>
              </div>
              
              <a
                href={member.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba56] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.004 0C5.378 0 0 5.38 0 12.004c0 2.116.55 4.103 1.513 5.84L.07 24l6.32-1.656c1.7.923 3.633 1.417 5.617 1.42h.005c6.626 0 12.004-5.38 12.004-12.004C24.016 5.38 18.636 0 12.004 0zm6.59 17.026c-.27.76-1.56 1.396-2.146 1.485-.58.09-1.3-.016-2.13-.284-3.418-1.1-5.613-4.57-5.782-4.8-.17-.23-1.348-1.792-1.348-3.41 0-1.617.846-2.41 1.15-2.735.3-.325.68-.407.9-.407.22 0 .444.002.637.01.2.01.468-.073.73.575.27.66.93 2.27 1.01 2.43.08.16.134.35.027.565-.107.21-.16.34-.32.525-.16.185-.33.41-.47.55-.16.16-.327.33-.14.65.188.32.833 1.37 1.787 2.217.953.847 1.758 1.112 2.08 1.274.32.163.51.137.7-.08.187-.22.8-.93 1.015-1.25.215-.32.43-.268.73-.16.3.1.1.9 1.91 1.25 1.01.16 2.015.32 2.17.48.16.16-.16.92-.43 1.68z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

