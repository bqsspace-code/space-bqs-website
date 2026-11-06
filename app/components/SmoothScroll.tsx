"use client";

import { useMemo } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

interface SmoothScrollProps {
  children: React.ReactNode;
}

function LenisBridge() {
  useLenis(() => {
    // Keep GSAP ScrollTrigger in sync with Lenis smooth frames
    if (typeof window !== "undefined" && (window as any).ScrollTrigger) {
      (window as any).ScrollTrigger.update();
    }
  });

  return null;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion();

  const options = useMemo(
    () => ({
      lerp: 0.1,
      duration: 1.1,
      smoothWheel: !reducedMotion,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
      infinite: false,
      autoRaf: true,
    }),
    [reducedMotion]
  );

  return (
    <ReactLenis root options={options}>
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}
