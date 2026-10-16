import type { Metadata } from "next";
import { Section, CtaRow, Breadcrumbs } from "../components/ui";

export const metadata: Metadata = {
  title: "Platform — Your Office View of Every Survey",
  description:
    "Space BQS platform: survey register, dashboard trends, vessel list, master tank and correction tables, locked audit trail, PDF and Excel export.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/platform", label: "Platform" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Platform — your firm&apos;s office view</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">All your teams&apos; jobs, all vessels, one register. No spreadsheets lost in email.</p>
      </div>
      <Section eyebrow="Register" title="Find anything in seconds">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Search by survey number, vessel, port, inspector or BDN.</li>
          <li>Filter by status and fuel grade. Total MT in footer.</li>
          <li>Soft-delete protection: finalised surveys cannot be deleted.</li>
        </ul>
      </Section>
      <Section eyebrow="Dashboard" title="Trends without analysis work">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Total surveys, this-month MT, drafts, average correction factor.</li>
          <li>Trend by day/week/month, status donut, quantity by grade, top vessels.</li>
          <li>Recent surveys + needs-attention list.</li>
        </ul>
      </Section>
      <Section eyebrow="Trust" title="Audit on every line">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Status: Draft → Calculated → Under Review → Finalised (locked).</li>
          <li>Each tank line shows table ID, revision, method, interpolated flags, warnings.</li>
          <li>Live preview while typing. Export blocked until calculated.</li>
          <li>PDF certificate + 4-sheet Excel. Register PDF + Excel.</li>
        </ul>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
