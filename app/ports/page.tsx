import Link from "next/link";
import { Breadcrumbs, Section, CtaRow } from "../components/ui";
import { ALL_PORTS } from "../lib/ports";
import { MapPin, ArrowRight, ShieldCheck, FileCheck2 } from "lucide-react";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata = routeMetadata("/ports", {
  title: "Bunker Survey Port Guides",
  description:
    "Browse bunker survey port guides with local terminology, operating context, standards references, and questions to verify with authorities.",
});

export default function PortsPage() {
  return (
    <div className="space-y-12 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/ports", label: "Ports" },
          ]}
        />
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            Bunker Survey Reference
          </span>
          <span className="text-xs text-slate-500 font-mono">Independent location guides</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl lg:text-5xl">
          Bunker Survey Guides by Port
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          Explore port-specific reference guides covering local terminology, standards references, operating context, and survey workflows. Use the linked authority sources and confirm current requirements with the relevant port and survey stakeholders.
        </p>

        {/* Guide scope, not market-volume or product-performance claims */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <span className="text-2xl font-bold text-ocean-900">{ALL_PORTS.length} Guides</span>
            <p className="text-xs text-slate-500 mt-1">Port-specific reference pages</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <span className="text-2xl font-bold text-ocean-900">Local Context</span>
            <p className="text-xs text-slate-500 mt-1">Terminology and operating notes</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <span className="text-2xl font-bold text-ocean-900">Standards</span>
            <p className="text-xs text-slate-500 mt-1">References to verify with authorities</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <span className="text-2xl font-bold text-ocean-900">Workflows</span>
            <p className="text-xs text-slate-500 mt-1">Survey process and review topics</p>
          </div>
        </div>
      </div>

      {/* Port Cards Grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ALL_PORTS.map((port) => (
            <div
              key={port.slug}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-ocean-600 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    <MapPin className="h-3 w-3 text-ocean-600" />
                    {port.country}
                  </span>
                  <span className="text-xs font-semibold text-ocean-700 font-mono">Port guide</span>
                </div>

                <h2 className="font-display mt-4 text-xl font-bold text-ocean-950">
                  <Link href={`/ports/${port.slug}`} className="hover:text-ocean-700">
                    {port.name}
                  </Link>
                </h2>

                <p className="mt-3 text-sm text-slate-600 line-clamp-3">
                  General reference for teams researching bunker quantity survey work in {port.city}, {port.country}. Verify current local requirements with the relevant authorities.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Location guide</span>
                <Link
                  href={`/ports/${port.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-ocean-700 hover:text-ocean-900"
                >
                  View Guide <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* General planning guidance, not port-specific regulatory assertions */}
      <Section eyebrow="Planning reference" title="What to verify before a survey">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <ShieldCheck className="h-6 w-6 text-ocean-600 mb-2" />
            <h3 className="font-bold text-ocean-950 text-base">Current requirements</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Check the relevant port authority's current instructions and confirm which measurement standards and editions apply to the operation.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <MapPin className="h-6 w-6 text-ocean-600 mb-2" />
            <h3 className="font-bold text-ocean-950 text-base">Agreed survey scope</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Agree the measurement method, inputs, responsible parties, and records to be retained before the survey begins.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <FileCheck2 className="h-6 w-6 text-ocean-600 mb-2" />
            <h3 className="font-bold text-ocean-950 text-base">Product fit</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Review the published <Link href="/how-we-measure" className="font-semibold text-ocean-700 underline">calculation methodology</Link> and confirm current product scope with the Space BQS team.
            </p>
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <CtaRow />
      </div>
    </div>
  );
}
