import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ClipboardList, Database, FileCheck2, Receipt, Settings2, ShieldCheck, Ship, Warehouse } from "lucide-react";
import CargoWmsJourney from "@/components/ui/cargo-wms-journey";
import CargoWmsFlight from "@/components/ui/cargo-wms-flight";
import { ShinyButton } from "@/components/ui/shiny-button";
import CargoWmsControls from "./CargoWmsControls";
import { ServiceLinks } from "../../components/MarketingPage";
import WeightText from "../../components/WeightText";
import WaveTransition from "../../components/WaveTransition";
import ScrollReveal from "../../components/ScrollReveal";
import "./cargo-wms-page.css";

export const metadata: Metadata = {
  title: "Custom Cargo WMS Implementation",
  description: "Scope a Cargo WMS covering manifests, destuffing, cargo tracking, tariffs, controlled release, customer access, reporting, and data migration.",
};

const MILESTONES = [
  { icon: ClipboardList, title: "Discover the operation.", text: "Review your current spreadsheets, cargo records, and warehouse process.", outcome: "A shared view of the workflow" },
  { icon: Settings2, title: "Define the rules.", text: "Confirm tariffs, roles, release rules, and the report formats your team needs.", outcome: "An agreed implementation scope" },
  { icon: Database, title: "Validate the move.", text: "Trial the migration and reconcile the records with your nominated reviewers.", outcome: "Data checked before cutover" },
  { icon: FileCheck2, title: "Launch with your team.", text: "Test, train, launch, and hand over the operating guides for everyday use.", outcome: "A supported operational handover" },
];

function CargoHeading({ id, eyebrow, children, description }: { id: string; eyebrow: string; children: ReactNode; description: string }) {
  return <header className="cargo-section-heading">
    <div><p className="cargo-eyebrow">{eyebrow}</p><WeightText id={id} tag="h2" mode="scroll-reveal" restWeight={400} activeWeight={700} className="cargo-section-title font-display">{children}</WeightText></div>
    <p className="cargo-section-lede">{description}</p>
  </header>;
}

export default function Page() {
  return (
    <div className="cargo-wms-page">
      <section className="cargo-wms-hero" aria-labelledby="cargo-wms-title">
        <div className="cargo-hero-current" aria-hidden="true" />
        <div className="cargo-hero-inner">
          <nav aria-label="Breadcrumb" className="cargo-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/solutions">Solutions</Link><span aria-hidden="true">/</span><span aria-current="page">Cargo WMS</span></nav>
          <p className="cargo-hero-badge"><Warehouse className="h-3.5 w-3.5" aria-hidden="true" />Cargo WMS · Custom Implementation</p>
          <WeightText id="cargo-wms-title" tag="h1" mode="cursor-radius" restWeight={350} activeWeight={750} className="cargo-hero-title font-display">From Expected Cargo<br />{" "}To Controlled Release.</WeightText>
          <p className="cargo-hero-description">Manifests, locations, charges, approvals, and customer visibility. A warehouse-management solution scoped around the way your operation works.</p>
          <div className="cargo-hero-actions">
            <ShinyButton href="/request-demo" className="inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white">Discuss Your Operation<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></ShinyButton>
            <ShinyButton variant="secondary" href="#operational-journey" className="inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#031038]">Explore The Workflow<ArrowDown className="h-4 w-4" aria-hidden="true" /></ShinyButton>
          </div>
          <div className="cargo-hero-capabilities" aria-label="Core workflow areas">{[{ icon: Ship, text: "Manifests" }, { icon: Warehouse, text: "Locations" }, { icon: Receipt, text: "Charges" }, { icon: ShieldCheck, text: "Controlled release" }].map(item => <span key={item.text}><item.icon aria-hidden="true" />{item.text}</span>)}</div>
          <p className="cargo-hero-scope">Modules, integrations, and delivery agreed during discovery.</p>
        </div>
      </section>
      <WaveTransition variant="swell" to="#f0f6fc" />

      <section id="operational-journey" className="cargo-wms-section cargo-wms-cinematic" aria-labelledby="cargo-journey-heading">
        <div className="cargo-content-width"><CargoHeading id="cargo-journey-heading" eyebrow="The Operational Journey" description="Follow the proposed workflow from manifests and receipt to locations, charges, and an approved handover.">Keep Every Handoff<br />{" "}Connected.</CargoHeading></div>
        <CargoWmsFlight topOffset={96} enableSnap={true} expandOnScroll={true} distance={1500} />
        <p className="cargo-content-width cargo-scope-note">An illustrative journey through a proposed implementation. Modules, rules, acceptance criteria, and delivery dates are agreed with your team.</p>
      </section>
      <WaveTransition variant="crest" to="#e4eff9" flip />

      <section id="operational-controls" className="cargo-wms-section cargo-wms-section--mist controls-bubble-section" aria-labelledby="cargo-controls-heading">
        <div className="cargo-content-width">
          <CargoHeading id="cargo-controls-heading" eyebrow="Control At Every Handoff" description="Define who can act, who needs to approve, and how records and documents stay connected.">The Controls Beneath<br />{" "}The Workflow.</CargoHeading>
          <CargoWmsControls />
        </div>
      </section>
      <WaveTransition variant="sweep" to="#f0f6fc" />

      <section id="cargo-specifications" className="cargo-wms-section" aria-labelledby="cargo-specifications-heading">
        <div className="cargo-content-width">
          <CargoHeading id="cargo-specifications-heading" eyebrow="Explore The Details" description="Choose a stage to see the records, actions, and handoffs that can be scoped for your warehouse.">Six Stages.<br />{" "}One Connected Operation.</CargoHeading>
          <ScrollReveal><CargoWmsJourney /></ScrollReveal>
        </div>
      </section>
      <WaveTransition variant="ripple" to="#e4eff9" flip />

      <section id="cargo-implementation" className="cargo-wms-section cargo-wms-section--mist" aria-labelledby="cargo-implementation-heading">
        <div className="cargo-content-width">
          <CargoHeading id="cargo-implementation-heading" eyebrow="Your Implementation" description="Start with the operation. Agree the scope, validate the records, and prepare the people who will use the system.">Agree The Operation<br />{" "}Before The Build.</CargoHeading>
          <div className="cargo-milestones" role="list" aria-label="Implementation milestones">
            <div className="cargo-milestone-track" aria-hidden="true"><span /></div>
            <ScrollReveal stagger className="cargo-milestone-grid">
              {MILESTONES.map((item, index) => <div key={item.title} role="listitem" className="cargo-milestone">
                <div className="cargo-milestone-top"><span>0{index + 1}</span><item.icon aria-hidden="true" /></div>
                <h3>{item.title}</h3><p>{item.text}</p><span className="cargo-milestone-outcome">{item.outcome}</span>
              </div>)}
            </ScrollReveal>
          </div>
          <ScrollReveal className="cargo-support-links"><ServiceLinks /></ScrollReveal>
        </div>
      </section>
    </div>
  );
}
