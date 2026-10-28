"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
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

const blurValues = { sm: "2px", md: "3px", lg: "4px", xl: "5px" };

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
  const soft = surface === "soft";
  const style = {
    borderRadius,
    width,
    height,
    "--liquid-glass-blur": blurValues[blurIntensity],
    "--liquid-glass-shadow": glowIntensity === "none" ? "rgba(3,42,172,.08)" : "rgba(3,42,172,.2)",
  } as CSSProperties;

  return (
    <motion.div
      className={cn(
        "liquid-glass-ui relative isolate border",
        soft ? "liquid-glass-ui--subtle border-white/30" : "border-white/20",
        draggable && "cursor-grab active:cursor-grabbing",
        expandable && "cursor-pointer",
        className,
      )}
      style={style}
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
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
