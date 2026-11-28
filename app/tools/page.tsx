import type { Metadata } from "next";
import { PageHero, HeroFacts, Chapter, Tiles, Tile, Notice, Checklist, type ArtKind } from "../components/Editorial";
import { TOOLS } from "../lib/tools";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/tools", {
  title: "Bunker Survey Calculators and Worksheets",
  description: "Use browser-based worksheets for volume-to-mass calculations, BDN differences, ROB balance, and marine unit conversions.",
});

const ART: ArtKind[] = ["gauge", "bars", "sync", "tank", "flow", "wave"];

export default function Page() {
  return (
    <div>
      <PageHero
        href="/tools"
        crumb="Tools"
        parent={{ href: "/resources", label: "Resources" }}
        eyebrow="Browser worksheets / no account required"
        title="Check the numbers. See the working."
        description="Focused, local worksheets for quantity arithmetic and unit conversion. Adjust the inputs, inspect each formula, and download a CSV copy when the entries are valid."
        primaryAction={{ href: "#worksheets", label: "Choose a worksheet" }}
        secondaryAction={{ href: "/how-we-measure", label: "Read the method notes" }}
        visual={<HeroFacts title="How the worksheets behave" rows={[
          { label: "Runs", value: "In your browser" },
          { label: "Shows", value: "Every formula" },
          { label: "Exports", value: "CSV copy" },
          { label: "Stores", value: "Nothing" },
        ]} />}
      />

      <Chapter id="worksheets" index="01" eyebrow="Choose a calculation" title={`${TOOLS.length} small tools. One clear scope.`} lede="Each worksheet does one job and shows its arithmetic. Pick the one that matches the question in front of you.">
        <Tiles>
          {TOOLS.map((tool, i) => (
            <Tile key={tool.slug} art={ART[i % ART.length]} tag={`Worksheet ${String(i + 1).padStart(2, "0")}`} title={tool.title} href={`/tools/${tool.slug}`} cta="Open worksheet" tone={i % 4 === 0 ? "accent" : i % 4 === 3 ? "dark" : "light"}>
              {tool.description}
              <span className="mt-4 block border-t border-current/15 pt-3 text-xs leading-6 opacity-70">{tool.standards}</span>
            </Tile>
          ))}
        </Tiles>
      </Chapter>

      <Chapter index="02" eyebrow="Scope" title="What a worksheet is, and is not." tone="white">
        <div className="space-y-5">
          <Checklist items={[
            "Arithmetic helpers, separate from the production survey application",
            "Run in your browser and create no survey records",
            "Show the formula so you can check it independently",
          ]} />
          <Notice>They do not issue reports or determine contractual outcomes. For how the production calculation is described, read <a className="font-semibold text-[#032aac] underline underline-offset-4" href="/how-we-measure">how we measure</a>.</Notice>
        </div>
      </Chapter>

    </div>
  );
}
