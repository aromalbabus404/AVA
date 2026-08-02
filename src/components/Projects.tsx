"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PROJECTS_DATA, ProjectItem } from "@/lib/constants";

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <div
      ref={cardRef}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      className={`rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] overflow-hidden flex flex-col h-full hover:scale-[1.02] hover:-translate-y-1 hover:border-cyan-400/30 transition-all duration-300 ${
        isInView ? "animate-fade-rise" : "opacity-0"
      }`}
    >
      {/* Thumbnail Area */}
      <div className="relative w-full aspect-video overflow-hidden bg-black/40 border-b border-white/10 flex items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        <div className="absolute w-2/3 h-2/3 rounded-full bg-cyan-400/5 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <span className="relative z-0 text-lg font-display font-bold tracking-wider text-white/20 uppercase select-none group-hover:text-white/60 transition-colors">
          {project.title}
        </span>
      </div>

      {/* Details */}
      <div className="p-8 flex flex-col justify-between flex-grow gap-6 bg-black/10">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-400 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed font-body">
            {project.description}
          </p>
        </div>

        {/* Tags & Action Link */}
        <div className="flex flex-col gap-4 mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground bg-white/5 select-none font-body"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-3 border-t border-white/5 flex justify-between items-center font-body">
            {project.link !== "#" ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest text-cyan-400 hover:underline transition-all"
              >
                Visit Site <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-xs uppercase tracking-widest text-muted-foreground/60 select-none">
                Demo Offline
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-50px" });

  return (
    <section
      id="projects"
      className="relative py-[30px] md:py-32 px-6 w-full bg-white/[0.01] border-y border-white/5 z-10 select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div
          ref={headingRef}
          className={`flex flex-col gap-4 max-w-2xl ${
            isHeadingInView ? "animate-fade-rise" : "opacity-0"
          }`}
        >
          <span className="text-xs text-violet-400 uppercase tracking-widest font-body font-semibold">
            Our Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            Products we&apos;ve shipped.
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
