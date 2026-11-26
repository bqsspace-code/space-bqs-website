import type { Metadata } from "next";
import ServiceSchema from "../../components/ServiceSchema";
import Link from "next/link";
import { MarketingHeader, MarketingCard } from "../../components/MarketingPage";
import { HeroImage } from "../../components/EditorialHero";
import { Section } from "../../components/ui";
import { routeMetadata } from "../../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/services/data-migration", { title: "Marine Survey Data Migration", description: "Plan a survey-data migration with source mapping, trial import, reconciliation, and approval before the final move." });

const STEPS = [
  ["Profile & map", "Review source files, identify duplicates and missing fields, and agree what moves into the new system."],
  ["Cleanse with your team", "Apply agreed rules. Send uncertain records back for a business decision instead of silently changing them."],
  ["Run a trial import", "Import into a non-production environment and return a row-level exception report."],
  ["Reconcile & approve", "Compare counts, identifiers, sample records, and agreed totals with your nominated reviewers."],
  ["Make the final move", "Create a rollback point, import the approved data, and hand over the mapping and reconciliation record."],
];

export default function Page() {
  return <div className="bg-[#f7fbfd]"><MarketingHeader currentHref="/services/data-migration" parent="/services" parentLabel="Services" eyebrow="Data migration" title="Bring the records. Keep the context." description="A review-led migration service for Space BQS and Cargo WMS implementations. Agree the mapping, test the import, and reconcile before the final move." primaryAction={{ href: "#migration-steps", label: "Review the migration path" }} secondaryAction={{ href: "/request-demo", label: "Discuss your source data" }} visual={<HeroImage src="/assets/videos/space-bqs-survey-02.webp" alt="Surveyor using a tablet beside an open vessel tank" caption="Plan mappings and validation before the final move." position="center" />} />
    <Section id="migration-steps" eyebrow="Migration plan" title="A controlled path from source to system" lede="Review the data in stages, surface exceptions, and agree acceptance criteria with the people who own the records."><ol className="grid gap-4 md:grid-cols-2">{STEPS.map(([title, text], index) => <li key={title} className="relative min-h-[190px] rounded-2xl border border-[#d3e4ee] bg-white p-6 shadow-[0_12px_36px_-28px_rgba(3,42,172,.35)] sm:p-7"><span className="font-mono text-[10px] font-semibold tracking-[.18em] text-[#16879a]">PHASE / 0{index + 1}</span><h3 className="mt-7 font-display text-xl font-semibold text-[#031038]">{title}</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-[#52657c]">{text}</p></li>)}</ol></Section>
    <Section bg="mist" title="Scope the right data"><div className="grid gap-6 md:grid-cols-2"><MarketingCard title="For Space BQS">Review vessel particulars, tank calibration tables, supported correction references, and historical survey records. Agree how source formats and historical statuses map before import.</MarketingCard><MarketingCard title="For Cargo WMS">Review customers, manifests, cargo and location records, tariffs, and historical charges. Include any opening positions and financial reconciliation in the agreed migration scope.</MarketingCard></div></Section>
    <Section title="What to bring to the first review"><p className="max-w-3xl text-sm leading-8 text-[#52657c]">Representative spreadsheets, approximate record counts, a list of current systems, data owners, and the date you hope to switch. Migration pricing depends on source formats, volume, quality, and validation effort. Scheduled data exchange is scoped separately.</p><div className="mt-6 flex flex-wrap gap-4"><Link href="/request-demo" className="btn-primary marine-shiny marine-shiny--primary">Discuss your migration →</Link><Link href="/services/deployment" className="btn-secondary">Compare deployment options</Link></div></Section>
    <ServiceSchema offering="data-migration" />
  </div>;
}
