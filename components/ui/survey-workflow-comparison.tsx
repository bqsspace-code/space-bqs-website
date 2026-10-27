"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown, ArrowLeft, ArrowRight, Check, CheckCheck, ChevronRight,
  Calculator, Database, FileCheck2, FileSpreadsheet, History,
  Layers, Link2, LockKeyhole, ScanLine, WifiOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    label: "Capture on deck", short: "Capture", icon: ScanLine,
    subtitle: "Enter it once", headline: "Keep the first reading. Skip the retyping.",
    manual: "Paper notes and separate files can mean entering the same reading again ashore. Each handoff is another chance to mistype it.",
    approach: "Identify the vessel by QR and enter tank readings on deck. Work offline, then sync when a connection returns.",
    benefit: "The office starts with the readings captured on deck, rather than a second transcription.",
    proofTitle: "Captured at the source", proofIcon: WifiOff, status: "Offline capture",
    rows: [["Vessel", "QR identified"], ["Tank readings", "Saved on device"], ["Connection", "Sync when online"]],
    artifact: "One entry. A shared starting point.",
  },
  {
    label: "Calculations", short: "Calculate", icon: Calculator,
    subtitle: "Follow the maths", headline: "A total you can trace, not just a cell you trust.",
    manual: "Copied formulas and cell links need checking every time a workbook changes. A final number alone does not explain how it was reached.",
    approach: "Run the versioned ASTM D1250 Table 54B engine. Keep the density, temperature, correction factor, and calculated mass visible.",
    benefit: "Supervisors can follow the calculation before they approve the result.",
    proofTitle: "A worked engine check", proofIcon: Calculator, status: "Engine v1.0.0",
    rows: [["Density @ 15°C", "0.9500"], ["Observed temperature", "40°C"], ["Volume correction factor", "0.9677"]],
    artifact: "Worked result · 457.819 MT",
  },
  {
    label: "Correction tables", short: "Tables", icon: Layers,
    subtitle: "Keep the context", headline: "Keep the table behind the calculation.",
    manual: "When table ranges are pasted between workbooks, cells can shift or be edited. Later checks depend on finding the right copy.",
    approach: "Keep the versioned strapping and Table 54B grids with the survey record, alongside its inputs and calculation context.",
    benefit: "A later review has the supporting tables, rather than a search for an old workbook.",
    proofTitle: "Context stays attached", proofIcon: Layers, status: "Versioned tables",
    rows: [["Vessel strapping", "Linked to survey"], ["Correction method", "ASTM Table 54B"], ["Engine version", "v1.0.0"]],
    artifact: "Inputs + tables + result, together.",
  },
  {
    label: "Certificate output", short: "Certify", icon: FileCheck2,
    subtitle: "Issue reviewed proof", headline: "Send the proof, with the working behind it.",
    manual: "An exported PDF can show a total without the workbook context. Separate attachments make it harder for clients to follow the figures.",
    approach: "After review and finalisation, issue the locked PDF certificate with a four-sheet Excel audit workbook.",
    benefit: "Clients receive a readable certificate and the supporting calculation record.",
    proofTitle: "The client handover", proofIcon: LockKeyhole, status: "Finalised · locked",
    rows: [["Certificate", "A4 PDF"], ["Audit workbook", "4 Excel sheets"], ["Client access", "No login needed"]],
    artifact: "Reviewed once. Issued as a locked record.",
  },
  {
    label: "Record keeping", short: "Retrieve", icon: Database,
    subtitle: "Find the whole job", headline: "Find a survey. Not a trail of attachments.",
    manual: "Records spread across folders, drives, and inboxes can leave the office piecing a job back together when a client asks a question.",
    approach: "Search the Survey Warehouse by vessel IMO, survey number, port, or BDN and return to the survey record.",
    benefit: "The team can retrieve a survey by its identifiers, without relying on one person’s filing system.",
    proofTitle: "A searchable survey record", proofIcon: Database, status: "Survey Warehouse",
    rows: [["Survey number", "BQS-YYYY-0001"], ["Find by", "IMO · port · BDN"], ["Record", "Readings + outputs"]],
    artifact: "One place to return when questions arrive.",
  },
  {
    label: "Audit & history", short: "Trace", icon: History,
    subtitle: "See how it reached final", headline: "A status trail, beyond ‘final_v3’.",
    manual: "Renamed file copies do not always explain which version was reviewed, or how a job moved from draft to issued certificate.",
    approach: "Follow the web record through Draft, Calculated, Under Review, and Finalised, with its status history attached.",
    benefit: "A reviewer can see the survey’s progression and identify the final locked record.",
    proofTitle: "The review trail", proofIcon: History, status: "Status history",
    rows: [["01 · Draft", "Readings entered"], ["02 · Calculated", "Engine run"], ["03 · Under review", "Supervisor check"]],
    artifact: "04 · Finalised — record locked",
  },
] as const;

