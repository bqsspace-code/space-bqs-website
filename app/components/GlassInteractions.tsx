"use client";

import { useEffect } from "react";

/** One delegated, frame-limited interaction for glass surfaces on every route. */
export default function GlassInteractions() {
  useEffect(() => {
    const preference = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let active: HTMLElement | null = null;
    let frame = 0;
    let x = 0;
    let y = 0;
    let bounds: DOMRect | null = null;

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (active) {
        active.removeAttribute("data-glass-active");
        for (const name of ["--glass-rx", "--glass-ry", "--glass-x", "--glass-y"]) active.style.removeProperty(name);
      }
      active = null;
      bounds = null;
    };
    const paint = () => {
      frame = 0;
      if (!active || !bounds) return;
      const px = Math.max(0, Math.min(1, (x - bounds.left) / bounds.width));
      const py = Math.max(0, Math.min(1, (y - bounds.top) / bounds.height));
      active.style.setProperty("--glass-rx", `${(0.5 - py) * 7}deg`);
      active.style.setProperty("--glass-ry", `${(px - 0.5) * 9}deg`);
      active.style.setProperty("--glass-x", `${px * 100}%`);
      active.style.setProperty("--glass-y", `${py * 100}%`);
    };
    const move = (event: PointerEvent) => {
      if (!preference.matches || event.pointerType === "touch") return;
      const card = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-glass-depth]") : null;
      if (card !== active) {
        reset();
        if (card) {
          active = card;
          // Measure before applying tilt so the coordinate plane stays stable.
          bounds = card.getBoundingClientRect();
          card.setAttribute("data-glass-active", "true");
        }
      }
      if (!active) return;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", reset);
    document.addEventListener("pointercancel", reset);
    window.addEventListener("scroll", reset, { passive: true });
    window.addEventListener("resize", reset);
    window.addEventListener("blur", reset);
    preference.addEventListener("change", reset);
    return () => {
      reset();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", reset);
      document.removeEventListener("pointercancel", reset);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("resize", reset);
      window.removeEventListener("blur", reset);
      preference.removeEventListener("change", reset);
    };
  }, []);
  return null;
}
