"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/** Progressive enhancement: content is visible during SSR and without JavaScript. */
export default function ScrollReveal({ children, className = "", stagger = false, as = "div" }: { children: ReactNode; className?: string; stagger?: boolean; as?: "div" | "ol" | "ul" | "dl" | "section" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let animations: Animation[] = [];
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (!preference.matches) animations = (stagger ? [...el.children] : [el]).map((target, index) => target.animate([
        { opacity: 0.25, transform: "translateY(28px)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 750, delay: index * 90, fill: "backwards", easing: "cubic-bezier(.16,1,.3,1)" }));
      observer.disconnect();
    }, { threshold: 0.08 });
    const stop = () => { if (preference.matches) animations.forEach(animation => animation.finish()); };
    preference.addEventListener("change", stop);
    observer.observe(el);
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); preference.removeEventListener("change", stop); };
  }, [stagger]);
  const Tag = as as ElementType;
  return <Tag ref={ref} className={className}>{children}</Tag>;
}
