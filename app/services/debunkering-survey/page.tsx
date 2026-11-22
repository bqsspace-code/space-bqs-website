import type { Metadata } from "next";
import { Section, CtaRow, Faq, Breadcrumbs, AnswerBlock } from "../../components/ui";
import { AlertTriangle, ArrowRight, CheckCircle2, ShieldCheck, Ship, FileText, Droplets } from "lucide-react";

export const metadata: Metadata = {
  title: "Debunkering Survey Workflow Software",
  description:
    "Space BQS debunkering workflow for survey firms: before/after measurement of removed fuel with locked certificates both commercial sides accept.",
};

const DEBUNKERING_FAQS = [
  {
    q: "Why is a debunkering survey required instead of relying on barge flow meters?",
    a: "Debunkering involves reverse transfer, often under challenging pumping conditions where air entrapment and line stripping affect mass flow meters. Measuring vessel fuel tanks before and after pumping provides an independent custody transfer record that protects shipowners and charterers against shortfalls.",
  },
  {
    q: "How does the system account for unpumpable fuel and line displacement?",
    a: "Vessel tank strapping curves specify suction bellmouth limits and non-pumpable dead bottoms. Space BQS enables surveyors to record unpumpable residues separately, ensuring the certified removed quantity reflects actual transferred mass.",
  },
  {
    q: "What documentation is generated when debunkering completes?",
    a: "The surveyor generates a tamper-evident locked PDF Debunkering Certificate and 4-sheet transparent Excel calculation pack detailing opening/closing soundings, free water checks, ASTM Table 54B temperature corrections, and net metric tonnes offloaded.",
  },
  {
    q: "Can debunkered fuel be blended or reused?",
    a: "Reuse and commercial disposition depend on offloaded fuel quality and laboratory analysis, which is outside the quantity surveyor's scope. Space BQS reports quantity only with immutable calculation proof.",
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
            { href: "/services/debunkering-survey", label: "Debunkering" },
          ]}
        />
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            Survey Workflow
          </span>
          <span className="text-xs text-slate-500 font-mono">Fuel Offloading</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl lg:text-5xl">
          Debunkering survey workflow &amp; software
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          When fuel must be offloaded from a vessel, your surveyors record exactly what left the tanks. Immutable evidence accepted by shipowners, charterers, and receiving barges.
        </p>
      </div>

      {/* Answer Block */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnswerBlock>
          <p>
            Debunkering is a high-risk reverse custody transfer where off-spec fuel, charter redelivery terms, or shipyard safety requirements mandate removing bunkers from a ship. Space BQS guides surveyors through pre-pumping and post-pumping soundings, free water checks, and ASTM D1250 Table 54B temperature corrections to issue locked, legally defensible certificates.
          </p>
        </AnswerBlock>
      </div>

      {/* Operational Scenarios */}
      <Section eyebrow="Scenarios" title="When debunkering operations occur">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 mb-4">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Off-Spec Fuel Removal
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Bunkers failing ISO 8217 stability, flash point, or catalytic fines limits must be removed to prevent main engine damage. Independent quantity records substantiate claim recoveries.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 mb-4">
              <Ship className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Charter Redelivery Terms
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Time charter agreements frequently stipulate redelivery fuel thresholds. Excess bunkers must be offloaded and credited back to the charterer before handover.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 mb-4">
              <Droplets className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Drydock &amp; Tank Cleaning
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Shipyards require fuel tanks to be emptied and gas-freed before hot work, structural inspections, or conversion to low-carbon alternative fuels.
            </p>
          </div>
        </div>
      </Section>

      {/* 4-Stage Protocol */}
      <Section eyebrow="Protocol" title="Four-stage debunkering measurement methodology">
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">1</span>
            <div>
              <h4 className="font-display font-bold text-ocean-950 text-base">Opening Soundings &amp; Water Check</h4>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Before hoses connect, the surveyor tapes all fuel and settling tanks, measures temperature at top/middle/bottom, and checks water bottoms using paste.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">2</span>
            <div>
              <h4 className="font-display font-bold text-ocean-950 text-base">Pumping &amp; Transfer Surveillance</h4>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Transfer rates, line pressure, and receiving barge soundings are monitored to guard against pipeline bypasses, spills, or unrecorded valve shifts.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">3</span>
            <div>
              <h4 className="font-display font-bold text-ocean-950 text-base">Closing Soundings &amp; Stripping Verification</h4>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                After stripping suction breaks, final sounding tapes confirm remaining unpumpable volume. Line blowdown air is accounted for to prevent phantom tonnage.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">4</span>
            <div>
              <h4 className="font-display font-bold text-ocean-950 text-base">Locked Certificate Generation</h4>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                The engine applies Table 54B VCF to compute net metric tonnes removed. A tamper-evident PDF certificate and 4-sheet Excel audit pack are generated and signed.
              </p>
            </div>
          </div>
        </div>
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
