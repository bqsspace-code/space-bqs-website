import type { Metadata } from "next";
import Link from "next/link";
import { Section, CtaRow, Breadcrumbs, AnswerBlock } from "../components/ui";
import { Calculator, ShieldCheck, Database, FileText, ArrowRight, Smartphone, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Features — What the System Does",
  description:
    "Explore Space BQS core capabilities: deterministic ASTM 54B calculation engine, survey register dashboard, vessel master data, locked PDF certificates, and offline mobile app.",
};

const MODULES = [
  {
    href: "/features/survey-register-dashboard",
    title: "Survey Register & Bunker Dashboard",
    description: "Search, filter, and track all live and completed surveys by vessel, port, date, surveyor, or BDN receipt number. Monitor shortage trends across bunker suppliers in real time.",
    icon: Database,
    bullets: [
      "Real-time survey status tracking (Draft, In Progress, Submitted, Finalised)",
      "Instant multi-criteria search by IMO, BDN, port, or surveyor name",
      "Supplier & barge discrepancy analytics across historical deliveries",
      "Multi-role access controls for surveyors, reviewers, and operations leads",
    ],
  },
  {
    href: "/features/calculation-audit",
    title: "Deterministic ASTM 54B Calculation Engine",
    description: "Convert physical deck tape readings into certified metric tonnes with immutable mathematical proof. Bilinear ASTM Table 54B interpolation, water deductions, and zero extrapolation.",
    icon: Calculator,
    bullets: [
      "Automated tank strapping curve lookup with exact-interval detection",
      "Exact free water deduction before standard volume correction",
      "Standard ASTM D1250 Table 54B Volume Correction Factor (VCF) lookup",
      "Fail-safe out-of-range protection: rejects invalid numbers rather than guessing",
    ],
  },
  {
    href: "/features/vessels-master-data",
    title: "Tank Strapping Tables & Master Data",
    description: "Manage vessel fleet registers, shipyard tank strapping tables, trim and heel corrections, fuel grade definitions, and Table 54B density boundaries.",
    icon: ShieldCheck,
    bullets: [
      "Digitized tank calibration curves for Heavy Fuel, Low Sulphur, and Gas Oils",
      "Trim and list calibration tables attached per vessel tank",
      "Full revision audit trail whenever vessel strapping tables are updated",
      "Pre-configured fuel density and temperature ranges to catch deck typos",
    ],
  },
  {
    href: "/features/reports-ai",
    title: "Locked PDF Certificates & Analysis",
    description: "Generate cryptographically locked A4 PDF survey certificates and 4-sheet transparent Excel calculation workbooks. Honest AI anomaly detection with strict quantity-only boundaries.",
    icon: FileText,
    bullets: [
      "Tamper-evident locked PDF certificates forwarded to buyers and charterers",
      "Four-sheet transparent Excel workbook showing raw soundings and exact formulas",
      "Honest AI anomaly detection highlighting unusual temperature and sounding shifts",
      "Strict quantity-only scope: does not fabricate numbers or guess lab quality",
    ],
  },
];

export default function Page() {
  return (
    <div className="space-y-12 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/features", label: "Features" }]} />
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            System Capabilities
          </span>
          <span className="text-xs text-slate-500 font-mono">Core Platform</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl lg:text-5xl">
          Complete feature set for marine survey operations
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Everything required to capture deck tank soundings, calculate temperature-corrected fuel quantities, and issue audit-ready certificates without spreadsheet risk.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnswerBlock>
          <p>
            Space BQS is built specifically for marine fuel surveyors, superintendents, and inspection agencies. The system connects field soundings recorded on deck with office review and immutable client reporting across four core modules: Survey Register & Dashboard, Calculation & Audit Engine, Vessels & Master Data, and Locked Reports with AI Verification.
          </p>
        </AnswerBlock>
      </div>

      {/* Modules Grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {MODULES.map((module) => {
            const IconComponent = module.icon;
            return (
              <div
                key={module.href}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-ocean-600 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-ocean-950">
                      {module.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                    {module.description}
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                    {module.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-xs text-slate-700 leading-normal">
                        <CheckCircle2 className="h-4 w-4 text-ocean-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <Link
                    href={module.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-700 hover:text-ocean-900"
                  >
                    Explore module details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Field to Office Architecture */}
      <Section eyebrow="Architecture" title="From deck sounding tape to client certificate">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <span className="font-mono text-xs font-semibold text-ocean-700 uppercase">Step 1: Deck Capture</span>
            <h4 className="font-display mt-2 text-lg font-bold text-ocean-950">Offline Sounding Input</h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Surveyor scans vessel QR, selects tanks, and inputs tape soundings, free water, and temperatures. Works 72 hours without internet onboard.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <span className="font-mono text-xs font-semibold text-ocean-700 uppercase">Step 2: Table 54B Engine</span>
            <h4 className="font-display mt-2 text-lg font-bold text-ocean-950">Deterministic Math</h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Calibration tables interpolate observed volume. ASTM D1250 Table 54B applies exact temperature corrections to compute Standard Metric Tonnes.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <span className="font-mono text-xs font-semibold text-ocean-700 uppercase">Step 3: Verification</span>
            <h4 className="font-display mt-2 text-lg font-bold text-ocean-950">Locked Defensible Proof</h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Supervisor reviews audit trail and finalises survey. Tamper-evident PDF certificate and 4-sheet Excel workbook are locked and issued to clients.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <CtaRow />
        </div>
      </Section>
    </div>
  );
}
