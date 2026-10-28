import type { Metadata } from "next";
import Link from "next/link";
import CargoWmsJourney from "@/components/ui/cargo-wms-journey";
import { MarketingHeader, MarketingCard, ServiceLinks } from "../../components/MarketingPage";
import { Section } from "../../components/ui";

export const metadata: Metadata = { title: "Cargo WMS — Custom Warehouse Management Implementation", description: "Scope a Cargo WMS covering manifests, destuffing, cargo tracking, tariffs, controlled release, customer access, reporting, and data migration." };

export default function Page() {
  return <div className="bg-[#f7fbfd]"><MarketingHeader eyebrow="Cargo WMS · Custom implementation" title="From expected cargo to controlled release." description="A warehouse-management solution scoped around your operation: manifests, locations, charges, approvals, documents, and customer visibility in one controlled workflow." />
    <Section eyebrow="Operational journey" title="Keep each handoff connected." lede="Explore the proposed workflow. Modules, integrations, acceptance criteria, and delivery dates are agreed during discovery for your implementation."><CargoWmsJourney /></Section>
    <Section bg="mist" title="The controls beneath the workflow"><div className="grid gap-5 md:grid-cols-3">
      <MarketingCard title="Permissions & approvals">Define Admin, Operator, Supervisor, GM, and Finance permissions. Configure approval thresholds and maker-checker separation where required.</MarketingCard>
      <MarketingCard title="Documents & customer access">Plan encrypted document storage, authorised links, receiver-ID retention, customer tracking, and release-token booking.</MarketingCard>
      <MarketingCard title="Reports & data exchange">Scope movement, billing, utilisation, overstay, arrival, and exceptions reports. Include saved report templates, validated Excel imports, and documented integration endpoints.</MarketingCard>
    </div></Section>
    <Section title="Agree the operation before the build"><ol className="grid gap-5 md:grid-cols-4">{["Review your current spreadsheets and warehouse process", "Confirm tariffs, roles, release rules, and report formats", "Trial the migration and reconcile with your team", "Test, train, launch, and hand over the operating guides"].map((text, index) => <li key={text} className="border-t border-[#cbdfea] pt-4"><span className="font-mono text-xs text-[#032aac]">0{index + 1}</span><p className="mt-3 text-sm leading-7 text-[#52657c]">{text}</p></li>)}</ol><ServiceLinks /><Link href="/request-demo" className="btn-primary marine-shiny marine-shiny--primary mt-8">Discuss your WMS requirements →</Link></Section>
  </div>;
}
