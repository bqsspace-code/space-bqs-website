import type { Metadata } from "next";
import Link from "next/link";
import { Section, CtaRow, Breadcrumbs } from "../components/ui";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/who-its-for", {
  title: "Bunker Survey Software for Survey Teams",
  description:
    "Space BQS is designed for independent bunker survey firms, marine inspection agencies, surveyors, and supervisors reviewing survey records.",
});

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/who-its-for", label: "Who It's For" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Who it&apos;s for — survey firms and their teams</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">Space BQS is bought by survey firms. Used by surveyors and supervisors. Trusted by their clients.</p>
      </div>
      <Section eyebrow="Personas" title="Pick yourself">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "Surveyor on your team", d: "Scans vessel QR. Three steps: Ship, Fuel, Tanks. Big buttons, works offline, autosaves. Submits when done.", cta: "See mobile app", href: "/mobile-app" },
            { t: "Supervisor in your office", d: "Reviews breakdown, recalculates, completes, exports PDF + Excel. Dashboard shows fleet, trends, attention list.", cta: "See platform", href: "/platform" },
            { t: "Your client (owner / charterer)", d: "Receives the issued PDF + Excel report from your team. Searchable later by your team.", cta: "See sample report", href: "/sample-report" },
          ].map((p) => (
            <article key={p.t} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-ocean-300 hover:shadow-md">
              <h3 className="font-display font-bold text-ocean-950">{p.t}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{p.d}</p>
              <Link href={p.href} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ocean-700 underline decoration-ocean-300 underline-offset-4 hover:text-ocean-900 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean-700">
                {p.cta} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
