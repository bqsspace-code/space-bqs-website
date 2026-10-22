"use client";

import { useRef, useEffect, useState, useCallback, Fragment } from "react";

type WeightMode = "cursor-radius" | "scroll-reveal" | "scroll-scrub" | "whole-text";

interface WeightTextProps {
  children: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  mode?: WeightMode;
  restWeight?: number;
  activeWeight?: number;
  radius?: number;
  activeColor?: string;
  baseColor?: string;
  accentColor?: string;
  className?: string;
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
}: WeightTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const animRef = useRef<number>(0);

  // Split into words so text can wrap cleanly between words
  const words = children.split(" ");
  const totalLetters = words.reduce((sum, w) => sum + w.length, 0);

  const [letterWeights, setLetterWeights] = useState<number[]>(() =>
    new Array(totalLetters).fill(restWeight)
  );

  useEffect(() => {
    setIsTouch("ontouchstart" in window);
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    setLetterWeights(new Array(totalLetters).fill(restWeight));
  }, [totalLetters, restWeight]);

  // Determine effective mode (touch fallback)
  const effectiveMode: WeightMode =
    reducedMotion ? "scroll-reveal" :
    (isTouch && mode === "cursor-radius") ? "scroll-reveal" : mode;

  const updateWeights = useCallback(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    const spans = container.querySelectorAll<HTMLSpanElement>("[data-letter]");
    if (!spans.length) return;

    const newWeights: number[] = [];

    if (effectiveMode === "cursor-radius") {
      const mouse = mousePosRef.current;
      spans.forEach((span) => {
        if (!mouse) {
          newWeights.push(restWeight);
          return;
        }
        const rect = span.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;
        const dist = Math.hypot(
          mouse.x - letterCenterX,
          mouse.y - letterCenterY
        );
        const influence = Math.max(0, 1 - dist / radius);
        const eased = influence * influence;
        newWeights.push(Math.round(restWeight + (activeWeight - restWeight) * eased));
      });
    } else if (effectiveMode === "scroll-reveal") {
      const containerRect = container.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const triggerPoint = viewportH * 0.8;
      const progress = Math.max(0, Math.min(1, (triggerPoint - containerRect.top) / (containerRect.height + 200)));

      spans.forEach((_, i) => {
        const letterProgress = i / (spans.length - 1 || 1);
        const stagger = Math.max(0, Math.min(1, (progress - letterProgress * 0.5) * 2.5));
        newWeights.push(Math.round(restWeight + (activeWeight - restWeight) * stagger));
      });
    } else if (effectiveMode === "scroll-scrub") {
      const containerRect = container.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewportH - containerRect.top) / (viewportH + containerRect.height)));

      spans.forEach((_, i) => {
        const letterProgress = i / (spans.length - 1 || 1);
        const bandWidth = 0.2;
        const dist = Math.abs(progress - letterProgress);
        const influence = Math.max(0, 1 - dist / bandWidth);
        newWeights.push(Math.round(restWeight + (activeWeight - restWeight) * influence * influence));
      });
    } else if (effectiveMode === "whole-text") {
      return;
    }

    setLetterWeights(newWeights);
  }, [effectiveMode, restWeight, activeWeight, radius, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || effectiveMode === "whole-text") return;

    let isDirty = true;

    const onMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      isDirty = true;
    };

    const onMouseLeave = () => {
      mousePosRef.current = null;
      isDirty = true;
    };

    const onScrollOrResize = () => {
      isDirty = true;
    };

    const onFrame = () => {
      if (effectiveMode === "cursor-radius") {
        if (isDirty) {
          updateWeights();
          isDirty = false;
        }
      } else {
        updateWeights();
      }
      animRef.current = requestAnimationFrame(onFrame);
    };

    if (effectiveMode === "cursor-radius") {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("mouseleave", onMouseLeave, { passive: true });
      window.addEventListener("scroll", onScrollOrResize, { passive: true });
      window.addEventListener("resize", onScrollOrResize, { passive: true });
    }

    animRef.current = requestAnimationFrame(onFrame);

    return () => {
      cancelAnimationFrame(animRef.current);
      if (effectiveMode === "cursor-radius") {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseleave", onMouseLeave);
        window.removeEventListener("scroll", onScrollOrResize);
        window.removeEventListener("resize", onScrollOrResize);
      }
    };
  }, [effectiveMode, updateWeights, reducedMotion]);

  const Tag = tag;

  // For whole-text mode, use CSS transitions
  if (effectiveMode === "whole-text") {
    return (
      <Tag
        className={`weight-text-whole ${className}`}
        style={{
          fontVariationSettings: `"wght" ${restWeight}`,
          transition: "font-variation-settings 0.3s ease",
        }}
      >
        {children}
      </Tag>
    );
  }

  // Static for reduced motion
  if (reducedMotion) {
    return (
      <Tag className={className} style={{ fontWeight: activeWeight }}>
        {children}
      </Tag>
    );
  }

  let letterCounter = 0;

  return (
    <Tag
      className={className}
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      aria-label={children}
    >
      <span aria-hidden="true" className="inline">
        {words.map((word, wordIndex) => {
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
                    color = accentColor;
                  } else {
                    color = t > 0.1 ? activeColor : baseColor;
                  }

                  return (
                    <span
                      key={i}
                      data-letter
                      style={{
                        fontVariationSettings: `"wght" ${weight}`,
                        color,
                        transition:
                          effectiveMode === "cursor-radius"
                            ? "none"
                            : "font-variation-settings 0.15s ease",
                        display: "inline-block",
                        willChange: "font-variation-settings",
                      }}
                    >
                      {letter}
                    </span>
                  );
                })}
              </span>
              {wordIndex < words.length - 1 ? " " : null}
            </Fragment>
          );
        })}
      </span>
    </Tag>
  );
}
