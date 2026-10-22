"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface WaveDividerProps {
  layers?: number;
  colors?: string[];
  height?: number;
  direction?: "down" | "up";
  className?: string;
}

/**
 * Liquid Wave Divider — replaces hard section edges with a living, scroll-agitated waterline.
 * Layered 2D canvas sine waves that churn on scroll and settle when stopped.
 * Pauses off-screen. Static frame under prefers-reduced-motion.
 */
export default function WaveDivider({
  layers = 4,
  colors = ["#A5D3E8", "#4E8DEB", "#1B4FD1", "#032AAC"],
  height = 140,
  direction = "down",
  className = "",
}: WaveDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const scrollVelRef = useRef(0);
  const lastScrollRef = useRef(0);
  const isVisibleRef = useRef(false);
  const timeRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const dpr = Math.min(window.devicePixelRatio, 2);

    ctx.clearRect(0, 0, w, h);

    // Decay scroll velocity
    scrollVelRef.current *= 0.94;

    const agitation = Math.min(Math.abs(scrollVelRef.current) * 0.3, 1);
    timeRef.current += 0.008 + agitation * 0.02;

    const usedLayers = Math.min(layers, colors.length);

    for (let i = 0; i < usedLayers; i++) {
      const layerProgress = i / (usedLayers - 1 || 1);
      const amplitude = (8 + layerProgress * 16) * (1 + agitation * 1.5);
      const frequency = 0.003 + layerProgress * 0.001;
      const phase = timeRef.current * (0.6 + i * 0.15) + i * 1.2;
      const yOffset = (h / dpr) * (0.25 + layerProgress * 0.45);

      ctx.beginPath();

      if (direction === "down") {
        ctx.moveTo(0, 0);
        for (let x = 0; x <= w / dpr; x += 2) {
          const y = yOffset +
            Math.sin(x * frequency + phase) * amplitude +
            Math.sin(x * frequency * 2.3 + phase * 0.7) * amplitude * 0.3;
          ctx.lineTo(x * dpr, y * dpr);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
      } else {
        ctx.moveTo(0, h);
        for (let x = 0; x <= w / dpr; x += 2) {
          const y = (h / dpr) - yOffset +
            Math.sin(x * frequency + phase) * amplitude +
            Math.sin(x * frequency * 2.3 + phase * 0.7) * amplitude * 0.3;
          ctx.lineTo(x * dpr, ((h / dpr) - y + (h / dpr)) * dpr);
        }
        ctx.lineTo(w, 0);
        ctx.lineTo(0, 0);
      }

      ctx.closePath();
      ctx.fillStyle = colors[i] || colors[colors.length - 1];
      ctx.globalAlpha = 0.35 + layerProgress * 0.45;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }, [layers, colors, height, direction]);

  const animate = useCallback(() => {
    if (!isVisibleRef.current) return;
    draw();
    animRef.current = requestAnimationFrame(animate);
  }, [draw]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      draw();
    };

    resize();
    window.addEventListener("resize", resize);

    // Scroll velocity tracking
    const onScroll = () => {
      const current = window.scrollY;
      scrollVelRef.current = current - lastScrollRef.current;
      lastScrollRef.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Intersection observer — pause off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !reducedMotion) {
          animRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Static frame for reduced-motion
    if (reducedMotion) {
      draw();
    } else {
      animRef.current = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [draw, animate, reducedMotion]);

  return (
    <div
      className={`relative w-full pointer-events-none ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}
