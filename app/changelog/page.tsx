import type { Metadata } from "next";
import { Section, Breadcrumbs } from "../components/ui";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/changelog", {
  title: "Changelog — What Shipped",
  description: "Space BQS website changelog: only live, customer-visible changes.",
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
      <Section eyebrow="History" title="Releases">
        <ul className="space-y-3">
          {ENTRIES.map((e) => (
            <li key={e.v} className="rounded-xl border p-4">
              <p className="font-bold">{e.v}</p>
              <p className="mt-1 text-sm text-slate-600">{e.t}</p>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
