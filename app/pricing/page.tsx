import type { Metadata } from "next";
import { Section, CtaRow, Breadcrumbs } from "../components/ui";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — Team License for Survey Firms",
  description:
    "Space BQS is licensed by surveyors and monthly volume, not per job. Certificates included. Contact for a team quote.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/pricing", label: "Pricing" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Pricing — licensed per team</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">No per-job prices on the site. Software is licensed by team size and volume.</p>
      </div>
      <Section eyebrow="Factors" title="What affects the quote">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Number of surveyors and supervisors (roles).</li>
          <li>Vessels and monthly survey volume.</li>
          <li>Workflows needed: delivery, ROB, debunkering.</li>
          <li>Onboarding: master tank and VCF table setup, pilot support.</li>
          <li>Migration: source formats, historical volume, data quality, and reconciliation effort.</li>
          <li>Deployment: public cloud, private cloud, or on-premises infrastructure and support scope.</li>
        </ul>
      </Section>
      <Section eyebrow="Implementation" title="Quote the complete rollout"><p className="max-w-3xl text-sm leading-8 text-slate-600">Migration, dedicated environments, integrations, training, and operational ownership are agreed for your implementation. Cargo WMS is a separate custom project, quoted after confirming its workflows, permissions, tariffs, and acceptance criteria.</p><div className="mt-5 flex flex-wrap gap-5 text-sm font-semibold text-[#032aac]"><Link href="/services/data-migration">Data migration →</Link><Link href="/services/deployment">Deployment options →</Link><Link href="/solutions/cargo-wms">Cargo WMS scope →</Link></div></Section>
      <Section eyebrow="Included" title="Every license includes">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Web platform: register, dashboard, vessels, master data.</li>
          <li>Mobile app: offline capture, QR, Ship-Fuel-Tanks wizard.</li>
          <li>Locked PDF certificates + Excel breakdowns your clients can share.</li>
        </ul>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
