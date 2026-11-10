"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Monitor, Smartphone, Tablet } from "lucide-react";
import { AppStoreBadges } from "./HomeEnhancements";
import { useViewportScroll } from "./useViewportScroll";
import WeightText from "./WeightText";
import phoneIllustration from "@/public/assets/web_image/device-phone-illustration.jpg";
import tabletIllustration from "@/public/assets/web_image/device-tablet-illustration.jpg";
import desktopIllustration from "@/public/assets/web_image/device-desktop-illustration.jpg";

interface StageCardData {
  id: string;
  stepNumber: string;
  eyebrow: string;
  heading: string;
  sentence: string;
  tag: string;
  accentColor: string;
  lightBg: string;
  darkBg: string;
  lightBorder: string;
  darkBorder: string;
  screenshot: string;
  screenshotAlt: string;
  calloutTitle: string;
  calloutDetail: string;
}

const STAGES: StageCardData[] = [
  {
    id: "scan",
    stepNumber: "01",
    eyebrow: "01 / VESSEL IDENTIFICATION",
    heading: "Scan And Verify At The Manifold.",
    sentence: "Choose the vessel or scan its QR code, then select Bunker Delivery, ROB, or Debunkering to start the survey.",
    tag: "Vessel & Survey Context",
    screenshot: "WhatsApp Image 2026-10-09 at 11.09.07 PM (6).jpeg",
    screenshotAlt: "Space BQS new survey screen with vessel selection, Scan vessel QR, and survey type choices",
    calloutTitle: "Start With The Right Vessel",
    calloutDetail: "Vessel selection · QR · survey type",
    accentColor: "#19B5C9",
    lightBg: "linear-gradient(180deg, #F0F6FB 0%, #E3EEF8 100%)",
    darkBg: "linear-gradient(180deg, #0A1733 0%, #031024 100%)",
    lightBorder: "#D2E4F2",
    darkBorder: "rgba(25, 181, 201, 0.35)",
  },
  {
    id: "capture",
    stepNumber: "02",
    eyebrow: "02 / 100% OFFLINE CAPTURE",
    heading: "Capture On Deck. Zero Cellular Signal.",
    sentence: "Review net volume and the live survey total on the device. Save a draft and retain your calculation without a cellular connection.",
    tag: "Offline Calculation Preview",
    screenshot: "WhatsApp Image 2026-10-09 at 11.09.07 PM (7).jpeg",
    screenshotAlt: "Space BQS offline calculation preview with net volume, live survey total, field remarks, and Save and Calculate",
    calloutTitle: "Your Working Stays On Deck",
    calloutDetail: "Live preview · draft · saved result",
    accentColor: "#F59E0B",
    lightBg: "linear-gradient(180deg, #F4F1FA 0%, #E7E3F5 100%)",
    darkBg: "linear-gradient(180deg, #13122E 0%, #080A1F 100%)",
    lightBorder: "#DFDAF2",
    darkBorder: "rgba(245, 158, 11, 0.35)",
  },
  {
    id: "calculate",
    stepNumber: "03",
    eyebrow: "03 / REAL-TIME ASTM MATRIX",
    heading: "ASTM Table 54B In Real Time.",
    sentence: "Open the calculation breakdown to review the survey mass and each tank’s contribution before submitting it for review.",
    tag: "Tank-Level Breakdown",
    screenshot: "WhatsApp Image 2026-10-09 at 11.09.07 PM (8).jpeg",
    screenshotAlt: "Space BQS calculation breakdown showing custody transfer mass, tank-level calculations, and the Submit action",
    calloutTitle: "Follow The Tank-Level Result",
    calloutDetail: "Calculation breakdown · review · submit",
    accentColor: "#4E8DEB",
    lightBg: "linear-gradient(180deg, #F0F9F6 0%, #DFEFE9 100%)",
    darkBg: "linear-gradient(180deg, #0A2224 0%, #031417 100%)",
    lightBorder: "#D2E7DF",
    darkBorder: "rgba(78, 141, 235, 0.35)",
  },
  {
    id: "certify",
    stepNumber: "04",
    eyebrow: "04 / COMPLETED SURVEY RECORDS",
    heading: "The Completed Survey, Ready To Revisit.",
    sentence: "Find completed surveys with net mass, correction factor, and observed volume together. Return to the report and soundings when you need to check the record.",
    tag: "Reports & Soundings",
    screenshot: "WhatsApp Image 2026-10-09 at 11.09.07 PM (2).jpeg",
    screenshotAlt: "Space BQS recent completed surveys showing net mass, volume correction factor, and View Report and Soundings",
    calloutTitle: "Return To The Completed Record",
    calloutDetail: "Net mass · VCF · report & soundings",
    accentColor: "#10B981",
    lightBg: "linear-gradient(180deg, #FAF2F2 0%, #F5E3E3 100%)",
    darkBg: "linear-gradient(180deg, #22121B 0%, #11080D 100%)",
    lightBorder: "#EBD6D6",
    darkBorder: "rgba(16, 185, 129, 0.35)",
  },
];

