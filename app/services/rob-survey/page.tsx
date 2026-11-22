import type { Metadata } from "next";
import { Section, AnswerBlock, CtaRow, Faq, Breadcrumbs } from "../../components/ui";
import { Scale, CheckCircle2, ShieldCheck, Ship, ArrowRight, FileSpreadsheet, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "ROB Bunker Survey Workflow Software",
  description:
    "Space BQS ROB workflow for survey firms: exact fuel on board at charter start and end, fair settlement packet, locked certificates.",
};

const ROB_FAQS = [
  {
    q: "Why should on-hire and off-hire surveys be run as separate jobs?",
    a: "Each charter milestone represents a legally binding custody handoff at a distinct port, time, and draft condition. Space BQS tracks on-hire and off-hire as paired independent records with distinct cryptographic hashes, ensuring neither certificate can be retroactively tampered with when settling charterparty voyage accounts.",
  },
  {
    q: "How does the surveyor handle differences between engine room logbooks and physical soundings?",
    a: "The surveyor records the Chief Engineer's logbook estimates for reference, but conducts independent manual tape soundings, temperature measurements, and free water checks across all bunker tanks. Both sets of figures are transparently reported, showing the exact variance without altering measured facts.",
  },
  {
    q: "Are settling, service, and drain tanks included in an ROB survey?",
    a: "Yes. Complete ROB surveys inventory every fuel-carrying compartment on the vessel, including storage tanks, settling tanks, daily service tanks, and overflow/sludge tanks. Recording all fuel prevents unrecorded bunker transfers from distorting consumption math.",
  },
  {
    q: "Is Space BQS an automated condition survey tool?",
    a: "No. Space BQS is strictly a bunker quantity measurement platform. It calculates temperature-corrected fuel quantities (Metric Tonnes) and does not perform vessel hull inspections, hatch cover testing, or laboratory fuel quality assays.",
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
          Capture exact fuel remaining on board (ROB) at charter delivery and redelivery. Eliminate charterparty settlement disputes with locked certificates both sides trust.
        </p>
      </div>

      {/* Answer Block */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnswerBlock>
          <p>
            An ROB (Remaining On Board) survey establishes an independent, audited inventory of all bunker fuels on a vessel at delivery into or redelivery from a time charter. Space BQS enforces deterministic ASTM D1250 Table 54B temperature corrections and strapping curve calculations across all storage, settling, and service tanks, producing twin locked certificates for seamless commercial settlement.
          </p>
        </AnswerBlock>
      </div>

      {/* Financial Stakes of Disputes */}
      <Section eyebrow="Financial Impact" title="Why charterparties dispute unverified ROB numbers">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-display text-lg font-bold text-ocean-950">
              The Cost of Unverified Logbook Figures
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              With marine fuel prices ranging from $500 to $800 per metric tonne, a seemingly minor 30 MT discrepancy between the Chief Engineer&apos;s logbook estimate and actual tank soundings translates into an immediate $15,000 to $24,000 settlement dispute.
            </p>
            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              Without an independent surveyor armed with locked calibration table proof, charterers and shipowners frequently find themselves trapped in weeks of contentious legal arbitration.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Complete Leg-by-Leg Consumption Accounting
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Charter voyage fuel consumption is determined by a strict mathematical equation:
            </p>
            <div className="mt-3 rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-800 border border-slate-200">
              Voyage Consumption = Opening On-Hire ROB + Total Bunkers Received − Closing Off-Hire ROB
            </div>
            <p className="mt-3 text-xs text-slate-500">
              By locking both opening and closing certificates in Space BQS, superintendents and chartering managers can reconcile actual fuel burn against charterparty speed and consumption warranties with complete certainty.
            </p>
          </div>
        </div>
      </Section>

      {/* 5-Step Protocol */}
      <Section eyebrow="Survey Protocol" title="Five-step independent ROB measurement procedure">
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">1</span>
            <div>
              <h4 className="font-display font-bold text-ocean-950 text-base">Full Tank Inventory on Deck</h4>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                The surveyor inspects and measures all fuel compartments: heavy fuel storage, low-sulphur marine gas oil, settling tanks, daily service tanks, and overflow tanks using calibrated sounding tapes.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">2</span>
            <div>
              <h4 className="font-display font-bold text-ocean-950 text-base">Free Water &amp; Bottom Sludge Detection</h4>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Water-finding paste checks identify settled free water bottoms. Suction line bellmouth dead stock is calculated to differentiate usable commercial fuel from non-pumpable tank bottoms.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">3</span>
            <div>
              <h4 className="font-display font-bold text-ocean-950 text-base">Engine Room Logbook Cross-Examination</h4>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Physical measurements are cross-checked against the Chief Engineer&apos;s daily sounding book and official deck logbook. Discrepancies are highlighted transparently on the report.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">4</span>
            <div>
              <h4 className="font-display font-bold text-ocean-950 text-base">ASTM Table 54B Temperature Correction</h4>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Observed tank temperatures and fuel densities are processed through the ASTM Table 54B engine to convert heated observed volumes into standardized metric tonnes at 15°C.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-start gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-xs font-bold text-white font-mono">5</span>
            <div>
              <h4 className="font-display font-bold text-ocean-950 text-base">Locked Twin Certificate Package</h4>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                A tamper-evident PDF certificate and 4-sheet Excel audit workbook are finalized and digitally signed for immediate dispatch to the charterer, shipowner, and commercial broker.
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
