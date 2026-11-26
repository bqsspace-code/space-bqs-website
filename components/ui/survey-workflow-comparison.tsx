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

export const STAGES = [
  {
    label: "Capture on deck", short: "Capture", icon: ScanLine,
    subtitle: "Enter it once", headline: "Keep The First Reading. Skip The Retyping.",
    manual: "Paper notes get retyped ashore, creating avoidable transcription errors.",
    approach: "Scan the vessel QR, log tank soundings offline, and sync automatically.",
    benefit: "The office starts directly from the deck readings.",
    proofTitle: "Captured At The Source", proofIcon: WifiOff, status: "Offline capture",
    rows: [["Vessel", "QR identified"], ["Readings", "Saved on device"], ["Sync", "Auto when online"]],
    artifact: "Shared starting point",
  },
  {
    label: "Calculations", short: "Calculate", icon: Calculator,
    subtitle: "Follow the maths", headline: "A Total You Can Trace, Not Just A Cell You Trust.",
    manual: "Copied spreadsheet formulas break quietly and obscure how numbers were reached.",
    approach: "Calculation details keep the factors and inputs visible for supervisor review.",
    benefit: "Supervisors can trace the calculation before approval.",
    proofTitle: "Worked calculation check", proofIcon: Calculator, status: "Worked check",
    rows: [["Density @ 15°C", "0.9500"], ["Temp", "40°C"], ["VCF", "0.9677"]],
    artifact: "457.819 MT",
  },
  {
    label: "Correction tables", short: "Tables", icon: Layers,
    subtitle: "Keep the context", headline: "Keep The Table Behind The Calculation.",
    manual: "Pasted strapping tables can shift cells or drift from approved copies.",
    approach: "Reference tables and calculation context stay with the survey record; confirm revision handling for your release.",
    benefit: "Later checks start with the reference information recorded for the survey.",
    proofTitle: "Context stays attached", proofIcon: Layers, status: "Reference tables",
    rows: [["Strapping", "Linked"], ["Method", "ASTM 54B"], ["Check", "Worked"]],
    artifact: "Inputs + tables",
  },
  {
    label: "Certificate output", short: "Certify", icon: FileCheck2,
    subtitle: "Issue reviewed proof", headline: "Send The Proof, With The Working Behind It.",
    manual: "Plain PDFs hide the calculation context across separate attachments.",
    approach: "Prepare an A4 PDF report with an Excel workbook for the survey record.",
    benefit: "Clients receive a readable report and its supporting working.",
    proofTitle: "The client handover", proofIcon: LockKeyhole, status: "Finalised",
    rows: [["Report", "A4 PDF"], ["Workbook", "Excel"], ["Handover", "Report outputs"]],
    artifact: "Finalised record",
  },
  {
    label: "Record keeping", short: "Retrieve", icon: Database,
    subtitle: "Find the whole job", headline: "Find A Survey. Not A Trail Of Attachments.",
    manual: "Files split across folders and inboxes slow down answers to client queries.",
    approach: "Search the Survey Warehouse by IMO, survey number, port, or BDN.",
    benefit: "Retrieve survey records from the register instead of hunting through folders.",
    proofTitle: "Searchable survey record", proofIcon: Database, status: "Survey register",
    rows: [["Survey ID", "BQS-YYYY-0001"], ["Find by", "IMO · port · BDN"], ["Record", "Readings + report"]],
    artifact: "Register search",
  },
  {
    label: "Audit & history", short: "Trace", icon: History,
    subtitle: "See how it reached final", headline: "A Status Trail, Beyond 'Final_v3'.",
    manual: "Renamed file copies never prove who reviewed or approved a figure.",
    approach: "Track the survey from Draft and Calculated through review to Finalised.",
    benefit: "See the progression to the finalised record.",
    proofTitle: "The review trail", proofIcon: History, status: "Status history",
    rows: [["01 · Draft", "Entered"], ["02 · Calculated", "Calculated"], ["03 · Reviewed", "Finalised"]],
    artifact: "Status history",
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
          <nav data-glass-surface aria-label="Explore workflow benefits" className="liquid-glass-ui rounded-2xl border border-white/90 p-3 shadow-[0_8px_32px_-24px_rgba(3,42,172,0.2)] lg:p-4">
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

          <div data-glass-surface id={`${id}-panel`} role="region" aria-label={`${stage.label} comparison`} className="liquid-glass-ui liquid-glass-ui--strong min-w-0 overflow-hidden rounded-2xl border border-[#d3e9f3] shadow-[0_24px_70px_-45px_rgba(3,42,172,0.25)]">
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
                      <div data-glass-depth className="liquid-glass-ui liquid-glass-ui--dark rounded-xl border border-white/25 p-5 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.3)]">
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

      </div>
    </section>
  );
}