export default function SurveyWorkflowComparison() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const id = useId();
  const stage = STAGES[active];
  const ProofIcon = stage.proofIcon;

  return (
    <section id="section-comparison" aria-labelledby={`${id}-heading`} className="workflow-compare relative overflow-hidden border-y border-[#d3e9f3]/60 px-6 py-20 lg:py-28">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:mb-12 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#032aac]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#19b5c9]" />Why survey firms switch
            </p>
            <h2 id={`${id}-heading`} className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#031038] sm:text-4xl lg:text-5xl">
              From the first reading<br className="hidden sm:block" /> to the final <span className="text-[#032aac]">record.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[#52657c]">
            Spreadsheets hold numbers. Space BQS connects the readings, calculations, review, and proof. Explore what changes at each step.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
          <nav aria-label="Explore workflow benefits" className="rounded-2xl border border-white/90 bg-white/45 p-3 shadow-[0_8px_32px_-24px_rgba(3,42,172,0.2)] backdrop-blur-xl lg:p-4">
            <p className="mb-3 hidden px-3 pt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#63758a] lg:block">The survey, end to end</p>
            <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">
              {STAGES.map((item, index) => (
                <button key={item.short} type="button" aria-pressed={active === index} aria-controls={`${id}-panel`} onClick={() => setActive(index)}
                  className={cn("group relative flex min-h-16 items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#032aac] motion-reduce:transition-none", active === index ? "bg-white text-[#032aac] shadow-[0_4px_16px_-8px_rgba(3,42,172,0.24)]" : "text-[#5d7086] hover:bg-white/65 hover:text-[#032aac]")}>
                  <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg border", active === index ? "border-[#032aac]/10 bg-[#032aac]/5" : "border-[#c8dce9]/60 bg-white/25")}><item.icon aria-hidden="true" className="size-4" strokeWidth={1.6} /></span>
                  <span className="min-w-0 flex-1"><span className="block text-xs font-semibold sm:text-sm">{item.label}</span><span className="mt-1 hidden text-[11px] text-[#708095] sm:block">{item.subtitle}</span></span>
                  <ChevronRight aria-hidden="true" className={cn("hidden size-3.5 shrink-0 lg:block", active !== index && "opacity-25")} />
                </button>
              ))}
            </div>
            <div className="mt-5 hidden border-t border-[#d3e9f3] px-3 pt-5 text-[11px] leading-5 text-[#63758a] lg:block"><Link2 aria-hidden="true" className="mb-2 size-4 text-[#032aac]" />One connected record.<br />Six fewer handoff gaps to manage.</div>
          </nav>

          <div id={`${id}-panel`} role="region" aria-label={`${stage.label} comparison`} className="min-w-0 overflow-hidden rounded-2xl border border-[#d3e9f3] bg-white/80 shadow-[0_24px_70px_-45px_rgba(3,42,172,0.25)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={stage.short} initial={{ opacity: 0, y: reduceMotion ? 0 : 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.18 }}>
                <div className="border-b border-[#e4edf4] px-6 pb-6 pt-7 sm:px-8">
                  <div className="mb-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-[#6b7e92]"><span>Step {String(active + 1).padStart(2, "0")} / 06</span><span className="flex items-center gap-1.5 text-[#032aac]"><stage.icon aria-hidden="true" className="size-3" />{stage.short}</span></div>
                  <h3 className="max-w-lg font-display text-2xl font-semibold leading-tight tracking-tight text-[#031038] sm:text-[28px]">{stage.headline}</h3>
                </div>
                <div className="grid md:grid-cols-[0.85fr_1.15fr]">
                  <div className="flex flex-col p-6 sm:p-8">
                    <div className="mb-4 flex items-center gap-2 text-xs font-medium text-[#67778b]"><FileSpreadsheet aria-hidden="true" className="size-4" />With separate spreadsheets</div>
                    <p className="text-sm leading-7 text-[#637185]">{stage.manual}</p>
                    <div aria-hidden="true" className="my-6 flex items-center gap-2 text-[#abb8c6]"><span className="h-px flex-1 bg-[#e4edf4]" /><ArrowDown className="size-4 md:-rotate-90" /><span className="h-px flex-1 bg-[#e4edf4]" /></div>
                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#032aac]"><CheckCheck aria-hidden="true" className="size-4" />With Space BQS</div>
                    <p className="text-sm leading-7 text-[#253e5b]">{stage.approach}</p>
                  </div>

                  <div className="workflow-proof relative flex flex-col justify-center overflow-hidden p-6 sm:p-8">
                    <div aria-hidden="true" className="workflow-proof-grid pointer-events-none absolute inset-0 opacity-30" />
                    <div className="relative">
                      <div className="mb-5 flex items-center justify-between gap-2 text-white/80"><span className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]"><span className="size-1.5 rounded-full bg-cyan-200" />Space BQS</span><span className="text-[9px] text-white/60">Illustrative record</span></div>
                      <div className="rounded-xl border border-white/25 bg-white/[0.09] p-5 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.3)] backdrop-blur-md">
                        <div className="mb-5 flex items-start gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10"><ProofIcon aria-hidden="true" className="size-4 text-cyan-100" /></span><div><h4 className="text-sm font-semibold text-white">{stage.proofTitle}</h4><p className="mt-1 text-[10px] text-cyan-100/90">{stage.status}</p></div></div>
                        <div className="divide-y divide-white/10 border-y border-white/15">{stage.rows.map(([label, value]) => <div key={label} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-3"><span className="text-[10px] text-blue-100/75">{label}</span><span className="font-mono text-[11px] font-medium text-white">{value}</span></div>)}</div>
                        <div className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-cyan-100"><Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />{stage.artifact}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-[#d3e9f3] bg-[#f0f8fc] px-6 py-5 sm:px-8"><span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#032aac]/[0.07]"><Check aria-hidden="true" className="size-3.5 text-[#032aac]" /></span><div><p className="mb-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-[#032aac]">What changes for your team</p><p className="text-sm leading-6 text-[#314b65]">{stage.benefit}</p></div></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 lg:pl-[280px]">
          <Link href="/demo" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#032aac]">See the workflow in a demo <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></Link>
          <div className="flex items-center gap-3"><span className="mr-1 font-mono text-[10px] tabular-nums text-[#63758a]">{String(active + 1).padStart(2, "0")} / 06</span><button type="button" disabled={active === 0} onClick={() => setActive((value) => value - 1)} aria-label="Previous workflow benefit" className="flex size-9 items-center justify-center rounded-full border border-[#cbdfea] bg-white/70 text-[#032aac] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"><ArrowLeft aria-hidden="true" className="size-4" /></button><button type="button" disabled={active === STAGES.length - 1} onClick={() => setActive((value) => value + 1)} aria-label="Next workflow benefit" className="flex size-9 items-center justify-center rounded-full border border-[#cbdfea] bg-white/70 text-[#032aac] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"><ArrowRight aria-hidden="true" className="size-4" /></button></div>
        </div>

        <details className="mt-8 border-t border-[#d3e9f3] pt-5">
          <summary className="cursor-pointer text-xs font-medium text-[#536a82]">View all six differences at a glance</summary>
          <dl className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{STAGES.map((item) => <div key={item.short} className="rounded-xl border border-[#d3e9f3] bg-white/60 p-5"><dt className="mb-2 text-sm font-semibold text-[#032aac]">{item.label}</dt><dd className="text-xs leading-6 text-[#52657c]">{item.benefit}</dd></div>)}</dl>
        </details>
      </div>
    </section>
  );
}
