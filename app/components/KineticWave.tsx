"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface KineticWaveProps {
  mode?: "toward" | "ripple-away";
  colors?: string[];
  height?: number;
  className?: string;
}

/**
 * Kinetic Wave Pro — pointer-interactive water surface. Max 2 per page.
 * Waves roll toward or ripple away from the cursor. Touch-drag on phones.
 * 2D canvas, pauses off-screen, static frame under prefers-reduced-motion.
 */
export default function KineticWave({
  mode = "toward",
  colors = ["#A5D3E8", "#1B4FD1", "#032AAC"],
  height = 160,
  className = "",
}: KineticWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const isVisibleRef = useRef(false);
  const timeRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timeRef.current += 0.006;

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const active = mouseRef.current.active;

    for (let i = 0; i < colors.length; i++) {
      const layerProgress = i / (colors.length - 1 || 1);
      const baseY = h * (0.3 + layerProgress * 0.4);
      const amplitude = 10 + layerProgress * 14;
      const frequency = 0.004 + layerProgress * 0.001;
      const speed = 0.5 + i * 0.12;

      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= w; x += 2) {
        const normalX = x / w;
        let y = baseY;

        // Base wave
        y += Math.sin(x * frequency + timeRef.current * speed) * amplitude;
        y += Math.sin(x * frequency * 2.1 + timeRef.current * speed * 0.7) * amplitude * 0.25;

        // Pointer influence
        if (active) {
          const dist = Math.sqrt(
            Math.pow(normalX - mx, 2) + Math.pow(0.5 - my, 2)
          );
          const reach = 0.35;
          const influence = Math.max(0, 1 - dist / reach);
          const pull = influence * influence * 28;

          if (mode === "toward") {
            y -= pull; // Swell toward pointer
          } else {
            y += pull; // Ripple away
          }
        }

        ctx.lineTo(x * dpr, y * dpr);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      ctx.fillStyle = colors[i];
      ctx.globalAlpha = 0.4 + layerProgress * 0.4;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }, [colors, mode]);

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
    };

    resize();
    window.addEventListener("resize", resize);

    // Pointer tracking
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
    };

    const onPointerLeave = () => {
      mouseRef.current.active = false;
    };

    // Touch support
    const onTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (!touch) return;
      mouseRef.current = {
        x: (touch.clientX - rect.left) / rect.width,
        y: (touch.clientY - rect.top) / rect.height,
        active: true,
      };
    };

    const onTouchEnd = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);

    // Intersection observer
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

    if (reducedMotion) {
      draw();
    } else {
      animRef.current = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      observer.disconnect();
    };
  }, [draw, animate, reducedMotion]);

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ height }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block", touchAction: "pan-y" }}
        aria-hidden="true"
      />
    </div>
  );
}
