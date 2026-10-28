"use client";

import { useId, useState } from "react";
import { Cloud, Server, Building2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { name: "Public cloud", icon: Cloud, best: "Teams looking for a hosted application without operating their own application infrastructure.", environment: "Hosted cloud environment", ownership: "Hosting and operational responsibilities agreed in the service plan", scope: ["Choose the hosting region and service tier", "Agree tenant access, backup retention, and recovery targets", "Define upgrades, support hours, and monitoring ownership"] },
  { name: "Private cloud", icon: Server, best: "Organisations needing a dedicated cloud environment and infrastructure controls aligned with their policies.", environment: "Dedicated cloud environment", ownership: "Customer and delivery-team responsibilities agreed before provisioning", scope: ["Agree cloud account, network boundaries, and identity requirements", "Size database, storage, and background processing", "Define access, patching, recovery testing, and support boundaries"] },
  { name: "On-premises", icon: Building2, best: "Organisations that need deployment within their own infrastructure and can provide an operating environment.", environment: "Customer-operated infrastructure", ownership: "Infrastructure, remote access, updates, and application support explicitly allocated", scope: ["Review servers, networking, certificates, and storage prerequisites", "Confirm mobile connectivity and integration dependencies", "Agree backup, restore, upgrades, monitoring, and handover runbooks"] },
];

export default function DeploymentOptions() {
  const [active, setActive] = useState(0);
  const id = useId();
  const option = OPTIONS[active];
  return <div><div className="grid gap-3 sm:grid-cols-3">{OPTIONS.map((item, index) => <button key={item.name} type="button" aria-pressed={index === active} aria-controls={id} onClick={() => setActive(index)} className={cn("flex items-center gap-3 rounded-xl border p-5 text-left text-sm font-semibold", active === index ? "border-[#032aac]/30 bg-[#e4eeff] text-[#032aac]" : "border-[#d3e9f3] bg-white/70 text-[#52657c]")}><item.icon aria-hidden="true" className="size-5" />{item.name}</button>)}</div>
    <div id={id} role="region" aria-label={option.name} className="liquid-glass-ui mt-5 grid gap-8 rounded-2xl border border-[#d3e9f3] p-6 sm:p-8 lg:grid-cols-2"><div><h3 className="font-display text-2xl font-bold text-[#031038]">{option.name}</h3><p className="mt-4 text-sm leading-7 text-[#52657c]">{option.best}</p><dl className="mt-5 space-y-3 text-xs"><div><dt className="font-semibold text-[#032aac]">Environment</dt><dd className="mt-1 leading-6 text-[#52657c]">{option.environment}</dd></div><div><dt className="font-semibold text-[#032aac]">Operational ownership</dt><dd className="mt-1 leading-6 text-[#52657c]">{option.ownership}</dd></div></dl></div><div><h4 className="text-sm font-semibold text-[#032aac]">What we scope together</h4><ul className="mt-5 space-y-4">{option.scope.map((item) => <li key={item} className="flex gap-2 text-sm leading-7 text-[#52657c]"><Check aria-hidden="true" className="mt-1.5 size-4 shrink-0 text-[#032aac]" />{item}</li>)}</ul></div></div>
  </div>;
}
