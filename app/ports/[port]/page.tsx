import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs, AnswerBlock, Section, CtaRow } from "@/app/components/ui";
import { BUNKER_PORTS, ALL_PORTS } from "@/app/lib/ports";
import { SITE_URL } from "@/app/lib/site";
import { routeMetadata } from "@/app/lib/seo-metadata";
import { ArrowRight, MapPin } from "lucide-react";

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

  return routeMetadata(`/ports/${p.slug}`, {
    title: `${p.name} Bunker Survey Guide`,
    description: `General location guide for bunker quantity survey teams researching ${p.name}, ${p.country}. Verify current local requirements with the relevant authorities.`,
  });
}

export default async function PortHubPage({
  params,
}: {
  params: Promise<{ port: string }>;
}) {
  const { port } = await params;
  const p = BUNKER_PORTS[port];
  if (!p) notFound();

  // This Place represents the port, not a Space BQS office or local branch.
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
    },
  ];

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
          <span className="text-xs text-slate-500 font-mono">
            {p.region}
          </span>
        </div>

        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl lg:text-5xl">Bunker survey guide: {p.name}</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          General reference for teams researching bunker quantity survey work in this port area. Port requirements, standards editions, and available services can change; confirm them with the relevant authorities and your survey stakeholders.
        </p>
      </div>

      {/* Direct Citation Answer Block */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnswerBlock>
          <p>
            <strong>Planning a bunker survey in {p.name}:</strong> confirm the current port authority instructions, applicable measurement standards and editions, the agreed survey scope, and how the parties will retain and review records. Space BQS provides software for mobile capture and web review/report workflows; it does not provide survey attendance or determine regulatory compliance.
          </p>
        </AnswerBlock>
      </div>

      <Section eyebrow="Before a survey" title="Verify the requirements for this operation">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-bold text-ocean-950">Confirm local instructions</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">Check the current port authority and applicable national requirements directly. This guide is not an official port notice or compliance determination.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-bold text-ocean-950">Agree the measurement scope</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">Confirm the measurement method, inputs, responsible parties, record format, and applicable contractual procedure before work begins.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-bold text-ocean-950">Check product fit</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">Review the current product scope and calculation method with the Space BQS team. The software does not provide attendance, legal advice, or a compliance approval.</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/how-we-measure" className="inline-flex items-center gap-2 text-sm font-semibold text-ocean-700 underline">Read the calculation methodology <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/request-demo" className="inline-flex items-center gap-2 text-sm font-semibold text-ocean-700 underline">Discuss product scope <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </Section>

      {/* Explore other port location guides */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold text-ocean-950 mb-2">
            Explore Other Port Guides
          </h2>
          <p className="text-xs text-slate-600 mb-6">
            Browse the other location guides. Verify current requirements independently with the relevant authorities and survey stakeholders.
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
