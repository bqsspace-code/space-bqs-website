"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Lock,
  Fuel,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useLenis } from "lenis/react";

interface WorkflowStageData {
  id: string;
  stepNumber: string;
  eyebrow: string;
  heading: string;
  sentence: string;
  tag: string;
  href: string;
  accentColor: string;
  lightBg: string;
  darkBg: string;
  lightBorder: string;
  darkBorder: string;
}

const WORKFLOWS: WorkflowStageData[] = [
  {
    id: "bunker-delivery",
    stepNumber: "01",
    eyebrow: "WORKFLOW 01 / BUNKER DELIVERY",
    heading: "Check delivery note against actual sounding.",
    sentence: "Check what was delivered against the delivery note (BDN), tank by tank with ASTM Table 54B precision.",
    tag: "BDN Reconciliation",
    href: "/services/bunker-delivery-survey",
    accentColor: "#F59E0B",
    lightBg: "linear-gradient(180deg, #F0F6FA 0%, #E3EDF6 100%)",
    darkBg: "linear-gradient(180deg, #0A1733 0%, #031024 100%)",
    lightBorder: "#D2E4F2",
    darkBorder: "rgba(245, 158, 11, 0.35)",
  },
  {
    id: "rob-survey",
    stepNumber: "02",
    eyebrow: "WORKFLOW 02 / CHARTER REDELIVERY",
    heading: "Pair two surveys. Settle charter fuel.",
    sentence: "Pair delivery and redelivery surveys to settle charter fuel disputes with an immutable record both sides can follow.",
    tag: "ROB Audit Trail",
    href: "/services/rob-survey",
    accentColor: "#3B82F6",
    lightBg: "linear-gradient(180deg, #F2F5F9 0%, #E6EBF2 100%)",
    darkBg: "linear-gradient(180deg, #10152B 0%, #060917 100%)",
    lightBorder: "#D5DFEC",
    darkBorder: "rgba(59, 130, 246, 0.35)",
  },
  {
    id: "debunkering",
    stepNumber: "03",
    eyebrow: "WORKFLOW 03 / OFFLOAD RECORD",
    heading: "Record what left the tank on one certificate.",
    sentence: "Record what left the tank, with pumping rates, discharge temperatures, and manifold seals on a single locked certificate.",
    tag: "Offload Proof",
    href: "/services/debunkering-survey",
    accentColor: "#10B981",
    lightBg: "linear-gradient(180deg, #F0F8F6 0%, #E1EFEA 100%)",
    darkBg: "linear-gradient(180deg, #0A2224 0%, #031417 100%)",
    lightBorder: "#D2E7E2",
    darkBorder: "rgba(16, 185, 129, 0.35)",
  },
];

