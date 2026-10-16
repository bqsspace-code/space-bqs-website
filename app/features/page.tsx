import type { Metadata } from "next";
import Link from "next/link";
import { Section, CtaRow, Breadcrumbs } from "../components/ui";

export const metadata: Metadata = {
  title: "Features — What the System Does",
  description:
    "Space BQS features: survey register and dashboard, calculation audit, vessels and master data, reports and AI. Plain explanations, real scope.",
};

const ITEMS = [
  { href: "/features/survey-register-dashboard", t: "Survey register & dashboard", d: "Find any survey by ship, port, date or BDN. Trends, status, top vessels." },
  { href: "/features/calculation-audit", t: "Calculation & audit", d: "Measure, subtract water, correct for heat, convert to MT — with proof per line." },
  { href: "/features/vessels-master-data", t: "Vessels & master data", d: "Vessel register plus tank strapping maps and Table 54B correction tables." },
  { href: "/features/reports-ai", t: "Reports & AI", d: "Locked PDF certificate, 4-sheet Excel, register exports, AI checks with limits." },
];

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/features", label: "Features" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Features</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">What the system does — no more, no less. Nomination, invoicing and client portal are roadmap, not live.</p>
      </div>
      <Section eyebrow="Modules" title="Four parts, one record">
        <div className="grid gap-4 md:grid-cols-2">
          {ITEMS.map((i) => (
            <Link key={i.href} href={i.href} className="rounded-xl border p-5 hover:border-ocean-700">
              <p className="font-bold">{i.t}</p>
              <p className="mt-2 text-sm text-slate-600">{i.d}</p>
            </Link>
          ))}
        </div>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
