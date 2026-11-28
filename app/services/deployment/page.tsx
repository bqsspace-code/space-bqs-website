import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ServiceSchema from "../../components/ServiceSchema";
import { PageHero, HeroImage, Chapter, Tiles, Tile, Notice } from "../../components/Editorial";
import { LazyMount } from "../../components/Motion";
import { routeMetadata } from "../../lib/seo-metadata";

const DeploymentOptions = dynamic(() => import("@/components/ui/deployment-options"));

export const metadata: Metadata = routeMetadata("/services/deployment", { title: "Discuss Space BQS Deployment Requirements", description: "Review hosting, infrastructure, mobile connectivity, recovery, and operational requirements with the Space BQS team." });

export default function Page() {
  return (
    <div>
      <PageHero
        href="/services/deployment"
        crumb="Deployment"
        parent={{ href: "/services", label: "Services" }}
        eyebrow="Deployment requirements"
        title="Discuss the environment your team needs."
        description="Use this guide to identify hosting and infrastructure requirements. Confirm deployment availability and scope with the product team before planning a rollout."
        primaryAction={{ href: "#deployment-requirements", label: "Review key requirements" }}
        secondaryAction={{ href: "/request-demo", label: "Discuss your environment" }}
        visual={<HeroImage src="/assets/videos/oil-tanker-cruising-poster.webp" alt="Commercial vessel cruising at sea" caption="Start with your team's operating and infrastructure constraints." />}
      />

      <Chapter id="deployment-requirements" index="01" eyebrow="Plan the environment" title="Requirements to confirm." lede="Select a deployment model to see the questions to discuss. The selector does not indicate that every model is currently available.">
        <LazyMount minHeight={420}><DeploymentOptions /></LazyMount>
      </Chapter>

      <Chapter index="02" eyebrow="Responsibilities" title="Agree who does what before go-live." tone="white">
        <Tiles cols={3}>
          <Tile art="sync" tag="Access" title="Connectivity">Review how mobile devices, web users, identity systems and integrations reach the application.</Tile>
          <Tile art="shield" tag="Resilience" title="Recovery">Set backup retention, restore procedures, recovery targets and responsibility for testing them.</Tile>
          <Tile art="stack" tag="Day to day" title="Operations">Agree updates, monitoring, access, incident handling and support hours in the implementation and service plans.</Tile>
        </Tiles>
      </Chapter>

      <Chapter index="03" eyebrow="Prepare" title="Start with your constraints." tone="mist">
        <Notice label="Bring with you">Your preferred environment, hosting region, identity requirements, security policies, integration list and expected user volume. Each deployment is quoted and technically scoped; providers, service levels and supported dependencies are confirmed for your project.</Notice>
      </Chapter>

      <ServiceSchema offering="deployment" />
    </div>
  );
}
