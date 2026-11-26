import type { Metadata } from "next";
import { Section, Breadcrumbs } from "../components/ui";
import { ArrowDownRight, History } from "lucide-react";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/changelog", {
  title: "Changelog — What Shipped",
  description: "See customer-visible Space BQS website updates, including new pages, tools, and workflow changes, listed newest first.",
});

const ENTRIES = [
  { v: "0.2.0 — 2026-10-15", t: "Added services hub, demo, why-independent, who-its-for, features, integrations, security, partners, customers, changelog + 4 new guides." },
  { v: "0.1.0 — 2026-10-15", t: "Initial site: home, 3 services, platform, mobile, methodology, sample, pricing, booking, 5 guides, SEO/GEO layer, Next.js 16.4.1 build green." },
];

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/changelog", label: "Changelog" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Changelog</h1>
        <p className="mt-3 text-slate-600">Only live, customer-visible changes. Newest first.</p>
      </div>
      <Section eyebrow="History" title="Website releases">
        <ol className="relative space-y-4 before:absolute before:bottom-7 before:left-[19px] before:top-7 before:w-px before:bg-slate-200">
          {ENTRIES.map((e, index) => {
            const [version, date] = e.v.split(" — ");
            return (
              <li key={e.v} className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-3 sm:gap-5">
                <div className="relative z-10 mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-ocean-700 shadow-sm">
                  {index === 0 ? <History className="h-4 w-4" aria-hidden="true" /> : <ArrowDownRight className="h-4 w-4" aria-hidden="true" />}
                </div>
                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-ocean-50 px-3 py-1 font-mono text-xs font-bold text-ocean-800">{version}</span>
                    <time className="text-sm text-slate-500" dateTime={date}>{date}</time>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{e.t}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </Section>
    </div>
  );
}
