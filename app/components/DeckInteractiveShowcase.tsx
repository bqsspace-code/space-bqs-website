"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { AppStoreBadges } from "./HomeEnhancements";
import { useViewportScroll } from "./useViewportScroll";
import WeightText from "./WeightText";

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
    heading: "Scan and verify at the manifold.",
    sentence: "Choose the vessel or scan its QR code, then select Bunker Delivery, ROB, or Debunkering to start the survey.",
    tag: "Vessel & Survey Context",
    screenshot: "WhatsApp Image 2026-10-09 at 11.09.07 PM (6).jpeg",
    screenshotAlt: "Space BQS new survey screen with vessel selection, Scan vessel QR, and survey type choices",
    calloutTitle: "Start with the right vessel",
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
    heading: "Capture on deck. Zero cellular signal.",
    sentence: "Review net volume and the live survey total on the device. Save a draft and retain your calculation without a cellular connection.",
    tag: "Offline Calculation Preview",
    screenshot: "WhatsApp Image 2026-10-09 at 11.09.07 PM (7).jpeg",
    screenshotAlt: "Space BQS offline calculation preview with net volume, live survey total, field remarks, and Save and Calculate",
    calloutTitle: "Your working stays on deck",
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
    heading: "ASTM Table 54B in real time.",
    sentence: "Open the calculation breakdown to review the survey mass and each tank’s contribution before submitting it for review.",
    tag: "Tank-Level Breakdown",
    screenshot: "WhatsApp Image 2026-10-09 at 11.09.07 PM (8).jpeg",
    screenshotAlt: "Space BQS calculation breakdown showing custody transfer mass, tank-level calculations, and the Submit action",
    calloutTitle: "Follow the tank-level result",
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
    heading: "The completed survey, ready to revisit.",
    sentence: "Find completed surveys with net mass, correction factor, and observed volume together. Return to the report and soundings when you need to check the record.",
    tag: "Reports & Soundings",
    screenshot: "WhatsApp Image 2026-10-09 at 11.09.07 PM (2).jpeg",
    screenshotAlt: "Space BQS recent completed surveys showing net mass, volume correction factor, and View Report and Soundings",
    calloutTitle: "Return to the completed record",
    calloutDetail: "Net mass · VCF · report & soundings",
    accentColor: "#10B981",
    lightBg: "linear-gradient(180deg, #FAF2F2 0%, #F5E3E3 100%)",
    darkBg: "linear-gradient(180deg, #22121B 0%, #11080D 100%)",
    lightBorder: "#EBD6D6",
    darkBorder: "rgba(16, 185, 129, 0.35)",
  },
];

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
            How the surveyor moves from deck to proof.
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

        {/* Deploy Badges Below Section */}
        <div className="mt-16 text-center">
          <p className="text-xs font-semibold mb-3 font-mono uppercase tracking-wider text-[#031038]/70">
            Available for iOS & Android
          </p>
          <div className="inline-block p-4 rounded-2xl bg-white border border-[#D3E9F3] shadow-xs">
            <AppStoreBadges dark={false} />
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
        @media (prefers-reduced-motion: reduce) {
          .floating-card {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
