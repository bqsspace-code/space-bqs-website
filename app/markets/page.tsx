import type { Metadata } from "next";
import { PageHero, HeroFacts, Chapter, Tiles, Tile } from "../components/Editorial";
import { routeMetadata } from "../lib/seo-metadata";
import { MARKETS } from "./market-data";

export const metadata: Metadata = routeMetadata("/markets", {
  title: "Space BQS for Marine Survey Teams by Market",
  description: "Explore country-specific information for marine survey teams evaluating Space BQS bunker quantity survey software.",
});

const PUBLISHED_MARKETS = MARKETS.filter((market) => market.publishable !== false);

export default function MarketsPage() {
  return (
    <div>
      <PageHero
        href="/markets"
        crumb="Markets"
        eyebrow="Marine survey software"
        title="Marine survey teams, around the world."
        description="These guides use official local port and regulatory sources where reviewed. They describe software workflows, not local survey services, port approvals, or legal compliance."
        visual={<HeroFacts title="Published market guides" rows={[
          { label: "Countries", value: String(PUBLISHED_MARKETS.length) },
          { label: "Sources", value: "Official, where reviewed" },
          { label: "Scope", value: "Software workflows" },
        ]} />}
      />
      <Chapter index="01" eyebrow="Country information" title="Choose a market." lede="Local procedures and contract terms change. Check the linked authority sources and confirm applicability with your own technical and legal advisers.">
        <Tiles>
          {PUBLISHED_MARKETS.map((market) => (
            <Tile key={market.slug} tag="Market notes" title={market.country} href={`/markets/${market.slug}`} cta="Read market notes">
              {market.description}
            </Tile>
          ))}
        </Tiles>
      </Chapter>
    </div>
  );
}
