import type { Metadata } from "next";
import ServiceSchema from "../../components/ServiceSchema";
import Link from "next/link";
import DeploymentOptions from "@/components/ui/deployment-options";
import { MarketingHeader } from "../../components/MarketingPage";
import { Section } from "../../components/ui";

export const metadata: Metadata = { title: "On-Premises & Cloud Deployment", description: "Compare Space BQS implementation options and scope hosting, infrastructure, mobile connectivity, recovery, and operational ownership." };

export default function Page() {
  return <div className="bg-[#f7fbfd]"><MarketingHeader parent="/services" parentLabel="Services" eyebrow="Deployment services" title="Your operation. The right environment." description="Explore public-cloud, private-cloud, and on-premises implementation options. Match deployment to your access, integration, and infrastructure requirements." />
    <Section title="Compare the options" lede="Select an environment to see the decisions that shape its implementation."><DeploymentOptions /></Section>
    <Section bg="mist" title="Agree the responsibilities before go-live"><div className="grid gap-6 md:grid-cols-3">{[["Connectivity", "Review how mobile devices, web users, identity systems, and integrations reach the application."], ["Recovery", "Set backup retention, restore procedures, recovery targets, and responsibility for testing them."], ["Operations", "Agree updates, monitoring, access, incident handling, and support hours in the implementation and service plans."]].map(([title, text]) => <div key={title} className="border-t border-[#c6ddea] pt-5"><h3 className="font-display text-lg font-semibold text-[#032aac]">{title}</h3><p className="mt-3 text-sm leading-7 text-[#52657c]">{text}</p></div>)}</div></Section>
    <Section title="Start with your constraints"><p className="max-w-3xl text-sm leading-8 text-[#52657c]">Bring your preferred environment, hosting region, identity requirements, security policies, integration list, and expected user volume. Each deployment is quoted and technically scoped; providers, service levels, and supported dependencies are confirmed for your project.</p><div className="mt-6 flex flex-wrap gap-4"><Link href="/request-demo" className="btn-primary marine-shiny marine-shiny--primary">Discuss a deployment →</Link><Link href="/services/data-migration" className="btn-secondary">Plan your data migration</Link></div></Section>
    <ServiceSchema path="/services/deployment" name="Deployment planning" description="Scope public-cloud, private-cloud or on-premises deployment, connectivity and operational responsibilities." />
  </div>;
}
