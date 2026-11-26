import type { Metadata } from "next";
import Link from "next/link";
import { Section, AnswerBlock, CtaRow, Faq, Breadcrumbs } from "../../components/ui";
import { Scale, CheckCircle2, ShieldCheck, Ship, ArrowRight, FileSpreadsheet, Lock } from "lucide-react";
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
      {/* Header */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/services", label: "Services" },
            { href: "/services/rob-survey", label: "ROB Survey" },
          ]}
        />
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            Charter Custody Workflow
          </span>
          <span className="text-xs text-slate-500 font-mono">On-Hire &amp; Off-Hire</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl lg:text-5xl">
          ROB bunker survey workflow software
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Record remaining-on-board (ROB) survey information at charter milestones. Space BQS provides software for survey teams to capture readings, review records, and prepare reports.
        </p>
      </div>

      {/* Answer Block */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnswerBlock>
          <p>
            A Remaining On Board (ROB) survey records fuel quantities on a vessel at a defined point, such as the start or end of a charter. A survey firm performs the measurement. Space BQS provides software for recording the survey, reviewing its calculation inputs, and preparing reports.
          </p>
        </AnswerBlock>
      </div>

      {/* Reconciliation context */}
      <Section eyebrow="Reconciliation" title="Keep the period and fuel movements clear">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Compare opening and closing records
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Opening ROB, closing ROB, deliveries, and other documented movements are distinct inputs. Check their time period, fuel grade, units, and scope before interpreting a balance.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-display text-lg font-bold text-ocean-950">
              A simple balance relationship
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Charter voyage fuel consumption is determined by a strict mathematical equation:
            </p>
            <div className="mt-3 rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-800 border border-slate-200">
              Balance = Opening ROB + Receipts − Transfers out − Closing ROB
            </div>
            <p className="mt-3 text-xs text-slate-500">
              The expression is a reconciliation aid. The survey team should record the actual movements and follow the terms applicable to its charter and reporting process.
            </p>
          </div>
        </div>
      </Section>

      {/* ROB software workflow */}
      <Section eyebrow="Software workflow" title="From ROB inputs to a reviewable report">
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">1</span>
            <div>
              <h3 className="font-display font-bold text-ocean-950 text-base">Select the survey scope</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                The survey firm determines the tanks, fuel grades, period, and records included in its ROB survey.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">2</span>
            <div>
              <h3 className="font-display font-bold text-ocean-950 text-base">Capture the field readings</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Surveyors enter the tank measurements and other inputs collected under their agreed procedure. Space BQS supports offline mobile capture.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">3</span>
            <div>
              <h3 className="font-display font-bold text-ocean-950 text-base">Record other movements</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Add receipts, transfers, or other relevant records needed to understand the period balance, according to the team&apos;s process.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">4</span>
            <div>
              <h3 className="font-display font-bold text-ocean-950 text-base">Review calculations and inputs</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Review the recorded readings, calculation inputs, and fuel-grade breakdown before finalizing the survey record.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">5</span>
            <div>
              <h3 className="font-display font-bold text-ocean-950 text-base">Prepare the report outputs</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Space BQS supports PDF and Excel report workflows. See the <Link className="underline" href="/sample-report">sample report</Link> for an example of the available outputs.
              </p>
            </div>
          </div>
        </div>
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
