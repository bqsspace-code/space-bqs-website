import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, AnswerBlock, Faq, Breadcrumbs } from "../../components/ui";
import { RESOURCES, getResource } from "../../lib/resources";
import { SITE_URL } from "../../lib/site";

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) return {};
  return {
    title: `${r.title} — Space BQS`,
    description: r.description,
    openGraph: { title: r.title, description: r.description, type: "article" },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: r.title,
    description: r.description,
    datePublished: r.updated,
    dateModified: r.updated,
    author: { "@type": "Organization", name: "Space BQS" },
    mainEntityOfPage: `${SITE_URL}/resources/${r.slug}`,
  };

  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/resources", label: "Resources" },
            { href: `/resources/${r.slug}`, label: r.title },
          ]}
        />
        <p className="mt-4 text-xs text-slate-500">Last updated: {r.updated} · Space BQS</p>
        <h1 className="font-display mt-2 text-3xl font-bold sm:text-4xl">{r.title}</h1>
        <p className="mt-3 text-lg text-slate-600">{r.description}</p>
      </div>
      <Section eyebrow="Answer" title="In short">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <AnswerBlock><p>{r.answer}</p></AnswerBlock>
        <div className="mt-6 space-y-4 text-slate-700">
          {r.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </Section>
      <Section eyebrow="FAQ" title="Common follow-ups">
        <Faq items={r.faq} />
      </Section>
    </div>
  );
}
