"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  QrCode,
  WifiOff,
  Lock,
  ChevronRight,
  Ship,
  ArrowRight,
  FileCheck2,
  Sun,
  Moon,
  Fuel,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { AppStoreBadges } from "./HomeEnhancements";

interface StageCardData {
  id: string;
  stepNumber: string;
  eyebrow: string;
  heading: string;
  sentence: string;
  tag: string;
  accentColor: string;
  lightBg: string;
  darkBg: string;
  lightBorder: string;
  darkBorder: string;
}

const STAGES: StageCardData[] = [
  {
    id: "scan",
    stepNumber: "01",
    eyebrow: "01 / VESSEL IDENTIFICATION",
    heading: "Scan and verify at the manifold.",
    sentence: "Strapping tables, trim tables, and vessel capacity load into memory in under two seconds.",
    tag: "Manifold QR Check",
    accentColor: "#19B5C9",
    lightBg: "linear-gradient(180deg, #F0F6FB 0%, #E3EEF8 100%)",
    darkBg: "linear-gradient(180deg, #0A1733 0%, #031024 100%)",
    lightBorder: "#D2E4F2",
    darkBorder: "rgba(25, 181, 201, 0.35)",
  },
  {
    id: "capture",
    stepNumber: "02",
    eyebrow: "02 / 100% OFFLINE CAPTURE",
    heading: "Capture on deck. Zero cellular signal.",
    sentence: "Deep inside double hulls, sounding dips, water cuts, and temperatures autosave with a 72-hour cryptographic lease.",
    tag: "Autonomous 72h Lease",
    accentColor: "#F59E0B",
    lightBg: "linear-gradient(180deg, #F4F1FA 0%, #E7E3F5 100%)",
    darkBg: "linear-gradient(180deg, #13122E 0%, #080A1F 100%)",
    lightBorder: "#DFDAF2",
    darkBorder: "rgba(245, 158, 11, 0.35)",
  },
  {
    id: "calculate",
    stepNumber: "03",
    eyebrow: "03 / REAL-TIME ASTM MATRIX",
    heading: "ASTM Table 54B in real time.",
    sentence: "Observed volume instantly converts to Gross Standard Volume and certified mass in air as you sound.",
    tag: "ASTM D1250 Matrix",
    accentColor: "#4E8DEB",
    lightBg: "linear-gradient(180deg, #F0F9F6 0%, #DFEFE9 100%)",
    darkBg: "linear-gradient(180deg, #0A2224 0%, #031417 100%)",
    lightBorder: "#D2E7DF",
    darkBorder: "rgba(78, 141, 235, 0.35)",
  },
  {
    id: "certify",
    stepNumber: "04",
    eyebrow: "04 / IMMUTABLE FINALITY",
    heading: "Dual-signed proof before leaving the gangway.",
    sentence: "Chief Engineer and surveyor seal the audit dossier with SHA-256 finality before lines are cast off.",
    tag: "SHA-256 Sealed",
    accentColor: "#10B981",
    lightBg: "linear-gradient(180deg, #FAF2F2 0%, #F5E3E3 100%)",
    darkBg: "linear-gradient(180deg, #22121B 0%, #11080D 100%)",
    lightBorder: "#EBD6D6",
    darkBorder: "rgba(16, 185, 129, 0.35)",
  },
];

interface DeckInteractiveShowcaseProps {
  initialTheme?: "dark" | "light";
}

