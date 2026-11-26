import type { Metadata } from "next";
import { Section, CtaRow, Breadcrumbs, AnswerBlock } from "../../components/ui";
import { Ship, Table, FileSpreadsheet, History, ShieldCheck, CheckCircle2, AlertTriangle, Layers } from "lucide-react";
import { routeMetadata } from "../../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/features/vessels-master-data", {
  title: "Tank Strapping Tables & Master Data",
  description:
    "Space BQS vessels and reference data: vessel register with IMO and DWT, tank strapping maps with revisions, ASTM Table 54B VCF grids. Why tables build trust.",
});

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
          Vessel reference data and tank calibration information used by survey teams, kept alongside the survey record.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnswerBlock>
          <p>
            Bunker quantity calculations depend on the vessel calibration data used for the survey. Space BQS product materials describe vessel and tank reference data as part of the survey workflow. Confirm the data sources, revision handling, and production calculation method for the release your team evaluates.
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
              Product materials describe tank calibration tables used for sounding and ullage lookups. Confirm the supported table format and reference fields with the product team.
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
              Product materials describe vessel and tank reference data. Confirm how table revisions are stored and associated with historical records in the current product release.
            </p>
          </div>
        </div>
      </Section>

      {/* Why Strapping Tables Build Trust */}
      <Section eyebrow="Data quality" title="Why calibration data quality matters">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h3 className="font-display text-xl font-bold text-ocean-950">
            Reducing manual lookup and transcription steps
          </h3>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed max-w-3xl">
            Manual tank-table lookups and copying between systems can introduce transcription errors. Space BQS product materials describe automated calibration handling; confirm the production method and validation behavior for the release your team uses.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-ocean-950 text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-ocean-600" /> Calibration lookup
              </h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Product materials describe converting a recorded sounding or ullage into a tank volume using the applicable calibration data. Confirm the interpolation method and how intermediate steps appear in the record.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-ocean-950 text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" /> Out-of-range readings
              </h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                A reading outside the calibration table range needs review under the survey firm&apos;s procedure. Confirm how the current product release flags or handles out-of-range inputs.
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
