"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  QrCode,
  WifiOff,
  Calculator,
  Lock,
  CheckCircle2,
  ChevronRight,
  Ship,
  ArrowRight,
  FileCheck2,
  Sun,
  Moon,
} from "lucide-react";
import { AppStoreBadges } from "./HomeEnhancements";
import IPhoneMockup from "./IPhoneMockup";
import { useLenis } from "lenis/react";

interface StageCard {
  id: string;
  stepNumber: string;
  eyebrow: string;
  title: string;
  summary: string;
  tag: string;
  accentColor: string;
  darkGradientBg: string;
  lightGradientBg: string;
  darkBorderColor: string;
  lightBorderColor: string;
}

const STAGES: StageCard[] = [
  {
    id: "scan",
    stepNumber: "01",
    eyebrow: "Vessel Identification",
    title: "Scan and verify at the manifold.",
    summary:
      "Arrive on deck and scan the ship QR plate. Calibrated strapping tables, trim curves, and tank limits load into memory in under two seconds.",
    tag: "Manifold QR Check",
    accentColor: "#19B5C9",
    darkGradientBg:
      "linear-gradient(135deg, rgba(25, 181, 201, 0.08) 0%, rgba(3, 42, 172, 0.18) 50%, rgba(3, 16, 56, 0.55) 100%)",
    lightGradientBg:
      "linear-gradient(145deg, #F0F6FB 0%, #E3EEF7 100%)",
    darkBorderColor: "rgba(25, 181, 201, 0.4)",
    lightBorderColor: "rgba(25, 181, 201, 0.35)",
  },
  {
    id: "capture",
    stepNumber: "02",
    eyebrow: "Offline Deck Capture",
    title: "Capture on deck. 100% offline.",
    summary:
      "Deep inside double hulls with zero cellular signal. Sounding dips, water cuts, and temperatures autosave locally with a 72-hour cryptographic lease.",
    tag: "Autonomous 72h Lease",
    accentColor: "#F59E0B",
    darkGradientBg:
      "linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(180, 83, 9, 0.16) 50%, rgba(3, 16, 56, 0.55) 100%)",
    lightGradientBg:
      "linear-gradient(145deg, #FDF9F3 0%, #F6EFE3 100%)",
    darkBorderColor: "rgba(245, 158, 11, 0.4)",
    lightBorderColor: "rgba(245, 158, 11, 0.35)",
  },
  {
    id: "calculate",
    stepNumber: "03",
    eyebrow: "ASTM Table 54B Engine",
    title: "ASTM Table 54B in real time.",
    summary:
      "No manual spreadsheets or disputed calculator steps. Observed volume instantly converts to Gross Standard Volume and certified mass in air as you sound.",
    tag: "ASTM D1250 Matrix",
    accentColor: "#4E8DEB",
    darkGradientBg:
      "linear-gradient(135deg, rgba(78, 141, 235, 0.1) 0%, rgba(3, 42, 172, 0.24) 50%, rgba(3, 16, 56, 0.55) 100%)",
    lightGradientBg:
      "linear-gradient(145deg, #F2F6FE 0%, #E3EDFB 100%)",
    darkBorderColor: "rgba(78, 141, 235, 0.4)",
    lightBorderColor: "rgba(78, 141, 235, 0.35)",
  },
  {
    id: "certify",
    stepNumber: "04",
    eyebrow: "Cryptographic Finality",
    title: "Cryptographically sealed proof.",
    summary:
      "Dual-signed by Chief Engineer and surveyor on deck. Export an immutable SHA-256 audited certificate dossier before leaving the gangway.",
    tag: "SHA-256 Sealed",
    accentColor: "#10B981",
    darkGradientBg:
      "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.2) 50%, rgba(3, 16, 56, 0.55) 100%)",
    lightGradientBg:
      "linear-gradient(145deg, #F0FAF6 0%, #DFF4EB 100%)",
    darkBorderColor: "rgba(16, 185, 129, 0.4)",
    lightBorderColor: "rgba(16, 185, 129, 0.35)",
  },
];

interface DeckInteractiveShowcaseProps {
  initialTheme?: "dark" | "light";
}

