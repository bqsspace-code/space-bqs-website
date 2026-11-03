"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  as?: "main" | "div" | "section";
  paused?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  as: Component = "div",
  paused = false,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <Component
      className={cn(
        "relative flex flex-col h-[100vh] items-center justify-center bg-white dark:bg-zinc-950 text-slate-950 transition-colors overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Transform-only aurora; pause its large layers when the hero is offscreen. */}
      <div
        className="aurora-layers absolute inset-0 overflow-hidden pointer-events-none select-none"
        data-paused={paused}
        style={{
          contain: "strict",
          isolation: "isolate",
        }}
      >
        {/* Crisp Pure White Base */}
        <div className="absolute inset-0 bg-[#FFFFFF]" />

        {/* Aurora Orb 1: Luminous Lagoon / Cyan Flow (Top Left) */}
        <div
          className="absolute -top-[15%] -left-[10%] w-[75vw] h-[65vh] rounded-full will-change-transform opacity-70 animate-[aurora-float-1_24s_ease-in-out_infinite_alternate]"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(25, 181, 201, 0.35) 0%, rgba(165, 211, 232, 0.22) 40%, rgba(255, 255, 255, 0) 75%)",
            transform: "translateZ(0)",
          }}
        />

        {/* Aurora Orb 2: Ocean Azure / Cobalt Bloom (Top Right) */}
        <div
          className="absolute -top-[20%] -right-[15%] w-[80vw] h-[70vh] rounded-full will-change-transform opacity-60 animate-[aurora-float-2_28s_ease-in-out_infinite_alternate]"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59, 130, 246, 0.30) 0%, rgba(27, 79, 209, 0.16) 40%, rgba(165, 180, 252, 0.12) 60%, rgba(255, 255, 255, 0) 78%)",
            transform: "translateZ(0)",
          }}
        />

        {/* Aurora Orb 3: Soft Ethereal Seafoam / White Crest (Center) */}
        <div
          className="absolute top-[5%] left-[15%] w-[70vw] h-[50vh] rounded-full will-change-transform opacity-50 animate-[aurora-float-3_20s_ease-in-out_infinite_alternate]"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(165, 211, 232, 0.45) 0%, rgba(96, 165, 250, 0.25) 35%, rgba(25, 181, 201, 0.15) 55%, rgba(255, 255, 255, 0) 75%)",
            transform: "translateZ(0)",
          }}
        />

        {/* Dynamic Sweeping Aurora Ribbon Wave */}
        <div
          className="absolute -top-[10%] left-[-20%] w-[140%] h-[60%] opacity-40 will-change-transform animate-[aurora-drift_32s_linear_infinite]"
          style={{
            background: `
              linear-gradient(
                110deg,
                transparent 0%,
                rgba(255, 255, 255, 0.9) 15%,
                rgba(25, 181, 201, 0.35) 28%,
                rgba(59, 130, 246, 0.28) 42%,
                rgba(165, 211, 232, 0.38) 56%,
                rgba(255, 255, 255, 0.9) 70%,
                transparent 85%
              )
            `,
            transform: "translateZ(0)",
          }}
        />

        {/* Center Spotlight & Bottom Fade into the Wave Divider */}
        {showRadialGradient && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 75% 60% at 50% 36%, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.70) 50%, rgba(255, 255, 255, 0.1) 85%),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, transparent 45%, rgba(255, 255, 255, 0.9) 88%, #ffffff 100%)
              `,
            }}
          />
        )}
      </div>

      {children}
    </Component>
  );
};
