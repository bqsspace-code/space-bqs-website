import type { Metadata } from "next";
import { Section, AnswerBlock, CtaRow, Faq, Breadcrumbs } from "../../components/ui";

export const metadata: Metadata = {
  title: "ROB Workflow — Software for On-Hire and Off-Hire Jobs",
  description:
    "Space BQS ROB workflow for survey firms: exact fuel on board at charter start and end, fair settlement packet, locked certificates.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: "/services/rob-survey", label: "ROB Survey" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">ROB workflow — on-hire / off-hire</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">Record fuel on board at charter moments so your clients settle fairly.</p>
      </div>
      <Section eyebrow="Why" title="Charters argue about fuel without proof">
        <AnswerBlock><p>ROB means Remaining On Board. At on-hire your team records what the charterer receives. At off-hire what is returned. The software keeps both certificates with the same method, so consumption math holds up.</p></AnswerBlock>
      </Section>
      <Section eyebrow="Workflow" title="Same method, different moment">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Measure all fuel tanks with temperature and water, like a delivery — at the charter moment.</li>
          <li>Compare with logbook figures; record both, note differences.</li>
          <li>Issue a locked ROB certificate with date, port and vessel for each leg.</li>
        </ul>
        <div className="mt-6"><CtaRow /></div>
      </Section>
      <Section eyebrow="FAQ" title="ROB questions">
        <Faq items={[
          { q: "On-hire vs off-hire?", a: "Two jobs, same workflow. Your teams can run them as a pair; each leg gets its own locked record." },
          { q: "What does the team need?", a: "Vessel, port, date and tank access. Logbook figures help for comparison; measurement stays independent." },
          { q: "Is this quantity-only?", a: "Yes. No lab testing or condition opinions." },
        ]} />
      </Section>
    </div>
  );
}
