"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

/* ─── Section ─── */
export function Section({
  eyebrow,
  title,
  lede,
  children,
  bg = "foam",
  id,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
  bg?: "foam" | "mist";
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`py-20 lg:py-28 ${bg === "mist" ? "bg-mist-100" : ""}`}
    >
      <div
        className={`mx-auto max-w-[1200px] px-4 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-marine-700 mb-3">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-2xl font-bold text-abyss-900 sm:text-3xl lg:text-4xl tracking-tight leading-tight">
          {title}
        </h2>
        {lede && (
          <p className="mt-4 max-w-3xl text-base leading-relaxed" style={{ color: "rgba(3,16,56,0.68)" }}>
            {lede}
          </p>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

/* ─── AnswerBlock ("In short") ─── */
export function AnswerBlock({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl border-l-[3px] border-marine-700 p-6"
      style={{ background: "#EAF4F9" }}
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-marine-700 mb-2">
        In short
      </p>
      <div className="leading-relaxed" style={{ color: "rgba(3,16,56,0.72)" }}>
        {children}
      </div>
    </div>
  );
}

/* ─── CtaRow ─── */
export function CtaRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Link href="/request-demo" className="btn-primary">
        Request a demo
      </Link>
      <Link href="/sample-report" className="btn-secondary">
        See sample report
      </Link>
    </div>
  );
}

/* ─── FAQ (smooth accordion) ─── */
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
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="divide-y" style={{ borderColor: "#D3E9F3" }}>
        {items.map((item) => (
          <FaqItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentH(contentRef.current.scrollHeight);
    }
  }, [open]);

  return (
    <div className="py-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left group"
        aria-expanded={open}
      >
        <span className="font-display text-base font-semibold text-abyss-900 pr-4 group-hover:text-marine-700 transition-colors">
          {q}
        </span>
        <span
          className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full border transition-all duration-300"
          style={{
            borderColor: open ? "#032AAC" : "#D3E9F3",
            color: open ? "#032AAC" : "rgba(3,16,56,0.4)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="6" y1="1" x2="6" y2="11" />
            <line x1="1" y1="6" x2="11" y2="6" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{
          maxHeight: open ? contentH + 20 : 0,
          opacity: open ? 1 : 0,
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div ref={contentRef} className="pt-3 leading-relaxed" style={{ color: "rgba(3,16,56,0.64)" }}>
          {a}
        </div>
      </div>
    </div>
  );
}

/* ─── Breadcrumbs ─── */
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
    <nav aria-label="Breadcrumb" className="text-sm" style={{ color: "rgba(3,16,56,0.44)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {trail.map((t, i) => (
        <span key={t.href}>
          {i > 0 && <span className="mx-1.5" style={{ color: "rgba(3,16,56,0.2)" }}>›</span>}
          <Link
            href={t.href}
            className="hover:text-marine-700 transition-colors"
          >
            {t.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
