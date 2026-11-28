import type { Metadata } from "next";
import { routeMetadata } from "../lib/seo-metadata";
import { PageHero, HeroFacts, Chapter, Tiles, Tile, Checklist, Steps, Notice } from "../components/Editorial";

export const metadata: Metadata = routeMetadata("/partners", {
  title: "Software Partnerships",
  description:
    "For resellers and implementation partners serving marine survey firms: one software workflow for bunker quantity survey records.",
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/partners"
        crumb="Partners"
        eyebrow="Partners"
        title="Implement with us."
        description="For resellers and implementation partners serving marine survey firms. One software workflow for bunker quantity survey records."
        primaryAction={{ href: "/contact", label: "Discuss a partnership" }}
        secondaryAction={{ href: "/request-demo", label: "Request a walkthrough" }}
        visual={<HeroFacts title="Two ways to work together" rows={[
          { label: "Survey firm", value: "Evaluate for your team" },
          { label: "Partner", value: "Discuss a collaboration" },
        ]} />}
      />

      <Chapter index="01" eyebrow="Two ways" title="Buy for your firm, or bring Space BQS to others." lede="Start with the conversation that matches your role.">
        <Tiles>
          <Tile tag="For survey firms" title="Evaluate for your team" tone="accent" href="/evaluate" cta="See how evaluation works">
            Discuss your survey workflows, team needs and rollout requirements with Space BQS.
          </Tile>
          <Tile tag="For potential partners" title="Discuss a partnership" tone="dark" href="/contact" cta="Contact the team">
            Share your organisation, the marine survey teams you serve, and the collaboration you have in mind. Availability and scope can be confirmed directly.
          </Tile>
        </Tiles>
      </Chapter>

      <Chapter index="02" eyebrow="Where partners help" title="The work around the software." tone="white" lede="Software is one part of a rollout. These are the areas where a partner can add real value.">
        <Tiles cols={2}>
          <Tile tag="Before go-live" title="Data migration" href="/services/data-migration" cta="Migration approach">Mapping, validating and trial-importing existing vessel and survey data before the final move.</Tile>
          <Tile tag="Infrastructure" title="Deployment" href="/services/deployment" cta="Deployment options">Public cloud, private cloud or on-premises, scoped around the client's team and infrastructure.</Tile>
          <Tile tag="Integration" title="Systems integration" href="/integrations-api" cta="Integrations and API">Webhooks, REST access and MCP tools for connecting survey records to a client's own systems.</Tile>
          <Tile tag="Adoption" title="Training and process" href="/who-its-for" cta="Role guides">Helping surveyors, supervisors and admins adopt the workflow that fits their role.</Tile>
        </Tiles>
      </Chapter>

      <Chapter index="03" eyebrow="What you can show clients" title="Public material you can rely on." tone="mist">
        <Checklist items={[
          <>The <a className="font-semibold text-[#032aac] underline underline-offset-4" href="/how-we-measure">published calculation method</a>, with its limits stated.</>,
          <>An <a className="font-semibold text-[#032aac] underline underline-offset-4" href="/sample-report">illustrative sample report</a>, clearly marked as fictional.</>,
          <>A candid <a className="font-semibold text-[#032aac] underline underline-offset-4" href="/security-audit">security page</a> that does not claim certifications it does not hold.</>,
          <>A <a className="font-semibold text-[#032aac] underline underline-offset-4" href="/portal-roadmap">roadmap page</a> that separates what is live from what is proposed.</>,
        ]} />
      </Chapter>

      <Chapter index="04" eyebrow="How a conversation goes" title="From first message to a shared plan." tone="white">
        <Steps items={[
          { title: "Introduce your organisation", body: "Tell us who you serve, where, and what you already provide to them." },
          { title: "Describe the collaboration", body: "Reseller, implementation, integration or something else. We will say plainly whether it fits." },
          { title: "Confirm scope directly", body: "Availability and terms are confirmed with the team. Nothing on this page is a published partner programme." },
        ]} />
        <div className="mt-6"><Notice label="Note">There is no published partner programme, tier list or commission structure. Everything is agreed case by case.</Notice></div>
      </Chapter>

    </div>
  );
}
