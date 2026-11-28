import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, Chapter, Tiles, Tile, Notice, HeroArt } from "@/app/components/Editorial";
import { FaqList, Formula } from "@/app/components/EditorialExtras";
import { ALL_GLOSSARY_TERMS, getGlossaryTerm } from "@/app/lib/glossary";
import { SITE_URL } from "@/app/lib/site";
import { routeMetadata } from "@/app/lib/seo-metadata";

export function generateStaticParams() {
  return ALL_GLOSSARY_TERMS.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ term: string }>;
}): Promise<Metadata> {
  const { term } = await params;
  const t = getGlossaryTerm(term);
  if (!t) return {};

  return routeMetadata(`/glossary/${t.slug}`, {
    title: `${t.term} — Marine BQS Definition`,
    description: `${t.shortDefinition} Standards reference: ${t.standardsReference}.`,
    openGraph: { type: "article" },
  });
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ term: string }>;
}) {
  const { term } = await params;
  const t = getGlossaryTerm(term);
  if (!t) notFound();

  // Structured Data Schema (DefinedTerm, TechArticle, FAQPage)
  const schemaGraph: any[] = [
    {
      "@type": "DefinedTerm",
      "@id": `${SITE_URL}/glossary/${t.slug}#term`,
      "name": t.term,
      "description": t.shortDefinition,
      "inDefinedTermSet": {
        "@type": "DefinedTermSet",
        "name": "Space BQS Marine Sounding & BQS Glossary",
        "url": `${SITE_URL}/glossary`,
      },
    },
    {
      "@type": "TechArticle",
      "@id": `${SITE_URL}/glossary/${t.slug}#article`,
      "headline": `What is ${t.term} in Marine Bunker Quantity Surveying?`,
      "description": t.shortDefinition,
      "url": `${SITE_URL}/glossary/${t.slug}`,
      "author": {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
      },
      "publisher": { "@id": `${SITE_URL}/#organization` },
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": schemaGraph,
  };

  const relatedTerms = t.relatedTermSlugs
    .map((slug) => getGlossaryTerm(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHero
        href={`/glossary/${t.slug}`}
        crumb={t.term}
        parent={{ href: "/glossary", label: "Glossary" }}
        eyebrow={`${t.category} \u00b7 Ref: ${t.standardsReference}`}
        title={t.term}
        description={t.shortDefinition}
        primaryAction={{ href: "/glossary", label: "All terms" }}
        secondaryAction={{ href: "/tools", label: "Try a worksheet" }}
        visual={<HeroArt kind="doc" title="Glossary" caption="Definition, formula, related terms." />}
      />

      <Chapter index="01" eyebrow="Definition" title={`What ${t.term} means.`}>
        <div className="space-y-5">
          <Notice label="Definition">{t.shortDefinition}</Notice>
          {t.formula && <Formula label="Standard mathematical formula" expr={t.formula} />}
        </div>
      </Chapter>

      <Chapter index="02" eyebrow="In practice" title="Operational meaning and industry practice." tone="white">
        <div className="space-y-6">
          <p className="max-w-2xl text-[17px] leading-8 text-[#31485f]">{t.fullExplanation}</p>
          <Notice label="Standards reference">This measurement principle relates to <span className="font-mono font-medium">{t.standardsReference}</span>. Space BQS product materials refer to these parameters; confirm the implementation and edition for the release your team uses, and check the standard itself for the applicable edition.</Notice>
        </div>
      </Chapter>

      {t.faqs && t.faqs.length > 0 && (
        <Chapter index="03" eyebrow="FAQ" title={`Questions about ${t.term}.`} tone="mist">
          <FaqList items={t.faqs} />
        </Chapter>
      )}

      {relatedTerms.length > 0 && (
        <Chapter index={t.faqs && t.faqs.length > 0 ? "04" : "03"} eyebrow="Related" title="Related marine and calculation terms." tone="white">
          <Tiles>
            {relatedTerms.map((rt) => (
              <Tile key={rt.slug} art="doc" tag={rt.category} title={rt.term} href={`/glossary/${rt.slug}`} cta="Read definition">{rt.shortDefinition}</Tile>
            ))}
          </Tiles>
        </Chapter>
      )}

    </div>
  );
}
