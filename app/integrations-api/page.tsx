import type { Metadata } from "next";
import { PageHero, HeroFacts, Chapter, Ledger } from "../components/Editorial";
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
      <PageHero
        href="/integrations-api"
        crumb="Integrations & API"
        eyebrow="For developers and agents"
        title="Integrations & API."
        description="For teams with developers or agents. Keys are per organisation — contact us."
        primaryAction={{ href: "/contact", label: "Discuss an integration" }}
        visual={<HeroFacts title="Ways to connect" rows={[
          { label: "Push", value: "Finalisation webhooks" },
          { label: "Pull", value: "x-api-key REST" },
          { label: "Agents", value: "MCP tools" },
          { label: "Live sync", value: "Firebase bridge" },
        ]} />}
      />

      <Chapter index="01" eyebrow="Map" title="If you want X, use Y." lede="Pick the outcome. The right surface follows.">
        <Ledger items={ROWS.map((r) => ({ tag: r.use, title: r.want, body: r.get }))} />
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[.14em] text-[#52657c]">Access is scoped to your organisation.</p>
      </Chapter>

    </div>
  );
}
