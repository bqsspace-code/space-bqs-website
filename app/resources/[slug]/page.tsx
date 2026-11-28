import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, AnswerBlock, Faq } from "../../components/ui";
import { PageHero, HeroArt } from "../../components/Editorial";
import { RESOURCES, getResource } from "../../lib/resources";
import { SITE_URL } from "../../lib/site";
import { routeMetadata } from "../../lib/seo-metadata";

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) return {};
  return routeMetadata(`/resources/${r.slug}`, {
    title: r.title,
    description: r.description,
    openGraph: { type: "article" },
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: r.title,
      description: r.description,
      dateModified: r.updated,
      author: { "@type": "Organization", name: "Space BQS", url: SITE_URL },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: `${SITE_URL}/resources/${r.slug}`,
  };

  return (
    <div>
      <PageHero
        href={`/resources/${r.slug}`}
        crumb={r.title}
        parent={{ href: "/resources", label: "Resources" }}
        eyebrow={`Last updated ${r.updated}`}
        title={r.title}
        description={r.description}
        visual={<HeroArt kind="doc" title="Guide" caption="Plain-language survey context." />}
      />
      <Section eyebrow="Answer" title="In short">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <AnswerBlock><p>{r.answer}</p></AnswerBlock>
        <div className="mt-6 space-y-8 text-slate-700">
          {r.sections?.map((section) => (
            <section key={section.heading} aria-labelledby={`resource-${r.slug}-${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
              <h2 id={`resource-${r.slug}-${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="font-display text-xl font-semibold text-[#031038]">{section.heading}</h2>
              <div className="mt-3 space-y-4 leading-7">
                {section.body.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
              </div>
            </section>
          ))}
          {r.body.length > 0 && <div className="space-y-4 leading-7">{r.body.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}</div>}
        </div>
        {r.sources && r.sources.length > 0 && (
          <aside className="mt-8 rounded-xl border border-[#d3e9f3] bg-white/70 p-5" aria-label="Sources">
            <h2 className="font-display text-base font-semibold text-[#031038]">Sources</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              {r.sources.map((source) => <li key={source.url}><a className="text-[#032aac] underline underline-offset-2" href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}
            </ul>
          </aside>
        )}
        {r.related && r.related.length > 0 && (
          <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Related pages">
            {r.related.map((item) => <Link key={item.href} className="font-semibold text-[#032aac] underline underline-offset-2" href={item.href}>{item.label}</Link>)}
          </nav>
        )}
      </Section>
      <Section eyebrow="FAQ" title="Common follow-ups">
        <Faq items={r.faq} />
      </Section>
    </div>
  );
}
