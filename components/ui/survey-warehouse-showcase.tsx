"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Archive, ArrowRight, Check, ChevronRight, Database, FileCheck2,
  FileSpreadsheet, FolderOpen, Layers, LockKeyhole, Search, Ship, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const BENEFITS = [
  { icon: Search, title: "Find the survey", subtitle: "Search, not folder-hunt.", detail: "Use survey identifiers to get back to the whole record. Try “Singapore”, “ROB”, or “0002” in this sample archive." },
  { icon: Layers, title: "Keep the context", subtitle: "Tables stay with the job.", detail: "The supporting table versions and engine context stay with the survey, so a later check starts with the right inputs." },
  { icon: LockKeyhole, title: "Trust the final", subtitle: "A clear, locked end point.", detail: "Finalisation locks the record. Its status history shows how the survey progressed through calculation and review." },
  { icon: FileCheck2, title: "Share the proof", subtitle: "A readable client handover.", detail: "A PDF certificate and four-sheet Excel workbook keep the issued result and supporting calculations together." },
] as const;

const RECORDS = [
  { id: "BQS-2026-0001", vessel: "Demo vessel A", port: "Singapore", type: "Bunker delivery", bdn: "BDN-DEMO-01", date: "12 Oct 2026", tanks: "6", revision: "STR-003" },
  { id: "BQS-2026-0002", vessel: "Demo vessel B", port: "Rotterdam", type: "ROB / on-hire", bdn: "—", date: "14 Oct 2026", tanks: "4", revision: "STR-002" },
  { id: "BQS-2026-0003", vessel: "Demo vessel C", port: "Fujairah", type: "Debunkering", bdn: "BDN-DEMO-03", date: "16 Oct 2026", tanks: "3", revision: "STR-005" },
] as const;

