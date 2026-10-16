import type { Metadata } from "next";
import Link from "next/link";
import { Section, AnswerBlock, CtaRow, Faq, Breadcrumbs } from "../components/ui";

export const metadata: Metadata = {
  title: "Bunker Survey Services — Delivery, ROB, Debunkering",
  description:
    "All Space BQS services in one place: bunker delivery surveys, ROB on/off-hire surveys, and debunkering. Quantity-only, temperature-corrected MT, locked certificate.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Services — workflows your teams run</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">Three workflows in one system for survey firms. Quantity-only — no lab testing.</p>
      </div>
      <Section eyebrow="Compare" title="Which workflow does the job need?">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="border p-3">Workflow</th>
                <th className="border p-3">When your team runs it</th>
                <th className="border p-3">What they record</th>
                <th className="border p-3">Client gets</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-3 font-semibold"><Link href="/services/bunker-delivery-survey" className="text-ocean-700 underline">Bunker delivery</Link></td>
                <td className="border p-3">Fuel is being supplied to the ship</td>
                <td className="border p-3">Tanks before + after, temperature, water, BDN noted</td>
                <td className="border p-3">Delivery certificate vs BDN</td>
              </tr>
              <tr>
                <td className="border p-3 font-semibold"><Link href="/services/rob-survey" className="text-ocean-700 underline">ROB / On-Off hire</Link></td>
                <td className="border p-3">Charter starts or ends</td>
                <td className="border p-3">All fuel on board at that moment</td>
                <td className="border p-3">ROB certificate for settlement</td>
              </tr>
              <tr>
                <td className="border p-3 font-semibold"><Link href="/services/debunkering-survey" className="text-ocean-700 underline">Debunkering</Link></td>
                <td className="border p-3">Fuel must be removed</td>
                <td className="border p-3">Tanks before + after removal</td>
                <td className="border p-3">Removed-quantity certificate</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6"><AnswerBlock><p>Not sure which fits? Tell us the job — we map it to the right workflow. If a client needs lab quality testing, sludge handling, or cargo work, the honest answer is out of scope for this system.</p></AnswerBlock></div>
        <div className="mt-6"><CtaRow /></div>
      </Section>
      <Section eyebrow="FAQ" title="Services questions">
        <Faq items={[
          { q: "Do you provide surveyors?", a: "No. Survey firms run jobs with their teams; Space BQS is the software they run on." },
          { q: "Do you test fuel quality?", a: "No. Quantity-only. No lab, no sludge, no sampling for quality." },
          { q: "Can teams run on/off-hire as a pair?", a: "Yes. Each leg gets its own locked record; keep both with bunker receipts." },
        ]} />
      </Section>
    </div>
  );
}
