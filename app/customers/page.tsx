import type { Metadata } from "next";
import { routeMetadata } from "../lib/seo-metadata";
import { PageHero, HeroFacts, Chapter, Tiles, Tile, Checklist, Notice } from "../components/Editorial";

export const metadata: Metadata = routeMetadata("/customers", {
  title: "Who Space BQS Is Designed For",
  description:
    "See who Space BQS is designed for: independent bunker survey firms, marine inspection agencies, surveyors, and supervisors.",
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/customers"
        crumb="Customers"
        eyebrow="Designed for"
        title="Built for survey firms and inspection teams."
        description="Space BQS is designed for organisations that perform bunker quantity surveys and want software for field capture, office review, and report workflows."
        primaryAction={{ href: "/request-demo", label: "Request a demo" }}
        secondaryAction={{ href: "/evaluate", label: "How to evaluate" }}
        visual={<HeroFacts title="Who evaluates Space BQS" rows={[
          { label: "Organisation", value: "Bunker survey firms" },
          { label: "Field role", value: "Survey teams" },
          { label: "Office role", value: "Supervisors" },
        ]} />}
      />

      <Chapter index="01" eyebrow="Fit" title="Teams that may evaluate Space BQS." lede="Three groups, one connected record.">
        <Tiles>
          <Tile tag="Organisation" title="Bunker survey firms" tone="accent" className="md:col-span-2" href="/request-demo" cta="Request a demo">
            Explore a shared software workflow for survey records, office review, and report preparation.
          </Tile>
          <Tile tag="Field role" title="Survey teams" href="/mobile-app" cta="See the mobile app">
            Review the mobile capture workflow for delivery, remaining-on-board, and debunkering records.
          </Tile>
          <Tile tag="Office role" title="Supervisors" href="/platform" cta="See the platform">
            See the web workflow for reviewing survey records and preparing report outputs.
          </Tile>
        </Tiles>
      </Chapter>

      <Chapter index="02" eyebrow="By survey type" title="Match the workflow to the work." tone="white" lede="Each survey type has its own page, with the inputs and report content described.">
        <Tiles cols={3}>
          <Tile tag="Survey" title="Bunker delivery" href="/services/bunker-delivery-survey" cta="Delivery survey">Record the quantity received and compare it with the supplier's declared figure.</Tile>
          <Tile tag="Survey" title="Remaining on board" href="/services/rob-survey" cta="ROB survey">Capture what is on board at a point in time, tank by tank.</Tile>
          <Tile tag="Survey" title="Debunkering" href="/services/debunkering-survey" cta="Debunkering survey">Document fuel removed from a vessel with the same calculation discipline.</Tile>
        </Tiles>
      </Chapter>

      <Chapter index="03" eyebrow="Honest fit check" title="When it fits, and when it does not." tone="mist">
        <div className="grid gap-5 md:grid-cols-2">
          <Checklist title="Likely a good fit if you" items={[
            "Perform bunker delivery, ROB or debunkering surveys",
            "Want surveyors and office staff working from one record",
            "Need offline capture on deck",
            "Issue PDF and Excel reports to clients",
          ]} />
          <Checklist title="Probably not the right tool if you need" items={[
            "Someone to attend the vessel for you",
            "Laboratory fuel testing or quality opinions",
            "A live client self-service portal today (it is roadmap only)",
            "Cargo or warehouse workflows. See Cargo WMS instead",
          ]} />
        </div>
        <div className="mt-6"><Notice label="Not sure?">Describe how your surveys run today and we will tell you plainly whether Space BQS covers it.</Notice></div>
      </Chapter>

    </div>
  );
}
