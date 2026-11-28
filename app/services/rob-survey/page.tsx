import type { Metadata } from "next";
import { routeMetadata } from "../../lib/seo-metadata";
import { PageHero, HeroImage, Chapter, Tiles, Tile, Steps, Notice } from "../../components/Editorial";
import { FaqList, Formula } from "../../components/EditorialExtras";

export const metadata: Metadata = routeMetadata("/services/rob-survey", {
  title: "ROB Bunker Survey Workflow Software",
  description:
    "Space BQS ROB workflow for survey firms: fuel on board at charter start and end, a settlement-ready record, and finalised reports.",
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/services/rob-survey"
        crumb="ROB survey"
        parent={{ href: "/services", label: "Services" }}
        eyebrow="Survey workflow / 02"
        title="A point-in-time view of fuel on board."
        description="Record remaining-on-board survey information at a defined charter milestone. Space BQS provides software for survey teams to capture readings, review records and prepare reports."
        primaryAction={{ href: "/request-demo", label: "Discuss this workflow" }}
        secondaryAction={{ href: "/order-lifecycle", label: "See the record workflow" }}
        visual={<HeroImage src="/assets/videos/bqs-appbeing-used2-poster.webp" alt="Illustrative survey app interface shown on a mobile phone" caption="Illustrative mobile interface · confirm current workflow details for your release." />}
      />

      <Chapter index="01" eyebrow="What it is" title="Fuel on board, at a defined point." lede="A survey firm performs the measurement. Space BQS provides the software for recording it, reviewing its inputs and preparing reports.">
        <Tiles>
          <Tile art="gauge" tag="Opening" title="Start of the period">On-hire, or the start of a charter: the opening ROB, taken tank by tank under the agreed procedure.</Tile>
          <Tile art="gauge" tag="Closing" title="End of the period" tone="dark">Off-hire, or the end of a charter: the closing ROB, with receipts and transfers recorded in between.</Tile>
        </Tiles>
      </Chapter>

      <Chapter index="02" eyebrow="Reconciliation" title="Keep the period and the movements clear." tone="white" lede="Opening ROB, closing ROB, deliveries and other documented movements are distinct inputs. Check their period, fuel grade, units and scope before interpreting a balance.">
        <div className="space-y-5">
          <Formula label="A simple balance relationship" expr="Balance = Opening ROB + Receipts − Transfers out − Closing ROB" note="A reconciliation aid. Record the actual movements and follow the terms of your charter and reporting process." />
          <Formula label="Worked example, hypothetical inputs" expr="420 + 600 − 0 − 310 = 710 MT" note="Arithmetic on illustrative inputs, not a verified survey or charter settlement. Reconcile each fuel grade separately, on the same period, units and mass basis." />
        </div>
        <div className="mt-6"><Tiles>
          <Tile art="bars" tag="Worksheet" title="ROB balance" href="/tools/rob-balance" cta="Open the worksheet">Enter your own figures and see each step.</Tile>
          <Tile art="doc" tag="Guide" title="ROB checklist" href="/resources/rob-checklist" cta="View the checklist">What to confirm before and after the survey.</Tile>
        </Tiles></div>
      </Chapter>

      <Chapter index="03" eyebrow="Software workflow" title="From ROB inputs to a reviewable report." tone="mist">
        <Steps items={[
          { title: "Select the survey scope", body: "The survey firm determines the tanks, fuel grades, period and records included in its ROB survey." },
          { title: "Capture the field readings", body: "Surveyors enter the tank measurements and other inputs collected under their agreed procedure. Capture works offline." },
          { title: "Record other movements", body: "Add receipts, transfers or other relevant records needed to understand the period balance, according to the team's process." },
          { title: "Review calculations and inputs", body: "Review the recorded readings, calculation inputs and fuel-grade breakdown before finalising the survey record." },
          { title: "Prepare the report outputs", body: "PDF and Excel report workflows. The sample report shows an example of the available outputs." },
        ]} />
      </Chapter>

      <Chapter index="04" eyebrow="FAQ" title="ROB questions." tone="white">
        <div className="space-y-6">
          <FaqList items={[
            { q: "Why record on-hire and off-hire ROB separately?", a: "They describe fuel quantities at different points in a charter period. Keeping the records separate helps teams compare the opening and closing figures with deliveries and other documented movements." },
            { q: "How does the surveyor handle differences between engine room logbooks and physical soundings?", a: "The survey firm decides which source records to collect and compare. Space BQS is software for entering survey information and supporting review; it does not perform the physical measurements." },
            { q: "Are settling, service and drain tanks included in an ROB survey?", a: "The tanks included depend on the survey scope and applicable procedure. The survey team records the tanks it measures and the report should make the scope clear." },
            { q: "Is Space BQS an automated condition survey tool?", a: "No. Space BQS is bunker quantity survey software, not a vessel inspection company or fuel-testing laboratory." },
          ]} />
          <Notice>Space BQS is not an inspection company or testing laboratory. Scope, tanks and procedure are decided by the survey firm.</Notice>
        </div>
      </Chapter>

    </div>
  );
}
