import type { Metadata } from "next";
import { Section, AnswerBlock, CtaRow, Faq, Breadcrumbs } from "../../components/ui";

export const metadata: Metadata = {
  title: "Bunker Delivery Survey Workflow",
  description:
    "Space BQS bunker-delivery workflow for survey firms: before/after capture, temperature correction, water deduction, BDN cross-check, locked MT certificate.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: "/services/bunker-delivery-survey", label: "Bunker Delivery" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Bunker delivery workflow</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">Your surveyors attend the delivery. The software produces the defensible number.</p>
      </div>
      <Section eyebrow="Who / When" title="For survey firms serving owners, charterers and bunker buyers">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Your clients buy fuel far from the ship and need an independent number.</li>
          <li>Your surveyors measure before and after; the system keeps method identical every time.</li>
          <li>You deliver a locked certificate, not a spreadsheet with edits.</li>
        </ul>
      </Section>
      <Section eyebrow="Workflow" title="What your team records">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Measure all fuel tanks before delivery starts and after it finishes.</li>
          <li>Record temperature per tank, deduct free water, note the BDN number.</li>
          <li>System corrects to standard tonnes and compares measured vs BDN.</li>
        </ul>
        <div className="mt-6"><AnswerBlock><p>The BDN is the supplier&apos;s receipt. Your certificate is the independent check your clients forward. Differences come with dated method and version — not just a feeling.</p></AnswerBlock></div>
      </Section>
      <Section eyebrow="Output" title="Locked certificate your clients share">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>PDF certificate: particulars, tank table, TOTAL MT, audit trail, remarks.</li>
          <li>Excel: measurements, steps, audit — for analysts and claims teams.</li>
          <li>Locked after sign-off. Out-of-range readings flagged, never guessed.</li>
        </ul>
        <div className="mt-6"><CtaRow /></div>
      </Section>
      <Section eyebrow="FAQ" title="Delivery workflow questions">
        <Faq items={[
          { q: "Do you provide the surveyors?", a: "No. You do. We provide the software your surveyors run on deck and in the office." },
          { q: "What if BDN and measured differ?", a: "Your report shows both with method and version, ready for your client to resolve commercially." },
          { q: "Do you test quality?", a: "No — quantity only. No lab testing." },
        ]} />
      </Section>
    </div>
  );
}
