"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface AppPreviewCardProps {
  asSection?: boolean;
  className?: string;
  badge?: string;
}

/**
 * AppPreviewCard — full-width card with the field-app video as a background,
 * a clean directional scrim mask so the video is clearly visible while text stays sharp.
 * Can be rendered standalone (asSection=true) or embedded directly into another section (asSection=false).
 */
export default function AppPreviewCard({
  asSection = false,
  className = "",
  badge = "See it in action",
}: AppPreviewCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Lazy-load & autoplay when card scrolls into view */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pref.matches) {
          if (!video.src) {
            video.src = "/assets/videos/bqs-appbeing-used2.mp4";
            video.load();
          }
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const card = (
    <div
      className={`relative overflow-hidden rounded-3xl border border-[#032aac]/15 shadow-2xl ${className}`}
      style={{ minHeight: "520px" }}
    >
      {/* ── Background video (crystal clear, no noise overlay) ── */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[center_30%] md:object-center"
      />

      {/* ── Directional dark scrim: darkens text area on left, leaves phone/deck crystal clear on right ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#030d22]/90 via-[#030d22]/40 to-[#030d22]/30 md:bg-gradient-to-r md:from-[#030d22]/90 md:via-[#030d22]/60 md:to-transparent"
      />

      {/* Subtle bottom vignette for stat pills and CTA */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030d22]/80 to-transparent"
      />

      {/* ── Content ── */}
      <div className="relative flex h-full min-h-[520px] flex-col justify-between p-8 md:p-12 lg:p-16">
        {/* Top row — Eyebrow */}
        <div>
          <span className="inline-block rounded-full border border-white/15 bg-[#030d22]/60 px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#7dd3e8] backdrop-blur-md">
            {badge}
          </span>
        </div>

        {/* Middle — headline */}
        <div className="my-auto max-w-xl py-8">
          <h2 className="font-display text-3xl font-semibold leading-[1.15] text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl">
            The App On Deck.
            <br />
            <span className="text-[#38bdf8]">
              In The Field.
            </span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-200 drop-shadow sm:text-lg">
            Surveyors capture tank readings, run temperature-corrected volume
            calculations, and issue locked certificates — all offline,
            end-to-end.
          </p>
        </div>

        {/* Bottom row — stats + CTA */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          {/* Stat pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { value: "72 h", label: "Offline lease" },
              { value: "iOS & Android", label: "Platform" },
              { value: "0 ↗", label: "Paper forms" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/15 bg-[#030d22]/60 px-4 py-3 backdrop-blur-md"
              >
                <p className="font-display text-lg font-semibold text-white">
                  {s.value}
                </p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-300">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#19b5c9] px-6 py-3 text-sm font-semibold text-[#031038] shadow-lg transition-all duration-200 hover:bg-[#38d5e8] hover:shadow-cyan-500/25"
          >
            Request a demo
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );

  if (!asSection) {
    return card;
  }

  return (
    <section
      id="section-app-preview"
      aria-label="BQS app in action"
      className="px-6 py-16 md:py-20 lg:py-24"
      style={{ background: "var(--pearl-mist, #e4eff9)" }}
    >
      <div className="mx-auto max-w-6xl">{card}</div>
    </section>
  );
}
