"use client";

import { useState } from "react";
import Link from "next/link";
import { Section, AnswerBlock } from "../components/ui";
import {
  FileText,
  FileSpreadsheet,
  Download,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Table,
  Layers,
  Fingerprint,
} from "lucide-react";

export default function SampleReportPage() {
  const [activeFormat, setActiveFormat] = useState<"pdf" | "excel">("pdf");
  const [activeExcelSheet, setActiveExcelSheet] = useState<number>(1);

  return (
    <div className="relative space-y-8 overflow-clip bg-[#f1f7fb] py-12 sm:py-16">
      <span aria-hidden="true" className="aurora-orb -right-24 top-10 size-[26rem] bg-[#7fc4f2]/45" />
      <span aria-hidden="true" className="aurora-orb -left-28 bottom-40 size-[24rem] bg-[#5fd3d8]/35" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[#b8dbea] bg-white/70 px-3 py-1 text-xs font-semibold text-[#032aac] backdrop-blur">
            Illustrative preview · fictional data
          </span>
          <span className="text-xs text-slate-500 font-mono">Not an issued survey report</span>
        </div>

        {/* Format Selector Pills */}
        <div className="mt-5 flex flex-wrap gap-2 pb-2" role="group" aria-label="Choose a sample report format">
          <button
            type="button"
            onClick={() => setActiveFormat("pdf")}
            aria-pressed={activeFormat === "pdf"}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeFormat === "pdf"
                ? "bg-[#031038] text-white shadow-sm ring-2 ring-[#19b5c9] ring-offset-2"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>PDF report layout preview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFormat("excel")}
            aria-pressed={activeFormat === "excel"}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeFormat === "excel"
                ? "bg-[#032aac] text-white shadow-sm ring-2 ring-[#19b5c9] ring-offset-2"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Excel workbook layout preview</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Viewer */}
      <div className="relative mx-auto max-w-6xl px-4">
        {activeFormat === "pdf" ? (
          /* PDF Certificate Mock */
          <div id="sample-report-pdf" role="region" aria-label="Illustrative PDF report preview" className="overflow-hidden rounded-2xl border border-[#cddfef] bg-white shadow-[0_24px_70px_-38px_rgba(3,16,56,.42)] max-w-4xl mx-auto">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-6 py-3 text-xs text-slate-700">
              <div className="flex items-center gap-2 font-mono">
                <span className="font-bold text-[#031038]">DOCUMENT: EXAMPLE_REPORT_LAYOUT.pdf</span>
                 <span className="text-slate-400">·</span>
                 <span className="text-slate-500">Illustrative layout</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#dff3f3] px-2 py-0.5 text-[10px] font-bold text-[#075f68]">
                  PREVIEW ONLY
                </span>
              </div>
            </div>

            {/* A4 Sheet Surface */}
            <div className="p-8 sm:p-12 space-y-6 text-slate-800">
              {/* Header Box */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-[#032aac] pb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#087f8c]">
                     ILLUSTRATIVE REPORT LAYOUT
                  </span>
                  <h2 className="font-display text-2xl font-black text-[#031038] mt-1">
                    BUNKER QUANTITY SURVEY REPORT
                  </h2>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                     Example reference: <strong>EXAMPLE-001</strong> · Fictional data
                  </p>
                </div>
                <div className="text-right font-mono text-xs text-slate-600 sm:border-l sm:border-slate-200 sm:pl-6">
                   <p>Date: <strong>Example date</strong></p>
                   <p>Port: <strong>Example port</strong></p>
                   <p>Location: <strong>Not a real survey</strong></p>
                </div>
              </div>

              {/* Vessel Particulars Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl bg-slate-50 p-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Vessel Name</span>
                   <span className="font-bold text-slate-900">Example vessel</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">IMO Number</span>
                   <span className="font-mono font-bold text-slate-900">Fictional example</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Fuel Grade</span>
                  <span className="font-bold text-slate-900">VLSFO (0.5% S)</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">BDN Reference</span>
                  <span className="font-mono text-slate-800">BDN-SIN-994120</span>
                </div>
              </div>

              {/* Tank Breakdown Table */}
              <div role="region" aria-label="Tank breakdown table; scroll horizontally to see all columns" tabIndex={0} className="overflow-x-auto overscroll-x-contain rounded-xl border border-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#032aac]">
                <table className="w-full min-w-[720px] text-left text-xs font-mono">
                  <thead className="border-b border-slate-200 bg-[#031038] text-white text-[11px]">
                    <tr>
                      <th scope="col" className="px-4 py-2.5">Tank Name</th>
                      <th scope="col" className="px-3 py-2.5">Mode</th>
                      <th scope="col" className="px-3 py-2.5">Reading</th>
                      <th scope="col" className="px-3 py-2.5">Temp (°C)</th>
                      <th scope="col" className="px-3 py-2.5">Obs Vol (m³)</th>
                      <th scope="col" className="px-3 py-2.5">Water (m³)</th>
                      <th scope="col" className="px-3 py-2.5">VCF (54B)</th>
                      <th scope="col" className="px-4 py-2.5 text-right">Net Tonnes (MT)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    <tr className="bg-white">
                      <td className="px-4 py-2.5 font-bold">1P (FO)</td>
                      <td className="px-3 py-2.5">Sounding</td>
                      <td className="px-3 py-2.5">4.250 m</td>
                      <td className="px-3 py-2.5">40.0°C</td>
                      <td className="px-3 py-2.5">245.100</td>
                      <td className="px-3 py-2.5 text-[#087f8c]">0.050</td>
                      <td className="px-3 py-2.5">0.9677</td>
                      <td className="px-4 py-2.5 text-right font-bold text-[#031038]">225.278</td>
                    </tr>
                    <tr className="bg-slate-50/60">
                      <td className="px-4 py-2.5 font-bold">1S (FO)</td>
                      <td className="px-3 py-2.5">Sounding</td>
                      <td className="px-3 py-2.5">4.380 m</td>
                      <td className="px-3 py-2.5">40.0°C</td>
                      <td className="px-3 py-2.5">252.180</td>
                      <td className="px-3 py-2.5 text-[#087f8c]">0.070</td>
                      <td className="px-3 py-2.5">0.9677</td>
                      <td className="px-4 py-2.5 text-right font-bold text-[#031038]">231.769</td>
                    </tr>
                  </tbody>
                  <tfoot className="border-t-2 border-[#032aac] bg-[#eaf4f9] text-[#031038] font-bold">
                    <tr>
                      <td colSpan={7} className="px-4 py-3 text-xs uppercase tracking-wide">
                       ILLUSTRATIVE SAMPLE TOTAL
                      </td>
                      <td className="px-4 py-3 text-right text-base font-black text-[#087f8c]">
                         457.047 MT
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Physical BDN Comparison Note */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs space-y-1">
                 <span className="font-bold text-[#031038] block">Illustrative BDN comparison</span>
                <p className="text-slate-500 max-w-md">
                   Example BDN figure: <strong>460.000 MT</strong>. Example calculated figure: <strong>457.047 MT</strong>. Arithmetic difference: <strong>−2.953 MT (−0.64%)</strong>. These are fictional values for layout illustration only.
                </p>
              </div>

               <div className="border-t border-slate-200 pt-4 text-[10px] text-slate-500">
                 Illustrative report layout only. No survey attendance, approval, signature, or verification is represented.
               </div>

              {/* Signatures & Tamper-Proof Seal */}
              <div className="grid grid-cols-2 gap-8 border-t border-slate-200 pt-6 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Attending Marine Surveyor</span>
                  <div className="mt-2 h-10 border-b border-dashed border-slate-400 flex items-center">
                    <span className="font-serif italic text-base text-[#032aac]">Unsigned</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Chief Engineer Acknowledgment</span>
                  <div className="mt-2 h-10 border-b border-dashed border-slate-400 flex items-center">
                    <span className="rounded bg-slate-200 px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-700">
                      No signature on this sample
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Hash & Disclaimer Footer */}
              <div className="border-t border-slate-200 pt-4 flex flex-wrap justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>Space BQS · Certificate layout preview</span>
              </div>
            </div>
          </div>
        ) : (
          /* Excel Workbook Mock */
          <div id="sample-report-excel" role="region" aria-label="Illustrative Excel workbook preview" className="overflow-hidden rounded-2xl border border-[#cddfef] bg-white shadow-[0_24px_70px_-38px_rgba(3,16,56,.42)] max-w-4xl mx-auto">
            {/* Excel Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-[#075f68] px-6 py-3 text-xs text-white">
              <div className="flex items-center gap-2 font-mono">
                <FileSpreadsheet className="h-4 w-4 text-[#a5f3fc]" />
               <span className="font-bold">EXAMPLE_REPORT_LAYOUT.xlsx</span>
              </div>
              <span className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white">
                Example worksheet layout
              </span>
            </div>

            {/* Excel Sheet Tabs */}
            <div role="group" aria-label="Choose a workbook sheet" className="flex overflow-x-auto border-b border-slate-200 bg-slate-100 text-xs font-medium">
              {[
                { id: 1, name: "1. Survey Summary" },
                { id: 2, name: "2. Tank Measurements" },
                { id: 3, name: "3. Calculation Steps" },
                { id: 4, name: "4. Audit Trail" },
              ].map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setActiveExcelSheet(s.id)}
                  aria-pressed={activeExcelSheet === s.id}
                  className={`shrink-0 whitespace-nowrap border-r border-slate-200 px-4 py-2 transition focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#032aac] ${
                    activeExcelSheet === s.id
                      ? "bg-white text-[#075f68] font-bold border-b-2 border-b-[#087f8c]"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {/* Sheet Content Preview */}
            <div className="p-6">
              {activeExcelSheet === 1 && (
                <div className="space-y-4 text-xs font-mono">
                  <p className="font-bold text-slate-900 uppercase">Sheet 1: Example survey overview</p>
                  <table className="w-full border border-slate-200 text-left">
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr><th scope="row" className="bg-slate-50 px-3 py-2 text-left font-semibold w-48">SURVEY_NO</th><td className="px-3 py-2">EXAMPLE-001</td></tr>
                      <tr><th scope="row" className="bg-slate-50 px-3 py-2 text-left font-semibold">VESSEL</th><td className="px-3 py-2">Example vessel</td></tr>
                      <tr><th scope="row" className="bg-slate-50 px-3 py-2 text-left font-semibold">SAMPLE_RESULT_MT</th><td className="px-3 py-2 font-bold text-[#075f68]">457.047 MT</td></tr>
                      <tr><th scope="row" className="bg-slate-50 px-3 py-2 text-left font-semibold">WATER_DEDUCTED_M3</th><td className="px-3 py-2">0.120 m³</td></tr>
                      <tr><th scope="row" className="bg-slate-50 px-3 py-2 text-left font-semibold">VCF_METHOD</th><td className="px-3 py-2">Table 54B (VCF)</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeExcelSheet === 2 && (
                <div className="space-y-4 text-xs font-mono">
                  <p className="font-bold text-slate-900 uppercase">Sheet 2: Raw Tank Sounding Lines</p>
                  <div role="region" aria-label="Raw tank measurements table; scroll horizontally to see all columns" tabIndex={0} className="max-w-full overflow-x-auto overscroll-x-contain rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#032aac]"><table className="min-w-[520px] border border-slate-200 text-left">
                    <thead className="bg-slate-50 font-bold">
                      <tr><th className="px-3 py-2">TANK</th><th className="px-3 py-2">MODE</th><th className="px-3 py-2">SOUNDING</th><th className="px-3 py-2">TEMP</th><th className="px-3 py-2">FREE_WATER</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr><td className="px-3 py-2">1P</td><td className="px-3 py-2">SOUNDING</td><td className="px-3 py-2">4.250 m</td><td className="px-3 py-2">40.0°C</td><td className="px-3 py-2">0.050 m³</td></tr>
                      <tr><td className="px-3 py-2">1S</td><td className="px-3 py-2">SOUNDING</td><td className="px-3 py-2">4.380 m</td><td className="px-3 py-2">40.0°C</td><td className="px-3 py-2">0.070 m³</td></tr>
                    </tbody>
                  </table></div>
                </div>
              )}

              {activeExcelSheet === 3 && (
                <div className="space-y-4 text-xs font-mono">
                  <p className="font-bold text-slate-900 uppercase">Sheet 3: Step-by-Step VCF Corrections</p>
                  <div role="region" aria-label="Calculation steps table; scroll horizontally to see all columns" tabIndex={0} className="max-w-full overflow-x-auto overscroll-x-contain rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#032aac]"><table className="min-w-[620px] border border-slate-200 text-left">
                    <thead className="bg-slate-50 font-bold">
                      <tr><th className="px-3 py-2">TANK</th><th className="px-3 py-2">GROSS_VOL</th><th className="px-3 py-2">NET_VOL</th><th className="px-3 py-2">VCF_54B</th><th className="px-3 py-2">CORRECTED_VOL</th><th className="px-3 py-2">MASS_MT</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr><td className="px-3 py-2">1P</td><td className="px-3 py-2">245.100</td><td className="px-3 py-2">245.050</td><td className="px-3 py-2">0.9677</td><td className="px-3 py-2">237.135</td><td className="px-3 py-2 font-bold">225.278</td></tr>
                      <tr><td className="px-3 py-2">1S</td><td className="px-3 py-2">252.180</td><td className="px-3 py-2">252.110</td><td className="px-3 py-2">0.9677</td><td className="px-3 py-2">243.967</td><td className="px-3 py-2 font-bold">231.769</td></tr>
                    </tbody>
                  </table></div>
                </div>
              )}

              {activeExcelSheet === 4 && (
                <div className="space-y-4 text-xs font-mono">
                  <p className="font-bold text-slate-900 uppercase">Sheet 4: Example event history layout</p>
                  <div role="region" aria-label="Example event history table; scroll horizontally to see all columns" tabIndex={0} className="max-w-full overflow-x-auto overscroll-x-contain rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#032aac]"><table className="min-w-[500px] border border-slate-200 text-left">
                    <thead className="bg-slate-50 font-bold">
                      <tr><th className="px-3 py-2">TIMESTAMP</th><th className="px-3 py-2">EVENT</th><th className="px-3 py-2">USER</th><th className="px-3 py-2">REFERENCE</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr><td className="px-3 py-2">Example time</td><td className="px-3 py-2 font-bold text-[#075f68]">FINALIZED</td><td className="px-3 py-2">Example account</td><td className="px-3 py-2">Fictional</td></tr>
                      <tr><td className="px-3 py-2">Example time</td><td className="px-3 py-2 text-[#032aac]">UNDER REVIEW</td><td className="px-3 py-2">Example account</td><td className="px-3 py-2">Fictional</td></tr>
                      <tr><td className="px-3 py-2">Example time</td><td className="px-3 py-2 text-slate-600">CALCULATED</td><td className="px-3 py-2">Example account</td><td className="px-3 py-2">Fictional</td></tr>
                    </tbody>
                  </table></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}