export default function SurveyWarehouseShowcase() {
  const [view, setView] = useState(0);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string>(RECORDS[0].id);
  const reduceMotion = useReducedMotion();
  const id = useId();
  const matches = RECORDS.filter((record) => `${record.id} ${record.vessel} ${record.port} ${record.type} ${record.bdn}`.toLowerCase().includes(query.trim().toLowerCase()));
  const record = matches.find((item) => item.id === selected) || matches[0];
  const benefit = BENEFITS[view];

  return (
    <section id="section-warehouse" aria-labelledby={`${id}-heading`} className="warehouse-showcase relative isolate overflow-hidden border-b border-[#d3e9f3]/60 px-6 py-20 lg:py-28">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#032aac]"><Archive aria-hidden="true" className="size-3.5" />The Survey Warehouse</p>
            <h2 id={`${id}-heading`} className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#031038] sm:text-4xl lg:text-5xl">The job is finished.<br /><span className="text-[#032aac]">The proof stays together.</span></h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[#52657c]">When a client asks months later, open the record. Find the readings, table versions, review history, and issued files together.</p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {BENEFITS.map((item, index) => (
            <button key={item.title} type="button" onClick={() => setView(index)} aria-pressed={view === index} aria-controls={`${id}-record`} className={cn("group relative overflow-hidden rounded-xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#032aac] sm:p-5", view === index ? "border-[#032aac]/25 bg-white/90 shadow-[0_8px_24px_-18px_rgba(3,42,172,.3)]" : "border-white/90 bg-white/35 hover:border-[#032aac]/15 hover:bg-white/65")}>
              <div className="mb-4 flex items-center justify-between"><item.icon aria-hidden="true" strokeWidth={1.6} className={cn("size-5", view === index ? "text-[#032aac]" : "text-[#6a8197]")} /><span className="font-mono text-[9px] text-[#8092a5]">0{index + 1}</span></div>
              <h3 className="text-sm font-semibold text-[#031038]">{item.title}</h3><p className="mt-1.5 text-xs leading-5 text-[#60748a]">{item.subtitle}</p>
              {view === index && <motion.span layoutId={`${id}-active`} transition={{ duration: reduceMotion ? 0 : 0.25 }} aria-hidden="true" className="absolute inset-x-5 bottom-0 h-0.5 rounded-full bg-[#032aac]" />}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#c6ddea] bg-white/80 shadow-[0_32px_80px_-48px_rgba(3,42,172,.4)]">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#071e52] px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3"><span aria-hidden="true" className="flex size-7 items-center justify-center rounded-lg border border-white/20 bg-white/10"><Database className="size-3.5 text-cyan-100" /></span><span className="text-xs font-medium text-white">Survey Warehouse</span><span className="hidden text-white/25 sm:inline">/</span><span className="hidden text-[11px] text-white/55 sm:inline">Finalised records</span></div>
            <span className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-blue-100/80">Interactive preview · sample data</span>
          </div>

          <div className="grid lg:grid-cols-[290px_minmax(0,1fr)]">
            <div className="border-b border-[#d7e7f0] bg-[#f4f9fd]/90 p-4 lg:border-b-0 lg:border-r lg:p-5">
              <label htmlFor={`${id}-search`} className="mb-2 block font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-[#5e748c]">Try searching the archive</label>
              <div className="relative"><Search aria-hidden="true" className="pointer-events-none absolute left-3 top-3.5 size-4 text-[#647f99]" /><input id={`${id}-search`} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Survey, port, vessel, BDN…" className="h-11 w-full rounded-lg border border-[#ccdfec] bg-white pl-9 pr-9 text-xs text-[#031038] outline-none placeholder:text-[#8495a6] focus:border-[#032aac] focus:ring-2 focus:ring-[#032aac]/10 [&::-webkit-search-cancel-button]:appearance-none" />{query && <button type="button" aria-label="Clear archive search" onClick={() => setQuery("")} className="absolute right-2 top-2.5 rounded p-1 text-[#62798f] hover:bg-[#eaf4f9]"><X aria-hidden="true" className="size-3.5" /></button>}</div>
              <p role="status" className="mb-3 mt-4 text-[10px] text-[#71849a]">{matches.length} sample {matches.length === 1 ? "record" : "records"}</p>
              <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {matches.map((item) => <button key={item.id} type="button" aria-pressed={record?.id === item.id} onClick={() => setSelected(item.id)} className={cn("rounded-xl border p-3.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-[#032aac]", record?.id === item.id ? "border-[#032aac]/20 bg-white shadow-[0_4px_16px_-12px_rgba(3,42,172,.35)]" : "border-transparent hover:border-[#d3e9f3] hover:bg-white/70")}>
                  <div className="flex items-center justify-between gap-2"><span className="font-mono text-[10px] font-semibold text-[#032aac]">{item.id}</span><ChevronRight aria-hidden="true" className="size-3 text-[#032aac]/50" /></div>
                  <span className="mt-2 block text-xs font-semibold text-[#203952]">{item.vessel}</span><span className="mt-1 block text-[10px] leading-5 text-[#667d93]">{item.type} · {item.port}</span>
                </button>)}
              </div>
              {matches.length === 0 && <p className="py-6 text-xs leading-6 text-[#62798f]">No sample records match. Try “Singapore” or clear your search.</p>}
              <p className="mt-5 hidden border-t border-[#dce9f2] pt-4 text-[10px] leading-5 text-[#7c8ea1] lg:block">Explore the interface using fictional records. No client data is shown.</p>
            </div>

            <div id={`${id}-record`} role="region" aria-label={benefit.title} className="min-w-0">
              {record ? <>
                <div className="warehouse-record-header relative overflow-hidden px-6 py-6 sm:px-8">
                  <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 size-56 rounded-full border border-white/10 shadow-[0_0_0_35px_rgba(255,255,255,.025),0_0_0_70px_rgba(255,255,255,.02)]" />
                  <div className="relative flex flex-wrap items-center justify-between gap-3"><span className="flex items-center gap-2 font-mono text-[10px] text-white/75"><Ship aria-hidden="true" className="size-3.5" />{record.vessel}</span><span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-100/20 bg-white/10 px-2.5 py-1 text-[9px] text-cyan-100"><LockKeyhole aria-hidden="true" className="size-3" />Finalised · locked</span></div>
                  <h3 className="relative mt-4 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">{record.id}</h3><p className="relative mt-2 text-xs text-blue-100/80">{record.type} <span className="mx-2 text-white/25">/</span> {record.port} <span className="mx-2 text-white/25">/</span> {record.date}</p>
                </div>

                <div className="min-h-[350px] px-6 py-6 sm:px-8">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={`${view}-${record.id}`} initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.16 }}>
                      <div className="mb-5 flex items-center justify-between gap-3"><h4 className="text-sm font-semibold text-[#162e4b]">{["The whole job, in one record", "The calculation context, preserved", "A final record with a review trail", "Proof your client can follow"][view]}</h4><span className="hidden font-mono text-[9px] uppercase tracking-wider text-[#8a9bae] sm:block">0{view + 1} / 04</span></div>

                      {view === 0 && <>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">{[["Tank records", record.tanks], ["Engine", "v1.0.0"], ["Outputs", "PDF + Excel"]].map(([label, value]) => <div key={label} className="rounded-lg border border-[#dae8f2] bg-[#f5f9fd] p-3 sm:p-4"><span className="block text-[9px] text-[#687f96]">{label}</span><span className="mt-2 block font-mono text-xs font-semibold text-[#032aac] sm:text-sm">{value}</span></div>)}</div>
                        <div className="mt-5 divide-y divide-[#e5eef5]">{[["Survey particulars", "Vessel · port · job identifiers"], ["Measurement record", "Tank readings + calculation steps"], ["Review & outputs", "Status history + issued files"]].map(([label, value]) => <div key={label} className="flex flex-wrap items-center justify-between gap-2 py-3"><span className="flex items-center gap-2 text-xs font-medium text-[#324b65]"><Check aria-hidden="true" className="size-3.5 text-[#032aac]" />{label}</span><span className="text-[10px] text-[#72869b]">{value}</span></div>)}</div>
                      </>}

                      {view === 1 && <>
                        <div className="rounded-xl border border-[#dae8f2] bg-[#f5f9fd] p-4"><div className="mb-4 flex items-center gap-2 text-xs font-semibold text-[#032aac]"><Layers aria-hidden="true" className="size-4" />Supporting versions</div>{[["Vessel strapping revision", record.revision], ["Temperature correction", "ASTM Table 54B"], ["Calculation engine", "v1.0.0"]].map(([label, value]) => <div key={label} className="flex flex-wrap justify-between gap-2 border-t border-[#dce9f2] py-3 text-xs"><span className="text-[#647c93]">{label}</span><span className="font-mono font-medium text-[#243f60]">{value}</span></div>)}</div>
                        <p className="mt-4 flex items-start gap-2 text-xs leading-6 text-[#60778e]"><Database aria-hidden="true" className="mt-1 size-3.5 shrink-0 text-[#032aac]" />Open the survey’s saved context, rather than hunting for the workbook used that day.</p>
                      </>}

                      {view === 2 && <>
                        <div className="mb-5 flex items-center gap-3 rounded-xl border border-[#d7e7f2] bg-[#eef6fc] p-4"><LockKeyhole aria-hidden="true" className="size-5 text-[#032aac]" /><div><p className="text-xs font-semibold text-[#032aac]">Finalised record · read-only</p><p className="mt-1 text-[10px] leading-5 text-[#688097]">The issued record has reached its locked end point.</p></div></div>
                        <ol className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">{["Draft", "Calculated", "Under review", "Finalised"].map((status, index) => <li key={status} className="relative"><div className="mb-2 flex items-center gap-2"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#032aac] text-white"><Check aria-hidden="true" className="size-3" /></span>{index < 3 && <span aria-hidden="true" className="h-px flex-1 bg-[#b9d0e9]" />}</div><span className="text-[10px] font-medium text-[#334e69]">{status}</span></li>)}</ol>
                        <p className="mt-5 text-xs leading-6 text-[#60778e]">Follow the web lifecycle from first draft through review to finalisation.</p>
                      </>}

                      {view === 3 && <>
                        <div className="grid gap-3 sm:grid-cols-2">{[{ icon: FileCheck2, type: "PDF", title: "Quantity certificate", desc: "A4 client-facing result" }, { icon: FileSpreadsheet, type: "XLSX", title: "Audit workbook", desc: "Four sheets of supporting detail" }].map((file) => <div key={file.type} className="rounded-xl border border-[#d7e7f2] bg-gradient-to-br from-[#f3f8fd] to-white p-5"><div className="mb-5 flex items-center justify-between"><file.icon aria-hidden="true" strokeWidth={1.4} className="size-8 text-[#032aac]" /><span className="rounded border border-[#d4e5f1] bg-white px-2 py-1 font-mono text-[9px] text-[#647d95]">{file.type}</span></div><p className="text-xs font-semibold text-[#203c5c]">{file.title}</p><p className="mt-2 text-[10px] leading-5 text-[#698098]">{file.desc}</p></div>)}</div>
                        <Link href="/sample-report" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#032aac]">Explore the sample report format <ArrowRight aria-hidden="true" className="size-3.5" /></Link>
                      </>}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </> : <div className="flex min-h-[450px] flex-col items-center justify-center px-6 text-center"><FolderOpen aria-hidden="true" className="mb-4 size-10 text-[#96aec4]" /><h3 className="text-base font-semibold text-[#304c68]">No matching survey in this preview</h3><p className="mt-2 max-w-xs text-xs leading-6 text-[#6d8399]">Search the three sample records by survey number, vessel, port, job type, or BDN.</p><button type="button" onClick={() => setQuery("")} className="mt-4 rounded-lg border border-[#c9dfee] bg-white px-4 py-2 text-xs font-semibold text-[#032aac]">Show all sample surveys</button></div>}
            </div>
          </div>

          <div className="flex items-start gap-3 border-t border-[#d7e7f0] bg-[#edf6fc] px-5 py-5 sm:px-6"><benefit.icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#032aac]" /><p className="text-xs leading-6 text-[#49657f]">{benefit.detail}</p></div>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><p className="flex items-center gap-2 text-[11px] text-[#697f95]"><span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-[#19b5c9]" />Readings. Calculations. Table versions. History. Outputs.</p><Link href="/features/survey-register-dashboard" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#032aac]">Explore Register & Dashboard <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></Link></div>
      </div>
    </section>
  );
}
