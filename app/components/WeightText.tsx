"use client";

import { useRef, useEffect, useState, useCallback, Fragment } from "react";

type WeightMode = "cursor-radius" | "scroll-reveal" | "scroll-scrub" | "whole-text";

interface WeightTextProps {
  id?: string;
  children: React.ReactNode;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  mode?: WeightMode;
  restWeight?: number;
  activeWeight?: number;
  radius?: number;
  activeColor?: string;
  baseColor?: string;
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

type TextSegment =
  | { type: "text"; text: string }
  | { type: "br"; className?: string };

function isBrElement(el: unknown): boolean {
  if (!el || typeof el !== "object") return false;
  const anyEl = el as { type?: unknown };
  const type = anyEl.type;
  if (type === "br" || type === "BR") return true;
  if (typeof type === "string" && (type.toLowerCase() === "br" || type.toLowerCase().endsWith(":br"))) return true;
  if (typeof type === "function" && type.name && type.name.toLowerCase() === "br") return true;
  if (typeof type === "object" && type !== null) {
    const t = type as { name?: string; displayName?: string };
    if (t.name && String(t.name).toLowerCase() === "br") return true;
    if (t.displayName && String(t.displayName).toLowerCase() === "br") return true;
  }
  return false;
}

function parseSegments(node: React.ReactNode): TextSegment[] {
  const segments: TextSegment[] = [];

  function traverse(child: React.ReactNode) {
    if (child == null || typeof child === "boolean") return;
    if (typeof child === "string" || typeof child === "number") {
      segments.push({ type: "text", text: String(child) });
    } else if (Array.isArray(child)) {
      child.forEach(traverse);
    } else if (typeof child === "object" && child !== null) {
      const anyChild = child as any;
      if (isBrElement(anyChild)) {
        segments.push({ type: "br", className: anyChild.props?.className });
      } else if (anyChild.props && "children" in anyChild.props) {
        traverse(anyChild.props.children);
      }
    }
  }

  traverse(node);
  return segments;
}

/**
 * Font Weight Hover — animates a variable font's weight letter by letter.
 *
 * Four modes:
 * - cursor-radius: weight radiates outward from cursor position
 * - scroll-reveal: letters gain weight as they scroll into view
 * - scroll-scrub: a bold band sweeps across as user scrolls
 * - whole-text: entire text animates weight on parent hover
 *
 * Always uses real heading tags. Touch devices fall back to scroll-reveal.
 * Layout-stable: uses breakable words with inline-block spans to guarantee
 * natural text wrapping without clipping off-screen.
 */
export default function WeightText({
  id,
  children,
  tag = "h2",
  mode = "scroll-reveal",
  restWeight = 300,
  activeWeight = 800,
  radius = 160,
  activeColor = "#032AAC",
  baseColor = "#031038",
  accentColor = "#19B5C9",
  className = "",
  style,
}: WeightTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const animRef = useRef<number>(0);

  // Parse text segments and br line breaks
  const segments = parseSegments(children);

  let totalLetters = 0;
  segments.forEach((seg) => {
    if (seg.type === "text") {
      const words = seg.text.split(" ");
      totalLetters += words.reduce((sum, w) => sum + w.length, 0);
    }
  });

  const plainText = segments
    .map((s) => (s.type === "text" ? s.text : " "))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const [letterWeights, setLetterWeights] = useState<number[]>(() =>
    new Array(totalLetters).fill(restWeight)
  );

  const letterCentersRef = useRef<{ x: number; y: number }[]>([]);
  const spansRef = useRef<HTMLSpanElement[]>([]);
  const lastProgressRef = useRef<number>(-1);
  const lastPaintRef = useRef<string[]>([]);

  const measureLetterCenters = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const spans = spansRef.current.length
      ? spansRef.current
      : Array.from(container.querySelectorAll<HTMLSpanElement>("[data-letter]"));
    spansRef.current = spans;
    letterCentersRef.current = spans.map((span) => {
      const rect = span.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    });
  }, []);

  useEffect(() => {
    setIsTouch("ontouchstart" in window);
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const syncPreference = () => setReducedMotion(mql.matches);
    mql.addEventListener("change", syncPreference);
    spansRef.current = [];
    letterCentersRef.current = [];
    lastProgressRef.current = -1;
    lastPaintRef.current = [];
    setLetterWeights(new Array(totalLetters).fill(restWeight));

    // Cache spans on mount
    const timer = setTimeout(() => {
      if (containerRef.current) {
        spansRef.current = Array.from(
          containerRef.current.querySelectorAll<HTMLSpanElement>("[data-letter]")
        );
      }
      if (mode === "cursor-radius" && !reducedMotion && !window.matchMedia("(pointer: coarse)").matches) measureLetterCenters();
    }, 50);

    return () => { clearTimeout(timer); mql.removeEventListener("change", syncPreference); };
  }, [totalLetters, restWeight, measureLetterCenters, mode, reducedMotion]);

  // Determine effective mode (touch fallback)
  const effectiveMode: WeightMode =
    reducedMotion ? "scroll-reveal" :
    (isTouch && mode === "cursor-radius") ? "scroll-reveal" : mode;

  const updateWeights = useCallback(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    const spans = spansRef.current.length
      ? spansRef.current
      : Array.from(container.querySelectorAll<HTMLSpanElement>("[data-letter]"));
    if (!spans.length) return;
    spansRef.current = spans;

    if (effectiveMode === "cursor-radius") {
      const mouse = mousePosRef.current;
      if (!letterCentersRef.current.length) {
        measureLetterCenters();
      }
      const centers = letterCentersRef.current;
      for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        const center = centers[i];
        if (!mouse || !center) {
          span.style.fontVariationSettings = `"wght" ${restWeight}`;
          span.style.fontWeight = String(restWeight);
          span.style.color = baseColor;
          continue;
        }
        const dist = Math.hypot(
          mouse.x - center.x,
          mouse.y - center.y
        );
        const influence = Math.max(0, 1 - dist / radius);
        const eased = influence * influence;
        const w = Math.round(restWeight + (activeWeight - restWeight) * eased);

        const isLast = i === spans.length - 1 && /[.!?]/.test(span.textContent || "");
        const col = isLast
          ? (eased > 0.15 ? accentColor : baseColor)
          : (eased > 0.15 ? activeColor : baseColor);

        span.style.fontVariationSettings = `"wght" ${w}`;
        span.style.fontWeight = String(w);
        span.style.color = col;
      }
    } else if (effectiveMode === "scroll-reveal") {
      const containerRect = container.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // Smooth trigger window: begins as top reaches 90% of screen height, completes by 35%
      const startY = viewportH * 0.90;
      const endY = viewportH * 0.35;
      const progress = Math.round(Math.max(0, Math.min(1, (startY - containerRect.top) / (startY - endY))) * 100) / 100;
      if (lastProgressRef.current === progress) return;
      lastProgressRef.current = progress;

      for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        const letterRatio = i / (spans.length - 1 || 1);
        const letterStart = letterRatio * 0.45;
        const letterP = Math.max(0, Math.min(1, (progress - letterStart) / 0.55));
        const w = Math.round((restWeight + (activeWeight - restWeight) * letterP) / 5) * 5;

        const isLast = i === spans.length - 1 && /[.!?]/.test(span.textContent || "");
        const targetColor = isLast ? accentColor : activeColor;
        const col = letterP === 0 ? baseColor : letterP === 1 ? targetColor
          : `color-mix(in srgb, ${baseColor}, ${targetColor} ${Math.round(letterP * 100)}%)`;
        const signature = `${w}|${col}`;
        if (lastPaintRef.current[i] === signature) continue;
        lastPaintRef.current[i] = signature;
        span.style.fontVariationSettings = `"wght" ${w}`;
        span.style.fontWeight = String(w);
        span.style.color = col;
      }
    } else if (effectiveMode === "scroll-scrub") {
      const containerRect = container.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewportH - containerRect.top) / (viewportH + containerRect.height)));

      for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        const letterProgress = i / (spans.length - 1 || 1);
        const bandWidth = 0.2;
        const dist = Math.abs(progress - letterProgress);
        const influence = Math.max(0, 1 - dist / bandWidth);
        const w = Math.round(restWeight + (activeWeight - restWeight) * influence * influence);

        const isLast = i === spans.length - 1 && /[.!?]/.test(span.textContent || "");
        const col = isLast
          ? (influence > 0.15 ? accentColor : baseColor)
          : (influence > 0.15 ? activeColor : baseColor);

        span.style.fontVariationSettings = `"wght" ${w}`;
        span.style.fontWeight = String(w);
        span.style.color = col;
      }
    }
  }, [
    effectiveMode,
    restWeight,
    activeWeight,
    radius,
    baseColor,
    activeColor,
    accentColor,
    reducedMotion,
    measureLetterCenters,
  ]);

  useEffect(() => {
    if (reducedMotion || effectiveMode === "whole-text") return;
    const container = containerRef.current;
    if (!container) return;
    let visible = false;
    let needsMeasure = true;
    lastProgressRef.current = -1;
    lastPaintRef.current = [];
    const schedule = () => {
      if (!visible || document.hidden || animRef.current) return;
      animRef.current = requestAnimationFrame(() => {
        animRef.current = 0;
        if (needsMeasure && effectiveMode === "cursor-radius") {
          measureLetterCenters();
          needsMeasure = false;
        }
        updateWeights();
      });
    };
    // Subscribe only while visible; one heading measurement per scheduled frame.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (visible) {
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        if (effectiveMode !== "cursor-radius") schedule();
      } else {
        cancelAnimationFrame(animRef.current);
        animRef.current = 0;
      }
    }, { rootMargin: "60px" });
    observer.observe(container);
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      mousePosRef.current = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const resetPointer = () => {
      if (!mousePosRef.current) return;
      mousePosRef.current = null;
      schedule();
    };
    const onScroll = () => {
      needsMeasure = true;
      if (effectiveMode === "scroll-scrub" || effectiveMode === "scroll-reveal") schedule();
      else resetPointer();
    };
    if (effectiveMode === "cursor-radius") {
      container.addEventListener("pointermove", onPointer, { passive: true });
      container.addEventListener("pointerleave", resetPointer);
    }
    return () => {
      cancelAnimationFrame(animRef.current);
      animRef.current = 0;
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      container.removeEventListener("pointermove", onPointer);
      container.removeEventListener("pointerleave", resetPointer);
    };
  }, [effectiveMode, updateWeights, reducedMotion, measureLetterCenters, activeWeight, activeColor]);

  const Tag = tag;

  // For whole-text mode, use CSS transitions
  if (effectiveMode === "whole-text") {
    return (
      <Tag
        id={id}
        className={`weight-text-whole ${className}`}
        style={{
          fontVariationSettings: `"wght" ${restWeight}`,
          transition: "font-variation-settings 0.3s ease",
          ...style,
        }}
      >
        {children}
      </Tag>
    );
  }

  // Static for reduced motion
  if (reducedMotion) {
    return (
      <Tag id={id} className={className} style={{ fontWeight: activeWeight, ...style }}>
        {children}
      </Tag>
    );
  }

  let letterCounter = 0;

  return (
    <Tag
      id={id}
      className={className}
      style={style}
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      aria-label={plainText}
      suppressHydrationWarning
    >
      <span aria-hidden="true" className="inline">
        {segments.map((seg, segIndex) => {
          if (seg.type === "br") {
            return <br key={`br-${segIndex}`} className={seg.className} />;
          }

          const words = seg.text.split(" ");

          return (
            <Fragment key={`seg-${segIndex}`}>
              {words.map((word, wordIndex) => {
                if (!word) {
                  return wordIndex < words.length - 1 ? " " : null;
                }

                return (
                  <Fragment key={wordIndex}>
                    <span className="inline-block whitespace-nowrap">
                      {word.split("").map((letter) => {
                        const i = letterCounter++;
                        const weight = letterWeights[i] || restWeight;
                        const t = (weight - restWeight) / (activeWeight - restWeight);

                        // Accent color on final punctuation
                        const isLastPunctuation =
                          i === totalLetters - 1 && /[.!?]/.test(letter);

                        let color: string;
                        if (isLastPunctuation) {
                          color = t > 0.15 ? accentColor : baseColor;
                        } else {
                          color = t > 0.15 ? activeColor : baseColor;
                        }

                        return (
                          <span
                            key={i}
                            className="inline-grid text-center"
                            style={{
                              gridTemplateAreas: '"char"',
                              verticalAlign: "baseline",
                              lineHeight: "inherit",
                            }}
                          >
                            {/* Sizing anchor at activeWeight: locks width from initial render so text never moves lines on scroll */}
                            <span
                              aria-hidden="true"
                              className="invisible select-none pointer-events-none"
                              style={{
                                gridArea: "char",
                                fontVariationSettings: `"wght" ${activeWeight}`,
                                fontWeight: activeWeight,
                                lineHeight: "inherit",
                              }}
                            >
                              {letter}
                            </span>

                            {/* Visible animated letter */}
                            <span
                              data-letter
                              style={{
                                gridArea: "char",
                                fontVariationSettings: `"wght" ${weight}`,
                                fontWeight: weight,
                                color,
                                transition: "none",
                                lineHeight: "inherit",
                                display: "inline-block",
                                justifySelf: "center",
                                alignSelf: "baseline",
                              }}
                            >
                              {letter}
                            </span>
                          </span>
                        );
                      })}
                    </span>
                    {wordIndex < words.length - 1 ? " " : null}
                  </Fragment>
                );
              })}
            </Fragment>
          );
        })}
      </span>
    </Tag>
  );
}
