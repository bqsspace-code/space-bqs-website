import type { Metadata } from "next";
import { Section, AnswerBlock, CtaRow, Breadcrumbs } from "../../components/ui";

export const metadata: Metadata = {
  title: "Calculation & Audit — From Reading to Tonnes With Proof",
  description:
    "Space BQS: ullage to volume via strapping, minus water, VCF correction, to mass in MT. Per-line audit, no guessing.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/features", label: "Features" }, { href: "/features/calculation-audit", label: "Calculation & Audit" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Calculation &amp; audit</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">Same engine on web and mobile. Every line shows its source.</p>
      </div>
      <Section eyebrow="Pipeline" title="Five steps, deterministic">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Ullage or sounding → observed volume from that tank&apos;s strapping table (linear interpolation, exact hits flagged).</li>
          <li>Observed minus free water = net volume. Negative or over-observed inputs are rejected per line.</li>
          <li>Grade + density + temperature → VCF from Table 54B grid (bilinear). Out-of-range throws instead of extrapolating.</li>
          <li>Net × VCF = corrected volume. Corrected × density = mass; ÷1000 = MT.</li>
          <li>Totals accumulate at full precision, then round: volume 3, VCF 4, mass 2, MT 3.</li>
        </ul>
        <div className="mt-6"><AnswerBlock><p>A failing tank line never kills the survey: it returns its error so the rest still computes. Finalise requires a calculation plus all lines ok. Worked check: 0.9500 at 40°C → VCF 0.9677 → 457.819 MT example.</p></AnswerBlock></div>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
