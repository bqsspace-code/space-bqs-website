"use client";

import { useId, useState } from "react";
import { Download, RotateCcw, Calculator } from "lucide-react";
import { volumeToMass, compareDelivery, robBalance, convertUnit, VOLUME_UNITS, MASS_UNITS } from "@/lib/survey-calculations";
import { TOOLS, type ToolSlug } from "@/app/lib/tools";

type Field = { key: string; label: string; unit: string; initial: string };
const FIELDS: Record<ToolSlug, Field[]> = {
  "volume-to-mass": [
    { key: "observed", label: "Observed volume", unit: "m³", initial: "498.120" },
    { key: "water", label: "Free-water volume", unit: "m³", initial: "0.120" },
    { key: "vcf", label: "Supplied VCF", unit: "factor", initial: "0.9677" },
    { key: "density", label: "Density at reference condition", unit: "t/m³ (same numeric value as kg/L)", initial: "0.9500" },
  ],
  "bdn-discrepancy": [
    { key: "declared", label: "BDN declared mass", unit: "MT", initial: "500" },
    { key: "measured", label: "Measured mass", unit: "MT", initial: "497.5" },
  ],
  "rob-balance": [
    { key: "opening", label: "Opening ROB", unit: "MT", initial: "250" },
    { key: "receipts", label: "Fuel received", unit: "MT", initial: "100" },
    { key: "transfers", label: "Transfers out / debunkered", unit: "MT", initial: "20" },
    { key: "closing", label: "Closing ROB", unit: "MT", initial: "180" },
  ],
  "unit-converter": [{ key: "quantity", label: "Quantity", unit: "source units", initial: "1" }],
};

function initialValues(tool: ToolSlug) {
  return Object.fromEntries(FIELDS[tool].map((field) => [field.key, field.initial]));
}

