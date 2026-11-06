"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useLenis } from "lenis/react";

/** One scroll callback per frame, active when section is near or in the viewport. */
export function useViewportScroll(ref: RefObject<HTMLElement | null>, update: () => void) {
  const updateRef = useRef(update);
  updateRef.current = update;
  const isNearRef = useRef(false);

  // Direct Lenis listener for smooth subpixel updates
  useLenis(() => {
    if (isNearRef.current) {
      updateRef.current();
    }
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;

    const schedule = () => {
      if (!isNearRef.current || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        updateRef.current();
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearRef.current = entry.isIntersecting;
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        if (isNearRef.current) {
          window.addEventListener("scroll", schedule, { passive: true });
          window.addEventListener("resize", schedule);
          schedule();
        } else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "350px 0px" }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);
}
