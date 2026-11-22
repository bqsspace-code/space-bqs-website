import type { Metadata } from "next";
import { Section, CtaRow, Breadcrumbs, AnswerBlock, Faq } from "../components/ui";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, Users, FileSpreadsheet, Lock, HelpCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — Team License for Survey Firms",
  description:
    "Space BQS is licensed by surveyors and monthly volume, not per job. Certificates included. Contact for a team quote.",
};

const LICENSING_TIERS = [
  {
    name: "Independent / Boutique Firm",
    badge: "Active Surveyors",
    description: "Designed for local marine inspection teams and independent bunker surveyors handling single-port attendance.",
    features: [
      "Full mobile deck app with 72-hour offline operation",
      "Deterministic ASTM D1250 Table 54B calculation engine",
      "Unlimited locked PDF certificates and Excel evidence packs",
      "Vessel tank strapping curve library & auto-interpolation",
      "Standard email & ticket support with onboarding guide",
    ],
    highlight: false,
  },
  {
    name: "Regional Inspection Agency",
    badge: "Multi-Port & Supervisor Review",
    description: "Engineered for growing inspection firms managing multi-port teams, technical superintendents, and high monthly job volumes.",
    features: [
      "Everything in Boutique Firm, plus:",
      "Supervisor approval gate before certificate locking",
      "Survey register & real-time operational dashboard",
      "Discrepancy trend analytics across fuel suppliers & ports",
      "Priority technical support & assisted fleet table setup",
      "Multi-role user governance (surveyor, reviewer, ops manager)",
    ],
    highlight: true,
  },
  {
    name: "Enterprise Fleet & Global TIC",
    badge: "Custom Scale & Deployment",
    description: "For international TIC giants, ship management corporations, and large chartering operations requiring tailored infrastructure.",
    features: [
      "Everything in Regional Agency, plus:",
      "Public cloud, private cloud, or on-premises deployment",
      "REST & Webhook API access for ERP / LIMS integration",
      "Custom SSO (SAML / OAuth) & granular RBAC permissions",
      "Dedicated account manager & SLA guarantee",
      "Custom historical data migration & reconciliation support",
    ],
    highlight: false,
  },
];

const PRICING_FAQS = [
  {
    q: "Why do you not publish flat per-job or per-certificate prices?",
    a: "Bunker quantity surveys are operational, time-sensitive events. Charging per job creates perverse incentives where surveyors rush or avoid re-running checks to save license fees. Space BQS licenses by active surveyor seats and estimated monthly volume, allowing survey teams to issue unlimited locked certificates, re-runs, and Excel packs without worrying about variable micro-transactions.",
  },
  {
    q: "Can our clients, shipowners, and charterers access certificates for free?",
    a: "Yes. Once your supervisor locks and finalizes a survey report, the generated A4 PDF Certificate and 4-sheet transparent Excel workbook can be freely downloaded and forwarded to shipowners, charterers, and bunker buyers. Clients never need to pay for a login or software seat to verify and inspect locked certificates.",
  },
  {
    q: "How does the 30-day pilot workspace work?",
    a: "We set up a dedicated pilot workspace for your survey firm, ingest your top 5–10 frequent vessel tank strapping tables into the master database, and train your deck team. You can shadow your next 10–20 live bunkering jobs alongside your existing paper or spreadsheet routines to verify mathematical parity before committing to a commercial team agreement.",
  },
  {
    q: "What is included with data migration and onboarding?",
    a: "Our maritime engineering team helps you migrate existing vessel profiles, tank strapping tables, and historical survey spreadsheets into structured Space BQS master records. We ensure Table 54B correction parameters, trim interpolation boundaries, and user roles are verified before your go-live date.",
  },
  {
    q: "Is there an additional charge for the mobile offline capability?",
    a: "No. The 72-hour zero-connectivity mobile app lease (available on iOS and Android) is included in every licensing tier. Surveyors on deck inside steel hulls or offshore anchorages can capture soundings, run instant offline calculations, and sync automatically once back online.",
  },
];

