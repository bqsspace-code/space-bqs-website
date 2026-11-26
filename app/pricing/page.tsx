import type { Metadata } from "next";
import { Section, CtaRow, Breadcrumbs, AnswerBlock, Faq } from "../components/ui";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, Users, FileSpreadsheet, Lock, HelpCircle, ArrowRight, Layers } from "lucide-react";
import pricingSchema from "@/schema/05_pricing.json";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/pricing", {
  title: "Pricing for Survey Firms",
  description:
    "Learn how Space BQS team licensing is scoped for bunker survey firms. Discuss surveyor seats, volume, and rollout requirements.",
});

const LICENSING_TIERS = [
  {
    name: "Team licensing",
    badge: "Scoped with your survey firm",
    description: "Space BQS licensing is discussed around your team and survey operation. Request a quote for your requirements.",
    features: [
      "Mobile capture and a web platform for survey review",
      "Bunker delivery, ROB, and debunkering workflows",
      "PDF and Excel report workflows",
      "A pilot can be discussed to evaluate the product with your team",
    ],
    highlight: false,
  },
];

const PRICING_FAQS = [
  {
    q: "Does Space BQS publish fixed prices?",
    a: "No fixed prices are listed on this page. Contact Space BQS with your team and workflow requirements to discuss licensing.",
  },
  {
    q: "What information should I provide for a quote?",
    a: "Share your organization type, team size, approximate survey volume, and the delivery, ROB, or debunkering workflows you use. You can provide these details in the demo request form.",
  },
  {
    q: "Can I request a pilot?",
    a: "Contact the Space BQS team to discuss whether a pilot is available and what its setup and evaluation scope would be.",
  },
];

export default function Page() {
  return (
    <div className="space-y-12 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      {/* Header */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/pricing", label: "Pricing" }]} />
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            Commercial Model
          </span>
          <span className="text-xs text-slate-500 font-mono">Team licensing</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl lg:text-5xl">
          Bunker survey software licensing for marine survey firms
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Space BQS is offered under team licensing. Discuss your survey workflows, team size, volume, and rollout requirements with us.
        </p>
      </div>

      {/* Answer Block */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnswerBlock>
          <p>
            Space BQS is bunker quantity survey software for marine survey firms. Team licensing is scoped through a conversation about the organization, survey workflows, and team requirements.
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
                  href="/request-demo#pilot"
                  className={`w-full inline-flex justify-center items-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold transition-all ${
                    tier.highlight
                      ? "bg-ocean-700 text-white hover:bg-ocean-800 shadow-sm"
                      : "bg-white border border-slate-300 text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  Discuss a pilot <ArrowRight className="h-4 w-4" />
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
              Count of deck surveyors using the offline mobile app and operations supervisors reviewing and finalising survey reports.
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
              <Layers className="h-4 w-4 text-ocean-600" /> Reference data and rollout scope
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Discuss the vessel reference data your team uses, its format, and any setup requirements for a pilot or rollout.
            </p>
          </div>
        </div>
      </Section>

      {/* Implementation & Infrastructure Services */}
      <Section eyebrow="Rollout" title="Discuss your implementation requirements">
        <p className="max-w-3xl text-sm leading-8 text-slate-600">
          Data migration and deployment requirements can be discussed with your team. Confirm the available hosting and integration scope for your project before making a purchase decision.
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
