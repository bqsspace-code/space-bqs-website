import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SurveyTool from "@/components/ui/survey-tool";
import { MarketingHeader } from "../../components/MarketingPage";
import { Section } from "../../components/ui";
import { TOOLS } from "../../lib/tools";

export const dynamicParams = false;
export function generateStaticParams() { return TOOLS.map((tool) => ({ tool: tool.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool } = await params;
  const config = TOOLS.find((item) => item.slug === tool);
  return { title: `${config?.title ?? "Worksheet"} — Bunker Survey Tools`, description: config?.description };
}
export default async function Page({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  const config = TOOLS.find((item) => item.slug === tool);
  if (!config) notFound();
  return <div className="bg-[#f7fbfd]"><MarketingHeader parent="/tools" parentLabel="Tools" eyebrow={config.title} title={config.title} description={config.description} /><Section><SurveyTool tool={config.slug} /></Section></div>;
}
