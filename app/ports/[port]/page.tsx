import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, Chapter, Tiles, Tile, Checklist, Notice } from "@/app/components/Editorial";
import { BUNKER_PORTS, ALL_PORTS } from "@/app/lib/ports";
import { SITE_URL } from "@/app/lib/site";
import { routeMetadata } from "@/app/lib/seo-metadata";

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
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHero
        href={`/ports/${p.slug}`}
        crumb={p.name}
        parent={{ href: "/ports", label: "Ports" }}
        eyebrow={`${p.city}, ${p.country} \u00b7 ${p.region}`}
        title={`Bunker survey guide: ${p.name}`}
        description="General reference for teams researching bunker quantity survey work in this port area. Port requirements, standards editions and available services can change; confirm them with the relevant authorities and your survey stakeholders."
        primaryAction={{ href: "/request-demo", label: "Discuss product scope" }}
        secondaryAction={{ href: "/how-we-measure", label: "How we measure" }}
      />

      <Chapter index="01" eyebrow="In short" title={`Planning a survey in ${p.name}.`}>
        <Notice label="Planning">Confirm the current port authority instructions, applicable measurement standards and editions, the agreed survey scope, and how the parties will retain and review records. Space BQS provides software for mobile capture and web review and report workflows; it does not provide survey attendance or determine regulatory compliance.</Notice>
      </Chapter>

      <Chapter index="02" eyebrow="Before a survey" title="Verify the requirements for this operation." tone="white">
        <Tiles cols={3}>
          <Tile art="shield" tag="Authority" title="Confirm local instructions">Check the current port authority and applicable national requirements directly. This guide is not an official port notice or compliance determination.</Tile>
          <Tile art="gauge" tag="Scope" title="Agree the measurement scope">Confirm the method, inputs, responsible parties, record format and applicable contractual procedure before work begins.</Tile>
          <Tile art="doc" tag="Software" title="Check product fit" href="/how-we-measure" cta="Read the method">Review the current product scope and calculation method with the team. The software does not provide attendance, legal advice or a compliance approval.</Tile>
        </Tiles>
      </Chapter>

      <Chapter index="03" eyebrow="Checklist" title="Questions to settle before you attend." tone="mist">
        <Checklist items={[
          `Which authority instructions currently apply in ${p.name}?`,
          "Which measurement standard and edition governs this operation?",
          "Who attends, who measures, and who reviews the record?",
          "How will records be retained and shared afterwards?",
        ]} />
      </Chapter>

      <Chapter index="04" eyebrow="More guides" title="Other port guides." tone="white" lede="Verify current requirements independently with the relevant authorities and survey stakeholders.">
        <Tiles cols={3}>
          {otherPorts.map((other) => (
            <Tile key={other.slug} art="tank" tag={other.country} title={other.name} href={`/ports/${other.slug}`} cta="View guide">
              {other.city}
            </Tile>
          ))}
        </Tiles>
      </Chapter>

    </div>
  );
}
