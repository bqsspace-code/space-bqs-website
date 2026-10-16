import type { Metadata } from "next";
import { Section, AnswerBlock, CtaRow, Breadcrumbs } from "../components/ui";
import { ENGINE_VERSION } from "../lib/site";

export const metadata: Metadata = {
  title: "How the Engine Calculates — From Tank Reading to Tonnes",
  description:
    "Plain-English methodology for survey teams: tank reading, minus water, temperature correction with ASTM D1250 Table 54B, to mass in MT. Engine v1.0.0, no guessing.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/how-we-measure", label: "How It Calculates" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">How the engine calculates — in plain words</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">Four steps. Same every time. Engine v{ENGINE_VERSION}.</p>
      </div>
      <Section eyebrow="Method" title="Measure → Subtract → Adjust → Convert">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { t: "1. Measure", d: "The surveyor reads ullage or sounding in metres. The system looks up volume in that tank's calibration (strapping) table." },
            { t: "2. Subtract water", d: "Free water in m³ is deducted. Clients do not pay fuel price for water." },
            { t: "3. Adjust for heat", d: "VCF from ASTM D1250 Table 54B is applied using grade, density and temperature." },
            { t: "4. Convert", d: "Corrected volume × density = mass. Divide by 1000 = MT." },
          ].map((s) => (
            <div key={s.t} className="rounded-xl bg-slate-50 p-5">
              <p className="font-bold">{s.t}</p>
              <p className="mt-2 text-sm text-slate-600">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <AnswerBlock>
            <p>Grades: VLSFO, HFO, MGO, LSMGO, ULSFO. Mass basis: in air or vacuum. Precision: volume 3 decimals, VCF 4, mass 2, MT 3. Readings outside the table are flagged Out of Range — never extrapolated or guessed.</p>
          </AnswerBlock>
        </div>
      </Section>
      <Section eyebrow="Proof" title="Every number shows its source">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Tank table ID + revision, VCF table ID + revision + method.</li>
          <li>Interpolated flags when between table points.</li>
          <li>Warnings: water over 2%, extreme temperature, VCF outlier.</li>
          <li>Worked check: density 0.9500 at 40°C → VCF 0.9677 → 457.819 MT example.</li>
        </ul>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
