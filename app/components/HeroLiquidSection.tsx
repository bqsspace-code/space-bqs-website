"use client";

import { useRef, useEffect, useCallback } from "react";
import { useLenis } from "lenis/react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import WeightText from "./WeightText";
import { CtaRow } from "./ui";
import { AppStoreBadges } from "./HomeEnhancements";

// 4 distinct tiered wave layers matching brand palette:
// Layer 0 (highest crest): soft pale shallow cyan
// Layer 1 (mid-high crest): soft sky azure
// Layer 2 (mid-low crest): vibrant ocean cobalt
// Layer 3 (front/bottom crest): primary deep marine blue #032AAC
const WAVE_LAYERS = [
  {
    name: "pale-shallow",
    color: "rgba(165, 211, 232, 0.45)",
    strokeColor: "rgba(211, 233, 243, 0.85)",
    baseOffset: -22,
    freq: 0.0035,
    speed: 0.70,
    amp: 10,
  },
  {
    name: "soft-azure",
    color: "rgba(91, 155, 230, 0.55)",
    strokeColor: "rgba(125, 185, 245, 0.90)",
    baseOffset: -14,
    freq: 0.0042,
    speed: 0.85,
    amp: 12,
  },
  {
    name: "vibrant-cobalt",
    color: "rgba(27, 79, 209, 0.75)",
    strokeColor: "rgba(80, 140, 240, 0.85)",
    baseOffset: -7,
    freq: 0.0048,
    speed: 1.00,
    amp: 14,
  },
  {
    name: "primary-marine",
    color: "#032AAC",
    strokeColor: "rgba(255, 255, 255, 0.90)",
    baseOffset: 0,
    freq: 0.0052,
    speed: 1.15,
    amp: 16,
  },
];

interface HeroLiquidSectionProps {
  className?: string;
  heightVh?: number; // Total scroll track in vh (default 130vh for snappy submerge with zero dead void)
}

/**
 * HeroLiquidSection
 *
 * Sticky Hero with Framer-inspired Liquid Wave Scroll Transition:
 * 1. Hero starts pinned (sticky top-0 h-screen) so typography, buttons and badges stay anchored.
 * 2. 4 tiered, multi-harmonic canvas liquid waves rise up dynamically over the hero on scroll.
 * 3. As the user scrolls, the water physically submerges badges, then CTA buttons, then the headline.
 * 4. At 100% submerge, the container unpins immediately, transitioning seamlessly into ProductVideoSection.
 * 5. Direct 1:1 synchronization with Lenis smooth-scroll eliminates double-lerp lag and skipping.
 */
