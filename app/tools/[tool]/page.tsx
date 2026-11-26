import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SurveyTool from "@/components/ui/survey-tool";
import BdnExampleTool from "@/components/ui/bdn-example-tool";
import { Suspense } from "react";
import { MarketingHeader } from "../../components/MarketingPage";
import { Section, Faq, CtaRow } from "../../components/ui";
import { TOOLS } from "../../lib/tools";
import { routeMetadata } from "../../lib/seo-metadata";
import { CheckCircle2, Calculator } from "lucide-react";

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
        currentHref={`/tools/${config.slug}`}
        parent="/tools"
        parentLabel="Tools"
        eyebrow={config.title}
        title={config.title}
        description={config.description}
        visual={null}
        primaryAction={{ href: "#worksheet", label: "Open the worksheet" }}
        secondaryAction={{ href: "/tools", label: "Choose another tool" }}
      />

      {/* Interactive Tool Widget */}
      <div id="worksheet" className="scroll-mt-24">
        <Section eyebrow="Interactive worksheet" title="Edit the inputs. Inspect the result." lede="Values update in your browser. The worksheet displays the formula and provides a CSV download when the inputs are valid.">
          {config.slug === "bdn-discrepancy" ? (
            <Suspense fallback={<SurveyTool tool="bdn-discrepancy" />}>
              <BdnExampleTool />
            </Suspense>
          ) : <SurveyTool tool={config.slug} />}
        </Section>
      </div>

      {/* Methodology & Formula */}
      <Section eyebrow="Methodology" title="Formula and calculation notes">
        <div className="rounded-2xl border border-[#d3e4ee] bg-white p-6 shadow-[0_12px_36px_-28px_rgba(3,42,172,.35)] sm:p-8">
          <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex rounded-full border border-[#c6ddec] bg-[#eaf4f9] px-3 py-2 text-[10px] font-semibold leading-5 text-[#176a8e] font-mono">
              Method context: {config.standards}
            </span>
          </div>
          <h3 className="font-display text-xl font-semibold text-[#031038]">
            Mathematical Expression
          </h3>
          <div className="mt-3 overflow-x-auto rounded-xl border border-[#d3e4ee] bg-[#f4f8fb] p-4 font-mono text-sm leading-7 text-[#031038]">
            {config.formula}
          </div>
          <p className="mt-3 text-sm leading-7 text-[#60748a]">
            Note: {config.note}
          </p>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-700 font-mono mb-4">
              Worksheet guidance
            </h4>
            <ul className="space-y-3">
              {config.guidance.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm leading-7 text-[#435971]">
                  <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#148b98]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Worked Benchmark Example */}
      <Section eyebrow="Illustrative example" title="Worked calculation example">
        <div className="rounded-2xl border border-[#d3e4ee] bg-white p-6 shadow-[0_12px_36px_-28px_rgba(3,42,172,.35)] sm:p-8">
          <h3 className="font-display text-xl font-semibold text-[#031038] mb-4 flex items-center gap-2">
            <Calculator aria-hidden="true" className="size-5 text-[#16879a]" /> Reference parameters
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {config.workedExample.inputs.map((input, idx) => (
              <div key={idx} className="rounded-xl border border-[#e1ebf1] bg-[#f7fbfd] p-4 text-sm leading-6 text-[#435971] font-mono">
                {input}
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-slate-100 pt-4">
            <p className="text-[10px] font-mono uppercase tracking-[.16em] text-slate-500">Step-by-step arithmetic</p>
            <p className="mt-2 overflow-x-auto rounded-xl border border-[#e1ebf1] bg-[#f7fbfd] p-4 font-mono text-sm leading-7 text-[#031038]">
              {config.workedExample.calculation}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#b8dbea] bg-[#eaf4f9] p-4">
            <span className="text-sm font-semibold text-[#176a8e]">Illustrative result</span>
            <span className="font-mono text-base font-bold text-[#032aac]">
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
