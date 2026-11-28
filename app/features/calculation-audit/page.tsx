import type { Metadata } from "next";
import { PageHero, HeroImage, Chapter, Tiles, Tile, Steps, Notice, StatStrip } from "../../components/Editorial";
import { Formula } from "../../components/EditorialExtras";
import { routeMetadata } from "../../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/features/calculation-audit", {
  title: "Deterministic ASTM 54B Calculation Engine",
  description:
    "Review bunker calculation inputs, tank readings, water deductions, and volume correction. Confirm the production method and table edition for your release.",
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/features/calculation-audit"
        crumb="Calculation workflow"
        parent={{ href: "/features", label: "Features" }}
        eyebrow="Feature / calculation review"
        title="Make the calculation path easier to follow."
        description="The inputs and method described by the product, from tank readings and reference data to a quantity result. Confirm production implementation and table edition with the product team."
        primaryAction={{ href: "/tools/volume-to-mass", label: "Try the volume worksheet" }}
        secondaryAction={{ href: "/sample-report", label: "View illustrative report" }}
        visual={<HeroImage src="/assets/videos/space-bqs-survey-02.webp" alt="Surveyor using a tablet beside an open vessel tank" caption="Inputs, references and reported values should remain reviewable." />}
      />

      <Chapter index="01" eyebrow="Scope of this page" title="What is and is not claimed." lede="This page explains the shape of the calculation. It is not a validation certificate.">
        <Notice label="Please note">Space BQS product materials identify ASTM Table 54B as a volume-correction reference. The exact production implementation, table edition, reference conditions and validation behaviour should be confirmed for the release your organisation uses. The public volume-to-mass worksheet on this site accepts a user-supplied factor and is not the production table engine.</Notice>
      </Chapter>

      <Chapter index="02" eyebrow="Calculation steps" title="Five steps from tape reading to metric tonnes." tone="white">
        <Steps items={[
          { meta: "Step 1", title: "Observed volume from tank strapping tables", body: "The surveyor records tape sounding (liquid depth) or ullage (empty height from the reference point). The application converts the reading using the vessel calibration data selected for the survey. Confirm the applicable table and lookup method for your release." },
          { meta: "Step 2", title: "Free water deduction", body: "Water paste readings identify settled water at the tank bottom. Where the survey method deducts free water, the record shows the volume deducted. A negative result, or free water exceeding observed volume, needs review under your procedure." },
          { meta: "Step 3", title: "Volume correction factor", body: "Heated fuel expands. Product materials refer to ASTM D1250 Table 54B, using density at 15°C and observed temperature. Inputs outside the supported range should be flagged for review rather than assumed. Confirm validation behaviour for your release." },
          { meta: "Step 4", title: "Mass in metric tonnes", body: "Bunker quantities are commonly expressed by mass. The report applies the density and mass basis defined for the survey to convert standard volume to tonnes." },
          { meta: "Step 5", title: "Rounding and record detail", body: "Product materials describe tank-level working and report outputs. Confirm arithmetic precision, rounding rules and the reference information retained with each line before relying on them in a procedure." },
        ]} />
      </Chapter>

      <Chapter index="03" eyebrow="The formulas" title="Written out, so you can check them." tone="mist">
        <div className="space-y-5">
          <Formula label="Net observed volume" expr="Net Observed Volume (m³) = Total Observed Volume (m³) − Free Water Volume (m³)" />
          <Formula label="Standard volume" expr="Standard Volume at 15°C (m³) = Net Observed Volume (m³) × Table 54B VCF" />
          <Formula label="Mass" expr={<>Mass (kg) = Standard Volume (m³) × Density at 15°C (kg/m³)<br />Mass in MT = Mass (kg) ÷ 1,000</>} />
        </div>
      </Chapter>

      <Chapter index="04" eyebrow="Benchmark" title="A worked check: VLSFO example." tone="white" lede="Illustrative arithmetic using the listed inputs. The result is not a production-engine validation or a customer survey result.">
        <div className="space-y-5">
          <StatStrip items={[
            { value: "500.000", label: "Observed volume, m³ (free water 2.000 · net 498.000)" },
            { value: "0.9500", label: "Density @ 15°C, kg/L · VLSFO 380 cSt" },
            { value: "40.0°C", label: "Observed temperature · VCF 0.9677" },
            { value: "457.819", label: "Resulting mass, MT (worked check)" },
          ]} />
          <Tiles>
            <Tile art="bars" tag="Try it" title="Volume-to-mass worksheet" href="/tools/volume-to-mass" cta="Open the worksheet">Enter your own supplied factor and watch each step resolve.</Tile>
            <Tile art="doc" tag="See it" title="Illustrative report" href="/sample-report" cta="View the report">The calculation breakdown as it appears in a report, with fictional data.</Tile>
          </Tiles>
        </div>
      </Chapter>

    </div>
  );
}
