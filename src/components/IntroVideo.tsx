"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroVideoProps {
  onComplete: () => void;
}

export default function IntroVideo({ onComplete }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const videoSrc = "/introduction.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch((err) => {
        console.error("Autoplay blocked:", err);
      });
    }
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleVideoEnded = () => {
    handleExit();
  };

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 800); // Allow exit animations to finish
  };

  const handleScreenInteraction = () => {
    handleExit();
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onClick={handleScreenInteraction}
          className="fixed inset-0 z-[9999] w-screen h-screen bg-[#05060A] flex items-center justify-center overflow-hidden cursor-pointer"
        >
          {/* Glassmorphic Grain/Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none z-10" />

          {/* Video Player */}
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover pointer-events-none"
          />

          {/* Premium Bottom Info Overlay (without button controls) */}
          <div className="absolute bottom-10 left-6 right-6 md:left-12 md:right-12 z-20 flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-none select-none">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <span className="text-xs font-bold text-cyan-400 tracking-[3px] uppercase font-body">
                Welcome to NextHub
              </span>
              <h2 className="text-2xl font-bold font-display text-white">
                Designing the Future of Web Applications
              </h2>
            </div>
          </div>

          {/* Cinematic Top-to-Bottom Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
