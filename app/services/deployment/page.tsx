import type { Metadata } from "next";
import ServiceSchema from "../../components/ServiceSchema";
import Link from "next/link";
import DeploymentOptions from "@/components/ui/deployment-options";
import { MarketingHeader } from "../../components/MarketingPage";
import { Section } from "../../components/ui";
import { routeMetadata } from "../../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/services/deployment", { title: "Discuss Space BQS Deployment Requirements", description: "Review hosting, infrastructure, mobile connectivity, recovery, and operational requirements with the Space BQS team." });

export default function Page() {
  return <div className="bg-[#f7fbfd]"><MarketingHeader parent="/services" parentLabel="Services" eyebrow="Deployment requirements" title="Discuss the environment your team needs." description="Use this guide to identify hosting and infrastructure requirements. Confirm deployment availability and scope with the product team before planning a rollout." />
    <Section title="Requirements to confirm" lede="Select a deployment model to see the questions to discuss. The selector does not indicate that every model is currently available."><DeploymentOptions /></Section>
    <Section bg="mist" title="Agree the responsibilities before go-live"><div className="grid gap-6 md:grid-cols-3">{[["Connectivity", "Review how mobile devices, web users, identity systems, and integrations reach the application."], ["Recovery", "Set backup retention, restore procedures, recovery targets, and responsibility for testing them."], ["Operations", "Agree updates, monitoring, access, incident handling, and support hours in the implementation and service plans."]].map(([title, text]) => <div key={title} className="border-t border-[#c6ddea] pt-5"><h3 className="font-display text-lg font-semibold text-[#032aac]">{title}</h3><p className="mt-3 text-sm leading-7 text-[#52657c]">{text}</p></div>)}</div></Section>
    <Section title="Start with your constraints"><p className="max-w-3xl text-sm leading-8 text-[#52657c]">Bring your preferred environment, hosting region, identity requirements, security policies, integration list, and expected user volume. Each deployment is quoted and technically scoped; providers, service levels, and supported dependencies are confirmed for your project.</p><div className="mt-6 flex flex-wrap gap-4"><Link href="/request-demo" className="btn-primary marine-shiny marine-shiny--primary">Discuss a deployment →</Link><Link href="/services/data-migration" className="btn-secondary">Plan your data migration</Link></div></Section>
    <ServiceSchema offering="deployment" />
  </div>;
}
