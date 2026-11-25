"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Smartphone, ShieldCheck, ChartNoAxesCombined, FileCheck2 } from "lucide-react";
import { useViewportScroll } from "@/app/components/useViewportScroll";
import WeightText from "@/app/components/WeightText";
import teamImage from "@/public/assets/web_image/shutterstock_2507213927-scaled.webp";

const ROLES = [
  {
    icon: Smartphone,
    shortTitle: "Surveyors",
    title: "Surveyors on Deck",
    action: "Scan, Measure, Submit",
    tag: "Field tool",
    station: "Deck Soundings",
    description: "Capture tank readings and calculate offline, even in engine rooms. Submit once—without retyping ashore.",
    href: "/mobile-app",
    link: "Explore the mobile app",
  },
  {
    icon: ShieldCheck,
    shortTitle: "Supervisors",
    title: "Supervisors in Office",
    action: "Review, Complete, Lock",
    tag: "Quantity review",
    station: "Office Audit & Lock",
    description: "Check tank-level results and temperature corrections. Review, finalise, and lock the certificate before issue.",
    href: "/features/calculation-audit",
    link: "See the review workflow",
  },
  {
    icon: ChartNoAxesCombined,
    shortTitle: "Owners & Ops",
    title: "Firm Owners & Ops",
    action: "Oversee Fleet, Volume & Audit",
    tag: "Business oversight",
    station: "Fleet Register & Warehouse",
    description: "Track tonnage and team activity across your fleet. Keep every survey ready for audits and client questions.",
    href: "/features/survey-register-dashboard",
    link: "Explore the dashboard",
  },
  {
    icon: FileCheck2,
    shortTitle: "Clients",
    title: "Clients & Principals",
    action: "Clear, Defensible Certificates",
    tag: "Client handover",
    station: "Client PDF & Excel",
    description: "Receive a locked PDF and a four-sheet Excel workbook. Follow every reading, factor, and total—no login needed.",
    href: "/sample-report",
    link: "See a sample report",
  },
] as const;

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => value * value * (3 - 2 * value);

