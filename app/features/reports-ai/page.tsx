import type { Metadata } from "next";
import { Section, AnswerBlock, CtaRow, Breadcrumbs } from "../../components/ui";

export const metadata: Metadata = {
  title: "Reports & AI — Locked Certificate, Honest Analysis",
  description:
    "Space BQS reports: PDF certificate with TOTAL MT and audit trail, 4-sheet Excel, register exports gated on calculation. AI checks with stated limits.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/features", label: "Features" }, { href: "/features/reports-ai", label: "Reports & AI" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Reports &amp; AI</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">What you forward, and what the assistant may and may not say.</p>
      </div>
      <Section eyebrow="Reports" title="Certificate + workbook">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Single-survey PDF (A4): particulars, 13-column tank table + TOTAL, headline quantity, audit trail, remarks, engine version + time.</li>
          <li>Excel 4 sheets: survey, measurements, steps, audit. Register PDF landscape + Excel for fleets.</li>
          <li>Export blocked until calculated. Mobile PDF/Excel only when Completed.</li>
        </ul>
      </Section>
      <Section eyebrow="AI" title="Checks with limits">
        <AnswerBlock><p>Analysis covers quantity outcome, tank-by-tank, temperature sensitivity (MT per degree), free-water impact, unit conversions and points for attention. It quotes exact figures, flags illustrative tables, and refuses recalculation, certification or BDN fitness claims.</p></AnswerBlock>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
