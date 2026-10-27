"use client";

import { useId, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Intensity = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface LiquidGlassCardProps {
  children: ReactNode;
  className?: string;
  draggable?: boolean;
  expandable?: boolean;
  width?: string;
  height?: string;
  expandedWidth?: string;
  expandedHeight?: string;
  blurIntensity?: "sm" | "md" | "lg" | "xl";
  shadowIntensity?: Intensity;
  borderRadius?: string;
  glowIntensity?: Intensity;
  surface?: "frosted" | "soft";
}

const blurClasses = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
};
const strengths = { none: 0, xs: 1, sm: 2, md: 3, lg: 4, xl: 6 };

/** Layered glass with optional elastic drag and keyboard-accessible expansion. */
export function LiquidGlassCard({
  children,
  className,
  draggable = true,
  expandable = false,
  width,
  height,
  expandedWidth,
  expandedHeight,
  blurIntensity = "xl",
  shadowIntensity = "md",
  borderRadius = "32px",
  glowIntensity = "sm",
  surface = "frosted",
}: LiquidGlassCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  const filterId = `glass-${useId().replace(/:/g, "")}`;
  const edge = strengths[shadowIntensity];
  const glow = strengths[glowIntensity];
  const soft = surface === "soft";

  return (
    <motion.div
      className={cn(
        "relative isolate border",
        soft ? "border-white/30 bg-white/[0.06]" : "border-white/20 bg-white/[0.07]",
        draggable && "cursor-grab active:cursor-grabbing",
        expandable && "cursor-pointer",
        className,
      )}
      style={{ borderRadius, width, height }}
      animate={expandable ? {
        width: isExpanded ? expandedWidth || "auto" : width || "auto",
        height: isExpanded ? expandedHeight || "auto" : height || "auto",
      } : undefined}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      drag={draggable && !reduceMotion}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.15}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      whileDrag={reduceMotion ? undefined : { scale: 1.015 }}
      role={expandable ? "button" : undefined}
      tabIndex={expandable ? 0 : undefined}
      aria-expanded={expandable ? isExpanded : undefined}
      onClick={expandable ? (event) => {
        if (event.target instanceof Element && event.target.closest("a, button, input, select, textarea")) return;
        setIsExpanded((value) => !value);
      } : undefined}
      onKeyDown={expandable ? (event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setIsExpanded((value) => !value);
        }
      } : undefined}
    >
      <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
        <defs>
          <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.003 0.007" numOctaves="1" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10", blurClasses[blurIntensity])} style={{ borderRadius }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{
        borderRadius,
        background: soft
          ? "linear-gradient(145deg, rgba(255,255,255,.07), rgba(255,255,255,.015))"
          : "linear-gradient(135deg, rgba(255,255,255,.15), rgba(255,255,255,.015) 45%, rgba(125,211,252,.065))",
        filter: reduceMotion || soft ? undefined : `url(#${filterId})`,
        boxShadow: soft ? "0 8px 24px -12px rgba(0,12,50,.22)" : `0 24px 64px -24px rgba(0,8,40,.65), 0 0 ${12 + glow * 8}px rgba(125,211,252,${glow * 0.025})`,
      }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{
        borderRadius,
        boxShadow: soft
          ? "inset 0 1px 0 rgba(255,255,255,.12)"
          : `inset 0 ${edge ? 1 : 0}px 0 rgba(255,255,255,${edge * 0.1}), inset 0 -1px 0 rgba(125,211,252,.1)`,
      }} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
