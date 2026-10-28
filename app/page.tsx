import type { Metadata } from "next";
import Link from "next/link";
import {
  Fuel,
  Ship,
  ArrowDownToLine,
  ArrowUpRight,
  LockKeyhole,
  WifiOff,
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
import HeroLiquidSection from "./components/HeroLiquidSection";
import AppDemoVideoSection from "./components/AppDemoVideoSection";
import AmbientVideo from "./components/AmbientVideo";
import WaveDivider from "./components/WaveDivider";
import WeightText from "./components/WeightText";
import ScrollReveal from "./components/ScrollReveal";
import {
  AppStoreBadges,
  ProblemSection,
  SurveyWarehouseSection,
  SpreadsheetCompareSection,
  WhoItsForSection,
} from "./components/HomeEnhancements";
import DeckInteractiveShowcase from "./components/DeckInteractiveShowcase";
import { BevelWorkflowCards } from "@/components/ui/bevel-workflow-cards";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import { MarketingCard } from "./components/MarketingPage";




export const metadata: Metadata = {
  title: "BQS Software for Marine Surveyors — Capture, Calculate, Certify",
  description:
    "Space BQS is software for bunker surveyors and survey firms: offline mobile capture, temperature-corrected MT engine, locked certificates, fleet dashboard. Quantity-only.",
};

const FAQ_ITEMS = [
  {
    q: "What is Space BQS?",
    a: "Space BQS is bunker quantity survey software built specifically for survey firms. It captures tank readings on deck, runs ASTM D1250 Table 54B calculations, and produces locked, tamper-evident certificates.",
  },
  {
    q: "Does the mobile app work without internet on deck?",
    a: "Yes. The mobile app carries your vessel tank register and ASTM correction tables cached locally. It computes quantities offline in engine rooms and barges, with a 72-hour offline lease that syncs automatically when signal returns.",
  },
  {
    q: "Which fuel grades and calculation standards are supported?",
    a: "Grades include VLSFO, HFO, MGO, LSMGO, and ULSFO, using ASTM D1250-04 Table 54B for temperature volume correction factor (VCF), with density ranges 0.820–1.000 kg/L and temperatures 0–90°C.",
  },
  {
    q: "What does the client receive?",
    a: "Clients receive a locked, tamper-evident A4 PDF certificate, plus an audit-ready four-sheet Excel workbook detailing particulars, soundings, strapping interpolations, and Table 54B correction factors.",
  },
  {
    q: "Do surveyors need an account to use the mobile app?",
    a: "The app is free to install on iPhone, iPad, and Android from the official App Store and Google Play. Surveyors sign in with an account provisioned by their survey firm's administrator.",
  },
  {
    q: "Does Space BQS perform fuel quality or lab testing?",
    a: "No. Space BQS is strictly quantity-only. Quality testing is a separate laboratory discipline. Bunker Delivery Note (BDN) numbers are recorded for cross-reference and reconciliation.",
  },
  {
    q: "What happens to survey data after sign-off?",
    a: "Every finalised survey is permanently stored in the Survey Warehouse with its raw tank readings, calibration table revisions, engine version, and certificate. When a dispute arrives months later, you open the verifiable record instead of rebuilding it.",
  },
];

/* ─── OfficePreview (Section 4 Mock Browser) ─── */
function OfficePreview() {
  return (
    <div data-glass-depth data-glass-surface className="rounded-3xl overflow-hidden border border-[#D3E9F3] bg-white shadow-xl">
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



/* ─── ReportPreview (Section 7 Deliverables Mock) ─── */
function ReportPreview() {
  return (
    <div data-glass-depth className="relative pt-6 pb-4 max-w-lg mx-auto">
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
      <div data-glass-surface className="liquid-glass-ui liquid-glass-ui--strong rounded-3xl p-6 sm:p-7 border border-[#D3E9F3] shadow-2xl relative -mt-14 sm:-mt-16 ml-4 sm:ml-8">
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
    <div className="liquid-home">
      {/* ──────────── HERO / FRAMED OCEAN REVEAL ──────────── */}
      <HeroLiquidSection />

      {/* ──────────── PRODUCT VIDEO SHOWCASE ──────────── */}
      <AppDemoVideoSection />

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

      {/* ──────────── SECTION 2 — THE PROBLEM (OPERATIONAL FRICTION) ──────────── */}
      <ProblemSection />

      {/* ──────────── SECTION 3 — WORKFLOWS ──────────── */}
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

          {/* Bevel-style 3 Workflow Cards with sleek cut-out iPhone */}
          <div className="mt-10 pb-20">
            <BevelWorkflowCards />
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
        <div className="grid items-center gap-10 text-left lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <H2>Your whole workflow.<br />Within reach.</H2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#031038]/65">
              Less time moving figures between screens. More time on the survey. Capture, calculate, and prepare the proof in one connected workflow.
            </p>
            <Link href="/mobile-app" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#032AAC] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">
              Explore the mobile app <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <figure data-glass-depth data-glass-surface className="relative isolate overflow-hidden rounded-3xl border border-[#D3E9F3] bg-[#D3E9F3] shadow-[0_24px_70px_-30px_rgba(3,42,172,0.3)]">
            <div className="relative aspect-video">
              <AmbientVideo src="/assets/videos/mobile-showcase-web.mp4" poster="/assets/videos/mobile-showcase-poster.webp" label="mobile app concept video" />
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-[#D3E9F3] bg-white px-5 py-4 text-xs text-[#031038]/65">
              <span className="font-mono uppercase tracking-wider text-[#032AAC]">Space BQS / In motion</span>
              <span>App concept film</span>
            </figcaption>
          </figure>
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
              Capture on mobile
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
              Review on the web
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
                <Eyebrow>The web app / In the office</Eyebrow>
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
              <ScrollReveal><OfficePreview /></ScrollReveal>
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

      {/* ──────────── SECTION 5 — ON DECK (INTERACTIVE BEVEL-STYLE SHOWCASE) ──────────── */}
      <DeckInteractiveShowcase />

      {/* ──────────── SECTION 6 — THE ARCHIVE / SURVEY WAREHOUSE ──────────── */}
      <SurveyWarehouseSection />

      {/* ──────────── SECTION 7 — TEMPERATURE / TABLE 54B EXPLAINER ──────────── */}
      <WaveDivider
        layers={4}
        colors={["#A5D3E8", "#4E8DEB", "#1B4FD1", "#032AAC"]}
        height={120}
        direction="down"
      />

      <section
        className="relative isolate overflow-hidden py-20 lg:py-28"
        style={{
          background: "radial-gradient(ellipse at 85% 20%, #164dd3 0%, transparent 55%), linear-gradient(165deg, #032AAC 0%, #061c68 58%, #031038 100%)",
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

              <LiquidGlassCard draggable={false} surface="soft" blurIntensity="xl" shadowIntensity="xs" glowIntensity="none" borderRadius="8px" className="p-6 sm:p-7">
                <span className="mb-3 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">In short</span>
                <p className="text-sm leading-7 text-white">
                  Fuel expands when warm. The same tonnes take more space at 40°C than at 15°C. The engine uses a volume correction factor from Table 54B to bring volume back to 15°C. For density 0.9500 at 40°C, the factor is 0.9677.
                </p>
              </LiquidGlassCard>

              <div>
                <Link
                  href="/how-we-measure"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#19B5C9] hover:text-white transition-colors"
                >
                  <span>How the engine calculates →</span>
                </Link>
              </div>
            </div>

            {/* Right col: matching softly frosted worked check */}
            <div className="lg:col-span-5">
              <LiquidGlassCard draggable={false} surface="soft" blurIntensity="xl" shadowIntensity="xs" glowIntensity="none" borderRadius="8px" className="p-7 sm:p-9">
                <div className="space-y-7">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 font-bold block">
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
                <div className="rounded-lg border border-white/25 bg-white/[0.05] p-6 text-center">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-1">
                    Volume correction factor
                  </span>
                  <span className="font-display text-5xl sm:text-6xl font-semibold text-white tracking-tight tabular-nums block">
                    0.9677
                  </span>
                </div>

                {/* Mono footnote */}
                <div className="pt-2 text-center">
                  <span className="text-[10px] font-mono text-white/60 tracking-wider">
                    ASTM D1250-04 · Table 54B · v1.0.0
                  </span>
                </div>
                </div>
              </LiquidGlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── SECTION 8 — SPREADSHEETS VS SPACE BQS ──────────── */}
      <SpreadsheetCompareSection />

      {/* ──────────── SECTION 9 — WHO IT'S FOR ──────────── */}
      <WhoItsForSection />

      <Section eyebrow="Solutions & implementation" title="A rollout that fits your operation." bg="mist">
        <div className="grid gap-5 md:grid-cols-3">
          <MarketingCard title="Move your existing data" href="/services/data-migration" linkLabel="Plan a migration">Map, trial-import, and reconcile existing records before the final move.</MarketingCard>
          <MarketingCard title="Choose the environment" href="/services/deployment" linkLabel="Compare deployments">Public cloud, private cloud, or on-premises, scoped with your infrastructure team.</MarketingCard>
          <MarketingCard title="Managing cargo instead?" href="/solutions/cargo-wms" linkLabel="Explore Cargo WMS">A separate custom implementation for manifests, locations, tariffs, and controlled cargo release.</MarketingCard>
        </div>
      </Section>

      {/* ──────────── SECTION 10 — EVIDENCE, DELIVERED ──────────── */}
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
              <ScrollReveal><ReportPreview /></ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── SECTION 8 — PRICING TEASER ──────────── */}
      <section className="pt-20 lg:pt-24 pb-0 bg-mist-100">
        <div className="mx-auto max-w-6xl px-6 pb-20">
          <div data-glass-surface className="grid overflow-hidden rounded-3xl border border-[#D3E9F3] bg-white shadow-sm lg:grid-cols-2">
            <div className="relative isolate min-h-[320px] overflow-hidden bg-[#031038] sm:min-h-[400px]">
              <AmbientVideo src="/assets/videos/ocean-yacht-web.mp4" poster="/assets/videos/ocean-yacht-poster.webp" label="yacht at sea video" className="-z-20" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#031038]/90 via-[#031038]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 pb-20 sm:p-10 sm:pb-20">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#A5D3E8]">Ready for the next horizon</p>
                <p className="max-w-sm font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">Keep your team<br />moving forward.</p>
              </div>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            <div className="space-y-2">
              <Eyebrow>Simple team licensing</Eyebrow>
              <H2>One team. One licence.</H2>
              <p className="text-sm sm:text-base text-[#031038]/65 max-w-lg leading-relaxed">
                No per-job fees. A quote based on your team size and volume.
              </p>
            </div>

            <div className="mt-8 border-t border-[#D3E9F3] pt-6">
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
