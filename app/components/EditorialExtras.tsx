import Link from "next/link";
import type { ReactNode } from "react";
import ScrollReveal from "./ScrollReveal";

export { LazyMount, CountUp } from "./Motion";

const link = "font-semibold text-[#032aac] underline decoration-[#9bcbd7] underline-offset-4";

/** Accessible, native <details> FAQ in glass panels, with FAQPage JSON-LD. */
export function FaqList({ items, schema = true }: { items: { q: string; a: string; more?: { href: string; label: string } }[]; schema?: boolean }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />}
      <ScrollReveal stagger className="space-y-3">
        {items.map((item) => (
          <details key={item.q} className="group glass-card rounded-[1.3rem] open:shadow-[0_28px_60px_-34px_rgba(19,68,111,.5)]">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-[1.3rem] px-5 py-4 font-display text-lg font-semibold text-[#031038] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#032aac] sm:px-7 [&::-webkit-details-marker]:hidden">
              {item.q}
              <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full border border-[#b9d3e8] text-[#032aac] transition group-open:rotate-45">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 1v10M1 6h10" /></svg>
              </span>
            </summary>
            <div className="px-5 pb-6 sm:px-7">
              <p className="max-w-2xl text-[15px] leading-7 text-[#405a75]">{item.a}</p>
              {item.more && <Link href={item.more.href} className={`mt-3 inline-block text-sm ${link}`}>{item.more.label} →</Link>}
            </div>
          </details>
        ))}
      </ScrollReveal>
    </>
  );
}

/** A formula or worked line, set in mono on a glass panel, with an optional caveat. */
export function Formula({ label, expr, note }: { label: string; expr: ReactNode; note?: ReactNode }) {
  return (
    <figure className="glass-card rounded-[1.4rem] p-6 sm:p-7">
      <figcaption className="font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-[#176a8e]">{label}</figcaption>
      <p className="mt-3 overflow-x-auto rounded-xl bg-[#031038] px-5 py-4 font-mono text-sm leading-7 text-[#b9f1e8] sm:text-base">{expr}</p>
      {note && <p className="mt-3 text-sm leading-6 text-[#52657c]">{note}</p>}
    </figure>
  );
}

/** Sticky in-page navigation chips. */
export function SectionNav({ items, label = "On this page" }: { items: { id: string; label: string }[]; label?: string }) {
  return (
    <nav aria-label={label} className="sticky top-16 z-30 border-b border-[#d3e4ee] bg-white/70 backdrop-blur-xl">
      <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 sm:px-8 lg:px-10">
        {items.map((i) => (
          <li key={i.id} className="shrink-0">
            <a href={`#${i.id}`} className="inline-flex min-h-10 items-center rounded-full border border-[#b9d3e8] bg-white/70 px-4 text-sm font-semibold text-[#032aac] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#032aac]">{i.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Inline link styled for body copy. */
export function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className={link}>{children}</Link>;
}
