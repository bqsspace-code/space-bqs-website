"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface FlowingWaveRibbonProps {
  className?: string;
  height?: number;
}

/**
 * FlowingWaveRibbon
 * 
 * High-performance 2D canvas that renders continuous, multi-layered
 * undulating ocean wave ribbons (Azure, Royal Blue, Deep Navy).
 * Silky smooth 60fps, responsive, DPR-scaled, pauses off-screen.
 */
export default function FlowingWaveRibbon({
  className = "",
  height = 96,
}: FlowingWaveRibbonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(false);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0.5,
    y: 0.5,
    active: false,
  });

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
    const h = height;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
  }, [height]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (reducedMotion) {
      timeRef.current = 1.5;
    } else {
      timeRef.current += 0.012;
    }

    const t = timeRef.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const mouseActive = mouseRef.current.active;

    // We define 3 distinct wave layers from back to front:
    // 1. Deep Navy base (fills down to canvas bottom)
    // 2. Mid Royal Blue ribbon
    // 3. Top Azure / Cerulean ribbon with glowing crest

    // --- Layer 1: Deep Navy Foundation (fills to bottom) ---
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.beginPath();
    ctx.moveTo(0, h);

    for (let x = 0; x <= w; x += 3) {
      const nx = x / w;
      // Primary wave + secondary harmonic
      let y = h * 0.42 + Math.sin(nx * Math.PI * 2.2 + t * 0.8) * 16 + Math.sin(nx * Math.PI * 4.4 - t * 0.5) * 6;

      if (mouseActive) {
        const d = Math.abs(nx - mx);
        if (d < 0.25) {
          y -= (1 - d / 0.25) * 12;
        }
      }

      ctx.lineTo(x, y);
    }

    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = "#071E62";
    ctx.fill();

    // --- Layer 2: Mid Royal Blue Ribbon ---
    ctx.beginPath();
    ctx.moveTo(0, h);

    for (let x = 0; x <= w; x += 3) {
      const nx = x / w;
      let y = h * 0.30 + Math.sin(nx * Math.PI * 2.0 + t * 1.1 + 0.6) * 18 + Math.sin(nx * Math.PI * 3.8 - t * 0.7) * 7;

      if (mouseActive) {
        const d = Math.abs(nx - mx);
        if (d < 0.25) {
          y -= (1 - d / 0.25) * 14;
        }
      }

      ctx.lineTo(x, y);
    }

    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = "rgba(29, 78, 216, 0.90)"; // #1D4ED8
    ctx.fill();

    // --- Layer 3: Top Vibrant Azure Ribbon ---
    ctx.beginPath();
    ctx.moveTo(0, h);

    const topPoints: { x: number; y: number }[] = [];

    for (let x = 0; x <= w; x += 3) {
      const nx = x / w;
      let y = h * 0.18 + Math.sin(nx * Math.PI * 1.8 + t * 1.3 + 1.2) * 16 + Math.sin(nx * Math.PI * 3.4 - t * 0.9) * 8;

      if (mouseActive) {
        const d = Math.abs(nx - mx);
        if (d < 0.25) {
          y -= (1 - d / 0.25) * 16;
        }
      }

      topPoints.push({ x, y });
      ctx.lineTo(x, y);
    }

    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = "rgba(59, 130, 246, 0.95)"; // #3B82F6
    ctx.fill();

    // Subtle crest highlight along the top edge of Layer 3
    if (topPoints.length > 1) {
      ctx.beginPath();
      ctx.moveTo(topPoints[0].x, topPoints[0].y);
      for (let i = 1; i < topPoints.length; i++) {
        ctx.lineTo(topPoints[i].x, topPoints[i].y);
      }
      ctx.strokeStyle = "rgba(224, 242, 254, 0.75)";
      ctx.lineWidth = 1.8;
      ctx.stroke();
    }

    ctx.restore();
  }, [height, reducedMotion]);

  const animate = useCallback(() => {
    if (!isVisibleRef.current) return;
    try {
      draw();
    } catch {
      // never crash the RAF loop
    }
    animRef.current = requestAnimationFrame(animate);
  }, [draw]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          cancelAnimationFrame(animRef.current);
          animRef.current = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(animRef.current);
        }
      },
      { threshold: 0.02 }
    );

    observer.observe(container);

    // Initial trigger
    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, [animate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full overflow-hidden leading-none select-none pointer-events-auto ${className}`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
}
