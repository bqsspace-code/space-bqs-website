import type { Metadata } from "next";
import Link from "next/link";
import { Section, CtaRow, Breadcrumbs } from "../components/ui";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/partners", {
  title: "Software Partnerships",
  description:
    "For resellers and implementation partners serving marine survey firms: one software workflow for bunker quantity survey records.",
});

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/partners", label: "Partners" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Partners — implement with us</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">For resellers and implementation partners serving marine survey firms. One software workflow for bunker quantity survey records.</p>
      </div>
      <Section eyebrow="Two ways" title="Buy for your firm or resell to firms">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ocean-700">For survey firms</p>
            <h2 className="mt-2 font-display text-xl font-bold text-ocean-950">Evaluate for your team</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Discuss your survey workflows, team needs, and rollout requirements with Space BQS.</p>
            <Link href="/request-demo" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ocean-700 underline decoration-ocean-300 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ocean-700">Request a product walkthrough <span aria-hidden="true">→</span></Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ocean-700">For potential partners</p>
            <h2 className="mt-2 font-display text-xl font-bold text-ocean-950">Discuss a partnership</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Share your organization, the marine survey teams you serve, and the collaboration you have in mind. Availability and scope can be confirmed directly.</p>
            <Link href="/contact" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ocean-700 underline decoration-ocean-300 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ocean-700">Contact the team <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
