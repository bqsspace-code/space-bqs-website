"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

/** Counts up to a number the first time it scrolls into view. SSR renders the final value. */
export function CountUp({ to, suffix = "", duration = 1200 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      setValue(0);
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [to, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}

/** Delegated pointer tracking: feeds --mx/--my to any .glass-card under it for a light-catching sheen. */
export function GlowScope({ children, className = "" }: { children: ReactNode; className?: string }) {
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const card = (event.target as HTMLElement).closest<HTMLElement>(".glass-card, .glass-card-dark");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };
  return <div onPointerMove={onMove} className={className}>{children}</div>;
}

/** Renders children only once the placeholder nears the viewport. Use for video, showcases and other heavy blocks. */
export function LazyMount({ children, minHeight = 480, margin = "320px", className = "" }: { children: ReactNode; minHeight?: number; margin?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || ready) return;
    if (!("IntersectionObserver" in window)) { setReady(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); observer.disconnect(); }
    }, { rootMargin: margin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin, ready]);

  return (
    <div ref={ref} className={className} style={ready ? undefined : { minHeight }}>
      {ready ? children : (
        <div aria-hidden="true" className="mx-auto h-full w-full max-w-7xl animate-pulse px-5 sm:px-8 lg:px-10" style={{ minHeight }}>
          <div className="h-full min-h-[inherit] rounded-[1.8rem] bg-[#dbe9f2]/60" />
        </div>
      )}
    </div>
  );
}
