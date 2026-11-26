import type { Metadata } from "next";
import Link from "next/link";
import { Section, AnswerBlock, CtaRow, Faq, Breadcrumbs } from "../components/ui";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/why-independent", {
  title: "Bunker Delivery Note vs Surveyed Quantity",
  description: "Understand what a supplier BDN records, what a bunker quantity survey measures, and how survey software helps teams document the comparison.",
});

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/why-independent", label: "Why Independent" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Bunker Delivery Note vs measured quantity</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">A BDN records the supplier&apos;s declared delivery quantity. A bunker quantity survey records measurements made by a survey team for comparison.</p>
      </div>
      <Section eyebrow="Compare the records" title="What each figure represents">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="font-display text-lg font-bold">Supplier BDN</h2><p className="mt-2 text-sm leading-7 text-slate-700">The Bunker Delivery Note records the supplier&apos;s declared delivery information. It is one input to the commercial record.</p></div>
          <div className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="font-display text-lg font-bold">Survey record</h2><p className="mt-2 text-sm leading-7 text-slate-700">A survey team records its own measurements and calculation inputs under the applicable contract and procedure. Space BQS provides software to capture, review, and report those records; it does not provide attendance.</p></div>
        </div>
        <div className="mt-6"><AnswerBlock><p>A difference between BDN and surveyed figures is a reason to check the measurement scope, units, timing, inputs, and applicable terms. The difference alone does not establish its cause or determine a contractual outcome.</p></AnswerBlock></div>
      </Section>
      <Section eyebrow="Digital workflow" title="Keep the comparison&apos;s inputs together">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Record BDN details alongside the survey&apos;s measurement records.</li>
          <li>Review the entered readings, calculation details, and report output.</li>
          <li>Use the <Link className="underline" href="/how-we-measure">calculation-method guide</Link> and <Link className="underline" href="/sample-report">sample report</Link> to see the published workflow.</li>
        </ul>
        <div className="mt-6"><CtaRow /></div>
      </Section>
      <Section eyebrow="FAQ" title="Independence questions">
        <Faq items={[
          { q: "Does a difference prove a shortage?", a: "No. Compare the scope, units, timing, and calculation inputs, then follow the applicable contract and procedures." },
          { q: "Does Space BQS provide survey attendance?", a: "No. Space BQS is survey software. Marine survey firms provide attendance and make the measurements." },
          { q: "What is Space BQS used for?", a: "Survey teams use the mobile and web software to record bunker survey information, support review, and prepare report outputs." },
        ]} />
      </Section>
    </div>
  );
}
