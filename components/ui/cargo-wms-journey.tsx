"use client";

import { useId, useState } from "react";
import { ArrowRight, Check, Package, Ship, Warehouse, Receipt, ShieldCheck, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { title: "Plan arrivals", icon: Ship, description: "Register manifests before arrival and give operations and sales the same expected-cargo view.", items: ["Excel or manual manifests, up to three months ahead", "Expected versus arrived cargo", "Manifest lines linked to receipt"] },
  { title: "Receive & destuff", icon: Package, description: "Work from the manifest, record exceptions, and prioritise containers that need attention.", items: ["Inbound records and inspection notes", "Destuffing priorities and completion tracking", "Damage photos with expiring share links"] },
  { title: "Locate & track", icon: Warehouse, description: "Keep location and movement history alongside each cargo record.", items: ["Zones, racks, and capacity allocation", "Putaway print sheets with blank location fields", "Cargo tracking and warehouse utilisation"] },
  { title: "Calculate charges", icon: Receipt, description: "Explain each bill using the selected tariff version, period, and charge inputs.", items: ["Storage, handling, destuffing, and overstay tariffs", "Configured free days and charge review", "Discount approvals and unreleased-only conditional charges"] },
  { title: "Approve release", icon: ShieldCheck, description: "Make the release requirements visible before goods leave the warehouse.", items: ["Customer appointment tokens after destuffing", "Original BL and payment collection gates", "Receiver ID details and handover signature"] },
  { title: "Handover & report", icon: Truck, description: "Close the operation with documents, a movement trail, and the reports each role needs.", items: ["Delivery notes, passes, labels, and packing records", "Customer tracking and secure document access", "Filtered PDF/Excel reports, notifications, and audit history"] },
];

export default function CargoWmsJourney() {
  const [active, setActive] = useState(0);
  const id = useId();
  const step = STEPS[active];
  return <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
    <div className="grid grid-cols-2 gap-3">{STEPS.map((item, index) => <button key={item.title} type="button" aria-pressed={active === index} aria-controls={id} onClick={() => setActive(index)} className={cn("rounded-xl border p-4 text-left transition-colors", active === index ? "border-[#032aac]/30 bg-[#e5efff]" : "border-[#d3e9f3] bg-white/70 hover:bg-white")}><item.icon aria-hidden="true" className="mb-3 size-5 text-[#032aac]" /><span className="block font-mono text-[9px] text-[#60748a]">0{index + 1}</span><span className="mt-1 block text-sm font-semibold text-[#031038]">{item.title}</span></button>)}</div>
    <div id={id} role="region" aria-label={step.title} className="liquid-glass-ui rounded-2xl border border-[#c7dfee] p-6 sm:p-8"><p className="font-mono text-[10px] uppercase tracking-wider text-[#032aac]">Proposed workflow · 0{active + 1} / 06</p><h3 className="mt-5 font-display text-3xl font-bold text-[#031038]">{step.title}</h3><p className="mt-4 text-sm leading-7 text-[#52657c]">{step.description}</p><ul className="mt-6 space-y-4">{step.items.map((item) => <li key={item} className="flex items-start gap-2 text-sm leading-6 text-[#334e69]"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#032aac]" />{item}</li>)}</ul><button type="button" onClick={() => setActive((value) => (value + 1) % STEPS.length)} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#032aac]">{active === 5 ? "Back to arrivals" : "Next operational step"}<ArrowRight aria-hidden="true" className="size-4" /></button></div>
  </div>;
}