export default function WorkflowInteractiveShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const screenWrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const screenRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const floatingCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lastY = useRef<number[]>([0, 640, 640]);
  const activeCardIdx = useRef<number>(0);
  const scaleRef = useRef<number>(0.82);

  // Responsive scale calculation
  const measure = useCallback(() => {
    if (!stageRef.current) return;
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    let s = 0.82;
    if (vw < 860) {
      s = Math.min(0.82, Math.max(0.65, (vw - 40) / 350));
    } else {
      s = Math.min(0.85, Math.max(0.66, (vh - 120) / 640));
    }
    scaleRef.current = s;
    stageRef.current.style.setProperty("--s", s.toFixed(4));
  }, []);

  // Update boundary wipe, phone opacity, position limit & in-phone parallax
  const updateWipe = useCallback(() => {
    if (!screenWrapperRef.current || !phoneRef.current || !stageRef.current) return;

    const vh = window.innerHeight;
    const scale = scaleRef.current || 0.82;
    const screenHeight = 640;
    const stageRect = stageRef.current.getBoundingClientRect();

    const card0 = cardRefs.current[0];
    const cardLast = cardRefs.current[WORKFLOWS.length - 1];

    if (card0 && cardLast) {
      const card0Rect = card0.getBoundingClientRect();
      const cardLastRect = cardLast.getBoundingClientRect();

      const card0Center = card0Rect.top + card0Rect.height * 0.5;
      const cardLastCenter = cardLastRect.top + cardLastRect.height * 0.5;
      const normalCenter = vh * 0.5;

      // Limit phone: never higher than Card 1 center, never lower than Card 3 (last card) center!
      let targetCenterY = normalCenter;
      if (cardLastCenter < normalCenter) {
        targetCenterY = cardLastCenter;
      } else if (card0Center > normalCenter) {
        targetCenterY = card0Center;
      }

      // Convert targetCenterY to stageRef coordinate space
      const phoneTopInsideStage = targetCenterY - stageRect.top;
      phoneRef.current.style.top = `${phoneTopInsideStage}px`;

      // Smooth fade-in & fade-out
      const fadeIn = Math.min(1, Math.max(0, (vh - (card0Center - 100)) / (vh * 0.4)));
      const fadeOut = Math.min(1, Math.max(0, (cardLastCenter + 100) / (vh * 0.4)));
      const phoneOpacity = Math.min(fadeIn, fadeOut);

      phoneRef.current.style.opacity = phoneOpacity.toFixed(3);
      phoneRef.current.style.visibility = phoneOpacity > 0.01 ? "visible" : "hidden";
    }

    // Read screenRect after position update
    const screenRect = screenWrapperRef.current.getBoundingClientRect();

    // Boundary-aligned screen wipe
    for (let i = 1; i < WORKFLOWS.length; i++) {
      const cardEl = cardRefs.current[i];
      if (!cardEl) continue;

      const cardRect = cardEl.getBoundingClientRect();
      const rawY = (cardRect.top - screenRect.top) / scale;
      const clampedY = Math.min(screenHeight, Math.max(0, rawY));
      const roundedY = Math.round(clampedY * 2) / 2;

      if (Math.abs(roundedY - (lastY.current[i] || 0)) >= 0.5) {
        lastY.current[i] = roundedY;
        const scrEl = screenRefs.current[i];
        if (scrEl) {
          scrEl.style.clipPath = `inset(${roundedY}px 0 0 0)`;
        }
      }
    }

    // Secondary motion: in-phone parallax translation
    for (let i = 0; i < WORKFLOWS.length; i++) {
      const cardEl = cardRefs.current[i];
      if (!cardEl) continue;

      const cardRect = cardEl.getBoundingClientRect();
      const cardCenter = cardRect.top + cardRect.height * 0.5;
      const d = Math.min(1, Math.max(-1, (cardCenter - vh * 0.5) / (vh * 0.7)));

      const innerEl = innerRefs.current[i];
      if (innerEl) {
        innerEl.style.setProperty("--d", d.toFixed(3));
      }
    }

    // Active card detection & toggle floating cards
    const phoneCenterY = screenRect.top + (screenRect.height * 0.5);
    let currentActive = 0;
    for (let i = 0; i < WORKFLOWS.length; i++) {
      const cardEl = cardRefs.current[i];
      if (!cardEl) continue;
      const cardRect = cardEl.getBoundingClientRect();
      if (cardRect.top <= phoneCenterY + 40) {
        currentActive = i;
      }
    }

    if (currentActive !== activeCardIdx.current) {
      activeCardIdx.current = currentActive;
      floatingCardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl) return;
        if (idx === currentActive) {
          cardEl.classList.add("on");
        } else {
          cardEl.classList.remove("on");
        }
      });
    }
  }, []);

  // Sync directly with Lenis smooth scroll
  useLenis(() => {
    updateWipe();
  });

  // Native scroll & resize listeners
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("scroll", updateWipe, { passive: true });
    updateWipe();

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", updateWipe);
    };
  }, [measure, updateWipe]);

  return (
    <div ref={containerRef} className="relative mt-8">

      {/* ─── STAGE OVERLAY: FIRST CHILD WITH NEGATIVE MARGIN ─── */}
      <div
        ref={stageRef}
        aria-hidden="true"
        className="stage sticky top-0 h-[100svh] -mb-[100svh] z-10 pointer-events-none"
        style={{ "--s": "0.82" } as React.CSSProperties}
      >
        {/* Physical Phone Container — Anchored on the right, vertically centered */}
        <div
          ref={phoneRef}
          className="phone-container absolute right-[5%] lg:right-[8%] xl:right-[10%] select-none pointer-events-none"
          style={{
            width: 310,
            height: 640,
            top: "50%",
            transform: "translateY(-50%) scale(var(--s, 0.82))",
            transformOrigin: "center right",
            opacity: 0,
            transition: "opacity 0.2s ease-out",
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
              {/* Dynamic Island */}
              <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-[86px] h-[24px] bg-black rounded-full z-40 flex items-center justify-between px-2.5 shadow-xs pointer-events-none">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0a0d14] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#15233e]/80" />
                </div>
                <div className="w-2 h-2 rounded-full bg-[#0c1424] border border-[#1e293b]" />
              </div>

              {/* ────────────────── SCREEN 1: BUNKER DELIVERY (LIGHT) ────────────────── */}
              <div
                ref={(el) => { screenRefs.current[0] = el; }}
                className="s s1 absolute inset-0 bg-white font-sans text-[#031038] will-change-transform"
              >
                <div
                  ref={(el) => { innerRefs.current[0] = el; }}
                  className="inner h-full flex flex-col justify-between pt-10 pb-5 px-4"
                >
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-800 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        <X className="w-2.5 h-2.5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-800">Delivery Score</span>
                    </div>
                    <span className="text-[8px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/90 px-1.5 py-0.5 rounded-full">
                      BDN 100% Match
                    </span>
                  </div>

                  {/* Score & Mass in Air Readout */}
                  <div className="pt-2 flex items-start justify-between">
                    <div>
                      <div className="text-2xl font-display font-black text-[#031038] leading-none tracking-tight">
                        457.8 <span className="text-xs font-bold text-slate-500 font-mono">MT</span>
                      </div>
                      <p className="text-[9px] text-slate-400 font-mono mt-0.5 font-medium">Oct 24, 2026</p>
                    </div>
                    <span className="text-[8px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      Tolerance: ±0.15%
                    </span>
                  </div>

                  {/* Pill Controls */}
                  <div className="pt-1.5 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[8px] font-semibold tracking-tight shadow-xs">
                      Mass in Air
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[8px] font-medium">
                      Table 54B
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[8px] font-medium">
                      Tank Dips
                    </span>
                  </div>

                  {/* Curved Chart */}
                  <div className="relative pt-2 h-[88px]">
                    <div className="absolute top-1 right-2 bg-amber-500 text-white text-[7px] font-mono font-bold px-1.5 py-0.5 rounded-full shadow-xs">
                      Avg. 40°C
                    </div>
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                      <defs>
                        <linearGradient id="wfDeliveryGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.32" />
                          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.02" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="15" x2="200" y2="15" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="35" x2="200" y2="35" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="55" x2="200" y2="55" stroke="#f1f5f9" strokeWidth="1" />
                      <path d="M 0,44 Q 35,52 70,30 T 140,14 T 200,36 L 200,60 L 0,60 Z" fill="url(#wfDeliveryGrad)" />
                      <path d="M 0,44 Q 35,52 70,30 T 140,14 T 200,36" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
                      <circle cx="70" cy="30" r="3.5" fill="#F59E0B" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="140" cy="14" r="4" fill="#F59E0B" stroke="#ffffff" strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Flow Metrics Card */}
                  <div className="mt-2 bg-[#F0F6FA] p-3 rounded-2xl border border-[#D9E6F2] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                        <Fuel className="w-3 h-3 text-[#032AAC]" />
                        <span>Delivery Flow</span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-sm font-display font-black text-slate-900">350 MT/h</span>
                        <span className="text-[7px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full">
                          Stable rate
                        </span>
                      </div>
                    </div>
                    <svg className="w-12 h-6" viewBox="0 0 60 25">
                      <path d="M 0,18 Q 15,9 30,15 T 60,7" fill="none" stroke="#032AAC" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="mt-auto w-full py-2.5 rounded-xl bg-[#032AAC] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm">
                    <span>View Reconciled Tanks</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* ────────────────── SCREEN 2: ROB CHARTER (DARK) ────────────────── */}
              <div
                ref={(el) => { screenRefs.current[1] = el; }}
                className="s s2 absolute inset-0 bg-[#0a0e1a] font-sans text-white will-change-transform"
                style={{ clipPath: "inset(100% 0 0 0)" }}
              >
                <div
                  ref={(el) => { innerRefs.current[1] = el; }}
                  className="inner h-full flex flex-col justify-between pt-10 pb-5 px-4"
                >
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-white/80 pb-2 border-b border-white/10">
                    <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-white/70">
                      <X className="w-2.5 h-2.5" />
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-white leading-tight">Charter ROB</p>
                      <p className="text-[7px] font-mono text-white/50">Redelivery · 14:00 UTC</p>
                    </div>
                    <span className="text-[8px] font-mono text-[#3B82F6] font-bold">4 Tanks Active</span>
                  </div>

                  {/* Tank Stages Stepped Histogram */}
                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-white block">Tank Fuel Stages</span>
                    <div className="flex items-end gap-1.5 h-[64px] bg-white/[0.04] p-2 rounded-xl border border-white/10 mt-1">
                      <div className="w-[18%] h-[82%] bg-[#19B5C9] rounded-xs" />
                      <div className="w-[14%] h-[42%] bg-[#3B82F6] rounded-xs" />
                      <div className="w-[24%] h-[96%] bg-[#1B4FD1] rounded-xs" />
                      <div className="w-[18%] h-[62%] bg-[#60A5FA] rounded-xs" />
                      <div className="w-[26%] h-[78%] bg-[#0284C7] rounded-xs" />
                    </div>
                    <div className="flex justify-between text-[7px] font-mono text-white/40 pt-1">
                      <span>12:00</span>
                      <span>14:00</span>
                      <span>16:00</span>
                      <span>18:00</span>
                    </div>
                  </div>

                  {/* Fuel Breakdown Pills */}
                  <div className="grid grid-cols-2 gap-2 text-[9px] font-mono pt-1">
                    <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                      <span className="text-white/50 block text-[8px]">VLSFO Total</span>
                      <span className="text-white font-bold block text-sm">540.2 MT</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                      <span className="text-white/50 block text-[8px]">LSMGO Total</span>
                      <span className="text-white font-bold block text-sm">82.5 MT</span>
                    </div>
                  </div>

                  {/* Verified ROB Badge */}
                  <div className="mt-2 bg-[#121829] p-3 rounded-2xl border border-white/15 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-display font-black text-white">646 MT Total ROB</span>
                      <p className="text-[8px] font-mono text-white/60 mt-0.5">Charter Fuel Settled</p>
                    </div>
                    <span className="text-[8px] font-mono font-bold text-[#19B5C9] bg-[#19B5C9]/15 px-2 py-1 rounded-full border border-[#19B5C9]/30 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      Signed
                    </span>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="mt-auto w-full py-2.5 rounded-xl bg-[#3B82F6] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm">
                    <span>Export ROB Reconciliation</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* ────────────────── SCREEN 3: DEBUNKERING (MINT) ────────────────── */}
              <div
                ref={(el) => { screenRefs.current[2] = el; }}
                className="s s3 absolute inset-0 bg-white font-sans text-[#031038] will-change-transform"
                style={{ clipPath: "inset(100% 0 0 0)" }}
              >
                <div
                  ref={(el) => { innerRefs.current[2] = el; }}
                  className="inner h-full flex flex-col justify-between pt-10 pb-5 px-4"
                >
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-slate-700 pb-2 border-b border-slate-100">
                    <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
                      <ChevronLeft className="w-2.5 h-2.5" />
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] font-bold text-slate-800">Debunkering</span>
                      <p className="text-[7px] font-mono text-slate-500">Oct 24, 2026</p>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
                      <HelpCircle className="w-2.5 h-2.5" />
                    </div>
                  </div>

                  {/* Circular Radial Gauge */}
                  <div className="pt-2 flex flex-col items-center justify-center p-2 rounded-2xl bg-[#F0F8F6] border border-[#D2E7E2]">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-200"
                          strokeWidth="3.2"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-teal-600"
                          strokeDasharray="92, 100"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-base font-display font-black text-slate-900 leading-none">92%</span>
                        <span className="text-[6px] font-mono font-bold text-teal-700 tracking-wider uppercase mt-0.5">
                          Offloaded
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Split Pump Rate / Temp Cards */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                      <span className="text-[7px] font-mono font-bold text-slate-500 block uppercase tracking-wider">
                        Pump Rate
                      </span>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-xs font-black text-slate-900 font-mono">310 m³/h</span>
                        <TrendingUp className="w-3 h-3 text-blue-600" />
                      </div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                      <span className="text-[7px] font-mono font-bold text-slate-500 block uppercase tracking-wider">
                        Temp
                      </span>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-xs font-black text-slate-900 font-mono">38.5°C</span>
                        <TrendingDown className="w-3 h-3 text-amber-500" />
                      </div>
                    </div>
                  </div>

                  {/* Verification Note */}
                  <div className="mt-2 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-teal-700">
                      <CheckCircle2 className="w-3 h-3" />
                      <span className="text-[8px] font-bold">Removal Certified &amp; Locked</span>
                    </div>
                    <p className="text-[7px] text-slate-500 leading-relaxed mt-0.5">
                      Tank 3P: 310.4 MT → 26.25 MT. Seals #4892 verified.
                    </p>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="mt-auto w-full py-2.5 rounded-xl bg-teal-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm">
                    <span>Export Offload Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </div>

            {/* ─── FLOATING POP-OUT WIDGETS (Positioned nicely to the left of the phone) ─── */}
            {/* Floating Card 1: Delivery Flow */}
            <div
              ref={(el) => { floatingCardRefs.current[0] = el; }}
              className="floating-card on absolute -left-28 lg:-left-36 top-[130px] z-30 max-w-[210px]"
            >
              <div className="rounded-2xl p-3.5 shadow-2xl border border-l-[3px] border-l-[#F59E0B] bg-white/95 backdrop-blur-md border-[#D3E9F3] text-[#031038]">
                <div className="flex items-center gap-1.5 mb-1">
                  <Fuel className="w-3 h-3 text-[#F59E0B]" />
                  <span className="font-mono text-[9px] uppercase font-bold text-[#F59E0B] tracking-wider">
                    Flow Active
                  </span>
                </div>
                <p className="text-xs font-bold leading-tight">350 MT/h Pumping Rate</p>
                <p className="text-[9px] mt-1 font-mono text-[#031038]/60">
                  Stable delivery flow · ±0.15% BDN
                </p>
              </div>
            </div>

            {/* Floating Card 2: Total ROB */}
            <div
              ref={(el) => { floatingCardRefs.current[1] = el; }}
              className="floating-card absolute -left-28 lg:-left-36 top-[210px] z-30 max-w-[210px]"
            >
              <div className="rounded-2xl p-3.5 shadow-2xl border border-l-[3px] border-l-[#3B82F6] bg-[#031038]/95 backdrop-blur-md border-white/15 text-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[9px] uppercase font-bold text-[#3B82F6]">
                    Charter Settlement
                  </span>
                  <Lock className="w-2.5 h-2.5 text-[#3B82F6]" />
                </div>
                <p className="text-xs font-bold leading-tight">646 MT Total ROB</p>
                <p className="text-[9px] mt-1 font-mono text-white/60">
                  Dual-signed redelivery audit
                </p>
              </div>
            </div>

            {/* Floating Card 3: Debunkering Certified */}
            <div
              ref={(el) => { floatingCardRefs.current[2] = el; }}
              className="floating-card absolute -left-28 lg:-left-36 top-[240px] z-30 max-w-[210px]"
            >
              <div className="rounded-2xl p-3.5 shadow-2xl border border-l-[3px] border-l-emerald-500 bg-white/95 backdrop-blur-md border-[#D3E9F3] text-[#031038]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[9px] uppercase font-bold text-emerald-600">
                    Offload Finality
                  </span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                </div>
                <p className="text-xs font-bold leading-tight">92% Offload Certified</p>
                <p className="text-[9px] mt-1 font-mono text-emerald-700">
                  Tank 3P emptied &amp; sealed
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ─── STACKED FULL-HEIGHT CARDS LIST ─── */}
      <div className="space-y-[18px]">
        {WORKFLOWS.map((stage, idx) => (
          <div
            key={stage.id}
            ref={(el) => { cardRefs.current[idx] = el; }}
            className="relative rounded-[38px] p-8 sm:p-14 lg:p-16 h-[calc(100svh-32px)] min-h-[600px] flex flex-col justify-between overflow-hidden border border-t transition-all duration-500"
            style={{
              background: stage.lightBg,
              borderColor: stage.lightBorder,
            }}
          >
            {/* Card Top: Step tag */}
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: stage.accentColor }}
              />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#031038]/80">
                {stage.eyebrow}
              </span>
            </div>

            {/* Card Main: Heading, Muted sentence, and Service link */}
            <div className="max-w-[340px] sm:max-w-[440px] lg:max-w-[500px] my-auto space-y-5">
              <h3
                className="font-display font-semibold tracking-tight text-[#031038]"
                style={{
                  fontSize: "clamp(36px, 4.4vw, 68px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                  fontWeight: 650,
                }}
              >
                {stage.heading}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-[#031038]/70">
                {stage.sentence}
              </p>

              <div className="pt-2">
                <Link
                  href={stage.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#032AAC] text-white text-xs font-bold tracking-wide hover:bg-[#031038] transition-colors shadow-xs"
                >
                  <span>Explore {stage.tag}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card Bottom Indicator */}
            <div className="flex items-center justify-between text-xs font-mono pt-4 border-t text-[#031038]/40 border-[#031038]/10">
              <span>Space BQS Marine Engine</span>
              <span className="font-semibold" style={{ color: stage.accentColor }}>
                {stage.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Scoped CSS for the Bevel-style screen clip-path & floating animations */}
      <style jsx>{`
        .phone-container {
          will-change: transform, opacity, top;
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
    </div>
  );
}
