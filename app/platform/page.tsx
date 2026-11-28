import type { Metadata } from "next";
import { routeMetadata } from "../lib/seo-metadata";
import { PageHero, Chapter, Tiles, Tile, Steps, Notice, HeroFacts } from "../components/Editorial";
import { LazyMount } from "../components/Motion";
import OfficeDashboardMock from "../components/OfficeDashboardMock";

export const metadata: Metadata = routeMetadata("/platform", {
  title: "Platform — Your Office View of Every Survey",
  description:
    "Review bunker survey calculations, manage vessel records, follow survey status, and prepare PDF and Excel reports in the Space BQS web platform.",
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/platform"
        crumb="Platform"
        eyebrow="Office web platform / review and reporting"
        title="Bring field submissions into office review."
        description="Use the web platform to find survey records, review inputs, manage vessel references and work with report outputs. Confirm release-specific details with the product team."
        primaryAction={{ href: "/order-lifecycle", label: "Follow the record workflow" }}
        secondaryAction={{ href: "/sample-report", label: "View the sample report" }}
        visual={<HeroFacts title="In the office" rows={[
          { label: "Find", value: "Survey register" },
          { label: "Check", value: "Inputs and breakdown" },
          { label: "Decide", value: "Finalise the record" },
          { label: "Hand over", value: "PDF and Excel" },
        ]} />}
      />

      <Chapter index="01" eyebrow="Office workflow" title="A review workspace for survey teams." lede="The web platform complements the field workflow. Mobile capture and web review are distinct parts of the record process; confirm status labels, permissions and outputs for your release.">
        <Tiles cols={2}>
          <Tile art="scan" tag="01 · Find" title="Survey register" href="/features/survey-register-dashboard" cta="Register details">Use the available search and status controls to find survey records for office review.</Tile>
          <Tile art="shield" tag="02 · Review" title="Supervisor workflow" tone="accent" href="/features/calculation-audit" cta="Calculation review">Review captured information and calculation inputs before finalising a record under your organisation's process.</Tile>
          <Tile art="tank" tag="03 · Reference" title="Vessel information" href="/features/vessels-master-data" cta="Reference data">Vessel particulars and the reference information associated with survey work. Confirm supported data for your release.</Tile>
          <Tile art="doc" tag="04 · Handover" title="Report outputs" tone="dark" href="/features/reports-ai" cta="Report workflows">PDF and Excel report workflows. View the sample layout and confirm current fields with the team.</Tile>
        </Tiles>
      </Chapter>

      <Chapter index="02" eyebrow="Illustrative interface" title="What a supervisor console looks like." tone="white" lede="A concept illustration with fictional figures. Confirm the current console and its fields in a demonstration.">
        <LazyMount minHeight={520}><OfficeDashboardMock /></LazyMount>
      </Chapter>

      <Chapter index="03" eyebrow="Field to office" title="Keep the handoff clear." tone="mist">
        <Steps items={[
          { meta: "Mobile", title: "Capture on site", body: "Surveyors record field information on the mobile app, offline if needed, and sync when connectivity returns." },
          { meta: "Web", title: "Review the record", body: "Office users review the submitted information and calculation details and resolve questions with the survey team." },
          { meta: "Handover", title: "Prepare outputs", body: "Prepare the report outputs your release supports, then follow your organisation's process for storing and sharing them." },
        ]} />
        <div className="mt-6"><Notice label="Related">A client self-serve portal is a roadmap concept, not a live feature. See the <a className="font-semibold text-[#032aac] underline underline-offset-4" href="/portal-roadmap">portal roadmap</a>.</Notice></div>
      </Chapter>

    </div>
  );
}
