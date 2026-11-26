import type { Metadata } from "next";
import EditorialHero from "../components/EditorialHero";
import { MarketingCard } from "../components/MarketingPage";
import { Section } from "../components/ui";
import { TOOLS } from "../lib/tools";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/tools", {
  title: "Bunker Survey Calculators and Worksheets",
  description: "Use browser-based worksheets for volume-to-mass calculations, BDN differences, ROB balance, and marine unit conversions.",
});

export default function Page() {
  return (
    <div className="bg-[#f7fbfd]">
      <EditorialHero
        trail={[{ href: "/", label: "Home" }, { href: "/resources", label: "Resources" }, { href: "/tools", label: "Tools" }]}
        eyebrow="Browser worksheets / no account required"
        title="Check the numbers. See the working."
        description="Use focused, local worksheets for quantity arithmetic and unit conversion. Adjust the inputs, inspect each formula, and download a CSV copy when the entries are valid."
        primaryAction={{ href: "#worksheets", label: "Choose a worksheet" }}
        secondaryAction={{ href: "/how-we-measure", label: "Read the method notes" }}
      />
      <Section eyebrow="Choose a calculation" title="Four small tools. One clear scope." lede="Each worksheet does one job and shows its arithmetic. Pick the calculation that matches the question in front of you.">
        <div id="worksheets" className="grid scroll-mt-28 gap-4 md:grid-cols-2">
          {TOOLS.map((tool, index) => (
            <div key={tool.slug} className="relative">
              <span aria-hidden="true" className="absolute right-6 top-5 z-10 font-mono text-[10px] tracking-[.2em] text-[#16879a]">0{index + 1}</span>
              <MarketingCard title={tool.title} href={`/tools/${tool.slug}`} linkLabel="Open worksheet">
                {tool.description}
                <p className="mt-4 border-t border-[#e5eef3] pt-4 text-xs leading-6 text-[#6c8197]">{tool.standards}</p>
              </MarketingCard>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-[#d3e4ee] bg-[#eaf4f9] p-5 sm:p-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#176a8e]">Scope note</p>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-[#405771]">These are arithmetic worksheets, separate from the production survey application. They run in your browser, do not create survey records, and do not issue reports or determine contractual outcomes.</p>
        </div>
      </Section>
    </div>
  );
}
