"use client";

import { useMemo } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useReducedMotion } from "framer-motion";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion();

  const options = useMemo(
    () => ({
      lerp: 0.09,
      smoothWheel: !reducedMotion,
      wheelMultiplier: 1,
      syncTouch: false,
      infinite: false,
    }),
    [reducedMotion]
  );

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
