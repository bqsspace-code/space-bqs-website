"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

/**
 * AppPreviewCard — full-bleed gradient card with an autoplay looping
 * video demo of the BQS mobile app in real field conditions.
 * Placed between WhoItsForSection and RolloutShowcase on the homepage.
 */
export default function AppPreviewCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  /* Lazy-load & autoplay when card enters the viewport */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const pref = window.matchMedia("(prefers-reduced-motion: reduce)");

    const tryPlay = () => {
      if (pref.matches) return;
      video.play().then(() => setPlaying(true)).catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!loaded) {
            video.src = "/assets/videos/bqs-appbeing-used2.mp4";
            video.load();
            setLoaded(true);
          }
          tryPlay();
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [loaded]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      id="section-app-preview"
      aria-label="App in action preview"
      className="relative overflow-hidden bg-gradient-to-br from-[#031038] via-[#032aac] to-[#19b5c9] py-16 md:py-20 lg:py-24"
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(25,181,201,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Eyebrow + headline */}
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7dd3e8]">
            See it in action
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl">
            The app. On deck.{" "}
            <span className="text-[#19b5c9]">In the field.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#a8d8e8] md:text-base">
            Watch surveyors capture tank readings, run corrections, and issue
            certificates — offline, end-to-end.
          </p>
        </div>

        {/* Video card */}
        <div className="group relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 shadow-[0_32px_80px_rgba(3,16,56,0.6)] md:rounded-3xl">
          {/* Glass-tint top bar */}
          <div className="flex items-center gap-2 bg-white/5 px-4 py-3 backdrop-blur-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-white/40">
              BQS Field App — Live Demo
            </span>
          </div>

          {/* Video */}
          <div className="relative aspect-video bg-[#020c27]">
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              aria-label="BQS mobile app being used for a bunker quantity survey on deck"
              className="h-full w-full object-cover"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />

            {/* Play/pause overlay */}
            <button
              onClick={toggle}
              aria-label={playing ? "Pause demo video" : "Play demo video"}
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-100"
              style={{ opacity: playing ? 0 : 1 }}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-md transition hover:bg-white/25 md:h-20 md:w-20">
                {playing ? (
                  <Pause className="h-7 w-7 text-white md:h-9 md:w-9" />
                ) : (
                  <Play className="ml-1 h-7 w-7 text-white md:h-9 md:w-9" />
                )}
              </span>
            </button>
          </div>

          {/* Footer strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 px-5 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#19b5c9]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                Offline-capable · iOS &amp; Android
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
              Autoplay on scroll
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
