import type { Metadata } from "next";
import { Section, CtaRow, Breadcrumbs, AnswerBlock, Faq } from "../components/ui";
import Link from "next/link";
import EditorialHero from "../components/EditorialHero";
import { ArrowRight, CheckCircle2, ClipboardList, Database, FileSpreadsheet, Users } from "lucide-react";
import ProductSchema from "../components/ProductSchema";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/pricing", {
  title: "Pricing for Survey Firms",
  description:
    "Learn how Space BQS team licensing is scoped for bunker survey firms. Discuss surveyor seats, volume, and rollout requirements.",
});

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
    <div className="bg-[#f7fbfd] pb-16">
      <ProductSchema />
      <EditorialHero
        trail={[{ href: "/", label: "Home" }, { href: "/pricing", label: "Pricing" }]}
        eyebrow="Commercial model / team licensing"
        title="Licensing shaped around your survey operation."
        description="Space BQS does not publish fixed prices on this page. Start a conversation about the people, survey workflows, and rollout requirements your team needs to evaluate."
        primaryAction={{ href: "/request-demo", label: "Discuss licensing" }}
        secondaryAction={{ href: "/sample-report", label: "Review a sample report" }}
      />

      <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-6">
        <AnswerBlock>
          <p>
            Space BQS is bunker quantity survey software for marine survey firms. Licensing is discussed with the team; pricing, availability, and any pilot scope should be confirmed directly before a purchase decision.
          </p>
        </AnswerBlock>
      </div>

      <Section eyebrow="Evaluation" title="What to bring to the first conversation" lede="A few details help the team understand fit. You do not need a finalized implementation plan to start the discussion.">
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-[#d3e4ee] bg-white p-6 shadow-sm sm:p-7">
            <span className="grid size-11 place-items-center rounded-xl bg-[#eaf4f9] text-[#176a8e]"><Users aria-hidden="true" className="size-5" /></span>
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#16879a]">01 / Team</p>
            <h2 className="mt-2 font-display text-xl font-semibold text-[#031038]">Who will use it?</h2>
            <p className="mt-2 text-sm leading-7 text-[#52657c]">Share your organization type, approximate number of field surveyors, and who reviews survey records in the office.</p>
          </article>
          <article className="rounded-2xl border border-[#d3e4ee] bg-white p-6 shadow-sm sm:p-7">
            <span className="grid size-11 place-items-center rounded-xl bg-[#eaf4f9] text-[#176a8e]"><FileSpreadsheet aria-hidden="true" className="size-5" /></span>
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#16879a]">02 / Workflow</p>
            <h2 className="mt-2 font-display text-xl font-semibold text-[#031038]">What work do you do?</h2>
            <p className="mt-2 text-sm leading-7 text-[#52657c]">Describe your delivery, ROB, or debunkering workflows and an approximate survey volume if you know it.</p>
          </article>
          <article className="rounded-2xl border border-[#d3e4ee] bg-white p-6 shadow-sm sm:p-7">
            <span className="grid size-11 place-items-center rounded-xl bg-[#eaf4f9] text-[#176a8e]"><Database aria-hidden="true" className="size-5" /></span>
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#16879a]">03 / Rollout</p>
            <h2 className="mt-2 font-display text-xl font-semibold text-[#031038]">What needs evaluation?</h2>
            <p className="mt-2 text-sm leading-7 text-[#52657c]">Mention vessel reference data, migration questions, integrations, and hosting or deployment requirements to discuss.</p>
          </article>
        </div>
      </Section>

      <Section bg="mist" eyebrow="Product scope" title="Review the workflows before discussing licensing">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="rounded-2xl border border-[#d3e4ee] bg-white p-6 sm:p-8">
            <ul className="space-y-4">
              {["Mobile capture for bunker quantity survey work", "Web review and survey record workflows", "PDF and Excel report workflows", "Delivery, ROB, and debunkering survey types"].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[#405771]"><CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#148b98]" /><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#d3e4ee] bg-white p-5">
              <span className="grid size-9 place-items-center rounded-lg bg-[#eaf4f9] text-[#176a8e]"><ClipboardList aria-hidden="true" className="size-4" /></span>
              <h2 className="mt-3 font-display text-lg font-semibold text-[#031038]">A pilot is a discussion, not a published offer</h2>
              <p className="mt-2 text-sm leading-6 text-[#52657c]">Ask whether a pilot is available and confirm its scope, timing, and commercial terms with the Space BQS team.</p>
            </div>
            <p className="text-xs leading-6 text-[#60748a]">Capabilities, pricing, availability, deployment options, and any migration scope should be confirmed for your proposed engagement.</p>
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

      <Section eyebrow="Next step" title="Get a proposal conversation started" lede="Tell us about your operation and the questions you want answered. Confirm all commercial and technical terms with the team.">
        <CtaRow />
      </Section>
    </div>
  );
}
