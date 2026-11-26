import type { Metadata } from "next";
import { Section, AnswerBlock, CtaRow, Breadcrumbs } from "../components/ui";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/security-audit", {
  title: "Security and Audit Information",
  description:
    "Review the security and audit information Space BQS publishes about survey records, user access, offline work, and report handling.",
});

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/security-audit", label: "Security & Audit" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Space BQS security and audit information</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">Use this page as a starting point for a product security discussion. Request current technical details for your evaluation.</p>
      </div>
      <Section eyebrow="Product scope" title="Records, review and reporting">
        <AnswerBlock><p>Space BQS is software for bunker quantity survey teams. The mobile app supports field capture; the web platform supports survey review and report workflows. Product descriptions here do not imply independent certification or approval by a standards body, port authority, or classification society.</p></AnswerBlock>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-display text-lg font-bold text-ocean-950">Discuss with the product team</h2>
            <p className="mt-2 text-sm leading-7 text-slate-700">Ask about account roles, record finalization, audit fields, offline behavior, report access, data processing, and deployment scope for your evaluation.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-display text-lg font-bold text-ocean-950">Details to confirm for procurement</h2>
            <p className="mt-2 text-sm leading-7 text-slate-700">Hosting region, retention and deletion periods, backups, recovery targets, encryption controls, and external security certifications should be confirmed in current product documentation or the service agreement.</p>
          </div>
        </div>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
