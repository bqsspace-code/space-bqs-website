"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface Ripple {
  x: number;
  y: number;
  startTime: number;
  maxRadius: number;
}

interface RippleFieldProps {
  color1?: string;
  color2?: string;
  opacity?: number;
  ringCount?: number;
  maxRadius?: number;
  ringWidth?: number;
  duration?: number;
  dropFrequency?: number;
  shape?: "circle" | "rectangle";
  className?: string;
}

/**
 * Water Impact — ambient expanding ring ripples at random positions.
 * Calm, harbour-still feel. Circle or rectangle rings.
 * Pauses off-screen. Static under prefers-reduced-motion.
 */
export default function RippleField({
  color1 = "#19B5C9",
  color2 = "#032AAC",
  opacity = 0.18,
  ringCount = 3,
  maxRadius = 360,
  ringWidth = 1.5,
  duration = 3200,
  dropFrequency = 2200,
  shape = "circle",
  className = "",
}: RippleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const ripplesRef = useRef<Ripple[]>([]);
  const lastDropRef = useRef(0);
  const isVisibleRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : { r: 0, g: 0, b: 0 };
  };

  const draw = useCallback(
    (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new ripple
      if (now - lastDropRef.current > dropFrequency) {
        ripplesRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          startTime: now,
          maxRadius: maxRadius * (0.6 + Math.random() * 0.4),
        });
        lastDropRef.current = now;
      }

      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);

      // Draw ripples
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        const elapsed = now - ripple.startTime;
        if (elapsed > duration) return false;

        const progress = elapsed / duration;
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

        for (let ring = 0; ring < ringCount; ring++) {
          const ringProgress = eased - ring * 0.12;
          if (ringProgress < 0 || ringProgress > 1) continue;

          const radius = ringProgress * ripple.maxRadius;
          const fadeIn = Math.min(ringProgress * 4, 1);
          const fadeOut = 1 - Math.pow(ringProgress, 2);
          const alpha = fadeIn * fadeOut * opacity;

          // Interpolate color
          const t = ring / (ringCount - 1 || 1);
          const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * t);
          const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * t);
          const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * t);

          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.lineWidth = ringWidth * dpr;

          ctx.beginPath();

          if (shape === "circle") {
            ctx.arc(ripple.x * dpr, ripple.y * dpr, radius * dpr, 0, Math.PI * 2);
          } else {
            // Rectangle rings
            const half = radius * dpr;
            const rx = ripple.x * dpr;
            const ry = ripple.y * dpr;
            const cornerRadius = 8 * dpr;
            ctx.roundRect(rx - half, ry - half * 0.7, half * 2, half * 1.4, cornerRadius);
          }

          ctx.stroke();
        }

        return true;
      });
    },
    [color1, color2, opacity, ringCount, maxRadius, ringWidth, duration, dropFrequency, shape]
  );

  const animate = useCallback(
    (now: number) => {
      if (!isVisibleRef.current) return;
      draw(now);
      animRef.current = requestAnimationFrame(animate);
    },
    [draw]
  );

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
    };

    resize();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !reducedMotion) {
          animRef.current = requestAnimationFrame(animate);
        } else {
          ripplesRef.current = [];
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    if (!reducedMotion) {
      animRef.current = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [animate, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
}
