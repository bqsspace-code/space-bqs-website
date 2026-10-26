"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useLenis } from "lenis/react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import WeightText from "./WeightText";
import { CtaRow } from "./ui";
import { AppStoreBadges } from "./HomeEnhancements";

// 4 distinct tiered wave layers:
// Layer 0 (highest crest): soft pale shallow cyan #A5D3E8 / #D3E9F3
// Layer 1 (mid-high crest): soft sky azure #5B9BE6
// Layer 2 (mid-low crest): vibrant ocean cobalt #1B4FD1
// Layer 3 (front/bottom crest): primary deep marine blue #032AAC
const WAVE_LAYERS = [
  {
    name: "pale-shallow",
    color: "rgba(165, 211, 232, 0.45)", // --shallow
    strokeColor: "rgba(211, 233, 243, 0.85)",
    baseOffset: -30, // sits highest
    freq: 0.0035,
    speed: 0.70,
    amp: 14,
  },
  {
    name: "soft-azure",
    color: "rgba(91, 155, 230, 0.55)",
    strokeColor: "rgba(125, 185, 245, 0.90)",
    baseOffset: -20, // second highest
    freq: 0.0042,
    speed: 0.85,
    amp: 16,
  },
  {
    name: "vibrant-cobalt",
    color: "rgba(27, 79, 209, 0.75)", // --cobalt
    strokeColor: "rgba(80, 140, 240, 0.85)",
    baseOffset: -10, // third
    freq: 0.0048,
    speed: 1.00,
    amp: 18,
  },
  {
    name: "primary-marine",
    color: "#032AAC", // primary marine blue
    strokeColor: "rgba(255, 255, 255, 0.90)",
    baseOffset: 0, // lowest, anchors base
    freq: 0.0052,
    speed: 1.15,
    amp: 20,
  },
];

interface HeroLiquidSectionProps {
  className?: string;
  heightVh?: number; // Snappy scroll track in vh (default 125vh for zero dead space)
}

/**
 * HeroLiquidSection
 * 
 * Merges the Space BQS Hero with the Framer-inspired Liquid Wave Scroll Transition:
 * 1. Hero starts full viewport with Aurora ambient lighting, display H1, subtitle, CTAs and app store badges.
 * 2. At the base of the hero sits 4 tiered, multi-harmonic canvas liquid waves.
 * 3. As the visitor scrolls, scroll velocity agitates/stirs the liquid.
 * 4. The liquid rises up snappily, submerging the badges, buttons, and typography.
 * 5. At the exit (100% scroll), the wave immediately reveals the Product Video Section directly beneath it
 *    with zero dead scroll void.
 */
