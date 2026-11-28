import type { Metadata } from "next";
import { routeMetadata } from "../../lib/seo-metadata";
import { PageHero, HeroImage, Chapter, Tiles, Tile, Steps, Checklist, Notice } from "../../components/Editorial";
import { FaqList, InlineLink } from "../../components/EditorialExtras";

export const metadata: Metadata = routeMetadata("/services/bunker-delivery-survey", {
  title: "Bunker Delivery Survey Workflow",
  description:
    "See how bunker survey teams record delivery readings, review inputs, compare quantities with the BDN, and prepare a report.",
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/services/bunker-delivery-survey"
        crumb="Bunker delivery"
        parent={{ href: "/services", label: "Services" }}
        eyebrow="Survey workflow / 01"
        title="Bunker delivery, from first reading to review."
        description="Your surveyors attend the delivery. Space BQS provides software to organise the captured information, calculation inputs, office review and report workflow."
        primaryAction={{ href: "/request-demo", label: "Discuss this workflow" }}
        secondaryAction={{ href: "/sample-report", label: "View illustrative report" }}
        visual={<HeroImage src="/assets/videos/bqs-app-beingused-poster.webp" alt="Surveyor using a tablet beside an open vessel tank" caption="Field-capture context · confirm exact app screens for your product release." />}
      />

      <Chapter index="01" eyebrow="Where it fits" title="One delivery. Two sets of records." lede="The supplier's delivery note and the survey team's measurements serve different roles. Keep the scope and inputs visible for review.">
        <Tiles>
          <Tile art="doc" tag="Supplier record" title="Bunker Delivery Note" tone="dark">
            The supplier's declared delivery information, retained as a reference for the survey team's comparison.
          </Tile>
          <Tile art="tank" tag="Survey team record" title="Measured information">
            The survey firm's readings and relevant inputs, captured under its agreed measurement procedure and reviewed by its team.
          </Tile>
        </Tiles>
        <div className="mt-6"><Notice label="In short">The BDN is the supplier's receipt. The survey firm's record documents its own measurements for comparison. A difference alone does not establish cause or determine a commercial outcome. See <InlineLink href="/why-independent">BDN vs measured quantity</InlineLink>.</Notice></div>
      </Chapter>

      <Chapter index="02" eyebrow="Workflow" title="A clear sequence for the job." tone="white">
        <Steps items={[
          { meta: "Before delivery", title: "Record opening measurements", body: "Capture opening readings and the survey context the agreed scope requires: vessel, fuel grade, tanks in scope, and observed conditions." },
          { meta: "After delivery", title: "Record closing readings", body: "Capture closing readings, observed temperatures and water, and the relevant BDN reference for the comparison." },
          { meta: "Calculation", title: "Let the method run the same way", body: "Temperature volume correction, water deduction and mass conversion are applied consistently. The method and version travel with the result." },
          { meta: "Review and report", title: "Review, finalise, issue", body: "A supervisor reviews the captured information and breakdown, finalises the record, and prepares the report output for the current release." },
        ]} />
      </Chapter>

      <Chapter index="03" eyebrow="Before you attend" title="What to have agreed beforehand." tone="mist">
        <div className="grid gap-5 md:grid-cols-2">
          <Checklist title="Scope" items={["Which tanks and fuel grades are in the survey", "The measurement procedure and any contract terms that apply", "Who attends and who reviews"]} />
          <Checklist title="Records" items={["Vessel particulars and tank reference data on file", "How the BDN will be obtained and recorded", "Where the finalised report will be stored and shared"]} />
        </div>
        <div className="mt-6"><Tiles>
          <Tile art="doc" tag="Next" title="See the report layout" href="/sample-report" cta="Open illustrative sample report">Check what the finished output looks like before a walkthrough.</Tile>
          <Tile art="gauge" tag="Try it" title="Work the arithmetic yourself" href="/tools" cta="Open the tools">Worksheets show each step using factors you supply.</Tile>
        </Tiles></div>
      </Chapter>

      <Chapter index="04" eyebrow="FAQ" title="Delivery workflow questions." tone="white">
        <FaqList items={[
          { q: "Do you provide the surveyors?", a: "No. You do. We provide the software your surveyors run on deck and in the office." },
          { q: "What if the BDN and measured figures differ?", a: "Your report shows both with method and version, ready for the parties to resolve commercially. The difference alone does not establish a cause.", more: { href: "/why-independent", label: "BDN vs measured quantity" } },
          { q: "Do you test quality?", a: "No. Quantity only. There is no lab testing." },
        ]} />
      </Chapter>

    </div>
  );
}
