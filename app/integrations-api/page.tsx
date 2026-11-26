import type { Metadata } from "next";
import Link from "next/link";
import { Section, Breadcrumbs } from "../components/ui";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/integrations-api", {
  title: "Integrations & API — Webhooks, Keys, MCP",
  description:
    "Connect Space BQS: finalisation webhooks to Activepieces, x-api-key REST fetch and analysis post, MCP tools, Firebase realtime bridge. Contact for keys.",
});

const ROWS = [
  { want: "Notify your system on finalise", use: "Per-org webhook URL + API key", get: "POST with survey fetch and analysis-submit links (10s best-effort, never blocks)" },
  { want: "Let an agent read a survey", use: "GET /bqs/webhook/survey/:id with x-api-key", get: "Full survey JSON scoped to your org" },
  { want: "Let an agent write analysis", use: "POST /bqs/webhook/survey/:id/detailed-analysis", get: "Stored as detailed analysis with timestamp" },
  { want: "Chat and search surveys", use: "MCP tools list/get/dashboard_stats", get: "Vessel-aware answers with project-access checks" },
  { want: "Sync web and mobile live", use: "Firebase bridge token exchange", get: "Snapshot updates per org, poll fallback" },
];

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/integrations-api", label: "Integrations & API" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Integrations &amp; API</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">For teams with developers or agents. Keys are per organisation — contact us.</p>
      </div>
      <Section eyebrow="Map" title="If you want X, use Y">
        <div className="mb-3 text-sm text-slate-600 md:hidden">Swipe horizontally to compare all columns.</div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean-700" role="region" aria-label="Integration options comparison" tabIndex={0}>
          <table className="w-full min-w-[680px] border-collapse text-sm">
            <thead><tr className="bg-slate-50 text-left"><th scope="col" className="border-b border-slate-200 p-4">You want</th><th scope="col" className="border-b border-slate-200 p-4">Use</th><th scope="col" className="border-b border-slate-200 p-4">You get</th></tr></thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.want} className="align-top even:bg-slate-50/60"><th scope="row" className="border-b border-slate-100 p-4 text-left font-semibold text-ocean-950">{r.want}</th><td className="border-b border-slate-100 p-4 leading-6 text-slate-700">{r.use}</td><td className="border-b border-slate-100 p-4 leading-6 text-slate-700">{r.get}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 rounded-2xl border border-ocean-100 bg-[#EAF4F9] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
          <div>
            <h3 className="font-display text-lg font-bold text-ocean-950">Discuss an integration</h3>
            <p className="mt-1 text-sm leading-6 text-slate-700">Share your team’s requirements with us to discuss integration scope and access.</p>
          </div>
          <Link href="/contact" className="mt-4 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#032AAC] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1B4FD1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean-700 sm:mt-0">
            Contact the team <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>
    </div>
  );
}
