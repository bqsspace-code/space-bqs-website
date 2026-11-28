import type { Metadata } from "next";
import { PageHero, HeroImage, Chapter, Tiles, Tile, Checklist, Notice } from "../../components/Editorial";
import { routeMetadata } from "../../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/features/reports-ai", {
  title: "Bunker Survey PDF and Excel Reports",
  description:
    "See how Space BQS organizes bunker survey information in PDF and Excel report workflows for review and handover.",
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/features/reports-ai"
        crumb="Reports"
        parent={{ href: "/features", label: "Features" }}
        eyebrow="Feature / report handover"
        title="A report is the next reader's starting point."
        description="PDF and Excel report workflows for bunker quantity survey records. Examples are illustrative and use fictional data, not customer survey results."
        primaryAction={{ href: "/sample-report", label: "View illustrative report" }}
        secondaryAction={{ href: "/request-demo", label: "Discuss report workflows" }}
        visual={<HeroImage src="/assets/videos/space-bqs-survey-04.webp" alt="Illustrative quantity certificate and audit workbook mockups" caption="Illustrative visuals with fictional information, not a customer survey record." />}
      />

      <Chapter index="01" eyebrow="Two formats" title="One for reading. One for checking." lede="Report contents depend on the survey information and the current product release.">
        <Tiles>
          <Tile art="doc" tag="PDF" title="PDF report layout" href="/sample-report" cta="Inspect the layout">
            The sample page shows an illustrative layout with fictional data. It is not an issued certificate or a real survey.
            <ul className="mt-4 space-y-2 text-sm">
              <li>Example survey particulars and report fields</li>
              <li>Scope and reporting requirements vary by contract and procedure</li>
            </ul>
          </Tile>
          <Tile art="bars" tag="Excel" title="Excel report layout" tone="dark">
            The workbook preview shows how measurement and calculation information can be organised for review. Rows are fictional.
            <ul className="mt-4 space-y-2 text-sm">
              <li>Survey particulars and BDN reference</li>
              <li>Tank readings and measured inputs</li>
              <li>Calculation fields and report outputs</li>
            </ul>
          </Tile>
        </Tiles>
      </Chapter>

      <Chapter index="02" eyebrow="What a good report does" title="Questions a reader should be able to answer." tone="white">
        <Checklist items={[
          "Who performed the survey, and when?",
          "What was measured, and under which scope or procedure?",
          "Which inputs went into the calculation?",
          "Which method and version produced the figures?",
          "What does the report not claim?",
        ]} />
      </Chapter>

      <Chapter index="03" eyebrow="Scope" title="Quantity survey reporting, not fuel-quality testing." tone="mist">
        <Notice label="What these workflows describe">Space BQS is bunker quantity survey software. Its materials describe mobile capture, web review and PDF/Excel report workflows. A software report does not itself certify a survey, establish fuel quality or determine legal admissibility. Laboratory analysis and legal determinations are outside this software.</Notice>
      </Chapter>

    </div>
  );
}
