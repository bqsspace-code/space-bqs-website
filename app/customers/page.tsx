import type { Metadata } from "next";
import Link from "next/link";
import { Section, CtaRow, Breadcrumbs } from "../components/ui";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/customers", {
  title: "Who Space BQS Is Designed For",
  description:
    "See who Space BQS is designed for: independent bunker survey firms, marine inspection agencies, surveyors, and supervisors.",
});

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/customers", label: "Customers" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">For bunker survey firms and marine inspection teams</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">Space BQS is designed for organizations that perform bunker quantity surveys and want software for field capture, office review, and report workflows.</p>
      </div>
      <Section eyebrow="Fit" title="Teams that may evaluate Space BQS">
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ocean-700">Organization</p>
            <h2 className="mt-2 font-display text-lg font-bold text-ocean-950">Bunker survey firms</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Explore a shared software workflow for survey records, office review, and report preparation.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ocean-700">Field role</p>
            <h2 className="mt-2 font-display text-lg font-bold text-ocean-950">Survey teams</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Review the mobile capture workflow for delivery, remaining-on-board, and debunkering records.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ocean-700">Office role</p>
            <h2 className="mt-2 font-display text-lg font-bold text-ocean-950">Supervisors</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">See the web workflow for reviewing survey records and preparing report outputs.</p>
          </article>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/who-its-for" className="inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-ocean-800 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ocean-700">Explore team roles <span className="ml-2" aria-hidden="true">→</span></Link>
          <Link href="/sample-report" className="inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-ocean-800 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ocean-700">View illustrative sample report <span className="ml-2" aria-hidden="true">→</span></Link>
        </div>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
