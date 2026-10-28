"use client";

import { useId, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassStyle = CSSProperties & {
  "--glass-x"?: string;
  "--glass-y"?: string;
  "--glass-sheen-x"?: string;
};

export function LiquidGlassNav({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const filterId = `nav-glass-${useId().replace(/:/g, "")}`;

  function followLight(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
    event.currentTarget.style.setProperty("--glass-x", `${x}%`);
    event.currentTarget.style.setProperty("--glass-y", `${y}%`);
    event.currentTarget.style.setProperty("--glass-sheen-x", `${(x - 50) * 0.42}%`);
  }

  const style: GlassStyle = {
    "--glass-x": "72%",
    "--glass-y": "20%",
    "--glass-sheen-x": "0%",
  };

  return (
    <div
      className={cn("liquid-nav", className)}
      style={style}
      onPointerEnter={followLight}
      onPointerMove={followLight}
    >
      <svg aria-hidden="true" focusable="false" className="liquid-nav-filter">
        <defs>
          <filter id={filterId} x="-8%" y="-30%" width="116%" height="160%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.04" numOctaves="1" seed="8" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" result="bent" />
            <feMorphology in="SourceAlpha" operator="erode" radius="8" result="inner" />
            <feComposite in="SourceAlpha" in2="inner" operator="out" result="edge" />
            <feComposite in="bent" in2="edge" operator="in" result="bentEdge" />
            <feComposite in="SourceGraphic" in2="inner" operator="in" result="clearCenter" />
            <feMerge><feMergeNode in="clearCenter" /><feMergeNode in="bentEdge" /></feMerge>
          </filter>
        </defs>
      </svg>

      <span
        aria-hidden="true"
        className="liquid-nav-surface"
        style={{ backdropFilter: `url(#${filterId}) blur(2.5px) saturate(1.12)` }}
      />
      <span aria-hidden="true" className="liquid-nav-tint" />
      <span aria-hidden="true" className="liquid-nav-shoulder" />
      <span aria-hidden="true" className="liquid-nav-reflection" />
      <span aria-hidden="true" className="liquid-nav-pointer-light" />
      <span aria-hidden="true" className="liquid-nav-rim" />
      <span aria-hidden="true" className="liquid-nav-caustic" />
      <span aria-hidden="true" className="liquid-nav-bottom" />
      <div className="liquid-nav-content">{children}</div>
    </div>
  );
}
