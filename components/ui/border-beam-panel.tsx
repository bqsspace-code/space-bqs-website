"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Adapted from Motiq's MIT-licensed Border Beam Panel: spring-driven conic ring. */
export function BorderBeamPanel({ children, className, seed = 1, ...props }: HTMLAttributes<HTMLDivElement> & { seed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const engaged = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frame = 0;
    let last = 0;
    let angle = seed * 137.508;
    let speed = 22;
    let velocity = 0;
    const paint = () => el.style.setProperty("--beam-angle", `${angle % 360}deg`);
    const tick = (now: number) => {
      const dt = Math.min((now - (last || now)) / 1000, 0.05);
      last = now;
      velocity += (30 * ((engaged.current ? 85 : 22) - speed) - 11 * velocity) * dt;
      speed += velocity * dt;
      angle += speed * dt;
      paint();
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (preference.matches) { angle = 40; paint(); }
      else if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    paint();
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(el);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [seed]);

  return (
    <div {...props} ref={ref} className={cn("marine-beam-panel", className)}
      onPointerEnter={() => { engaged.current = true; }} onPointerLeave={() => { engaged.current = false; }}
      onFocus={() => { engaged.current = true; }} onBlur={() => { engaged.current = false; }}>
      <span aria-hidden="true" className="marine-beam-ring" />
      {children}
    </div>
  );
}
