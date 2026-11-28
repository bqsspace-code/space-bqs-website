import type { Metadata } from "next";
import dynamic from "next/dynamic";
import sampleReportSchema from "@/schema/04_sample_report.json";
import { routeMetadata } from "../lib/seo-metadata";
import { PageHero, HeroFacts, Chapter, Checklist, Notice } from "../components/Editorial";
import { LazyMount } from "../components/Motion";

const SampleReportClient = dynamic(() => import("./SampleReportClient"));

export const metadata: Metadata = routeMetadata("/sample-report", {
  title: "Sample Bunker Survey Report",
  description:
    "Explore a sample bunker survey PDF and Excel report to see the measurements and calculation details Space BQS can present.",
  openGraph: {
    type: "article",
    title: "Sample Bunker Survey Report | Space BQS",
    description: "Explore a sample bunker survey PDF and Excel report to see the measurements and calculation details Space BQS can present.",
  },
});

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sampleReportSchema) }} />
      <PageHero
        href="/sample-report"
        crumb="Sample Report"
        eyebrow="Illustrative preview · fictional data"
        title="Open a report. Follow a figure to its inputs."
        description="This layout preview uses fictional example values. It is not a real survey, customer record or issued certificate. Ask the team for a current product output sample."
        primaryAction={{ href: "#report-preview", label: "Open the preview" }}
        secondaryAction={{ href: "/how-we-measure", label: "How we measure" }}
        visual={<HeroFacts title="What you can inspect" rows={[
          { label: "PDF", value: "The certificate layout" },
          { label: "Excel", value: "Four supporting sheets" },
          { label: "Data", value: "Entirely fictional" },
        ]} />}
      />

      <div id="report-preview" className="scroll-mt-24">
        <LazyMount minHeight={720} margin="480px"><SampleReportClient /></LazyMount>
      </div>

      <Chapter index="01" eyebrow="How to read it" title="Questions to put to any report." tone="white" lede="Use this one, then hold your own reports up against the same questions.">
        <div className="space-y-5">
          <Checklist items={[
            "Can each total be traced to tank-level lines?",
            "Are the water deduction and correction factor visible per tank?",
            "Is the method named, with its version?",
            "Is it clear who surveyed, who reviewed and when?",
            "Does the report state what it does not claim?",
          ]} />
          <Notice label="Illustrative only">Figures in the preview are fictional. The product output depends on your release and configuration, so confirm fields and layout in a walkthrough.</Notice>
        </div>
      </Chapter>

    </>
  );
}
