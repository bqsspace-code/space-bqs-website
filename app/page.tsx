import type { Metadata } from "next";
import Link from "next/link";
import {
  Fuel,
  Ship,
  ArrowDownToLine,
  ArrowUpRight,
  LockKeyhole,
  WifiOff,
  Check,
  FileText,
  Table2,
} from "lucide-react";
import {
  Section,
  Eyebrow,
  H2,
  AnswerBlock,
  CtaRow,
  Faq,
  Breadcrumbs,
} from "./components/ui";
import LiquidTankStage from "./components/LiquidTankStage";
import KineticWave from "./components/KineticWave";
import WaveDivider from "./components/WaveDivider";
import WeightText from "./components/WeightText";

export const metadata: Metadata = {
  title: "BQS Software for Marine Surveyors — Capture, Calculate, Certify",
  description:
    "Space BQS is software for bunker surveyors and survey firms: offline mobile capture, temperature-corrected MT engine, locked certificates, fleet dashboard. Quantity-only.",
};

const FAQ_ITEMS = [
  {
    q: "Are you a survey company?",
    a: "No. We make software for survey firms. We do not attend vessels.",
  },
  {
    q: "Which jobs does it cover?",
    a: "Bunker delivery, ROB (including on-hire and off-hire), and debunkering.",
  },
  {
    q: "Does it do lab or quality testing?",
    a: "No. It is quantity only. BDN numbers are recorded for cross-reference.",
  },
  {
    q: "How do we evaluate it?",
    a: "Book a 20-minute demo. We quote a team license after we know your team size and volume.",
  },
];

