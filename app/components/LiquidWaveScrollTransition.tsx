"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useLenis } from "lenis/react";

interface LiquidWaveScrollTransitionProps {
  titleTop?: string;
  titleBottom?: string;
  subtitle?: string;
  eyebrow?: string;
  heightVh?: number; // Total scroll track height in vh (default 220vh)
  className?: string;
}

/**
 * LiquidWaveScrollTransition
 * 
 * Inspired by the Framer Liquid Wave Divider (https://www.framer.com/marketplace/components/liquid-wave-divider/)
 * 
 * 1. Pinned sticky viewport stage inside a 220vh track.
 * 2. Editorial typography ("LIQUID PRECISION" + "◉ scroll to stir the liquid").
 * 3. Multi-harmonic, physics-driven canvas wave at the bottom (starts at ~80% height).
 * 4. As the visitor scrolls, scroll velocity agitates/stirs the water, and the liquid
 *    rises continuously, engulfing and submerging the typography.
 * 5. Reaches 100% full marine flood at the exit, transitioning smoothly into the next section.
 */
export default function LiquidWaveScrollTransition({
  titleTop = "LIQUID",
  titleBottom = "PRECISION",
  subtitle = "scroll to stir the liquid",
  eyebrow = "ASTM D1250-04 CALIBRATION ENGINE",
  heightVh = 220,
  className = "",
}: LiquidWaveScrollTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Scroll and physics states in refs for 60fps RAF loop
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const scrollVelRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const agitationRef = useRef(0);
  const timeRef = useRef(0);
  const pointerAgitationRef = useRef(0);
  const isVisibleRef = useRef(true);
  const reducedMotionRef = useRef(false);

  // React state for DOM updates
  const [progress, setProgress] = useState(0);

  // Update target progress from scroll position
  const updateScrollProgress = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalScrollable = rect.height - windowH;

    if (totalScrollable <= 0) return;

    // Progress from 0 (container top at viewport top) to 1 (container bottom at viewport bottom)
    const scrolled = -rect.top;
    const rawProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
    targetProgressRef.current = rawProgress;

    // Track scroll velocity
    const currentScrollY = window.scrollY;
    const deltaY = currentScrollY - lastScrollYRef.current;
    lastScrollYRef.current = currentScrollY;

    // Add gentle velocity impulse to agitation (capped at 0.6)
    const velMagnitude = Math.abs(deltaY) / 24;
    scrollVelRef.current = deltaY;
    agitationRef.current = Math.min(agitationRef.current + velMagnitude * 0.05, 0.6);

    // Visibility cull
    isVisibleRef.current = rect.bottom > -100 && rect.top < windowH + 100;
  }, []);

  // Hook directly into Lenis smooth-scroll loop for synchronized updates
  useLenis((lenis: any) => {
    if (reducedMotionRef.current) return;
    if (lenis?.velocity !== undefined) {
      scrollVelRef.current = lenis.velocity;
      agitationRef.current = Math.min(agitationRef.current + Math.abs(lenis.velocity) * 0.015, 0.6);
    }
    updateScrollProgress();
  });

  // Pointer interaction: dragging or moving cursor over water adds localized ripple
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerAgitationRef.current = Math.min(pointerAgitationRef.current + 0.12, 1.2);
  };

  // Main Canvas Render Loop
  useEffect(() => {
    // Check reduced motion preference
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

    // Harmonic wave drawing function
    const render = () => {
      if (isVisibleRef.current) {
        // Smooth lerp progress towards target for liquid inertia
        const pDiff = targetProgressRef.current - currentProgressRef.current;
        currentProgressRef.current += pDiff * 0.14;
        const curProgress = currentProgressRef.current;

        // Periodic state sync for DOM text opacity / transforms (throttled)
        if (Math.abs(curProgress - progress) > 0.005) {
          setProgress(curProgress);
        }

        // Decay agitation and scroll velocity smoothly
        agitationRef.current *= 0.88;
        pointerAgitationRef.current *= 0.88;
        scrollVelRef.current *= 0.88;

        const effectiveAgitation = reducedMotionRef.current
          ? 0
          : agitationRef.current + pointerAgitationRef.current;

        // Gentle, slow fluid breathing speed
        const speed = 0.010 + effectiveAgitation * 0.012;
        timeRef.current += speed;
        const t = timeRef.current;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Water level calculation:
        const startLevel = height * 0.82;
        const endLevel = -30;
        const baseWaterY = startLevel - curProgress * (startLevel - endLevel);

        // Organic, natural wave amplitude (waves like before: ~18px at rest, up to ~25px under scroll)
        const baseAmp = reducedMotionRef.current ? 8 : 18 + effectiveAgitation * 12;
        const tilt = reducedMotionRef.current ? 0 : Math.max(-10, Math.min(10, scrollVelRef.current * 0.25));

        // ─────────────────────────────────────────────
        // 1. LAYER 1: BACK SHALLOW TIDE WAVE (Softest Translucent Wash)
        // ─────────────────────────────────────────────
        ctx.beginPath();
        ctx.moveTo(0, height);

        const backStep = 10;
        for (let x = 0; x <= width + backStep; x += backStep) {
          const nx = x / width;
          const wave1 = Math.sin(nx * Math.PI * 2.2 + t * 0.75) * (baseAmp * 0.70);
          const wave2 = Math.cos(nx * Math.PI * 3.8 - t * 0.5) * (baseAmp * 0.28);
          const slosh = (nx - 0.5) * tilt * 0.5;
          const y = baseWaterY + 12 + wave1 + wave2 + slosh;

          if (x === 0) {
            ctx.lineTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        const backGrad = ctx.createLinearGradient(0, baseWaterY - 20, 0, height);
        backGrad.addColorStop(0, "rgba(165, 211, 232, 0.45)"); // --shallow soft tide
        backGrad.addColorStop(1, "rgba(90, 155, 230, 0.40)");
        ctx.fillStyle = backGrad;
        ctx.fill();

        // ─────────────────────────────────────────────
        // 2. LAYER 2: MID SOFT AZURE WAVE (Soft intermediate layer)
        // ─────────────────────────────────────────────
        ctx.beginPath();
        ctx.moveTo(0, height);

        const midStep = 8;
        for (let x = 0; x <= width + midStep; x += midStep) {
          const nx = x / width;
          const wave1 = Math.sin(nx * Math.PI * 1.8 + t * 0.85 + 0.5) * (baseAmp * 0.82);
          const wave2 = Math.sin(nx * Math.PI * 4.0 - t * 0.6) * (baseAmp * 0.22);
          const slosh = (nx - 0.5) * tilt * 0.7;
          const y = baseWaterY + 6 + wave1 + wave2 + slosh;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        const midGrad = ctx.createLinearGradient(0, baseWaterY - 20, 0, height);
        midGrad.addColorStop(0, "rgba(125, 180, 230, 0.50)");
        midGrad.addColorStop(1, "rgba(60, 119, 196, 0.65)");
        ctx.fillStyle = midGrad;
        ctx.fill();

        // ─────────────────────────────────────────────
        // 3. LAYER 3: FOREGROUND PRIMARY WAVE (Soft Dimmed Marine Gradient)
        // ─────────────────────────────────────────────
        ctx.beginPath();
        ctx.moveTo(0, height);

        const foreStep = 6;
        const wavePoints: { x: number; y: number }[] = [];

        for (let x = 0; x <= width + foreStep; x += foreStep) {
          const nx = x / width;
          // Full, organic rolling wave
          const wave1 = Math.sin(nx * Math.PI * 1.6 + t * 1.0) * baseAmp;
          const wave2 = Math.sin(nx * Math.PI * 3.4 - t * 0.8 + 1.0) * (baseAmp * 0.32);
          const wave3 = Math.cos(nx * Math.PI * 0.9 + t * 0.4) * (baseAmp * 0.15);
          const slosh = (nx - 0.5) * tilt;

          const y = baseWaterY + wave1 + wave2 + wave3 + slosh;
          wavePoints.push({ x, y });

          if (x === 0) {
            ctx.lineTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Soft, dimmed, calming marine gradient (NOT dark black/ink, NOT neon cobalt)
        const foreGrad = ctx.createLinearGradient(0, baseWaterY - 35, 0, height);
        foreGrad.addColorStop(0, "#5B97E2"); // soft sky-azure surface
        foreGrad.addColorStop(0.35, "#3C77C4"); // calm maritime blue mid
        foreGrad.addColorStop(1, "#24599B");  // soft dimmed naval base
        ctx.fillStyle = foreGrad;
        ctx.fill();

        // ─────────────────────────────────────────────
        // 4. WATERLINE CREST (Soft White & Cyan Sheen)
        // ─────────────────────────────────────────────
        if (wavePoints.length > 1) {
          ctx.beginPath();
          ctx.moveTo(wavePoints[0].x, wavePoints[0].y);
          for (let i = 1; i < wavePoints.length; i++) {
            ctx.lineTo(wavePoints[i].x, wavePoints[i].y);
          }
          ctx.strokeStyle = "rgba(255, 255, 255, 0.90)"; // crisp soft white rim
          ctx.lineWidth = 2.2;
          ctx.stroke();

          // Soft secondary sky cyan halo
          ctx.beginPath();
          ctx.moveTo(wavePoints[0].x, wavePoints[0].y + 1.5);
          for (let i = 1; i < wavePoints.length; i++) {
            ctx.lineTo(wavePoints[i].x, wavePoints[i].y + 1.5);
          }
          ctx.strokeStyle = "rgba(165, 211, 232, 0.65)"; // --shallow
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // ─────────────────────────────────────────────
        // 5. FLOATING MICRO-BUBBLES (Soft, subtle stirring feedback)
        // ─────────────────────────────────────────────
        if (effectiveAgitation > 0.20 && !reducedMotionRef.current) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
          const bubbleCount = Math.floor(effectiveAgitation * 3);
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
      {/* Pinned Viewport Container */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-[#F7FBFD] select-none"
        onPointerMove={handlePointerMove}
      >
        {/* Subtle background ambient grid & nautical texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 40%, rgba(211, 233, 243, 0.5) 0%, transparent 70%)",
          }}
        />

        {/* ──────────── CENTRAL EDITORIAL TYPOGRAPHY ──────────── */}
        {/* Placed behind the wave canvas so rising water organically submerges it */}
        <div className="relative z-0 flex flex-col items-center justify-center text-center px-4 max-w-5xl">
          {/* Eyebrow */}
          {eyebrow && (
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full bg-[#EAF4F9] border border-[#D3E9F3] text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#032AAC]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#19B5C9] animate-pulse" />
              <span>{eyebrow}</span>
            </div>
          )}

          {/* Main Display Headline (Bricolage Grotesque) */}
          <h2
            className="font-display font-extrabold uppercase text-[#031038] tracking-[-0.04em] leading-[0.88] select-none pointer-events-none transition-transform duration-300"
            style={{
              fontSize: "clamp(64px, 11vw, 150px)",
              // Soft scale on scroll stirring
              transform: `scale(${1 - progress * 0.04})`,
            }}
          >
            <span className="block">{titleTop}</span>
            <span className="block bg-gradient-to-b from-[#031038] to-[#032AAC] bg-clip-text text-transparent">
              {titleBottom}
            </span>
          </h2>

          {/* Subtitle / Interaction Cue */}
          <div className="mt-8 flex items-center justify-center gap-2.5 text-[#032AAC] transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - progress * 2.2) }}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#19B5C9] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#032AAC]" />
            </span>
            <span className="text-xs sm:text-sm font-sans font-medium tracking-widest uppercase">
              {subtitle}
            </span>
          </div>

          {/* Scroll depth gauge indicator */}
          <div
            className="mt-4 text-[10px] font-mono text-[#031038]/40 uppercase tracking-widest transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - progress * 2.8) }}
          >
            Liquid Level: {Math.round(progress * 100)}% · ASTM Table 54B
          </div>
        </div>

        {/* ──────────── CANVAS LIQUID WAVE ──────────── */}
        {/* Sits above the text (z-10) to submerge it as water level rises */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 w-full h-full pointer-events-none"
        />

        {/* ──────────── SUBMERGED EXIT FLOOD OVERLAY ──────────── */}
        {/* Once progress nears 100%, ensures seamless soft dimmed maritime blue fill for the next section */}
        <div
          className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-200"
          style={{
            backgroundColor: "#24599B",
            opacity: Math.max(0, (progress - 0.92) / 0.08),
          }}
        />
      </div>
    </div>
  );
}
