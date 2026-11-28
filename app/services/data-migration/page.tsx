import type { Metadata } from "next";
import ServiceSchema from "../../components/ServiceSchema";
import { PageHero, HeroImage, Chapter, Tiles, Tile, Steps, Checklist, Notice } from "../../components/Editorial";
import { routeMetadata } from "../../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/services/data-migration", { title: "Marine Survey Data Migration", description: "Plan a survey-data migration with source mapping, trial import, reconciliation, and approval before the final move." });

export default function Page() {
  return (
    <div>
      <PageHero
        href="/services/data-migration"
        crumb="Data migration"
        parent={{ href: "/services", label: "Services" }}
        eyebrow="Data migration"
        title="Bring the records. Keep the context."
        description="A review-led migration service for Space BQS and Cargo WMS implementations. Agree the mapping, test the import, and reconcile before the final move."
        primaryAction={{ href: "#migration-steps", label: "Review the migration path" }}
        secondaryAction={{ href: "/request-demo", label: "Discuss your source data" }}
        visual={<HeroImage src="/assets/videos/space-bqs-survey-02.webp" alt="Surveyor using a tablet beside an open vessel tank" caption="Plan mappings and validation before the final move." />}
      />

      <Chapter id="migration-steps" index="01" eyebrow="Migration plan" title="A controlled path from source to system." lede="Review the data in stages, surface exceptions, and agree acceptance criteria with the people who own the records.">
        <Steps items={[
          { meta: "Phase 1", title: "Profile and map", body: "Review source files, identify duplicates and missing fields, and agree what moves into the new system." },
          { meta: "Phase 2", title: "Cleanse with your team", body: "Apply agreed rules. Uncertain records go back for a business decision instead of being silently changed." },
          { meta: "Phase 3", title: "Run a trial import", body: "Import into a non-production environment and return a row-level exception report." },
          { meta: "Phase 4", title: "Reconcile and approve", body: "Compare counts, identifiers, sample records and agreed totals with your nominated reviewers." },
          { meta: "Phase 5", title: "Make the final move", body: "Create a rollback point, import the approved data, and hand over the mapping and reconciliation record." },
        ]} />
      </Chapter>

      <Chapter index="02" eyebrow="Scope" title="Scope the right data." tone="white">
        <Tiles>
          <Tile art="tank" tag="Product" title="For Space BQS">Review vessel particulars, tank calibration tables, supported correction references and historical survey records. Agree how source formats and historical statuses map before import.</Tile>
          <Tile art="stack" tag="Product" title="For Cargo WMS" tone="dark">Review customers, manifests, cargo and location records, tariffs and historical charges. Include any opening positions and financial reconciliation in the agreed scope.</Tile>
        </Tiles>
      </Chapter>

      <Chapter index="03" eyebrow="Prepare" title="What to bring to the first review." tone="mist">
        <div className="space-y-5">
          <Checklist items={[
            "Representative spreadsheets and approximate record counts",
            "A list of current systems and the data owners for each",
            "The date you hope to switch",
          ]} />
          <Notice label="Pricing">Migration pricing depends on source formats, volume, quality and validation effort. Scheduled data exchange is scoped separately.</Notice>
        </div>
      </Chapter>

      <ServiceSchema offering="data-migration" />
    </div>
  );
}
