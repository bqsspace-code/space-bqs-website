import { PageHero, HeroFacts, Chapter, Tiles, Tile } from "../components/Editorial";
import { SectionNav } from "../components/EditorialExtras";
import { ALL_GLOSSARY_TERMS } from "../lib/glossary";
import { routeMetadata } from "../lib/seo-metadata";
import type { ArtKind } from "../components/Editorial";

export const metadata = routeMetadata("/glossary", {
  title: "Marine Bunker Survey Glossary",
  description:
    "Explanations of marine bunker quantity survey terms, including sounding, ullage, tank tables, volume correction factors, BDN, and ROB.",
});

const CATEGORIES: { name: string; lede: string; art: ArtKind; tone: "light" | "white" | "mist" }[] = [
  { name: "Physical Gauging", lede: "How quantity is read from a tank.", art: "gauge", tone: "light" },
  { name: "Calculation & ASTM", lede: "From an observed volume to a corrected quantity.", art: "bars", tone: "white" },
  { name: "Custody & Dispute", lede: "Records that matter when figures are compared.", art: "doc", tone: "mist" },
  { name: "Fuel Sampling & MARPOL", lede: "Sampling terms, kept separate from quantity work.", art: "tank", tone: "white" },
];

const idOf = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function GlossaryPage() {
  return (
    <div>
      <PageHero
        href="/glossary"
        crumb="Glossary"
        eyebrow="Maritime technical terminology"
        title="The bunker survey glossary."
        description="Clear explanations of physical tank gauging methods, ASTM D1250 calculation tables, volume correction factors, custody transfer disputes and MARPOL sampling standards."
        primaryAction={{ href: `#${idOf(CATEGORIES[0].name)}`, label: "Browse terms" }}
        secondaryAction={{ href: "/tools", label: "Open the worksheets" }}
        visual={<HeroFacts title="The glossary" rows={[
          { label: "Terms", value: String(ALL_GLOSSARY_TERMS.length) },
          { label: "Categories", value: String(CATEGORIES.length) },
          { label: "Each links to", value: "Related terms and FAQs" },
        ]} />}
      />

      <SectionNav label="Glossary categories" items={CATEGORIES.map((c) => ({ id: idOf(c.name), label: c.name }))} />

      {CATEGORIES.map((c, i) => {
        const terms = ALL_GLOSSARY_TERMS.filter((t) => t.category === c.name);
        if (terms.length === 0) return null;
        return (
          <Chapter key={c.name} id={idOf(c.name)} index={String(i + 1).padStart(2, "0")} eyebrow={`${terms.length} terms`} title={`${c.name}.`} lede={c.lede} tone={c.tone}>
            <Tiles>
              {terms.map((t) => (
                <Tile key={t.slug} art={c.art} tag={t.standardsReference.split("/")[0].trim()} title={t.term} href={`/glossary/${t.slug}`} cta="Definition">
                  {t.shortDefinition}
                  {t.formula && <span className="mt-4 block rounded-lg bg-[#031038]/90 px-3 py-2 font-mono text-[11px] leading-5 text-[#b9f1e8]">{t.formula}</span>}
                </Tile>
              ))}
            </Tiles>
          </Chapter>
        );
      })}

    </div>
  );
}
