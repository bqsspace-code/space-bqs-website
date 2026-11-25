import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, Section, CtaRow } from "../components/ui";
import { ALL_PORTS } from "../lib/ports";
import { Anchor, ShieldCheck, MapPin, Gauge, FileCheck2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Global Bunker Surveying Ports & Hub Guides | Space BQS",
  description:
    "Port-specific bunker quantity survey guides, local regulations, Mass Flow Meter mandates, and sounding procedures for Singapore, Rotterdam, Fujairah, Houston, Piraeus, and Shanghai.",
  openGraph: {
    title: "Global Bunker Surveying Ports & Hub Guides | Space BQS",
    description:
      "Port-specific bunker quantity survey guides, local regulations, Mass Flow Meter mandates, and sounding procedures for the world's top bunkering hubs.",
  },
};

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
            Global Maritime Hubs
          </span>
          <span className="text-xs text-slate-500 font-mono">Port-Specific Survey Protocols</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl lg:text-5xl">
          Bunker Quantity Surveying Across Major Global Ports
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          From Singapore’s mandatory Coriolis MFM cross-checks to Fujairah’s deep-water swell anchorages and Rotterdam’s SECA bio-blend density corrections, discover how Space BQS adapts to local maritime regulations, measurement standards, and dispute risks.
        </p>

        {/* Global Stats Overview */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <span className="text-2xl font-bold text-ocean-900">6 Key Hubs</span>
            <p className="text-xs text-slate-500 mt-1">Covering primary global bunker volume</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <span className="text-2xl font-bold text-ocean-900">100M+ MT</span>
            <p className="text-xs text-slate-500 mt-1">Annual marine fuel volume tracked</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <span className="text-2xl font-bold text-ocean-900">72-Hour</span>
            <p className="text-xs text-slate-500 mt-1">Offline lease in exposed anchorages</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <span className="text-2xl font-bold text-ocean-900">Zero Drift</span>
            <p className="text-xs text-slate-500 mt-1">ASTM Table 54B & API Table 6B engine</p>
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
                  <span className="text-xs font-semibold text-ocean-700 font-mono">
                    {port.rank}
                  </span>
                </div>

                <h2 className="font-display mt-4 text-xl font-bold text-ocean-950">
                  <Link href={`/ports/${port.slug}`} className="hover:text-ocean-700">
                    {port.name}
                  </Link>
                </h2>

                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Vol:</span> {port.annualBunkerVolume}
                </div>

                <p className="mt-3 text-sm text-slate-600 line-clamp-3">
                  {port.summary}
                </p>

                {/* Key Standards Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {port.primaryStandards.slice(0, 2).map((std) => (
                    <span
                      key={std}
                      className="rounded-md bg-slate-50 border border-slate-200 px-2 py-0.5 text-[11px] text-slate-600"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {port.challenges.length} Local Survey Challenges
                </span>
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

      {/* Port Operational Standards Comparison */}
      <Section eyebrow="Standardization" title="Why Port-Specific BQS Workflows Matter">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <Gauge className="h-6 w-6 text-ocean-600 mb-2" />
            <h3 className="font-bold text-ocean-950 text-base">Mass Flow Meter Verification</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              In ports mandating Coriolis meters (Singapore, Rotterdam ARA), Space BQS reconciles electronic totalizer readings against manual tank strapping tables to resolve piping hold-up and line packing disputes.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <Anchor className="h-6 w-6 text-ocean-600 mb-2" />
            <h3 className="font-bold text-ocean-950 text-base">Offshore Swell & Trim Validation</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              In open roadsteads (Fujairah, Galveston, Zhoushan), vessel motion creates liquid sloshing. Space BQS enforces dual-dip sounding checks and trim boundary interpolation without speculative extrapolation.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <FileCheck2 className="h-6 w-6 text-ocean-600 mb-2" />
            <h3 className="font-bold text-ocean-950 text-base">Regional Commercial Documentation</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Whether meeting USCG 33 CFR conference guidelines in Houston or Greek Customs procedures in Piraeus, Space BQS exports tamper-evident PDF certificates and 4-sheet transparent Excel packages.
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
