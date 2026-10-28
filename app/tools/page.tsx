import type { Metadata } from "next";
import { MarketingHeader, MarketingCard } from "../components/MarketingPage";
import { Section } from "../components/ui";
import { TOOLS } from "../lib/tools";

export const metadata: Metadata = { title: "Bunker Survey Tools — Calculators & Worksheets", description: "Volume-to-mass worksheet with supplied VCF, BDN discrepancy, ROB balance, and marine unit conversions. Free browser tools with CSV export." };

export default function Page() {
  return <div className="bg-[#f7fbfd]"><MarketingHeader parent="/resources" parentLabel="Resources" eyebrow="Survey tools" title="Check the numbers. See the working." description="Practical browser worksheets for quantity checks. Edit the inputs, inspect the formula, and download the result as CSV. No login or upload required." /><Section title="Choose a worksheet"><div className="grid gap-6 md:grid-cols-2">{TOOLS.map((tool) => <MarketingCard key={tool.slug} title={tool.title} href={`/tools/${tool.slug}`} linkLabel="Open tool">{tool.description}</MarketingCard>)}</div><p className="mt-8 max-w-3xl text-sm leading-7 text-[#60748a]">These are transparent arithmetic tools, separate from the production survey engine. They do not access vessel tables, create survey records, or issue certified results.</p></Section></div>;
}