export default function Page() {
  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/pricing", label: "Pricing" }]} />
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            Commercial Model
          </span>
          <span className="text-xs text-slate-500 font-mono">Team Licensing</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl lg:text-5xl">
          Transparent team licensing for marine survey firms
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Predictable monthly software licensing based on your active surveyor seats and operating volume. No surprise per-certificate fees, no lock-in per nomination.
        </p>
      </div>

      {/* Answer Block */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnswerBlock>
          <p>
            Space BQS is licensed as a unified web and mobile platform for independent marine survey companies and inspection firms. Every license tier includes unlimited survey calculations, offline mobile tank capture, locked tamper-evident PDF certificates, and 4-sheet transparent Excel packages. Pricing scales with the number of field surveyors and supervisors on your team.
          </p>
        </AnswerBlock>
      </div>

      {/* Tier Comparison Cards */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          {LICENSING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col justify-between rounded-2xl p-7 border transition-all ${
                tier.highlight
                  ? "border-ocean-600 bg-white shadow-xl ring-2 ring-ocean-600/20"
                  : "border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-700 font-mono">
                    {tier.badge}
                  </span>
                  {tier.highlight && (
                    <span className="rounded-full bg-ocean-700 px-2.5 py-0.5 text-[11px] font-medium text-white">
                      Most Popular
                    </span>
                  )}
                </div>
                <h2 className="font-display mt-4 text-2xl font-bold text-ocean-950">{tier.name}</h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{tier.description}</p>

                <div className="mt-6 border-t border-slate-200 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono mb-4">
                    Included capabilities:
                  </p>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-ocean-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/request-demo"
                  className={`w-full inline-flex justify-center items-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold transition-all ${
                    tier.highlight
                      ? "bg-ocean-700 text-white hover:bg-ocean-800 shadow-sm"
                      : "bg-white border border-slate-300 text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  Request Team Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Determination Factors */}
      <Section eyebrow="Evaluation" title="How your custom proposal is scoped">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-display font-bold text-ocean-950 text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-ocean-600" /> Active Surveyor Seats
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Count of deck surveyors using the offline mobile app and operations supervisors reviewing and finalising locked certificates.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-display font-bold text-ocean-950 text-base flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-ocean-600" /> Monthly Job Volume
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Estimated bunker delivery attendances, ROB charter surveys, and debunkering operations completed each month across ports.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-display font-bold text-ocean-950 text-base flex items-center gap-2">
              <Lock className="h-4 w-4 text-ocean-600" /> Strapping Library Setup
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Assisted conversion and verification of vessel calibration tables into the deterministic Table 54B calculation engine.
            </p>
          </div>
        </div>
      </Section>

      {/* Implementation & Infrastructure Services */}
      <Section eyebrow="Enterprise Services" title="Specialized Rollout & Implementation">
        <p className="max-w-3xl text-sm leading-8 text-slate-600">
          For global survey organizations with strict IT compliance, we provide bespoke implementation packages including historical spreadsheet reconciliation, private tenant isolation, custom reporting templates, and single sign-on integration. Cargo WMS is a separate specialized offering quoted independently based on warehousing workflow scope.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
          <Link href="/services/data-migration" className="text-ocean-700 hover:text-ocean-900 inline-flex items-center gap-1">
            Data Migration Services <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/services/deployment" className="text-ocean-700 hover:text-ocean-900 inline-flex items-center gap-1">
            Hosting & Deployment Options <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/solutions/cargo-wms" className="text-ocean-700 hover:text-ocean-900 inline-flex items-center gap-1">
            Cargo WMS Custom Scope <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>

      {/* FAQs */}
      <Section eyebrow="Questions" title="Frequently asked pricing & commercial questions">
        <Faq items={PRICING_FAQS} />
      </Section>

      {/* Call to Action */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <CtaRow />
      </div>
    </div>
  );
}
