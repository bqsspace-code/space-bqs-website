"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import AmbientVideo from "./AmbientVideo";

export default function OceanVideoSection({ embedded = false, active = true }: { embedded?: boolean; active?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 15%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, restDelta: 0.001 });
  const clipPath = useTransform(progress, [0, 1], ["inset(0% 4% 0% 4% round 36px)", "inset(0% 0% 0% 0% round 0px)"]);

  return (
    <div ref={sectionRef} className={embedded ? "h-full bg-[#073D50]" : "bg-[#F7FBFD]"}>
    <motion.section style={{ clipPath: reducedMotion || embedded ? undefined : clipPath }} aria-labelledby="ocean-video-heading" className={`relative isolate overflow-hidden bg-[#073D50] text-white ${embedded ? "flex h-full items-center" : ""}`}>
      <AmbientVideo
        active={active}
        src="/assets/videos/oil-tanker-traveling-cropped-web.mp4"
        poster="/assets/videos/oil-tanker-traveling-cropped-poster.webp"
        label="oil tanker traveling across the open ocean"
        className="-z-20"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#042B3B]/85 via-[#073D50]/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#042B3B]/60 to-transparent" />

      <div className="mx-auto flex w-full min-h-[560px] max-w-6xl flex-col justify-center px-6 py-24 sm:min-h-[640px] sm:py-28">
        <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[#A5D3E8]">
          <span className="h-px w-8 bg-[#A5D3E8]" aria-hidden="true" />
           Mobile Deck Tool · iOS &amp; Android
        </p>
        <h2 id="ocean-video-heading" className="max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          From deck to desk.<br />See it in action.
        </h2>
        <p className="mt-6 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
          Watch the actual Space BQS app walkthrough: choose a vessel, enter tank readings, and review the calculation. Capture offline on deck. Review in the office.
        </p>
        <Link href="/videos#app-demo" className="mt-8 inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#031038] transition-colors hover:bg-[#D3E9F3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          <Play className="h-4 w-4" aria-hidden="true" />
          Watch the app walkthrough
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-white/25 pt-5">
          <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-white/75">Offline capture · Live calculations · Office review</p>
        </div>
      </div>
    </motion.section>
    </div>
  );
}
