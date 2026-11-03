"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ShinyButton } from "@/components/ui/shiny-button";
import { LiquidGlassNav } from "@/components/ui/liquid-glass-nav";
import { useLenis } from "lenis/react";
import { ChevronDown, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/solutions", label: "Solutions" },
  { href: "/services", label: "Services" },
  { href: "/features", label: "Features" },
  { href: "/platform", label: "Platform" },
  { href: "/tools", label: "Tools" },
  { href: "/pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
];

const SOLUTION_LINKS = [
  { href: "/solutions/space-bqs", label: "Space BQS", description: "Mobile on deck. Web in the office." },
  { href: "/solutions/cargo-wms", label: "Cargo WMS", description: "A custom warehouse-management implementation." },
  { href: "/solutions", label: "Compare solutions", description: "Choose the workflow for your operation." },
];

export default function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const scrolledRef = useRef(false);

  const onScroll = useCallback(() => {
    const isScrolled = window.scrollY > 24;
    if (scrolledRef.current !== isScrolled) {
      scrolledRef.current = isScrolled;
      setScrolled(isScrolled);
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
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => { lenis?.start(); document.body.style.overflow = ""; };
  }, [mobileMenuOpen, lenis]);

  useEffect(() => {
    const desktop = matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => { if (desktop.matches) setMobileMenuOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); setSolutionsOpen(false); }, [pathname]);
  useEffect(() => {
    if (!solutionsOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setSolutionsOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [solutionsOpen]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        document.getElementById("navigation-toggle")?.focus();
      }
      if (event.key === "Escape" && solutionsOpen) {
        setSolutionsOpen(false);
        document.getElementById("solutions-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [mobileMenuOpen, solutionsOpen]);

  return (
    <header
      ref={headerRef}
      className="marine-header fixed top-0 left-0 right-0 z-50"
      data-scrolled={scrolled}
    >
      <LiquidGlassNav className="marine-nav-shell mx-auto">
      <div className="marine-nav-content flex h-16 items-center justify-between gap-3 px-4 xl:px-5">
        {/* Wordmark + Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <svg
            width="22"
            height="18"
            viewBox="0 0 24 20"
            fill="none"
            stroke="#032AAC"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:stroke-[#1B4FD1] transition-colors"
          >
            <path d="M3 5c3-2.5 6-2.5 9 0s6 2.5 9 0" />
            <path d="M3 10c3-2.5 6-2.5 9 0s6 2.5 9 0" />
            <path d="M3 15c3-2.5 6-2.5 9 0s6 2.5 9 0" />
          </svg>
          <span
            className="font-display text-lg font-bold tracking-tight"
            style={{ color: "#031038" }}
          >
            Space BQS
          </span>
        </Link>

        {/* Desktop Nav */}
         <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex" onMouseLeave={() => setHovered(null)}>
          {NAV_LINKS.map((l) => (
            l.href === "/solutions" ? <button key={l.href} id="solutions-toggle" type="button" onClick={() => setSolutionsOpen((value) => !value)} aria-expanded={solutionsOpen} aria-controls="solutions-navigation" onMouseEnter={() => setHovered(l.href)} onFocus={() => setHovered(l.href)} onBlur={() => setHovered(null)} data-highlighted={hovered === l.href || solutionsOpen || (!hovered && pathname.startsWith("/solutions"))} className="marine-nav-link relative flex items-center gap-1 rounded-full px-3 py-2.5 text-[13px] font-medium">
              {(hovered === l.href || solutionsOpen || (!hovered && pathname.startsWith("/solutions"))) && <motion.span aria-hidden="true" layoutId="marine-nav-highlight" className="marine-nav-highlight" transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative z-10">Solutions</span><ChevronDown aria-hidden="true" className="relative z-10 size-3" />
            </button> :
            <Link
              key={l.href}
              href={l.href}
              className="marine-nav-link relative rounded-full px-3 py-2.5 text-[13px] font-medium"
              aria-current={pathname === l.href || pathname.startsWith(`${l.href}/`) ? "page" : undefined}
              data-highlighted={hovered === l.href || (!hovered && (pathname === l.href || pathname.startsWith(`${l.href}/`)))}
              onMouseEnter={() => { setHovered(l.href); setSolutionsOpen(false); }}
              onFocus={() => { setHovered(l.href); setSolutionsOpen(false); }}
              onBlur={() => setHovered(null)}
            >
              {(hovered === l.href || (!hovered && (pathname === l.href || pathname.startsWith(`${l.href}/`)))) && (
                <motion.span aria-hidden="true" layoutId="marine-nav-highlight" className="marine-nav-highlight"
                  transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <span className="relative z-10">{l.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <ShinyButton
            href="/request-demo"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 8px rgba(3,42,172,0.18)",
            }}
          >
            <span>Request a demo</span>
            <svg
              width="12"
              height="12"
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

          {/* Mobile toggle */}
          <button
            id="navigation-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors xl:hidden"
            style={{ color: "#031038" }}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
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

      </LiquidGlassNav>

      {solutionsOpen && <nav id="solutions-navigation" aria-label="Solutions" className="pointer-events-auto absolute left-1/2 top-full mt-3 hidden w-[min(540px,calc(100vw-48px))] -translate-x-1/2 rounded-2xl border border-[#c8dfea] bg-[#f5faff]/95 p-3 shadow-xl backdrop-blur-xl xl:block">
        {SOLUTION_LINKS.map((item) => <Link key={item.href} href={item.href} onClick={() => setSolutionsOpen(false)} className="group flex items-center justify-between gap-4 rounded-xl p-4 hover:bg-[#e4efff] focus-visible:outline-2 focus-visible:outline-[#032aac]"><span><span className="block text-sm font-semibold text-[#032aac]">{item.label}</span><span className="mt-1 block text-xs text-[#60748a]">{item.description}</span></span><ArrowRight aria-hidden="true" className="size-4 shrink-0 text-[#032aac]" /></Link>)}
      </nav>}

      {/* Mobile menu — full-screen foam-white sheet */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="marine-mobile-menu fixed inset-x-3 top-[88px] bottom-3 z-40 overflow-y-auto overscroll-contain rounded-3xl xl:hidden"
          data-lenis-prevent
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
            <div className="my-3 border-y border-[#d3e9f3] py-3">{SOLUTION_LINKS.slice(0, 2).map((item) => <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-medium text-[#032aac]">{item.label}<span className="mt-1 block text-xs font-normal text-[#60748a]">{item.description}</span></Link>)}</div>

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


          </nav>
        </div>
      )}
    </header>
  );
}
