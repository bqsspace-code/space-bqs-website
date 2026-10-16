import type { Metadata } from "next";
import Link from "next/link";
import { Section, CtaRow, Breadcrumbs } from "../components/ui";

export const metadata: Metadata = {
  title: "Demo — 20-Minute Platform Walkthrough for Survey Firms",
  description:
    "See the Space BQS register, dashboard, calculation audit, vessels and reports your teams would run on. Then a pilot workspace for your firm.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/demo", label: "Demo" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Demo — for survey firms</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">See the register, dashboard, audit trail and reports your teams would run on. For a pilot workspace, use <Link href="/request-demo" className="font-semibold text-ocean-700 underline">Request a demo</Link>.</p>
      </div>
      <Section eyebrow="What we show" title="20-minute walkthrough">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Survey register: search by ship, port, date, BDN; status and grade filters.</li>
          <li>Dashboard: total MT, this month, by grade and vessel, needs-attention.</li>
          <li>Calculation audit: per-tank steps, table versions, warnings, lock.</li>
          <li>Reports: PDF certificate + 4-sheet Excel + register exports.</li>
          <li>Mobile: QR scan, 3-step wizard, offline calculation, supervisor review.</li>
        </ul>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
