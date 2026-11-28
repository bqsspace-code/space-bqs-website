import { PageHero, HeroFacts, Chapter, Tiles, Tile, Checklist, Notice } from "../components/Editorial";
import { InlineLink } from "../components/EditorialExtras";
import { ALL_PORTS } from "../lib/ports";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata = routeMetadata("/ports", {
  title: "Bunker Survey Port Guides",
  description:
    "Browse bunker survey port guides with local terminology, operating context, standards references, and questions to verify with authorities.",
});

export default function PortsPage() {
  const byCountry = new Map<string, typeof ALL_PORTS>();
  for (const port of ALL_PORTS) byCountry.set(port.country, [...(byCountry.get(port.country) ?? []), port]);
  const countries = [...byCountry.entries()].sort(([a], [b]) => a.localeCompare(b));

  return (
    <div>
      <PageHero
        href="/ports"
        crumb="Ports"
        eyebrow="Bunker survey reference"
        title="Bunker survey guides by port."
        description="Port-specific reference guides covering local terminology, standards references, operating context and survey workflows. Confirm current requirements with the relevant port and survey stakeholders."
        primaryAction={{ href: "#port-guides", label: "Browse the guides" }}
        secondaryAction={{ href: "/markets", label: "Market guides" }}
        visual={<HeroFacts title="The guides" rows={[
          { label: "Ports", value: String(ALL_PORTS.length) },
          { label: "Countries", value: String(countries.length) },
          { label: "Each covers", value: "Terms, context, standards" },
        ]} />}
      />

      <Chapter id="port-guides" index="01" eyebrow="Port guides" title="Choose a port." lede="General reference for teams researching bunker quantity survey work. Guides describe context, not local regulatory approval.">
        <div className="space-y-12">
          {countries.map(([country, ports]) => (
            <div key={country}>
              <h3 className="mb-4 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[.2em] text-[#176a8e]"><span aria-hidden="true" className="h-px w-8 bg-[#19b5c9]" />{country}</h3>
              <Tiles cols={2}>
                {ports.map((port) => (
                  <Tile key={port.slug} art="tank" tag={`${port.city}, ${port.country}`} title={port.name} href={`/ports/${port.slug}`} cta="View guide">
                    General reference for teams researching bunker quantity survey work in {port.city}. Verify current local requirements with the relevant authorities.
                  </Tile>
                ))}
              </Tiles>
            </div>
          ))}
        </div>
      </Chapter>

      <Chapter index="02" eyebrow="Planning reference" title="What to verify before a survey." tone="white" lede="General planning guidance, not port-specific regulatory assertions.">
        <div className="space-y-5">
          <Checklist items={[
            "The port authority's current instructions, and which measurement standards and editions apply",
            "The agreed survey scope: method, inputs, responsible parties and records to be retained",
            "Product fit: review the published calculation method and confirm current scope with the Space BQS team",
          ]} />
          <Notice label="Read with care">These guides are not official port notices or compliance determinations. Read the <InlineLink href="/how-we-measure">calculation methodology</InlineLink> to see what the software does and does not cover.</Notice>
        </div>
      </Chapter>

    </div>
  );
}
