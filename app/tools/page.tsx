import type { Metadata } from "next";
import { MarketingHeader, MarketingCard } from "../components/MarketingPage";
import { Section } from "../components/ui";
import { TOOLS } from "../lib/tools";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/tools", { title: "Bunker Survey Calculators and Worksheets", description: "Use browser-based worksheets for volume-to-mass calculations, BDN differences, ROB balance, and marine unit conversions." });

export default function Page() {
  return <div className="bg-[#f7fbfd]"><MarketingHeader parent="/resources" parentLabel="Resources" eyebrow="Survey tools" title="Check the numbers. See the working." description="Practical browser worksheets for quantity checks. Edit the inputs, inspect the formula, and download the result as CSV. No login or upload required." /><Section title="Choose a worksheet"><div className="grid gap-6 md:grid-cols-2">{TOOLS.map((tool) => <MarketingCard key={tool.slug} title={tool.title} href={`/tools/${tool.slug}`} linkLabel="Open tool">{tool.description}</MarketingCard>)}</div><p className="mt-8 max-w-3xl text-sm leading-7 text-[#60748a]">These are arithmetic worksheets, separate from the production survey application. They use the inputs described on each tool page and do not create survey records or issue reports.</p></Section></div>;
}
