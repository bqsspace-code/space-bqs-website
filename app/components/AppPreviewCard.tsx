"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Monitor, Smartphone, Tablet } from "lucide-react";
import AmbientVideo from "./AmbientVideo";
import officePortalImage from "@/public/assets/web_image/maritime-operations-center-survey-warehouse.jpg";

type DeviceId = "phone" | "tablet" | "desktop";

interface AppPreviewCardProps {
  asSection?: boolean;
  className?: string;
  badge?: string;
}

const CYCLE_MS = 7500;

const DEVICES = [
  {
    id: "phone" as const,
    label: "Phone",
    icon: Smartphone,
    headingTop: "The App On Deck.",
    headingAccent: "In The Field.",
    description:
      "Capture tank readings and compute ASTM calculations offline on iPhone or Android.",
    mediaType: "video" as const,
    src: "/assets/videos/bqs-appbeing-used2.mp4",
    poster: "/assets/videos/bqs-appbeing-used2-poster.webp",
    mediaLabel: "Surveyor using Space BQS on a smartphone on deck",
  },
  {
    id: "tablet" as const,
    label: "Tablet",
    icon: Tablet,
    headingTop: "Built For Tablets.",
    headingAccent: "Ready For Decks.",
    description:
      "Review full tank calibration tables offline on iPad and rugged deck tablets.",
    mediaType: "video" as const,
    src: "/assets/videos/bqs-app-beingused.mp4",
    poster: "/assets/videos/bqs-app-beingused-poster.webp",
    mediaLabel: "Surveyor using Space BQS on a rugged tablet beside the tank hatch",
  },
  {
    id: "desktop" as const,
    label: "Desktop",
    icon: Monitor,
    headingTop: "Office Web Portal.",
    headingAccent: "Every Browser.",
    description:
      "Review field records and prepare PDF and Excel report outputs from Mac or Windows.",
    mediaType: "image" as const,
    src: officePortalImage,
    poster: "",
    mediaLabel: "Maritime operations office reviewing Space BQS web portal across desktop monitors",
  },
] as const;

/**
 * AppPreviewCard — Apple-minimal showcase card with cross-fading full-bleed
 * device media and one unified frosted segmented pill dock (Phone · Tablet · Desktop).
 */
export default function AppPreviewCard({
  asSection = false,
  className = "",
  badge = "See It In Action",
}: AppPreviewCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [device, setDevice] = useState<DeviceId>("phone");
  const [inView, setInView] = useState(false);
  const [autoCycle, setAutoCycle] = useState(true);
  const [hoverPaused, setHoverPaused] = useState(false);

  const active = DEVICES.find((d) => d.id === device) ?? DEVICES[0];

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !autoCycle || hoverPaused) return;
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (pref.matches) return;

    const timer = window.setInterval(() => {
      setDevice((current) => {
        const idx = DEVICES.findIndex((d) => d.id === current);
        return DEVICES[(idx + 1) % DEVICES.length].id;
      });
    }, CYCLE_MS);

    return () => window.clearInterval(timer);
  }, [inView, autoCycle, hoverPaused]);

  const selectDevice = (id: DeviceId) => {
    setAutoCycle(false);
    setDevice(id);
  };

  const card = (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-[32px] border border-[#032AAC]/20 bg-[#031038] shadow-[0_28px_70px_-24px_rgba(3,16,56,0.45)] ${className}`}
      style={{ minHeight: "540px" }}
    >
      {/* ── Cross-Fading Background Media ── */}
      {DEVICES.map((item) => {
        const isVisible = item.id === device;
        return (
          <div
            key={item.id}
            aria-hidden={!isVisible}
            className={`absolute inset-0 transition-opacity duration-500 ease-out ${
              isVisible ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {item.mediaType === "video" ? (
              <AmbientVideo
                src={item.src}
                poster={item.poster}
                label={item.mediaLabel}
                active={inView && isVisible}
                className="object-[center_30%] md:object-center"
              />
            ) : (
              <Image
                src={item.src}
                alt={item.mediaLabel}
                fill
                sizes="(min-width: 1024px) 1152px, 100vw"
                className="object-cover object-center"
              />
            )}
          </div>
        );
      })}

      {/* ── Clean Marine Navy Directional Scrim ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#031038]/90 via-[#031038]/42 to-transparent md:bg-gradient-to-r md:from-[#031038]/90 md:via-[#031038]/55 md:to-transparent"
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex h-full min-h-[540px] flex-col justify-end p-8 sm:p-12 lg:p-14">
        <div className="my-auto max-w-lg py-6">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#7dd3e8]">
            {badge}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight leading-[1.08] text-white drop-shadow-md sm:text-5xl lg:text-[54px]">
            {active.headingTop}
            <br />
            <span className="text-[#38bdf8]">{active.headingAccent}</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-200 sm:text-base">
            {active.description}
          </p>
          <p className="mt-4 text-xs font-medium tracking-wide text-[#7dd3e8]/80">
            iPhone · Android · iPad · Rugged Tablets · Mac &amp; Windows Web
          </p>
        </div>

        {/* ── Bottom Minimal Segmented Pill Bar (Space BQS Palette) ── */}
        <div className="flex flex-col items-start justify-between gap-4 pt-4 sm:flex-row sm:items-center">
          <div
            role="tablist"
            aria-label="Switch device preview"
            onMouseEnter={() => setHoverPaused(true)}
            onMouseLeave={() => setHoverPaused(false)}
            className="inline-flex items-center gap-1 rounded-full bg-[#031038]/70 p-1.5 backdrop-blur-xl ring-1 ring-[#7dd3e8]/25 shadow-lg"
          >
            {DEVICES.map((item) => {
              const Icon = item.icon;
              const selected = item.id === device;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => selectDevice(item.id)}
                  className={`relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-300 cursor-pointer sm:px-4 ${
                    selected
                      ? "bg-[#032AAC] text-white ring-1 ring-[#19B5C9]/55 shadow-sm"
                      : "text-blue-100/75 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 ${selected ? "text-[#19B5C9]" : ""}`}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#19B5C9] px-5 py-2.5 text-sm font-semibold text-[#031038] shadow-lg transition-all duration-200 hover:bg-[#38d5e8] hover:shadow-cyan-500/25 hover:scale-[1.02]"
          >
            Request a demo
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Subtle bottom cyan-cobalt progress trace */}
      {autoCycle && inView && !hoverPaused && (
        <span
          key={device}
          aria-hidden="true"
          className="apple-cycle-line pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[2.5px] bg-gradient-to-r from-[#032AAC] via-[#19B5C9] to-[#38bdf8]"
        />
      )}

      <style jsx>{`
        @keyframes appleCycleFill {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        .apple-cycle-line {
          transform-origin: left;
          animation: appleCycleFill ${CYCLE_MS}ms linear forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .apple-cycle-line {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );

  if (!asSection) {
    return card;
  }

  return (
    <section
      id="section-app-preview"
      aria-label="BQS app across all devices"
      className="px-6 py-16 md:py-20 lg:py-24"
      style={{ background: "var(--pearl-mist, #e4eff9)" }}
    >
      <div className="mx-auto max-w-6xl">{card}</div>
    </section>
  );
}
