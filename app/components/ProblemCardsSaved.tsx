"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import {
  MASTER_OCEAN_FLOW,
  MASTER_JAMES_SMITH_FOOTER,
  MASTER_TOPO_WAVY_BASE,
} from "./problem-card-waves";

export type SavedCardVariation = "ocean-flow" | "topo-footer";

export const SAVED_CARD_OPTIONS: { id: SavedCardVariation; label: string; badge: string }[] = [
  { id: "ocean-flow", label: "Ocean Flow", badge: "Marine Strata" },
  { id: "topo-footer", label: "Topographic Base", badge: "Wavy Guilloché" },
];

export const SAVED_FRICTIONS = [
  {
    num: "01",
    title: "Paper that gets retyped",
    bold: "Bunker delivery notes, soundings, and ullage sheets sit on clipboards.",
    desc: "Every manual re-entry between the surveyor's observation and the final report is a chance for a dispute.",
  },
  {
    num: "02",
    title: "Formulas that quietly break",
    bold: "VCF spreadsheets and density lookups with unverified math.",
    desc: "A 0.0008 error in a volume correction factor on 3,000 MT of VLSFO swings thousands of dollars.",
  },
  {
    num: "03",
    title: "Files nobody can find",
    bold: "Three surveyors, four email threads, and six versions of a draft report.",
    desc: "When the charterer questions a figure three weeks later, finding the source photo across WhatsApp threads is painful.",
  },
];

/**
 * Saved Card Designs: Topographic Base & Ocean Flow
 * Preserved in codebase memory for anytime card layouts are needed on Space BQS.
 */
export function ProblemCardsSaved({
  defaultVariation = "ocean-flow",
  showSwitcher = true,
}: {
  defaultVariation?: SavedCardVariation;
  showSwitcher?: boolean;
}) {
  const [variation, setVariation] = useState<SavedCardVariation>(defaultVariation);

  return (
    <div className="w-full">
      {showSwitcher && (
        <div className="flex items-center justify-center gap-2 mb-8">
          {SAVED_CARD_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setVariation(opt.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                variation === opt.id
                  ? "bg-[#032AAC] text-white shadow-sm"
                  : "bg-white text-[#031038]/70 border border-[#D3E9F3] hover:border-[#032AAC]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SAVED_FRICTIONS.map((f, i) => (
          <div
            key={f.num}
            className="relative overflow-hidden rounded-[28px] p-7 sm:p-8 pb-0 sm:pb-0 bg-white border border-[#D3E9F3] shadow-xs flex flex-col justify-between hover:border-[#032AAC] hover:shadow-md transition-all duration-300 group"
          >
            {/* Top-right diagonal striped hatch pattern */}
            <div
              className="absolute top-0 right-0 w-44 h-44 pointer-events-none rounded-tr-[28px] overflow-hidden opacity-60 z-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, rgba(3,16,56,0.07) 0, rgba(3,16,56,0.07) 1.5px, transparent 1.5px, transparent 9px)",
                maskImage: "radial-gradient(circle at top right, black 30%, transparent 75%)",
                WebkitMaskImage: "radial-gradient(circle at top right, black 30%, transparent 75%)",
              }}
            />

            <div className="relative z-10 flex flex-col justify-between h-full pt-1">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#D3E9F3]/60">
                  <span className="font-mono text-xs font-bold text-[#FF6A3D] tracking-widest">
                    FRICTION {f.num}
                  </span>
                  <AlertTriangle className="w-4 h-4 text-[#FF6A3D]/80" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-[#031038]">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-[#031038]/85 leading-snug">
                  {f.bold}
                </p>
                <p className="mt-2.5 text-xs text-[#031038]/60 leading-relaxed">
                  {f.desc}
                </p>
              </div>

              {/* 1. Ocean Flow (Clean, Non-Boxy Waves, No Text) */}
              {variation === "ocean-flow" && (() => {
                const flow = MASTER_OCEAN_FLOW[i % MASTER_OCEAN_FLOW.length];
                return (
                  <div className="relative mt-8 -mx-7 sm:-mx-8 h-28 sm:h-32 overflow-hidden rounded-b-[28px] flex items-end">
                    <svg viewBox="0 0 400 135" preserveAspectRatio="none" className="w-full h-full">
                      {flow.waves.map((w, wIdx) => (
                        <path key={wIdx} d={w.d} fill={w.fill} opacity={w.opacity} />
                      ))}
                      {flow.crestStroke && (
                        <path d={flow.crestStroke} fill="none" stroke="#19B5C9" strokeWidth="2.2" opacity="0.95" />
                      )}
                    </svg>
                  </div>
                );
              })()}

              {/* 2. Topographic Base (100% Wavy Top Edge, No Rectangle) */}
              {variation === "topo-footer" && (() => {
                const baseWave = MASTER_TOPO_WAVY_BASE[i % MASTER_TOPO_WAVY_BASE.length];
                const lines = MASTER_JAMES_SMITH_FOOTER[i % MASTER_JAMES_SMITH_FOOTER.length];
                return (
                  <div className="relative mt-8 -mx-7 sm:-mx-8 h-28 sm:h-32 overflow-hidden rounded-b-[28px] flex items-end">
                    <svg
                      viewBox="0 0 400 135"
                      preserveAspectRatio="none"
                      className="w-full h-full p-0.5 opacity-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-y-105 origin-bottom"
                    >
                      <path d={baseWave} fill="#032AAC" opacity="0.97" />
                      <path d={baseWave} fill="#031038" opacity="0.25" transform="translate(0, 10)" />
                      {lines.map((d, lineIdx) => {
                        const isCrest = lineIdx === 0;
                        return (
                          <path
                            key={lineIdx}
                            d={d}
                            fill="none"
                            stroke={isCrest ? "#19B5C9" : "#FFFFFF"}
                            strokeWidth={isCrest ? "2.4" : "1.65"}
                            strokeLinecap="round"
                            style={{ opacity: isCrest ? 0.98 : 0.76 + (lineIdx % 4) * 0.06 }}
                          />
                        );
                      })}
                    </svg>
                  </div>
                );
              })()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
