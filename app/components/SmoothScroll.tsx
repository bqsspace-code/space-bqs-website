"use client";

import { useMemo } from "react";
import { ReactLenis } from "lenis/react";


interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const options = useMemo(
    () => ({
      // Native wheel scrolling stays compositor-driven even when JS is busy.
      // Keep the provider for existing navigation/scroll integrations.
      smoothWheel: false,
      autoRaf: false,
      wheelMultiplier: 1,
      syncTouch: false,
      infinite: false,
    }),
    []
  );

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
