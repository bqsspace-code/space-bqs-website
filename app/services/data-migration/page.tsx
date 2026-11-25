import type { Metadata } from "next";
import ServiceSchema from "../../components/ServiceSchema";
import Link from "next/link";
import { MarketingHeader, MarketingCard } from "../../components/MarketingPage";
import { Section } from "../../components/ui";

export const metadata: Metadata = { title: "Data Migration Services — Space BQS & Cargo WMS", description: "Move survey and warehouse records through mapping, cleansing, trial import, reconciliation, and an approved final import." };

const STEPS = [
  ["Profile & map", "Review source files, identify duplicates and missing fields, and agree what moves into the new system."],
  ["Cleanse with your team", "Apply agreed rules. Send uncertain records back for a business decision instead of silently changing them."],
  ["Run a trial import", "Import into a non-production environment and return a row-level exception report."],
  ["Reconcile & approve", "Compare counts, identifiers, sample records, and agreed totals with your nominated reviewers."],
  ["Make the final move", "Create a rollback point, import the approved data, and hand over the mapping and reconciliation record."],
];

export default function Page() {
  return <div className="bg-[#f7fbfd]"><MarketingHeader parent="/services" parentLabel="Services" eyebrow="Data migration" title="Bring the records. Keep the context." description="A review-led migration service for Space BQS and Cargo WMS implementations. Agree the mapping, test the import, and reconcile before the final move." />
    <Section title="A controlled path from spreadsheet to system"><ol className="space-y-4">{STEPS.map(([title, text], index) => <li key={title} className="liquid-glass-ui flex gap-5 rounded-xl border border-[#d3e9f3] p-6"><span className="font-mono text-lg text-[#032aac]">0{index + 1}</span><div><h3 className="font-display text-lg font-semibold text-[#031038]">{title}</h3><p className="mt-2 max-w-3xl text-sm leading-7 text-[#52657c]">{text}</p></div></li>)}</ol></Section>
    <Section bg="mist" title="Scope the right data"><div className="grid gap-6 md:grid-cols-2"><MarketingCard title="For Space BQS">Review vessel particulars, tank calibration tables, supported correction references, and historical survey records. Agree how source formats and historical statuses map before import.</MarketingCard><MarketingCard title="For Cargo WMS">Review customers, manifests, cargo and location records, tariffs, and historical charges. Include any opening positions and financial reconciliation in the agreed migration scope.</MarketingCard></div></Section>
    <Section title="What to bring to the first review"><p className="max-w-3xl text-sm leading-8 text-[#52657c]">Representative spreadsheets, approximate record counts, a list of current systems, data owners, and the date you hope to switch. Migration pricing depends on source formats, volume, quality, and validation effort. Scheduled data exchange is scoped separately.</p><div className="mt-6 flex flex-wrap gap-4"><Link href="/request-demo" className="btn-primary marine-shiny marine-shiny--primary">Discuss your migration →</Link><Link href="/services/deployment" className="btn-secondary">Compare deployment options</Link></div></Section>
    <ServiceSchema path="/services/data-migration" name="Data migration services" description="Map, trial-import and reconcile survey and warehouse records for Space BQS and Cargo WMS implementations." />
  </div>;
}
