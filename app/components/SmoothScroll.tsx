"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useReducedMotion } from "framer-motion";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion();
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        smoothWheel: !reducedMotion,
        wheelMultiplier: 1,
        syncTouch: false,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