const DEVICE_CARDS = [
  {
    id: "phone" as const,
    category: "Smartphones",
    title: "iPhone & Android.",
    description: "Pocket QR identification and offline tank capture anywhere on deck.",
    href: "/mobile-app",
    linkLabel: "Explore the mobile app for iPhone and Android",
    icon: Smartphone,
    tags: ["iOS App Store", "Google Play"],
    image: phoneIllustration,
    alt: "3D editorial illustration of Space BQS smartphone app with QR scan and tank telemetry",
    darkBackdrop: false,
    wide: false,
  },
  {
    id: "tablet" as const,
    category: "Tablets & Rugged Gear",
    title: "iPad & Field Tablets.",
    description: "Wide calibration grids built for rugged tablets and gloved deck entry.",
    href: "/mobile-app",
    linkLabel: "Explore the mobile app for iPad and rugged tablets",
    icon: Tablet,
    tags: ["iPadOS", "Android Tablet", "72h Offline"],
    image: tabletIllustration,
    alt: "3D editorial illustration of Space BQS rugged field tablet with tank gauge interface",
    darkBackdrop: true,
    wide: false,
  },
  {
    id: "desktop" as const,
    category: "Desktop & Web Portal",
    title: "Mac, Windows & Every Browser.",
    description:
      "Review deck submissions, verify fleet-wide Table 54B calculations, and lock tamper-evident A4 PDF certificates and 4-sheet Excel workbooks.",
    href: "/platform",
    linkLabel: "Explore the office web portal for Mac and Windows",
    icon: Monitor,
    tags: ["macOS", "Windows", "Chrome · Safari · Edge"],
    image: desktopIllustration,
    alt: "3D editorial illustration of Space BQS desktop and laptop web portal dashboards",
    darkBackdrop: false,
    wide: true,
  },
] as const;

