"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, RotateCcw, SlidersHorizontal } from "lucide-react";
import {
  FRAME_POSTERS,
  useCargoWmsFlight,
  type CargoWmsFlightOptions,
} from "./use-cargo-wms-flight";

export interface CargoWmsChapter {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  href: string;
  action: string;
}

export const CARGO_WMS_CHAPTERS: CargoWmsChapter[] = [
  {
    label: "Arrival",
    eyebrow: "01 / Plan + receive",
    title: "Know what’s coming.",
    description:
      "Register the manifest before arrival. Receive against the expected cargo, record exceptions, and organise destuffing.",
    points: ["Expected versus arrived cargo", "Receipt and destuffing records"],
    href: "/request-demo",
    action: "Discuss your inbound workflow",
  },
  {
    label: "Control",
    eyebrow: "02 / Locate + calculate",
    title: "Keep the operation in view.",
    description:
      "Connect cargo locations and movement history with the tariff version, period, and inputs behind each charge.",
    points: ["Locations and movement history", "Traceable charges and tariff rules"],
    href: "/request-demo",
    action: "Scope your operational controls",
  },
  {
    label: "Release",
    eyebrow: "03 / Approve + hand over",
    title: "Release with confidence.",
    description:
      "Make payment, document, and approval requirements clear before handover. Close the movement with the right records.",
    points: ["Agreed release approval gates", "Handover documents and reports"],
    href: "/request-demo",
    action: "Plan your release workflow",
  },
  {
    label: "Your workflow",
    eyebrow: "04 / Custom implementation",
    title: "Your operation. Connected.",
    description:
      "Turn the journey into an agreed scope: modules, permissions, reports, integrations, and acceptance criteria.",
    points: ["Discovery and workflow mapping", "Test, train, launch, and hand over"],
    href: "/request-demo",
    action: "Discuss your WMS requirements",
  },
];

export interface CargoWmsFlightProps extends CargoWmsFlightOptions {
  enableSnap?: boolean;
  distance?: number;
  id?: string;
  className?: string;
  chapters?: readonly CargoWmsChapter[];
  brandLabel?: string;
  journeyLabel?: string;
}

