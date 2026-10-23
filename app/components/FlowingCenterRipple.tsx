"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface FlowingCenterRippleProps {
  className?: string;
  ringCount?: number;
  speed?: number; // duration in seconds for a full loop
}

/**
 * FlowingCenterRipple
 *
 * Minimal, slow, and smooth concentric elliptical water ripples.
 * - 3 clean, whisper-soft geometric ellipses that drift outward slowly
 * - Slow 8.5s meditative cycle with gentle radial core breathing
 * - Subtle 1px strokes with soft alpha blending (no jagged wobble or clutter)
 * - Safe, crash-resilient 60fps RAF loop with IntersectionObserver pause
 */
export default function FlowingCenterRipple({
  className = "",
  ringCount = 3,
  speed = 8.5,
}: FlowingCenterRippleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const startTimeRef = useRef<number>(0);

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = container.clientWidth;
    const h = container.clientHeight;

    if (w <= 0 || h <= 0) return;

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  const draw = useCallback((now: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    if (w <= 0 || h <= 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!startTimeRef.current) startTimeRef.current = now;
    const elapsed = Math.max(0, (now - startTimeRef.current) / 1000);

    const cx = w / 2;
    // Align center with the headline area
    const cy = h * 0.46;

    const maxRx = Math.max(120, Math.min(w * 0.44, 480));
    const minRx = 140;
    const yRatio = 0.42; // Subtle elliptical perspective

    ctx.save();
    ctx.scale(dpr, dpr);

    // 1. Slow, minimal central luminous core (breathes over a slow 9s cycle)
    const slowPulse = Math.sin(elapsed * 0.7);
    const coreRadius = Math.max(40, Math.min(w * 0.32, 320) + slowPulse * 15);
    const safeCoreRy = Math.max(16, coreRadius * yRatio);

    try {
      const coreGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
      coreGradient.addColorStop(0, `rgba(37, 99, 235, ${0.16 + slowPulse * 0.04})`);
      coreGradient.addColorStop(0.5, `rgba(14, 42, 134, ${0.08 + slowPulse * 0.02})`);
      coreGradient.addColorStop(0.85, "rgba(7, 24, 82, 0.01)");
      coreGradient.addColorStop(1, "transparent");

      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.ellipse(cx, cy, coreRadius, safeCoreRy, 0, 0, Math.PI * 2);
      ctx.fill();
    } catch {
      // safe fallback
    }

    // 2. Slow, smooth, minimal concentric elliptical rings
    for (let i = 0; i < ringCount; i++) {
      // Staggered loop progress for each ring (0 to 1)
      const phaseOffset = i / ringCount;
      const progress = (elapsed / speed + phaseOffset) % 1;

      // Smooth sine ease-out expansion: gentle start, slow deceleration
      const easedProgress = Math.sin((progress * Math.PI) / 2);

      const rx = minRx + (maxRx - minRx) * easedProgress;
      const ry = Math.max(10, rx * yRatio);

      // Smooth alpha envelope: gradual fade-in, long soft plateau, slow dissolve
      let alpha = 0;
      if (progress < 0.20) {
        alpha = progress / 0.20;
      } else if (progress < 0.65) {
        alpha = 1;
      } else {
        alpha = Math.max(0, 1 - (progress - 0.65) / 0.35);
      }

      // Very subtle, minimal stroke alpha (0.11 max)
      const ringAlpha = alpha * 0.11;
      if (ringAlpha <= 0.005) continue;

      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(224, 242, 254, ${ringAlpha})`;
      ctx.lineWidth = 1.0;
      ctx.stroke();
    }

    ctx.restore();
  }, [ringCount, speed]);

  const animate = useCallback((time: number) => {
    if (!isVisibleRef.current) return;
    try {
      draw(time);
    } catch {
      // Never crash the RAF loop
    }
    animRef.current = requestAnimationFrame(animate);
  }, [draw]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !reducedMotion) {
          cancelAnimationFrame(animRef.current);
          animRef.current = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(animRef.current);
        }
      },
      { threshold: 0.02 }
    );

    observer.observe(container);

    // Initial trigger or single static frame for reduced motion
    if (reducedMotion) {
      draw(0);
    } else {
      cancelAnimationFrame(animRef.current);
      animRef.current = requestAnimationFrame(animate);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, [animate, draw, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-none"
      />
    </div>
  );
}