export default function HeroLiquidSection({
  className = "",
  heightVh = 130,
}: HeroLiquidSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  // Scroll and physics tracking
  const currentProgressRef = useRef(0);
  const scrollVelRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const agitationRef = useRef(0);
  const timeRef = useRef(0);
  const pointerAgitationRef = useRef(0);
  const isVisibleRef = useRef(true);
  const reducedMotionRef = useRef(false);

  // Sync scroll progress directly from DOM layout position (no double-lerp lag)
  const updateScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalScrollable = rect.height - windowH;

    if (totalScrollable <= 0) {
      currentProgressRef.current = 0;
      return;
    }

    const scrolled = -rect.top;
    const rawProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
    currentProgressRef.current = rawProgress;

    const currentScrollY = window.scrollY;
    const deltaY = currentScrollY - lastScrollYRef.current;
    lastScrollYRef.current = currentScrollY;

    const velMagnitude = Math.abs(deltaY) / 20;
    scrollVelRef.current = deltaY;
    agitationRef.current = Math.min(agitationRef.current + velMagnitude * 0.06, 0.7);

    isVisibleRef.current = rect.bottom > -50 && rect.top < windowH + 50;
  }, []);

  // Sync directly with Lenis smooth-scroll loop
  useLenis((lenis: any) => {
    if (reducedMotionRef.current) return;
    if (lenis?.velocity !== undefined) {
      scrollVelRef.current = lenis.velocity;
      agitationRef.current = Math.min(agitationRef.current + Math.abs(lenis.velocity) * 0.02, 0.7);
    }
    updateScroll();
  });

  // Pointer interaction: moving cursor adds subtle localized water ripples
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerAgitationRef.current = Math.min(pointerAgitationRef.current + 0.02, 0.35);
  };

  // Main Canvas Liquid Wave Loop
  useEffect(() => {
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

    const onResize = () => {
      handleResize();
      updateScroll();
    };

    handleResize();
    updateScroll();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", updateScroll, { passive: true });

    // 60fps RAF Liquid Wave Render Loop
    const render = () => {
      if (isVisibleRef.current && width > 0 && height > 0) {
        // Fast decay so water quickly settles into a calm glassy state
        agitationRef.current *= 0.92;
        pointerAgitationRef.current *= 0.90;
        scrollVelRef.current *= 0.90;

        const effectiveAgitation = reducedMotionRef.current
          ? 0
          : agitationRef.current + pointerAgitationRef.current;

        // Fluid breathing animation speed
        const speed = 0.015 + effectiveAgitation * 0.018;
        timeRef.current += speed;
        const t = timeRef.current;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Water level calculation:
        // Automatically adapts to any viewport height so wave is ALWAYS visible at the bottom at rest,
        // and dynamically swells and rises up on scroll to gracefully submerge the badges, CTAs and headline.
        const isCompact = height < 650;
        const layerScale = isCompact ? 0.65 : 1.0;
        const startLevel = isCompact ? height - 42 : height * 0.88;
        const endLevel = -35;

        // Progress directly drives the water rise from 0 (rest) to 1 (fully submerged at unpin boundary)
        const progress = reducedMotionRef.current ? 0 : currentProgressRef.current;
        const baseWaterY = startLevel - progress * (startLevel - endLevel);
        const convergence = 1 - progress * 0.55;

        // Disable pointer events on submerged buttons without triggering React re-renders
        if (ctaRowRef.current) {
          ctaRowRef.current.style.pointerEvents = progress > 0.45 ? "none" : "auto";
        }
        if (badgesRef.current) {
          badgesRef.current.style.pointerEvents = progress > 0.25 ? "none" : "auto";
        }

        // Responsive wave amplitude & tilt: expands during upward surge
        const baseAmp = (reducedMotionRef.current ? 4 : 10 + effectiveAgitation * 12 + progress * 6) * layerScale;
        const tilt = (reducedMotionRef.current ? 0 : Math.max(-6, Math.min(6, scrollVelRef.current * 0.18))) * layerScale;

        // 4 TIERED WAVE LAYERS
        for (let i = 0; i < WAVE_LAYERS.length; i++) {
          const l = WAVE_LAYERS[i];
          const scaledOffset = l.baseOffset * layerScale * convergence;
          const layerBaseY = baseWaterY + scaledOffset;
          const layerAmp = (reducedMotionRef.current ? l.amp * 0.5 : l.amp + effectiveAgitation * 7 + progress * 4) * layerScale;

          ctx.beginPath();
          ctx.moveTo(0, height);

          const step = 4;
          const crestPoints: { x: number; y: number }[] = [];

          for (let x = 0; x <= width + step; x += step) {
            const nx = x / width;
            const wave1 = Math.sin(x * l.freq + t * l.speed + i * 0.8) * layerAmp;
            const wave2 = Math.sin(x * l.freq * 2.2 - t * l.speed * 0.7) * (layerAmp * 0.3);
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
            ctx.lineWidth = i === 3 ? 2.0 : 1.3;
            ctx.stroke();
          }
        }

        // Floating Micro-Bubbles on scroll agitation
        if (effectiveAgitation > 0.18 && !reducedMotionRef.current) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.40)";
          const bubbleCount = Math.floor(effectiveAgitation * 5);
          for (let i = 0; i < bubbleCount; i++) {
            const bx = (Math.sin(t * 1.5 + i * 3.7) * 0.5 + 0.5) * width;
            const by = baseWaterY + 10 + (Math.cos(t * 1.2 + i * 2.1) * 0.5 + 0.5) * (height - baseWaterY) * 0.5;
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
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", updateScroll);
    };
  }, [updateScroll]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: `${heightVh}vh` }}
    >
      {/* Pinned Sticky Viewport Container */}
      <div
        className="sticky top-0 h-screen min-h-[500px] w-full overflow-hidden flex flex-col justify-between select-none"
        onPointerMove={handlePointerMove}
      >
        {/* ──────────── AURORA BACKGROUND ENGINE ──────────── */}
        <AuroraBackground
          as="div"
          className="absolute inset-0 w-full h-full flex flex-col justify-between bg-white text-slate-950 pointer-events-none"
          showRadialGradient={true}
        >
          {/* Subtle technical grid pattern */}
          <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-40 z-0" />
        </AuroraBackground>

        {/* ──────────── HERO EDITORIAL CONTENT (Centered vertically with safe margins) ──────────── */}
        <div className="relative z-10 mx-auto max-w-[1000px] px-4 w-full flex-1 flex flex-col justify-center my-auto pt-14 sm:pt-16 pb-16 sm:pb-20">
          <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 md:space-y-5 pt-1 pb-1">
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
              className="font-display text-[clamp(26px,4.5vw,68px)] leading-[1.12] sm:leading-[1.08] tracking-[-0.03em] max-w-4xl w-full mx-auto select-none"
            >
              Engineered for the deck.
              <br className="hidden sm:inline" />
              {" "}Calibrated for absolute proof.
            </WeightText>

            {/* Subtitle */}
            <p
              className="text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl leading-normal sm:leading-relaxed select-none text-[#031038]/70"
            >
              Space BQS turns raw deck soundings into ASTM-corrected, tamper-proof bunker certificates in seconds.
            </p>

            {/* CTA Row */}
            <div ref={ctaRowRef} className="pt-1.5 sm:pt-2">
              <CtaRow className="justify-center" />
            </div>

            {/* Official Store Badges (App Store & Google Play) */}
            <div ref={badgesRef} className="pt-1.5 sm:pt-2">
              <AppStoreBadges showSubtitle={false} />
            </div>
          </div>
        </div>

        {/* ──────────── CANVAS LIQUID WAVE (Full bleed across hero, anchored at base) ──────────── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-20 w-full h-full pointer-events-none"
        />
      </div>
    </div>
  );
}
