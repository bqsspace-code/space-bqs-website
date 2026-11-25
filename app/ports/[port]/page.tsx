import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs, AnswerBlock, Section, Faq, CtaRow } from "@/app/components/ui";
import { BUNKER_PORTS, ALL_PORTS } from "@/app/lib/ports";
import { SITE_URL } from "@/app/lib/site";
import {
  Anchor,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  ArrowRight,
  Droplet,
  Thermometer,
  Layers
} from "lucide-react";

export function generateStaticParams() {
  return ALL_PORTS.map((p) => ({ port: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ port: string }>;
}): Promise<Metadata> {
  const { port } = await params;
  const p = BUNKER_PORTS[port];
  if (!p) return {};

  return {
    title: `${p.name} Bunker Quantity Survey (BQS) Software & Standards`,
    description: `Bunker quantity survey software, local maritime standards (${p.primaryStandards.slice(0, 2).join(", ")}), and offline sounding workflows for ${p.name}, ${p.country}.`,
    openGraph: {
      title: `${p.name} Bunker Quantity Survey Software & Standards | Space BQS`,
      description: `Bunker quantity survey software, local maritime standards, and offline sounding workflows for ${p.name}, ${p.country}.`,
      type: "website",
    },
  };
}

export default async function PortHubPage({
  params,
}: {
  params: Promise<{ port: string }>;
}) {
  const { port } = await params;
  const p = BUNKER_PORTS[port];
  if (!p) notFound();

  // Structured Data Schema for Local Hub & FAQs
  const schemaGraph: any[] = [
    {
      "@type": "Place",
      "@id": `${SITE_URL}/ports/${p.slug}#place`,
      "name": p.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": p.city,
        "addressCountry": p.country,
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": p.coordinates.lat,
        "longitude": p.coordinates.lng,
      },
      "description": p.summary,
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/ports/${p.slug}#service`,
      "name": `Bunker Quantity Surveying Software for ${p.name}`,
      "provider": {
        "@type": "Organization",
        "name": "Space BQS",
        "url": SITE_URL,
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": p.name,
      },
      "serviceType": "Maritime Bunker Quantity Survey Software",
      "description": p.surveyOverview,
    },
  ];

  if (p.faqs && p.faqs.length > 0) {
    schemaGraph.push({
      "@type": "FAQPage",
      "@id": `${SITE_URL}/ports/${p.slug}#faq`,
      "mainEntity": p.faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a,
        },
      })),
    });
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": schemaGraph,
  };

  const otherPorts = ALL_PORTS.filter((item) => item.slug !== p.slug);

  return (
    <div className="space-y-12 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Header */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/ports", label: "Ports" },
            { href: `/ports/${p.slug}`, label: p.name },
          ]}
        />
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            <MapPin className="h-3 w-3" />
            {p.city}, {p.country}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {p.rank}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {p.region}
          </span>
        </div>

        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl lg:text-5xl">
          {p.headline}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          {p.summary}
        </p>
      </div>

      {/* Direct Citation Answer Block */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnswerBlock>
          <p>
            <strong>Surveying Bunkers in {p.name}:</strong> Operations require adherence to {p.regulatoryBody} directives and {p.primaryStandards.join(", ")}. Space BQS supports local survey teams with 72-hour zero-connectivity offline sounding, automated ASTM Table 54B metric tonne calculations, and immediate discrepancy reconciliation between barge meters and vessel strapping tables.
          </p>
        </AnswerBlock>
      </div>

      {/* Key Port Operational Matrix */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="font-display text-xl font-bold text-ocean-950 mb-6">
            Port Operational & Regulatory Profile
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1 border-l-2 border-ocean-600 pl-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Annual Bunker Volume</span>
              <p className="text-base font-bold text-ocean-950">{p.annualBunkerVolume}</p>
            </div>
            <div className="space-y-1 border-l-2 border-ocean-600 pl-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Regulatory Authority</span>
              <p className="text-sm font-bold text-ocean-950">{p.regulatoryBody}</p>
            </div>
            <div className="space-y-1 border-l-2 border-ocean-600 pl-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Primary Standards</span>
              <p className="text-xs font-semibold text-slate-700 leading-snug">{p.primaryStandards.join(" • ")}</p>
            </div>
            <div className="space-y-1 border-l-2 border-ocean-600 pl-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Common Fuel Grades</span>
              <p className="text-xs font-semibold text-slate-700 leading-snug">{p.keyFuelGrades.join(" • ")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Local Survey Operational Overview */}
      <Section eyebrow="Survey Environment" title={`Bunker Survey Procedures in ${p.name}`}>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-600 mb-6">
          {p.surveyOverview}
        </p>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="font-bold text-ocean-950 text-sm mb-4">
            Standard Operating Sequence for {p.name} BQS Attendance:
          </h3>
          <ol className="space-y-3">
            {p.localProcedures.map((proc, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs text-slate-700 leading-relaxed">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-[10px] font-bold text-white">
                  {idx + 1}
                </span>
                <span>{proc}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Port Survey Challenges & Space BQS Solutions */}
      <Section eyebrow="Field Risk Mitigation" title={`Operational Challenges in ${p.name} & How Space BQS Protects Your Team`}>
        <div className="grid gap-6 md:grid-cols-3">
          {p.challenges.map((ch, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-600 mb-3">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Local Challenge</span>
                </div>
                <h3 className="font-display font-bold text-ocean-950 text-base">
                  {ch.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {ch.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-ocean-700">
                <ShieldCheck className="h-4 w-4 text-ocean-600 shrink-0" />
                <span>Protected by Space BQS Engine</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Software Advantages */}
      <Section eyebrow="Capabilities" title={`Why Marine Surveyors in ${p.name} Choose Space BQS`}>
        <div className="grid gap-4 sm:grid-cols-2">
          {p.softwareAdvantage.map((adv, idx) => (
            <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <CheckCircle2 className="h-5 w-5 text-sea-600 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {adv}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      {p.faqs && p.faqs.length > 0 && (
        <Section eyebrow="Frequently Asked Questions" title={`BQS Questions for ${p.name}`}>
          <Faq items={p.faqs} />
        </Section>
      )}

      {/* Explore Other Bunkering Hubs */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold text-ocean-950 mb-2">
            Explore Other Global Bunkering Hubs
          </h2>
          <p className="text-xs text-slate-600 mb-6">
            Compare survey workflows, regulatory standards, and measurement challenges across other primary bunkering ports:
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {otherPorts.map((other) => (
              <Link
                key={other.slug}
                href={`/ports/${other.slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-ocean-600 hover:shadow-xs"
              >
                <span className="text-xs text-slate-500 font-mono block">{other.country}</span>
                <span className="font-bold text-ocean-950 text-sm group-hover:text-ocean-700 block mt-1">
                  {other.name}
                </span>
                <span className="text-[11px] text-ocean-700 font-medium inline-flex items-center gap-1 mt-2">
                  View Guide <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <CtaRow />
      </div>
    </div>
  );
}
