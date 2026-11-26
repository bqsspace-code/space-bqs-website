import Link from "next/link";
import { Section, Breadcrumbs, CtaRow } from "../components/ui";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata = routeMetadata("/about", {
  title: "About the Software",
  description: "Learn about Space BQS, bunker quantity survey software for marine survey teams. Space BQS provides software, not survey attendance.",
});

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/about", label: "About" }]} />
        <p className="mt-5 font-mono text-xs font-semibold uppercase tracking-[.18em] text-ocean-700">About the product</p>
        <h1 className="font-display mt-3 max-w-4xl text-3xl font-bold tracking-tight text-ocean-950 sm:text-4xl">About Space BQS — software, not a survey firm</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">A digital workflow for bunker quantity survey teams, from field records to office review and report preparation.</p>
      </div>
      <Section eyebrow="Who" title="We build the system your surveyors run on">
        <p className="max-w-3xl text-base leading-8 text-slate-700">
          Space BQS does one thing: software for bunker quantity surveys. Delivery, ROB remaining on
          board, and debunkering workflows. Your teams measure on board; the system corrects for
          temperature, deducts water, and locks the result in a certificate your clients can share.
          No lab testing, no quality opinions — and we never claim to attend vessels ourselves.
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <Link href="/mobile-app" className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-ocean-300 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ocean-700">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ocean-700">Field workflow</span>
            <span className="mt-2 block font-display text-lg font-bold text-ocean-950">Explore the mobile app <span aria-hidden="true">→</span></span>
            <span className="mt-1 block text-sm leading-6 text-slate-600">See how survey teams capture information on deck.</span>
          </Link>
          <Link href="/how-we-measure" className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-ocean-300 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ocean-700">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ocean-700">Method and evidence</span>
            <span className="mt-2 block font-display text-lg font-bold text-ocean-950">Read how we measure <span aria-hidden="true">→</span></span>
            <span className="mt-1 block text-sm leading-6 text-slate-600">Review the published calculation workflow and its limits.</span>
          </Link>
        </div>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