export default function DeckInteractiveShowcase({
  initialTheme = "dark",
}: DeckInteractiveShowcaseProps) {
  const [theme, setTheme] = useState<"dark" | "light">(initialTheme);
  const [activeStage, setActiveStage] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isUserClicking = useRef(false);

  const isDark = theme === "dark";

  const islandStates: ("scan" | "offline" | "calc" | "sealed")[] = [
    "scan",
    "offline",
    "calc",
    "sealed",
  ];
  const currentIslandState = islandStates[activeStage] || "idle";

  // Check which card is centered in view
  const checkActiveCard = useCallback(() => {
    if (isUserClicking.current) return;

    const viewportCenter = window.innerHeight * 0.48;
    let closestStage = 0;
    let minDistance = Infinity;

    cardRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const cardCenter = rect.top + rect.height * 0.5;
      const distance = Math.abs(cardCenter - viewportCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestStage = index;
      }
    });

    setActiveStage((prev) => (prev !== closestStage ? closestStage : prev));
  }, []);

  // 1. Lenis scroll listener
  const lenis = useLenis(checkActiveCard);

  // 2. Native scroll fallback + mount check
  useEffect(() => {
    window.addEventListener("scroll", checkActiveCard, { passive: true });
    checkActiveCard();
    return () => window.removeEventListener("scroll", checkActiveCard);
  }, [checkActiveCard]);

  // 3. Hardware-accelerated IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isUserClicking.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) {
              setActiveStage(index);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -25% 0px",
        threshold: 0.15,
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (index: number) => {
    isUserClicking.current = true;
    setActiveStage(index);
    const targetRef = cardRefs.current[index];
    if (targetRef) {
      if (lenis) {
        lenis.scrollTo(targetRef, { offset: -90, duration: 0.9 });
      } else {
        targetRef.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    setTimeout(() => {
      isUserClicking.current = false;
    }, 950);
  };

  return (
    <section
      className={`relative py-24 sm:py-32 transition-colors duration-500 ${
        isDark ? "text-white" : "text-[#031038] border-y border-[#D3E9F3]/70"
      }`}
      style={{
        background: isDark
          ? "linear-gradient(180deg, #032AAC 0%, #031038 40%, #020B24 100%)"
          : "linear-gradient(180deg, #F0F7FB 0%, #F7FBFD 50%, #EDF5FA 100%)",
      }}
    >
      {/* Subtle background glows & grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] rounded-full transition-opacity duration-500"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(25,181,201,0.1) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(25,181,201,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[450px] rounded-full transition-opacity duration-500"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(3,42,172,0.2) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(3,42,172,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            isDark ? "bg-grid-marine opacity-35" : "bg-grid-subtle opacity-40"
          }`}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          {/* Light / Dark Mode Segmented Switcher */}
          <div className="flex items-center justify-center mb-6">
            <div
              className={`inline-flex items-center p-1 rounded-full border transition-all duration-300 ${
                isDark
                  ? "bg-white/10 border-white/15 backdrop-blur-md"
                  : "bg-white border-[#D3E9F3] shadow-sm"
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

          <h2
            className={`font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] transition-colors duration-300 ${
              isDark ? "text-white" : "text-[#031038]"
            }`}
          >
            How the surveyor moves from deck to proof.
          </h2>
          <p
            className={`mt-5 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
              isDark ? "text-white/70" : "text-[#031038]/70"
            }`}
          >
            Scroll through each stage to watch the Space BQS mobile engine calculate,
            verify, and seal bunker quantities in real time.
          </p>

          {/* Quick tab switcher */}
          <div className="flex items-center justify-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
            {STAGES.map((stage, idx) => (
              <button
                key={stage.id}
                onClick={() => handleCardClick(idx)}
                className={`px-4 py-2 rounded-full text-xs font-medium font-mono transition-all shrink-0 cursor-pointer ${
                  activeStage === idx
                    ? isDark
                      ? "bg-[#19B5C9] text-[#031038] font-bold shadow-lg shadow-[#19B5C9]/30 scale-105"
                      : "bg-[#032AAC] text-white font-bold shadow-md shadow-[#032AAC]/25 scale-105"
                    : isDark
                      ? "bg-white/10 text-white/70 border border-white/15 hover:bg-white/20 hover:text-white"
                      : "bg-white text-[#031038]/70 border border-[#D3E9F3] hover:bg-[#EAF4F9] hover:text-[#032AAC]"
                }`}
              >
                <span className="opacity-60 mr-1.5">{stage.stepNumber}</span>
                {stage.tag}
              </button>
            ))}
          </div>
        </div>

        {/* ─── STACKED CARDS WITH PASS-THROUGH STICKY IPHONE ─── */}
        <div className="relative">
          {/* Stacked Full-Width Cards */}
          <div className="space-y-6 sm:space-y-8">
            {STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <div
                  key={stage.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onClick={() => handleCardClick(idx)}
                  className={`group relative rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 lg:p-16 min-h-[540px] sm:min-h-[620px] flex flex-col justify-between transition-all duration-500 cursor-pointer border-t border-r border-b backdrop-blur-xl border-l-[4px] ${
                    isActive
                      ? isDark
                        ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_40px_rgba(25,181,201,0.12)] scale-[1.008]"
                        : "shadow-2xl shadow-[#032AAC]/10 ring-2 ring-[#032AAC]/20 scale-[1.008]"
                      : isDark
                        ? "opacity-75 hover:opacity-95"
                        : "opacity-90 hover:opacity-100"
                  }`}
                  style={{
                    background: isDark ? stage.darkGradientBg : stage.lightGradientBg,
                    borderLeftColor: stage.accentColor,
                    borderTopColor: isActive
                      ? isDark
                        ? "rgba(255, 255, 255, 0.2)"
                        : stage.lightBorderColor
                      : isDark
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(211, 233, 243, 0.6)",
                    borderRightColor: isActive
                      ? isDark
                        ? "rgba(255, 255, 255, 0.2)"
                        : stage.lightBorderColor
                      : isDark
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(211, 233, 243, 0.6)",
                    borderBottomColor: isActive
                      ? isDark
                        ? "rgba(255, 255, 255, 0.2)"
                        : stage.lightBorderColor
                      : isDark
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(211, 233, 243, 0.6)",
                  }}
                >
                  {/* Top row: Stage step & eyebrow */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: stage.accentColor }}
                      />
                      <span
                        className={`font-mono text-xs font-bold uppercase tracking-widest ${
                          isDark ? "text-white/90" : "text-[#031038]"
                        }`}
                      >
                        Stage {stage.stepNumber} · {stage.eyebrow}
                      </span>
                    </div>
                    <span
                      className={`font-mono text-xs font-bold ${
                        isDark ? "text-white/30" : "text-[#031038]/40"
                      }`}
                    >
                      0{idx + 1} / 04
                    </span>
                  </div>

                  {/* Main Minimal Text content */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6">
                    <div className="lg:col-span-7">
                      <h3
                        className={`font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] transition-colors duration-300 ${
                          isDark ? "text-white" : "text-[#031038]"
                        }`}
                      >
                        {stage.title}
                      </h3>
                      <p
                        className={`mt-5 text-base sm:text-xl leading-relaxed max-w-xl font-normal transition-colors duration-300 ${
                          isDark ? "text-white/75" : "text-[#031038]/70"
                        }`}
                      >
                        {stage.summary}
                      </p>

                      {/* Interactive Cue */}
                      <div
                        className="mt-8 flex items-center gap-2 text-sm font-bold"
                        style={{ color: stage.accentColor }}
                      >
                        <span>{isActive ? "Currently active on device" : "Click to view stage on device"}</span>
                        <ArrowRight
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isActive ? "translate-x-1" : "group-hover:translate-x-1"
                          }`}
                        />
                      </div>
                    </div>


                    {/* Right column empty spacer on desktop: reserved for the sticky phone! */}
                    <div className="hidden lg:block lg:col-span-5" />
                  </div>

                  {/* Bottom indicator strip */}
                  <div
                    className={`flex items-center justify-between text-xs font-mono pt-4 border-t ${
                      isDark
                        ? "text-white/40 border-white/10"
                        : "text-[#031038]/50 border-[#031038]/10"
                    }`}
                  >
                    <span>Space BQS Marine Engine</span>
                    <span
                      className="font-semibold"
                      style={{ color: stage.accentColor }}
                    >
                      {stage.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ─── STICKY IPHONE 16 PRO COLUMN (Spans across all cards) ─── */}
          <div className="hidden lg:block absolute top-0 right-0 w-[45%] xl:w-[42%] h-full pointer-events-none">
            <div className="sticky top-[max(88px,calc(50vh-340px))] flex justify-center pointer-events-auto">
              <div className="relative">
                {/* ─── FLOATING POP-OUT WIDGETS ─── */}
                {activeStage === 0 && (
                  <div className="absolute -top-4 -left-12 sm:-left-16 z-30 animate-soft-float max-w-[230px]">
                    <div
                      className={`rounded-2xl p-4 shadow-2xl border border-l-[3px] border-l-[#19B5C9] transition-all duration-300 ${
                        isDark
                          ? "bg-[#031038]/90 backdrop-blur-xl border-white/15 text-white shadow-black/60"
                          : "bg-white/95 backdrop-blur-md border-[#D3E9F3] text-[#031038] shadow-[#031038]/15"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Ship className="w-3.5 h-3.5 text-[#19B5C9]" />
                        <span className="font-mono text-[10px] uppercase font-bold text-[#19B5C9] tracking-wider">
                          Vessel Matched
                        </span>
                      </div>
                      <p className="text-xs font-bold leading-snug">
                        M/V PACIFIC MARINER
                      </p>
                      <p
                        className={`text-[10px] mt-1 font-mono ${
                          isDark ? "text-white/60" : "text-[#031038]/60"
                        }`}
                      >
                        14 strapping tables loaded
                      </p>
                    </div>
                  </div>
                )}

                {activeStage === 1 && (
                  <div className="absolute -top-4 -left-12 sm:-left-16 z-30 animate-soft-float max-w-[230px]">
                    <div
                      className={`rounded-2xl p-4 shadow-2xl border border-l-[3px] border-l-amber-500 transition-all duration-300 ${
                        isDark
                          ? "bg-[#031038]/90 backdrop-blur-xl border-white/15 text-white shadow-black/60"
                          : "bg-white/95 backdrop-blur-md border-[#D3E9F3] text-[#031038] shadow-[#031038]/15"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[10px] uppercase font-bold text-amber-500">
                          Autonomous Lease
                        </span>
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      </div>
                      <p className="text-xs font-bold">
                        72h Offline Storage Active
                      </p>
                      <p
                        className={`text-[10px] mt-1 font-mono ${
                          isDark ? "text-white/60" : "text-[#031038]/60"
                        }`}
                      >
                        Autosaved 1s ago · Zero cell signal
                      </p>
                    </div>
                  </div>
                )}

                {activeStage === 2 && (
                  <div className="absolute -bottom-6 -left-10 sm:-left-14 z-30 animate-soft-float max-w-[230px]">
                    <div
                      className={`rounded-2xl p-4 shadow-2xl border border-l-[3px] border-l-[#4E8DEB] transition-all duration-300 ${
                        isDark
                          ? "bg-[#031038]/90 backdrop-blur-xl border-white/15 text-white shadow-black/60"
                          : "bg-white/95 backdrop-blur-md border-[#D3E9F3] text-[#031038] shadow-[#031038]/15"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[10px] uppercase font-bold text-[#4E8DEB]">
                          ASTM Table 54B
                        </span>
                        <span className="w-2 h-2 rounded-full bg-[#4E8DEB]" />
                      </div>
                      <p className="text-xs font-bold">
                        VCF: 0.9677 Applied
                      </p>
                      <p className="text-[10px] text-[#19B5C9] mt-1 font-mono font-bold">
                        Net Mass: 225.567 MT @ 15°C
                      </p>
                    </div>
                  </div>
                )}

                {activeStage === 3 && (
                  <div className="absolute -bottom-6 -left-10 sm:-left-14 z-30 animate-soft-float max-w-[240px]">
                    <div
                      className={`rounded-2xl p-4 shadow-2xl border border-l-[3px] border-l-emerald-500 transition-all duration-300 ${
                        isDark
                          ? "bg-[#031038]/90 backdrop-blur-xl border-white/15 text-white shadow-black/60"
                          : "bg-white/95 backdrop-blur-md border-[#D3E9F3] text-[#031038] shadow-[#031038]/15"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[10px] uppercase font-bold text-emerald-500">
                          Cryptographic Lock
                        </span>
                        <Lock className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <p className="text-xs font-bold">
                        Certificate Sealed
                      </p>
                      <p
                        className={`text-[10px] mt-1 font-mono truncate ${
                          isDark ? "text-emerald-300/80" : "text-emerald-700"
                        }`}
                      >
                        #BQS-2026-0042 · SHA-256
                      </p>
                    </div>
                  </div>
                )}

                {/* ─── REALISTIC IPHONE 16 PRO CHASSIS ─── */}
                <IPhoneMockup scale={0.75} islandState={currentIslandState} statusBarTheme={isDark ? "light" : "dark"}>
                  <div className="relative w-full h-full overflow-hidden">
                    {/* ──── SCREEN 1: SCAN & VERIFY ──── */}
                    <div
                      className={`absolute inset-0 flex flex-col justify-between transition-all duration-500 ease-out ${
                        activeStage === 0
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 translate-y-4 pointer-events-none"
                      }`}
                    >
                      {/* App Bar */}
                      <div className="flex items-center justify-between pb-2 border-b border-[#D3E9F3]/60">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-[#19B5C9]" />
                          <span className="text-xs font-bold text-[#031038]">
                            Space BQS Scanner
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[#032AAC] font-bold">
                          v1.2.0
                        </span>
                      </div>

                      {/* Camera Viewfinder Mock */}
                      <div className="mt-2.5 relative rounded-2xl bg-[#031038] p-4 text-white overflow-hidden aspect-[4/3] flex flex-col items-center justify-center border border-[#031038]">
                        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#19B5C9]" />
                        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#19B5C9]" />
                        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#19B5C9]" />
                        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#19B5C9]" />
                        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#19B5C9] to-transparent animate-pulse absolute" />

                        <QrCode className="w-16 h-16 text-white/80" strokeWidth={1.5} />
                        <p className="mt-2 text-[10px] font-mono text-[#19B5C9] tracking-wider uppercase font-semibold">
                          Manifold Plate Detected
                        </p>
                      </div>

                      {/* Scanned Vessel Card */}
                      <div className="mt-2.5 rounded-2xl bg-[#EAF4F9] p-3 border border-[#D3E9F3] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-xs text-[#031038]">
                            M/V PACIFIC MARINER
                          </span>
                          <span className="text-[10px] font-mono text-[#032AAC] font-bold bg-white px-2 py-0.5 rounded-md border border-[#D3E9F3]">
                            IMO 9412345
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-1 text-[#031038]/70">
                          <div>
                            <span className="block text-[#031038]/40">Port</span>
                            <span className="font-semibold text-[#031038]">Singapore West</span>
                          </div>
                          <div>
                            <span className="block text-[#031038]/40">Strapping</span>
                            <span className="font-semibold text-[#032AAC]">14 Tanks Loaded</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className="mt-auto w-full py-2.5 rounded-xl bg-[#032AAC] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm">
                        <span>Begin Sounding Readings</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* ──── SCREEN 2: DECK CAPTURE (100% OFFLINE) ──── */}
                    <div
                      className={`absolute inset-0 flex flex-col justify-between transition-all duration-500 ease-out ${
                        activeStage === 1
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 translate-y-4 pointer-events-none"
                      }`}
                    >
                      {/* App Bar */}
                      <div className="flex items-center justify-between pb-2 border-b border-[#D3E9F3]/60">
                        <div>
                          <span className="font-display font-bold text-xs text-[#031038] block">
                            Tank 1P · VLSFO 0.5%
                          </span>
                          <span className="text-[10px] font-mono text-[#031038]/50">
                            Reading 1 of 14
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 border border-amber-300">
                          <WifiOff className="w-2.5 h-2.5" />
                          71h Lease
                        </span>
                      </div>

                      {/* Main Sounding Depth Dial */}
                      <div className="mt-2.5 rounded-2xl bg-[#F7FBFD] border border-[#D3E9F3] p-3 text-center">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#031038]/50">
                          Ullage Dip Reading
                        </span>
                        <div className="font-mono text-3xl font-bold text-[#031038] tracking-tight mt-0.5 tabular-nums">
                          4.250 <span className="text-base font-normal text-[#031038]/50">m</span>
                        </div>
                        <div className="w-full bg-[#EAF4F9] h-2 rounded-full overflow-hidden mt-2 border border-[#D3E9F3]/60">
                          <div className="bg-[#19B5C9] h-full w-[68%]" />
                        </div>
                      </div>

                      {/* Field inputs grid */}
                      <div className="mt-2 space-y-1.5">
                        {[
                          { label: "Free Water Cut (Paste)", value: "0.050 m", badge: "Trim Corrected" },
                          { label: "Observed Temperature", value: "40.0 °C", badge: "Probe Logged" },
                          { label: "Density @ 15°C (BDN)", value: "0.9500 kg/L", badge: "Verified" },
                        ].map((row, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-2 rounded-xl border border-[#D3E9F3] bg-white text-xs"
                          >
                            <div>
                              <span className="text-[9px] font-mono text-[#031038]/50 block">
                                {row.label}
                              </span>
                              <span className="font-mono font-bold text-[#031038] tabular-nums">
                                {row.value}
                              </span>
                            </div>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#EAF4F9] text-[#032AAC] font-semibold">
                              {row.badge}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tank switcher pills */}
                      <div className="mt-auto pt-2 flex items-center justify-between gap-1 text-[10px] font-mono">
                        <button className="flex-1 py-1.5 rounded-lg bg-[#032AAC] text-white font-bold text-center">
                          1P (4.25m)
                        </button>
                        <button className="flex-1 py-1.5 rounded-lg bg-[#EAF4F9] text-[#031038]/70 text-center hover:bg-[#D3E9F3]">
                          1S (4.38m)
                        </button>
                        <button className="flex-1 py-1.5 rounded-lg bg-[#EAF4F9] text-[#031038]/70 text-center hover:bg-[#D3E9F3]">
                          2C (5.12m)
                        </button>
                      </div>
                    </div>

                    {/* ──── SCREEN 3: ASTM TABLE 54B ENGINE ──── */}
                    <div
                      className={`absolute inset-0 flex flex-col justify-between transition-all duration-500 ease-out ${
                        activeStage === 2
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 translate-y-4 pointer-events-none"
                      }`}
                    >
                      {/* App Bar */}
                      <div className="flex items-center justify-between pb-2 border-b border-[#D3E9F3]/60">
                        <div>
                          <span className="font-display font-bold text-xs text-[#031038] block">
                            ASTM D1250 Engine
                          </span>
                          <span className="text-[10px] font-mono text-[#031038]/50">
                            Table 54B Matrix
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#032AAC] bg-[#EAF4F9] px-2 py-0.5 rounded-full border border-[#D3E9F3]">
                          Auto-VCF
                        </span>
                      </div>

                      {/* VCF Hero Metric Card */}
                      <div className="mt-2.5 rounded-2xl bg-gradient-to-br from-[#032AAC] to-[#031038] text-white p-3.5 shadow-md">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase text-[#A5D3E8]">
                            Net Mass in Air
                          </span>
                          <span className="text-[10px] font-mono text-[#19B5C9] font-bold">
                            Tank 1P
                          </span>
                        </div>
                        <div className="font-mono text-3xl font-bold tracking-tight mt-1 text-white tabular-nums">
                          225.567 <span className="text-sm font-normal text-[#A5D3E8]">MT</span>
                        </div>
                        <p className="text-[10px] font-mono text-[#A5D3E8]/70 mt-1">
                          Standard ASTM D1250 / ISO 8217
                        </p>
                      </div>

                      {/* Calculation Breakdown Matrix */}
                      <div className="mt-2 rounded-xl border border-[#D3E9F3] bg-[#F7FBFD] p-2.5 space-y-1.5 text-xs">
                        <div className="flex justify-between items-center text-[10px] font-mono pb-1 border-b border-[#D3E9F3]/60">
                          <span className="text-[#031038]/50">Total Observed Vol (TOV)</span>
                          <span className="font-bold text-[#031038]">219.489 m³</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono pb-1 border-b border-[#D3E9F3]/60">
                          <span className="text-[#031038]/50">Less Free Water (FWV)</span>
                          <span className="font-bold text-red-600">-2.510 m³</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono pb-1 border-b border-[#D3E9F3]/60">
                          <span className="text-[#031038]/50">Gross Standard Vol (GSV)</span>
                          <span className="font-bold text-[#032AAC]">210.027 m³</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono pt-0.5">
                          <span className="font-bold text-[#032AAC]">VCF (Table 54B)</span>
                          <span className="font-mono font-bold text-[#032AAC] px-1.5 py-0.5 bg-white rounded border border-[#D3E9F3]">
                            0.9677
                          </span>
                        </div>
                      </div>

                      {/* Cumulative Total Pill */}
                      <div className="mt-auto pt-2 border-t border-[#D3E9F3]/60 flex items-center justify-between text-xs">
                        <span className="text-[10px] font-mono text-[#031038]/60">
                          Total Survey Delivered:
                        </span>
                        <span className="font-mono font-bold text-[#032AAC]">
                          457.819 MT
                        </span>
                      </div>
                    </div>

                    {/* ──── SCREEN 4: TAMPER-PROOF FINAL LOCK ──── */}
                    <div
                      className={`absolute inset-0 flex flex-col justify-between transition-all duration-500 ease-out ${
                        activeStage === 3
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 translate-y-4 pointer-events-none"
                      }`}
                    >
                      {/* App Bar */}
                      <div className="flex items-center justify-between pb-2 border-b border-[#D3E9F3]/60">
                        <div>
                          <span className="font-display font-bold text-xs text-[#031038] block">
                            Bunker Certificate
                          </span>
                          <span className="text-[10px] font-mono text-[#031038]/50">
                            #BQS-2026-0042
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300">
                          <Lock className="w-2.5 h-2.5" />
                          Finalised
                        </span>
                      </div>

                      {/* Grand Total Final Certificate Card */}
                      <div className="mt-2.5 rounded-2xl bg-[#EAF4F9] border border-[#D3E9F3] p-3 text-center">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#031038]/50">
                          Certified Mass in Air
                        </span>
                        <div className="font-mono text-3xl font-bold text-[#032AAC] tracking-tight mt-0.5 tabular-nums">
                          457.819 <span className="text-base font-normal text-[#031038]/50">MT</span>
                        </div>
                        <p className="text-[10px] font-mono text-[#031038]/60 mt-1">
                          VLSFO 0.5% · 14 Tanks Reconciled
                        </p>
                      </div>

                      {/* Dual Signatures */}
                      <div className="mt-2 space-y-1.5">
                        <div className="p-2 rounded-xl bg-white border border-[#D3E9F3] flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[9px] font-mono text-[#031038]/50 block">
                              Chief Engineer Sign-off
                            </span>
                            <span className="font-medium text-[#031038]">
                              Capt. H. Lindqvist
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Signed
                          </span>
                        </div>

                        <div className="p-2 rounded-xl bg-white border border-[#D3E9F3] flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[9px] font-mono text-[#031038]/50 block">
                              BQS Lead Surveyor
                            </span>
                            <span className="font-medium text-[#031038]">
                              M. Tan (Lic #8812)
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Signed
                          </span>
                        </div>
                      </div>

                      {/* SHA-256 Hash box */}
                      <div className="mt-2 p-2 rounded-lg bg-[#031038] text-white text-[9px] font-mono flex items-center justify-between">
                        <span className="text-[#A5D3E8]">SHA-256</span>
                        <span className="text-[#19B5C9] truncate ml-2">
                          7f8b9a2c4e1d...b89e
                        </span>
                      </div>

                      {/* Export Button */}
                      <button className="mt-auto w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>Export Certified Dossier</span>
                      </button>
                    </div>
                  </div>
                </IPhoneMockup>
              </div>
            </div>
          </div>
        </div>

        {/* Deploy Badges Below the Section */}
        <div className="mt-16 text-center">
          <p
            className={`text-xs font-semibold mb-3 font-mono uppercase tracking-wider transition-colors duration-300 ${
              isDark ? "text-white/75" : "text-[#031038]/70"
            }`}
          >
            Deployable on rugged field iOS & Android devices
          </p>
          <div
            className={`inline-block p-4 rounded-2xl transition-all duration-300 ${
              isDark
                ? "bg-white/5 border border-white/10 backdrop-blur-sm"
                : "bg-white border border-[#D3E9F3] shadow-sm"
            }`}
          >
            <AppStoreBadges dark={isDark} />
          </div>
        </div>
      </div>
    </section>
  );
}
