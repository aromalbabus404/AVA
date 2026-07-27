"use client";

import React, { useRef, useEffect, useState } from "react";

interface VideoBackgroundProps {
  scrollProgress: number;
}

export default function VideoBackground({ scrollProgress }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  // Local video file to ensure offline stability and bypass CORS blocks
  const videoSrc = "/office_walk.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly pause the video so it does not auto-play and conflict with scroll seeking
    video.pause();

    const onLoadedMetadata = () => {
      setDuration(video.duration);
    };

    // If metadata is already loaded (e.g. from cache), set duration immediately
    if (video.readyState >= 1) {
      setDuration(video.duration);
    }

    video.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  // Sync video currentTime with scroll progress smoothly
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !duration) return;

    const targetTime = scrollProgress * duration;
    
    let animationFrameId: number;
    const smoothSeek = () => {
      const diff = targetTime - video.currentTime;
      // Seek frame if difference is visible
      if (Math.abs(diff) > 0.01) {
        video.currentTime += diff * 0.15; // Smooth interpolation factor
        animationFrameId = requestAnimationFrame(smoothSeek);
      }
    };

    animationFrameId = requestAnimationFrame(smoothSeek);
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollProgress, duration]);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#05060A] overflow-hidden select-none pointer-events-none">
      {/* Cinematic dark tech overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05060A] via-[#05060A]/60 to-[#05060A]/30 z-10" />
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Photorealistic Programmer Video (kept paused, scrolled manually) */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover scale-[1.02] filter brightness-[0.55] contrast-[1.05] saturate-[0.8] blur-[0.5px]"
      />
    </div>
  );
}
