import type { Metadata } from "next";
import { Section, CtaRow, AnswerBlock } from "../../components/ui";
import EditorialHero, { HeroImage } from "../../components/EditorialHero";
import { Ship, Table, History, CheckCircle2, AlertTriangle } from "lucide-react";
import { routeMetadata } from "../../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/features/vessels-master-data", {
  title: "Tank Strapping Tables & Master Data",
  description:
    "Space BQS vessels and reference data: vessel register with IMO and DWT, tank strapping maps with revisions, ASTM Table 54B VCF grids. Why tables build trust.",
});

export default function Page() {
  return (
    <div className="space-y-12 pb-20">
      <EditorialHero
        trail={[{ href: "/", label: "Home" }, { href: "/features", label: "Features" }, { href: "/features/vessels-master-data", label: "Vessels & reference data" }]}
        eyebrow="Feature / vessel references"
        title="The right survey starts with the right reference."
        description="Explore vessel particulars and tank calibration information described in Space BQS product materials. Confirm sources, revision handling, and calculation methods for the release you evaluate."
        primaryAction={{ href: "/request-demo", label: "Review reference-data needs" }}
        secondaryAction={{ href: "/features/calculation-audit", label: "Explore calculation review" }}
        visual={<HeroImage src="/assets/videos/space-bqs-survey-02.webp" alt="Surveyor using a tablet beside an open vessel tank" caption="Reference data belongs in the conversation about calculation review." position="center" />}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <AnswerBlock>
          <p>
            Bunker quantity calculations depend on the vessel calibration data used for the survey. Space BQS product materials describe vessel and tank reference data as part of the survey workflow. Confirm the data sources, revision handling, and production calculation method for the release your team evaluates.
          </p>
        </AnswerBlock>
      </div>

      {/* Key Components */}
      <Section eyebrow="Master Records" title="Authoritative data structures driving survey calculations">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#d3e4ee] bg-white p-6 shadow-[0_12px_36px_-28px_rgba(3,42,172,.35)] sm:p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 mb-4">
              <Ship className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Vessel Master Profiles
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Product materials describe vessel reference information associated with survey records. Confirm which particulars and tank identifiers are supported in the current release.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d3e4ee] bg-white p-6 shadow-[0_12px_36px_-28px_rgba(3,42,172,.35)] sm:p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 mb-4">
              <Table className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Digitized Tank Strapping Tables
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Product materials describe tank calibration tables used for sounding and ullage lookups. Confirm the supported table format and reference fields with the product team.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d3e4ee] bg-white p-6 shadow-[0_12px_36px_-28px_rgba(3,42,172,.35)] sm:p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 mb-4">
              <History className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Reference-data revisions
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Product materials describe vessel and tank reference data. Confirm how table revisions are stored and associated with historical records in the current product release.
            </p>
          </div>
        </div>
      </Section>

      {/* Why Strapping Tables Build Trust */}
      <Section eyebrow="Data quality" title="Why calibration data quality matters">
        <div className="rounded-2xl border border-[#d3e4ee] bg-[#eaf4f9] p-6 md:p-8">
          <h3 className="font-display text-xl font-bold text-ocean-950">
            Reducing manual lookup and transcription steps
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Manual tank-table lookups and copying between systems can introduce transcription errors. Space BQS product materials describe automated calibration handling; confirm the production method and validation behavior for the release your team uses.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[#d3e4ee] bg-white p-5 sm:p-6">
              <h4 className="font-display font-bold text-ocean-950 text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-ocean-600" /> Calibration lookup
              </h4>
              <p className="mt-2 text-sm text-slate-600 leading-7">
                Product materials describe converting a recorded sounding or ullage into a tank volume using the applicable calibration data. Confirm the interpolation method and how intermediate steps appear in the record.
              </p>
            </div>

            <div className="rounded-xl border border-[#d3e4ee] bg-white p-5 sm:p-6">
              <h4 className="font-display font-bold text-ocean-950 text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" /> Out-of-range readings
              </h4>
              <p className="mt-2 text-sm text-slate-600 leading-7">
                A reading outside the calibration table range needs review under the survey firm&apos;s procedure. Confirm how the current product release flags or handles out-of-range inputs.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <CtaRow />
        </div>
      </Section>
    </div>
  );
}
