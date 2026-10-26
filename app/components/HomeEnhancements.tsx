"use client";

import Link from "next/link";
import {
  FileText,
  Table2,
  LockKeyhole,
  Search,
  Database,
  Users,
  ShieldCheck,
  Check,
  X,
  AlertTriangle,
  FileSpreadsheet,
  Layers,
  ArrowUpRight,
  Smartphone,
  QrCode,
  Clock,
} from "lucide-react";
import { Eyebrow, H2 } from "./ui";
import InkOrbitFeatures from "@/components/ui/ink-orbit-features";

/* ─── Official Store Badges ─── */
export function AppStoreBadges({
  className = "",
  dark = false,
  showSubtitle = true,
}: {
  className?: string;
  dark?: boolean;
  showSubtitle?: boolean;
}) {
  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center gap-3.5 ${className}`}>
      <div className="flex items-center gap-3">
        {/* Apple App Store */}
        <a
          href="https://apps.apple.com/in/app/space-bqs/id6812992991"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-white transition-all hover:scale-[1.02] active:scale-[0.98] ${
            dark
              ? "bg-white/10 hover:bg-white/20 border border-white/25 shadow-md"
              : "bg-[#031038] hover:bg-[#032AAC] border border-[#D3E9F3]/30 shadow-xs"
          }`}
          title="Download Space BQS on the Apple App Store"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.35-.57.65-1.07 1.71-.93 2.73.99.08 2.02-.48 2.65-1.23z" />
          </svg>
          <div className="text-left leading-none">
            <span className={`text-[9px] uppercase tracking-wider block ${dark ? "text-white/70" : "text-white/60"}`}>
              Download on the
            </span>
            <span className="text-xs font-bold tracking-tight block mt-0.5">App Store</span>
          </div>
        </a>

        {/* Google Play */}
        <a
          href="https://play.google.com/store/apps/details?id=com.spaceai.bqs"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-white transition-all hover:scale-[1.02] active:scale-[0.98] ${
            dark
              ? "bg-white/10 hover:bg-white/20 border border-white/25 shadow-md"
              : "bg-[#031038] hover:bg-[#032AAC] border border-[#D3E9F3]/30 shadow-xs"
          }`}
          title="Download Space BQS on Google Play"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M3.609 1.814L13.793 12 3.61 22.186a2.006 2.006 0 0 1-.22-.916V2.73c0-.336.08-.654.22-.916zm11.242 11.243l2.257 2.257-11.75 6.78 9.493-9.037zm0-2.114L5.358 1.906l11.75 6.78-2.257 2.257zm1.414 1.057l3.868-2.233a1.99 1.99 0 0 0 0 3.452l-3.868-2.219z" />
          </svg>
          <div className="text-left leading-none">
            <span className={`text-[9px] uppercase tracking-wider block ${dark ? "text-white/70" : "text-white/60"}`}>
              GET IT ON
            </span>
            <span className="text-xs font-bold tracking-tight block mt-0.5">Google Play</span>
          </div>
        </a>
      </div>

      {showSubtitle && (
        <p
          className={`text-xs sm:text-[13px] font-medium tracking-tight text-center ${
            dark ? "text-white/90" : "text-[#031038]/75"
          }`}
        >
          Free to download on iOS & Android · Account provided by your administrator
        </p>
      )}
    </div>
  );
}

/* ─── Section 2: The Problem (The Operational Friction) ─── */
export function ProblemSection() {
  return (
    <section id="section-problem" className="py-20 lg:py-24 bg-[#F7FBFD] border-b border-[#D3E9F3]/70">
      <div className="mx-auto max-w-6xl px-6">
        {/* Interactive Ink Orbit Engine Showcase - Customized for Friction 01, 02, and 03 */}
        <div className="rounded-3xl overflow-hidden border border-[#D3E9F3] shadow-xl">
          <InkOrbitFeatures
            theme="dark"
            brand="SPACE BQS"
            tag="The Operational Friction"
            title="The survey is only as good as the *paperwork* behind it."
          />
        </div>

        {/* Solution Banner with authentic image */}
        <div className="mt-8 rounded-3xl overflow-hidden bg-gradient-to-r from-[#032AAC] to-[#031038] text-white p-7 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl space-y-2.5">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#19B5C9]">
              The Space BQS Standard
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Space BQS keeps the reading, the maths and the proof together.
            </h3>
            <p className="text-sm text-white/75 leading-relaxed">
              Every sounding recorded on deck links directly to the strapping table interpolation, the ASTM Table 54B VCF factor, and the locked client certificate.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/how-we-measure"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#19B5C9] hover:bg-[#1495A5] text-[#031038] font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>See the calculation method</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section: Survey Warehouse (The Archive) ─── */
export function SurveyWarehouseSection() {
  const capabilities = [
    {
      icon: Search,
      title: "One-search discovery",
      desc: "Every survey, searchable instantly by survey number, vessel IMO, port, inspector, status, or delivery note number.",
    },
    {
      icon: Database,
      title: "Permanent table versions",
      desc: "Each record preserves the exact strapping table revision and ASTM Table 54B version used on the day of survey.",
    },
    {
      icon: LockKeyhole,
      title: "Immutable proof lock",
      desc: "Finalised surveys are locked and tamper-evident. Reopen or amendment requires supervisor authorization with complete history.",
    },
    {
      icon: FileSpreadsheet,
      title: "Instant claims pack",
      desc: "Generate the complete legal bundle in seconds: signed PDF certificate, 4-sheet Excel breakdown, and full calculation audit.",
    },
  ];

  return (
    <section id="section-warehouse" className="py-20 lg:py-24 bg-mist-100 border-b border-[#D3E9F3]/60">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#D3E9F3]/70">
          <div>
            <Eyebrow>The Survey Warehouse</Eyebrow>
            <H2>After sign-off, nothing is lost.</H2>
          </div>
          <p className="max-w-md text-sm text-[#031038]/65 leading-relaxed font-normal">
            Every finalised survey stays in one searchable record with measurements, calculation steps, table versions and certificate. When a claim arrives months later, you open the file instead of rebuilding it.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="rounded-3xl p-6 bg-white border border-[#D3E9F3] shadow-xs flex flex-col justify-between hover:border-[#032AAC] hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#EAF4F9] flex items-center justify-center text-[#032AAC] mb-5">
                    <Icon className="w-5 h-5 text-[#032AAC]" />
                  </div>
                  <h3 className="font-display text-base font-bold text-[#031038]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#031038]/65 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Warehouse Feature Bar */}
        <div className="mt-8 p-6 rounded-2xl bg-white/70 border border-[#D3E9F3] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#031038]/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#19B5C9]" />
            <span className="font-semibold text-[#031038]">Survey Register Architecture:</span>
            <span>Particulars · Tank readings · ASTM 54B VCF · Status log · PDF & Excel</span>
          </div>
          <Link
            href="/features/survey-register-dashboard"
            className="font-bold text-[#032AAC] hover:text-[#1B4FD1] inline-flex items-center gap-1 transition-colors"
          >
            <span>Explore Register & Dashboard →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Section: Spreadsheets vs Space BQS ─── */
export function SpreadsheetCompareSection() {
  const rows = [
    {
      feature: "Capture on deck",
      spreadsheet: "Typed on a phone or retyped from paper later; risk of transcription error.",
      spaceBqs: "Entered once on deck with QR vessel identification; calculates 100% offline.",
    },
    {
      feature: "Calculations",
      spreadsheet: "Formulas copied between files; prone to broken cell links and hidden math drift.",
      spaceBqs: "Pure ASTM D1250-04 Table 54B engine; every step and factor shown in full.",
    },
    {
      feature: "Correction tables",
      spreadsheet: "Pasted ranges in Excel, easy to accidentally edit, shift, or truncate.",
      spaceBqs: "Versioned strapping & Table 54B grids stored permanently with each survey.",
    },
    {
      feature: "Certificate output",
      spreadsheet: "Static PDF or exported sheet with no guarantee the formulas weren't modified.",
      spaceBqs: "Cryptographically locked, tamper-evident PDF certificate + 4-sheet Excel audit file.",
    },
    {
      feature: "Record keeping",
      spreadsheet: "Scattered in desktop folders, personal drives, and email inbox attachments.",
      spaceBqs: "Centralized Survey Warehouse searchable by IMO, survey number, port, and BDN.",
    },
    {
      feature: "Audit & history",
      spreadsheet: "Version history only if someone manually saved copies with new names.",
      spaceBqs: "Full immutable status history: Draft → Calculated → Under Review → Finalised.",
    },
  ];

  return (
    <section id="section-comparison" className="py-20 lg:py-24 bg-[#F7FBFD] border-b border-[#D3E9F3]/60">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow className="justify-center">Why Survey Firms Switch</Eyebrow>
          <H2>Spreadsheets are fine for one job. Then the team, the fleet and the claim arrive.</H2>
          <p className="mt-3 text-base text-[#031038]/65">
            A head-to-head look at everyday surveyor workflows.
          </p>
        </div>

        {/* Responsive Comparison Table */}
        <div className="mt-12 rounded-3xl overflow-hidden border border-[#D3E9F3] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="bg-[#EAF4F9]/70 border-b border-[#D3E9F3]">
                  <th className="py-4 px-6 text-xs font-mono font-bold uppercase tracking-wider text-[#031038]/60 w-1/4">
                    Workflow
                  </th>
                  <th className="py-4 px-6 text-xs font-mono font-bold uppercase tracking-wider text-[#031038]/60 w-3/8">
                    Spreadsheet
                  </th>
                  <th className="py-4 px-6 text-xs font-mono font-bold uppercase tracking-wider text-[#032AAC] w-3/8 bg-[#EAF4F9]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#032AAC]" />
                      <span>Space BQS</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D3E9F3]/60 text-sm">
                {rows.map((r, i) => (
                  <tr key={r.feature} className={i % 2 === 0 ? "bg-white" : "bg-[#F7FBFD]/50"}>
                    <td className="py-4 px-6 font-display font-semibold text-[#031038] text-xs sm:text-sm">
                      {r.feature}
                    </td>
                    <td className="py-4 px-6 text-xs sm:text-sm text-[#031038]/60 leading-relaxed">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{r.spreadsheet}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs sm:text-sm text-[#031038] font-medium leading-relaxed bg-[#EAF4F9]/30">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#032AAC] shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span>{r.spaceBqs}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section: Who It's For ─── */
export function WhoItsForSection() {
  const personas = [
    {
      role: "Surveyors on Deck",
      action: "Scan, measure, submit",
      desc: "Fast mobile entry at the tank hatch. Calculates 100% offline in engine rooms and barges. Zero double-handling or notebook retyping when you step ashore.",
      tag: "Field Tool",
    },
    {
      role: "Supervisors in Office",
      action: "Review, complete, lock",
      desc: "Inspect per-tank calculations, verify Table 54B temperature corrections, and seal certificates with a tamper-evident lock before they reach the client.",
      tag: "Quality Control",
    },
    {
      role: "Firm Owners & Ops",
      action: "Oversee fleet, volume & audit",
      desc: "Track monthly tonnage, monitor inspector activity, and maintain a permanent Survey Warehouse that protects your firm against retrospective claims.",
      tag: "Business Oversight",
    },
    {
      role: "Clients & Principals",
      action: "Clear, defensible certificates",
      desc: "Receive clean A4 PDF certificates and 4-sheet Excel workbooks. Every figure is transparent, verifiable, and backed by ASTM D1250 mathematics.",
      tag: "End Deliverable",
    },
  ];

  return (
    <section id="section-personas" className="py-20 lg:py-24 bg-mist-100 border-b border-[#D3E9F3]/60">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow className="justify-center">Built for the Whole Team</Eyebrow>
          <H2>One platform for everyone who relies on the number.</H2>
          <p className="mt-3 text-base text-[#031038]/65">
            Designed for how bunker survey firms operate between the deck, the office, and the client.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {personas.map((p) => (
            <div
              key={p.role}
              className="rounded-3xl p-6 bg-white border border-[#D3E9F3] shadow-xs flex flex-col justify-between hover:border-[#19B5C9] hover:shadow-md transition-all duration-300"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-[#EAF4F9] text-[#032AAC] mb-4">
                  {p.tag}
                </span>
                <h3 className="font-display text-lg font-bold text-[#031038]">
                  {p.role}
                </h3>
                <p className="mt-1 font-mono text-xs font-semibold text-[#032AAC]">
                  {p.action}
                </p>
                <p className="mt-3 text-xs text-[#031038]/65 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
