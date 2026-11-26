import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SurveyTool from "@/components/ui/survey-tool";
import BdnExampleTool from "@/components/ui/bdn-example-tool";
import { Suspense } from "react";
import { MarketingHeader } from "../../components/MarketingPage";
import { Section, Faq, CtaRow } from "../../components/ui";
import { TOOLS } from "../../lib/tools";
import { routeMetadata } from "../../lib/seo-metadata";
import { CheckCircle2, BookOpen, Calculator, ShieldCheck } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ tool: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool } = await params;
  const config = TOOLS.find((item) => item.slug === tool);
  if (!config) return {};
  return routeMetadata(`/tools/${config.slug}`, {
    title: `${config.title} Calculator`,
    description: config.description,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  const config = TOOLS.find((item) => item.slug === tool);
  if (!config) notFound();

  return (
    <div className="bg-[#f7fbfd]">
      <MarketingHeader
        parent="/tools"
        parentLabel="Tools"
        eyebrow={config.title}
        title={config.title}
        description={config.description}
      />

      {/* Interactive Tool Widget */}
      <Section>
        {config.slug === "bdn-discrepancy" ? (
          <Suspense fallback={<SurveyTool tool="bdn-discrepancy" />}>
            <BdnExampleTool />
          </Suspense>
        ) : <SurveyTool tool={config.slug} />}
      </Section>

      {/* Methodology & Formula */}
      <Section eyebrow="Methodology" title="Formula and calculation notes">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800 font-mono">
              Method context: {config.standards}
            </span>
          </div>
          <h3 className="font-display text-lg font-bold text-ocean-950">
            Mathematical Expression
          </h3>
          <div className="mt-3 rounded-xl bg-slate-50 p-4 font-mono text-sm text-ocean-950 border border-slate-200">
            {config.formula}
          </div>
          <p className="mt-3 text-xs text-slate-500 leading-relaxed italic">
            Note: {config.note}
          </p>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-700 font-mono mb-4">
              Worksheet guidance
            </h4>
            <ul className="space-y-3">
              {config.guidance.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 text-ocean-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Worked Benchmark Example */}
      <Section eyebrow="Illustrative example" title="Worked calculation example">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <h3 className="font-display text-base font-bold text-ocean-950 mb-3 flex items-center gap-2">
            <Calculator className="h-4 w-4 text-ocean-600" /> Reference Parameters
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {config.workedExample.inputs.map((input, idx) => (
              <div key={idx} className="rounded-lg bg-slate-50 p-3 text-xs text-slate-700 border border-slate-100 font-mono">
                {input}
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-slate-100 pt-4">
            <p className="text-xs font-mono uppercase text-slate-500">Step-by-step arithmetic:</p>
            <p className="mt-1 font-mono text-xs text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100">
              {config.workedExample.calculation}
            </p>
          </div>
          <div className="mt-4 rounded-xl bg-ocean-50 p-4 border border-ocean-200 flex items-center justify-between">
            <span className="text-xs font-semibold text-ocean-900">Result Output:</span>
            <span className="font-mono text-sm font-bold text-ocean-700">
              {config.workedExample.output}
            </span>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section eyebrow="FAQ" title="Frequently Asked Questions">
        <Faq items={config.faqs} />
      </Section>

      {/* CTA Row */}
      <Section>
        <CtaRow />
      </Section>
    </div>
  );
}
