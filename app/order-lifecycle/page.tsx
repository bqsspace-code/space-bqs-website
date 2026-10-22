import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, Section, AnswerBlock, CtaRow } from "../components/ui";
import { QrCode, Cpu, ShieldCheck, CheckCircle2, Lock, ArrowDown, ChevronRight, FileSpreadsheet, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Survey Order Lifecycle — Chain of Custody & States",
  description:
    "How Space BQS moves from job nomination to final locked certificate: Draft → In Progress → Submitted → Completed on mobile, and Draft → Calculated → Under Review → Finalised on web.",
};

export default function Page() {
  const steps = [
    {
      num: "01",
      name: "Nomination & Vessel QR Match",
      webState: "DRAFT",
      mobileState: "DRAFT",
      icon: QrCode,
      summary: "Job created with vessel particulars. On deck, the surveyor scans the ship QR code (`SPACE_BQS_VESSEL v1`).",
      details: [
        "Eliminates miskeyed 7-digit IMO numbers",
        "Pulls verified tank calibration strapping tables and grade master data",
        "Locks surveyor to the authorized survey firm tenant",
      ],
    },
    {
      num: "02",
      name: "Offline Deck Sounding & Measurement",
      webState: "DRAFT / CALCULATED",
      mobileState: "IN_PROGRESS",
      icon: Cpu,
      summary: "Surveyor inputs tape sounding or ullage, observed temperature, and water cuts across all active fuel tanks.",
      details: [
        "Works 100% offline with 72-hour lease guarantee",
        "Instant live calculation preview in ~450ms using cached Table 54B tables",
        "Autosaves every second to local encrypted storage",
      ],
    },
    {
      num: "03",
      name: "Field Submission & Anomaly Audit",
      webState: "UNDER_REVIEW",
      mobileState: "SUBMITTED",
      icon: ShieldCheck,
      summary: "Upon finishing vessel sounding, the surveyor submits the job to the office console. Automated sanity checks trigger.",
      details: [
        "Checks for water cut > 2.0% volume warning",
        "Checks for extreme temperature readings outside ASTM range (0–90°C for fuel oil)",
        "Flags any tank sounding falling outside the strapping booklet (OutOfRangeError)",
      ],
    },
    {
      num: "04",
      name: "Supervisory Sign-off & Immutable Lock",
      webState: "FINALISED (LOCKED)",
      mobileState: "COMPLETED",
      icon: Lock,
      summary: "Only an authorized supervisor or firm admin can execute final sign-off. The survey is permanently locked.",
      details: [
        "Permanent cryptographic hash generated (SHA-256)",
        "All edit and soft-delete capabilities permanently revoked",
        "Generates verified A4 Certificate PDF and 4-sheet audit Excel workbook",
        "Syncs to webhooks and client distribution queues",
      ],
    },
  ];

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/features", label: "Features" },
            { href: "/order-lifecycle", label: "Order Lifecycle" },
          ]}
        />
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl">
          BQS Survey Order Lifecycle & Chain of Custody
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          The exact progression from deck sounding to legally defensible, tamper-proof certificate delivery.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 mt-6">
        <AnswerBlock>
          <p>
            Space BQS enforces a rigorous two-tier state machine: field mobile progression (<code>DRAFT → IN_PROGRESS → SUBMITTED → COMPLETED</code>) mirrored into office platform progression (<code>DRAFT → CALCULATED → UNDER_REVIEW → FINALISED</code>). A survey cannot be finalised until all tank tolerances pass inspection. Once finalised, it is immutable.
          </p>
        </AnswerBlock>
      </div>

      <Section eyebrow="State Machine" title="Step-by-step chain of custody">
        <div className="space-y-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-ocean-300 transition"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-ocean-100 p-3 text-ocean-800 shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-sea-700">PHASE {s.num}</span>
                        <span className="text-slate-300">·</span>
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-700">
                          Web: {s.webState}
                        </span>
                        <span className="rounded bg-ocean-50 px-2 py-0.5 text-[10px] font-mono font-bold text-ocean-800">
                          Mobile: {s.mobileState}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-ocean-950 mt-1">{s.name}</h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-2xl">{s.summary}</p>

                      <ul className="mt-4 space-y-1.5 text-xs text-slate-700">
                        {s.details.map((d, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-sea-600 shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs font-mono shrink-0 md:w-56">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Gated Actions</span>
                    <p className="mt-1 font-semibold text-slate-800">
                      {idx === 3 ? "PDF & Excel Unlocked" : "Export Disabled (Draft)"}
                    </p>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      {idx === 3 ? "Immutable SHA-256 Seal" : "Autosaving to local DB"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Artifacts" title="What gets issued at completion">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-ocean-900 font-bold">
              <FileText className="h-5 w-5 text-ocean-700" />
              <span>A4 BQS Inspection Certificate (PDF)</span>
            </div>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Clean, single-page or multi-page executive certificate for owners, charterers, and port authorities. Contains vessel particulars, BDN comparison note, tank-by-tank corrected metric tonnes, temperature sensitivity, and supervisor signature badge.
            </p>
            <div className="mt-4">
              <Link href="/sample-report" className="text-xs font-semibold text-ocean-700 hover:underline">
                View sample PDF anatomy →
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sea-900 font-bold">
              <FileSpreadsheet className="h-5 w-5 text-sea-700" />
              <span>4-Sheet Audit Workbook (Excel)</span>
            </div>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Full evidentiary packet for claims adjusters and fuel analysts. Sheet 1: Survey Summary; Sheet 2: Tank Measurements; Sheet 3: Calculation Steps with Table 54B factors; Sheet 4: Complete Event & Audit Trail.
            </p>
            <div className="mt-4">
              <Link href="/features/calculation-audit" className="text-xs font-semibold text-sea-700 hover:underline">
                Read calculation audit spec →
              </Link>
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
