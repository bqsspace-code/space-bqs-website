import type { Metadata } from "next";
import { routeMetadata } from "../../lib/seo-metadata";
import { PageHero, HeroImage, Chapter, Tiles, Tile, Steps, Notice } from "../../components/Editorial";
import { FaqList } from "../../components/EditorialExtras";

export const metadata: Metadata = routeMetadata("/services/debunkering-survey", {
  title: "Debunkering Survey Workflow Software",
  description:
    "Space BQS software helps survey firms record and review information for fuel-removal surveys and prepare report outputs.",
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/services/debunkering-survey"
        crumb="Debunkering"
        parent={{ href: "/services", label: "Services" }}
        eyebrow="Survey workflow / 03"
        title="Document the movement out. Keep the scope clear."
        description="Space BQS supports survey firms documenting fuel-removal work. The survey firm performs attendance and measurements; the software supports capture, review and reporting."
        primaryAction={{ href: "/request-demo", label: "Discuss this workflow" }}
        secondaryAction={{ href: "/services", label: "Compare survey workflows" }}
        visual={<HeroImage src="/assets/videos/oil-tanker-sailing-poster.webp" alt="Oil tanker sailing at sea" caption="Illustrative maritime context · survey scope is defined by the responsible parties." />}
      />

      <Chapter index="01" eyebrow="What it is" title="Quantities before and after a removal." lede="A debunkering survey records relevant fuel quantities before and after a removal operation under the agreed measurement procedure.">
        <Notice label="Boundary">Space BQS provides a software workflow to capture survey details and prepare reports. It does not perform attendance, decide compliance, or determine contractual outcomes.</Notice>
      </Chapter>

      <Chapter index="02" eyebrow="Operational context" title="Examples of fuel-removal work." tone="white">
        <Tiles cols={3}>
          <Tile art="flow" tag="Operator-arranged" title="Fuel removal records">If a vessel operator arranges fuel removal, the survey firm may record quantities and related particulars. Quality decisions and removal requirements rest with the responsible parties and applicable procedures.</Tile>
          <Tile art="gauge" tag="Contractual" title="Charter or redelivery scope">A charter or redelivery may include fuel quantity and handover terms. The parties and survey firm determine the relevant scope and documentation.</Tile>
          <Tile art="tank" tag="Project" title="Repair or tank-cleaning">A repair or tank-cleaning project may involve fuel removal. Follow the facility's instructions and the survey scope agreed by the responsible parties.</Tile>
        </Tiles>
      </Chapter>

      <Chapter index="03" eyebrow="Software workflow" title="Information your survey team may record." tone="mist">
        <Steps items={[
          { meta: "Before removal", title: "Opening measurements", body: "Record the tank readings and other inputs collected under the survey firm's agreed procedure before fuel removal." },
          { meta: "During", title: "Transfer notes", body: "Record relevant transfer particulars and documents if they are within the team's survey scope. Operational monitoring remains the responsibility of the transfer parties." },
          { meta: "After removal", title: "Closing measurements", body: "Record post-removal measurements and document the survey scope, assumptions and source information used." },
          { meta: "Office", title: "Review and report", body: "Review the inputs and calculation information recorded for the survey, then use the current PDF and Excel report workflow." },
        ]} />
      </Chapter>

      <Chapter index="04" eyebrow="FAQ" title="Debunkering questions." tone="white">
        <FaqList items={[
          { q: "Does Space BQS decide which measurement method to use?", a: "No. The survey firm follows the applicable contract, port procedure and agreed measurement method. Space BQS provides software for recording and reviewing survey information." },
          { q: "How does the system account for unpumpable fuel and line displacement?", a: "That depends on the vessel reference data and survey scope. Survey teams should document any applicable limits and assumptions; the software does not determine what a contract treats as pumpable fuel." },
          { q: "What documentation is generated when debunkering completes?", a: "Space BQS supports PDF and Excel report workflows for survey records. The available fields and report contents are shown in the sample report and should be checked against the current product output.", more: { href: "/sample-report", label: "Sample report" } },
          { q: "Can debunkered fuel be blended or reused?", a: "Fuel quality and reuse decisions require the appropriate technical and commercial assessment. Space BQS is quantity-survey software and does not perform laboratory fuel-quality testing." },
        ]} />
      </Chapter>

    </div>
  );
}
