import type { Metadata } from "next";
import { PageHero, HeroFacts, Chapter, Tiles, Tile, Steps, Checklist, Notice } from "../components/Editorial";
import { FaqList } from "../components/EditorialExtras";
import ProductSchema from "../components/ProductSchema";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/pricing", {
  title: "Pricing for Survey Firms",
  description:
    "Learn how Space BQS team licensing is scoped for bunker survey firms. Discuss surveyor seats, volume, and rollout requirements.",
});

const FAQS = [
  { q: "Does Space BQS publish fixed prices?", a: "No fixed prices are listed on this page. Contact Space BQS with your team and workflow requirements to discuss licensing." },
  { q: "What information should I provide for a quote?", a: "Share your organisation type, team size, approximate survey volume, and the delivery, ROB or debunkering workflows you use. You can provide these details in the demo request form." },
  { q: "Can I request a pilot?", a: "Contact the Space BQS team to discuss whether a pilot is available and what its setup and evaluation scope would be.", more: { href: "/evaluate", label: "How to evaluate" } },
  { q: "Are migration and deployment included?", a: "They are scoped separately around your source data and infrastructure. Confirm what applies to your project before a purchase decision.", more: { href: "/services/data-migration", label: "Data migration" } },
];

export default function Page() {
  return (
    <div>
      <ProductSchema />
      <PageHero
        href="/pricing"
        crumb="Pricing"
        eyebrow="Commercial model / team licensing"
        title="Licensing shaped around your survey operation."
        description="Space BQS does not publish fixed prices. Start a conversation about the people, survey workflows and rollout your team needs to evaluate."
        primaryAction={{ href: "/request-demo", label: "Discuss licensing" }}
        secondaryAction={{ href: "/sample-report", label: "Review a sample report" }}
        visual={<HeroFacts title="Licensing is scoped on" rows={[
          { label: "People", value: "Surveyors and reviewers" },
          { label: "Work", value: "Survey types and volume" },
          { label: "Rollout", value: "Data, hosting, integrations" },
        ]} />}
      />

      <Chapter index="01" eyebrow="Evaluation" title="What to bring to the first conversation." lede="A few details help the team understand fit. You do not need a finalised implementation plan to start the discussion.">
        <Tiles cols={3}>
          <Tile art="nodes" tag="01 · Team" title="Who will use it?">Your organisation type, approximate number of field surveyors, and who reviews survey records in the office.</Tile>
          <Tile art="bars" tag="02 · Work" title="What do you survey?">Your delivery, ROB or debunkering workflows, and an approximate survey volume if you know it.</Tile>
          <Tile art="stack" tag="03 · Rollout" title="What needs evaluating?" tone="dark">Vessel reference data, migration questions, integrations, and hosting or deployment requirements.</Tile>
        </Tiles>
      </Chapter>

      <Chapter index="02" eyebrow="What is being licensed" title="Review the workflows first." tone="white" lede="Understand what you would be buying before the commercial discussion starts.">
        <div className="space-y-5">
          <Checklist items={[
            "Mobile capture for bunker quantity survey work",
            "Web review and survey record workflows",
            "PDF and Excel report workflows",
            "Delivery, ROB and debunkering survey types",
          ]} />
          <Notice label="Pilots">A pilot is a discussion, not a published offer. Ask whether one is available and confirm its scope, timing and commercial terms with the team.</Notice>
        </div>
      </Chapter>

      <Chapter index="03" eyebrow="Rollout" title="The work around the licence." tone="mist" lede="Data migration and deployment can be discussed with your team. Confirm hosting and integration scope for your project before deciding.">
        <Tiles cols={3}>
          <Tile art="sync" tag="Migration" title="Data migration" href="/services/data-migration" cta="Migration approach">Map, trial-import and reconcile before the final move.</Tile>
          <Tile art="stack" tag="Hosting" title="Deployment options" href="/services/deployment" cta="Deployment options">Public, private or on-premises, scoped to your infrastructure.</Tile>
          <Tile art="flow" tag="Custom" title="Cargo WMS" href="/solutions/cargo-wms" cta="Custom scope">A separate offering, with requirements and delivery agreed per project.</Tile>
        </Tiles>
      </Chapter>

      <Chapter index="04" eyebrow="How a conversation goes" title="From first message to a proposal." tone="white">
        <Steps items={[
          { title: "Tell us about your operation", body: "Team, survey types, approximate volume, and the questions you want answered." },
          { title: "See the workflow", body: "A walkthrough against your survey types, so the licence discussion is about something concrete." },
          { title: "Confirm terms directly", body: "Pricing, availability, deployment and any pilot scope are confirmed with the team for your engagement." },
        ]} />
      </Chapter>

      <Chapter index="05" eyebrow="Questions" title="Pricing and commercial questions." tone="mist">
        <FaqList items={FAQS} />
      </Chapter>

    </div>
  );
}
