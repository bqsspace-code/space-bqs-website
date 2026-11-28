import type { Metadata } from "next";
import Link from "next/link";
import { routeMetadata } from "../lib/seo-metadata";
import { PageHero, HeroFacts, Chapter, Compare, Notice, Checklist } from "../components/Editorial";

export const metadata: Metadata = routeMetadata("/compare", {
  title: "Spreadsheets vs Bunker Survey Software",
  description:
    "An even-handed comparison of managing bunker quantity surveys in spreadsheets versus dedicated survey software, including where spreadsheets are still fine.",
});

const link = "font-semibold text-[#032aac] underline decoration-[#9bcbd7] underline-offset-4";

export default function Page() {
  return (
    <div>
      <PageHero
        href="/compare"
        crumb="Compare"
        eyebrow="Spreadsheets vs software"
        title="Where spreadsheets stop helping."
        description="Plenty of good surveys are run from workbooks. This page sets out, without exaggeration, what changes when the workflow moves into dedicated software and what does not."
        primaryAction={{ href: "/evaluate", label: "How to evaluate" }}
        secondaryAction={{ href: "/how-we-measure", label: "How we measure" }}
        visual={<HeroFacts title="Compared on" rows={[
          { label: "1", value: "Calculation consistency" },
          { label: "2", value: "Field capture" },
          { label: "3", value: "Review and records" },
          { label: "4", value: "Reports" },
        ]} />}
      />

      <Chapter index="01" eyebrow="Side by side" title="Seven things that change." lede="Left is a typical workbook-based process. Right is the Space BQS workflow as published on this site.">
        <Compare
          left="Spreadsheet workflow"
          right="Space BQS"
          rows={[
            { topic: "Calculation", a: "Formulas live in a workbook that may be copied, edited or left on an old version by different people.", b: "One maintained calculation path, so the method and version behind a figure can be stated in the report." },
            { topic: "Field capture", a: "Paper notes or a phone photo, retyped later. Re-keying is a common source of transcription slips.", b: "Surveyor enters readings once, in a fixed Ship, Fuel, Tanks sequence on the mobile app." },
            { topic: "No signal", a: "Works offline if the file is already on the device, but only for whoever holds that copy.", b: "Capture and calculation work offline; the record syncs when connectivity returns." },
            { topic: "Review", a: "Supervisor opens the file, re-reads the cells and hopes nothing was overwritten.", b: "Supervisor reviews the recorded inputs and calculation breakdown on the web platform, and can recalculate before finalising." },
            { topic: "Reports", a: "Built by hand from the workbook, with layout varying between people.", b: "PDF and Excel outputs prepared from the finalised record." },
            { topic: "Finding it later", a: "Depends on file naming and folders.", b: "Surveys are held in a register your team can search and filter." },
            { topic: "Cost of change", a: "Free to start; the cost shows up later as checking time.", b: "Licensed. Pricing is scoped with the team and not published." },
          ]}
        />
      </Chapter>

      <Chapter index="02" eyebrow="Fair is fair" title="When a spreadsheet is still the right answer." tone="white">
        <div className="grid gap-5 md:grid-cols-2">
          <Checklist title="Spreadsheets are fine when" items={[
            "One or two people run a handful of surveys a year",
            "The same person measures, calculates and reviews",
            "Clients do not ask for the working behind a figure",
            "You already have a tightly controlled, versioned workbook",
          ]} />
          <Checklist title="Software starts to pay when" items={[
            "Several surveyors and a separate reviewer share the work",
            "Different people have produced slightly different versions of the sheet",
            "Clients ask how a figure was reached",
            "Finding last year's survey takes more than a minute",
          ]} />
        </div>
      </Chapter>

      <Chapter index="03" eyebrow="Limits" title="What software does not fix." tone="mist">
        <Notice label="Be clear-eyed">
          A repeatable result is not the same as a verified one. Software does not independently confirm the physical measurement, the vessel's calibration data or the contractual requirements, and the surveyor still has to enter the right values in the right units. Read the full reasoning in <Link className={link} href="/why-independent">BDN vs measured quantity</Link>, and try the <Link className={link} href="/tools/volume-to-mass">supplied-factor worksheet</Link> to see the calculation steps for yourself.
        </Notice>
      </Chapter>

    </div>
  );
}
