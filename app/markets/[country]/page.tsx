import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerBlock, Breadcrumbs, Faq, Section } from "../../components/ui";
import { routeMetadata } from "../../lib/seo-metadata";
import { MARKETS } from "../market-data";
import TrackLink from "../../components/TrackLink";

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
    <div lang="en" className="bg-[#f7fbfd] pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-28 sm:px-6 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/markets", label: "Markets" }, { href: `/markets/${market.slug}`, label: market.country }]} />
        <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-[#176a8e]">Space BQS · {market.country}</p>
        <h1 className="font-display mt-3 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-[#031038] sm:text-5xl">{market.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-[#52657c] sm:text-lg">{market.description}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <TrackLink href={`/request-demo?country=${encodeURIComponent(market.country)}`} event="cta_click" params={{ target: "market_demo", market: market.slug }} className="marine-shiny marine-shiny--primary inline-flex min-h-11 items-center rounded-full px-6 text-sm font-semibold text-white">Request a demo for {market.country}</TrackLink>
          <Link href="/sample-report" className="inline-flex min-h-11 items-center rounded-full border border-[#b9d3e8] bg-white px-6 text-sm font-semibold text-[#032aac]">View sample report</Link>
        </div>
        <div className="mt-4 text-center">
          <TrackLink href={`/request-demo?country=${encodeURIComponent(market.country)}&intent=pilot#pilot`} event="cta_click" params={{ target: "market_pilot", market: market.slug }} className="text-sm font-semibold text-[#032aac] underline underline-offset-4">Ask about a pilot for your {market.country} team</TrackLink>
        </div>
      </div>

      <Section eyebrow="Local terminology" title={`How bunkering is described in ${market.country}`}>
        <AnswerBlock><p>{market.terminology}</p></AnswerBlock>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-[#52657c]">Space BQS is software for bunker quantity survey teams. Local survey firms perform attendance and measurements; the software supports their mobile capture, web review, and report workflow.</p>
      </Section>

      <Section bg="mist" eyebrow="Port context" title={`Ports and operating context in ${market.country}`}>
        <div className="grid gap-6 md:grid-cols-2">
          {market.context.map((paragraph) => <p key={paragraph} className="text-sm leading-7 text-[#405a75]">{paragraph}</p>)}
        </div>
        <div className="mt-7 rounded-xl border border-[#d3e9f3] bg-white/80 p-5">
          <h2 className="font-display text-lg font-semibold text-[#031038]">Ports referenced in these notes</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {market.ports.map((port) => <li key={port} className="rounded-full border border-[#d3e9f3] bg-[#f7fbfd] px-3 py-1 text-sm text-[#405a75]">{port}</li>)}
          </ul>
        </div>
      </Section>

      <Section eyebrow="Survey workflow" title="How survey teams can evaluate the software">
        <ol className="grid gap-5 md:grid-cols-3">
          {market.workflow.map((step, index) => <li key={step} className="rounded-xl border border-[#d3e9f3] bg-white/80 p-5"><span className="font-mono text-xs text-[#176a8e]">0{index + 1}</span><p className="mt-3 text-sm leading-7 text-[#405a75]">{step}</p></li>)}
        </ol>
        <div className="mt-7"><Link className="font-semibold text-[#032aac] underline underline-offset-4" href="/solutions/space-bqs">Explore Space BQS features and workflow →</Link></div>
      </Section>

      <Section bg="mist" eyebrow="Standards and procedures" title="Verify the requirements for each operation">
        <AnswerBlock><p>{market.standardsNote}</p></AnswerBlock>
        <ul className="mt-6 list-disc space-y-3 pl-5 text-sm leading-7 text-[#405a75]">
          {market.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="font-semibold text-[#032aac] underline underline-offset-2">{source.label}</a></li>)}
        </ul>
        <p className="mt-5 max-w-3xl text-xs leading-6 text-[#60748a]">These links provide local context. They do not imply that Space BQS is certified, approved, integrated with a port authority, or compliant with every local procedure.</p>
      </Section>

      <Section eyebrow="Questions" title={`Space BQS in ${market.country}`}>
        <Faq items={market.faqs} />
        <div className="mt-8 flex flex-wrap gap-3">
          <TrackLink href={`/request-demo?country=${encodeURIComponent(market.country)}`} event="cta_click" params={{ target: "market_demo", market: market.slug }} className="marine-shiny marine-shiny--primary inline-flex min-h-11 items-center rounded-full px-6 text-sm font-semibold text-white">Request a demo in {market.country}</TrackLink>
          <Link href="/sample-report" className="inline-flex min-h-11 items-center rounded-full border border-[#b9d3e8] bg-white px-6 text-sm font-semibold text-[#032aac]">View sample report</Link>
        </div>
      </Section>
    </div>
  );
}
