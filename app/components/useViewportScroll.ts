"use client";

import { useEffect, type RefObject } from "react";

/** One native scroll callback per frame, subscribed only near the visible section. */
export function useViewportScroll(ref: RefObject<HTMLElement | null>, update: () => void) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    let visible = false;
    const schedule = () => {
      if (!visible || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (visible) {
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        schedule();
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }, { rootMargin: "100px" });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, update]);
}
