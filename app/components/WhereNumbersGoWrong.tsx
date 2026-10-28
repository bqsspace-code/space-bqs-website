"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLenis } from "lenis/react";
import WeightText from "./WeightText";
import WaveDivider from "./WaveDivider";

export function WhereNumbersGoWrong() {
  const storyRef = useRef<HTMLDivElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(false);
  const waterlineFillRef = useRef<HTMLDivElement>(null);
  const [activeNodes, setActiveNodes] = useState<boolean[]>([false, false, false]);

  const updateScroll = useCallback(() => {
    if (!storyRef.current || reducedMotionRef.current) return;
    const rect = storyRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalH = rect.height;

    if (totalH > 0 && waterlineFillRef.current) {
      // Start filling when the story top reaches 60% of viewport
      const currentY = windowH * 0.6 - rect.top;
      const targetP = Math.max(0, Math.min(1, currentY / totalH));
      waterlineFillRef.current.style.transform = `scaleY(${targetP})`;
    }

    // Check node activation: when scene center passes 62% of viewport height
    const sceneEls = [scene1Ref.current, scene2Ref.current, scene3Ref.current];
    sceneEls.forEach((el, idx) => {
      if (!el) return;
      const sRect = el.getBoundingClientRect();
      const sCenter = sRect.top + sRect.height * 0.5;
      const reached = sCenter <= windowH * 0.62;
      setActiveNodes((prev) => {
        if (prev[idx] === reached) return prev;
        const next = [...prev];
        next[idx] = reached;
        return next;
      });
    });
  }, []);

  // Hook directly into Lenis smooth-scroll loop for 60fps frame-synced updates
  useLenis(updateScroll, [updateScroll]);

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      reducedMotionRef.current = true;
      if (waterlineFillRef.current) {
        waterlineFillRef.current.style.transform = "scaleY(1)";
      }
      setActiveNodes([true, true, true]);
      return;
    }

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [updateScroll]);

  return (
    <section
      id="friction"
      className="relative overflow-hidden"
      style={{ background: "#F7FBFD" }}
      aria-labelledby="friction-heading"
    >
      {/* ─── Top Liquid Wave Divider ─── */}
      <div className="w-full relative z-10 -mb-1 pointer-events-none" aria-hidden="true">
        <WaveDivider
          direction="down"
          layers={2}
          colors={["#EAF4F9", "#D3E9F3"]}
          height={65}
          kinetic={true}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 pt-[clamp(56px,8vw,120px)] pb-[clamp(56px,8vw,120px)]">
        {/* ─── Section Header with Scroll-Reveal Weight & Color Animation ─── */}
        <header className="max-w-[760px] mx-auto text-left min-[861px]:text-center mb-16 sm:mb-24">
          <WeightText
            tag="h2"
            mode="scroll-reveal"
            restWeight={300}
            activeWeight={800}
            baseColor="#031038"
            activeColor="#032AAC"
            accentColor="#19B5C9"
            className="font-display text-[clamp(40px,6.4vw,92px)] leading-[0.98] tracking-[-0.035em] font-extrabold inline-block"
          >
            Where survey numbers go wrong
          </WeightText>

          <p className="mt-6 font-sans text-[clamp(18px,2vw,19px)] leading-[1.6] text-[#031038]/70 max-w-[44ch] mx-0 min-[861px]:mx-auto font-normal">
            The mistakes rarely happen at the tank. They happen on the way from
            deck to desk, and surface months later.
          </p>
        </header>

        {/* ─── Continuous Story with Waterline ─── */}
        <div ref={storyRef} className="relative">
          {/* Continuous Waterline Spine Track */}
          <div
            className="absolute top-8 bottom-8 w-[2px] bg-[#D3E9F3] rounded-full left-[14px] min-[861px]:left-1/2 min-[861px]:-translate-x-1/2 pointer-events-none"
            aria-hidden="true"
          >
            {/* Waterline Fill Indicator with smooth scale transition */}
            <div
              ref={waterlineFillRef}
              className="w-full h-full rounded-full origin-top transition-transform duration-150 ease-out"
              style={{
                background: "linear-gradient(to bottom, #19B5C9, #032AAC)",
                transform: "scaleY(0)",
              }}
            />
          </div>

          {/* ═══════════════ SCENE 1: ON DECK ═══════════════ */}
          <div
            ref={scene1Ref}
            className="relative grid grid-cols-1 min-[861px]:grid-cols-2 gap-[clamp(40px,7vw,110px)] items-center py-[clamp(28px,4vw,56px)] pl-9 min-[861px]:pl-0"
          >
            {/* Interactive Spine Node 1 */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full left-[14px] min-[861px]:left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ease-out ${
                activeNodes[0]
                  ? "bg-[#032AAC] border-2 border-[#032AAC] shadow-[0_0_0_8px_rgba(3,42,172,0.12)]"
                  : "bg-[#F7FBFD] border-2 border-[#A5D3E8]"
              }`}
              aria-hidden="true"
            />

            {/* Illustration 1 (Desktop: Left Col, Mobile: Order 1) */}
            <div className="order-1 min-[861px]:order-1 flex justify-center">
              <Scene1Illustration />
            </div>

            {/* Content 1 (Desktop: Right Col, Mobile: Order 2) */}
            <div className="order-2 min-[861px]:order-2 min-[861px]:pl-10 text-left">
              <div className="flex items-center gap-3 mb-2.5">
                <span
                  className="w-7 h-[2px] bg-[#19B5C9] rounded-full inline-block"
                  aria-hidden="true"
                />
                <span className="font-sans text-[15px] font-medium text-[#032AAC]">
                  On deck
                </span>
              </div>

              <h3 className="font-display text-[clamp(32px,4vw,52px)] leading-[1.04] tracking-[-0.03em] font-bold text-[#031038] mt-3">
                Paper that gets retyped
              </h3>

              <p className="font-sans text-[18px] sm:text-[19px] leading-[1.6] text-[#031038]/85 font-normal mt-4 max-w-[44ch]">
                Numbers written on deck are typed again at a desk, and every copy
                is a chance for a slip.
              </p>

              <details className="group mt-4 cursor-pointer">
                <summary className="list-none select-none text-[15px] font-semibold text-[#032AAC] inline-flex items-center gap-2 hover:text-[#1B4FD1] focus-visible:outline-2 focus-visible:outline-[#19B5C9] focus-visible:outline-offset-3 rounded-md transition-colors">
                  <span>Read more</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-open:rotate-90 text-[#032AAC]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </summary>
                <p className="mt-3 text-[15px] sm:text-[16px] leading-[1.6] text-[#031038]/70 max-w-[44ch]">
                  Soundings transcribed from rain-soaked deck notebooks into
                  office Excel create discrepancies between the surveyor&apos;s
                  observation and the final report that are impossible to defend.
                </p>
              </details>

              <div className="mt-6 pt-5 border-t border-[#D3E9F3] flex items-center gap-3.5 max-w-[44ch]">
                <div className="w-6 h-6 rounded-full bg-[#19B5C9] flex items-center justify-center shrink-0">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="font-display font-semibold text-[18px] text-[#032AAC]">
                  Typed once, on deck.
                </span>
              </div>
            </div>
          </div>

          {/* ═══════════════ SCENE 2: AT THE DESK (FLIPPED) ═══════════════ */}
          <div
            ref={scene2Ref}
            className="relative grid grid-cols-1 min-[861px]:grid-cols-2 gap-[clamp(40px,7vw,110px)] items-center py-[clamp(28px,4vw,56px)] pl-9 min-[861px]:pl-0"
          >
            {/* Interactive Spine Node 2 */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full left-[14px] min-[861px]:left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ease-out ${
                activeNodes[1]
                  ? "bg-[#032AAC] border-2 border-[#032AAC] shadow-[0_0_0_8px_rgba(3,42,172,0.12)]"
                  : "bg-[#F7FBFD] border-2 border-[#A5D3E8]"
              }`}
              aria-hidden="true"
            />

            {/* Content 2 (Desktop: Left Col [Flipped], Mobile: Order 2) */}
            <div className="order-2 min-[861px]:order-1 min-[861px]:pr-10 text-left">
              <div className="flex items-center gap-3 mb-2.5">
                <span
                  className="w-7 h-[2px] bg-[#19B5C9] rounded-full inline-block"
                  aria-hidden="true"
                />
                <span className="font-sans text-[15px] font-medium text-[#032AAC]">
                  At the desk
                </span>
              </div>

              <h3 className="font-display text-[clamp(32px,4vw,52px)] leading-[1.04] tracking-[-0.03em] font-bold text-[#031038] mt-3">
                Formulas that quietly break
              </h3>

              <p className="font-sans text-[18px] sm:text-[19px] leading-[1.6] text-[#031038]/85 font-normal mt-4 max-w-[44ch]">
                A spreadsheet copied between jobs carries its mistakes with it.
              </p>

              <details className="group mt-4 cursor-pointer">
                <summary className="list-none select-none text-[15px] font-semibold text-[#032AAC] inline-flex items-center gap-2 hover:text-[#1B4FD1] focus-visible:outline-2 focus-visible:outline-[#19B5C9] focus-visible:outline-offset-3 rounded-md transition-colors">
                  <span>Read more</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-open:rotate-90 text-[#032AAC]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </summary>
                <p className="mt-3 text-[15px] sm:text-[16px] leading-[1.6] text-[#031038]/70 max-w-[44ch]">
                  Pasted strapping tables, hard-coded density lookups, and
                  unverified Table 54B approximations skew metric tonnage
                  without any error warning.
                </p>
              </details>

              <div className="mt-6 pt-5 border-t border-[#D3E9F3] flex items-center gap-3.5 max-w-[44ch]">
                <div className="w-6 h-6 rounded-full bg-[#19B5C9] flex items-center justify-center shrink-0">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="font-display font-semibold text-[18px] text-[#032AAC]">
                  One tested engine for every job.
                </span>
              </div>
            </div>

            {/* Illustration 2 (Desktop: Right Col [Flipped], Mobile: Order 1) */}
            <div className="order-1 min-[861px]:order-2 flex justify-center">
              <Scene2Illustration />
            </div>
          </div>

          {/* ═══════════════ SCENE 3: MONTHS LATER ═══════════════ */}
          <div
            ref={scene3Ref}
            className="relative grid grid-cols-1 min-[861px]:grid-cols-2 gap-[clamp(40px,7vw,110px)] items-center py-[clamp(28px,4vw,56px)] pl-9 min-[861px]:pl-0"
          >
            {/* Interactive Spine Node 3 */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full left-[14px] min-[861px]:left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ease-out ${
                activeNodes[2]
                  ? "bg-[#032AAC] border-2 border-[#032AAC] shadow-[0_0_0_8px_rgba(3,42,172,0.12)]"
                  : "bg-[#F7FBFD] border-2 border-[#A5D3E8]"
              }`}
              aria-hidden="true"
            />

            {/* Illustration 3 (Desktop: Left Col, Mobile: Order 1) */}
            <div className="order-1 min-[861px]:order-1 flex justify-center">
              <Scene3Illustration />
            </div>

            {/* Content 3 (Desktop: Right Col, Mobile: Order 2) */}
            <div className="order-2 min-[861px]:order-2 min-[861px]:pl-10 text-left">
              <div className="flex items-center gap-3 mb-2.5">
                <span
                  className="w-7 h-[2px] bg-[#19B5C9] rounded-full inline-block"
                  aria-hidden="true"
                />
                <span className="font-sans text-[15px] font-medium text-[#032AAC]">
                  Months later
                </span>
              </div>

              <h3 className="font-display text-[clamp(32px,4vw,52px)] leading-[1.04] tracking-[-0.03em] font-bold text-[#031038] mt-3">
                Files nobody can find
              </h3>

              <p className="font-sans text-[18px] sm:text-[19px] leading-[1.6] text-[#031038]/85 font-normal mt-4 max-w-[44ch]">
                When a claim arrives months later, the proof is somewhere in an
                inbox.
              </p>

              <details className="group mt-4 cursor-pointer">
                <summary className="list-none select-none text-[15px] font-semibold text-[#032AAC] inline-flex items-center gap-2 hover:text-[#1B4FD1] focus-visible:outline-2 focus-visible:outline-[#19B5C9] focus-visible:outline-offset-3 rounded-md transition-colors">
                  <span>Read more</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-open:rotate-90 text-[#032AAC]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </summary>
                <p className="mt-3 text-[15px] sm:text-[16px] leading-[1.6] text-[#031038]/70 max-w-[44ch]">
                  Charterers or suppliers question quantities 90 days after
                  delivery. Trying to reconstruct the surveyor&apos;s exact math
                  from scattered email threads leads to painful settlements.
                </p>
              </details>

              <div className="mt-6 pt-5 border-t border-[#D3E9F3] flex items-center gap-3.5 max-w-[44ch]">
                <div className="w-6 h-6 rounded-full bg-[#19B5C9] flex items-center justify-center shrink-0">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="font-display font-semibold text-[18px] text-[#032AAC]">
                  One locked record you can open.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Liquid Wave Divider ─── */}
      <div className="w-full relative z-10 -mt-1 pointer-events-none" aria-hidden="true">
        <WaveDivider
          direction="up"
          layers={2}
          colors={["#D3E9F3", "#EAF4F9"]}
          height={65}
          kinetic={true}
        />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 1. ILLUSTRATION 1: "On deck" — Paper that gets retyped
// ─────────────────────────────────────────────────────────────
export function Scene1Illustration() {
  return (
    <svg
      viewBox="0 0 560 420"
      className="w-full max-w-[540px] h-auto overflow-visible select-none"
      role="img"
      aria-label="Illustration of handwritten sounding notebook on deck being retyped into laptop with an error"
    >
      {/* Organic Stage Blob in --mist */}
      <path
        d="M 70,190 C 50,85 150,35 270,40 C 390,45 500,95 515,210 C 530,325 430,390 290,395 C 150,400 90,295 70,190 Z"
        fill="#EAF4F9"
      />

      {/* 4 Diagonal Rain Strokes in --lagoon (55% opacity) */}
      <line
        x1="120"
        y1="42"
        x2="110"
        y2="66"
        stroke="#19B5C9"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <line
        x1="150"
        y1="36"
        x2="140"
        y2="60"
        stroke="#19B5C9"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <line
        x1="185"
        y1="48"
        x2="175"
        y2="72"
        stroke="#19B5C9"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <line
        x1="215"
        y1="40"
        x2="205"
        y2="64"
        stroke="#19B5C9"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Notebook (rotated -6 degrees) */}
      <g transform="translate(160, 230) rotate(-6) translate(-95, -125)">
        {/* Notebook Body */}
        <rect
          x="0"
          y="0"
          width="185"
          height="245"
          rx="14"
          fill="#FFFFFF"
          stroke="#A5D3E8"
          strokeWidth="2"
        />

        {/* Spiral Holes down left edge in --tide */}
        <circle cx="15" cy="32" r="4.5" fill="#F7FBFD" stroke="#D3E9F3" strokeWidth="2" />
        <circle cx="15" cy="64" r="4.5" fill="#F7FBFD" stroke="#D3E9F3" strokeWidth="2" />
        <circle cx="15" cy="96" r="4.5" fill="#F7FBFD" stroke="#D3E9F3" strokeWidth="2" />
        <circle cx="15" cy="128" r="4.5" fill="#F7FBFD" stroke="#D3E9F3" strokeWidth="2" />
        <circle cx="15" cy="160" r="4.5" fill="#F7FBFD" stroke="#D3E9F3" strokeWidth="2" />
        <circle cx="15" cy="192" r="4.5" fill="#F7FBFD" stroke="#D3E9F3" strokeWidth="2" />
        <circle cx="15" cy="224" r="4.5" fill="#F7FBFD" stroke="#D3E9F3" strokeWidth="2" />

        {/* Five Ruled Lines in --tide */}
        <line x1="34" y1="88" x2="170" y2="88" stroke="#D3E9F3" strokeWidth="1.5" />
        <line x1="34" y1="120" x2="170" y2="120" stroke="#D3E9F3" strokeWidth="1.5" />
        <line x1="34" y1="152" x2="170" y2="152" stroke="#D3E9F3" strokeWidth="1.5" />
        <line x1="34" y1="184" x2="170" y2="184" stroke="#D3E9F3" strokeWidth="1.5" />
        <line x1="34" y1="216" x2="170" y2="216" stroke="#D3E9F3" strokeWidth="1.5" />

        {/* Label "Tank 1P" in --marine */}
        <text
          x="36"
          y="52"
          fontFamily="Inter, sans-serif"
          fontSize="13"
          fontWeight="600"
          fill="#032AAC"
        >
          Tank 1P
        </text>

        {/* Handwritten "4.250 m" in Caveat ~52px in --abyss */}
        <text
          x="36"
          y="142"
          fontFamily="'Caveat', cursive, sans-serif"
          fontSize="50"
          fontWeight="600"
          fill="#031038"
        >
          4.250 m
        </text>

        {/* Two Wet-Paper Blots in --shallow at 40-50% opacity */}
        <ellipse cx="140" cy="112" rx="22" ry="16" fill="#A5D3E8" opacity="0.45" />
        <ellipse cx="70" cy="192" rx="26" ry="18" fill="#A5D3E8" opacity="0.4" />
      </g>

      {/* Dotted Curved Arrow in --cobalt */}
      <path
        d="M 245,190 C 285,140 325,140 355,175"
        fill="none"
        stroke="#1B4FD1"
        strokeWidth="2.2"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />
      <polygon points="360,180 348,172 352,182" fill="#1B4FD1" />
      {/* Label "retyped at a desk" in 15px Inter medium */}
      <text
        x="300"
        y="132"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="14.5"
        fontWeight="500"
        fill="#032AAC"
      >
        retyped at a desk
      </text>

      {/* Laptop */}
      <g transform="translate(325, 160)">
        {/* Laptop Screen in --marine outline */}
        <rect
          x="15"
          y="0"
          width="195"
          height="130"
          rx="12"
          fill="#FFFFFF"
          stroke="#032AAC"
          strokeWidth="2.5"
        />

        {/* 3 rows and 3 columns grid in --tide */}
        <line x1="75" y1="0" x2="75" y2="130" stroke="#D3E9F3" strokeWidth="1.5" />
        <line x1="135" y1="0" x2="135" y2="130" stroke="#D3E9F3" strokeWidth="1.5" />
        <line x1="15" y1="42" x2="210" y2="42" stroke="#D3E9F3" strokeWidth="1.5" />
        <line x1="15" y1="86" x2="210" y2="86" stroke="#D3E9F3" strokeWidth="1.5" />

        <text x="45" y="26" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="rgba(3,16,56,0.45)">Tank</text>
        <text x="105" y="26" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="rgba(3,16,56,0.45)">Sounding</text>
        <text x="172" y="26" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="rgba(3,16,56,0.45)">Vol (m³)</text>

        <text x="45" y="68" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="500" fill="rgba(3,16,56,0.6)">1P</text>
        <text x="172" y="68" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="500" fill="rgba(3,16,56,0.6)">832.4</text>

        <text x="45" y="112" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="500" fill="rgba(3,16,56,0.4)">1S</text>
        <text x="105" y="112" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="500" fill="rgba(3,16,56,0.4)">4.180</text>
        <text x="172" y="112" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="500" fill="rgba(3,16,56,0.4)">821.9</text>

        {/* Highlighted Cell: --buoy 2.5px outline on #FFF3EE fill showing "4.205" */}
        <rect
          x="75"
          y="42"
          width="60"
          height="44"
          fill="#FFF3EE"
          stroke="#FF6A3D"
          strokeWidth="2.5"
        />
        <text
          x="105"
          y="70"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="15"
          fontWeight="700"
          fill="#031038"
        >
          4.205
        </text>

        {/* Solid --marine Base Bar */}
        <rect x="0" y="128" width="225" height="8" rx="4" fill="#032AAC" />
        <rect x="92" y="131" width="40" height="2.5" rx="1.25" fill="#D3E9F3" />

        {/* Pill below the laptop: "Doesn't match" */}
        <g transform="translate(60, 150)">
          <rect
            width="105"
            height="26"
            rx="13"
            fill="#FFE9E1"
            stroke="#FFC9B8"
            strokeWidth="1.2"
          />
          <text
            x="52.5"
            y="17.5"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontSize="13"
            fontWeight="600"
            fill="#B8340F"
          >
            Doesn&apos;t match
          </text>
        </g>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. ILLUSTRATION 2: "At the desk" — Formulas that quietly break
// ─────────────────────────────────────────────────────────────
export function Scene2Illustration() {
  return (
    <svg
      viewBox="0 0 560 420"
      className="w-full max-w-[540px] h-auto overflow-visible select-none"
      role="img"
      aria-label="Illustration of spreadsheet formulas copied across jobs without warnings"
    >
      {/* Organic Stage Blob in --mist */}
      <path
        d="M 60,200 C 45,90 145,35 280,35 C 415,35 510,95 515,220 C 520,345 425,395 275,395 C 125,395 75,310 60,200 Z"
        fill="#EAF4F9"
      />

      {/* Sheet 1: Job A (Back, 60% opacity) */}
      <g transform="translate(60, 75)" opacity="0.60">
        <rect width="250" height="175" rx="10" fill="#FFFFFF" stroke="#A5D3E8" strokeWidth="2" />
        <rect width="250" height="32" rx="10" fill="#A5D3E8" />
        <rect y="16" width="250" height="16" fill="#A5D3E8" />
        <text x="18" y="21" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="#032AAC">
          Job A
        </text>
        <line x1="0" y1="80" x2="250" y2="80" stroke="#D3E9F3" strokeWidth="1.5" />
        <line x1="0" y1="128" x2="250" y2="128" stroke="#D3E9F3" strokeWidth="1.5" />
        <line x1="110" y1="32" x2="110" y2="175" stroke="#D3E9F3" strokeWidth="1.5" />
        <circle cx="170" cy="104" r="5" fill="#FF6A3D" />
      </g>

      {/* Sheet 2: Job B (Middle, 85% opacity) */}
      <g transform="translate(85, 100)" opacity="0.85">
        <rect width="250" height="175" rx="10" fill="#FFFFFF" stroke="#A5D3E8" strokeWidth="2" />
        <rect width="250" height="32" rx="10" fill="#032AAC" opacity="0.55" />
        <rect y="16" width="250" height="16" fill="#032AAC" opacity="0.55" />
        <text x="18" y="21" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="#FFFFFF">
          Job B
        </text>
        <line x1="0" y1="80" x2="250" y2="80" stroke="#D3E9F3" strokeWidth="1.5" />
        <line x1="0" y1="128" x2="250" y2="128" stroke="#D3E9F3" strokeWidth="1.5" />
        <line x1="110" y1="32" x2="110" y2="175" stroke="#D3E9F3" strokeWidth="1.5" />
        <circle cx="170" cy="104" r="5" fill="#FF6A3D" />
      </g>

      {/* Sheet 3: Job C (Front, Full 100% opacity) */}
      <g transform="translate(110, 125)">
        <rect width="265" height="190" rx="10" fill="#FFFFFF" stroke="#032AAC" strokeWidth="2.5" />
        {/* Solid --marine header bar */}
        <rect width="265" height="36" rx="10" fill="#032AAC" />
        <rect y="18" width="265" height="18" fill="#032AAC" />
        <text x="20" y="24" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="700" fill="#FFFFFF">
          Job C
        </text>

        {/* Grid lines in --tide */}
        <line x1="110" y1="36" x2="110" y2="190" stroke="#D3E9F3" strokeWidth="1.5" />
        <line x1="0" y1="88" x2="265" y2="88" stroke="#D3E9F3" strokeWidth="1.5" />
        <line x1="0" y1="140" x2="265" y2="140" stroke="#D3E9F3" strokeWidth="1.5" />

        {/* Row 1: Density 0.9500 */}
        <text x="22" y="68" fontFamily="Inter, sans-serif" fontSize="13.5" fontWeight="600" fill="#031038">
          Density
        </text>
        <text x="187" y="68" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="700" fill="#031038">
          0.9500
        </text>

        {/* Row 2: VCF highlighted with --buoy outline, pale fill showing 0.9680 */}
        <rect x="110" y="88" width="155" height="52" fill="#FFF3EE" stroke="#FF6A3D" strokeWidth="2.5" />
        <text x="22" y="120" fontFamily="Inter, sans-serif" fontSize="13.5" fontWeight="600" fill="#031038">
          VCF
        </text>
        <text x="187" y="121" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="700" fill="#031038">
          0.9680
        </text>

        {/* Row 3: Mass ? */}
        <text x="22" y="171" fontFamily="Inter, sans-serif" fontSize="13.5" fontWeight="600" fill="#031038">
          Mass
        </text>
        <text x="187" y="172" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="800" fill="#031038">
          ?
        </text>
      </g>

      {/* Dotted --buoy curves joining Job A and Job B dots to Job C VCF cell */}
      <path
        d="M 230,179 C 265,190 285,220 297,244"
        fill="none"
        stroke="#FF6A3D"
        strokeWidth="2.2"
        strokeDasharray="3 4"
        strokeLinecap="round"
      />
      <path
        d="M 255,204 C 275,215 288,230 297,244"
        fill="none"
        stroke="#FF6A3D"
        strokeWidth="2.2"
        strokeDasharray="3 4"
        strokeLinecap="round"
      />

      {/* Right Side: Calm Aqua Tick in White Circle (~76px, --lagoon 3px stroke) */}
      <g transform="translate(450, 215)">
        <circle cx="0" cy="0" r="38" fill="#FFFFFF" stroke="#19B5C9" strokeWidth="3" />
        <path
          d="M -15,0 L -4,11 L 15,-10"
          fill="none"
          stroke="#19B5C9"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="0"
          y="60"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="15"
          fontWeight="600"
          fill="#032AAC"
        >
          No warning
        </text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. ILLUSTRATION 3: "Months later" — Files nobody can find
// ─────────────────────────────────────────────────────────────
export function Scene3Illustration() {
  return (
    <svg
      viewBox="0 0 560 420"
      className="w-full max-w-[540px] h-auto overflow-visible select-none"
      role="img"
      aria-label="Illustration of lost survey emails, 90-day dispute claim, and missing documentation"
    >
      {/* Organic Stage Blob in --mist */}
      <path
        d="M 65,190 C 45,85 145,40 280,45 C 415,50 505,105 515,225 C 525,345 425,395 285,390 C 145,385 85,295 65,190 Z"
        fill="#EAF4F9"
      />

      {/* Dotted --shallow squiggle suggesting tangled email threads */}
      <path
        d="M 85,160 C 120,110 180,180 230,130 C 265,95 240,210 295,170"
        fill="none"
        stroke="#A5D3E8"
        strokeWidth="2.2"
        strokeDasharray="3 5"
        opacity="0.85"
      />

      {/* Pile of 3 Overlapping Envelopes */}
      {/* Envelope 1 (Back left, -10 deg) */}
      <g transform="translate(145, 250) rotate(-10) translate(-85, -55)">
        <rect width="170" height="110" rx="8" fill="#FFFFFF" stroke="#A5D3E8" strokeWidth="2" />
        <path d="M 0,0 L 85,60 L 170,0" fill="none" stroke="#A5D3E8" strokeWidth="1.8" strokeLinejoin="round" />
      </g>

      {/* Envelope 2 (Back right, 12 deg) */}
      <g transform="translate(200, 265) rotate(12) translate(-85, -55)">
        <rect width="170" height="110" rx="8" fill="#FFFFFF" stroke="#A5D3E8" strokeWidth="2" />
        <path d="M 0,0 L 85,60 L 170,0" fill="none" stroke="#A5D3E8" strokeWidth="1.8" strokeLinejoin="round" />
      </g>

      {/* Envelope 3 (Front, --cobalt stroke, 4 deg) */}
      <g transform="translate(170, 240) rotate(4) translate(-90, -60)">
        <rect width="180" height="120" rx="9" fill="#FFFFFF" stroke="#1B4FD1" strokeWidth="2.4" />
        <path d="M 0,0 L 90,65 L 180,0" fill="none" stroke="#1B4FD1" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="26" y1="84" x2="110" y2="84" stroke="#D3E9F3" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="26" y1="98" x2="80" y2="98" stroke="#D3E9F3" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Calendar Page at Upper Right */}
      <g transform="translate(345, 75)">
        <rect width="145" height="155" rx="14" fill="#FFFFFF" stroke="#D3E9F3" strokeWidth="1.8" />
        {/* Header band in --marine */}
        <rect width="145" height="42" rx="14" fill="#032AAC" />
        <rect y="20" width="145" height="22" fill="#032AAC" />
        {/* Two Ring Holes in white */}
        <circle cx="30" cy="21" r="4.5" fill="#FFFFFF" />
        <circle cx="115" cy="21" r="4.5" fill="#FFFFFF" />
        {/* Word "DAY" in white */}
        <text
          x="72.5"
          y="26"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="13"
          fontWeight="700"
          fill="#FFFFFF"
          letterSpacing="0.08em"
        >
          DAY
        </text>
        {/* Large "90" in Bricolage / bold sans at ~78px in --abyss */}
        <text
          x="72.5"
          y="106"
          textAnchor="middle"
          fontFamily="'Bricolage Grotesque', sans-serif"
          fontSize="78"
          fontWeight="800"
          fill="#031038"
        >
          90
        </text>
        {/* "claim arrives" beneath in --marine */}
        <text
          x="72.5"
          y="138"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="13.5"
          fontWeight="600"
          fill="#032AAC"
        >
          claim arrives
        </text>
      </g>

      {/* Magnifying Glass at Lower Right */}
      <g transform="translate(370, 240)">
        {/* Thick --marine handle */}
        <line x1="68" y1="68" x2="118" y2="118" stroke="#032AAC" strokeWidth="14" strokeLinecap="round" />
        {/* Translucent White Lens (--marine 6px stroke) */}
        <circle cx="34" cy="34" r="44" fill="rgba(255,255,255,0.78)" stroke="#032AAC" strokeWidth="6" />
        {/* Large "?" in --buoy inside the lens */}
        <text
          x="34"
          y="52"
          textAnchor="middle"
          fontFamily="'Bricolage Grotesque', sans-serif"
          fontSize="52"
          fontWeight="800"
          fill="#FF6A3D"
        >
          ?
        </text>
      </g>
    </svg>
  );
}
