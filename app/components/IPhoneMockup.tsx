"use client";

import React from "react";

export interface IPhoneMockupProps {
  children: React.ReactNode;
  /** Scale factor (relative to 310x640 base size). Default 1.0 */
  scale?: number;
  className?: string;
  /** Contextual state displayed inside or around the Dynamic Island */
  islandState?: "scan" | "offline" | "calc" | "sealed" | "idle";
  /** Optional custom content inside the Dynamic Island */
  islandContent?: React.ReactNode;
  /** Force light or dark status bar */
  statusBarTheme?: "dark" | "light";
}

export default function IPhoneMockup({
  children,
  scale = 1,
  className = "",
  islandState = "idle",
  islandContent,
  statusBarTheme = "dark",
}: IPhoneMockupProps) {
  // Base dimensions matching the sleek Bevel iPhone from DeckInteractiveShowcase
  const baseW = 310;
  const baseH = 640;

  return (
    <div
      className={`relative select-none ${className}`}
      style={{
        width: baseW * scale,
        height: baseH * scale,
      }}
    >
      <div
        className="relative origin-top-left"
        style={{
          width: baseW,
          height: baseH,
          transform: `scale(${scale})`,
        }}
      >
        {/* Phone Outer Chassis (Steel Ring & Deep Drop Shadow) */}
        <div
          className="relative w-full h-full rounded-[52px] bg-[#101319]"
          style={{
            boxShadow:
              "0 0 0 2px #3c4048, 0 0 0 3.5px #181b22, 0 35px 70px -15px rgba(3, 16, 56, 0.35), 0 10px 25px -5px rgba(3, 16, 56, 0.2)",
          }}
        >
          {/* Physical Action Buttons (Left) */}
          <div className="absolute -left-[3px] top-[108px] w-[3px] h-[30px] rounded-l-sm bg-[#3c4048]" />
          <div className="absolute -left-[3px] top-[156px] w-[3px] h-[48px] rounded-l-sm bg-[#3c4048]" />
          <div className="absolute -left-[3px] top-[216px] w-[3px] h-[48px] rounded-l-sm bg-[#3c4048]" />
          {/* Power Button (Right) */}
          <div className="absolute -right-[3px] top-[180px] w-[3px] h-[72px] rounded-r-sm bg-[#3c4048]" />

          {/* Screen Viewport Wrapper */}
          <div className="scr absolute inset-[8px] rounded-[44px] overflow-hidden bg-black">
            {/* Dynamic Island (Fixed Over Screen) */}
            <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-[86px] h-[24px] bg-black rounded-full z-40 flex items-center justify-between px-2.5 shadow-xs pointer-events-none">
              {islandContent ? (
                islandContent
              ) : (
                <>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0a0d14] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#15233e]/80" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#0c1424] border border-[#1e293b]" />
                </>
              )}
            </div>

            {/* Screen Content */}
            <div className="w-full h-full overflow-hidden flex flex-col pt-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
