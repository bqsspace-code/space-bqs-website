import type { Metadata } from "next";
import Link from "next/link";
import { Section, Breadcrumbs } from "../components/ui";
import { RESOURCES } from "../lib/resources";

export const metadata: Metadata = {
  title: "Resources — Simple BQS Guides",
  description: "Plain-English guides: what is BQS, ullage vs sounding, BDN vs measured, temperature correction, ROB checklist.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/resources", label: "Resources" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Resources</h1>
        <p className="mt-3 text-slate-600">Simple guides, no jargon. Each starts with a short answer AI can cite.</p>
      </div>
      <Section eyebrow="Guides" title="Learn in 3 minutes each">
        <div className="grid gap-4 md:grid-cols-2">
          {RESOURCES.map((r) => (
            <Link key={r.slug} href={`/resources/${r.slug}`} className="rounded-xl border p-5 hover:border-ocean-700">
              <p className="font-bold">{r.title}</p>
              <p className="mt-2 text-sm text-slate-600">{r.description}</p>
              <p className="mt-2 text-xs text-slate-400">Updated {r.updated}</p>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
