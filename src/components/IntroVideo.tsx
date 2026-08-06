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

  const videoSrc = "/animateb.webm";

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

          {/* Animated Video Player with Ken Burns Zoom Effect */}
          <motion.video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 20, ease: "linear" }}
            className="w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Animated Logo in the exact Navbar position */}
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-20 w-[90vw] md:w-auto max-w-[95vw] select-none pointer-events-none">
            <div className="flex flex-row items-center justify-between bg-black/20 border border-white/10 px-6 py-2.5 rounded-full shadow-2xl backdrop-blur-md gap-4 md:gap-16">
              <motion.img
                src="/images/logo_transparent.png"
                alt="NextHub Logo"
                initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-16 w-auto -my-4 object-contain"
              />
              {/* Invisible spacer to match the navbar links shape on laptop/desktop */}
              <div className="hidden md:block w-64" />
            </div>
          </div>

          {/* Premium Bottom Info Overlay (without button controls) */}
          <div className="absolute bottom-6 sm:bottom-10 left-4 right-4 sm:left-12 sm:right-12 z-20 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-none select-none">
            <div className="flex flex-col gap-1 text-center md:text-left max-w-lg sm:max-w-2xl">
              <span className="text-[10px] sm:text-xs font-bold text-cyan-400 tracking-[3px] uppercase font-body">
                Welcome to NextHub
              </span>
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold font-display text-white leading-tight">
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
