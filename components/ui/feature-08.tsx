// Adapted from Feature 8 by Hirael, MIT · Mohammad Shehadeh.
// https://github.com/MohammadShehadeh/hirael
"use client";

import type { ComponentProps, PointerEvent } from "react";
import { Smartphone, ShieldCheck, ChartNoAxesCombined, FileCheck2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import GradientCardShowcase from "@/components/ui/gradient-card-showcase";

const FEATURES = [
  {
    icon: Smartphone,
    title: "Surveyors on Deck",
    action: "Scan, measure, submit",
    description: "Fast mobile entry at the tank hatch. Calculate offline in engine rooms and barges, without retyping notebook readings when you step ashore.",
    tag: "Field Tool",
  },
  {
    icon: ShieldCheck,
    title: "Supervisors in Office",
    action: "Review, complete, lock",
    description: "Inspect per-tank calculations, verify Table 54B temperature corrections, and lock certificates before they reach the client.",
    tag: "Quantity Review",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Firm Owners & Ops",
    action: "Oversee fleet, volume & audit",
    description: "Track monthly tonnage, review surveyor activity, and keep a Survey Warehouse ready for later checks and client questions.",
    tag: "Business Oversight",
  },
  {
    icon: FileCheck2,
    title: "Clients & Principals",
    action: "Clear, defensible certificates",
    description: "Receive A4 PDF certificates and four-sheet Excel workbooks. Follow the readings, factors, and totals in the locked proof, with no login needed.",
    tag: "End Deliverable",
  },
];

function CrossDecor({ position }: { position: "top-start" | "bottom-end" }) {
  return <Plus aria-hidden="true" strokeWidth={1} className={cn(
    "pointer-events-none absolute z-20 size-3.5 text-[#48748e]/65",
    position === "top-start" ? "-left-[7px] -top-[7px]" : "-bottom-[7px] -right-[7px]",
  )} />;
}

function FeatureCard({ className, children, ...props }: ComponentProps<"div">) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <GradientCardShowcase {...props} onPointerMove={handlePointerMove} data-slot="feature-card" className={cn("team-glass-card group relative flex h-full flex-col gap-6 px-6 pb-8 pt-8", className)}>
      <div aria-hidden="true" className="team-glass-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none" />
      <div aria-hidden="true" className="pointer-events-none absolute -inset-y-4 left-0 w-px bg-[#739fba]/25" />
      <div aria-hidden="true" className="pointer-events-none absolute -inset-y-4 right-0 w-px bg-[#739fba]/25" />
      <div aria-hidden="true" className="pointer-events-none absolute -inset-x-4 top-0 h-px bg-[#739fba]/25" />
      <div aria-hidden="true" className="pointer-events-none absolute -inset-x-4 bottom-0 h-px bg-[#739fba]/25" />
      {children}
    </GradientCardShowcase>
  );
}

export default function Feature08() {
  return (
    <section id="section-personas" data-slot="feature" className="team-glass-section relative isolate overflow-hidden border-b border-[#D3E9F3]/60 px-6 py-20 lg:py-24">
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Badge variant="outline" className="border-[#032AAC]/15 bg-white/40 px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#032AAC] backdrop-blur-md">
            Built for the whole team
          </Badge>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-[#032AAC] sm:text-4xl">
            One platform for everyone who relies on the number.
          </h2>
          <p className="text-base leading-relaxed text-[#031038]/65">
            Designed for how bunker survey firms operate between the deck, the office, and the client.
          </p>
        </div>
        <div className="mx-auto mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title}>
              <CrossDecor position="top-start" />
              <CrossDecor position="bottom-end" />
              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-sm border border-white/80 bg-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                  <feature.icon aria-hidden="true" className="size-5 stroke-[1.5] text-[#032AAC]" />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#385873]">{feature.tag}</span>
              </div>
              <div className="relative z-10 flex flex-col gap-3">
                <h3 className="font-display text-base font-semibold text-[#031038]">{feature.title}</h3>
                <p className="font-mono text-[11px] font-medium leading-relaxed text-[#032AAC]">{feature.action}</p>
                <p className="text-sm leading-relaxed text-[#334a64]">{feature.description}</p>
              </div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}
