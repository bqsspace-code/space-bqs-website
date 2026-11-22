import type { Metadata } from "next";
import { Section, AnswerBlock, CtaRow, Breadcrumbs } from "../../components/ui";
import { Calculator, ShieldCheck, CheckCircle2, AlertOctagon, Layers, ArrowRight, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Deterministic ASTM 54B Calculation Engine",
  description:
    "Explore the Space BQS calculation core: deterministic ASTM D1250 Table 54B volume correction, tank strapping curve interpolation, free water deduction, and mass conversion.",
};

export default function Page() {
  return (
    <div className="space-y-12 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/features", label: "Features" },
            { href: "/features/calculation-audit", label: "Calculation & Audit" },
          ]}
        />
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            Calculation Engine v1.0.0
          </span>
          <span className="text-xs text-slate-500 font-mono">ASTM D1250 Table 54B</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl lg:text-5xl">
          Deterministic ASTM Table 54B calculation engine
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          From deck tape soundings to certified metric tonnes: every calculation step is mathematically locked, transparent, and auditable per line.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnswerBlock>
          <p>
            The Space BQS calculation engine is deterministic: identical sounding inputs, temperatures, and fuel densities will produce the exact same metric tonnage on any device, web or offline. It replaces arbitrary spreadsheet macros with standardized ASTM D1250 Table 54B petroleum measurement algorithms, enforcing zero extrapolation and per-line audit trails.
          </p>
        </AnswerBlock>
      </div>

      {/* 5-Step Pipeline */}
      <Section eyebrow="Mathematical Pipeline" title="Five deterministic steps from tape to metric tonnes">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-sm font-bold text-white font-mono">
                1
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ocean-950">
                  Observed Volume from Tank Strapping Tables
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  The surveyor records tape sounding (liquid depth in metres) or ullage (empty height from reference point). The engine looks up the vessel&apos;s digitized tank calibration table and performs 1D linear interpolation between calibration intervals. Exact interval hits are explicitly flagged in the audit register.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-sm font-bold text-white font-mono">
                2
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ocean-950">
                  Free Water Volume Deduction
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Water paste readings identify settled water at the tank bottom. The engine calculates free water volume from the lower strapping table bounds and subtracts it directly from observed volume:
                </p>
                <div className="mt-3 rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-800 border border-slate-200">
                  Net Observed Volume (m³) = Total Observed Volume (m³) − Free Water Volume (m³)
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Negative results or free water exceeding observed volume are immediately rejected per line to prevent corrupted survey records.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-sm font-bold text-white font-mono">
                3
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ocean-950">
                  ASTM D1250 Table 54B Volume Correction Factor (VCF)
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Heated marine fuel expands in volume. To normalize volume to standard 15°C conditions, the engine executes a bilinear interpolation across the official ASTM D1250-04 Table 54B grid using the fuel&apos;s standard density at 15°C (kg/L) and observed tank temperature (°C).
                </p>
                <div className="mt-3 rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-800 border border-slate-200">
                  Standard Volume at 15°C (m³) = Net Observed Volume (m³) × Table 54B VCF
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  If density or temperature falls outside standard petroleum boundaries, the engine throws an explicit out-of-range flag rather than extrapolating or guessing.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-sm font-bold text-white font-mono">
                4
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ocean-950">
                  Mass Conversion to Metric Tonnes (MT)
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Charterparties and bunker delivery notes settle custody transfer by mass, not volume. Standard volume is multiplied by density and converted to metric tonnes:
                </p>
                <div className="mt-3 rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-800 border border-slate-200">
                  Mass (kg) = Standard Volume (m³) × Density at 15°C (kg/m³) &nbsp;|&nbsp; Mass in MT = Mass (kg) ÷ 1,000
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-sm font-bold text-white font-mono">
                5
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ocean-950">
                  Precision Rounding &amp; Per-Line Audit Trail
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Internal arithmetic preserves 64-bit IEEE 754 precision to avoid cascading rounding drift. Rounding is applied only at export according to industry standards: Volume to 3 decimals, VCF to 4 decimals, and Metric Tonnes to 3 decimals. Every line stores its source table ID, revision hash, and method.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Worked Example */}
      <Section eyebrow="Benchmark" title="Worked mathematical validation check">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h3 className="font-display text-lg font-bold text-ocean-950">
            Real-World Calculation Check: VLSFO Heavy Fuel Oil
          </h3>
          <p className="mt-2 text-xs text-slate-600">
            Standard engine test case verifying intermediate steps and final metric tonnage output:
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white p-4 border border-slate-200">
              <span className="text-[11px] font-mono uppercase text-slate-500">Observed Sounding</span>
              <p className="mt-1 font-display text-xl font-bold text-ocean-950">4.850 m</p>
              <span className="text-[11px] text-slate-500">Net Volume: 498.020 m³</span>
            </div>
            <div className="rounded-xl bg-white p-4 border border-slate-200">
              <span className="text-[11px] font-mono uppercase text-slate-500">Fuel Density @ 15°C</span>
              <p className="mt-1 font-display text-xl font-bold text-ocean-950">0.9500 kg/L</p>
              <span className="text-[11px] text-slate-500">Grade: VLSFO 380 cSt</span>
            </div>
            <div className="rounded-xl bg-white p-4 border border-slate-200">
              <span className="text-[11px] font-mono uppercase text-slate-500">Observed Temperature</span>
              <p className="mt-1 font-display text-xl font-bold text-ocean-950">40.0°C</p>
              <span className="text-[11px] text-slate-500">Table 54B VCF: 0.9677</span>
            </div>
            <div className="rounded-xl bg-white p-4 border border-ocean-600 bg-ocean-50/30">
              <span className="text-[11px] font-mono uppercase text-ocean-700 font-semibold">Certified Mass</span>
              <p className="mt-1 font-display text-xl font-bold text-ocean-700">457.819 MT</p>
              <span className="text-[11px] text-ocean-600 font-medium">Locked custody transfer</span>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <CtaRow />
        </div>
      </Section>
    </div>
  );
}
