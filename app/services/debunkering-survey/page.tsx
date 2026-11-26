import type { Metadata } from "next";
import { Section, CtaRow, Faq, AnswerBlock } from "../../components/ui";
import EditorialHero, { HeroImage } from "../../components/EditorialHero";
import { AlertTriangle, Ship, Droplets } from "lucide-react";
import { routeMetadata } from "../../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/services/debunkering-survey", {
  title: "Debunkering Survey Workflow Software",
  description:
    "Space BQS software helps survey firms record and review information for fuel-removal surveys and prepare report outputs.",
});

const DEBUNKERING_FAQS = [
  {
    q: "Does Space BQS decide which measurement method to use?",
    a: "No. The survey firm follows the applicable contract, port procedure, and agreed measurement method. Space BQS provides software for recording and reviewing survey information.",
  },
  {
    q: "How does the system account for unpumpable fuel and line displacement?",
    a: "That depends on the vessel reference data and survey scope. Survey teams should document any applicable limits and assumptions; the software does not determine what a contract treats as pumpable fuel.",
  },
  {
    q: "What documentation is generated when debunkering completes?",
    a: "Space BQS supports PDF and Excel report workflows for survey records. The available fields and report contents are shown in the sample report and should be checked against the current product output.",
  },
  {
    q: "Can debunkered fuel be blended or reused?",
    a: "Fuel quality and reuse decisions require the appropriate technical and commercial assessment. Space BQS is quantity-survey software and does not perform laboratory fuel-quality testing.",
  },
];

export default function Page() {
  return (
    <div className="space-y-12 pb-20">
      <EditorialHero
        trail={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: "/services/debunkering-survey", label: "Debunkering" }]}
        eyebrow="Survey workflow / 03"
        title="Document the movement out. Keep the scope clear."
        description="Space BQS supports survey firms documenting fuel-removal work. The survey firm performs attendance and measurements; the software supports capture, review, and reporting."
        primaryAction={{ href: "/request-demo", label: "Discuss this workflow" }}
        secondaryAction={{ href: "/services", label: "Compare survey workflows" }}
        visual={<HeroImage src="/assets/videos/oil-tanker-sailing-poster.webp" alt="Oil tanker sailing at sea" caption="Illustrative maritime context · survey scope is defined by the responsible parties." position="center" />}
      />

      {/* Answer Block */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnswerBlock>
          <p>
            A debunkering survey records relevant fuel quantities before and after a removal operation under the agreed measurement procedure. Space BQS provides a software workflow for survey firms to capture survey details and prepare reports; it does not perform attendance, decide compliance, or determine contractual outcomes.
          </p>
        </AnswerBlock>
      </div>

      {/* Operational Scenarios */}
      <Section eyebrow="Operational context" title="Examples of fuel-removal work">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_45px_-35px_rgba(3,16,56,.55)] sm:p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 mb-4">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Fuel removal records
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              If a vessel operator arranges fuel removal, the survey firm may record quantities and related particulars. Fuel quality decisions and removal requirements are determined by the responsible parties and applicable procedures.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_45px_-35px_rgba(3,16,56,.55)] sm:p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 mb-4">
              <Ship className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Charter or redelivery scope
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              A charter or redelivery may include fuel quantity and handover terms. The parties and survey firm determine the relevant scope and documentation.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_45px_-35px_rgba(3,16,56,.55)] sm:p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 mb-4">
              <Droplets className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Repair or tank-cleaning projects
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              A repair or tank-cleaning project may involve fuel removal. Follow the facility&apos;s instructions and the survey scope agreed by the responsible parties.
            </p>
          </div>
        </div>
      </Section>

      {/* Survey information */}
      <Section eyebrow="Software workflow" title="Information your survey team may record">
        <ol className="grid gap-4 md:grid-cols-2">
          <li className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4 sm:p-6">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">1</span>
            <div>
              <h3 className="font-display font-bold text-ocean-950 text-base">Opening measurements</h3>
              <p className="mt-2 text-sm text-slate-600 leading-7">
                Record the tank readings and other inputs collected under the survey firm&apos;s agreed procedure before fuel removal.
              </p>
            </div>
          </li>
          <li className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4 sm:p-6">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">2</span>
            <div>
              <h3 className="font-display font-bold text-ocean-950 text-base">Transfer notes</h3>
              <p className="mt-2 text-sm text-slate-600 leading-7">
                Record relevant transfer particulars and documents if they are within the team's survey scope. Operational monitoring remains the responsibility of the transfer parties.
              </p>
            </div>
          </li>
          <li className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4 sm:p-6">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">3</span>
            <div>
              <h3 className="font-display font-bold text-ocean-950 text-base">Closing measurements</h3>
              <p className="mt-2 text-sm text-slate-600 leading-7">
                Record post-removal measurements and document the survey scope, assumptions, and source information used.
              </p>
            </div>
          </li>
          <li className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4 sm:p-6">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">4</span>
            <div>
              <h3 className="font-display font-bold text-ocean-950 text-base">Review and report</h3>
              <p className="mt-2 text-sm text-slate-600 leading-7">
                Review the inputs and calculation information recorded for the survey, then use the current PDF and Excel report workflow.
              </p>
            </div>
          </li>
        </ol>
      </Section>

      {/* FAQs */}
      <Section eyebrow="FAQ" title="Frequently asked debunkering questions">
        <Faq items={DEBUNKERING_FAQS} />
      </Section>

      {/* CTA */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <CtaRow />
      </div>
    </div>
  );
}
