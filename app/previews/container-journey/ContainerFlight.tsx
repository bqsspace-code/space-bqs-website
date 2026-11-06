"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, RotateCcw, SlidersHorizontal } from "lucide-react";
import { FLIGHT_TOP, FLIGHT_VARIANTS, FRAME_POSTERS, type FlightVariant } from "./variants";
import { useContainerFlight } from "./useContainerFlight";

export interface ContainerFlightProps {
  variant: FlightVariant;
  topOffset?: number;
  enableSnap?: boolean;
  expandOnScroll?: boolean;
  distance?: number;
  id?: string;
  className?: string;
}

export default function ContainerFlight({
  variant,
  topOffset = FLIGHT_TOP,
  enableSnap = true,
  expandOnScroll = false,
  distance: distanceProp,
  id: idProp,
  className: classNameProp = "",
}: ContainerFlightProps) {
  const ref = useRef<HTMLElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const config = FLIGHT_VARIANTS[variant];
  const distance = distanceProp ?? config.distance;
  const [eligible, setEligible] = useState(false);
  const [fallbackHint, setFallbackHint] = useState("Choose a chapter to explore");
  const [manual, setManual] = useState(false);
  const scrollMode = eligible && !manual;

  const { videoRef, progressRef, active, status, choose } = useContainerFlight(
    ref,
    scrollMode,
    distance,
    { topOffset, snap: enableSnap, expandOnScroll }
  );

  const chapter = config.chapters[active];

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

  const keys = (event: KeyboardEvent<HTMLElement>) => {
    const focused = buttons.current.indexOf(document.activeElement as HTMLButtonElement);
    const current = focused >= 0 ? focused : active;
    const next =
      event.key === "ArrowRight"
        ? Math.min(current + 1, 3)
        : event.key === "ArrowLeft"
        ? Math.max(current - 1, 0)
        : event.key === "Home"
        ? 0
        : event.key === "End"
        ? 3
        : null;
    if (next === null) return;
    event.preventDefault();
    choose(next);
    buttons.current[next]?.focus({ preventScroll: true });
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

  const dynamicStyles: CSSProperties = {
    "--flight-distance": `${distance}px`,
    ...(topOffset !== FLIGHT_TOP ? { "--flight-top-override": `${topOffset}px` } : {}),
  } as CSSProperties;

  return (
    <section
      ref={ref}
      id={idProp ?? "film-journey"}
      className={`container-flight container-flight--${variant} ${expandOnScroll ? "container-flight--expand" : ""} ${classNameProp}`.trim()}
      data-mode={scrollMode ? "scroll" : "chapters"}
      data-chapter={active}
      style={dynamicStyles}
      aria-label={`${config.name} cinematic preview`}
    >
      <div className="container-flight-frame">
        <div className="flight-background" aria-hidden="true">
          <Image
            src={FRAME_POSTERS[scrollMode && status === "ready" ? 0 : active]}
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
            poster={FRAME_POSTERS[0]}
            className="flight-video"
            style={{ opacity: scrollMode && status === "ready" ? 1 : 0 }}
          />
          <div className="flight-shade" />
        </div>
        <div className="flight-topline">
          <span>
            SPACE / {variant === "home" ? "IMPLEMENTATION" : variant === "cargo-wms" ? "CARGO WMS" : "SOLUTIONS"}
          </span>
          <span>
            0{active + 1} / 04
          </span>
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
            {config.chapters.map((item, index) => (
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
              style={scrollMode ? undefined : { transform: `scaleX(${(active + 1) / 4})` }}
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
