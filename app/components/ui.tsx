import Link from "next/link";

export function Section({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-widest text-sea-600">{eyebrow}</p>
      ) : null}
      <h2 className="font-display mt-2 text-2xl font-bold text-ocean-950 sm:text-3xl">{title}</h2>
      {lede ? <p className="mt-3 max-w-3xl text-slate-600">{lede}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function AnswerBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border-l-4 border-sea-600 bg-ocean-50 p-5 text-slate-800">
      <p className="text-xs font-semibold uppercase tracking-widest text-sea-600">In short</p>
      <div className="mt-2 leading-relaxed">{children}</div>
    </div>
  );
}

export function CtaRow() {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/demo"
        className="rounded-lg bg-ocean-900 px-5 py-3 font-semibold text-white hover:bg-ocean-700"
      >
        Request a demo
      </Link>
      <Link href="/sample-report" className="rounded-lg border border-slate-300 px-5 py-3 font-semibold">
        See sample report
      </Link>
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
  return (
    <div className="space-y-3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {items.map((i) => (
        <details key={i.q} className="rounded-lg border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer font-semibold">{i.q}</summary>
          <p className="mt-2 text-slate-600">{i.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Breadcrumbs({ trail }: { trail: { href: string; label: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.label,
      item: t.href,
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {trail.map((t, i) => (
        <span key={t.href}>
          {i > 0 ? " › " : null}
          <Link href={t.href} className="hover:underline">{t.label}</Link>
        </span>
      ))}
    </nav>
  );
}
