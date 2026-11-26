import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, Section, AnswerBlock, CtaRow } from "../components/ui";
import { QrCode, Cpu, ShieldCheck, CheckCircle2, Lock, ArrowDown, ChevronRight, FileSpreadsheet, FileText } from "lucide-react";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/order-lifecycle", {
  title: "Bunker Survey Record Workflow",
  description:
    "How Space BQS moves from job nomination to a finalised report: Draft → In Progress → Submitted → Completed on mobile, and Draft → Calculated → Under Review → Finalised on web.",
});

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
        "Reduces manual entry of the IMO number",
        "Uses the vessel and tank reference data recorded for the survey",
        "Associates the surveyor with the organization's workspace",
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
        "Mobile capture supports offline work and later synchronization",
        "Review the calculation preview on the device",
        "Save survey work locally and synchronize when connected",
      ],
    },
    {
      num: "03",
      name: "Field Submission & Office Review",
      webState: "UNDER_REVIEW",
      mobileState: "SUBMITTED",
      icon: ShieldCheck,
      summary: "The surveyor submits the captured record for review through the web platform.",
      details: [
        "Review the recorded survey inputs",
        "Check the calculation details available for the product release",
        "Resolve questions with the survey team before finalization",
      ],
    },
    {
      num: "04",
      name: "Supervisor Finalization",
      webState: "FINALISED",
      mobileState: "COMPLETED",
      icon: Lock,
      summary: "An authorized supervisor or firm administrator completes the office workflow.",
      details: [
        "Finalize the reviewed survey record",
        "Prepare available PDF and Excel report outputs",
        "Follow the organization’s process for storing and sharing reports",
      ],
    },
  ];

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/features", label: "Features" },
            { href: "/order-lifecycle", label: "Order Lifecycle" },
          ]}
        />
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl">
          Bunker Survey Record Workflow
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Follow the product workflow from mobile survey capture to office review and report preparation.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 mt-6">
        <AnswerBlock>
          <p>
            Space BQS product materials describe a mobile workflow from draft through submission and a web workflow for calculation, review, and finalization. The exact status labels and review requirements depend on the product release and organization configuration.
          </p>
        </AnswerBlock>
      </div>

      <Section eyebrow="Workflow states" title="Step-by-step survey workflow">
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
                      {idx === 3 ? "PDF & Excel ready" : "Export unavailable (Draft)"}
                    </p>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      {idx === 3 ? "Survey marked finalised" : "Local draft storage"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Report outputs" title="What the report workflow describes">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-ocean-900 font-bold">
              <FileText className="h-5 w-5 text-ocean-700" />
              <span>A4 BQS Inspection Certificate (PDF)</span>
            </div>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Product materials describe a report for the survey firm&apos;s client, with vessel particulars, a BDN comparison note, tank-by-tank figures, and review status. Check the illustrative sample report for the current layout; specific fields vary by release.
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
              Product materials describe a multi-sheet workbook for review. A typical layout includes a survey summary, tank measurements, calculation steps, and an event record. Confirm the current workbook structure with the product team.
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
