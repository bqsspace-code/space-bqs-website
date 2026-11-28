import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "../components/ui";
import { PageHero, HeroFacts, Chapter, Tiles, Tile, Notice, Ledger } from "../components/Editorial";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/why-independent", {
  title: "Bunker Delivery Note vs Surveyed Quantity",
  description: "Understand what a supplier BDN records, what a bunker quantity survey measures, and how survey software helps teams document the comparison.",
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/why-independent"
        crumb="Why Independent"
        eyebrow="BDN vs survey"
        title="Declared quantity. Measured quantity."
        description="A BDN records the supplier's declared delivery quantity. A bunker quantity survey records measurements made by a survey team for comparison. Space BQS is software: it does not attend a vessel, conduct a survey, or certify the survey findings."
        primaryAction={{ href: "/how-we-measure", label: "How we measure" }}
        secondaryAction={{ href: "/sample-report", label: "Sample report" }}
        visual={<HeroFacts title="Two records, compared" rows={[
          { label: "Supplier BDN", value: "Declared delivery" },
          { label: "Survey record", value: "Team measurements" },
          { label: "Space BQS", value: "Software only" },
        ]} />}
      />

      <Chapter index="01" eyebrow="Compare the records" title="What each figure represents.">
        <div className="space-y-6">
          <Tiles>
            <Tile tag="Record A" title="Supplier BDN" tone="dark">
              The Bunker Delivery Note records the supplier&apos;s declared delivery information. It is one input to the commercial record.
            </Tile>
            <Tile tag="Record B" title="Survey record" tone="accent">
              A survey team records its own measurements and calculation inputs under the applicable contract and procedure. Space BQS provides software to capture, review, and report those records; the survey firm and its personnel conduct the attendance and make the measurements.
            </Tile>
          </Tiles>
          <Notice label="In short">
            A difference between BDN and surveyed figures is a reason to check the measurement scope, units, timing, inputs, and applicable terms. The difference alone does not establish its cause or determine a contractual outcome.
          </Notice>
        </div>
      </Chapter>

      <Chapter index="02" eyebrow="Digital workflow" title="Keep the comparison's inputs together." tone="white">
        <Ledger items={[
          { title: "Record the BDN with the survey", body: "Keep BDN details alongside the survey's measurement records." },
          { title: "Review the working", body: "Check the entered readings, calculation details, and report output." },
          { title: "Read the method", body: <>Use the <Link className="font-semibold text-[#032aac] underline underline-offset-4" href="/how-we-measure">calculation-method guide</Link> and <Link className="font-semibold text-[#032aac] underline underline-offset-4" href="/sample-report">sample report</Link> to see the published workflow.</> },
        ]} />
      </Chapter>

      <Chapter index="03" eyebrow="Spreadsheet review" title="Can survey software reduce spreadsheet formula errors?" tone="mist">
        <Ledger items={[
          { title: "Reduce formula drift", body: "A consistently maintained software workflow can reduce reliance on separate workbooks whose formulas may be copied or changed independently. Confirm the calculation method and release used by your team." },
          { title: "Keep inputs reviewable", body: "Digital capture can keep entered readings and calculation inputs together for review. The usefulness of that record depends on the surveyor entering the correct source values and units." },
          { title: "Do not mistake arithmetic for verification", body: "Software does not independently confirm physical measurements, vessel calibration data, or contractual requirements. A repeatable result still needs review against the applicable procedure." },
        ]} />
        <p className="mt-8 max-w-2xl text-sm leading-7 text-[#52657c]">
          For the published calculation scope, read the <Link className="font-semibold text-[#032aac] underline underline-offset-4" href="/features/calculation-audit">calculation workflow notes</Link> and try the <Link className="font-semibold text-[#032aac] underline underline-offset-4" href="/tools/volume-to-mass">supplied-factor worksheet</Link>.
        </p>
      </Chapter>

      <Chapter index="04" eyebrow="FAQ" title="Independence questions." tone="white">
        <Faq items={[
          { q: "Does a difference prove a shortage?", a: "No. Compare the scope, units, timing, and calculation inputs, then follow the applicable contract and procedures." },
          { q: "Does Space BQS provide survey attendance?", a: "No. Space BQS is survey software. Marine survey firms provide attendance and make the measurements." },
          { q: "What is Space BQS used for?", a: "Survey teams use the mobile and web software to record bunker survey information, support review, and prepare report outputs." },
        ]} />
      </Chapter>

    </div>
  );
}
