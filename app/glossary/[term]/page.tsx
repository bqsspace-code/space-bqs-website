import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs, AnswerBlock, Section, Faq, CtaRow } from "@/app/components/ui";
import { ALL_GLOSSARY_TERMS, getGlossaryTerm } from "@/app/lib/glossary";
import { SITE_URL } from "@/app/lib/site";
import { routeMetadata } from "@/app/lib/seo-metadata";
import { BookOpen, ShieldCheck, ArrowRight, FileText, CheckCircle2, Calculator } from "lucide-react";

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
    <div className="space-y-12 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Header */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/glossary", label: "Glossary" },
            { href: `/glossary/${t.slug}`, label: t.term },
          ]}
        />

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            {t.category}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-mono text-slate-700">
            Ref: {t.standardsReference}
          </span>
        </div>

        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl lg:text-5xl">
          {t.term}
        </h1>
      </div>

      {/* Direct Answer Block (AI Search & Citation Target) */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <AnswerBlock>
          <p>
            <strong>Definition:</strong> {t.shortDefinition}
          </p>
        </AnswerBlock>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8">
        {/* Formula Box */}
        {t.formula && (
          <div className="rounded-2xl border border-ocean-200 bg-ocean-50/60 p-5">
            <div className="flex items-center gap-2 text-ocean-900 font-semibold text-xs uppercase tracking-wider mb-2">
              <Calculator className="h-4 w-4" />
              Standard Mathematical Formula
            </div>
            <p className="font-mono text-sm font-bold text-ocean-950 bg-white border border-ocean-100 rounded-lg p-3">
              {t.formula}
            </p>
          </div>
        )}

        {/* Detailed Explanation */}
        <section className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
          <h2 className="font-display text-2xl font-bold text-ocean-950">
            Operational Meaning &amp; Maritime Industry Practice
          </h2>
          <p className="text-base text-slate-700 leading-relaxed">
            {t.fullExplanation}
          </p>
        </section>

        {/* Standards & Governance Reference */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex items-start gap-3">
          <FileText className="h-5 w-5 text-ocean-700 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-slate-600">
            <strong className="text-ocean-950 font-semibold block text-sm">
              Applicable Maritime Standards
            </strong>
            <p>
              This measurement principle is governed under <span className="font-mono font-medium text-slate-800">{t.standardsReference}</span>. Space BQS enforces these parameters deterministically across mobile and web interfaces to eliminate calculation deviations during custody handover.
            </p>
          </div>
        </div>

        {/* FAQs */}
        {t.faqs && t.faqs.length > 0 && (
          <section className="pt-6">
            <h2 className="font-display text-2xl font-bold text-ocean-950 mb-4">
              Frequently Asked Questions About {t.term}
            </h2>
            <Faq items={t.faqs} />
          </section>
        )}

        {/* Related Terms */}
        {relatedTerms.length > 0 && (
          <section className="pt-6 border-t border-slate-200">
            <h2 className="font-display text-xl font-bold text-ocean-950 mb-4">
              Related Marine &amp; Calculation Terms
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedTerms.map((rt) => (
                <Link
                  key={rt.slug}
                  href={`/glossary/${rt.slug}`}
                  className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-ocean-600 hover:shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">{rt.category}</span>
                    <strong className="text-ocean-950 font-bold group-hover:text-ocean-700 block mt-1">
                      {rt.term}
                    </strong>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {rt.shortDefinition}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-ocean-700 inline-flex items-center gap-1 mt-3">
                    Read Definition <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Call to Action */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <CtaRow />
      </div>
    </div>
  );
}
