import type { Metadata } from "next";
import { routeMetadata } from "../lib/seo-metadata";
import { PageHero, HeroImage, Chapter, Tiles, Tile, Steps, Notice, Compare } from "../components/Editorial";
import { FaqList } from "../components/EditorialExtras";

export const metadata: Metadata = routeMetadata("/services", {
  title: "Bunker Survey Software Workflows",
  description:
    "Explore Space BQS software workflows for bunker delivery, ROB, and debunkering surveys, plus available migration and rollout support.",
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/services"
        crumb="Services"
        eyebrow="Survey workflows · implementation support"
        title="Every bunker movement has its own story."
        description="Software workflows for bunker delivery, remaining on board and debunkering, plus separately scoped migration and deployment support."
        primaryAction={{ href: "/request-demo", label: "Discuss your workflow" }}
        secondaryAction={{ href: "/features", label: "Explore product features" }}
        visual={<HeroImage src="/assets/videos/tablet-on-deck-poster.webp" alt="Surveyor using a tablet on a vessel deck" caption="Field context, office review and a clear report trail." position="62% center" />}
      />

      <Chapter id="service-workflows" index="01" eyebrow="Three operational moments" title="Choose the workflow that matches the job." lede="Each starts with a different question. Pick the one you are being asked to document.">
        <Tiles>
          <Tile art="tank" tone="accent" tag="Fuel is supplied" title="Bunker delivery" href="/services/bunker-delivery-survey" cta="Delivery workflow" className="md:col-span-2">
            Before-and-after measurements, observed conditions and the BDN reference, kept together so the supplier's figure and the survey team's figure can be read side by side.
          </Tile>
          <Tile art="gauge" tag="At a charter milestone" title="Remaining on board" href="/services/rob-survey" cta="ROB workflow">
            Fuel on board at the point set by the survey scope, with the period's receipts and transfers laid out for reconciliation.
          </Tile>
          <Tile art="flow" tone="dark" tag="Fuel is removed" title="Debunkering" href="/services/debunkering-survey" cta="Debunkering workflow">
            Opening and closing measurements under the agreed procedure, with scope and assumptions recorded.
          </Tile>
        </Tiles>
      </Chapter>

      <Chapter index="02" eyebrow="Side by side" title="Same discipline. Different questions." tone="white" lede="All three use the same capture, calculation, review and report path. What changes is the question the record answers.">
        <Compare
          left="Typically asks"
          right="Record emphasises"
          rows={[
            { topic: "Bunker delivery", a: "How much did the vessel receive?", b: "Before and after readings, observed conditions, BDN reference." },
            { topic: "ROB", a: "What is on board at this point?", b: "Tanks, fuel grades and period; receipts and transfers for reconciliation." },
            { topic: "Debunkering", a: "How much was removed?", b: "Opening and closing readings, transfer notes, scope and assumptions." },
          ]}
        />
      </Chapter>

      <Chapter index="03" eyebrow="The common path" title="One record from deck to report." tone="mist">
        <Steps items={[
          { meta: "Mobile", title: "Capture", body: "Scan the vessel, choose the fuel, enter tank readings. Works offline and syncs when signal returns." },
          { meta: "Calculation", title: "Calculate", body: "Temperature correction, water deduction and mass conversion run the same way every time." },
          { meta: "Web", title: "Review", body: "A supervisor checks the inputs and breakdown, then recalculates if something needs correcting." },
          { meta: "Output", title: "Report", body: "PDF and Excel outputs prepared from the finalised record, with method and version stated." },
        ]} />
      </Chapter>

      <Chapter index="04" eyebrow="Implementation support" title="Move the records. Plan the environment." tone="white" lede="Migration and deployment are scoped to your source data and requirements, not assumed as one-size-fits-all.">
        <Tiles>
          <Tile art="sync" tag="Before go-live" title="Bring your existing data" href="/services/data-migration" cta="Plan your migration">Map, validate, trial-import and reconcile before the final move.</Tile>
          <Tile art="stack" tag="Infrastructure" title="Choose your deployment" href="/services/deployment" cta="Compare options">Public cloud, private cloud or on-premises, scoped around your team and infrastructure.</Tile>
        </Tiles>
      </Chapter>

      <Chapter index="05" eyebrow="Boundary" title="What the services are not." tone="light">
        <div className="space-y-6">
          <Notice>Your survey firm determines the measurement scope and performs survey attendance. Space BQS is software for quantity workflows, not laboratory fuel-quality testing.</Notice>
          <FaqList items={[
            { q: "Do you provide surveyors?", a: "No. Survey firms run jobs with their teams; Space BQS is the software they run on." },
            { q: "Do you test fuel quality?", a: "No. Quantity only. There is no lab work and no sampling for quality." },
            { q: "Can on-hire and off-hire records be reviewed together?", a: "The survey scope and reporting process determine how the records are prepared and compared. Confirm the current product workflow with the team.", more: { href: "/services/rob-survey", label: "ROB workflow" } },
          ]} />
        </div>
      </Chapter>

    </div>
  );
}
