import type { Metadata } from "next";
import { PageHero, HeroFacts, Chapter, Tiles, Tile, Steps, Notice, Compare } from "../components/Editorial";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/portal-roadmap", {
  title: "Client Portal Roadmap & Bunker Proof",
  description:
    "A roadmap concept for client access to bunker survey reports. See what is available today and what remains a proposal.",
});

const COMPARISONS = [
  { capability: "Certificate delivery", now: "Live: supervisor exports the finalised PDF and Excel.", concept: "Client self-service download via tokenised link." },
  { capability: "Authenticity verification", now: "Not confirmed: public verification details are not confirmed.", concept: "Possible online report verification, subject to product design and security review." },
  { capability: "Charterer and owner multi-tenancy", now: "Firm only: Surveyor, Supervisor and Org Admin roles.", concept: "Read-only client portal invited per vessel IMO or time-charter period." },
  { capability: "API and webhook ingestion", now: "Live: REST webhooks with x-api-key.", concept: "Direct webhook push to a client's TMS or ERP upon finalisation lock." },
];

export default function Page() {
  return (
    <div>
      <PageHero
        href="/portal-roadmap"
        crumb="Portal Roadmap"
        parent={{ href: "/platform", label: "Platform" }}
        eyebrow="Roadmap concept"
        title="Client self-serve portal roadmap."
        description="A proposed direction for how vessel owners, charterers and operators might access survey reports in the future. Contact the product team to confirm current availability."
        primaryAction={{ href: "/contact", label: "Ask about availability" }}
        secondaryAction={{ href: "/integrations-api", label: "See what is live" }}
        visual={<HeroFacts title="Status" rows={[
          { label: "Stage", value: "Roadmap concept" },
          { label: "Customer portal", value: "Not live" },
          { label: "Delivery date", value: "Not promised" },
        ]} />}
      />

      <Chapter index="01" eyebrow="Today vs concept" title="What is live, and what is only proposed." lede="The table separates available product areas from proposed portal capabilities. It promises no delivery date or security certification.">
        <Compare left="Current status" right="Portal concept · not live" rows={COMPARISONS.map((c) => ({ topic: c.capability, a: c.now, b: c.concept }))} />
      </Chapter>

      <Chapter index="02" eyebrow="Proposed principles" title="Potential client-access boundaries." tone="white">
        <Tiles cols={3}>
          <Tile art="shield" tag="Principle" title="Read-only concept">A future portal could let authorised recipients view a report without changing the underlying survey record. Access controls and record behaviour have not been finalised.</Tile>
          <Tile art="doc" tag="Principle" title="Quantity survey context" tone="dark">Any future portal would present the report information available in the product. Details require product confirmation.</Tile>
          <Tile art="nodes" tag="Open question" title="Access model to be determined">Authentication, link expiry, recipient roles and delivery channels are part of the future design and need security review.</Tile>
        </Tiles>
      </Chapter>

      <Chapter index="03" eyebrow="What happens now" title="How clients receive reports today." tone="mist">
        <Steps items={[
          { title: "The firm finalises the record", body: "An authorised supervisor or administrator completes the survey record on the web platform." },
          { title: "The firm exports the report", body: "PDF and Excel outputs are prepared from the finalised record." },
          { title: "The firm shares it", body: "Your team sends the report to the client under its own process. Clients do not log in." },
        ]} />
        <div className="mt-6"><Notice label="Not live">Space BQS does not offer a client login today. Treat everything in the concept column as a proposal and confirm availability directly before relying on it.</Notice></div>
      </Chapter>

    </div>
  );
}
