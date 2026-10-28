"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import WeightText from "./WeightText";
import { CtaRow } from "./ui";
import { AppStoreBadges } from "./HomeEnhancements";
import OceanVideoSection from "./OceanVideoSection";

// Rollback: pass transitionMode="fade" to restore the previous crossfade.
export default function HeroLiquidSection({ className = "", transitionMode = "wave" }: {
  className?: string;
  transitionMode?: "wave" | "fade";
}) {
  const waveDivider = transitionMode === "wave";
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [oceanActive, setOceanActive] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.45, 0.65], [1, 1, 0]);
  const waterY = useTransform(scrollYProgress, [0, 0.62, 1], [0, -1000, -1000]);
  const waterOpacity = useTransform(scrollYProgress, [0, 0.56, 0.93], [1, 1, 0]);
  const oceanOpacity = useTransform(scrollYProgress, [0.48, 0.75], [0, 1]);
  const oceanScale = useTransform(scrollYProgress, [0.48, 1], [0.94, 1]);
  const oceanRadius = useTransform(scrollYProgress, [0.48, 1], [36, 0]);
  const waterColor = useTransform(scrollYProgress, [0, 0.5, 0.75], ["#032AAC", "#08647B", "#073D50"]);
  // Complete the flood before the trailing wave edge sweeps upward.
  // Carry the hero out with the divider rather than toggling its visibility.
  const dividerY = useTransform(scrollYProgress, [0, 0.5, 0.54, 1], [0, -1000, -1100, -2220]);
  const heroExitY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "0%", "-120%"]);
  useMotionValueEvent(scrollYProgress, "change", (progress) => setOceanActive(progress > (waveDivider ? 0.51 : 0.6)));

  return (
    <section ref={containerRef} className={`relative bg-[#073D50] ${className}`} style={{ height: reducedMotion ? "auto" : "calc(max(100svh, 740px) + 90svh)" }}>
      <div className={reducedMotion ? "relative" : "sticky top-0 h-svh min-h-[740px] overflow-hidden"}>
       {!reducedMotion && <motion.div inert={!oceanActive} style={{ opacity: waveDivider ? 1 : oceanOpacity, scale: oceanScale, borderRadius: oceanRadius }} className="absolute inset-0 overflow-hidden">
         <OceanVideoSection embedded active={oceanActive} />
      </motion.div>}
      <motion.div inert={!reducedMotion && oceanActive} style={{ opacity: reducedMotion || waveDivider ? 1 : heroOpacity, y: reducedMotion || !waveDivider ? 0 : heroExitY }} className="relative isolate flex h-svh min-h-[740px] flex-col overflow-hidden bg-[#F7FBFD]">
      <AuroraBackground as="div" className="pointer-events-none absolute inset-0 -z-20 h-full w-full bg-white" showRadialGradient>
        <div className="absolute inset-0 bg-grid-subtle opacity-25" />
      </AuroraBackground>
      <div className="hero-glass-current" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#F7FBFD] to-transparent" />

      <motion.div style={{ y: reducedMotion ? 0 : y }} className="mx-auto flex w-full max-w-[1000px] flex-1 flex-col justify-center px-5 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36">
        <div className="flex flex-col items-center space-y-5 text-center sm:space-y-6">
          <p className="hero-glass-label max-w-2xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-[#032AAC]/85 sm:text-xs">The world’s first mobile app for bunker quantity surveys.</p>
          <WeightText
            tag="h1" mode="cursor-radius" restWeight={300} activeWeight={800} radius={160}
            activeColor="#032AAC" baseColor="#031038" accentColor="#19B5C9"
            className="mx-auto w-full max-w-4xl font-display text-[clamp(32px,4.5vw,68px)] leading-[1.1] tracking-[-0.03em]"
          >
            Bunker Quantity Survey Software.
            <br className="hidden sm:inline" />
            {" "}Built for Deck and Office.
          </WeightText>
          <p className="max-w-2xl text-sm leading-relaxed text-[#031038]/70 sm:text-base lg:text-lg">
            Capture readings and calculate offline on the mobile app. Review surveys,
            manage records, and issue locked certificates through the web app.
          </p>
          <div className="pt-1"><CtaRow className="justify-center" /></div>
          <AppStoreBadges showSubtitle={false} />
        </div>
      </motion.div>

      <div className="mx-auto flex w-full max-w-6xl items-center gap-5 px-6 pb-7 sm:pb-10" aria-hidden="true">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#A5D3E8]" />
        <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#031038]/60 sm:text-xs">
          A closer look <ArrowDown className="h-4 w-4 text-[#032AAC]" />
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#A5D3E8]" />
      </div>
      </motion.div>
      <motion.svg aria-hidden="true" viewBox="0 0 1440 1000" preserveAspectRatio="none" style={{ opacity: reducedMotion || waveDivider ? 1 : waterOpacity }} className="pointer-events-none absolute inset-0 h-full w-full">
        <motion.g style={{ y: reducedMotion ? 0 : waveDivider ? dividerY : waterY }}>
          {[
            { offset: -28, fill: "#A5D3E8", opacity: 0.55 },
            { offset: -16, fill: "#4E8DEB", opacity: 0.65 },
            { offset: -7, fill: "#1B4FD1", opacity: 0.8 },
            { offset: 0, fill: waterColor, opacity: 1 },
          ].map((layer, index) => {
            // Stagger the trailing edges to carry the layered divider into the video.
            const bottom = 2080 + (3 - index) * 24;
            const tail = waveDivider
              ? `L 1480 ${bottom} C 1190 ${bottom - 45} 1000 ${bottom + 35} 720 ${bottom} C 430 ${bottom - 40} 210 ${bottom + 35} -40 ${bottom} Z`
              : "L 1480 2100 L -40 2100 Z";
            const first = `M -40 920 C 200 880 400 950 720 918 C 1000 880 1200 945 1480 910 ${tail}`;
            const second = `M -40 910 C 200 950 400 885 720 922 C 1000 950 1200 885 1480 920 ${tail}`;
            return (
            <motion.path key={index}
              d={first}
              animate={reducedMotion ? undefined : { d: [first, second, first] }}
              transition={{ duration: 7 + index, repeat: Infinity, ease: "easeInOut" }}
              style={{ y: layer.offset, fill: layer.fill, opacity: layer.opacity }}
              stroke="rgba(211,233,243,0.45)" strokeWidth={1.2}
            />
          ); })}
        </motion.g>
      </motion.svg>
      </div>
      {reducedMotion && <OceanVideoSection />}
    </section>
  );
}
