import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero, Chapter, Steps, Tiles, Tile, Notice } from "../../components/Editorial";
import { FaqList, InlineLink } from "../../components/EditorialExtras";
import { routeMetadata } from "../../lib/seo-metadata";
import { MARKETS } from "../market-data";
import MarketCtaTracker from "../../components/MarketCtaTracker";

export const dynamicParams = false;

const PUBLISHED_MARKETS = MARKETS.filter((market) => market.publishable !== false);

export function generateStaticParams() {
  return PUBLISHED_MARKETS.map((market) => ({ country: market.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const market = PUBLISHED_MARKETS.find((item) => item.slug === country);
  if (!market) return {};
  return routeMetadata(`/markets/${market.slug}`, {
    title: market.title,
    description: market.description,
  });
}

export default async function MarketPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const market = PUBLISHED_MARKETS.find((item) => item.slug === country);
  if (!market) notFound();

  return (
    <MarketCtaTracker market={market.slug}><div lang="en">
      <PageHero
        href={`/markets/${market.slug}`}
        crumb={market.country}
        parent={{ href: "/markets", label: "Markets" }}
        eyebrow={`Space BQS · ${market.country}`}
        title={market.title}
        description={market.description}
        primaryAction={{ href: `/request-demo?country=${encodeURIComponent(market.country)}`, label: `Request a demo for ${market.country}` }}
        secondaryAction={{ href: "/sample-report", label: "View sample report" }}
      />
      <div className="bg-[#f7fbfd] px-5 pt-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl"><Link href={`/request-demo?country=${encodeURIComponent(market.country)}&intent=pilot#pilot`} className="text-sm font-semibold text-[#032aac] underline underline-offset-4">Ask about a pilot for your {market.country} team</Link></div>
      </div>

      <Chapter index="01" eyebrow="Local terminology" title={`How bunkering is described in ${market.country}.`}>
        <div className="space-y-5">
          <Notice label="Terminology">{market.terminology}</Notice>
          <p className="max-w-2xl text-[15px] leading-7 text-[#52657c]">Space BQS is software for bunker quantity survey teams. Local survey firms perform attendance and measurements; the software supports their mobile capture, web review and report workflow.</p>
        </div>
      </Chapter>

      <Chapter index="02" eyebrow="Port context" title={`Ports and operating context in ${market.country}.`} tone="white">
        <div className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            {market.context.map((paragraph) => <p key={paragraph} className="text-[15px] leading-7 text-[#405a75]">{paragraph}</p>)}
          </div>
          <div className="glass-card rounded-[1.4rem] p-6">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-[#176a8e]">Ports referenced in these notes</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {market.ports.map((port) => <li key={port} className="rounded-full border border-[#b9d3e8] bg-white/70 px-3 py-1 text-sm text-[#31485f]">{port}</li>)}
            </ul>
          </div>
        </div>
      </Chapter>

      <Chapter index="03" eyebrow="Survey workflow" title="How survey teams can evaluate the software." tone="mist">
        <div className="space-y-6">
          <Steps items={market.workflow.map((step, i) => ({ meta: `Step ${i + 1}`, title: step.split(/[.:]/)[0].slice(0, 70), body: step }))} />
          <InlineLink href="/solutions/space-bqs">Explore Space BQS features and workflow →</InlineLink>
        </div>
      </Chapter>

      <Chapter index="04" eyebrow="Standards and procedures" title="Verify the requirements for each operation." tone="white">
        <div className="space-y-6">
          <Notice label="Standards note">{market.standardsNote}</Notice>
          <Tiles>
            {market.sources.map((source) => (
              <Tile key={source.url} art="doc" tag="Source" title={source.label}>
                <a href={source.url} target="_blank" rel="noreferrer" className="font-semibold text-[#032aac] underline underline-offset-4">Open source ↗</a>
              </Tile>
            ))}
          </Tiles>
          <p className="max-w-3xl text-xs leading-6 text-[#60748a]">These links provide local context. They do not imply that Space BQS is certified, approved, integrated with a port authority, or compliant with every local procedure.</p>
        </div>
      </Chapter>

      <Chapter index="05" eyebrow="Questions" title={`Space BQS in ${market.country}.`} tone="mist">
        <FaqList items={market.faqs} />
      </Chapter>

    </div></MarketCtaTracker>
  );
}
