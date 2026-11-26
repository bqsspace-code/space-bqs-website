import type { Metadata } from "next";
import Link from "next/link";
import { Section, CtaRow, AnswerBlock } from "../components/ui";
import EditorialHero, { HeroImage } from "../components/EditorialHero";
import { Calculator, ShieldCheck, Database, FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/features", {
  title: "Bunker Survey Software Features",
  description:
    "Explore Space BQS mobile capture, web review, survey records, calculation inputs, vessel references, and report workflows.",
});

const MODULES = [
  {
    href: "/features/survey-register-dashboard",
    title: "Survey Register & Bunker Dashboard",
    description: "Review bunker survey records and their status in the Space BQS web platform.",
    icon: Database,
    bullets: [
      "View survey records and their workflow status",
      "Manage vessel and survey reference information",
      "Support office review of field survey records",
      "Explore the current register and dashboard in a demo",
    ],
  },
  {
    href: "/features/calculation-audit",
    title: "Bunker Quantity Calculation Workflow",
    description: "Review how tank readings, reference inputs, volume correction, and density appear in the Space BQS calculation workflow.",
    icon: Calculator,
    bullets: [
      "Inspect recorded tank measurements and calculation inputs",
      "Review volume-correction details described by the product",
      "Compare the calculation steps in an illustrative report layout",
      "Confirm production engine and table versions with the product team",
    ],
  },
  {
    href: "/features/vessels-master-data",
    title: "Tank Strapping Tables & Master Data",
    description: "Review vessel particulars and tank reference data used in survey workflows.",
    icon: ShieldCheck,
    bullets: [
      "Keep vessel particulars associated with survey records",
      "Maintain reference information used by the survey team",
      "Review table and reference-data requirements during a product demo",
      "Trim and list are recorded as context; product materials state they are not calculated as corrections",
    ],
  },
  {
    href: "/features/reports-ai",
    title: "PDF and Excel Report Workflows",
    description: "Explore how Space BQS presents bunker survey information in PDF and Excel report workflows for review and handover.",
    icon: FileText,
    bullets: [
      "Explore PDF report workflows",
      "Review Excel report outputs",
      "See the fictional illustrative report layout before requesting a demo",
      "Quantity-survey software; fuel-quality laboratory analysis is outside the stated product scope",
    ],
  },
];

export default function Page() {
  return (
    <div className="space-y-12 pb-20">
      <EditorialHero
        trail={[{ href: "/", label: "Home" }, { href: "/features", label: "Features" }]}
        eyebrow="Platform / capabilities"
        title="A survey record has a journey."
        description="Explore the product areas that support field capture, calculation review, vessel reference data, and report handover—then confirm release-specific details with the product team."
        primaryAction={{ href: "/request-demo", label: "Walk through the platform" }}
        secondaryAction={{ href: "/how-we-measure", label: "Understand the method" }}
        visual={<HeroImage src="/assets/videos/space-bqs-survey-01.webp" alt="View over the deck of a tanker underway at sea" caption="From field context to an office-ready record." position="center" />}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <AnswerBlock>
          <p>
            Space BQS is bunker quantity survey software for marine survey firms and inspection teams. Its product materials describe field capture, office review, vessel reference data, and report workflows. The technical scope of each production feature should be confirmed for the software release being evaluated.
          </p>
        </AnswerBlock>
      </div>

      {/* Modules Grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="sr-only">Explore the product areas</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {MODULES.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <div
                key={module.href}
                className="group relative flex min-h-[330px] flex-col justify-between overflow-hidden rounded-[1.4rem] border border-[#d3e4ee] bg-white p-6 shadow-[0_12px_36px_-28px_rgba(3,42,172,.35)] transition duration-300 hover:-translate-y-1 hover:border-[#81c7d2] hover:shadow-[0_24px_50px_-30px_rgba(3,42,172,.42)] motion-reduce:transform-none motion-reduce:transition-none sm:p-7"
              >
                <span aria-hidden="true" className="absolute -right-2 -top-8 font-display text-[8rem] font-semibold leading-none text-[#eaf4f9]">0{index + 1}</span>
                <div>
                  <div className="relative flex items-start gap-4">
                    <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#eaf4f9] text-[#176a8e]">
                      <IconComponent aria-hidden="true" className="size-5" />
                    </div>
                    <h3 className="max-w-sm pt-1 font-display text-xl font-semibold tracking-tight text-[#031038] sm:text-2xl">
                      {module.title}
                    </h3>
                  </div>
                  <p className="relative mt-5 text-sm leading-7 text-[#52657c]">
                    {module.description}
                  </p>
                  <ul className="relative mt-5 space-y-3 border-t border-[#e5eef3] pt-5">
                    {module.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm leading-6 text-[#435971]">
                        <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#148b98]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative mt-6 border-t border-[#e5eef3] pt-5">
                  <Link
                    href={module.href}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#032aac] underline decoration-[#9bcbd7] underline-offset-4 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#032aac]"
                  >
                    Explore module details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Field to Office Architecture */}
      <Section eyebrow="Workflow" title="From mobile capture to office review">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#d3e4ee] bg-white p-6 sm:p-7">
            <span className="font-mono text-[10px] font-semibold tracking-[.18em] text-[#16879a] uppercase">Step 01 / Field</span>
            <h3 className="font-display mt-8 text-xl font-semibold text-[#031038]">Capture in context</h3>
            <p className="mt-3 text-sm leading-7 text-[#52657c]">
              Surveyors can record tank readings offline and sync their work when connectivity returns.
            </p>
          </div>
          <div className="rounded-2xl border border-[#d3e4ee] bg-white p-6 sm:p-7">
            <span className="font-mono text-[10px] font-semibold tracking-[.18em] text-[#16879a] uppercase">Step 02 / Review</span>
            <h3 className="font-display mt-8 text-xl font-semibold text-[#031038]">Inspect the working</h3>
            <p className="mt-3 text-sm leading-7 text-[#52657c]">
              Space BQS product materials refer to ASTM Table 54B. Confirm the production table edition and calculation details for the release used by your team.
            </p>
          </div>
          <div className="rounded-2xl border border-[#d3e4ee] bg-white p-6 sm:p-7">
            <span className="font-mono text-[10px] font-semibold tracking-[.18em] text-[#16879a] uppercase">Step 03 / Handover</span>
            <h3 className="font-display mt-8 text-xl font-semibold text-[#031038]">Prepare the record</h3>
            <p className="mt-3 text-sm leading-7 text-[#52657c]">
              Product materials describe supervisor review and PDF/Excel report workflows. See the illustrative report layout, which uses fictional data.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <CtaRow />
        </div>
      </Section>
    </div>
  );
}
