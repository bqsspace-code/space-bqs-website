"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface WaveDividerProps {
  className?: string;
  height?: number; // optional custom height override in px
  colors?: string[]; // array of layer colors
  alphas?: number[]; // optional custom alphas per layer
  depths?: number[]; // optional custom vertical depths per layer (0 to 1)
  kinetic?: boolean; // enable scroll-velocity and pointer interaction (default true)
  direction?: "down" | "up"; // "down" fills to bottom; "up" flips upside down and fills to top
  layers?: number; // optional number of layers to render
}

/**
 * WaveDivider
 *
 * Full-width decorative band of layered ocean waves.
 * - Supports both top entry ("down") and bottom upside-down ("up") transitions
 * - Dynamic layers rendered on HTML5 2D <canvas> (pointer-events: none)
 * - Ambient sine undulation with dual harmonic cross-swell (time * 0.00035)
 * - Scroll-reactive swelling: tracks scroll velocity and scales wave amplitude
 * - Pointer-reactive Gaussian pull toward cursor position
 * - Capped devicePixelRatio at 1.5 and 30fps drawing, pauses off-screen/in hidden tabs
 */
export default function WaveDivider({
  className = "",
  height,
  colors = ["#A5D3E8", "#1B4FD1", "#051A59"],
  alphas,
  depths,
  kinetic = true,
  direction = "down",
  layers,
}: WaveDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(false);
  const lastDrawRef = useRef(0);

  // Motion physics refs
  const scrollVelRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; active: boolean }>({ x: 0, active: false });

  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect prefers-reduced-motion accessibility setting
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Responsive canvas resize with DPR capping at 1.5
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = container.clientWidth;
    const h = container.clientHeight;

    if (w <= 0 || h <= 0) return;

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  // Main draw loop
  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    if (w <= 0 || h <= 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate time parameter (t advances slowly at time * 0.00035)
    const t = reducedMotion ? 0 : timestamp * 0.00035;

    // Scroll-reactive kinetic swell: smooth decay
    if (kinetic && !reducedMotion) {
      scrollVelRef.current *= 0.90;
    } else {
      scrollVelRef.current = 0;
    }

    const smoothedVel = Math.min(Math.abs(scrollVelRef.current), 35);
    const waveAmp = 8 + smoothedVel * 0.3;

    ctx.save();
    ctx.scale(dpr, dpr);

    if (direction === "up") {
      ctx.translate(0, h);
      ctx.scale(1, -1);
    }

    const numLayers = layers ? Math.min(layers, colors.length) : Math.min(3, colors.length);

    for (let layer = 0; layer < numLayers; layer++) {
      let defaultDepth = 0.65;
      if (numLayers === 2) {
        defaultDepth = layer === 0 ? 0.58 : 0.78;
      } else if (numLayers >= 3) {
        defaultDepth = [0.52, 0.66, 0.80][layer] ?? 0.75;
      }
      const baseY = h * (depths?.[layer] ?? defaultDepth);
      const color = colors[layer] ?? colors[colors.length - 1];
      const defaultAlpha = layer === numLayers - 1 ? 1.0 : 0.40;
      const alpha = alphas?.[layer] ?? defaultAlpha;

      ctx.beginPath();
      ctx.moveTo(0, h); // Start at bottom-left corner

      // Calculate wave across the full width
      const step = 6;
      for (let x = 0; x <= w + step; x += step) {
        const clampedX = Math.min(x, w);

        // Ambient sine wave: sin(x * 0.005 + t + layer * 0.7) * 8 + sin(x * 0.011 - t * 0.7) * 4
        let y =
          baseY +
          Math.sin(clampedX * 0.005 + t + layer * 0.7) * waveAmp +
          Math.sin(clampedX * 0.011 - t * 0.7) * 4;

        // Pointer-reactive Gaussian pull toward cursor X position: exp(-dist^2) * 18
        if (kinetic && mouseRef.current.active && !reducedMotion) {
          const distNorm = (clampedX - mouseRef.current.x) / 90;
          const pull = Math.exp(-distNorm * distNorm) * 18;
          y -= pull; // Swell toward cursor
        }

        ctx.lineTo(clampedX, y);
      }

      // Down to bottom edge and close
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fill();
    }

    ctx.restore();
  }, [alphas, colors, depths, kinetic, reducedMotion, direction, layers]);

  // Animation frame handler
  const animate = useCallback((timestamp: number) => {
    if (!isVisibleRef.current || document.hidden) return;
    try {
      // Slow decorative waves do not need a full canvas repaint at display refresh rate.
      if (timestamp - lastDrawRef.current >= 1000 / 30) {
        draw(timestamp);
        lastDrawRef.current = timestamp;
      }
    } catch {
      // guard against exceptions
    }
    animRef.current = requestAnimationFrame(animate);
  }, [draw]);

  // Window listeners for scroll velocity & pointer tracking
  useEffect(() => {
    if (!kinetic || reducedMotion) return;

    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollYRef.current);
      lastScrollYRef.current = currentY;
      if (!isVisibleRef.current) return;
      // velocity = velocity * 0.9 + delta * 0.1
      scrollVelRef.current = scrollVelRef.current * 0.9 + delta * 0.1;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isVisibleRef.current || e.pointerType === "touch") return;
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();

      // Check if pointer is vertically within reach (+/- 140px of wave)
      if (e.clientY >= rect.top - 140 && e.clientY <= rect.bottom + 140) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          active: true,
        };
      } else {
        mouseRef.current.active = false;
      }
    };

    const onPointerLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", onPointerLeave);
    document.addEventListener("mouseleave", onPointerLeave);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onPointerLeave);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [kinetic, reducedMotion]);

  // IntersectionObserver: pause RAF when off-screen, restart when visible
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
    const onVisibilityChange = () => {
      cancelAnimationFrame(animRef.current);
      if (!document.hidden && isVisibleRef.current && !reducedMotion) {
        animRef.current = requestAnimationFrame(animate);
      }
    };
    const redraw = () => draw(performance.now());
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", redraw);

    // Initial trigger or static frame
    if (reducedMotion) {
      draw(0);
    } else {
      cancelAnimationFrame(animRef.current);
      animRef.current = requestAnimationFrame(animate);
    }

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", redraw);
      cancelAnimationFrame(animRef.current);
    };
  }, [animate, draw, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden pointer-events-none ${
        height ? "" : "h-[72px] md:h-[96px]"
      } ${className}`}
      style={height ? { height: `${height}px` } : undefined}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none block"
      />
    </div>
  );
}
