import type { Metadata } from "next";
import { PageHero, HeroFacts, Chapter, Tiles, Tile, Notice, type ArtKind } from "../components/Editorial";
import { SectionNav } from "../components/EditorialExtras";
import { RESOURCES } from "../lib/resources";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/resources", {
  title: "Bunker Survey Resources and Guides",
  description: "Explore plain-language bunker survey guides on tank readings, calculations, BDN comparisons, ROB, reports, and standards context.",
});

const GROUPS: { id: string; title: string; lede: string; art: ArtKind; tone: "light" | "white" | "mist"; slugs: string[] }[] = [
  { id: "foundations", title: "Start with the fundamentals.", lede: "Understand the survey and the language used in the records.", art: "doc", tone: "light", slugs: ["what-is-bunker-quantity-survey", "glossary-10-terms"] },
  { id: "measurements", title: "Measurements and methods.", lede: "Tank readings, volume correction, and measurement approaches.", art: "gauge", tone: "white", slugs: ["ullage-vs-sounding", "temperature-correction-explained", "mass-flow-meters-vs-tank-sounding"] },
  { id: "delivery", title: "Delivery records and comparisons.", lede: "Compare survey records with delivery information and organise review.", art: "bars", tone: "mist", slugs: ["bdn-vs-actual", "bunker-shortage-claim-checklist", "cappuccino-effect-bunker-survey", "what-a-bunker-survey-report-contains"] },
  { id: "rob", title: "ROB and charter periods.", lede: "Keep opening and closing ROB, movements and reporting periods in view.", art: "tank", tone: "white", slugs: ["rob-checklist", "on-off-hire-fuel-settlement", "rob-vs-bunker-delivery-survey"] },
  { id: "standards", title: "Standards and port context.", lede: "Read standards context separately from software claims or approval.", art: "shield", tone: "mist", slugs: ["standards-in-plain-english", "singapore-ss600-bunker-surveying-standard"] },
  { id: "working-with-data", title: "Working with digital records.", lede: "Repeatable arithmetic, inputs and review in software workflows.", art: "sync", tone: "white", slugs: ["reduce-spreadsheet-errors-in-bunker-surveys"] },
];

export default function Page() {
  const bySlug = new Map(RESOURCES.map((r) => [r.slug, r]));
  const grouped = new Set(GROUPS.flatMap((g) => g.slugs));
  const more = RESOURCES.filter((r) => !grouped.has(r.slug));
  const groups = GROUPS.map((g) => ({ ...g, guides: g.slugs.map((s) => bySlug.get(s)).filter((x) => x !== undefined) })).filter((g) => g.guides.length > 0);

  return (
    <div>
      <PageHero
        href="/resources"
        crumb="Resources"
        eyebrow="Field notes / calculation context / report review"
        title="Useful answers for the work behind every survey."
        description="Plain-language guides to tank readings, bunker quantity calculations, delivery comparisons, ROB and standards context. Start with a question and follow the references that matter to your workflow."
        primaryAction={{ href: "#foundations", label: "Browse the guide library" }}
        secondaryAction={{ href: "/tools", label: "Open the worksheets" }}
        visual={<HeroFacts title="The library" rows={[
          { label: "Guides", value: String(RESOURCES.length) },
          { label: "Topics", value: String(groups.length) },
          { label: "Plus", value: "Worksheets and a glossary" },
        ]} />}
      />

      <SectionNav label="Guide topics" items={groups.map((g) => ({ id: g.id, label: g.title.replace(/\.$/, "") }))} />

      {groups.map((g, i) => (
        <Chapter key={g.id} id={g.id} index={String(i + 1).padStart(2, "0")} eyebrow="Guides" title={g.title} lede={g.lede} tone={g.tone}>
          <Tiles>
            {g.guides.map((guide) => (
              <Tile key={guide.slug} art={g.art} tag={`Guide · updated ${guide.updated}`} title={guide.title} href={`/resources/${guide.slug}`} cta="Read guide">
                {guide.description}
              </Tile>
            ))}
          </Tiles>
        </Chapter>
      ))}

      {more.length > 0 && (
        <Chapter index={String(groups.length + 1).padStart(2, "0")} eyebrow="More" title="More guides." tone="light">
          <Tiles>
            {more.map((guide) => (
              <Tile key={guide.slug} art="doc" tag={`Guide · updated ${guide.updated}`} title={guide.title} href={`/resources/${guide.slug}`} cta="Read guide">{guide.description}</Tile>
            ))}
          </Tiles>
        </Chapter>
      )}

      <Chapter index="Note" eyebrow="Read with care" title="Guides are context, not rulings." tone="dark">
        <Notice label="Reminder">Standards and product implementation details should always be checked against the current source and release. Nothing here is legal advice or an approval of any survey.</Notice>
      </Chapter>

    </div>
  );
}
