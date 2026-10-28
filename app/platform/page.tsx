import type { Metadata } from "next";
import Link from "next/link";
import { Section, CtaRow, Breadcrumbs, AnswerBlock } from "../components/ui";
import OfficeDashboardMock from "../components/OfficeDashboardMock";
import { Search, Filter, Lock, Download, ShieldCheck, CheckCircle2, Database, Layers, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Platform — Your Office View of Every Survey",
  description:
    "Space BQS platform: survey register, dashboard trends, vessel list, master tank and correction tables, locked audit trail, PDF and Excel export.",
};

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
          <span className="text-xs text-slate-500 font-mono">Real-Time Fleet Oversight</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl">
          The web app — your office view of every survey.
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          All your surveyors&apos; jobs, all vessels, one immutable register. No loose spreadsheets or disputed figures lost in email chains.
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
              <OfficeDashboardMock />
      </section>

      {/* Core Capabilities */}
      <Section eyebrow="Core Capabilities" title="Built for high-volume survey operations">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="rounded-xl bg-ocean-50 p-3 text-ocean-700 w-fit">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-ocean-950 text-lg mt-4">Unified Survey Register</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Instant multi-attribute search by survey ID, vessel IMO, port, inspector, or BDN reference. Filter by fuel grade (VLSFO, MGO, ULSFO) and execution status.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="rounded-xl bg-sea-50 p-3 text-sea-700 w-fit">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-ocean-950 text-lg mt-4">Immutable Finalization Lock</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Once a survey is finalised by an authorized supervisor, it is cryptographically locked with SHA-256. Figures cannot be altered or soft-deleted by field surveyors or external parties.
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
            Read about our upcoming Client Portal roadmap →
          </Link>
        </div>
      </Section>
    </div>
  );
}
