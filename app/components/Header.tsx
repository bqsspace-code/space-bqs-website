"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/features", label: "Features" },
  { href: "/platform", label: "Platform" },
  { href: "/how-we-measure", label: "Method" },
  { href: "/why-independent", label: "Why Independent" },
  { href: "/pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 24);

    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (docH > 0) {
      setScrollProgress(Math.min(1, window.scrollY / docH));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        background: scrolled
          ? "rgba(247, 251, 253, 0.72)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(3, 42, 172, 0.08)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="font-display text-lg font-semibold tracking-tight"
            style={{ color: "#031038" }}
          >
            Space BQS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative px-3 py-2 text-[13px] font-medium transition-colors duration-200"
              style={{ color: "rgba(3, 16, 56, 0.68)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#032AAC";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(3, 16, 56, 0.68)";
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <Link
            href="/request-demo"
            className="btn-ghost hidden sm:inline-flex text-[13px]"
          >
            Demo
          </Link>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-2 rounded-[12px] px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #032AAC 0%, #1B4FD1 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 6px rgba(3,42,172,0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(25,181,201,0.2), 0 2px 6px rgba(3,42,172,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 6px rgba(3,42,172,0.15)";
            }}
          >
            Request a demo
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors lg:hidden"
            style={{ color: "#031038" }}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="6" x2="17" y2="6" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="14" x2="17" y2="14" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Scroll progress line */}
      <div
        className="h-[2px] transition-all duration-100"
        style={{
          width: `${scrollProgress * 100}%`,
          background: scrollProgress > 0 ? "#19B5C9" : "transparent",
          opacity: scrolled ? 0.6 : 0,
        }}
      />

      {/* Mobile menu — full-screen foam-white sheet */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-14 z-40 lg:hidden"
          style={{ background: "#F7FBFD" }}
        >
          <nav className="flex flex-col gap-1 p-6" aria-label="Mobile navigation">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center rounded-2xl px-4 py-3.5 text-base font-medium transition-colors"
                style={{ color: "#031038", minHeight: "44px" }}
              >
                {l.label}
              </Link>
            ))}

            <div className="mt-4 border-t pt-4" style={{ borderColor: "#D3E9F3" }}>
              <Link
                href="/request-demo"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full justify-center text-base py-4"
              >
                Request a demo
              </Link>
              <Link
                href="/sample-report"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-secondary w-full justify-center text-base py-4 mt-3"
              >
                See sample report
              </Link>
            </div>

            <div className="mt-auto pt-8 flex items-center gap-2 text-xs" style={{ color: "rgba(3,16,56,0.44)" }}>
              <span>Engine v1.0.0</span>
              <span>·</span>
              <span>ASTM D1250-04 Table 54B</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
