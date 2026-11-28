import type { Metadata } from "next";
import { PageHero, Chapter, HeroArt } from "../components/Editorial";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/changelog", {
  title: "Changelog — What Shipped",
  description: "See customer-visible Space BQS website updates, including new pages, tools, and workflow changes, listed newest first.",
});

const ENTRIES = [
  { version: "0.2.0", date: "2026-10-15", text: "Added services hub, demo, why-independent, who-its-for, features, integrations, security, partners, customers, changelog + 4 new guides." },
  { version: "0.1.0", date: "2026-10-15", text: "Initial site: home, 3 services, platform, mobile, methodology, sample, pricing, booking, 5 guides, SEO/GEO layer, Next.js 16.4.1 build green." },
];

export default function Page() {
  return (
    <div>
      <PageHero href="/changelog" crumb="Changelog" eyebrow="What shipped" title="Changelog." description="Only live, customer-visible changes. Newest first."
        visual={<HeroArt kind="flow" title="Release history" caption="Only live, customer-visible changes." />}
      />
      <Chapter index="01" eyebrow="History" title="Website releases.">
        <ol className="border-t border-[#c9dce8]">
          {ENTRIES.map((e) => (
            <li key={e.version} className="grid gap-3 border-b border-[#c9dce8] py-8 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8">
              <div>
                <p className="font-display text-3xl font-semibold tracking-tight text-[#032aac]">v{e.version}</p>
                <time className="mt-1 block font-mono text-[11px] uppercase tracking-[.16em] text-[#52657c]" dateTime={e.date}>{e.date}</time>
              </div>
              <p className="max-w-2xl text-[15px] leading-7 text-[#31485f]">{e.text}</p>
            </li>
          ))}
        </ol>
      </Chapter>
    </div>
  );
}
