"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  X,
  ChevronLeft,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Lock,
  Fuel,
  CheckCircle2,
} from "lucide-react";
import IPhoneMockup from "@/app/components/IPhoneMockup";

// Phone scale: 0.94 produces ~292px width with the sleek Bevel iPhone chassis
const PHONE_SCALE = 0.94;

export function BevelWorkflowCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">

      {/* ─── CARD 1: BUNKER DELIVERY (Light Strain-style Theme) ─── */}
      <Link
        href="/services/bunker-delivery-survey"
        data-glass-depth
        data-glass-surface
        className="group relative rounded-[32px] sm:rounded-[36px] p-7 sm:p-8 flex flex-col justify-between overflow-hidden border border-[#D9E6F2] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5"
        style={{
          background: "var(--glass-surface)",
        }}
      >
        {/* Card Header Content */}
        <div className="relative z-20 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl sm:text-[28px] font-bold text-[#031038] tracking-tight group-hover:text-[#032AAC] transition-colors">
              Bunker delivery
            </h3>
            <div className="w-8 h-8 rounded-full bg-white/90 border border-slate-200/80 shadow-xs flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-white shrink-0">
              <ArrowUpRight className="w-4 h-4 text-[#031038] transition-transform duration-300 group-hover:rotate-45" />
            </div>
          </div>
          <p className="text-sm leading-relaxed text-[#031038]/70 max-w-[285px]">
            Check what was delivered against the delivery note (BDN), tank by tank with ASTM Table 54B precision.
          </p>
        </div>

        {/* Phone Frame: Top fully visible with Dynamic Island & metrics, bottom half cut off by card boundary */}
        <div className="relative mt-6 -mx-7 sm:-mx-8 -mb-8 h-[345px] sm:h-[370px] pt-7 sm:pt-8 overflow-hidden flex justify-center">
          <div className="transition-transform duration-500 ease-out group-hover:-translate-y-2.5">
            <IPhoneMockup scale={PHONE_SCALE} statusBarTheme="dark">
              <div className="h-full bg-white font-sans flex flex-col text-[#031038] select-none">
                {/* Screen Header Bar */}
                <div className="pt-2 px-3.5 flex items-center justify-between border-b border-slate-100/80 pb-1.5">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <X className="w-3 h-3" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 tracking-tight">
                    Delivery Score
                  </span>
                  <div className="w-5" />
                </div>

                {/* Score & BDN Match Row */}
                <div className="px-3.5 pt-2.5 flex items-start justify-between">
                  <div>
                    <div className="text-2xl font-display font-black text-[#031038] leading-none tracking-tight">
                      457.8 <span className="text-xs font-bold text-slate-500 font-mono">MT</span>
                    </div>
                    <p className="text-[9px] text-slate-400 font-mono mt-0.5 font-medium">Oct 24, 2026</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-[8px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/90 px-2 py-0.5 rounded-full">
                      BDN Match = 100%
                    </span>
                    <p className="text-[7px] text-slate-400 font-mono mt-0.5">Tolerance: ±0.15%</p>
                  </div>
                </div>

                {/* Pill Segmented Controls */}
                <div className="px-3.5 pt-2 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[8px] font-semibold tracking-tight shadow-xs">
                    Mass in Air
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[8px] font-medium">
                    Table 54B
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[8px] font-medium">
                    Tank Soundings
                  </span>
                </div>

                {/* Interactive Curve Chart with amber gradient */}
                <div className="relative px-3.5 pt-2 h-[88px]">
                  <div className="absolute top-1 right-5 bg-amber-500 text-white text-[7px] font-mono font-bold px-1.5 py-0.5 rounded-full shadow-xs">
                    Avg. 40°C
                  </div>
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                    <defs>
                      <linearGradient id="deliveryGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.32" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="15" x2="200" y2="15" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="0" y1="35" x2="200" y2="35" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="0" y1="55" x2="200" y2="55" stroke="#f1f5f9" strokeWidth="1" />
                    <path d="M 0,44 Q 35,52 70,30 T 140,14 T 200,36 L 200,60 L 0,60 Z" fill="url(#deliveryGrad)" />
                    <path d="M 0,44 Q 35,52 70,30 T 140,14 T 200,36" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
                    <circle cx="70" cy="30" r="3.5" fill="#F59E0B" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="140" cy="14" r="4" fill="#F59E0B" stroke="#ffffff" strokeWidth="2" />
                  </svg>
                </div>

                {/* Floating Pop-Out Widget (Like Bevel's "Daytime HR" card) */}
                <div className="mx-3 mt-1.5 bg-white/95 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/90 shadow-[0_10px_25px_-5px_rgba(3,16,56,0.14)] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                      <Fuel className="w-3 h-3 text-[#032AAC]" />
                      <span>Delivery Flow</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-base font-display font-black text-slate-900">350 MT/h</span>
                      <span className="text-[8px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-1.5 py-0.5 rounded-full">
                        Stable rate
                      </span>
                    </div>
                  </div>
                  <svg className="w-14 h-7" viewBox="0 0 60 25">
                    <path d="M 0,18 Q 15,9 30,15 T 60,7" fill="none" stroke="#032AAC" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </IPhoneMockup>
          </div>
        </div>
      </Link>

      {/* ─── CARD 2: ROB & ON/OFF-HIRE (Dark Sleep-style Theme) ─── */}
      <Link
        href="/services/rob-survey"
        data-glass-depth
        data-glass-surface
        className="group relative rounded-[32px] sm:rounded-[36px] p-7 sm:p-8 flex flex-col justify-between overflow-hidden border border-[#D5DFEC] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5"
        style={{
          background: "var(--glass-surface)",
        }}
      >
        {/* Card Header Content */}
        <div className="relative z-20 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl sm:text-[28px] font-bold text-[#031038] tracking-tight group-hover:text-[#032AAC] transition-colors">
              ROB &amp; on/off-hire
            </h3>
            <div className="w-8 h-8 rounded-full bg-white/80 border border-slate-200/80 shadow-xs flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-white shrink-0">
              <ArrowUpRight className="w-4 h-4 text-[#031038] transition-transform duration-300 group-hover:rotate-45" />
            </div>
          </div>
          <p className="text-sm leading-relaxed text-[#031038]/70 max-w-[285px]">
            Pair two surveys and settle charter fuel with a record both sides can follow.
          </p>
        </div>

        {/* Phone Frame: Dark Theme screen, top visible, bottom half cut off */}
        <div className="relative mt-6 -mx-7 sm:-mx-8 -mb-8 h-[345px] sm:h-[370px] pt-7 sm:pt-8 overflow-hidden flex justify-center">
          <div className="transition-transform duration-500 ease-out group-hover:-translate-y-2.5">
            <IPhoneMockup scale={PHONE_SCALE} statusBarTheme="light">
              <div className="h-full bg-[#0a0e1a] font-sans flex flex-col text-white select-none">
                {/* Dark Screen Header Bar */}
                <div className="pt-2 px-3.5 flex items-center justify-between border-b border-white/10 pb-1.5">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white/70">
                    <X className="w-3 h-3" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-white leading-tight">Charter ROB</p>
                    <p className="text-[7px] font-mono text-white/50">Redelivery · 14:00 UTC</p>
                  </div>
                  <div className="w-5" />
                </div>

                {/* Fuel Stages Title */}
                <div className="px-3.5 pt-2 flex items-center justify-between">
                  <p className="text-[10px] font-bold text-white tracking-tight">Tank Fuel Stages</p>
                  <span className="text-[8px] font-mono text-[#19B5C9] font-bold">4 Tanks Active</span>
                </div>

                {/* Sleep-style Stepped Histogram Bar Chart */}
                <div className="px-3.5 pt-1.5">
                  <div className="flex items-end gap-1.5 h-[58px] bg-white/[0.04] p-2 rounded-xl border border-white/10">
                    <div className="w-[18%] h-[82%] bg-[#19B5C9] rounded-sm transition-all" />
                    <div className="w-[14%] h-[42%] bg-[#3B82F6] rounded-sm transition-all" />
                    <div className="w-[24%] h-[96%] bg-[#1B4FD1] rounded-sm transition-all" />
                    <div className="w-[18%] h-[62%] bg-[#60A5FA] rounded-sm transition-all" />
                    <div className="w-[26%] h-[78%] bg-[#0284C7] rounded-sm transition-all" />
                  </div>
                  <div className="flex justify-between text-[7px] font-mono text-white/40 pt-1">
                    <span>12:00</span>
                    <span>14:00</span>
                    <span>16:00</span>
                    <span>18:00</span>
                  </div>
                </div>

                {/* Fuel Grade Breakdown Pills */}
                <div className="px-3.5 pt-2 grid grid-cols-2 gap-1.5 text-[8px] font-mono">
                  <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">
                    <span className="text-white/50 block">VLSFO</span>
                    <span className="text-white font-bold block text-[9px]">540.2 MT</span>
                  </div>
                  <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">
                    <span className="text-white/50 block">LSMGO</span>
                    <span className="text-white font-bold block text-[9px]">82.5 MT</span>
                  </div>
                </div>

                {/* Floating Pop-Out Widget (Like Bevel's "8h 30m Sleep Needed" card) */}
                <div className="mx-3 mt-2 bg-[#121829]/95 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-[0_12px_28px_rgba(0,0,0,0.55)] flex items-center justify-between">
                  <div>
                    <span className="text-base font-display font-black text-white">646 MT</span>
                    <p className="text-[8px] font-mono text-white/60 mt-0.5">Total ROB Certified</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[8px] font-mono font-bold text-[#19B5C9] bg-[#19B5C9]/10 px-2 py-1 rounded-full border border-[#19B5C9]/30">
                    <Lock className="w-2.5 h-2.5" />
                    <span>Locked &amp; Signed</span>
                  </div>
                </div>
              </div>
            </IPhoneMockup>
          </div>
        </div>
      </Link>

      {/* ─── CARD 3: DEBUNKERING (Fresh Sky/Mint Recovery-style Theme) ─── */}
      <Link
        href="/services/debunkering-survey"
        data-glass-depth
        data-glass-surface
        className="group relative rounded-[32px] sm:rounded-[36px] p-7 sm:p-8 flex flex-col justify-between overflow-hidden border border-[#D2E7E2] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5"
        style={{
          background: "var(--glass-surface)",
        }}
      >
        {/* Card Header Content */}
        <div className="relative z-20 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl sm:text-[28px] font-bold text-[#031038] tracking-tight group-hover:text-[#032AAC] transition-colors">
              Debunkering
            </h3>
            <div className="w-8 h-8 rounded-full bg-white/80 border border-slate-200/80 shadow-xs flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-white shrink-0">
              <ArrowUpRight className="w-4 h-4 text-[#031038] transition-transform duration-300 group-hover:rotate-45" />
            </div>
          </div>
          <p className="text-sm leading-relaxed text-[#031038]/70 max-w-[285px]">
            Record what left the tank, with before and after on a single certificate.
          </p>
        </div>

        {/* Phone Frame: Recovery landscape ring at top, bottom half cut off */}
        <div className="relative mt-6 -mx-7 sm:-mx-8 -mb-8 h-[345px] sm:h-[370px] pt-7 sm:pt-8 overflow-hidden flex justify-center">
          <div className="transition-transform duration-500 ease-out group-hover:-translate-y-2.5">
            <IPhoneMockup scale={PHONE_SCALE} statusBarTheme="dark">
              <div className="h-full bg-white font-sans flex flex-col text-[#031038] select-none">
                {/* Sky/Mint Landscape Banner & Circular Dial */}
                <div
                  className="pt-2 px-3.5 pb-2.5"
                  style={{
                    background: "linear-gradient(180deg, rgba(165, 211, 232, 0.45) 0%, rgba(255, 255, 255, 0.95) 100%)",
                  }}
                >
                  <div className="flex items-center justify-between text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-white/80 border border-slate-200/60 flex items-center justify-center">
                      <ChevronLeft className="w-3 h-3" />
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] font-bold text-slate-800">Debunkering</span>
                      <p className="text-[7px] font-mono text-slate-500">Oct 24, 2026</p>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-white/80 border border-slate-200/60 flex items-center justify-center">
                      <HelpCircle className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Circular Radial Gauge (Like Bevel's 70% Recovery Dial) */}
                  <div className="mt-2 flex justify-center">
                    <div className="relative w-18 h-18 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-100"
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
                </div>

                {/* Floating Split Card (Like Bevel's HRV / HR split pill) */}
                <div className="px-3.5 pt-1.5 grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="text-[7px] font-mono font-bold text-slate-500 block uppercase tracking-wider">
                      Pump Rate
                    </span>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs font-black text-slate-900 font-mono">310 m³/h</span>
                      <TrendingUp className="w-3 h-3 text-blue-600" />
                    </div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="text-[7px] font-mono font-bold text-slate-500 block uppercase tracking-wider">
                      Temp
                    </span>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs font-black text-slate-900 font-mono">38.5°C</span>
                      <TrendingDown className="w-3 h-3 text-amber-500" />
                    </div>
                  </div>
                </div>

                {/* Floating Verification Note */}
                <div className="mx-3.5 mt-2 bg-white/95 p-2 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-1.5 text-teal-700">
                    <CheckCircle2 className="w-3 h-3" />
                    <span className="text-[8px] font-bold">Removal Certified &amp; Locked</span>
                  </div>
                  <p className="text-[7px] text-slate-500 leading-relaxed mt-0.5">
                    Tank 3P: 310.4 MT → 26.25 MT. Seals #4892 verified.
                  </p>
                </div>
              </div>
            </IPhoneMockup>
          </div>
        </div>
      </Link>

    </div>
  );
}

export default BevelWorkflowCards;
