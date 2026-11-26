import type { Metadata } from "next";
import Link from "next/link";
import { routeMetadata } from "../lib/seo-metadata";
import { Section, CtaRow, Breadcrumbs, AnswerBlock } from "../components/ui";
import OfficeDashboardMock from "../components/OfficeDashboardMock";
import { Search, Filter, Lock, Download, ShieldCheck, CheckCircle2, Database, Layers, ArrowRight } from "lucide-react";

export const metadata: Metadata = routeMetadata("/platform", {
  title: "Platform — Your Office View of Every Survey",
  description:
    "Review bunker survey calculations, manage vessel records, follow survey status, and prepare PDF and Excel reports in the Space BQS web platform.",
});

export default function Page() {
  return (
    <div className="space-y-12 pb-16">
      <div className="mx-auto max-w-6xl px-6 pt-32">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/platform", label: "Platform" },
          ]}
        />
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            Supervisor & Office Console
          </span>
          <span className="text-xs text-slate-500 font-mono">Web review and reporting</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl">
          The web app — your office view of every survey.
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Review survey records, manage vessel information, and access report workflows in the Space BQS web platform.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <AnswerBlock>
          <p>
            Review field submissions, follow the web lifecycle from Draft to Calculated, Under Review, and Finalised, and retrieve PDF and Excel outputs. Manage vessel particulars and reference tables centrally. The mobile and web lifecycles are distinct, connected workflows.
          </p>
        </AnswerBlock>
      </div>

      {/* Interactive Platform Mockup */}
      <section className="mx-auto max-w-6xl px-4">
        <p className="mb-3 text-xs font-medium text-slate-500">Illustrative interface preview; dashboard figures are sample data, not customer results.</p>
        <OfficeDashboardMock />
      </section>

      {/* Core Capabilities */}
      <Section eyebrow="Web platform" title="Office tools for survey teams">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="rounded-xl bg-ocean-50 p-3 text-ocean-700 w-fit">
              <Search className="h-6 w-6" />
            </div>
              <h3 className="font-display font-bold text-ocean-950 text-lg mt-4">Survey register</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Review bunker survey records and use the available search and status controls to find relevant work.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="rounded-xl bg-sea-50 p-3 text-sea-700 w-fit">
              <Lock className="h-6 w-6" />
            </div>
              <h3 className="font-display font-bold text-ocean-950 text-lg mt-4">Supervisor review and finalization</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              The web workflow supports review and finalization by an authorized supervisor or administrator. Confirm the current correction and record-retention behavior with the product team.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="rounded-xl bg-ocean-50 p-3 text-ocean-700 w-fit">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-ocean-950 text-lg mt-4">Vessel Master Data</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Maintain vessel particulars, tank calibration references, and Table 54B versions. Trim and list observations are context only; the engine does not calculate trim/list corrections.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <CtaRow />
          <Link href="/portal-roadmap" className="text-xs font-semibold text-ocean-700 hover:underline">
            Read about the client portal roadmap concept →
          </Link>
        </div>
      </Section>
    </div>
  );
}
