import type { Metadata } from "next";
import Link from "next/link";
import { Section, CtaRow, Breadcrumbs, AnswerBlock } from "../components/ui";
import { Calculator, ShieldCheck, Database, FileText, ArrowRight, Smartphone, CheckCircle2 } from "lucide-react";
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/features", label: "Features" }]} />
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            System Capabilities
          </span>
          <span className="text-xs text-slate-500 font-mono">Core Platform</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl lg:text-5xl">
          Space BQS features for bunker survey teams
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Explore mobile capture, web review, calculation inputs, vessel references, and PDF/Excel report workflows.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnswerBlock>
          <p>
            Space BQS is bunker quantity survey software for marine survey firms and inspection teams. Its product materials describe field capture, office review, vessel reference data, and report workflows. The technical scope of each production feature should be confirmed for the software release being evaluated.
          </p>
        </AnswerBlock>
      </div>

      {/* Modules Grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {MODULES.map((module) => {
            const IconComponent = module.icon;
            return (
              <div
                key={module.href}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-ocean-600 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-ocean-950">
                      {module.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                    {module.description}
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                    {module.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-xs text-slate-700 leading-normal">
                        <CheckCircle2 className="h-4 w-4 text-ocean-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <Link
                    href={module.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-700 hover:text-ocean-900"
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
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <span className="font-mono text-xs font-semibold text-ocean-700 uppercase">Step 1: Field capture</span>
            <h3 className="font-display mt-2 text-lg font-bold text-ocean-950">Offline survey input</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Surveyors can record tank readings offline and sync their work when connectivity returns.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <span className="font-mono text-xs font-semibold text-ocean-700 uppercase">Step 2: Calculation</span>
            <h3 className="font-display mt-2 text-lg font-bold text-ocean-950">Review the calculation inputs</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Space BQS product materials refer to ASTM Table 54B. Confirm the production table edition and calculation details for the release used by your team.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <span className="font-mono text-xs font-semibold text-ocean-700 uppercase">Step 3: Office workflow</span>
            <h3 className="font-display mt-2 text-lg font-bold text-ocean-950">Review and report</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
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