export default function HeroLiquidSection({
  className = "",
  heightVh = 125,
}: HeroLiquidSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Scroll and physics tracking refs (60fps animation loop)
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const scrollVelRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const agitationRef = useRef(0);
  const timeRef = useRef(0);
  const pointerAgitationRef = useRef(0);
  const isVisibleRef = useRef(true);
  const reducedMotionRef = useRef(false);

  // React state for DOM updates (opacity, pointer events)
  const [progress, setProgress] = useState(0);

  // Calculate target scroll progress
  const updateScrollProgress = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalScrollable = rect.height - windowH;

    if (totalScrollable <= 0) return;

    // Progress from 0 (at page top) to 1 (when hero finishes scroll-scrub)
    const scrolled = -rect.top;
    const rawProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
    targetProgressRef.current = rawProgress;

    // Track scroll velocity for liquid stirring
    const currentScrollY = window.scrollY;
    const deltaY = currentScrollY - lastScrollYRef.current;
    lastScrollYRef.current = currentScrollY;

    const velMagnitude = Math.abs(deltaY) / 24;
    scrollVelRef.current = deltaY;
    // Gentle stirring accumulation capped at 0.6
    agitationRef.current = Math.min(agitationRef.current + velMagnitude * 0.05, 0.6);

    isVisibleRef.current = rect.bottom > -100 && rect.top < windowH + 100;
  }, []);

  // Sync directly with Lenis smooth-scroll loop
  useLenis((lenis: any) => {
    if (reducedMotionRef.current) return;
    if (lenis?.velocity !== undefined) {
      scrollVelRef.current = lenis.velocity;
      agitationRef.current = Math.min(agitationRef.current + Math.abs(lenis.velocity) * 0.015, 0.6);
    }
    updateScrollProgress();
  });

  // Pointer interaction: moving cursor adds subtle localized water ripples
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerAgitationRef.current = Math.min(pointerAgitationRef.current + 0.02, 0.3);
  };

  // Main Canvas Liquid Wave Loop
  useEffect(() => {
    // Accessibility: check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();

    // 60fps RAF Liquid Wave Render Loop
    const render = () => {
      if (isVisibleRef.current) {
        // Responsive, snappy lerp on scroll progress (zero lag)
        const pDiff = targetProgressRef.current - currentProgressRef.current;
        currentProgressRef.current += pDiff * 0.22;
        const curProgress = currentProgressRef.current;

        if (Math.abs(curProgress - progress) > 0.005) {
          setProgress(curProgress);
        }

        // Fast decay so water quickly settles into a glassy, calm state
        agitationRef.current *= 0.90;
        pointerAgitationRef.current *= 0.90;
        scrollVelRef.current *= 0.90;

        const effectiveAgitation = reducedMotionRef.current
          ? 0
          : agitationRef.current + pointerAgitationRef.current;

        // Fluid breathing animation speed
        const speed = 0.014 + effectiveAgitation * 0.015;
        timeRef.current += speed;
        const t = timeRef.current;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Water level calculation:
        // Progress = 0: water baseline sits safely lowered at ~89% of screen height (zero text disturbance)
        // Progress = 1: water baseline reaches -30px (flooding full screen)
        const startLevel = height * 0.89;
        const endLevel = -30;
        const baseWaterY = startLevel - curProgress * (startLevel - endLevel);

        // Organic, natural wave amplitude (waves like before: ~18px at rest, up to ~25px under scroll)
        const baseAmp = reducedMotionRef.current ? 8 : 18 + effectiveAgitation * 12;
        const tilt = reducedMotionRef.current ? 0 : Math.max(-10, Math.min(10, scrollVelRef.current * 0.25));

        // ─────────────────────────────────────────────
        // 4 TIERED WAVE LAYERS (Visible simultaneously at rest, rising together on scroll)
        // ─────────────────────────────────────────────
        const convergence = 1 - curProgress * 0.65;

        for (let i = 0; i < WAVE_LAYERS.length; i++) {
          const l = WAVE_LAYERS[i];
          const layerBaseY = baseWaterY + l.baseOffset * convergence;
          const layerAmp = reducedMotionRef.current
            ? l.amp * 0.6
            : l.amp + effectiveAgitation * 8;

          ctx.beginPath();
          ctx.moveTo(0, height);

          const step = 4;
          const crestPoints: { x: number; y: number }[] = [];

          for (let x = 0; x <= width + step; x += step) {
            const nx = x / width;
            const wave1 = Math.sin(x * l.freq + t * l.speed + i * 0.8) * layerAmp;
            const wave2 = Math.sin(x * l.freq * 2.2 - t * l.speed * 0.7) * (layerAmp * 0.28);
            const slosh = (nx - 0.5) * tilt * (0.6 + i * 0.15);
            const y = layerBaseY + wave1 + wave2 + slosh;

            crestPoints.push({ x, y });
            ctx.lineTo(x, y);
          }

          ctx.lineTo(width, height);
          ctx.closePath();
          ctx.fillStyle = l.color;
          ctx.fill();

          // Luminous crest highlight along each layer
          if (crestPoints.length > 1) {
            ctx.beginPath();
            ctx.moveTo(crestPoints[0].x, crestPoints[0].y);
            for (let ptIdx = 1; ptIdx < crestPoints.length; ptIdx++) {
              ctx.lineTo(crestPoints[ptIdx].x, crestPoints[ptIdx].y);
            }
            ctx.strokeStyle = l.strokeColor;
            ctx.lineWidth = i === 3 ? 2.2 : 1.5;
            ctx.stroke();
          }
        }

        // ─────────────────────────────────────────────
        // 5. FLOATING MICRO-BUBBLES (Soft, subtle stirring feedback)
        // ─────────────────────────────────────────────
        if (effectiveAgitation > 0.18 && !reducedMotionRef.current) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.30)";
          const bubbleCount = Math.floor(effectiveAgitation * 4);
          for (let i = 0; i < bubbleCount; i++) {
            const bx = ((Math.sin(t * 1.5 + i * 3.7) * 0.5 + 0.5) * width);
            const by = baseWaterY + 20 + ((Math.cos(t * 1.2 + i * 2.1) * 0.5 + 0.5) * (height - baseWaterY) * 0.4);
            const bRadius = 1.0 + (i % 2) * 0.6;
            ctx.beginPath();
            ctx.arc(bx, by, bRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, [updateScrollProgress, progress]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: `${heightVh}vh` }}
    >
      {/* Pinned Sticky Viewport Container */}
      <div
        className="sticky top-0 h-screen min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between select-none"
        onPointerMove={handlePointerMove}
      >
        {/* ──────────── AURORA BACKGROUND ENGINE ──────────── */}
        <AuroraBackground
          as="div"
          className="absolute inset-0 w-full h-full pt-0 pb-0 flex flex-col justify-between bg-white text-slate-950"
          showRadialGradient={true}
        >
          {/* Subtle grid */}
          <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-40 z-0" />

          {/* ──────────── HERO EDITORIAL CONTENT ──────────── */}
          {/* Placed at z-10 behind the rising wave canvas */}
          <div className="relative z-10 mx-auto max-w-[1000px] px-4 w-full flex-1 flex flex-col justify-center my-auto pt-20 sm:pt-24 pb-12">
            <div className="flex flex-col items-center text-center space-y-6 pt-2 pb-4">
              {/* Main Headline with variable font interaction */}
              <WeightText
                tag="h1"
                mode="cursor-radius"
                restWeight={300}
                activeWeight={800}
                radius={160}
                activeColor="#032AAC"
                baseColor="#031038"
                accentColor="#19B5C9"
                className="font-display text-[clamp(34px,5.6vw,74px)] leading-[1.08] tracking-[-0.03em] max-w-4xl w-full mx-auto select-none"
              >
                Engineered for the deck.
                <br className="hidden sm:inline" />
                {" "}Calibrated for absolute proof.
              </WeightText>

              {/* Subtitle */}
              <p
                className="text-lg sm:text-xl max-w-2xl leading-relaxed select-none"
                style={{ color: "rgba(3,16,56,0.68)" }}
              >
                Space BQS turns raw deck soundings into ASTM-corrected, tamper-proof bunker certificates in seconds.
              </p>

              {/* CTA Row */}
              <div className={`pt-2 transition-opacity duration-200 ${progress > 0.4 ? "pointer-events-none opacity-30" : "pointer-events-auto opacity-100"}`}>
                <CtaRow className="justify-center" />
              </div>

              {/* Official Store Badges (App Store & Google Play) */}
              <div className={`pt-2 transition-opacity duration-200 ${progress > 0.25 ? "pointer-events-none opacity-30" : "pointer-events-auto opacity-100"}`}>
                <AppStoreBadges showSubtitle={false} />
              </div>
            </div>
          </div>
        </AuroraBackground>

        {/* ──────────── CANVAS LIQUID WAVE ──────────── */}
        {/* Sits at z-20 above the hero text to physically submerge it as water rises */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-20 w-full h-full pointer-events-none"
        />

        {/* ──────────── SUBMERGED EXIT HANDOFF OVERLAY ──────────── */}
        {/* Instantaneous clean handoff right at exit boundary (zero lingering dead space) */}
        <div
          className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-100"
          style={{
            backgroundColor: "#032AAC",
            opacity: Math.max(0, (progress - 0.96) / 0.04),
          }}
        />
      </div>
    </div>
  );
}