/* ─── OfficePreview (Section 4 Mock Browser) ─── */
function OfficePreview() {
  return (
    <div className="rounded-3xl overflow-hidden border border-[#D3E9F3] bg-white shadow-xl">
      {/* Chrome bar */}
      <div className="bg-[#EAF4F9]/80 border-b border-[#D3E9F3] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#A5D3E8]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#A5D3E8]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#A5D3E8]" />
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#031038]/60">
          <span>Space BQS / Surveys</span>
          <LockKeyhole className="w-3 h-3 text-[#031038]/40" />
        </div>
        <div className="w-10" />
      </div>

      {/* Inside browser: 94px sidebar + Survey register panel */}
      <div className="flex min-h-[320px]">
        {/* 94px sidebar */}
        <div className="w-[94px] border-r border-[#D3E9F3] bg-[#F7FBFD]/60 p-3 flex flex-col justify-between shrink-0 select-none">
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-1 text-[#032AAC] font-display font-black text-xs px-1">
              <span>≈</span>
              <span className="tracking-tighter">BQS</span>
            </div>
            {/* Nav items */}
            <div className="space-y-1">
              <div className="bg-[#EAF4F9] text-[#032AAC] font-semibold text-[10px] px-2 py-1.5 rounded-lg flex items-center">
                Surveys
              </div>
              <div className="text-[#031038]/50 text-[10px] px-2 py-1.5 rounded-lg">
                Vessels
              </div>
              <div className="text-[#031038]/50 text-[10px] px-2 py-1.5 rounded-lg">
                Team
              </div>
            </div>
          </div>
          <div className="text-[#031038]/40 text-[10px] px-2 py-1">
            Settings
          </div>
        </div>

        {/* Survey register panel */}
        <div className="flex-1 p-5 sm:p-6 bg-white space-y-4">
          <div>
            <h4 className="font-display font-bold text-sm text-[#031038]">
              Survey register
            </h4>
            <p className="text-[11px] text-[#031038]/50 font-medium">
              Bunker delivery · Quantity only
            </p>
          </div>

          {/* 3-cell summary strip */}
          <div className="grid grid-cols-3 gap-2 bg-[#F7FBFD] border border-[#D3E9F3] rounded-2xl p-3">
            <div>
              <span className="text-[10px] text-[#031038]/45 font-mono block uppercase">Survey no.</span>
              <span className="font-mono text-xs font-bold text-[#031038] block mt-0.5">BQS-2026-0042</span>
            </div>
            <div>
              <span className="text-[10px] text-[#031038]/45 font-mono block uppercase">Grade</span>
              <span className="font-mono text-xs font-bold text-[#031038] block mt-0.5">VLSFO</span>
            </div>
            <div>
              <span className="text-[10px] text-[#031038]/45 font-mono block uppercase">Mass in air</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#032AAC] tabular-nums block mt-0.5">457.819 MT</span>
            </div>
          </div>

          {/* Table Tank / VCF / Review */}
          <div className="border border-[#D3E9F3] rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 bg-[#EAF4F9]/50 px-3 py-1.5 text-[10px] font-mono font-semibold text-[#031038]/60 border-b border-[#D3E9F3]">
              <span>Tank</span>
              <span>VCF</span>
              <span className="text-right">Review</span>
            </div>
            {[
              { tank: "1P", vcf: "0.9677" },
              { tank: "1S", vcf: "0.9677" },
              { tank: "2C", vcf: "0.9677" },
            ].map((row, i) => (
              <div
                key={row.tank}
                className={`grid grid-cols-3 px-3 py-2 text-xs font-mono items-center ${
                  i < 2 ? "border-b border-[#D3E9F3]/50" : ""
                }`}
              >
                <span className="font-bold text-[#031038]">{row.tank}</span>
                <span className="text-[#031038]/70 tabular-nums">{row.vcf}</span>
                <span className="text-right font-medium text-[#032AAC]">✓ Checked</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-[#D3E9F3]/60 text-[10px] font-mono">
            <span className="text-[#031038]/40">Engine v1.0.0</span>
            <span className="font-semibold text-[#032AAC] flex items-center gap-1">
              <span>🔒</span> FINALISED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MobilePreview (Section 5 Mock Phone) ─── */
function MobilePreview() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[310px] rounded-[40px] p-3.5 bg-[#031038] shadow-2xl relative border-4 border-[#031038]">
        {/* Notch */}
        <div className="w-28 h-4 bg-[#031038] rounded-b-xl mx-auto absolute top-3.5 left-1/2 -translate-x-1/2 z-20" />

        {/* Screen */}
        <div className="rounded-[28px] overflow-hidden bg-white p-4 pt-6 space-y-3.5">
          {/* Status row */}
          <div className="flex items-center justify-between pb-2 border-b border-[#D3E9F3]/60">
            <span className="font-display font-bold text-xs text-[#031038]">Space BQS</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EAF4F9] text-[#032AAC] text-[10px] font-semibold border border-[#D3E9F3]">
              <WifiOff className="w-3 h-3 text-[#032AAC]" />
              Offline
            </span>
          </div>

          {/* Breadcrumb */}
          <p className="text-[10px] font-mono text-[#031038]/50">
            Vessel &gt; Tanks &gt; Review
          </p>

          {/* Headings */}
          <div>
            <h3 className="font-display font-bold text-base text-[#031038]">
              Tank reading
            </h3>
            <p className="text-xs text-[#031038]/60 mt-0.5">
              Tank 1P · VLSFO
            </p>
          </div>

          {/* 4 bordered field rows with primary checkmarks */}
          <div className="space-y-2">
            {[
              { label: "Reading mode", value: "Ullage" },
              { label: "Net volume", value: "212.400 m³" },
              { label: "Temperature", value: "40°C" },
              { label: "Density @ 15°C", value: "0.9500 kg/L" },
            ].map((field) => (
              <div
                key={field.label}
                className="flex items-center justify-between p-2.5 rounded-xl border border-[#D3E9F3] bg-[#F7FBFD] text-xs"
              >
                <div>
                  <span className="text-[10px] text-[#031038]/50 block font-mono">{field.label}</span>
                  <span className="font-mono font-semibold text-[#031038] tabular-nums">{field.value}</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-[#EAF4F9] flex items-center justify-center text-[#032AAC]">
                  <Check className="w-3 h-3 text-[#032AAC]" strokeWidth={2.5} />
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-[#D3E9F3]/60 text-center">
            <p className="text-[10px] font-mono font-semibold text-[#032AAC]">
              ✓ Saved on device · 72 h offline lease
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ReportPreview (Section 7 Deliverables Mock) ─── */
function ReportPreview() {
  return (
    <div className="relative pt-6 pb-4 max-w-lg mx-auto">
      {/* Tilted Excel card behind (-5deg) */}
      <div className="rounded-3xl p-6 bg-[#EAF4F9] border border-[#D3E9F3] shadow-md transform -rotate-5 transition-transform hover:rotate-0 duration-300">
        <div className="flex items-center gap-2.5 text-[#032AAC]">
          <Table2 className="w-5 h-5 text-[#032AAC]" />
          <span className="font-display font-bold text-sm text-[#031038]">Excel / 4 sheets</span>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2 text-[10px] font-mono text-[#031038]/60">
          <div className="rounded-lg bg-white/70 p-1.5 border border-[#D3E9F3]/60 text-center">
            Sheet 1
          </div>
          <div className="rounded-lg bg-white/70 p-1.5 border border-[#D3E9F3]/60 text-center">
            Sheet 2
          </div>
          <div className="rounded-lg bg-white/70 p-1.5 border border-[#D3E9F3]/60 text-center">
            Sheet 3
          </div>
          <div className="rounded-lg bg-white/70 p-1.5 border border-[#D3E9F3]/60 text-center">
            Sheet 4
          </div>
        </div>
        <p className="mt-2.5 text-[11px] text-[#031038]/50">
          Particulars · Tank readings · Table 54B VCF · Audit log
        </p>
      </div>

      {/* Certificate card in front */}
      <div className="rounded-3xl p-6 sm:p-7 bg-white/95 border border-[#D3E9F3] shadow-2xl relative -mt-14 sm:-mt-16 ml-4 sm:ml-8 backdrop-blur-md">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D3E9F3]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#032AAC]" />
            <span className="font-display font-bold text-xs text-[#031038]">
              Space BQS / Certificate
            </span>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FF6A3D]/10 text-[#FF6A3D] text-[10px] font-mono font-bold">
            <LockKeyhole className="w-2.5 h-2.5 text-[#FF6A3D]" />
            LOCKED
          </span>
        </div>

        {/* Certificate body */}
        <div className="py-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#031038]/50">Document</span>
            <span className="font-mono text-xs font-bold text-[#031038]">BQS-2026-0042</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#031038]/50">Total mass in air</span>
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#032AAC] tabular-nums">
              457.819 MT
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono pt-1">
            <span className="text-[#031038]/50">Factors applied</span>
            <span className="text-[#031038]/70 tabular-nums">0.9500 / 40°C / 0.9677</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#D3E9F3] flex items-center justify-between text-[10px] font-mono text-[#031038]/40">
          <span>PDF certificate · Finalised record</span>
          <span className="text-[#032AAC] font-semibold">Engine v1.0.0</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* ──────────── HERO ──────────── */}
      <section
        className="relative overflow-hidden pt-28 pb-0 min-h-screen min-h-[100dvh] flex flex-col justify-between"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 20%, #FFFFFF 0%, #EAF4F9 50%, #D3E9F3 100%)",
        }}
      >
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />

        <div className="relative mx-auto max-w-[1000px] px-4 w-full flex-1 flex flex-col justify-center my-auto">
          <div className="flex flex-col items-center text-center space-y-7 pt-4 pb-6">
            <WeightText
              tag="h1"
              mode="cursor-radius"
              restWeight={300}
              activeWeight={800}
              radius={160}
              activeColor="#032AAC"
              baseColor="#031038"
              accentColor="#19B5C9"
              className="font-display text-[clamp(34px,5.6vw,74px)] leading-[1.08] tracking-[-0.03em] max-w-4xl w-full mx-auto"
            >
              Engineered for the deck.
              <br className="hidden sm:inline" />
              {" "}Calibrated for absolute proof.
            </WeightText>

            <p className="text-lg sm:text-xl max-w-2xl leading-relaxed" style={{ color: "rgba(3,16,56,0.68)" }}>
              Space BQS turns raw deck soundings into ASTM-corrected, tamper-proof bunker certificates in seconds.
            </p>

            <div className="pt-2">
              <CtaRow className="justify-center" />
            </div>

            {/* Feature trust chips */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 pt-2 text-xs font-medium text-[#031038]/70">
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#032AAC]" strokeWidth={2.5} />
                72h offline deck capture
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#032AAC]" strokeWidth={2.5} />
                ASTM D1250-04 Table 54B
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#032AAC]" strokeWidth={2.5} />
                Immutable SHA-256 lock
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#032AAC]" strokeWidth={2.5} />
                Quantity-only · Zero dispute
              </span>
            </div>
          </div>
        </div>

        {/* Hero water — Kinetic Wave at base */}
        <div className="relative w-full shrink-0">
          <KineticWave
            mode="toward"
            colors={["#A5D3E8", "#1B4FD1", "#032AAC"]}
            height={130}
          />
        </div>
      </section>

      {/* ──────────── PINNED LIQUID TANK STORY ──────────── */}
      <LiquidTankStage />

      {/* ──────────── SECTION 1 — TRUST STRIP ──────────── */}
      <section id="section-trust" className="py-8 bg-[#F7FBFD] border-b border-[#D3E9F3]/60">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[10px] font-mono text-[#031038]/50 uppercase tracking-widest">
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#032AAC] inline-block mr-2" />
              <span>Engine v1.0.0</span>
            </div>
            <span>ASTM D1250-04 Table 54B</span>
            <span>VLSFO · HFO · MGO · LSMGO · ULSFO</span>
            <span>Ullage or sounding</span>
            <span>In air or in vacuum</span>
          </div>
        </div>
      </section>

      {/* ──────────── SECTION 2 — WORKFLOWS ──────────── */}
      <section id="section-workflows" className="pt-20 lg:pt-24 pb-0 bg-mist-100">
        <div className="mx-auto max-w-6xl px-6">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#D3E9F3]/70">
            <div>
              <Eyebrow>Three workflows. One engine.</Eyebrow>
              <H2>Every quantity job.<br />The same confidence.</H2>
            </div>
            <p className="max-w-[290px] text-sm text-[#031038]/65 leading-relaxed font-normal">
              From delivery to fuel remaining on board, keep the reading and the proof together.
            </p>
          </div>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 pb-20">
            {/* /services/bunker-delivery-survey */}
            <Link
              href="/services/bunker-delivery-survey"
              className="group rounded-3xl p-7 bg-white/85 border border-[#D3E9F3] transition-all duration-300 hover:border-[#A5D3E8] hover:shadow-xl hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Fuel className="w-[26px] h-[26px] text-[#032AAC]" strokeWidth={1.3} />
                  <span className="font-mono text-xs text-[#031038]/40 tracking-wider">01</span>
                </div>
                <h3 className="mt-10 font-display text-xl font-bold text-[#031038] group-hover:text-[#032AAC] transition-colors">
                  Bunker delivery
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#031038]/65">
                  Measure what came aboard and compare it with the BDN.
                </p>
              </div>
              <div className="mt-8 pt-4 flex items-center justify-between text-xs font-semibold text-[#032AAC] border-t border-[#D3E9F3]/40">
                <span>See workflow</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>

            {/* /services/rob-survey */}
            <Link
              href="/services/rob-survey"
              className="group rounded-3xl p-7 bg-white/85 border border-[#D3E9F3] transition-all duration-300 hover:border-[#A5D3E8] hover:shadow-xl hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Ship className="w-[26px] h-[26px] text-[#032AAC]" strokeWidth={1.3} />
                  <span className="font-mono text-xs text-[#031038]/40 tracking-wider">02</span>
                </div>
                <h3 className="mt-10 font-display text-xl font-bold text-[#031038] group-hover:text-[#032AAC] transition-colors">
                  ROB survey
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#031038]/65">
                  Record what is left on board for on-hire and off-hire legs.
                </p>
              </div>
              <div className="mt-8 pt-4 flex items-center justify-between text-xs font-semibold text-[#032AAC] border-t border-[#D3E9F3]/40">
                <span>See workflow</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>

            {/* /services/debunkering-survey */}
            <Link
              href="/services/debunkering-survey"
              className="group rounded-3xl p-7 bg-white/85 border border-[#D3E9F3] transition-all duration-300 hover:border-[#A5D3E8] hover:shadow-xl hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <ArrowDownToLine className="w-[26px] h-[26px] text-[#032AAC]" strokeWidth={1.3} />
                  <span className="font-mono text-xs text-[#031038]/40 tracking-wider">03</span>
                </div>
                <h3 className="mt-10 font-display text-xl font-bold text-[#031038] group-hover:text-[#032AAC] transition-colors">
                  Debunkering
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#031038]/65">
                  Prove how much fuel was removed from the vessel.
                </p>
              </div>
              <div className="mt-8 pt-4 flex items-center justify-between text-xs font-semibold text-[#032AAC] border-t border-[#D3E9F3]/40">
                <span>See workflow</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          </div>
        </div>

        {/* Closed by WaveDivider */}
        <WaveDivider
          direction="up"
          layers={3}
          colors={["#A5D3E8", "#D3E9F3", "#EAF4F9"]}
          height={80}
        />
      </section>

      {/* ──────────── SECTION 3 — HOW IT WORKS ──────────── */}
      <Section
        align="center"
        className="bg-[#F7FBFD]"
      >
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow className="justify-center">How it works</Eyebrow>
          <H2>Capture. Calculate. Prove.</H2>
          <p className="mt-3 text-base text-[#031038]/65">
            A clear path from the tank reading to the client's report.
          </p>
        </div>

        {/* Ordered 3-column list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 text-left">
          {/* 01 Capture */}
          <div className="border-t border-[#D3E9F3] relative pt-6 flex flex-col">
            <div className="w-2 h-2 rounded-full bg-[#032AAC] absolute -top-1 left-0" />
            <span className="font-mono text-xs font-semibold text-[#032AAC] tracking-widest mb-3">
              01
            </span>
            <h3 className="font-display text-xl font-bold text-[#031038] tracking-tight mb-2.5">
              Capture
            </h3>
            <p className="text-sm leading-relaxed text-[#031038]/65 max-w-[310px]">
              Surveyors enter ullage or sounding, temperature, and free water per tank. Works offline on deck.
            </p>
          </div>

          {/* 02 Calculate */}
          <div className="border-t border-[#D3E9F3] relative pt-6 flex flex-col">
            <div className="w-2 h-2 rounded-full bg-[#032AAC] absolute -top-1 left-0" />
            <span className="font-mono text-xs font-semibold text-[#032AAC] tracking-widest mb-3">
              02
            </span>
            <h3 className="font-display text-xl font-bold text-[#031038] tracking-tight mb-2.5">
              Calculate
            </h3>
            <p className="text-sm leading-relaxed text-[#031038]/65 max-w-[310px]">
              The engine reads the strapping table, deducts water, applies VCF, and gives mass in MT.
            </p>
          </div>

          {/* 03 Prove */}
          <div className="border-t border-[#D3E9F3] relative pt-6 flex flex-col">
            <div className="w-2 h-2 rounded-full bg-[#032AAC] absolute -top-1 left-0" />
            <span className="font-mono text-xs font-semibold text-[#032AAC] tracking-widest mb-3">
              03
            </span>
            <h3 className="font-display text-xl font-bold text-[#031038] tracking-tight mb-2.5">
              Prove
            </h3>
            <p className="text-sm leading-relaxed text-[#031038]/65 max-w-[310px]">
              A supervisor finalises. The survey locks. Clients get a PDF and Excel they can check.
            </p>
          </div>
        </div>
      </Section>

      {/* ──────────── SECTION 4 — IN THE OFFICE ──────────── */}
      <section className="pt-20 lg:pt-24 pb-0 bg-mist-100">
        <div className="mx-auto max-w-6xl px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left col */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Eyebrow>In the office</Eyebrow>
                <H2>Once finalised, it stays put.</H2>
                <p className="mt-4 text-base leading-relaxed text-[#031038]/65">
                  Supervisors review before a report is issued. A finalised survey is locked. It cannot be edited or deleted.
                </p>
              </div>

              {/* Status chips */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono border border-[#031038]/20 text-[#031038]/60 bg-transparent">
                  DRAFT
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono border border-[#031038]/20 text-[#031038]/60 bg-transparent">
                  CALCULATED
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono border border-[#031038]/20 text-[#031038]/60 bg-transparent">
                  UNDER REVIEW
                </span>
                <span className="px-3.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#032AAC] text-white flex items-center gap-1.5 shadow-sm">
                  <LockKeyhole className="w-3 h-3 text-white" />
                  FINALISED
                </span>
              </div>

              <div>
                <Link
                  href="/sample-report"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#032AAC] hover:text-[#1B4FD1] transition-colors"
                >
                  <span>See sample report →</span>
                </Link>
              </div>
            </div>

            {/* Right col: OfficePreview mock browser */}
            <div className="lg:col-span-6">
              <OfficePreview />
            </div>
          </div>
        </div>

        {/* Closed by WaveDivider */}
        <WaveDivider
          direction="up"
          layers={3}
          colors={["#A5D3E8", "#D3E9F3", "#EAF4F9"]}
          height={80}
        />
      </section>

      {/* ──────────── SECTION 5 — ON DECK ──────────── */}
      <section className="py-20 lg:py-24 bg-[#F7FBFD]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            {/* Desktop Left / Mobile Second: MobilePreview */}
            <div className="order-2 lg:order-1 lg:col-span-5">
              <MobilePreview />
            </div>

            {/* Desktop Right / Mobile First: Copy */}
            <div className="order-1 lg:order-2 lg:col-span-7 space-y-6">
              <div>
                <Eyebrow>On deck</Eyebrow>
                <H2>No signal. No lost readings.</H2>
                <p className="mt-4 text-base leading-relaxed text-[#031038]/65">
                  The deck app saves every second and calculates offline. Scan the vessel QR code to start. A 72-hour offline lease keeps data safe.
                </p>
              </div>

              {/* Compact icon list */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-[#031038]">
                  <div className="w-8 h-8 rounded-xl bg-[#EAF4F9] flex items-center justify-center shrink-0">
                    <WifiOff className="w-4 h-4 text-[#032AAC]" />
                  </div>
                  <span className="font-medium">Calculate offline</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-[#031038]">
                  <div className="w-8 h-8 rounded-xl bg-[#EAF4F9] flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-[#032AAC]" strokeWidth={2.5} />
                  </div>
                  <span className="font-medium">Ullage or sounding, per tank</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-[#031038]">
                  <div className="w-8 h-8 rounded-xl bg-[#EAF4F9] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-[#032AAC]" />
                  </div>
                  <span className="font-medium">The same engine as the office</span>
                </div>
              </div>

              {/* Small footnote */}
              <p className="text-xs text-[#031038]/45 italic pt-2">
                On the roadmap: tank photos and signatures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── SECTION 6 — TEMPERATURE / TABLE 54B EXPLAINER ──────────── */}
      <WaveDivider
        layers={4}
        colors={["#A5D3E8", "#4E8DEB", "#1B4FD1", "#032AAC"]}
        height={120}
        direction="down"
      />

      <section
        className="relative py-20 lg:py-28"
        style={{
          background: "linear-gradient(180deg, #032AAC 0%, #031038 100%)",
        }}
      >
        {/* Subtle aqua glow & grid */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(25,181,201,0.08) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 bg-grid-marine pointer-events-none opacity-40" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left col */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#19B5C9] uppercase block mb-3 font-semibold">
                  Temperature / Table 54B
                </span>
                <WeightText
                  tag="h2"
                  mode="scroll-reveal"
                  restWeight={400}
                  activeWeight={800}
                  activeColor="#19B5C9"
                  baseColor="#FFFFFF"
                  accentColor="#19B5C9"
                  className="font-display text-3xl sm:text-4xl lg:text-[42px] xl:text-5xl font-bold text-white tracking-tight leading-[1.12]"
                >
                  Same fuel. Different volume.
                </WeightText>
                <p className="mt-3 text-sm sm:text-base text-white/70">
                  Why does temperature change the quantity?
                </p>
              </div>

              <AnswerBlock dark>
                Fuel expands when warm. The same tonnes take more space at 40°C than at 15°C. The engine uses a volume correction factor from Table 54B to bring volume back to 15°C. For density 0.9500 at 40°C, the factor is 0.9677.
              </AnswerBlock>

              <div>
                <Link
                  href="/how-we-measure"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#19B5C9] hover:text-white transition-colors"
                >
                  <span>How the engine calculates →</span>
                </Link>
              </div>
            </div>

            {/* Right col: Worked check panel with left border */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border-l-[3px] border-[#19B5C9] bg-white/[0.05] border-t border-r border-b border-white/10 p-7 sm:p-8 backdrop-blur-md space-y-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#19B5C9] font-bold block">
                  A worked check
                </span>

                {/* 2-col figure pair */}
                <div className="grid grid-cols-2 gap-4 pb-6 border-b border-white/10">
                  <div>
                    <span className="text-[11px] font-mono text-white/60 block">Density @ 15°C</span>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums block mt-1">
                      0.9500
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-white/60 block">Observed temperature</span>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums block mt-1">
                      40°C
                    </span>
                  </div>
                </div>

                {/* Bordered band with Volume correction factor and display 6xl tabular 0.9677 */}
                <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 text-center">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-1">
                    Volume correction factor
                  </span>
                  <span className="font-display text-5xl sm:text-6xl font-extrabold text-[#19B5C9] tracking-tight tabular-nums block">
                    0.9677
                  </span>
                </div>

                {/* Mono footnote */}
                <div className="pt-2 text-center">
                  <span className="text-[10px] font-mono text-white/40 tracking-wider">
                    ASTM D1250-04 · Table 54B · v1.0.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── SECTION 7 — EVIDENCE, DELIVERED ──────────── */}
      <section className="py-20 lg:py-24 bg-[#F7FBFD]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            {/* Left col */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Eyebrow>Evidence, delivered</Eyebrow>
                <H2>A report they can read. Figures they can check.</H2>
                <p className="mt-4 text-base leading-relaxed text-[#031038]/65">
                  One A4 PDF certificate. One Excel workbook with four sheets. Every tank, factor, and total, ready for the client.
                </p>
              </div>

              <div className="pt-2">
                <CtaRow />
              </div>
            </div>

            {/* Right col: ReportPreview */}
            <div className="lg:col-span-6">
              <ReportPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── SECTION 8 — PRICING TEASER ──────────── */}
      <section className="pt-20 lg:pt-24 pb-0 bg-mist-100">
        <div className="mx-auto max-w-6xl px-6 pb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 rounded-3xl p-8 sm:p-10 bg-white/85 border border-[#D3E9F3] shadow-sm">
            <div className="space-y-2">
              <Eyebrow>Simple team licensing</Eyebrow>
              <H2>One team. One licence.</H2>
              <p className="text-sm sm:text-base text-[#031038]/65 max-w-lg leading-relaxed">
                No per-job fees. A quote based on your team size and volume.
              </p>
            </div>

            <div className="md:text-right shrink-0">
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#032AAC]">
                Contact for quote
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B4FD1] hover:text-[#032AAC] mt-2 transition-colors"
              >
                <span>See what's included →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Closed by WaveDivider */}
        <WaveDivider
          direction="up"
          layers={2}
          colors={["#D3E9F3", "#EAF4F9"]}
          height={75}
        />
      </section>

      {/* ──────────── SECTION 9 — FAQ ──────────── */}
      <Section className="bg-[#F7FBFD]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>A little more clarity</Eyebrow>
            <H2>Common<br />questions.</H2>
            <p className="mt-3 text-base text-[#031038]/65 leading-relaxed">
              The details that matter to your firm.
            </p>
          </div>
          <div className="lg:col-span-7">
            <Faq items={FAQ_ITEMS} />
          </div>
        </div>
      </Section>
    </div>
  );
}
