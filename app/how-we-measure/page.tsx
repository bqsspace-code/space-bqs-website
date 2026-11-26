import type { Metadata } from "next";
import { Section, AnswerBlock, CtaRow, Breadcrumbs } from "../components/ui";
import EnginePipelineGraphic from "../components/EnginePipelineGraphic";
import LiveCalculator from "../components/LiveCalculator";
import { ShieldCheck, Ruler, Droplets, Thermometer, Scale, AlertOctagon } from "lucide-react";
import howWeMeasureSchema from "@/schema/03_how_we_measure.json";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/how-we-measure", {
  title: "Bunker Quantity Calculation Method",
  description:
    "Plain-English methodology for survey teams: tank reading, minus water, temperature volume correction, to mass in MT. No guessing.",
});

export default function Page() {
  return (
    <div className="space-y-12 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howWeMeasureSchema) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/how-we-measure", label: "How It Calculates" },
          ]}
        />
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-sea-100 px-3 py-1 text-xs font-semibold text-sea-800">
            Calculation Methodology
          </span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl">
          How bunker quantity calculations work
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Follow the inputs, correction factor, and mass conversion.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <AnswerBlock>
          <p>
            A bunker quantity calculation uses the vessel&apos;s tank calibration data to convert a sounding or ullage into volume. The survey record can then account for free water, apply a volume correction factor such as ASTM Table 54B where applicable, and convert corrected volume to mass using the recorded density. Results depend on the source readings, reference tables, and mass basis used.
          </p>
        </AnswerBlock>
      </div>

      {/* 4-Stage Graphic & Strapping Curve */}
      <section className="mx-auto max-w-6xl px-4">
        <EnginePipelineGraphic />
      </section>

      {/* Interactive Simulator on the Method Page */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="mb-4">
          <h2 className="font-display text-2xl font-bold text-ocean-950">
            Check the volume-to-mass arithmetic
          </h2>
          <p className="text-xs text-slate-500">
            Supply your approved VCF and reference density. This worksheet shows the arithmetic; it does not run the production Table 54B engine or calculate a factor from temperature.
          </p>
        </div>
        <LiveCalculator />
      </section>

      {/* Mathematical Rigor & Proof Standards */}
      <Section eyebrow="Calculation review" title="Inspect the inputs and method">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-display font-bold text-ocean-950 text-lg">Table 54B Matrix Boundaries</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Read the correction factor alongside the inputs and table context used for the survey:
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-ocean-600"></span>
                <span><strong>Inputs:</strong> reference density and observed temperature determine the factor.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-ocean-600"></span>
                <span><strong>Provenance:</strong> keep the engine and supporting table versions with the result.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-ocean-600"></span>
                <span><strong>Review:</strong> inspect the factor and calculation breakdown before finalisation.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-display font-bold text-ocean-950 text-lg">Method boundaries</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Keep the calculation scope clear when reading the result:
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <AlertOctagon className="h-4 w-4 text-amber-500 shrink-0" />
                <span><strong>Trim and list:</strong> recorded as context; corrections are not computed by the engine.</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertOctagon className="h-4 w-4 text-amber-500 shrink-0" />
                <span><strong>Quantity only:</strong> a quantity result does not establish fuel quality or lab compliance.</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-sea-600 shrink-0" />
                <span><strong>Public tools:</strong> worksheets use explicitly supplied factors and do not issue certificates.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Primary references */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800 font-mono">
              Primary references
            </span>
          </div>
          <h3 className="font-display font-bold text-ocean-950 text-xl">
            Standards are separate from product claims
          </h3>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed max-w-3xl">
            Standards describe methods and port procedures; listing a standard here does not mean Space BQS is certified or approved by its publisher or a port authority. Verify the edition and method applicable to each survey with the responsible technical team.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
              <h4 className="font-display font-bold text-ocean-950 text-sm">
                ASTM D1250
              </h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                ASTM&apos;s current catalog identifies D1250-25 as the active edition of its guide to temperature and pressure volume correction factors. Space BQS product materials refer to Table 54B; confirm the production engine&apos;s licensed table edition and implementation version with the product team. <a href="https://store.astm.org/d1250-25.html" target="_blank" rel="noreferrer" className="underline">View the ASTM catalog entry</a>.
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
              <h4 className="font-display font-bold text-ocean-950 text-sm">
                Singapore MPA bunkering standards
              </h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                MPA currently lists SS 600:2022 for tank gauging in specified bunkering circumstances and SS 648:2024 for mass-flow metering. These describe different measurement approaches and do not establish that Space BQS is MPA-approved or replaces either method. <a href="https://www.mpa.gov.sg/port-marine-ops/marine-services/bunkering/bunkering-standards" target="_blank" rel="noreferrer" className="underline">Read MPA&apos;s current standards page</a>.
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
              <h4 className="font-display font-bold text-ocean-950 text-sm">
                Product boundary
              </h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Space BQS provides software for survey teams. Contractual rights, letters of protest, survey attendance, legal admissibility, and dispute outcomes are determined outside the software and depend on the relevant parties, evidence, and terms.
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
              <h4 className="font-display font-bold text-ocean-950 text-sm">
                Production implementation details
              </h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Public product information reviewed for this page does not establish the exact interpolation algorithm, table adjunct, or out-of-range behavior for each release. Request the current implementation details from the product team before relying on them.
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
