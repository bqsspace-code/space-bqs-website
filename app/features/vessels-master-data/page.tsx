import type { Metadata } from "next";
import { Section, CtaRow, Breadcrumbs } from "../../components/ui";

export const metadata: Metadata = {
  title: "Vessels & Master Data — Tank Maps and Correction Tables",
  description:
    "Space BQS vessels and reference data: vessel register with IMO and DWT, tank strapping maps with revisions, ASTM Table 54B VCF grids. Why tables build trust.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/features", label: "Features" }, { href: "/features/vessels-master-data", label: "Vessels & Master Data" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Vessels &amp; master data</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">Correct results need correct tables. Both are versioned here.</p>
      </div>
      <Section eyebrow="Vessels" title="One register per fleet">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Vessel ID, name, 7-digit IMO, call sign, type, flag, DWT/GT, year built, owner, class.</li>
          <li>Add one vessel or import many. Scope surveys by vessel.</li>
          <li>QR codes hold vessel + optional port only — no measurements inside.</li>
        </ul>
      </Section>
      <Section eyebrow="Reference" title="Tank maps + correction grids">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Tank calibration (strapping) tables per tank with mode, revision and effective date; curve shown as SVG.</li>
          <li>VCF tables per grade with methodology, revision and approved flag; seed data is illustrative until approved.</li>
          <li>Reference is injected into the engine — a table revision swaps without touching calculation code.</li>
        </ul>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
