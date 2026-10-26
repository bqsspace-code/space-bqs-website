"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/** Decorative footage loads near the viewport and pauses off screen. */
export default function AmbientVideo({ src, poster, label, className = "" }: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const manualPause = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (!visible || document.hidden || preference.matches || manualPause.current) video.pause();
      else void video.play().catch(() => {});
    };
    const preload = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.src = src;
        video.load();
        sync();
        preload.disconnect();
      }
    }, { rootMargin: "250px" });
    const playback = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.1 });
    preload.observe(video);
    playback.observe(video);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      preload.disconnect();
      playback.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [src]);

  return (
    <>
      <video ref={videoRef} poster={poster} muted loop playsInline preload="none" aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
      <button type="button"
        onClick={() => {
          const video = videoRef.current;
          if (!video) return;
          manualPause.current = !video.paused;
          if (video.paused) void video.play().catch(() => {});
          else video.pause();
        }}
        aria-label={`${isPlaying ? "Pause" : "Play"} ${label}`}
        className="absolute bottom-5 right-5 z-20 inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-white/35 bg-[#031038]/80 px-4 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-[#031038] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
        {isPlaying ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
        <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
      </button>
    </>
  );
}
