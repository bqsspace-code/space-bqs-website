"use client";

import { useEffect, useRef, type CSSProperties } from "react";

import { attachWavePointer } from "./wave-pointer";

const PROFILES = {
  ripple: { height: 44, duration: 17, path: "M-80 62 C180 34 350 84 610 59 S1060 38 1520 64" },
  swell: { height: 88, duration: 23, path: "M-80 48 C190 116 390 104 650 57 S1150 6 1520 58" },
  sweep: { height: 72, duration: 21, path: "M-80 25 C250 7 370 24 680 66 S1180 108 1520 62" },
  crest: { height: 64, duration: 19, path: "M-80 76 C140 92 270 20 490 38 S790 104 1020 63 S1340 28 1520 52" },
  deep: { height: 104, duration: 27, path: "M-80 26 C190 8 320 106 650 74 S1090 8 1520 57" },
} as const;

/** Compositor-driven ambient flow, with localized path deformation only near a pointer. */
export default function WaveTransition({
  variant = "swell",
  to = "var(--pearl-page, #f0f6fc)",
  accent = "#a5d3e8",
  flip = false,
  overlay = true,
}: {
  variant?: keyof typeof PROFILES;
  to?: string;
  accent?: string;
  flip?: boolean;
  overlay?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const profile = PROFILES[variant];

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let visible = false;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    let detachPointer: (() => void) | undefined;
    const sync = () => {
      const running = visible && !document.hidden && !preference.matches;
      element.dataset.running = String(running);
      if (running && finePointer.matches) {
        detachPointer ??= attachWavePointer(element, profile.path, flip);
      } else {
        detachPointer?.();
        detachPointer = undefined;
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", sync);
    finePointer.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      preference.removeEventListener("change", sync);
      finePointer.removeEventListener("change", sync);
      detachPointer?.();
    };
  }, [profile.path, flip]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-variant={variant}
      data-running="false"
      data-flip={flip}
      className={`wave-transition${overlay ? " wave-transition--overlap" : ""}`}
      style={{
        "--wave-height": `${profile.height}px`,
        "--wave-duration": `${profile.duration * .55}s`,
        "--wave-to": to,
        "--wave-accent": accent,
      } as CSSProperties}
    >
      <div className="wave-transition-shape">
        {["far", "near", "shore"].map((layer, index) => (
          <svg key={layer} className={`wave-transition-layer wave-transition-layer--${layer}`} viewBox="0 0 1440 120" preserveAspectRatio="none" focusable="false">
            <g transform={`translate(0, ${index === 0 ? -18 : index === 1 ? -9 : 0})`}>
              <path d={`${profile.path} L1520 160 L-80 160 Z`} />
              {index === 2 && <path className="wave-transition-foam" d={profile.path} vectorEffect="non-scaling-stroke" />}
            </g>
          </svg>
        ))}
      </div>
    </div>
  );
}
