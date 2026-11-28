import type { Metadata } from "next";
import { PageHero, HeroFacts, Chapter, Steps, Tiles, Tile, Checklist, Notice } from "../components/Editorial";
import { Formula, InlineLink } from "../components/EditorialExtras";
import { LazyMount } from "../components/Motion";
import EnginePipelineGraphic from "../components/EnginePipelineGraphic";
import LiveCalculator from "../components/LiveCalculator";
import { ENGINE_VERSION } from "../lib/site";
import howWeMeasureSchema from "@/schema/03_how_we_measure.json";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/how-we-measure", {
  title: "Bunker Quantity Calculation Method",
  description:
    "Plain-English methodology for survey teams: tank reading, minus water, temperature volume correction, to mass in MT. No guessing.",
});

export default function Page() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howWeMeasureSchema) }} />
      <PageHero
        href="/how-we-measure"
        crumb="How It Calculates"
        eyebrow="Calculation methodology"
        title="How bunker quantity calculations work."
        description="Follow the inputs, the correction factor and the mass conversion, and see where the published description stops."
        primaryAction={{ href: "#try-it", label: "Check the arithmetic" }}
        secondaryAction={{ href: "/sample-report", label: "See a sample report" }}
        visual={<HeroFacts title="The calculation path" rows={[
          { label: "Step 1", value: "Tank reading" },
          { label: "Step 2", value: "Minus water" },
          { label: "Step 3", value: "Temperature correction" },
          { label: "Step 4", value: "Mass in MT" },
        ]} />}
      />

      <Chapter index="01" eyebrow="In short" title="From a sounding to a mass." lede="Results depend on the source readings, the reference tables and the mass basis used.">
        <div className="space-y-6">
          <p className="max-w-2xl text-[17px] leading-8 text-[#31485f]">
            A bunker quantity calculation uses the vessel's tank calibration data to convert a sounding or ullage into volume. The record can then account for free water, apply a volume correction factor such as ASTM Table 54B where applicable, and convert corrected volume to mass using the recorded density.
          </p>
          <Steps items={[
            { meta: "Input", title: "Tank reading to volume", body: "A sounding or ullage is converted to observed volume using the vessel's calibration data." },
            { meta: "Adjust", title: "Free water", body: "Where the method deducts free water, the volume deducted is shown against the observed volume." },
            { meta: "Correct", title: "Volume correction factor", body: "Observed temperature and reference density determine the factor, for example from ASTM Table 54B where applicable." },
            { meta: "Convert", title: "Mass in metric tonnes", body: "Corrected volume is multiplied by the recorded density and expressed in tonnes." },
          ]} />
        </div>
      </Chapter>

      <Chapter index="02" eyebrow="At a glance" title="The workflow, pictured." tone="white" lede="A conceptual illustration of the stages. It shows the shape of the calculation, not a statement about table edition or out-of-range behaviour.">
        <LazyMount minHeight={420}><EnginePipelineGraphic /></LazyMount>
      </Chapter>

      <Chapter id="try-it" index="03" eyebrow="Try it" title="Check the volume-to-mass arithmetic." tone="mist" lede="Supply your approved VCF and reference density. The worksheet shows the arithmetic; it does not run the production Table 54B engine or calculate a factor from temperature.">
        <div className="glass-card rounded-[1.8rem] p-4 sm:p-7"><LazyMount minHeight={360}><LiveCalculator /></LazyMount></div>
      </Chapter>

      <Chapter id="bdn-validation" index="04" eyebrow="Calculation checks" title="How a BDN difference is checked." tone="white" lede="Subtract the declared mass from the measured mass, divide by the declared mass and multiply by 100. A negative result means the measured figure is lower; the arithmetic alone cannot establish why.">
        <div className="space-y-5">
          <Formula label="Signed difference" expr={<>Difference (MT) = Measured − Declared<br />Difference (%) = Difference ÷ Declared × 100</>} />
          <div className="glass-card overflow-hidden rounded-[1.6rem]">
            <p className="border-b border-[#c9dce8] px-5 py-4 font-mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#176a8e] sm:px-7">Reference checks · calculation engine {ENGINE_VERSION} · metric tonnes</p>
            <div className="overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm">
              <thead><tr className="text-[#52657c]"><th scope="col" className="px-5 py-3 font-semibold sm:px-7">Declared</th><th scope="col" className="px-3 py-3 font-semibold">Measured</th><th scope="col" className="px-3 py-3 font-semibold">Expected difference</th></tr></thead>
              <tbody className="divide-y divide-[#c9dce8]/70 text-[#31485f]">
                <tr><td className="px-5 py-3 font-mono sm:px-7">460.000</td><td className="px-3 py-3 font-mono">457.819</td><td className="px-3 py-3">−2.181 MT (−0.47%, rounded to two decimals)</td></tr>
                <tr><td className="px-5 py-3 font-mono sm:px-7">500</td><td className="px-3 py-3 font-mono">505</td><td className="px-3 py-3">+5 MT (+1%)</td></tr>
                <tr><td className="px-5 py-3 font-mono sm:px-7">500</td><td className="px-3 py-3 font-mono">500</td><td className="px-3 py-3">0 MT (0%)</td></tr>
                <tr><td className="px-5 py-3 font-mono sm:px-7">0</td><td className="px-3 py-3 font-mono">5</td><td className="px-3 py-3">Rejected: a percentage difference needs a positive declared mass.</td></tr>
              </tbody>
            </table></div>
          </div>
          <Notice label="What these checks are">Automated regression checks for the signed BDN comparison arithmetic, covering positive, negative, equal and zero-declared-mass cases. They do not independently validate vessel measurements, the production Table 54B lookup or a customer survey. <a className="font-semibold text-[#032aac] underline underline-offset-4" href="https://github.com/bqsspace-code/space-bqs-website/blob/main/tests/survey-calculations.test.mjs">Review the test source</a>. <InlineLink href="/tools/bdn-discrepancy?example=delivery-note">Try the worked example</InlineLink> or <InlineLink href="/contact">report a calculation or documentation error</InlineLink>.</Notice>
        </div>
      </Chapter>

      <Chapter index="05" eyebrow="Calculation review" title="Inspect the inputs and the method." tone="mist">
        <div className="grid gap-5 md:grid-cols-2">
          <Checklist title="Reading the correction factor" items={[
            <><strong>Inputs:</strong> reference density and observed temperature determine the factor.</>,
            <><strong>Provenance:</strong> keep the engine and supporting table versions with the result.</>,
            <><strong>Review:</strong> inspect the factor and calculation breakdown before finalisation.</>,
          ]} />
          <Checklist title="Method boundaries" items={[
            <><strong>Trim and list:</strong> recorded as context; corrections are not computed.</>,
            <><strong>Quantity only:</strong> a quantity result does not establish fuel quality or lab compliance.</>,
            <><strong>Public tools:</strong> worksheets use explicitly supplied factors and do not issue certificates.</>,
          ]} />
        </div>
      </Chapter>

      <Chapter index="06" eyebrow="Primary references" title="Standards are separate from product claims." tone="white" lede="Listing a standard here does not mean Space BQS is certified or approved by its publisher or a port authority. Verify the edition and method for each survey with the responsible technical team.">
        <Tiles>
          <Tile art="doc" tag="ASTM" title="ASTM D1250">ASTM's catalog identifies D1250-25 as the active edition of its guide to temperature and pressure volume correction factors. Product materials refer to Table 54B; confirm the production engine's licensed table edition and implementation version. <a className="font-semibold underline underline-offset-4" href="https://store.astm.org/d1250-25.html" target="_blank" rel="noreferrer">ASTM catalog entry ↗</a></Tile>
          <Tile art="tank" tag="Singapore" title="MPA bunkering standards">MPA lists SS 600:2022 for tank gauging in specified circumstances and SS 648:2024 for mass-flow metering. They describe different approaches and do not establish that Space BQS is MPA-approved. <a className="font-semibold underline underline-offset-4" href="https://www.mpa.gov.sg/port-marine-ops/marine-services/bunkering/bunkering-standards" target="_blank" rel="noreferrer">MPA standards page ↗</a></Tile>
          <Tile art="shield" tag="Boundary" title="Product boundary" tone="dark">Space BQS provides software for survey teams. Contractual rights, letters of protest, attendance, legal admissibility and dispute outcomes are decided outside the software.</Tile>
          <Tile art="gauge" tag="Open item" title="Implementation details" tone="accent">Public information reviewed for this page does not establish the interpolation algorithm, table adjunct or out-of-range behaviour for each release. Request the current details from the team before relying on them.</Tile>
        </Tiles>
      </Chapter>

    </div>
  );
}
