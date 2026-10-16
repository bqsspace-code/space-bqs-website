import type { Metadata } from "next";
import { Section, CtaRow, Breadcrumbs } from "../components/ui";

export const metadata: Metadata = {
  title: "Who It's For — Owners, Charterers, Operators, Survey Firms",
  description:
    "Space BQS for owners, charterers, operators and survey firms: surveyor on deck, supervisor in office, client receiving locked proof. No login needed for clients.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/who-its-for", label: "Who It's For" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Who it&apos;s for — survey firms and their teams</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">Space BQS is bought by survey firms. Used by surveyors and supervisors. Trusted by their clients.</p>
      </div>
      <Section eyebrow="Personas" title="Pick yourself">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "Surveyor on your team", d: "Scans vessel QR. Three steps: Ship, Fuel, Tanks. Big buttons, works offline, autosaves. Submits when done.", cta: "See mobile app" },
            { t: "Supervisor in your office", d: "Reviews breakdown, recalculates, completes, exports PDF + Excel. Dashboard shows fleet, trends, attention list.", cta: "See platform" },
            { t: "Your client (owner / charterer)", d: "No login needed. Receives your locked PDF + Excel to forward to anyone. Searchable later by your team.", cta: "See sample report" },
          ].map((p) => (
            <div key={p.t} className="rounded-xl border border-slate-200 p-5">
              <p className="font-display font-bold">{p.t}</p>
              <p className="mt-2 text-sm text-slate-600">{p.d}</p>
              <p className="mt-3 text-sm font-semibold text-ocean-700">{p.cta} →</p>
            </div>
          ))}
        </div>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
