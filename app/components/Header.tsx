"use client";

import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShinyButton } from "@/components/ui/shiny-button";
import { LiquidGlassNav } from "@/components/ui/liquid-glass-nav";
import { useLenis } from "lenis/react";
import { ChevronDown, ArrowRight, PhoneCall } from "lucide-react";
import { FlagUSA, CountryFlag } from "./flags/CountryFlags";
import ContactDropdownCard from "./ContactDropdownCard";
import {
  OFFICE_LOCATIONS,
  MAIN_OFFICE_DISPLAY,
  MAIN_OFFICE_TEL,
} from "../lib/contact-data";

const NAV_LINKS = [
  { href: "/solutions", label: "Solutions" },
  { href: "/services", label: "Services" },
  { href: "/features", label: "Features" },
  { href: "/platform", label: "Platform" },
  { href: "/tools", label: "Tools" },
  { href: "/pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

const SOLUTION_LINKS = [
  { href: "/solutions/space-bqs", label: "Space BQS", description: "Mobile on deck. Web in the office." },
  { href: "/solutions/cargo-wms", label: "Cargo WMS", description: "A custom warehouse-management implementation." },
  { href: "/solutions", label: "Compare solutions", description: "Choose the workflow for your operation." },
];

const SOLUTIONS_EASE_OUT = [0.23, 1, 0.32, 1] as const;
const BUBBLE_SETTLE_EASE = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [hoveredSolution, setHoveredSolution] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [caretOffset, setCaretOffset] = useState<number>(56);
  const [solutionsPos, setSolutionsPos] = useState<{ left: number; originX: number }>({
    left: 168,
    originX: 52,
  });
  const headerRef = useRef<HTMLElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const solutionsTriggerRef = useRef<HTMLButtonElement>(null);
  const contactTriggerRef = useRef<HTMLButtonElement>(null);
  const scrolledRef = useRef(false);

  const updateSolutionsPosition = useCallback(() => {
    const container = navContainerRef.current;
    const trigger = solutionsTriggerRef.current;
    if (!container || !trigger) return;

    const containerRect = container.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const popoverWidth = Math.min(430, window.innerWidth - 48);
    const desiredLeft = triggerRect.left - containerRect.left - 8;
    const maxLeft = Math.max(0, containerRect.width - popoverWidth);
    const left = Math.max(0, Math.min(desiredLeft, maxLeft));
    const triggerCenter = triggerRect.left - containerRect.left + triggerRect.width / 2;
    const originX = Math.max(24, Math.min(popoverWidth - 24, triggerCenter - left));

    setSolutionsPos({
      left: Math.round(left),
      originX: Math.round(originX),
    });
  }, []);

  const followBubbleLight = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
    event.currentTarget.style.setProperty("--bubble-x", `${x.toFixed(1)}%`);
    event.currentTarget.style.setProperty("--bubble-y", `${y.toFixed(1)}%`);
  }, []);

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

  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
    setContactOpen(false);
  }, [pathname]);

  // Close open dropdowns on pointer click outside header
  useEffect(() => {
    if (!solutionsOpen && !contactOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setSolutionsOpen(false);
        setContactOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [solutionsOpen, contactOpen]);

  // Handle Escape key
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
      if (event.key === "Escape" && contactOpen) {
        setContactOpen(false);
        contactTriggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [mobileMenuOpen, solutionsOpen, contactOpen]);

  // Anchor Solutions dropdown directly below its trigger button
  useLayoutEffect(() => {
    if (!solutionsOpen) return;
    updateSolutionsPosition();
    window.addEventListener("resize", updateSolutionsPosition);
    return () => window.removeEventListener("resize", updateSolutionsPosition);
  }, [solutionsOpen, updateSolutionsPosition]);

  // Dynamically position the top pointer caret right under the trigger button
  useEffect(() => {
    if (!contactOpen || !contactTriggerRef.current) return;
    const updateCaret = () => {
      const triggerRect = contactTriggerRef.current?.getBoundingClientRect();
      const popoverEl = document.getElementById("contact-nav-popover");
      if (triggerRect && popoverEl) {
        const popoverRect = popoverEl.getBoundingClientRect();
        const triggerCenter = triggerRect.left + triggerRect.width / 2;
        const offset = Math.round(popoverRect.right - triggerCenter);
        if (offset > 18 && offset < popoverRect.width - 18) {
          setCaretOffset(offset);
        }
      }
    };
    const frame = requestAnimationFrame(updateCaret);
    window.addEventListener("resize", updateCaret);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateCaret);
    };
  }, [contactOpen]);

  return (
    <header
      ref={headerRef}
      className="marine-header fixed top-0 left-0 right-0 z-50"
      data-scrolled={scrolled}
    >
      <div ref={navContainerRef} className="relative mx-auto max-w-[1320px] pointer-events-none">
        <div className="pointer-events-auto">
          <LiquidGlassNav className="marine-nav-shell">
            <div className="marine-nav-content flex h-16 items-center justify-between gap-2.5 px-3.5 sm:px-4 xl:px-5">
              {/* Wordmark + Logo */}
              <Link href="/" className="flex items-center gap-2.5 group shrink-0">
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
              <nav
                aria-label="Primary"
                className="hidden items-center gap-0.5 xl:flex"
                onMouseLeave={() => setHovered(null)}
              >
                {NAV_LINKS.map((l) => (
                  l.href === "/solutions" ? (
                    <button
                      ref={solutionsTriggerRef}
                      key={l.href}
                      id="solutions-toggle"
                      type="button"
                      onClick={() => {
                        if (!solutionsOpen) updateSolutionsPosition();
                        setSolutionsOpen((value) => !value);
                        setContactOpen(false);
                      }}
                      aria-expanded={solutionsOpen}
                      aria-controls="solutions-navigation"
                      onMouseEnter={() => setHovered(l.href)}
                      onFocus={() => setHovered(l.href)}
                      onBlur={() => setHovered(null)}
                      data-highlighted={hovered === l.href || solutionsOpen || (!hovered && pathname.startsWith("/solutions"))}
                      className="marine-nav-link relative flex items-center gap-1 rounded-full px-3 py-2.5 text-[13px] font-medium transition-transform duration-150 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
                    >
                      {(hovered === l.href || solutionsOpen || (!hovered && pathname.startsWith("/solutions"))) && (
                        <motion.span
                          aria-hidden="true"
                          layoutId="marine-nav-highlight"
                          className="marine-nav-highlight"
                          transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">Solutions</span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`relative z-10 size-3 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${
                          solutionsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
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
                        <motion.span
                          aria-hidden="true"
                          layoutId="marine-nav-highlight"
                          className="marine-nav-highlight"
                          transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{l.label}</span>
                    </Link>
                  )
                ))}
              </nav>

              {/* Right CTA Group */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                {/* Request a Demo Button */}
                <ShinyButton
                  href="/request-demo"
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-4 xl:px-5 py-2 text-xs sm:text-[13px] font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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

                {/* Contact Details Trigger Pill (Space BQS Marine Light Glass Theme) */}
                <button
                  ref={contactTriggerRef}
                  id="contact-nav-toggle"
                  type="button"
                  onClick={() => {
                    setContactOpen((prev) => !prev);
                    setSolutionsOpen(false);
                  }}
                  aria-expanded={contactOpen}
                  aria-haspopup="dialog"
                  aria-controls="contact-nav-popover"
                  aria-label="Direct contact numbers & global offices"
                  className={`group relative flex h-9 items-center gap-1.5 sm:gap-2 rounded-full border px-2.5 sm:px-3.5 py-1 text-[12.5px] font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#032aac] ${
                    contactOpen
                      ? "border-[#032aac] bg-white text-[#032aac] shadow-[inset_0_1px_0_#fff,0_0_0_2px_rgba(3,42,172,0.15),0_4px_12px_rgba(3,42,172,0.12)]"
                      : "border-[#b9d3e8] bg-white/80 text-[#031038] hover:border-[#032aac]/50 hover:bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_6px_rgba(3,42,172,0.06)] backdrop-blur-md"
                  }`}
                >
                  {/* USA Flag */}
                  <span className="flex h-3.5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-[3px] border border-[#c8dfea] shadow-2xs">
                    <FlagUSA className="h-full w-full object-cover" />
                  </span>

                  {/* Text */}
                  <span className="hidden sm:inline font-bold text-[#032aac] text-xs">USA</span>
                  <span className="hidden lg:inline font-semibold text-[#031038] tracking-tight text-xs">
                    {MAIN_OFFICE_DISPLAY}
                  </span>
                  <span className="inline lg:hidden text-xs font-semibold text-[#031038] tracking-tight">
                    +1 646...
                  </span>

                  {/* Chevron */}
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-3 text-[#60748a] transition-transform duration-200 group-hover:text-[#032aac] ${
                      contactOpen ? "rotate-180 text-[#032aac]" : ""
                    }`}
                  />
                </button>

                {/* Mobile Hamburger Toggle */}
                <button
                  id="navigation-toggle"
                  onClick={() => {
                    setMobileMenuOpen(!mobileMenuOpen);
                    setContactOpen(false);
                  }}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl transition-colors xl:hidden"
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
        </div>

        {/* Contact Details Dropdown Popover */}
        <AnimatePresence>
          {contactOpen && (
            <div className="pointer-events-auto absolute right-2 sm:right-4 top-[calc(100%+10px)] z-50">
              <ContactDropdownCard
                onClose={() => setContactOpen(false)}
                caretOffsetPx={caretOffset}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Solutions Dropdown Menu */}
        <AnimatePresence onExitComplete={() => setHoveredSolution(null)}>
          {solutionsOpen && (
            <motion.nav
              key="solutions-navigation"
              id="solutions-navigation"
              aria-label="Solutions"
              onPointerEnter={followBubbleLight}
              onPointerMove={followBubbleLight}
              onMouseLeave={() => setHoveredSolution(null)}
              style={{
                left: `${solutionsPos.left}px`,
                transformOrigin: `${solutionsPos.originX}px -10px`,
              }}
              initial={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -12, scaleX: 0.88, scaleY: 0.82 }
              }
              animate={
                reducedMotion
                  ? { opacity: 1, transition: { duration: 0.12 } }
                  : {
                      opacity: 1,
                      y: [-12, 2, 0],
                      scaleX: [0.88, 1.012, 1],
                      scaleY: [0.82, 1.022, 1],
                      transition: {
                        opacity: { duration: 0.22, ease: SOLUTIONS_EASE_OUT },
                        y: { duration: 0.44, times: [0, 0.62, 1], ease: BUBBLE_SETTLE_EASE },
                        scaleX: { duration: 0.44, times: [0, 0.62, 1], ease: BUBBLE_SETTLE_EASE },
                        scaleY: { duration: 0.46, times: [0, 0.58, 1], ease: BUBBLE_SETTLE_EASE },
                      },
                    }
              }
              exit={
                reducedMotion
                  ? { opacity: 0, transition: { duration: 0.1 } }
                  : {
                      opacity: 0,
                      y: -8,
                      scaleX: 0.93,
                      scaleY: 0.89,
                      transition: { duration: 0.17, ease: SOLUTIONS_EASE_OUT },
                    }
              }
              className="solutions-bubble pointer-events-auto absolute top-[calc(100%+10px)] hidden w-[min(430px,calc(100vw-48px))] p-2 xl:block z-50"
            >
              {/* Water-glass optical light & meniscus layers */}
              <span aria-hidden="true" className="solutions-bubble-pointer" />
              <span aria-hidden="true" className="solutions-bubble-rim" />
              <span aria-hidden="true" className="solutions-bubble-caustic" />
              {!reducedMotion && (
                <motion.span
                  aria-hidden="true"
                  initial={{ x: "-110%", opacity: 0.55 }}
                  animate={{ x: "240%", opacity: 0 }}
                  transition={{ duration: 0.55, ease: BUBBLE_SETTLE_EASE }}
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                />
              )}

              <div className="relative z-10 flex flex-col">
                {SOLUTION_LINKS.map((item, idx) => {
                  const isActiveRow = hoveredSolution === item.href;
                  return (
                    <div
                      key={item.href}
                      className={
                        idx === SOLUTION_LINKS.length - 1
                          ? "mt-1 border-t border-[#cbe0ee]/75 pt-1"
                          : undefined
                      }
                    >
                      <Link
                        href={item.href}
                        onClick={() => {
                          setHoveredSolution(null);
                          setSolutionsOpen(false);
                        }}
                        onMouseEnter={() => setHoveredSolution(item.href)}
                        onFocus={() => setHoveredSolution(item.href)}
                        onBlur={() => setHoveredSolution(null)}
                        className="group relative flex items-center justify-between gap-4 rounded-[18px] px-3.5 py-3 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.985] motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-[#032aac]"
                      >
                        {isActiveRow && (
                          <motion.span
                            aria-hidden="true"
                            layoutId="solutions-bubble-pill"
                            transition={
                              reducedMotion
                                ? { duration: 0 }
                                : { type: "spring", stiffness: 420, damping: 32 }
                            }
                            className="pointer-events-none absolute inset-0 rounded-[18px] border border-white/90 bg-gradient-to-br from-white/95 via-[#eaf4ff]/90 to-[#ddf0fc]/85 shadow-[0_4px_14px_-4px_rgba(3,42,172,0.14),inset_0_1px_0_#ffffff]"
                          />
                        )}
                        <span className="relative z-10">
                          <span className="block text-sm font-semibold tracking-tight text-[#032aac]">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-[#60748a]">{item.description}</span>
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="relative z-10 size-4 shrink-0 text-[#032aac]/65 transition-[transform,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:text-[#032aac] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu Drawer */}
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
                className="flex items-center rounded-2xl px-4 py-3 text-base font-medium transition-colors"
                style={{ color: "#031038", minHeight: "44px" }}
              >
                {l.label}
              </Link>
            ))}
            <div className="my-3 border-y border-[#d3e9f3] py-3">
              {SOLUTION_LINKS.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-[#032aac]"
                >
                  {item.label}
                  <span className="mt-1 block text-xs font-normal text-[#60748a]">{item.description}</span>
                </Link>
              ))}
            </div>

            {/* Global Offices Direct Call Section for Mobile */}
            <div className="my-2 rounded-2xl border border-[#d3e9f3] bg-[#f0f7fb] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#032aac]">
                  Global Offices & Direct Contact
                </span>
                <span className="text-[11px] font-medium text-[#60748a]">Tap to call</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {OFFICE_LOCATIONS.map((loc) => (
                  <a
                    key={loc.id}
                    href={loc.phone ? `tel:${loc.phone}` : "/contact"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl bg-white p-2.5 shadow-2xs transition-colors active:bg-[#e2effa]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-5 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[3px] border border-slate-200">
                        <CountryFlag code={loc.flagCode} className="h-full w-full object-cover" />
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-[#031038]">
                          {loc.displayNumber || loc.country}
                        </div>
                        {loc.displayNumber && (
                          <div className="text-[11px] text-[#60748a]">{loc.country}</div>
                        )}
                      </div>
                    </div>
                    <PhoneCall className="size-3.5 text-[#032aac]" />
                  </a>
                ))}
              </div>
              <a
                href={`tel:${MAIN_OFFICE_TEL}`}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#032aac] py-2.5 text-xs font-semibold text-white transition-opacity active:opacity-90"
              >
                <span>Call main office ({MAIN_OFFICE_DISPLAY})</span>
                <PhoneCall className="size-3.5" />
              </a>
            </div>

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
