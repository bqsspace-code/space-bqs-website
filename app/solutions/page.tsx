import type { Metadata } from "next";
import { MarketingHeader, MarketingCard, ServiceLinks } from "../components/MarketingPage";
import { Section } from "../components/ui";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/solutions", { title: "Marine Survey Software Solutions", description: "Explore Space BQS bunker quantity survey software and implementation options for marine and cargo operations." });

export default function Page() {
  return <div className="bg-[#f7fbfd]"><MarketingHeader eyebrow="Solutions" title="Purpose-built workflows. Connected records." description="Choose the solution for your operation: bunker quantity surveys on deck and in the office, or a custom cargo warehouse implementation." />
    <Section title="Two solutions. Clear operational boundaries."><div className="grid gap-6 md:grid-cols-2">
      <MarketingCard title="Space BQS" href="/solutions/space-bqs" linkLabel="Explore bunker surveying"><p className="mb-3 font-mono text-[10px] uppercase text-[#032aac]">Mobile app + web platform</p>Capture readings offline, calculate quantities, review the job, and issue the finalised report. For bunker delivery, ROB, and debunkering.</MarketingCard>
      <MarketingCard title="Cargo WMS" href="/solutions/cargo-wms" linkLabel="Explore the WMS offering"><p className="mb-3 font-mono text-[10px] uppercase text-[#032aac]">Custom implementation</p>Plan manifests, receive and locate cargo, manage tariffs and approvals, and control release. Requirements and delivery are agreed for each project.</MarketingCard>
    </div><ServiceLinks /></Section>
  </div>;
}
