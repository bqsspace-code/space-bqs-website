import type { Metadata } from "next";
import Link from "next/link";
import { routeMetadata } from "../lib/seo-metadata";
import { PageHero, HeroFacts, Chapter, Steps, Checklist, Tiles, Tile, Notice } from "../components/Editorial";

export const metadata: Metadata = routeMetadata("/evaluate", {
  title: "How to Evaluate Bunker Survey Software",
  description:
    "A practical guide for survey firms evaluating Space BQS: map your workflow, prepare your data, run a walkthrough, scope a pilot and decide.",
});

const link = "font-semibold text-[#032aac] underline decoration-[#9bcbd7] underline-offset-4";

export default function Page() {
  return (
    <div>
      <PageHero
        href="/evaluate"
        crumb="Evaluate"
        eyebrow="Evaluation guide"
        title="Test it against your own surveys."
        description="A practical way to judge whether Space BQS fits your firm: what to prepare, what to ask, and how to tell a good fit from a hopeful one."
        primaryAction={{ href: "/request-demo", label: "Start an evaluation" }}
        secondaryAction={{ href: "/sample-report", label: "Review a sample report" }}
        visual={<HeroFacts title="Five stages" rows={[
          { label: "1", value: "Map your workflow" },
          { label: "2", value: "Prepare your data" },
          { label: "3", value: "Walk through it" },
          { label: "4", value: "Scope a pilot" },
          { label: "5", value: "Decide" },
        ]} />}
      />

      <Chapter index="01" eyebrow="The path" title="From first look to a decision." lede="You can stop at any stage. Pilot availability and scope are confirmed directly with the team.">
        <Steps items={[
          { meta: "Stage 1 · You", title: "Map how a survey runs today", body: "Write down the path of one real survey: who is on deck, what is recorded and where, who reviews it, what goes to the client. The gaps and re-typing are what you are trying to remove." },
          { meta: "Stage 2 · You", title: "Gather the reference data", body: "Vessel particulars and tank tables are what calculations depend on. Know where yours live and how current they are. If you hold history in spreadsheets, see the migration approach." },
          { meta: "Stage 3 · Together", title: "Walk through with the team", body: "A demonstration against your survey types and report expectations, not a generic tour. Bring the awkward cases." },
          { meta: "Stage 4 · Together", title: "Scope a pilot, if one makes sense", body: "Agree which vessels, surveyors and survey types are included, how long it runs, and what a successful result looks like before it starts." },
          { meta: "Stage 5 · You", title: "Decide with evidence", body: "Compare the pilot records against your current process: time, consistency, review effort, and what the client received." },
        ]} />
      </Chapter>

      <Chapter index="02" eyebrow="Prepare" title="What to bring to the first conversation." tone="white" lede="You do not need a finalised plan, only enough to talk about fit.">
        <div className="grid gap-5 md:grid-cols-2">
          <Checklist title="About your team" items={[
            "Organisation type and approximate number of field surveyors",
            "Who reviews and finalises records in the office",
            "How many surveys you run in a typical period",
          ]} />
          <Checklist title="About your surveys" items={[
            "Which types: delivery, ROB, debunkering",
            "The calculation method and tables you use today",
            "A sample of the report your clients receive now",
          ]} />
        </div>
      </Chapter>

      <Chapter index="03" eyebrow="Ask us" title="Questions worth asking any vendor." tone="mist" lede="Including us. Each has a page where we have already answered it in public.">
        <Tiles cols={2}>
          <Tile tag="Method" title="How is the quantity calculated?" href="/how-we-measure" cta="Calculation method">Inputs, correction factor and mass conversion, with the limits of what the published description covers.</Tile>
          <Tile tag="Output" title="What does the client receive?" href="/sample-report" cta="Sample report">An illustrative PDF and Excel report, clearly marked as fictional data.</Tile>
          <Tile tag="Risk" title="What about security and data?" href="/security-audit" cta="Security and audit">A candid view of what is in place and what is not claimed.</Tile>
          <Tile tag="Rollout" title="How does it get deployed?" href="/services/deployment" cta="Deployment options">Public cloud, private cloud or on-premises, scoped to your infrastructure.</Tile>
          <Tile tag="History" title="Can we bring existing data?" href="/services/data-migration" cta="Data migration">Map, validate, trial-import and reconcile before the final move.</Tile>
          <Tile tag="Cost" title="How is it priced?" href="/pricing" cta="Pricing">No fixed prices are published. Licensing is discussed against your team and volume.</Tile>
        </Tiles>
      </Chapter>

      <Chapter index="04" eyebrow="Judge it fairly" title="Signs of a good evaluation." tone="white">
        <div className="space-y-6">
          <Checklist items={[
            "Every figure on the report can be traced to inputs a surveyor entered.",
            "A supervisor can review a record without phoning the surveyor.",
            "Capture works in the worst connectivity your team actually faces.",
            "The report matches what your clients expect, or you know exactly what differs.",
            <>You know what the software does not do. Read <Link className={link} href="/why-independent">why independence matters</Link> and the product boundaries.</>,
          ]} />
          <Notice label="Reminder">Software does not independently confirm physical measurements, vessel calibration data or contract terms. An evaluation should test the workflow, not outsource the judgement.</Notice>
        </div>
      </Chapter>

    </div>
  );
}