export default function SurveyTool({ tool }: { tool: ToolSlug }) {
  const id = useId();
  const config = TOOLS.find((item) => item.slug === tool)!;
  const [inputs, setInputs] = useState<Record<string, string>>(() => initialValues(tool));
  const [dimension, setDimension] = useState<"volume" | "mass">("volume");
  const [from, setFrom] = useState("m³");
  const [to, setTo] = useState("L");
  const [exportError, setExportError] = useState("");
  let rows: { label: string; value: number; unit: string }[] = [];
  let error = "";
  try {
    const values: Record<string, number> = {};
    for (const field of FIELDS[tool]) {
      if (!inputs[field.key]?.trim()) throw new Error(`Enter ${field.label.toLowerCase()}.`);
      values[field.key] = Number(inputs[field.key]);
      if (!Number.isFinite(values[field.key])) throw new Error(`${field.label} must be a finite number.`);
    }
    if (tool === "volume-to-mass") {
      const result = volumeToMass(values.observed, values.water, values.vcf, values.density);
      rows = [{ label: "Net observed volume", value: result.net, unit: "m³" }, { label: "Standard volume", value: result.standard, unit: "m³" }, { label: "Calculated mass", value: result.mass, unit: "MT" }];
    } else if (tool === "bdn-discrepancy") {
      const result = compareDelivery(values.declared, values.measured);
      rows = [{ label: "Measured minus BDN", value: result.difference, unit: "MT" }, { label: "Difference relative to BDN", value: result.percent, unit: "%" }];
    } else if (tool === "rob-balance") {
      const result = robBalance(values.opening, values.receipts, values.transfers, values.closing);
      rows = [{ label: "Opening ROB + receipts", value: result.available, unit: "MT" }, { label: "Calculated consumption", value: result.consumption, unit: "MT" }];
    } else {
      rows = [{ label: `${from} → ${to}`, value: convertUnit(values.quantity, from, to, dimension), unit: to }];
    }
  } catch (cause) { error = cause instanceof Error ? cause.message : "Check your inputs."; }

  function reset() {
    setInputs(initialValues(tool)); setDimension("volume"); setFrom("m³"); setTo("L"); setExportError("");
  }

  function exportCsv() {
    setExportError("");
    try {
      const escape = (value: string) => `"${value.replaceAll('"', '""')}"`;
      const lines = [["Worksheet", config.title], ["Created", new Date().toISOString()], ...FIELDS[tool].map((field) => [field.label, inputs[field.key], tool === "unit-converter" ? from : field.unit]), ...rows.map((row) => [row.label, String(row.value), row.unit]), ["Method", config.formula], ["Scope", config.note]];
      const blob = new Blob(["\uFEFF" + lines.map((line) => line.map(escape).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a"); link.href = url; link.download = `space-bqs-${tool}.csv`; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch { setExportError("The worksheet could not be downloaded. Try again in your browser."); }
  }

  const units = Object.keys(dimension === "volume" ? VOLUME_UNITS : MASS_UNITS);

  return <div className="overflow-hidden rounded-2xl border border-[#c7dfee] bg-white shadow-[0_20px_60px_-40px_rgba(3,42,172,.3)]">
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d3e9f3] bg-[#edf5ff] p-5 sm:px-7"><span className="flex items-center gap-2 text-sm font-semibold text-[#032aac]"><Calculator aria-hidden="true" className="size-4" />{config.title}</span><button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-lg border border-[#c6ddec] bg-white px-3 py-2 text-xs font-semibold text-[#032aac]"><RotateCcw aria-hidden="true" className="size-3.5" />Reset example</button></div>
    <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
      <div className="p-6 sm:p-8"><p className="mb-5 text-xs leading-6 text-[#60748a]">Edit the example inputs. Results update locally in your browser.</p>
        {tool === "unit-converter" && <div className="mb-5 grid gap-4 sm:grid-cols-3"><label className="text-xs font-semibold text-[#334e69]">Measurement<select value={dimension} onChange={(event) => { const next = event.target.value as "volume" | "mass"; setDimension(next); setFrom(next === "mass" ? "MT" : "m³"); setTo(next === "mass" ? "kg" : "L"); }} className="mt-2 w-full rounded-lg border border-[#c6ddec] bg-white p-3"><option value="volume">Volume</option><option value="mass">Mass</option></select></label><label className="text-xs font-semibold text-[#334e69]">From<select value={from} onChange={(event) => setFrom(event.target.value)} className="mt-2 w-full rounded-lg border border-[#c6ddec] bg-white p-3">{units.map((unit) => <option key={unit}>{unit}</option>)}</select></label><label className="text-xs font-semibold text-[#334e69]">To<select value={to} onChange={(event) => setTo(event.target.value)} className="mt-2 w-full rounded-lg border border-[#c6ddec] bg-white p-3">{units.map((unit) => <option key={unit}>{unit}</option>)}</select></label></div>}
        <div className="grid gap-5 sm:grid-cols-2">{FIELDS[tool].map((field) => <label key={field.key} htmlFor={`${id}-${field.key}`} className="text-xs font-semibold text-[#334e69]">{field.label}<span className="mt-1 block text-[10px] font-normal leading-5 text-[#6c8197]">{tool === "unit-converter" ? from : field.unit}</span><input id={`${id}-${field.key}`} type="number" min={field.key === "density" || field.key === "vcf" || field.key === "declared" ? "0.000001" : "0"} step="any" inputMode="decimal" value={inputs[field.key] ?? ""} onChange={(event) => setInputs((values) => ({ ...values, [field.key]: event.target.value }))} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} className="mt-2 w-full rounded-lg border border-[#c6ddec] bg-[#f8fbfe] px-4 py-3 font-mono text-base text-[#031038] outline-none focus:border-[#032aac] focus:ring-2 focus:ring-[#032aac]/10" /></label>)}</div>
        <p className="mt-6 text-xs leading-6 text-[#60748a]">{config.note}</p>
      </div>
      <div className="border-t border-[#d3e9f3] bg-gradient-to-br from-[#f1f8fc] to-[#e2edff] p-6 sm:p-8 lg:border-l lg:border-t-0"><p className="font-mono text-[10px] uppercase tracking-[.14em] text-[#032aac]">Worksheet result</p>
        {error ? <p id={`${id}-error`} role="status" className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">{error}</p> : <dl className="mt-4 divide-y divide-[#c8ddec]">{rows.map((row, index) => <div key={row.label} className="py-4"><dt className="text-xs text-[#52657c]">{row.label}</dt><dd className={`mt-2 break-all font-mono font-semibold tabular-nums text-[#032aac] ${index === rows.length - 1 ? "text-3xl" : "text-xl"}`}>{row.value.toLocaleString("en-US", { minimumFractionDigits: 3, maximumFractionDigits: tool === "unit-converter" ? 6 : 3 })} <span className="text-xs font-medium">{row.unit}</span></dd></div>)}</dl>}
        <p className="mt-5 text-[11px] leading-6 text-[#52657c]">{config.formula}</p>
        <button type="button" onClick={exportCsv} disabled={Boolean(error)} className="marine-shiny marine-shiny--primary mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"><Download aria-hidden="true" className="size-4" />Download worksheet CSV</button>{exportError && <p role="status" className="mt-3 text-xs text-red-700">{exportError}</p>}
      </div>
    </div>
  </div>;
}
