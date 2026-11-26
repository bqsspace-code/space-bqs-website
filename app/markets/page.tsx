import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, Section } from "../components/ui";
import { routeMetadata } from "../lib/seo-metadata";
import { MARKETS } from "./market-data";

export const metadata: Metadata = routeMetadata("/markets", {
  title: "Space BQS for Marine Survey Teams by Market",
  description: "Explore country-specific information for marine survey teams evaluating Space BQS bunker quantity survey software.",
});

const PUBLISHED_MARKETS = MARKETS.filter((market) => market.publishable !== false);

export default function MarketsPage() {
  return (
    <div className="bg-[#f7fbfd] pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-28 sm:px-6 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/markets", label: "Markets" }]} />
        <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-[#176a8e]">Marine survey software</p>
        <h1 className="font-display mt-3 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-[#031038] sm:text-5xl">Space BQS for marine survey teams around the world</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-[#52657c] sm:text-lg">These guides use official local port and regulatory sources where reviewed. They describe software workflows, not local survey services, port approvals, or legal compliance.</p>
      </div>
      <Section title="Country information">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PUBLISHED_MARKETS.map((market) => (
            <Link key={market.slug} href={`/markets/${market.slug}`} className="rounded-2xl border border-[#d3e9f3] bg-white/80 p-6 transition-colors hover:border-[#7fbecb] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#032aac]">
              <h2 className="font-display text-lg font-semibold text-[#031038]">{market.country}</h2>
              <p className="mt-2 text-sm leading-6 text-[#52657c]">{market.description}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-[#032aac]">Read market notes →</span>
            </Link>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-xs leading-6 text-[#60748a]">Local procedures and contract terms change. Check the linked authority sources and confirm applicability with your own technical and legal advisers.</p>
      </Section>
    </div>
  );
}
