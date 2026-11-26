import type { Metadata } from "next";
import Link from "next/link";
import { Section, AnswerBlock, CtaRow, Faq } from "../../components/ui";
import EditorialHero, { HeroImage } from "../../components/EditorialHero";
import { routeMetadata } from "../../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/services/rob-survey", {
  title: "ROB Bunker Survey Workflow Software",
  description:
    "Space BQS ROB workflow for survey firms: fuel on board at charter start and end, a settlement-ready record, and finalised reports.",
});

const ROB_FAQS = [
  {
    q: "Why record on-hire and off-hire ROB separately?",
    a: "They describe fuel quantities at different points in a charter period. Keeping the records separate helps teams compare the opening and closing figures with deliveries and other documented movements.",
  },
  {
    q: "How does the surveyor handle differences between engine room logbooks and physical soundings?",
    a: "The survey firm decides which source records to collect and compare. Space BQS is software for entering survey information and supporting review; it does not perform the physical measurements.",
  },
  {
    q: "Are settling, service, and drain tanks included in an ROB survey?",
    a: "The tanks included depend on the survey scope and applicable procedure. The survey team records the tanks it measures and the report should make the scope clear.",
  },
  {
    q: "Is Space BQS an automated condition survey tool?",
    a: "No. Space BQS is bunker quantity survey software, not a vessel inspection company or fuel-testing laboratory.",
  },
];

export default function Page() {
  return (
    <div className="space-y-12 pb-20">
      <EditorialHero
        trail={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: "/services/rob-survey", label: "ROB survey" }]}
        eyebrow="Survey workflow / 02"
        title="A point-in-time view of fuel on board."
        description="Record remaining-on-board survey information at a defined charter milestone. Space BQS provides software for survey teams to capture readings, review records, and prepare reports."
        primaryAction={{ href: "/request-demo", label: "Discuss this workflow" }}
        secondaryAction={{ href: "/order-lifecycle", label: "See the record workflow" }}
        visual={<HeroImage src="/assets/videos/bqs-appbeing-used2-poster.webp" alt="Illustrative survey app interface shown on a mobile phone" caption="Illustrative mobile interface · confirm current workflow details for your release." position="center" />}
      />

      {/* Answer Block */}
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <AnswerBlock>
          <p>
            A Remaining On Board (ROB) survey records fuel quantities on a vessel at a defined point, such as the start or end of a charter. A survey firm performs the measurement. Space BQS provides software for recording the survey, reviewing its calculation inputs, and preparing reports.
          </p>
        </AnswerBlock>
      </div>

      {/* Reconciliation context */}
      <Section eyebrow="Reconciliation" title="Keep the period and fuel movements clear">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_45px_-35px_rgba(3,16,56,.55)] sm:p-7">
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Compare opening and closing records
            </h3>
            <p className="mt-3 text-sm text-slate-600 leading-7">
              Opening ROB, closing ROB, deliveries, and other documented movements are distinct inputs. Check their time period, fuel grade, units, and scope before interpreting a balance.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_45px_-35px_rgba(3,16,56,.55)] sm:p-7">
            <h3 className="font-display text-lg font-bold text-ocean-950">
              A simple balance relationship
            </h3>
            <p className="mt-3 text-sm text-slate-600 leading-7">
              Charter voyage fuel consumption is determined by a strict mathematical equation:
            </p>
            <div className="mt-3 rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-800 border border-slate-200">
              Balance = Opening ROB + Receipts − Transfers out − Closing ROB
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              The expression is a reconciliation aid. The survey team should record the actual movements and follow the terms applicable to its charter and reporting process.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Worked example" title="Reconcile one fuel grade over one period">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
            <p className="text-sm leading-7 text-slate-700">For an illustrative period, suppose the opening ROB is 420 MT, receipts are 600 MT, transfers out are 0 MT, and closing ROB is 310 MT.</p>
            <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-7 text-slate-800">420 + 600 − 0 − 310 = 710 MT</p>
            <p className="mt-3 text-xs leading-6 text-slate-500">This is arithmetic using hypothetical inputs, not a verified survey or charter settlement. Reconcile each fuel grade separately and confirm that all figures share the same time period, units, and mass basis.</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/tools/rob-balance" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#032aac] px-5 text-sm font-semibold text-white hover:bg-[#1b4fd1]">Open the ROB balance worksheet</Link>
            <Link href="/resources/rob-checklist" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#b9d3e8] bg-white px-5 text-sm font-semibold text-[#032aac]">View the ROB checklist</Link>
          </div>
        </div>
      </Section>

      {/* ROB software workflow */}
      <Section eyebrow="Software workflow" title="From ROB inputs to a reviewable report">
        <ol className="grid gap-4 md:grid-cols-2">
          <li className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4 sm:p-6">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">1</span>
            <div>
              <h3 className="font-display font-bold text-ocean-950 text-base">Select the survey scope</h3>
              <p className="mt-2 text-sm text-slate-600 leading-7">
                The survey firm determines the tanks, fuel grades, period, and records included in its ROB survey.
              </p>
            </div>
          </li>
          <li className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4 sm:p-6">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">2</span>
            <div>
              <h3 className="font-display font-bold text-ocean-950 text-base">Capture the field readings</h3>
              <p className="mt-2 text-sm text-slate-600 leading-7">
                Surveyors enter the tank measurements and other inputs collected under their agreed procedure. Space BQS supports offline mobile capture.
              </p>
            </div>
          </li>
          <li className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4 sm:p-6">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">3</span>
            <div>
              <h3 className="font-display font-bold text-ocean-950 text-base">Record other movements</h3>
              <p className="mt-2 text-sm text-slate-600 leading-7">
                Add receipts, transfers, or other relevant records needed to understand the period balance, according to the team&apos;s process.
              </p>
            </div>
          </li>
          <li className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4 sm:p-6">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">4</span>
            <div>
              <h3 className="font-display font-bold text-ocean-950 text-base">Review calculations and inputs</h3>
              <p className="mt-2 text-sm text-slate-600 leading-7">
                Review the recorded readings, calculation inputs, and fuel-grade breakdown before finalizing the survey record.
              </p>
            </div>
          </li>
          <li className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4 sm:p-6">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">5</span>
            <div>
              <h3 className="font-display font-bold text-ocean-950 text-base">Prepare the report outputs</h3>
              <p className="mt-2 text-sm text-slate-600 leading-7">
                Space BQS supports PDF and Excel report workflows. See the <Link className="underline" href="/sample-report">sample report</Link> for an example of the available outputs.
              </p>
            </div>
          </li>
        </ol>
      </Section>

      {/* FAQs */}
      <Section eyebrow="FAQ" title="Frequently asked ROB survey questions">
        <Faq items={ROB_FAQS} />
      </Section>

      {/* CTA */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <CtaRow />
      </div>
    </div>
  );
}
