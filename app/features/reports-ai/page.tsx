import type { Metadata } from "next";
import { Section, AnswerBlock, CtaRow, Breadcrumbs } from "../../components/ui";
import { FileText, FileSpreadsheet, Lock, ShieldCheck, CheckCircle2, AlertOctagon, Sparkles, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Locked PDF Certificates & Analysis",
  description:
    "Space BQS reports: tamper-evident locked PDF certificates, 4-sheet transparent Excel calculation workbooks, and honest AI sounding anomaly detection.",
};

export default function Page() {
  return (
    <div className="space-y-12 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/features", label: "Features" },
            { href: "/features/reports-ai", label: "Reports & AI" },
          ]}
        />
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            Reporting &amp; Verification
          </span>
          <span className="text-xs text-slate-500 font-mono">Immutable Evidence Pack</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl lg:text-5xl">
          Locked PDF certificates &amp; transparent Excel proof
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          When fuel disputes arise, both commercial sides demand defensible numbers. Space BQS generates tamper-evident evidence packages backed by honest AI anomaly checks.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnswerBlock>
          <p>
            Once a supervisor reviews and finalises a survey, Space BQS cryptographically seals the record. The generated A4 PDF Certificate and 4-sheet transparent Excel calculation pack can never be modified post-issuance. Every calculation line reveals its exact formula, source calibration table revision, and temperature correction factor.
          </p>
        </AnswerBlock>
      </div>

      {/* Deliverables Breakdown */}
      <Section eyebrow="Deliverables" title="The four-part BQS evidence package">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-ocean-950">
                Locked Official A4 PDF Certificate
              </h3>
            </div>
            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              Clean, executive-level custody transfer certificate signed off by the marine surveyor. Features a tamper-evident cryptographic hash, unique verification token, Total MT summary per fuel grade, before/after sounding differentials, and BDN reconciliation figures.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-ocean-600" />
                <span>Non-editable locked format for owners, charterers, and suppliers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-ocean-600" />
                <span>Formatted to ISO 13739 commercial bunker reporting standards</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-ocean-600" />
                <span>Includes vessel IMO, port, delivery barge, and survey timeline</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-ocean-950">
                Four-Sheet Analytical Excel Workbook
              </h3>
            </div>
            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              Built for technical superintendents, claims adjusters, and demurrage analysts who need to verify intermediate arithmetic without retyping raw data.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <span className="font-mono text-ocean-700 font-bold">Sheet 1:</span>
                <span>Executive Summary &amp; BDN vs Surveyed MT Comparison</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-mono text-ocean-700 font-bold">Sheet 2:</span>
                <span>Pre-Delivery &amp; Post-Delivery Raw Tank Sounding Sheets</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-mono text-ocean-700 font-bold">Sheet 3:</span>
                <span>Table 54B VCF Factors, Free Water &amp; Mass Conversion Formulas</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-mono text-ocean-700 font-bold">Sheet 4:</span>
                <span>Vessel Tank Calibration Table Line-by-Line Lookup Audit</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Honest AI Anomaly Detection */}
      <Section eyebrow="AI Verification" title="Honest AI sounding checks with stated operational limits">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-ocean-700" />
            <h3 className="font-display text-xl font-bold text-ocean-950">
              What the AI analysis does — and what it strictly avoids
            </h3>
          </div>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Many software vendors make exaggerated claims regarding artificial intelligence in marine surveying. At Space BQS, our AI models perform strict, rule-governed anomaly detection to protect surveyors from typos and irregular readings.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-white p-5">
              <h4 className="font-display font-bold text-emerald-950 text-sm flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> What the AI Checks
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-700">
                <li>• Flags sudden temperature drops or uncharacteristic heat spikes between tanks</li>
                <li>• Identifies density values inconsistent with the declared ISO 8217 fuel grade</li>
                <li>• Detects unrecorded free water levels in tanks with historical water accumulation</li>
                <li>• Highlights abnormal ullage variations between opening and closing sounding rounds</li>
              </ul>
            </div>

            <div className="rounded-xl border border-amber-200 bg-white p-5">
              <h4 className="font-display font-bold text-amber-950 text-sm flex items-center gap-2">
                <AlertOctagon className="h-4 w-4 text-amber-600" /> Stated AI Boundaries
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-700">
                <li>• <strong>No Hallucinations:</strong> The AI never fabricates missing tank sounding figures</li>
                <li>• <strong>No Uncertified Extrapolation:</strong> Never guesses strapping curves beyond table limits</li>
                <li>• <strong>Quantity Only:</strong> Does not certify fuel chemical quality, catalytic fines, or stability</li>
                <li>• <strong>Human-in-the-Loop:</strong> All flags require licensed surveyor confirmation before locking</li>
              </ul>
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
