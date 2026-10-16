import type { Metadata } from "next";
import { Section, CtaRow, Breadcrumbs } from "../components/ui";

export const metadata: Metadata = {
  title: "Sample BQS Report — What You Receive",
  description:
    "Sample bunker quantity survey report: PDF certificate with tank table and TOTAL MT plus Excel breakdown with steps and audit trail.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/sample-report", label: "Sample Report" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Sample report</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">What your surveyors issue and your clients forward to owners, charterers and suppliers.</p>
      </div>
      <Section eyebrow="PDF" title="BQS Certificate (A4)">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Header + particulars: survey no. BQS-YYYY-0001, vessel, port, date, type, grade, inspector, BDN.</li>
          <li>Tank table: mode, ullage, temp, free water, observed, net, VCF, quantity MT + TOTAL.</li>
          <li>Headline quantity, audit trail, remarks, footer with engine version + calculation time.</li>
        </ul>
      </Section>
      <Section eyebrow="Excel" title="4 sheets for your team">
        <p className="text-slate-700">Survey summary · Tank measurements · Calculation steps · Audit trail. Register export also available for fleets.</p>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