export default function CargoWmsFlight({
  topOffset = 96,
  snap,
  enableSnap: enableSnapProp,
  expandOnScroll = true,
  distance = 1500,
  id: idProp,
  className: classNameProp = "",
  chapters = CARGO_WMS_CHAPTERS,
  brandLabel = "SPACE / CARGO WMS",
  journeyLabel = "Cargo WMS operational journey",
  media,
}: CargoWmsFlightProps) {
  const enableSnap = enableSnapProp ?? snap ?? true;
  const ref = useRef<HTMLElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const [eligible, setEligible] = useState(false);
  const [fallbackHint, setFallbackHint] = useState("Choose a chapter to explore");
  const [manual, setManual] = useState(false);
  const scrollMode = eligible && !manual;

  const { videoRef, progressRef, active, status, choose } = useCargoWmsFlight(
    ref,
    scrollMode,
    distance,
    { topOffset, snap: enableSnap, expandOnScroll, media }
  );

  const chapter = chapters[active];
  const posters = media?.posters ?? FRAME_POSTERS;

  useEffect(() => {
    const desktop = matchMedia("(min-width: 900px)");
    const tall = matchMedia("(min-height: 600px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setEligible(desktop.matches && tall.matches && !reduced.matches);
      setFallbackHint(
        reduced.matches
          ? "Reduced motion · choose a chapter"
          : !desktop.matches
          ? "Small-screen view · choose a chapter"
          : !tall.matches
          ? "Increase window height to enable scroll motion"
          : "Choose a chapter to explore"
      );
    };
    const queries = [desktop, tall, reduced];
    sync();
    queries.forEach((query) => query.addEventListener("change", sync));
    return () => queries.forEach((query) => query.removeEventListener("change", sync));
  }, []);

  const toggleMode = () => {
    setManual((value) => !value);
    requestAnimationFrame(() => {
      if (ref.current) {
        window.scrollTo({
          top: ref.current.getBoundingClientRect().top + scrollY - topOffset,
          behavior: "instant",
        });
      }
    });
  };

  const restart = () => {
    if (scrollMode && ref.current) {
      window.scrollTo({
        top: ref.current.getBoundingClientRect().top + scrollY - topOffset + 1,
        behavior: "smooth",
      });
    } else {
      choose(0);
    }
  };

  const keys = (event: KeyboardEvent<HTMLElement>) => {
    const focused = buttons.current.indexOf(document.activeElement as HTMLButtonElement);
    const current = focused >= 0 ? focused : active;
    const next =
      event.key === "ArrowRight"
          ? Math.min(current + 1, chapters.length - 1)
        : event.key === "ArrowLeft"
        ? Math.max(current - 1, 0)
        : event.key === "Home"
        ? 0
        : event.key === "End"
          ? chapters.length - 1
        : null;
    if (next === null) return;
    event.preventDefault();
    choose(next);
    buttons.current[next]?.focus({ preventScroll: true });
  };

  const dynamicStyles: CSSProperties = {
    "--flight-distance": `${distance}px`,
    "--flight-top-override": `${topOffset}px`,
  } as CSSProperties;

  return (
    <section
      ref={ref}
      id={idProp ?? "film-journey"}
      className={`container-flight container-flight--cargo-wms ${
        expandOnScroll ? "container-flight--expand" : ""
      } ${classNameProp}`.trim()}
      data-mode={scrollMode ? "scroll" : "chapters"}
      data-chapter={active}
      style={dynamicStyles}
      aria-label={journeyLabel}
    >
      <div className="container-flight-frame">
        <div className="flight-background" aria-hidden="true">
          <Image
            src={posters[scrollMode && status === "ready" ? 0 : active]}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <video
            ref={videoRef}
            muted
            playsInline
            preload="none"
            poster={posters[0]}
            className="flight-video"
            style={{ opacity: scrollMode && status === "ready" ? 1 : 0 }}
          />
          <div className="flight-shade" />
        </div>
        <div className="flight-topline">
          <span>{brandLabel}</span>
          <span>0{active + 1} / {String(chapters.length).padStart(2, "0")}</span>
        </div>
        <div className="flight-content">
          <div key={active} className="flight-copy" id={`${id}-chapter`}>
            <p className="flight-eyebrow">{chapter.eyebrow}</p>
            <h2>{chapter.title}</h2>
            <div className="flight-description">
              <p>{chapter.description}</p>
              <ul>
                {chapter.points.map((point) => (
                  <li key={point}>
                    <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link href={chapter.href} className="flight-action">
                {chapter.action}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flight-controls">
          <div className="flight-control-meta">
            <span className="inline-flex items-center gap-2">
              {scrollMode ? (
                <ArrowDown className="h-3 w-3" aria-hidden="true" />
              ) : (
                <SlidersHorizontal className="h-3 w-3" aria-hidden="true" />
              )}
              {scrollMode
                ? expandOnScroll && active === 0
                  ? "Scroll to expand & travel · Reverse to revisit"
                  : "Scroll to travel · Pause to read · Reverse to revisit"
                : eligible
                ? "Chapter mode · choose a step"
                : fallbackHint}
            </span>
            <div className="flex items-center gap-4">
              {eligible && (
                <button type="button" onClick={toggleMode} aria-pressed={manual}>
                  <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                  {manual ? "Use scroll motion" : "Use chapter controls"}
                </button>
              )}
              <button type="button" onClick={restart} aria-label="Restart the journey">
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Restart</span>
              </button>
            </div>
          </div>
          <nav className="flight-chapters" aria-label="Journey chapters" onKeyDown={keys}>
            {chapters.map((item, index) => (
              <button
                ref={(el) => {
                  buttons.current[index] = el;
                }}
                key={item.label}
                type="button"
                aria-pressed={active === index}
                aria-controls={`${id}-chapter`}
                onClick={() => choose(index)}
              >
                <span>0{index + 1}</span>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flight-progress" aria-hidden="true">
            <span
              ref={progressRef}
              style={scrollMode ? undefined : { transform: `scaleX(${(active + 1) / chapters.length})` }}
            />
          </div>
          {status === "loading" && scrollMode && (
            <span className="flight-loading" role="status">
              Preparing footage…
            </span>
          )}
          {status === "error" && (
            <span className="flight-loading" role="status">
              Showing chapter images. Video could not be loaded.
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