export default function TeamSplitCards() {
  const ref = useRef<HTMLElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const backs = useRef<(HTMLDivElement | null)[]>([]);
  const phaseRef = useRef<HTMLSpanElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [enhanced, setEnhanced] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [activeRole, setActiveRole] = useState(0);

  useEffect(() => {
    const preference = matchMedia("(min-width: 1024px) and (min-height: 480px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setEnhanced(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  const update = useCallback(() => {
    const section = ref.current;
    if (!section) return;
    if (!enhanced) {
      cards.current.forEach(card => card?.removeAttribute("style"));
      backs.current.forEach(back => { if (back) back.inert = false; });
      return;
    }
    const rect = section.getBoundingClientRect();
    const stickyTop = Math.min(84, Math.max(56, window.innerHeight * 0.08));
    const maxScroll = Math.max(1, rect.height - window.innerHeight);
    const progress = showAll ? 1 : clamp((stickyTop - rect.top) / maxScroll);

    const split = ease(clamp(progress / 0.55));
    cards.current.forEach((card, index) => {
      if (!card) return;
      const reveal = ease(clamp((progress - 0.23 - index * 0.025) / 0.42));
      card.style.transform = `translateX(${(index - 1.5) * 12 * split}px)`;
      card.style.setProperty("--split-radius", `${split * 20}px`);
      card.style.setProperty("--image-opacity", String(1 - reveal));

      const back = backs.current[index];
      if (back) back.inert = reveal < 0.85;
    });

    if (phaseRef.current) {
      const label = progress < 0.12
        ? "01 / One shared vessel pipeline"
        : progress < 0.73
        ? "02 / Four connected team roles"
        : "03 / Choose your role";
      if (phaseRef.current.textContent !== label) phaseRef.current.textContent = label;
    }
  }, [enhanced, showAll]);

  useViewportScroll(ref, update);
  useEffect(update, [update]);

  // Mobile carousel navigation
  const scrollToRole = useCallback((index: number) => {
    setActiveRole(index);
    const container = carouselRef.current;
    const targetCard = cards.current[index];
    if (!container || !targetCard || enhanced) return;

    const containerWidth = container.clientWidth;
    const cardLeft = targetCard.offsetLeft;
    const cardWidth = targetCard.clientWidth;
    container.scrollTo({
      left: cardLeft - (containerWidth - cardWidth) / 2,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, [enhanced]);

  // Update active dot in mobile carousel on scroll
  const handleMobileScroll = useCallback(() => {
    const container = carouselRef.current;
    if (!container || enhanced || window.innerWidth >= 640) return;

    const scrollCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.current.forEach((card, idx) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(scrollCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeRole) {
      setActiveRole(closestIndex);
    }
  }, [activeRole, enhanced]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container || enhanced) return;
    container.addEventListener("scroll", handleMobileScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleMobileScroll);
  }, [enhanced, handleMobileScroll]);

  return (
    <section
      ref={ref}
      id="section-personas"
      aria-labelledby="team-split-heading"
      className="team-glass-section team-split-section"
      data-enhanced={enhanced}
    >
      <div className="team-split-sticky">
        {/* ─── Header ─── */}
        <header className="team-split-heading">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#032aac]">
            Built For The Whole Team
          </p>
          <WeightText
            id="team-split-heading"
            tag="h2"
            mode="scroll-reveal"
            restWeight={400}
            activeWeight={700}
            className="font-display text-2xl font-bold leading-tight tracking-tight text-[#031038] sm:text-3xl lg:text-[32px] xl:text-4xl"
          >
            One Platform For Everyone<br className="hidden sm:block" /> Who Relies On The Number.
          </WeightText>
          <p className="text-xs sm:text-[13px] leading-relaxed text-[#52657c] max-w-xl mx-auto">
            From the first reading on deck to the final proof in your client’s hands.
          </p>
        </header>

        {/* ─── Non-enhanced Maritime Connector Banner (Mobile & Tablet) ─── */}
        {!enhanced && (
          <div className="team-split-banner">
            <Image
              src={teamImage}
              alt="An oil tanker underway at sea connecting marine surveyors, office reviewers, ops, and principals"
              fill
              sizes="(min-width: 1024px) 100vw, 90vw"
              className="object-cover"
            />
            <div className="team-split-banner-overlay">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5 shrink-0">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-emerald-500"></span>
                </span>
                <div className="text-left leading-tight">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-emerald-300 font-semibold block">
                    Live Sea-to-Shore Pipeline
                  </span>
                  <span className="text-[11px] sm:text-xs text-white/90 font-medium hidden xs:inline-block sm:block">
                    One Unified Record Across 4 Roles
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-white/70 hidden md:inline-block">
                  Active Station:
                </span>
                <span className="font-mono text-[9px] sm:text-[11px] font-semibold text-white bg-white/15 backdrop-blur-xs px-2 sm:px-2.5 py-1 rounded-full border border-white/20">
                  {ROLES[activeRole].station}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ─── Mobile Role Tabs (< 1024px) ─── */}
        {!enhanced && (
          <div className="team-split-tabs" role="tablist" aria-label="Team roles navigation">
            {ROLES.map((role, index) => {
              const Icon = role.icon;
              const isSelected = activeRole === index;
              return (
                <button
                  key={role.shortTitle}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`team-role-card-${index}`}
                  onClick={() => scrollToRole(index)}
                  className="team-split-tab-pill"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={isSelected ? 2 : 1.5} />
                  <span>{role.shortTitle}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* The four image slices share one crop until they separate. */}
        <div ref={carouselRef} className="team-split-grid">
          {ROLES.map((role, index) => {
            const Icon = role.icon;
            const isActive = activeRole === index;
            return (
              <article
                key={role.title}
                id={`team-role-card-${index}`}
                ref={el => { cards.current[index] = el; }}
                className={`team-split-card group ${isActive ? "is-active-tab" : ""}`}
                aria-label={role.title}
              >
                <div className="team-split-panel">
                  <div className="team-split-front" aria-hidden="true">
                    <div className="team-split-image-plane" style={{ left: `${index * -100}%` }}>
                      <Image
                        src={teamImage}
                        alt=""
                        fill
                        sizes="(min-width: 1280px) 1080px, 90vw"
                        className="object-cover"
                        priority={false}
                      />
                    </div>
                    <div className="team-split-image-shade" />
                    <span className="team-split-front-label">
                      <span>0{index + 1}</span>
                      {role.tag}
                    </span>
                  </div>

                  <div
                    ref={el => { backs.current[index] = el; }}
                    className="team-split-back"
                    inert={enhanced}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex h-8 w-8 sm:h-9 sm:w-9 lg:h-9 lg:w-9 xl:h-10 xl:w-10 items-center justify-center rounded-xl border border-white bg-white/80 text-[#032aac] shadow-2xs group-hover:bg-[#032aac] group-hover:text-white transition-colors duration-300">
                          <Icon aria-hidden="true" className="h-4 w-4 sm:h-4.5 sm:w-4.5 lg:h-4.5 lg:w-4.5" strokeWidth={1.75} />
                        </span>
                        <span className="font-mono text-[10px] font-semibold tracking-wider text-[#647b91]">
                          0{index + 1} / 04
                        </span>
                      </div>

                      {/* Card Content */}
                      <div className="team-split-copy mt-2.5 sm:mt-3">
                        <p className="font-mono text-[9px] font-semibold uppercase tracking-[.14em] text-[#526f89]">
                          {role.tag}
                        </p>
                        <h3 className="mt-1 font-display text-base sm:text-lg lg:text-[17px] xl:text-lg font-bold leading-snug tracking-tight text-[#031038] group-hover:text-[#032aac] transition-colors">
                          {role.title}
                        </h3>
                        <div className="team-split-action-pill">
                          {role.action}
                        </div>
                        <p className="mt-2 text-xs sm:text-[12.5px] lg:text-[12px] xl:text-[12.5px] leading-relaxed text-[#415971]">
                          {role.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Action Link */}
                    <Link href={role.href} className="team-split-link group/link">
                      <span>{role.link}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ─── Desktop Instruction Bar (Enhanced Mode) ─── */}
        {enhanced && (
          <div className="team-split-instruction">
            <span aria-hidden="true" className="inline-flex items-center gap-2">
              <ArrowDown className="h-3.5 w-3.5" />
              <span ref={phaseRef}>01 / One shared vessel pipeline</span>
            </span>
            <button
              type="button"
              onClick={() => setShowAll(val => !val)}
              aria-pressed={showAll}
              className="min-h-10 font-semibold text-[#032aac] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {showAll ? "Follow scroll" : "Show all roles"}
            </button>
          </div>
        )}

        {/* ─── Mobile Carousel Pagination Dots (Non-enhanced Mode) ─── */}
        {!enhanced && (
          <div className="team-split-mobile-nav">
            <div className="team-split-dots">
              {ROLES.map((role, idx) => (
                <button
                  key={role.shortTitle}
                  type="button"
                  onClick={() => scrollToRole(idx)}
                  aria-current={activeRole === idx}
                  aria-label={`Go to ${role.title}`}
                  className="team-split-dot"
                />
              ))}
            </div>
            <span className="font-mono text-[10px] text-[#647b91] font-medium">
              Swipe to explore →
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
