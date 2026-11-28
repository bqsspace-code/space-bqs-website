import type { Metadata } from "next";
import { PageHero, HeroImage, Chapter, Tiles, Tile, Checklist, Notice } from "../../components/Editorial";
import { routeMetadata } from "../../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/features/vessels-master-data", {
  title: "Tank Strapping Tables & Master Data",
  description:
    "Space BQS vessels and reference data: vessel register with IMO and DWT, tank strapping maps with revisions, ASTM Table 54B VCF grids. Why tables build trust.",
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/features/vessels-master-data"
        crumb="Vessels & reference data"
        parent={{ href: "/features", label: "Features" }}
        eyebrow="Feature / vessel references"
        title="The right survey starts with the right reference."
        description="Vessel particulars and tank calibration information described in Space BQS product materials. Confirm sources, revision handling and calculation methods for the release you evaluate."
        primaryAction={{ href: "/request-demo", label: "Review reference-data needs" }}
        secondaryAction={{ href: "/features/calculation-audit", label: "Explore calculation review" }}
        visual={<HeroImage src="/assets/videos/space-bqs-survey-02.webp" alt="Surveyor using a tablet beside an open vessel tank" caption="Reference data belongs in the conversation about calculation review." />}
      />

      <Chapter index="01" eyebrow="Master records" title="The data the calculation stands on." lede="Bunker quantity calculations depend on the vessel calibration data used for the survey.">
        <Tiles cols={3}>
          <Tile art="tank" tag="Vessel" title="Master profiles">Vessel reference information associated with survey records. Confirm which particulars and tank identifiers your release supports.</Tile>
          <Tile art="stack" tag="Tank" title="Strapping tables" tone="dark">Tank calibration tables used for sounding and ullage lookups. Confirm the supported table format and reference fields.</Tile>
          <Tile art="sync" tag="History" title="Revisions">Confirm how table revisions are stored and tied to historical records in your release.</Tile>
        </Tiles>
      </Chapter>

      <Chapter index="02" eyebrow="Data quality" title="Why calibration data quality matters." tone="white" lede="Manual tank-table lookups and copying between systems can introduce transcription errors. Confirm the production method and validation behaviour for your release.">
        <div className="space-y-5">
          <Tiles>
            <Tile art="gauge" tag="Lookup" title="Calibration lookup">Converting a recorded sounding or ullage into a tank volume using the applicable calibration data. Confirm the interpolation method and how intermediate steps appear.</Tile>
            <Tile art="wave" tag="Edge case" title="Out-of-range readings" tone="accent">A reading outside the table range needs review under the survey firm's procedure. Confirm how the release flags or handles it.</Tile>
          </Tiles>
          <Notice label="Trim and list">Trim and list are recorded as context. Product materials state they are not calculated as corrections.</Notice>
        </div>
      </Chapter>

      <Chapter index="03" eyebrow="Before go-live" title="Reference data to settle with the team." tone="mist">
        <Checklist items={[
          "Where each vessel's tank tables come from, and how current they are",
          "How a revised table is introduced without altering past surveys",
          "Who is allowed to edit vessel and tank reference data",
          "How existing vessel records would be brought across",
        ]} />
      </Chapter>

    </div>
  );
}
