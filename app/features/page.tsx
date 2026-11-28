import type { Metadata } from "next";
import { PageHero, HeroImage, Chapter, Tiles, Tile, Steps, Notice, StatStrip } from "../components/Editorial";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/features", {
  title: "Bunker Survey Software Features",
  description:
    "Explore Space BQS mobile capture, web review, survey records, calculation inputs, vessel references, and report workflows.",
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/features"
        crumb="Features"
        eyebrow="Platform / capabilities"
        title="A survey record has a journey."
        description="The product areas that support field capture, calculation review, vessel reference data and report handover. Confirm release-specific details with the product team."
        primaryAction={{ href: "/request-demo", label: "Walk through the platform" }}
        secondaryAction={{ href: "/how-we-measure", label: "Understand the method" }}
        visual={<HeroImage src="/assets/videos/space-bqs-survey-01.webp" alt="View over the deck of a tanker underway at sea" caption="From field context to an office-ready record." />}
      />

      <section className="bg-[#f7fbfd] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <StatStrip items={[
            { value: "4", label: "Product areas" },
            { value: "2", label: "Report formats: PDF and Excel" },
            { value: "3", label: "Survey types" },
            { value: "1", label: "Record from deck to report" },
          ]} />
        </div>
      </section>

      <Chapter index="01" eyebrow="Product areas" title="Four places the record is worked on." lede="Space BQS is bunker quantity survey software for marine survey firms and inspection teams. The technical scope of each feature should be confirmed for the release being evaluated.">
        <Tiles>
          <Tile art="bars" tag="Office" title="Survey register and dashboard" href="/features/survey-register-dashboard" cta="Register details" className="md:col-span-2" tone="accent">
            Review bunker survey records and their status in the web platform: find a survey, see where it sits in review, and know what still needs attention.
          </Tile>
          <Tile art="gauge" tag="Method" title="Calculation workflow" href="/features/calculation-audit" cta="Calculation details">
            See how tank readings, reference inputs, volume correction and density appear in the calculation, step by step.
          </Tile>
          <Tile art="tank" tag="Reference data" title="Tank tables and master data" href="/features/vessels-master-data" cta="Reference data details">
            Vessel particulars and tank calibration data the survey relies on, with trim and list recorded as context.
          </Tile>
          <Tile art="doc" tag="Output" title="PDF and Excel reports" href="/features/reports-ai" cta="Report details" tone="dark" className="md:col-span-2">
            PDF and Excel report workflows for review and handover. The illustrative report uses fictional data, never a customer survey.
          </Tile>
        </Tiles>
      </Chapter>

      <Chapter index="02" eyebrow="Workflow" title="From mobile capture to office review." tone="white">
        <Steps items={[
          { meta: "Field", title: "Capture in context", body: "Surveyors record tank readings offline and sync their work when connectivity returns." },
          { meta: "Review", title: "Inspect the working", body: "Product materials refer to ASTM Table 54B for volume correction. Confirm the production table edition and calculation details for the release your team uses." },
          { meta: "Handover", title: "Prepare the record", body: "Supervisor review and PDF/Excel report workflows. See the illustrative report layout, which uses fictional data." },
        ]} />
        <div className="mt-6"><Notice label="Evaluating?">Feature descriptions come from product materials. Search fields, statuses, permissions and report fields should be confirmed against the release and configuration you evaluate.</Notice></div>
      </Chapter>

    </div>
  );
}
