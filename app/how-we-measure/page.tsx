import type { Metadata } from "next";
import { Section, AnswerBlock, CtaRow, Breadcrumbs } from "../components/ui";
import { ENGINE_VERSION } from "../lib/site";
import EnginePipelineGraphic from "../components/EnginePipelineGraphic";
import LiveCalculator from "../components/LiveCalculator";
import { ShieldCheck, Ruler, Droplets, Thermometer, Scale, AlertOctagon } from "lucide-react";

export const metadata: Metadata = {
  title: "How the Engine Calculates — From Tank Reading to Tonnes",
  description:
    "Plain-English methodology for survey teams: tank reading, minus water, temperature correction with ASTM D1250 Table 54B, to mass in MT. Engine v1.0.0, no guessing.",
};

export default function Page() {
  return (
    <div className="space-y-12 pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/how-we-measure", label: "How It Calculates" },
          ]}
        />
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-sea-100 px-3 py-1 text-xs font-semibold text-sea-800">
            Engine v{ENGINE_VERSION} Implementation Spec
          </span>
          <span className="text-xs text-slate-500 font-mono">ASTM D1250-04 Standard</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl">
          How the engine calculates — in plain words
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Follow the inputs, correction factor, and mass conversion. Engine v{ENGINE_VERSION}.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <AnswerBlock>
          <p>
            The Space BQS calculation core converts physical tape measurements (ullage or sounding) into certified metric tonnes through four deterministic steps: (1) 1D linear strapping table lookup without extrapolation, (2) exact free water volume deduction, (3) ASTM D1250 Table 54B volume correction factor (VCF) lookup based on temperature and density, and (4) density-based mass conversion in air or vacuum.
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
      <Section eyebrow="Mathematical Proof" title="Every number shows its origin">
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

        <div className="mt-8">
          <CtaRow />
        </div>
      </Section>
    </div>
  );
}
