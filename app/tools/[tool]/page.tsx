import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { PageHero, Chapter, Checklist } from "../../components/Editorial";
import { FaqList, Formula } from "../../components/EditorialExtras";
import { TOOLS } from "../../lib/tools";
import { routeMetadata } from "../../lib/seo-metadata";

const SurveyTool = dynamic(() => import("@/components/ui/survey-tool"), { loading: () => <ToolSkeleton /> });
const BdnExampleTool = dynamic(() => import("@/components/ui/bdn-example-tool"), { loading: () => <ToolSkeleton /> });

function ToolSkeleton() {
  return <div aria-hidden="true" className="h-96 animate-pulse rounded-[1.6rem] bg-[#dbe9f2]/70" />;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ tool: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool } = await params;
  const config = TOOLS.find((item) => item.slug === tool);
  if (!config) return {};
  return routeMetadata(`/tools/${config.slug}`, {
    title: `${config.title} Calculator`,
    description: config.description,
  });
}

export default async function Page({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  const config = TOOLS.find((item) => item.slug === tool);
  if (!config) notFound();

  return (
    <div>
      <PageHero
        href={`/tools/${config.slug}`}
        crumb={config.title}
        parent={{ href: "/tools", label: "Tools" }}
        eyebrow="Interactive worksheet"
        title={config.title}
        description={config.description}
        primaryAction={{ href: "#worksheet", label: "Open the worksheet" }}
        secondaryAction={{ href: "/tools", label: "Choose another tool" }}
      />

      <Chapter id="worksheet" index="01" eyebrow="Interactive worksheet" title="Edit the inputs. Inspect the result." lede="Values update in your browser. The worksheet displays the formula and provides a CSV download when the inputs are valid.">
        <div className="glass-card rounded-[1.8rem] p-4 sm:p-7">
          {config.slug === "bdn-discrepancy" ? (
            <Suspense fallback={<ToolSkeleton />}><BdnExampleTool /></Suspense>
          ) : <SurveyTool tool={config.slug} />}
        </div>
      </Chapter>

      <Chapter index="02" eyebrow="Methodology" title="Formula and calculation notes." tone="white" lede={`Method context: ${config.standards}`}>
        <div className="space-y-5">
          <Formula label="Mathematical expression" expr={config.formula} note={`Note: ${config.note}`} />
          <Checklist title="Worksheet guidance" items={config.guidance} />
        </div>
      </Chapter>

      <Chapter index="03" eyebrow="Illustrative example" title="A worked calculation." tone="mist" lede="Hypothetical values to show the arithmetic. Not a verified survey or a settlement.">
        <div className="space-y-5">
          <Checklist title="Reference parameters" items={config.workedExample.inputs.map((input) => <span key={input} className="font-mono text-sm">{input}</span>)} />
          <Formula label="Step-by-step arithmetic" expr={config.workedExample.calculation} note={<>Illustrative result: <strong className="font-mono text-[#032aac]">{config.workedExample.output}</strong></>} />
        </div>
      </Chapter>

      <Chapter index="04" eyebrow="FAQ" title="Questions about this worksheet." tone="white">
        <FaqList items={config.faqs} />
      </Chapter>

    </div>
  );
}
