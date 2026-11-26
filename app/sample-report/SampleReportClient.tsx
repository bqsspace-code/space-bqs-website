"use client";

import { useState } from "react";
import Link from "next/link";
import { Breadcrumbs, Section, AnswerBlock, CtaRow } from "../components/ui";
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
    <div className="space-y-12 pb-16">
      {/* Top Header Banner */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/sample-report", label: "Sample Report" },
          ]}
        />
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            Illustrative preview · fictional data
          </span>
          <span className="text-xs text-slate-500 font-mono">Not an issued survey report</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl">
          Sample Bunker Quantity Survey Report
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          This layout preview uses fictional example values. It is not a real survey, customer record, or issued certificate. Ask the team for a current product output sample.
        </p>

        {/* Format Selector Pills */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveFormat("pdf")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeFormat === "pdf"
                ? "bg-ocean-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>PDF report layout preview</span>
          </button>

          <button
            onClick={() => setActiveFormat("excel")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeFormat === "excel"
                ? "bg-sea-700 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Excel workbook layout preview</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Viewer */}
      <div className="mx-auto max-w-6xl px-4">
        {activeFormat === "pdf" ? (
          /* PDF Certificate Mock */
          <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-xl max-w-4xl mx-auto">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-6 py-3 text-xs text-slate-700">
              <div className="flex items-center gap-2 font-mono">
                 <span className="font-bold text-ocean-950">DOCUMENT: EXAMPLE_REPORT_LAYOUT.pdf</span>
                 <span className="text-slate-400">·</span>
                 <span className="text-slate-500">Illustrative layout</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-sea-100 px-2 py-0.5 text-[10px] font-bold text-sea-800">
                  PREVIEW ONLY
                </span>
              </div>
            </div>

            {/* A4 Sheet Surface */}
            <div className="p-8 sm:p-12 space-y-6 text-slate-800">
              {/* Header Box */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-ocean-900 pb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sea-700">
                     ILLUSTRATIVE REPORT LAYOUT
                  </span>
                  <h2 className="font-display text-2xl font-black text-ocean-950 mt-1">
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
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="border-b border-slate-200 bg-ocean-950 text-white text-[11px]">
                    <tr>
                      <th className="px-4 py-2.5">Tank Name</th>
                      <th className="px-3 py-2.5">Mode</th>
                      <th className="px-3 py-2.5">Reading</th>
                      <th className="px-3 py-2.5">Temp (°C)</th>
                      <th className="px-3 py-2.5">Obs Vol (m³)</th>
                      <th className="px-3 py-2.5">Water (m³)</th>
                      <th className="px-3 py-2.5">VCF (54B)</th>
                      <th className="px-4 py-2.5 text-right">Net Tonnes (MT)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    <tr className="bg-white">
                      <td className="px-4 py-2.5 font-bold">1P (FO)</td>
                      <td className="px-3 py-2.5">Sounding</td>
                      <td className="px-3 py-2.5">4.250 m</td>
                      <td className="px-3 py-2.5">40.0°C</td>
                      <td className="px-3 py-2.5">245.100</td>
                      <td className="px-3 py-2.5 text-sea-700">0.050</td>
                      <td className="px-3 py-2.5">0.9677</td>
                      <td className="px-4 py-2.5 text-right font-bold text-ocean-950">225.278</td>
                    </tr>
                    <tr className="bg-slate-50/60">
                      <td className="px-4 py-2.5 font-bold">1S (FO)</td>
                      <td className="px-3 py-2.5">Sounding</td>
                      <td className="px-3 py-2.5">4.380 m</td>
                      <td className="px-3 py-2.5">40.0°C</td>
                      <td className="px-3 py-2.5">252.180</td>
                      <td className="px-3 py-2.5 text-sea-700">0.070</td>
                      <td className="px-3 py-2.5">0.9677</td>
                      <td className="px-4 py-2.5 text-right font-bold text-ocean-950">231.769</td>
                    </tr>
                  </tbody>
                  <tfoot className="border-t-2 border-ocean-900 bg-ocean-50 text-ocean-950 font-bold">
                    <tr>
                      <td colSpan={7} className="px-4 py-3 text-xs uppercase tracking-wide">
                       ILLUSTRATIVE SAMPLE TOTAL
                      </td>
                      <td className="px-4 py-3 text-right text-base font-black text-sea-700">
                         457.047 MT
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Physical BDN Comparison Note */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs space-y-1">
                 <span className="font-bold text-ocean-950 block">Illustrative BDN comparison</span>
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
                    <span className="font-serif italic text-base text-ocean-900">Unsigned</span>
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
          <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-xl max-w-4xl mx-auto">
            {/* Excel Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-sea-800 px-6 py-3 text-xs text-white">
              <div className="flex items-center gap-2 font-mono">
                <FileSpreadsheet className="h-4 w-4 text-sea-300" />
               <span className="font-bold">EXAMPLE_REPORT_LAYOUT.xlsx</span>
              </div>
              <span className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white">
                Example worksheet layout
              </span>
            </div>

            {/* Excel Sheet Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-100 text-xs font-medium">
              {[
                { id: 1, name: "1. Survey Summary" },
                { id: 2, name: "2. Tank Measurements" },
                { id: 3, name: "3. Calculation Steps" },
                { id: 4, name: "4. Audit Trail" },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveExcelSheet(s.id)}
                  className={`border-r border-slate-200 px-4 py-2 transition ${
                    activeExcelSheet === s.id
                      ? "bg-white text-sea-700 font-bold border-b-2 border-b-sea-600"
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
                      <tr><td className="bg-slate-50 px-3 py-2 font-semibold w-48">SURVEY_NO</td><td className="px-3 py-2">EXAMPLE-001</td></tr>
                      <tr><td className="bg-slate-50 px-3 py-2 font-semibold">VESSEL</td><td className="px-3 py-2">Example vessel</td></tr>
                      <tr><td className="bg-slate-50 px-3 py-2 font-semibold">SAMPLE_RESULT_MT</td><td className="px-3 py-2 font-bold text-sea-700">457.047 MT</td></tr>
                      <tr><td className="bg-slate-50 px-3 py-2 font-semibold">WATER_DEDUCTED_M3</td><td className="px-3 py-2">0.120 m³</td></tr>
                      <tr><td className="bg-slate-50 px-3 py-2 font-semibold">VCF_METHOD</td><td className="px-3 py-2">Table 54B (VCF)</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeExcelSheet === 2 && (
                <div className="space-y-4 text-xs font-mono">
                  <p className="font-bold text-slate-900 uppercase">Sheet 2: Raw Tank Sounding Lines</p>
                  <table className="w-full border border-slate-200 text-left">
                    <thead className="bg-slate-50 font-bold">
                      <tr><th className="px-3 py-2">TANK</th><th className="px-3 py-2">MODE</th><th className="px-3 py-2">SOUNDING</th><th className="px-3 py-2">TEMP</th><th className="px-3 py-2">FREE_WATER</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr><td className="px-3 py-2">1P</td><td className="px-3 py-2">SOUNDING</td><td className="px-3 py-2">4.250 m</td><td className="px-3 py-2">40.0°C</td><td className="px-3 py-2">0.050 m³</td></tr>
                      <tr><td className="px-3 py-2">1S</td><td className="px-3 py-2">SOUNDING</td><td className="px-3 py-2">4.380 m</td><td className="px-3 py-2">40.0°C</td><td className="px-3 py-2">0.070 m³</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeExcelSheet === 3 && (
                <div className="space-y-4 text-xs font-mono">
                  <p className="font-bold text-slate-900 uppercase">Sheet 3: Step-by-Step VCF Corrections</p>
                  <table className="w-full border border-slate-200 text-left">
                    <thead className="bg-slate-50 font-bold">
                      <tr><th className="px-3 py-2">TANK</th><th className="px-3 py-2">GROSS_VOL</th><th className="px-3 py-2">NET_VOL</th><th className="px-3 py-2">VCF_54B</th><th className="px-3 py-2">CORRECTED_VOL</th><th className="px-3 py-2">MASS_MT</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr><td className="px-3 py-2">1P</td><td className="px-3 py-2">245.100</td><td className="px-3 py-2">245.050</td><td className="px-3 py-2">0.9677</td><td className="px-3 py-2">237.135</td><td className="px-3 py-2 font-bold">225.278</td></tr>
                      <tr><td className="px-3 py-2">1S</td><td className="px-3 py-2">252.180</td><td className="px-3 py-2">252.110</td><td className="px-3 py-2">0.9677</td><td className="px-3 py-2">243.967</td><td className="px-3 py-2 font-bold">231.769</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeExcelSheet === 4 && (
                <div className="space-y-4 text-xs font-mono">
                  <p className="font-bold text-slate-900 uppercase">Sheet 4: Example event history layout</p>
                  <table className="w-full border border-slate-200 text-left">
                    <thead className="bg-slate-50 font-bold">
                      <tr><th className="px-3 py-2">TIMESTAMP</th><th className="px-3 py-2">EVENT</th><th className="px-3 py-2">USER</th><th className="px-3 py-2">REFERENCE</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr><td className="px-3 py-2">Example time</td><td className="px-3 py-2 text-sea-700 font-bold">FINALIZED</td><td className="px-3 py-2">Example account</td><td className="px-3 py-2">Fictional</td></tr>
                      <tr><td className="px-3 py-2">Example time</td><td className="px-3 py-2 text-ocean-700">UNDER REVIEW</td><td className="px-3 py-2">Example account</td><td className="px-3 py-2">Fictional</td></tr>
                      <tr><td className="px-3 py-2">Example time</td><td className="px-3 py-2 text-slate-600">CALCULATED</td><td className="px-3 py-2">Example account</td><td className="px-3 py-2">Fictional</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-4">
        <CtaRow />
      </div>
    </div>
  );
}