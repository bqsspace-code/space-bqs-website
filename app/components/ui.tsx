"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

import WeightText from "./WeightText";
import { ShinyButton } from "@/components/ui/shiny-button";
import ScrollReveal from "./ScrollReveal";

/* ─── Eyebrow ─── */
export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[10px] font-mono font-semibold uppercase tracking-widest text-[#032AAC] mb-3 ${className}`}
    >
      {children}
    </p>
  );
}

/* ─── H2 ─── */
export function H2({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <WeightText
      tag="h2" mode="scroll-reveal" restWeight={400} activeWeight={700}
      className={`font-display text-2xl font-bold text-[#031038] sm:text-3xl lg:text-4xl tracking-tight leading-tight ${className}`}
    >
      {children}
    </WeightText>
  );
}


/* ─── Section ─── */
export function Section({
  eyebrow,
  title,
  lede,
  children,
  bg = "foam",
  id,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  lede?: string;
  children: React.ReactNode;
  bg?: "foam" | "mist";
  id?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`liquid-section py-20 lg:py-24 ${bg === "mist" ? "bg-mist-100" : ""} ${className}`}
    >
      <ScrollReveal className={`mx-auto max-w-6xl px-6 ${align === "center" ? "text-center" : ""}`}>
        {eyebrow && (
          <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-marine-700 mb-3">
            {eyebrow}
          </p>
        )}
        {title && (
          <H2>
            {title}
          </H2>
        )}
        {lede && (
          <p
            className={`mt-4 max-w-3xl text-base leading-relaxed ${
              align === "center" ? "mx-auto" : ""
            }`}
            style={{ color: "rgba(3,16,56,0.68)" }}
          >
            {lede}
          </p>
        )}
        <div className={title || eyebrow ? "mt-10" : ""}>{children}</div>
      </ScrollReveal>
    </section>
  );
}

/* ─── AnswerBlock ("In short") ─── */
export function AnswerBlock({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  if (dark) {
    return (
      <div className="liquid-glass-ui liquid-glass-ui--dark rounded-2xl border-l-[3px] border-[#19B5C9] p-6 border-t border-r border-b border-white/10">
        <p className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-[#19B5C9] mb-2">
          In short
        </p>
        <div className="leading-relaxed text-white/80 text-sm sm:text-base">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border-l-[3px] border-marine-700 p-6"
      style={{ background: "#EAF4F9" }}
    >
      <p className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-marine-700 mb-2">
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
    <div className={`flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 ${className}`}>
      <ShinyButton
        href="/request-demo"
        className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#032AAC] hover:bg-[#1B4FD1] text-white font-semibold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <span>Request a demo</span>
        <svg
          width="13"
          height="13"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 11L11 3M11 3H5M11 3V9" />
        </svg>
      </ShinyButton>
      <ShinyButton
        variant="secondary"
        href="/sample-report"
        className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-[#031038] font-semibold text-xs sm:text-sm shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <span>See sample report</span>
        <svg
          width="13"
          height="13"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 11L11 3M11 3H5M11 3V9" />
        </svg>
      </ShinyButton>
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
      <div className="glass-faq" style={{ borderColor: "#D3E9F3" }}>
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
    <div data-glass-surface className="glass-faq-item py-5">
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
