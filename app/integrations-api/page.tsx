import type { Metadata } from "next";
import { Section, CtaRow, Breadcrumbs } from "../components/ui";
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
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-sm">
            <thead><tr className="bg-slate-50 text-left"><th className="border p-3">You want</th><th className="border p-3">Use</th><th className="border p-3">You get</th></tr></thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.want}><td className="border p-3">{r.want}</td><td className="border p-3">{r.use}</td><td className="border p-3">{r.get}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
