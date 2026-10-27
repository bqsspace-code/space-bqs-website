"use client";

import { useEffect, useRef } from "react";

/** Decorative footage loads near the viewport and pauses off screen. */
export default function AmbientVideo({
  src,
  poster,
  label,
  className = "",
  active = true,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
  active?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const load = () => {
      if (video.getAttribute("src") !== src) {
        video.src = src;
        video.load();
      }
    };
    const sync = () => {
      if (!active || !visible || document.hidden || preference.matches) video.pause();
      else { load(); void video.play().catch(() => {}); }
    };
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && active && !preference.matches) {
          load();
          sync();
          preload.disconnect();
        }
      },
      { rootMargin: "250px" }
    );
    const playback = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 }
    );
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
  }, [src, active]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}

