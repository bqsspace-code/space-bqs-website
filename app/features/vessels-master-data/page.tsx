import type { Metadata } from "next";
import { Section, CtaRow, Breadcrumbs, AnswerBlock } from "../../components/ui";
import { Ship, Table, FileSpreadsheet, History, ShieldCheck, CheckCircle2, AlertTriangle, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Tank Strapping Tables & Master Data",
  description:
    "Space BQS vessels and reference data: vessel register with IMO and DWT, tank strapping maps with revisions, ASTM Table 54B VCF grids. Why tables build trust.",
};

export default function Page() {
  return (
    <div className="space-y-12 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/features", label: "Features" },
            { href: "/features/vessels-master-data", label: "Vessels & Master Data" },
          ]}
        />
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            Master Data Management
          </span>
          <span className="text-xs text-slate-500 font-mono">Calibration Library</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl lg:text-5xl">
          Vessels register &amp; tank strapping calibration tables
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          The foundation of accurate bunker surveying: digitized tank calibration curves, trim and heel corrections, and version-controlled master data.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnswerBlock>
          <p>
            Accurate bunker quantity determination is impossible without authoritative vessel calibration data. Space BQS digitizes shipyard tank strapping tables directly into the system, matching soundings and ullages to precise volumes while enforcing version control whenever tanks are re-strapped or modified.
          </p>
        </AnswerBlock>
      </div>

      {/* Key Components */}
      <Section eyebrow="Master Records" title="Authoritative data structures driving survey calculations">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 mb-4">
              <Ship className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Vessel Master Profiles
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Centralized vessel register recording IMO numbers, deadweight tonnage (DWT), vessel type, flag, call sign, and fuel tank arrangements (HFO, VLSFO, LSMGO, settling, service).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 mb-4">
              <Table className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Digitized Tank Strapping Tables
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Physical shipyard tank tables converted into high-precision lookup curves. Supports sounding and ullage indices, pipe reference heights, and lower-zone water tables.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 mb-4">
              <History className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Full Revision History
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Every table edit or re-strapping update generates an immutable revision hash. Historic surveys always lock to the exact table version active at the time of delivery.
            </p>
          </div>
        </div>
      </Section>

      {/* Why Strapping Tables Build Trust */}
      <Section eyebrow="Integrity" title="Why digitized calibration tables prevent bunker disputes">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h3 className="font-display text-xl font-bold text-ocean-950">
            Eliminating deck lookup errors and spreadsheet interpolation bugs
          </h3>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed max-w-3xl">
            When surveyors manually flip through greasy paper tank tables on deck or copy numbers into Excel sheets, interpolation typos frequently occur. Space BQS eliminates human error through automated calibration handling:
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-ocean-950 text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-ocean-600" /> Automated Linear Interpolation
              </h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                The engine calculates exact fractional volumes between strapping increments down to millimeter sounding precision. Intermediate steps are recorded in the audit trail.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-ocean-950 text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" /> Zero Extrapolation Safeguard
              </h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                If a sounding or ullage exceeds the official shipyard table boundaries (e.g. tape reading higher than reference height), the calculation throws an error rather than guessing.
              </p>
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