export default function DeckInteractiveShowcase({
  initialTheme = "dark",
}: DeckInteractiveShowcaseProps) {
  const [theme, setTheme] = useState<"dark" | "light">(initialTheme);
  const isDark = theme === "dark";

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const screenWrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const screenRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const floatingCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Cached geometry — recomputed ONLY on mount and resize
  const cardTops = useRef<number[]>([]);
  const cardHeights = useRef<number[]>([]);
  const lastY = useRef<number[]>([0, 640, 640, 640]);
  const activeCardIdx = useRef<number>(0);
  const scaleRef = useRef<number>(1);

  // Recalculate cached geometry
  const measure = () => {
    if (!containerRef.current || !phoneRef.current) return;
    const scrollY = window.scrollY;

    cardTops.current = cardRefs.current.map((card) => {
      if (!card) return 0;
      const rect = card.getBoundingClientRect();
      return rect.top + scrollY;
    });

    cardHeights.current = cardRefs.current.map((card) => {
      return card ? card.offsetHeight : window.innerHeight;
    });

    const vh = window.innerHeight;
    const vw = window.innerWidth;

    // Mobile vs Desktop scale
    let s = 1;
    if (vw < 860) {
      s = Math.min(0.82, Math.max(0.68, (vw - 40) / 360));
    } else {
      s = Math.min(1, Math.max(0.72, (vh - 60) / 640));
    }
    scaleRef.current = s;

    if (stageRef.current) {
      stageRef.current.style.setProperty("--s", s.toFixed(4));
    }
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure, { passive: true });

    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!screenWrapperRef.current) return;

        const screenRect = screenWrapperRef.current.getBoundingClientRect();
        const screenHeight = 640;
        const scale = scaleRef.current || 1;
        const vh = window.innerHeight;
        const scrollY = window.scrollY;

        // 1. Boundary-aligned screen wipe for screens i > 0
        for (let i = 1; i < STAGES.length; i++) {
          const cardTop = cardTops.current[i] || 0;
          const cardViewportTop = cardTop - scrollY;

          // Compute wipe cut-point Y on phone screen
          const rawY = (cardViewportTop - screenRect.top) / scale;
          const clampedY = Math.min(screenHeight, Math.max(0, rawY));
          const roundedY = Math.round(clampedY * 2) / 2; // round to 0.5px

          if (Math.abs(roundedY - (lastY.current[i] || 0)) >= 0.5) {
            lastY.current[i] = roundedY;
            const scrEl = screenRefs.current[i];
            if (scrEl) {
              scrEl.style.clipPath = `inset(${roundedY}px 0 0 0)`;
            }
          }
        }

        // 2. Secondary motion: in-phone parallax translation
        for (let i = 0; i < STAGES.length; i++) {
          const cardTop = cardTops.current[i] || 0;
          const cardHeight = cardHeights.current[i] || vh;
          const cardCenter = cardTop + cardHeight * 0.5 - scrollY;
          const d = Math.min(1, Math.max(-1, (cardCenter - vh * 0.5) / (vh * 0.7)));

          const innerEl = innerRefs.current[i];
          if (innerEl) {
            innerEl.style.setProperty("--d", d.toFixed(3));
          }
        }

        // 3. Determine active card (the last card whose top is at or above phone center)
        const phoneCenterY = screenRect.top + (screenRect.height * 0.5);
        let currentActive = 0;
        for (let i = 0; i < STAGES.length; i++) {
          const cardViewportTop = (cardTops.current[i] || 0) - scrollY;
          if (cardViewportTop <= phoneCenterY + 40) {
            currentActive = i;
          }
        }

        if (currentActive !== activeCardIdx.current) {
          activeCardIdx.current = currentActive;
          // Toggle .on on floating cards without React state re-render
          floatingCardRefs.current.forEach((cardEl, idx) => {
            if (!cardEl) return;
            if (idx === currentActive) {
              cardEl.classList.add("on");
            } else {
              cardEl.classList.remove("on");
            }
          });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial paint
    onScroll();

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="deck-showcase"
      className={`relative transition-colors duration-500 py-16 sm:py-24 ${
        isDark ? "bg-[#030B1E] text-white" : "bg-[#F7FAFD] text-[#031038]"
      }`}
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          {/* Light / Dark Mode Switcher */}
          <div className="flex items-center justify-center mb-6">
            <div
              className={`inline-flex items-center p-1 rounded-full border transition-all duration-300 ${
                isDark
                  ? "bg-white/10 border-white/15 backdrop-blur-md"
                  : "bg-white border-[#D3E9F3] shadow-xs"
              }`}
            >
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  isDark
                    ? "bg-[#19B5C9] text-[#031038] shadow-sm"
                    : "text-[#031038]/60 hover:text-[#031038]"
                }`}
                aria-label="Dark mode"
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  !isDark
                    ? "bg-[#032AAC] text-white shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
                aria-label="Light mode"
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>
            </div>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
            How the surveyor moves from deck to proof.
          </h2>
          <p
            className={`mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${
              isDark ? "text-white/70" : "text-[#031038]/70"
            }`}
          >
            Scroll through each stage to watch the Space BQS mobile engine calculate,
            verify, and seal bunker quantities in real time.
          </p>
        </div>

        {/* ─── SCROLL SECTION WRAPPER ─── */}
        <div ref={containerRef} className="relative">

          {/* ─── STAGE OVERLAY: FIRST CHILD WITH NEGATIVE MARGIN ─── */}
          <div
            ref={stageRef}
            aria-hidden="true"
            className="stage sticky top-0 h-[100svh] -mb-[100svh] z-10 pointer-events-none"
            style={{ "--s": "1" } as React.CSSProperties}
          >
            {/* Physical Phone Container */}
            <div
              ref={phoneRef}
              className="phone-container absolute right-[5%] lg:right-[9%] top-1/2 -translate-y-1/2 w-[310px] h-[640px] select-none"
              style={{
                transform: "translateY(-50%) scale(var(--s, 1))",
                transformOrigin: "center right",
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

                {/* ─── SCREEN VIEWPORT WRAPPER (.scr) ─── */}
                <div
                  ref={screenWrapperRef}
                  className="scr absolute inset-[8px] rounded-[44px] overflow-hidden bg-black"
                >
                  {/* Dynamic Island (Fixed Over All Screens) */}
                  <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-[86px] h-[24px] bg-black rounded-full z-40 flex items-center justify-between px-2.5 shadow-xs pointer-events-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0a0d14] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#15233e]/80" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#0c1424] border border-[#1e293b]" />
                  </div>

                  {/* ────────────────── SCREEN 1: SCAN & VERIFY (LIGHT) ────────────────── */}
                  <div
                    ref={(el) => { screenRefs.current[0] = el; }}
                    className="s s1 absolute inset-0 bg-white font-sans text-[#031038] will-change-transform"
                  >
                    <div
                      ref={(el) => { innerRefs.current[0] = el; }}
                      className="inner h-full flex flex-col justify-between pt-10 pb-5 px-4"
                    >
                      {/* Status bar */}
                      <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-800 pb-2 border-b border-slate-100">
                        <span>09:41</span>
                        <span className="text-[9px] font-mono text-[#032AAC] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                          v1.2.0 Deck
                        </span>
                      </div>

                      {/* Viewfinder Mock */}
                      <div className="relative mt-2 rounded-2xl bg-[#031038] p-4 text-white aspect-[4/3] flex flex-col items-center justify-center overflow-hidden border border-slate-800">
                        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#19B5C9]" />
                        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#19B5C9]" />
                        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#19B5C9]" />
                        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#19B5C9]" />
                        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#19B5C9] to-transparent animate-pulse absolute" />
                        <QrCode className="w-14 h-14 text-white/90" strokeWidth={1.5} />
                        <p className="mt-2 text-[9px] font-mono text-[#19B5C9] uppercase font-bold tracking-wider">
                          Manifold QR Locked
                        </p>
                      </div>

                      {/* Scanned Vessel Card */}
                      <div className="mt-2 rounded-xl bg-[#F0F6FA] p-3 border border-[#D9E6F2] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-xs text-[#031038]">
                            M/V PACIFIC MARINER
                          </span>
                          <span className="text-[9px] font-mono text-[#032AAC] font-bold bg-white px-1.5 py-0.5 rounded border border-[#D3E9F3]">
                            IMO 9412345
                          </span>
                        </div>
                        <div className="flex justify-between text-[9px] font-mono pt-1 text-[#031038]/70">
                          <span>Port: Singapore</span>
                          <span className="text-emerald-700 font-bold">14 Tables Matched</span>
                        </div>
                      </div>

                      {/* Bottom Action Button */}
                      <button className="mt-auto w-full py-2.5 rounded-xl bg-[#032AAC] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm">
                        <span>Begin Sounding Readings</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* ────────────────── SCREEN 2: OFFLINE CAPTURE (DARK) ────────────────── */}
                  <div
                    ref={(el) => { screenRefs.current[1] = el; }}
                    className="s s2 absolute inset-0 bg-[#0a0e1a] font-sans text-white will-change-transform"
                    style={{ clipPath: "inset(100% 0 0 0)" }}
                  >
                    <div
                      ref={(el) => { innerRefs.current[1] = el; }}
                      className="inner h-full flex flex-col justify-between pt-10 pb-5 px-4"
                    >
                      {/* Status bar */}
                      <div className="flex items-center justify-between text-[11px] font-mono font-bold text-white/80 pb-2 border-b border-white/10">
                        <span>09:41</span>
                        <span className="inline-flex items-center gap-1 text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          <WifiOff className="w-2.5 h-2.5" />
                          71h Offline Lease
                        </span>
                      </div>

                      {/* Ullage Reading Dial */}
                      <div className="mt-2 rounded-2xl bg-white/[0.04] border border-white/10 p-3 text-center">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-white/50">
                          Tank 1P · Ullage Dip Reading
                        </span>
                        <div className="font-mono text-3xl font-black text-white tracking-tight mt-1 tabular-nums">
                          4.250 <span className="text-sm font-normal text-white/50">m</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                          <div className="bg-[#F59E0B] h-full w-[68%]" />
                        </div>
                      </div>

                      {/* Sleep-stages style Stepped Depth Bars */}
                      <div className="mt-2 space-y-1">
                        <span className="text-[9px] font-mono text-white/50 block">Tank Trim Depth Profile</span>
                        <div className="flex items-end gap-1.5 h-[50px] bg-white/[0.03] p-1.5 rounded-xl border border-white/10">
                          <div className="w-[18%] h-[82%] bg-[#19B5C9] rounded-xs" />
                          <div className="w-[14%] h-[42%] bg-[#3B82F6] rounded-xs" />
                          <div className="w-[24%] h-[96%] bg-[#F59E0B] rounded-xs" />
                          <div className="w-[18%] h-[62%] bg-[#60A5FA] rounded-xs" />
                          <div className="w-[26%] h-[78%] bg-[#10B981] rounded-xs" />
                        </div>
                      </div>

                      {/* Field inputs */}
                      <div className="mt-1 space-y-1 text-[9px] font-mono">
                        <div className="flex items-center justify-between p-1.5 rounded-lg bg-white/5 border border-white/10">
                          <span className="text-white/60">Free Water Cut:</span>
                          <span className="text-amber-400 font-bold">0.050 m (Deducted)</span>
                        </div>
                        <div className="flex items-center justify-between p-1.5 rounded-lg bg-white/5 border border-white/10">
                          <span className="text-white/60">Observed Temp:</span>
                          <span className="text-white font-bold">40.0 °C</span>
                        </div>
                      </div>

                      {/* Tank switcher pills */}
                      <div className="mt-auto pt-2 flex items-center justify-between gap-1 text-[9px] font-mono">
                        <button className="flex-1 py-1 rounded bg-amber-500 text-[#031038] font-bold text-center">
                          1P (4.25m)
                        </button>
                        <button className="flex-1 py-1 rounded bg-white/10 text-white/70 text-center">
                          1S (4.38m)
                        </button>
                        <button className="flex-1 py-1 rounded bg-white/10 text-white/70 text-center">
                          2C (5.12m)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ────────────────── SCREEN 3: ASTM MATRIX (GRADIENT RING) ────────────────── */}
                  <div
                    ref={(el) => { screenRefs.current[2] = el; }}
                    className="s s3 absolute inset-0 bg-[#06181E] font-sans text-white will-change-transform"
                    style={{ clipPath: "inset(100% 0 0 0)" }}
                  >
                    <div
                      ref={(el) => { innerRefs.current[2] = el; }}
                      className="inner h-full flex flex-col justify-between pt-10 pb-5 px-4"
                    >
                      {/* Status bar */}
                      <div className="flex items-center justify-between text-[11px] font-mono font-bold text-white/80 pb-2 border-b border-white/10">
                        <span>09:41</span>
                        <span className="text-[9px] font-mono font-bold text-[#19B5C9] bg-[#19B5C9]/10 px-2 py-0.5 rounded-full border border-[#19B5C9]/30">
                          ASTM Table 54B
                        </span>
                      </div>

                      {/* Gradient Ring View (Like Recovery Dial) */}
                      <div className="mt-2 flex flex-col items-center justify-center p-2 rounded-2xl bg-white/[0.03] border border-white/10">
                        <div className="relative w-22 h-22 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <path
                              className="text-white/10"
                              strokeWidth="3.2"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-[#19B5C9]"
                              strokeDasharray="88, 100"
                              strokeWidth="3.2"
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center text-center">
                            <span className="text-sm font-display font-black text-white">0.9677</span>
                            <span className="text-[7px] font-mono text-[#19B5C9] uppercase">VCF Coeff</span>
                          </div>
                        </div>
                        <p className="mt-1 text-xs font-mono font-bold text-white">
                          Net Mass: 225.567 MT
                        </p>
                      </div>

                      {/* TOV / GSV Matrix Breakdown */}
                      <div className="mt-2 space-y-1.5 text-[9px] font-mono bg-white/5 p-2 rounded-xl border border-white/10">
                        <div className="flex justify-between text-white/60">
                          <span>Total Observed Vol (TOV)</span>
                          <span className="text-white font-bold">242.150 m³</span>
                        </div>
                        <div className="flex justify-between text-white/60">
                          <span>Gross Standard Vol (GSV)</span>
                          <span className="text-white font-bold">234.329 m³</span>
                        </div>
                        <div className="flex justify-between text-[#19B5C9] pt-1 border-t border-white/10 font-bold">
                          <span>Weight Correction Factor</span>
                          <span>0.99863</span>
                        </div>
                      </div>

                      {/* Calculation Status */}
                      <button className="mt-auto w-full py-2 rounded-xl bg-[#19B5C9] text-[#031038] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Ready for Dual Sign-off</span>
                      </button>
                    </div>
                  </div>

                  {/* ────────────────── SCREEN 4: CRYPTOGRAPHIC PROOF (CHAT/VERIFY) ────────────────── */}
                  <div
                    ref={(el) => { screenRefs.current[3] = el; }}
                    className="s s4 absolute inset-0 bg-[#09111E] font-sans text-white will-change-transform"
                    style={{ clipPath: "inset(100% 0 0 0)" }}
                  >
                    <div
                      ref={(el) => { innerRefs.current[3] = el; }}
                      className="inner h-full flex flex-col justify-between pt-10 pb-5 px-4"
                    >
                      {/* Status bar */}
                      <div className="flex items-center justify-between text-[11px] font-mono font-bold text-white/80 pb-2 border-b border-white/10">
                        <span>09:41</span>
                        <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          Audit Sealed
                        </span>
                      </div>

                      {/* Certified Total Box */}
                      <div className="mt-2 rounded-2xl bg-white/[0.04] border border-white/10 p-3 text-center">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                          Certified Mass in Air
                        </span>
                        <div className="font-mono text-3xl font-black text-white tracking-tight mt-1 tabular-nums">
                          457.819 <span className="text-sm font-normal text-white/50">MT</span>
                        </div>
                        <p className="text-[8px] font-mono text-white/60 mt-0.5">
                          14 Tanks Reconciled · VLSFO 0.5%
                        </p>
                      </div>

                      {/* Sign-off cards */}
                      <div className="mt-2 space-y-1.5 text-[9px] font-mono">
                        <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <div>
                            <span className="text-white/50 block text-[8px]">Chief Engineer</span>
                            <span className="font-bold text-white">Capt. H. Lindqvist</span>
                          </div>
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Signed
                          </span>
                        </div>
                        <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <div>
                            <span className="text-white/50 block text-[8px]">BQS Surveyor</span>
                            <span className="font-bold text-white">M. Tan (Lic #8812)</span>
                          </div>
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Signed
                          </span>
                        </div>
                      </div>

                      {/* SHA-256 Hash */}
                      <div className="mt-1 p-2 rounded-lg bg-black text-[8px] font-mono flex items-center justify-between border border-white/10">
                        <span className="text-emerald-400 font-bold">SHA-256</span>
                        <span className="text-white/70 truncate ml-2">7f8b9a2c4e1d...b89e</span>
                      </div>

                      {/* Export Button */}
                      <button className="mt-auto w-full py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>Export Certified Dossier</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* ─── FLOATING POP-OUT WIDGETS (Only Active One Has .on) ─── */}
                {/* Floating Card 1: Vessel Matched */}
                <div
                  ref={(el) => { floatingCardRefs.current[0] = el; }}
                  className="floating-card on absolute -left-12 lg:-left-16 top-[130px] z-30 max-w-[210px]"
                >
                  <div
                    className={`rounded-2xl p-3.5 shadow-2xl border border-l-[3px] border-l-[#19B5C9] ${
                      isDark
                        ? "bg-[#031038]/95 backdrop-blur-md border-white/15 text-white"
                        : "bg-white/95 backdrop-blur-md border-[#D3E9F3] text-[#031038]"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Ship className="w-3 h-3 text-[#19B5C9]" />
                      <span className="font-mono text-[9px] uppercase font-bold text-[#19B5C9] tracking-wider">
                        Vessel Matched
                      </span>
                    </div>
                    <p className="text-xs font-bold leading-tight">M/V PACIFIC MARINER</p>
                    <p className={`text-[9px] mt-1 font-mono ${isDark ? "text-white/60" : "text-[#031038]/60"}`}>
                      14 strapping tables loaded
                    </p>
                  </div>
                </div>

                {/* Floating Card 2: 72h Offline Storage */}
                <div
                  ref={(el) => { floatingCardRefs.current[1] = el; }}
                  className="floating-card absolute -right-10 lg:-right-14 top-[210px] z-30 max-w-[220px]"
                >
                  <div
                    className={`rounded-2xl p-3.5 shadow-2xl border border-l-[3px] border-l-amber-500 ${
                      isDark
                        ? "bg-[#031038]/95 backdrop-blur-md border-white/15 text-white"
                        : "bg-white/95 backdrop-blur-md border-[#D3E9F3] text-[#031038]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[9px] uppercase font-bold text-amber-500">
                        Autonomous Lease
                      </span>
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    </div>
                    <p className="text-xs font-bold leading-tight">72h Offline Storage Active</p>
                    <p className={`text-[9px] mt-1 font-mono ${isDark ? "text-white/60" : "text-[#031038]/60"}`}>
                      Autosaved 1s ago · Zero cell signal
                    </p>
                  </div>
                </div>

                {/* Floating Card 3: ASTM Table 54B */}
                <div
                  ref={(el) => { floatingCardRefs.current[2] = el; }}
                  className="floating-card absolute -left-12 lg:-left-16 top-[290px] z-30 max-w-[210px]"
                >
                  <div
                    className={`rounded-2xl p-3.5 shadow-2xl border border-l-[3px] border-l-[#4E8DEB] ${
                      isDark
                        ? "bg-[#031038]/95 backdrop-blur-md border-white/15 text-white"
                        : "bg-white/95 backdrop-blur-md border-[#D3E9F3] text-[#031038]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[9px] uppercase font-bold text-[#4E8DEB]">
                        ASTM Table 54B
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#4E8DEB]" />
                    </div>
                    <p className="text-xs font-bold leading-tight">VCF: 0.9677 Applied</p>
                    <p className="text-[9px] text-[#19B5C9] mt-1 font-mono font-bold">
                      Net Mass: 225.567 MT
                    </p>
                  </div>
                </div>

                {/* Floating Card 4: Cryptographic Finality */}
                <div
                  ref={(el) => { floatingCardRefs.current[3] = el; }}
                  className="floating-card absolute -right-10 lg:-right-14 top-[240px] z-30 max-w-[220px]"
                >
                  <div
                    className={`rounded-2xl p-3.5 shadow-2xl border border-l-[3px] border-l-emerald-500 ${
                      isDark
                        ? "bg-[#031038]/95 backdrop-blur-md border-white/15 text-white"
                        : "bg-white/95 backdrop-blur-md border-[#D3E9F3] text-[#031038]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[9px] uppercase font-bold text-emerald-500">
                        Cryptographic Lock
                      </span>
                      <Lock className="w-3 h-3 text-emerald-500" />
                    </div>
                    <p className="text-xs font-bold leading-tight">Certificate Sealed</p>
                    <p className={`text-[9px] mt-1 font-mono truncate ${isDark ? "text-emerald-300" : "text-emerald-700"}`}>
                      #BQS-2026-0042 · SHA-256
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── STACKED FULL-HEIGHT CARDS LIST ─── */}
          <div className="space-y-[18px]">
            {STAGES.map((stage, idx) => (
              <div
                key={stage.id}
                ref={(el) => { cardRefs.current[idx] = el; }}
                className="relative rounded-[38px] p-8 sm:p-14 lg:p-16 h-[calc(100svh-32px)] min-h-[600px] flex flex-col justify-between overflow-hidden border border-t transition-all duration-500"
                style={{
                  background: isDark ? stage.darkBg : stage.lightBg,
                  borderColor: isDark ? stage.darkBorder : stage.lightBorder,
                }}
              >
                {/* Card Top: Step tag */}
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: stage.accentColor }}
                  />
                  <span
                    className={`font-mono text-xs font-bold uppercase tracking-widest ${
                      isDark ? "text-white/80" : "text-[#031038]/80"
                    }`}
                  >
                    {stage.eyebrow}
                  </span>
                </div>

                {/* Card Main: Heading and Muted sentence on Left */}
                <div className="max-w-[340px] sm:max-w-[440px] lg:max-w-[520px] my-auto space-y-5">
                  <h3
                    className="font-display font-semibold tracking-tight text-[#031038] dark:text-white"
                    style={{
                      fontSize: "clamp(38px, 4.8vw, 72px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.04em",
                      fontWeight: 650,
                      color: isDark ? "#ffffff" : "#031038",
                    }}
                  >
                    {stage.heading}
                  </h3>
                  <p
                    className={`text-base sm:text-lg leading-relaxed ${
                      isDark ? "text-white/70" : "text-[#031038]/70"
                    }`}
                  >
                    {stage.sentence}
                  </p>
                </div>

                {/* Card Bottom Indicator */}
                <div
                  className={`flex items-center justify-between text-xs font-mono pt-4 border-t ${
                    isDark
                      ? "text-white/40 border-white/10"
                      : "text-[#031038]/40 border-[#031038]/10"
                  }`}
                >
                  <span>Space BQS Marine Engine</span>
                  <span className="font-semibold" style={{ color: stage.accentColor }}>
                    {stage.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Deploy Badges Below Section */}
        <div className="mt-16 text-center">
          <p
            className={`text-xs font-semibold mb-3 font-mono uppercase tracking-wider ${
              isDark ? "text-white/75" : "text-[#031038]/70"
            }`}
          >
            Deployable on rugged field iOS & Android devices
          </p>
          <div
            className={`inline-block p-4 rounded-2xl transition-all duration-300 ${
              isDark
                ? "bg-white/5 border border-white/10 backdrop-blur-sm"
                : "bg-white border border-[#D3E9F3] shadow-xs"
            }`}
          >
            <AppStoreBadges dark={isDark} />
          </div>
        </div>
      </div>

      {/* Scoped CSS for the Bevel-style screen clip-path & floating animations */}
      <style jsx>{`
        .phone-container {
          will-change: transform;
        }
        .scr .s {
          will-change: clip-path;
        }
        .scr .inner {
          will-change: transform;
          transform: translateY(calc(var(--d, 0) * 36px));
          transition: transform 0.08s linear;
        }
        .floating-card {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .floating-card.on {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 860px) {
          .phone-container {
            right: auto !important;
            left: 50% !important;
            top: auto !important;
            bottom: -30px !important;
            transform: translateX(-50%) scale(var(--s, 0.8)) !important;
            transform-origin: bottom center !important;
          }
          .floating-card {
            display: none !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .scr .inner {
            transform: none !important;
            transition: none !important;
          }
          .floating-card {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
