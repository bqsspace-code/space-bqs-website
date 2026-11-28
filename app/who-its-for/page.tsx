import type { Metadata } from "next";
import { routeMetadata } from "../lib/seo-metadata";
import { PageHero, HeroFacts, Chapter, Tiles, Tile, Checklist, Steps } from "../components/Editorial";

export const metadata: Metadata = routeMetadata("/who-its-for", {
  title: "Bunker Survey Software for Survey Teams",
  description:
    "Space BQS is designed for independent bunker survey firms, marine inspection agencies, surveyors, and supervisors reviewing survey records.",
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/who-its-for"
        crumb="Who It's For"
        eyebrow="Roles"
        title="Bought by firms. Used by teams. Trusted by clients."
        description="Space BQS is bought by survey firms, used by surveyors and supervisors, and relied on by the clients who receive the report. Each role sees the same record from a different seat."
        primaryAction={{ href: "/mobile-app", label: "See the mobile app" }}
        secondaryAction={{ href: "/platform", label: "See the platform" }}
        visual={<HeroFacts title="One record, three readers" rows={[
          { label: "On deck", value: "Surveyor" },
          { label: "In the office", value: "Supervisor" },
          { label: "On receipt", value: "Client" },
        ]} />}
      />

      <Chapter index="01" eyebrow="On deck" title="The surveyor." lede="Short sequence, big controls, no dependence on signal.">
        <div className="grid gap-5">
          <Tiles>
            <Tile tag="Their job" title="Measure and record">
              Attend the vessel, take soundings or ullages, temperatures and water cuts, and enter them accurately.
            </Tile>
            <Tile tag="In Space BQS" title="Ship, Fuel, Tanks" href="/mobile-app" cta="See the mobile app">
              Scan the vessel QR, choose the fuel, enter tank readings. Works offline, autosaves, and submits when done.
            </Tile>
          </Tiles>
          <Checklist title="What a surveyor will want to know" items={[
            "Does it work with no signal in an engine room or on a barge?",
            "How many taps from scanning the vessel to a calculated quantity?",
            "What happens to my work if the phone locks or the battery dies?",
            "What do I see before I submit?",
          ]} />
        </div>
      </Chapter>

      <Chapter index="02" eyebrow="In the office" title="The supervisor." lede="Review, recalculate, finalise, export." tone="white">
        <div className="grid gap-5">
          <Tiles>
            <Tile tag="Their job" title="Check and take responsibility">
              Confirm the record is complete and consistent, resolve questions with the team, and stand behind the report that goes out.
            </Tile>
            <Tile tag="In Space BQS" title="Review, then finalise" href="/platform" cta="See the platform">
              Review the breakdown, recalculate, complete the record, and export PDF and Excel. The dashboard shows the fleet, trends and an attention list.
            </Tile>
          </Tiles>
          <Checklist title="What a supervisor will want to know" items={[
            "Can I see every input behind a figure, not only the result?",
            "Who is allowed to finalise a record, and can a surveyor do it?",
            "How do I find a survey from last year when a client asks?",
            "Can I get the report as both PDF and a spreadsheet?",
          ]} />
        </div>
      </Chapter>

      <Chapter index="03" eyebrow="On receipt" title="The client." lede="Owners, charterers and operators receive the report; they do not use the software." tone="mist">
        <div className="grid gap-5">
          <Tiles>
            <Tile tag="Their job" title="Read and rely on the report">
              Understand what was measured, by whom, under which method, and what the figures mean for the commercial record.
            </Tile>
            <Tile tag="Today" title="PDF and Excel from your team" href="/sample-report" cta="See a sample report">
              The report is issued by your team. A self-serve client portal is a roadmap concept and is not presented as live.
            </Tile>
          </Tiles>
          <Checklist title="What a client will want to see" items={[
            "The inputs and method, not just the final quantity.",
            "A clear statement of who performed the survey.",
            "A report format their own team can open and check.",
          ]} />
        </div>
      </Chapter>

      <Chapter index="04" eyebrow="Handoffs" title="Where one role passes to the next." tone="dark">
        <Steps dark items={[
          { meta: "Surveyor → Supervisor", title: "Submit", body: "The surveyor submits the captured record. From here, changes go through office review rather than editing the field record silently." },
          { meta: "Supervisor → Organisation", title: "Finalise", body: "An authorised supervisor or firm administrator finalises the reviewed record. Roles in the product are Surveyor, Supervisor and Org Admin." },
          { meta: "Organisation → Client", title: "Issue", body: "The firm issues the PDF and Excel report under its own process. Searchable later by your team." },
        ]} />
      </Chapter>

    </div>
  );
}