export default function DeckInteractiveShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const screenWrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const screenRefs = useRef<(HTMLDivElement | null)[]>([]);
  const floatingCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lastY = useRef<number[]>([0, 640, 640, 640]);
  const activeCardIdx = useRef<number>(0);
  const scaleRef = useRef<number>(0.82);

  // Recalculate phone scale on resize
  const measure = useCallback(() => {
    if (!stageRef.current) return;
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    let s = 0.82;
    if (vw < 860) {
      s = Math.min(0.82, Math.max(0.65, (vw - 40) / 350));
    } else {
      // Calculate responsive scale to ensure phone height comfortably fits inside card & viewport
      s = Math.min(0.85, Math.max(0.66, (vh - 120) / 656));
    }
    scaleRef.current = s;
    stageRef.current.style.setProperty("--s", s.toFixed(4));
  }, []);

  // Update boundary wipe and phone position without moving the captured app UI.
  const updateWipe = useCallback(() => {
    if (window.innerWidth < 861) return;
    if (!screenWrapperRef.current || !phoneRef.current || !stageRef.current) return;

    const vh = window.innerHeight;
    const stageRect = stageRef.current.getBoundingClientRect();

    // 0. OFF-SCREEN CHECK: If section is completely outside viewport, avoid layout work
    if (stageRect.bottom < -100 || stageRect.top > vh + 100) return;

    const scale = scaleRef.current || 0.82;
    const screenHeight = screenWrapperRef.current.offsetHeight;

    // BATCH READ PHASE: Read all bounding rects in one pass to eliminate layout thrashing
    const screenRect = screenWrapperRef.current.getBoundingClientRect();
    const cardRects = cardRefs.current.map((el) => (el ? el.getBoundingClientRect() : null));

    const card0Rect = cardRects[0];
    const cardLastRect = cardRects[STAGES.length - 1];

    let phoneTopInsideStage = 0;
    let phoneOpacity = 0;
    let hasPhoneCalc = false;

    if (card0Rect && cardLastRect) {
      hasPhoneCalc = true;
      const card0Center = card0Rect.top + card0Rect.height * 0.5;
      const cardLastCenter = cardLastRect.top + cardLastRect.height * 0.5;
      const normalCenter = vh * 0.5;

      let targetCenterY = normalCenter;
      if (cardLastCenter < normalCenter) {
        targetCenterY = cardLastCenter;
      } else if (card0Center > normalCenter) {
        targetCenterY = card0Center;
      }

      phoneTopInsideStage = targetCenterY - stageRect.top;

      const fadeIn = Math.min(1, Math.max(0, (vh - (card0Center - 100)) / (vh * 0.4)));
      const fadeOut = Math.min(1, Math.max(0, (cardLastCenter + 100) / (vh * 0.4)));
      phoneOpacity = Math.min(fadeIn, fadeOut);
    }

    // Prepare wipes
    const wipes: { index: number; roundedY: number }[] = [];
    for (let i = 1; i < STAGES.length; i++) {
      const cardRect = cardRects[i];
      if (!cardRect) continue;

      const rawY = (cardRect.top - screenRect.top) / scale;
      const clampedY = Math.min(screenHeight, Math.max(0, rawY));
      const roundedY = Math.round(clampedY * 2) / 2;

      if (Math.abs(roundedY - (lastY.current[i] || 0)) >= 0.5) {
        lastY.current[i] = roundedY;
        wipes.push({ index: i, roundedY });
      }
    }

    // Determine active card
    const phoneCenterY = screenRect.top + screenRect.height * 0.5;
    let currentActive = 0;
    for (let i = 0; i < STAGES.length; i++) {
      const cardRect = cardRects[i];
      if (!cardRect) continue;
      if (cardRect.top <= phoneCenterY + 40) {
        currentActive = i;
      }
    }

    // BATCH WRITE PHASE: Apply all style mutations together with zero forced reflows
    if (hasPhoneCalc) {
      phoneRef.current.style.transform = `translateY(${phoneTopInsideStage - 328}px) scale(var(--s, 0.82))`;
      phoneRef.current.style.opacity = phoneOpacity.toFixed(3);
      phoneRef.current.style.visibility = phoneOpacity > 0.01 ? "visible" : "hidden";
    }

    for (const w of wipes) {
      const scrEl = screenRefs.current[w.index];
      if (scrEl) {
        scrEl.style.clipPath = `inset(${w.roundedY}px 0 0 0)`;
      }
    }

    if (currentActive !== activeCardIdx.current) {
      activeCardIdx.current = currentActive;
      floatingCardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl) return;
        if (idx === currentActive) {
          cardEl.classList.add("on");
        } else {
          cardEl.classList.remove("on");
        }
      });
    }
  }, []);

  useViewportScroll(containerRef, updateWipe);

  // Native scroll & resize fallback listeners
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure, { passive: true });
    updateWipe();

    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [measure, updateWipe]);

  return (
    <section
      id="deck-showcase"
      className="relative py-16 sm:py-24 bg-[#F7FAFD] text-[#031038]"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <WeightText
            tag="h2"
            mode="scroll-reveal"
            restWeight={400}
            activeWeight={800}
            baseColor="rgba(3, 16, 56, 0.4)"
            activeColor="#032AAC"
            accentColor="#19B5C9"
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] max-w-4xl mx-auto"
          >
            How The Surveyor Moves From Deck To Proof.
          </WeightText>
          <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-[#031038]/70">
            Follow the survey workflow through real Space BQS app screens—from
            vessel selection and offline calculations to completed records.
          </p>
        </div>

        {/* ─── SCROLL SECTION WRAPPER ─── */}
        <div ref={containerRef} className="relative">

          {/* ─── STAGE OVERLAY: FIRST CHILD WITH NEGATIVE MARGIN ─── */}
          <div
            ref={stageRef}
            aria-hidden="true"
            className="stage hidden min-[861px]:block sticky top-0 h-[100svh] -mb-[100svh] z-10 pointer-events-none"
            style={{ "--s": "0.82" } as React.CSSProperties}
          >
            {/* Physical Phone Container — Positioned in the right column, vertically anchored */}
            <div
              ref={phoneRef}
              className="phone-container absolute right-[5%] lg:right-[8%] xl:right-[10%] select-none pointer-events-none"
              style={{
                width: 304,
                height: 656,
                top: 0,
                transform: "translateY(0) scale(var(--s, 0.82))",
                transformOrigin: "center right",
                opacity: 0,
                transition: "opacity 0.2s ease-out",
              }}
            >
              {/* Phone Outer Chassis (Steel Ring & Deep Drop Shadow) */}
              <div
                className="relative w-full h-full rounded-[52px] bg-[#101319]"
                style={{
                  boxShadow:
                    "0 0 0 2px #3c4048, 0 0 0 3.5px #181b22, 0 35px 70px -15px rgba(3, 16, 56, 0.35), 0 10px 25px -5px rgba(3, 16, 56, 0.2)",
                }}
              >
                {/* Physical Action Buttons (Left) */}
                <div className="absolute -left-[3px] top-[108px] w-[3px] h-[30px] rounded-l-sm bg-[#3c4048]" />
                <div className="absolute -left-[3px] top-[156px] w-[3px] h-[48px] rounded-l-sm bg-[#3c4048]" />
                <div className="absolute -left-[3px] top-[216px] w-[3px] h-[48px] rounded-l-sm bg-[#3c4048]" />
                {/* Power Button (Right) */}
                <div className="absolute -right-[3px] top-[180px] w-[3px] h-[72px] rounded-r-sm bg-[#3c4048]" />

                {/* ─── SCREEN VIEWPORT WRAPPER (.scr) ─── */}
                <div
                  ref={screenWrapperRef}
                  className="scr absolute inset-[8px] rounded-[44px] overflow-hidden bg-black"
                >
                  {/* Real app captures; the existing scroll wipe switches the image. */}
                  {STAGES.map((stage, index) => (
                    <div
                      key={stage.id}
                      ref={(el) => { screenRefs.current[index] = el; }}
                      className="s absolute inset-0 bg-[#dcefff]"
                      style={index > 0 ? { clipPath: "inset(100% 0 0 0)" } : undefined}
                    >
                      <Image
                        src={`/assets/mobile_image/${encodeURIComponent(stage.screenshot)}`}
                        alt={stage.screenshotAlt}
                        width={576}
                        height={1280}
                        sizes="260px"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ))}
                </div>

                {/* Explanatory captions, not simulated app notifications. */}
                {STAGES.map((stage, index) => (
                  <div
                    key={stage.id}
                    ref={(el) => { floatingCardRefs.current[index] = el; }}
                    className={`floating-card ${index === 0 ? "on" : ""} absolute -left-28 lg:-left-36 top-[210px] z-30 max-w-[200px]`}
                  >
                    <div className="liquid-glass-ui liquid-glass-ui--strong rounded-2xl p-3.5 shadow-2xl border border-l-[3px] border-[#D3E9F3] text-[#031038]" style={{ borderLeftColor: stage.accentColor }}>
                      <span className="mb-1.5 block font-mono text-[8px] uppercase tracking-wider text-[#031038]/60">Actual app screen · {stage.stepNumber}</span>
                      <p className="text-xs font-bold leading-tight">{stage.calloutTitle}</p>
                      <p className="mt-1.5 text-[9px] leading-relaxed text-[#031038]/70">{stage.calloutDetail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── STACKED FULL-HEIGHT CARDS LIST ─── */}
          <div className="space-y-[18px]">
            {STAGES.map((stage, idx) => (
              <div
                key={stage.id}
                ref={(el) => { cardRefs.current[idx] = el; }}
                className="relative rounded-[38px] p-8 sm:p-14 lg:p-16 min-[861px]:h-[calc(100svh-32px)] min-h-[600px] flex flex-col justify-between gap-6 overflow-hidden border border-t transition-all duration-500"
                style={{
                  background: stage.lightBg,
                  borderColor: stage.lightBorder,
                }}
              >
                {/* Card Top: Step tag */}
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: stage.accentColor }}
                  />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#031038]/80">
                    {stage.eyebrow}
                  </span>
                </div>

                {/* Card Main: Heading and Muted sentence on Left */}
                <div className="max-w-[340px] sm:max-w-[440px] lg:max-w-[500px] my-auto space-y-5">
                  <WeightText
                    tag="h3"
                    mode="scroll-reveal"
                    restWeight={400}
                    activeWeight={800}
                    baseColor="rgba(3, 16, 56, 0.4)"
                    activeColor="#031038"
                    accentColor={stage.accentColor}
                    className="font-display tracking-tight"
                    style={{
                      fontSize: "clamp(34px, 4.2vw, 64px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {stage.heading}
                  </WeightText>
                  <p className="text-base sm:text-lg leading-relaxed text-[#031038]/70">
                    {stage.sentence}
                  </p>
                </div>

                <div className="mx-auto w-full max-w-[240px] overflow-hidden rounded-[26px] border-[6px] border-[#101319] bg-[#dcefff] shadow-xl min-[861px]:hidden">
                  <Image
                    src={`/assets/mobile_image/${encodeURIComponent(stage.screenshot)}`}
                    alt={stage.screenshotAlt}
                    width={576}
                    height={1280}
                    sizes="228px"
                    className="h-auto w-full"
                  />
                </div>

                {/* Card Bottom Indicator */}
                <div className="flex items-center justify-between text-xs font-mono pt-4 border-t text-[#031038]/40 border-[#031038]/10">
                  <span>Actual Space BQS app screen</span>
                  <span className="font-semibold" style={{ color: stage.accentColor }}>
                    {stage.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Apple-Style 2+1 Bento Compatibility Cards */}
        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#032AAC] mb-2">
              Every Device. One Record.
            </p>
            <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#031038]">
              Built For Phones, Tablets &amp; Desktops.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {DEVICE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.id}
                  data-glass-depth
                  data-glass-surface
                  className={`device-card group relative overflow-hidden rounded-[28px] border transition-all duration-500 ${
                    card.wide
                      ? "md:col-span-2 min-h-[420px] lg:min-h-[450px] flex flex-col md:flex-row justify-between"
                      : "min-h-[490px] sm:min-h-[540px] flex flex-col"
                  } ${
                    card.darkBackdrop
                      ? "border-white/15 bg-gradient-to-b from-[#04143b] via-[#041b54] to-[#03247a] text-white shadow-[0_24px_56px_-26px_rgba(3,16,56,0.6)] hover:shadow-[0_32px_68px_-24px_rgba(3,42,172,0.55)]"
                      : "border-white/90 bg-[#EAF3FC] text-[#031038] shadow-[0_20px_48px_-28px_rgba(3,42,172,0.22)] hover:border-[#19B5C9]/60 hover:shadow-[0_30px_64px_-24px_rgba(3,42,172,0.28)]"
                  }`}
                >
                  {/* Apple Typography Block */}
                  <div
                    className={`relative z-20 flex flex-col justify-between p-7 sm:p-9 lg:p-10 ${
                      card.wide ? "md:w-[42%] md:pr-4" : ""
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Icon
                            className={`h-4 w-4 ${
                              card.darkBackdrop ? "text-[#7dd3e8]" : "text-[#032AAC]"
                            }`}
                            aria-hidden="true"
                          />
                          <span
                            className={`font-mono text-[10px] font-semibold uppercase tracking-[0.16em] ${
                              card.darkBackdrop ? "text-[#7dd3e8]" : "text-[#032AAC]"
                            }`}
                          >
                            {card.category}
                          </span>
                        </div>

                        {/* Apple-style stretched card link button */}
                        <Link
                          href={card.href}
                          aria-label={card.linkLabel}
                          className={`after:absolute after:inset-0 after:z-10 relative z-20 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-105 ${
                            card.darkBackdrop
                              ? "border-white/25 bg-white/10 text-white group-hover:bg-[#19B5C9] group-hover:border-[#19B5C9] group-hover:text-[#031038]"
                              : "border-[#032AAC]/15 bg-white/80 text-[#031038] shadow-xs group-hover:bg-[#032AAC] group-hover:border-[#032AAC] group-hover:text-white"
                          }`}
                        >
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                        </Link>
                      </div>

                      <h4
                        className={`mt-3 font-display font-bold tracking-tight leading-[1.08] ${
                          card.wide
                            ? "text-3xl sm:text-4xl"
                            : "text-2xl sm:text-3xl"
                        }`}
                      >
                        {card.title}
                      </h4>
                      <p
                        className={`mt-2.5 text-sm leading-relaxed ${
                          card.wide ? "max-w-sm" : "max-w-md"
                        } ${card.darkBackdrop ? "text-blue-100/80" : "text-[#52657c]"}`}
                      >
                        {card.description}
                      </p>
                    </div>

                    {card.wide && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/90 bg-white/75 px-3 py-1 font-mono text-[10px] font-semibold text-[#032AAC] shadow-xs backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Large Seamless Feathered Illustration Canvas */}
                  <div
                    className={`relative overflow-hidden ${
                      card.wide
                        ? "h-[280px] sm:h-[320px] md:absolute md:inset-y-0 md:right-0 md:h-full md:w-[68%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%)] md:[mask-image:linear-gradient(to_right,transparent_0%,black_22%)]"
                        : "mt-auto h-[330px] sm:h-[370px] w-full md:absolute md:inset-x-0 md:bottom-0 md:h-[75%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_22%)]"
                    }`}
                  >
                    {/* Multi-plane parallax artwork */}
                    <div className="device-card-art relative h-full w-full will-change-transform">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        sizes={
                          card.wide
                            ? "(min-width: 768px) 780px, 100vw"
                            : "(min-width: 768px) 580px, 100vw"
                        }
                        className={`object-cover ${
                          card.wide
                            ? "object-center"
                            : "object-[center_55%]"
                        }`}
                      />
                    </div>

                    {/* Cursor-following cyan specular lens */}
                    <div
                      aria-hidden="true"
                      className="device-card-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />

                    {/* Diagonal display gloss reflection sweep on hover */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[130%] group-hover:opacity-100"
                    />

                    {/* Device-specific interactive hover feedback directly over the illustration */}
                    {card.id === "phone" && (
                      <div
                        aria-hidden="true"
                        className="device-qr-beam pointer-events-none absolute inset-x-[28%] top-[48%] h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#19B5C9] to-transparent opacity-0 shadow-[0_0_16px_3px_rgba(25,181,201,0.85)] transition-opacity duration-300 group-hover:opacity-100"
                      />
                    )}
                    {card.id === "tablet" && (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute right-[23%] top-[44%] h-20 w-20 -translate-y-1/2 rounded-full border border-[#19B5C9]/55 opacity-0 shadow-[0_0_28px_rgba(25,181,201,0.45)] transition-all duration-500 group-hover:scale-125 group-hover:opacity-100"
                      />
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Deploy Badges */}
          <div className="mt-12 text-center">
            <div className="inline-block p-4 rounded-2xl bg-white border border-[#D3E9F3] shadow-xs">
              <AppStoreBadges dark={false} showSubtitle={false} />
            </div>
            <p className="mt-3 text-xs font-medium text-[#031038]/70">
              Install free on iOS, Android &amp; iPad — or sign in via any desktop web browser
            </p>
          </div>
        </div>
      </div>

      {/* Scoped CSS for the Bevel-style screen clip-path & floating animations */}
      <style jsx>{`
        .phone-container {
          will-change: transform, opacity, top;
        }
        .scr .s {
          will-change: clip-path;
        }
        .floating-card {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .floating-card.on {
          opacity: 1;
          transform: translateY(0);
        }
        .device-card-art {
          transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1),
                      translate 220ms ease-out;
        }
        .device-card:hover .device-card-art,
        .device-card[data-glass-active] .device-card-art {
          transform: scale(1.065);
          translate: calc((50% - var(--glass-x, 50%)) * 0.08)
                     calc((50% - var(--glass-y, 50%)) * 0.06);
        }
        .device-card-spotlight {
          background: radial-gradient(
            260px circle at var(--glass-x, 50%) var(--glass-y, 50%),
            rgba(25, 181, 201, 0.24),
            rgba(255, 255, 255, 0.16) 40%,
            transparent 74%
          );
        }
        @keyframes qrBeamScan {
          0%, 100% { transform: translateY(-22px); }
          50% { transform: translateY(22px); }
        }
        .device-card:hover .device-qr-beam {
          animation: qrBeamScan 1.8s ease-in-out infinite;
        }
        @media (max-width: 860px) {
          .phone-container {
            right: auto !important;
            left: 50% !important;
            top: auto !important;
            bottom: -30px !important;
            transform: translateX(-50%) scale(var(--s, 0.8)) !important;
            transform-origin: bottom center !important;
          }
          .floating-card {
            display: none !important;
          }
        }
        @media (prefers-reduced-motion: reduce), (hover: none), (pointer: coarse) {
          .floating-card,
          .device-card-art {
            transition: none !important;
          }
          .device-card:hover .device-card-art,
          .device-card[data-glass-active] .device-card-art {
            transform: none !important;
            translate: none !important;
          }
          .device-card:hover .device-qr-beam {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
