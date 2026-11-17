"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

export const FRAME_TIMES = [0.7, 3.5, 6.6, 9.4];
export const FRAME_POSTERS = FRAME_TIMES.map(
  (_, index) => `/assets/videos/container-flight-0${index + 1}.webp`
);

const FPS = 60;
const FRAME = 1 / FPS;
const CHAPTER_HOLD = 0.12;
const EXPAND_PORTION = 0.12;

export interface CargoWmsFlightOptions {
  topOffset?: number;
  snap?: boolean;
  expandOnScroll?: boolean;
  media?: ScrollJourneyMedia;
}

export interface ScrollJourneyMedia {
  src: string;
  frameTimes: readonly number[];
  posters: readonly string[];
  /** Real edit boundaries keep chapter copy aligned with a multi-scene film. */
  sceneStarts?: readonly number[];
}

export function useCargoWmsFlight(
  root: RefObject<HTMLElement | null>,
  scrollMode: boolean,
  distance: number,
  options?: CargoWmsFlightOptions
) {
  const flightTop = options?.topOffset ?? 96;
  const enableSnap = options?.snap ?? true;
  const expandOnScroll = options?.expandOnScroll ?? true;
  const frameTimes = options?.media?.frameTimes ?? FRAME_TIMES;
  const source = options?.media?.src ?? "/assets/videos/container-flight-smooth.mp4";
  const sceneStarts = options?.media?.sceneStarts;

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef(0);
  const jumpRef = useRef<((progress: number) => void) | null>(null);
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  const activate = useCallback((index: number) => {
    if (activeRef.current !== index) {
      activeRef.current = index;
      setActive(index);
    }
  }, []);

  useEffect(() => {
    const section = root.current;
    const video = videoRef.current;
    if (!section || !video) return;
    const frameEl = section.querySelector<HTMLElement>(".container-flight-frame");
    if (!scrollMode) {
      video.pause();
      setStatus("idle");
      if (frameEl) {
        frameEl.style.removeProperty("--expand-progress");
      }
      delete section.dataset.expanded;
      return;
    }

    let disposed = false;
    let visible = false;
    let started = false;
    let failed = false;
    let initialized = false;
    let targetProgress = 0;
    let renderedProgress = 0;
    let frame = 0;
    let lastPaint = 0;
    let revert: (() => void) | undefined;

    const schedule = () => {
      if (!frame && !disposed && visible && !document.hidden) {
        frame = requestAnimationFrame(paint);
      }
    };

    const paint = (now: number) => {
      frame = 0;
      if (disposed || !visible || document.hidden) {
        lastPaint = 0;
        return;
      }
      if (lastPaint && now - lastPaint < 1000 / FPS - 1) {
        schedule();
        return;
      }
      const dt = Math.min(now - (lastPaint || now - 16.67), 50);
      lastPaint = now;
      renderedProgress += (targetProgress - renderedProgress) * (1 - Math.exp(-dt / 85));
      if (Math.abs(targetProgress - renderedProgress) < 0.0001) {
        renderedProgress = targetProgress;
      }

      // Update expand progress from 0 (inset rounded card) to 1 (full bleed)
      const expandProgress = expandOnScroll
        ? Math.min(1, Math.max(0, renderedProgress / EXPAND_PORTION))
        : 1;

      if (frameEl) {
        frameEl.style.setProperty("--expand-progress", expandProgress.toFixed(4));
        if (expandProgress >= 0.99) {
          section.dataset.expanded = "true";
        } else {
          delete section.dataset.expanded;
        }
      }

      const activeNorm = expandOnScroll
        ? Math.max(0, (renderedProgress - EXPAND_PORTION) / (1 - EXPAND_PORTION))
        : renderedProgress;

      const phase = activeNorm * frameTimes.length;
      const index = Math.min(frameTimes.length - 1, Math.floor(phase));
      const travel = Math.max(0, Math.min(1, (phase - index - CHAPTER_HOLD) / (1 - CHAPTER_HOLD)));
      const eased = travel * travel * (3 - 2 * travel);
      const targetTime = frameTimes[index] + (frameTimes[Math.min(index + 1, frameTimes.length - 1)] - frameTimes[index]) * eased;

      const contentIndex = sceneStarts
        ? sceneStarts.reduce((current, start, scene) => targetTime >= start ? scene : current, 0)
        : index;
      activate(contentIndex);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${renderedProgress})`;
      }

      // Independent frames make forward and reverse seeks cheap
      let waitingForFrame = false;
      if (!failed && video.readyState >= 2 && Number.isFinite(video.duration)) {
        const time = Math.min(Math.round(targetTime * FPS) / FPS, video.duration - FRAME);
        waitingForFrame = Math.abs(time - video.currentTime) > FRAME * 0.45;
        if (waitingForFrame && !video.seeking) {
          video.currentTime = time;
        }
      }
      if (renderedProgress !== targetProgress || waitingForFrame || (!failed && video.seeking)) {
        schedule();
      } else {
        lastPaint = 0;
      }
    };

    const applyProgress = (progress: number) => {
      targetProgress = Math.max(0, Math.min(1, progress));
      if (!initialized || !visible || document.hidden) {
        renderedProgress = targetProgress;
        initialized = true;
      }
      schedule();
    };

    jumpRef.current = (progress: number) => {
      targetProgress = renderedProgress = Math.max(0, Math.min(1, progress));
      initialized = true;
      schedule();
    };

    const loaded = () => {
      setStatus("ready");
      schedule();
    };
    const error = () => {
      failed = true;
      setStatus("error");
      schedule();
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastPaint = 0;
      video.pause();
    };
    const visibility = () => {
      if (document.hidden) stop();
      else schedule();
    };

    const playback = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else stop();
    });
    if (frameEl) playback.observe(frameEl);

    const preload = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      setStatus("loading");
      video.preload = "auto";
      video.src = source;
      video.load();

      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        (window as any).ScrollTrigger = ScrollTrigger;

        // Snap points align with resting frames:
        // When expandOnScroll is active:
        // 0 (resting inset card) -> EXPAND_PORTION (expanded Chapter 0) -> Chapters 1, 2, 3 -> Exit
        const snapPoints = sceneStarts
          ? [0, ...frameTimes.map((_, index) => {
              const point = index === 0 ? 0 : (index + CHAPTER_HOLD / 2) / frameTimes.length;
              return expandOnScroll ? EXPAND_PORTION + (1 - EXPAND_PORTION) * point : point;
            }), 1]
          : expandOnScroll
          ? [
              0,
              EXPAND_PORTION,
              Number((EXPAND_PORTION + (1 - EXPAND_PORTION) * 0.333).toFixed(3)),
              Number((EXPAND_PORTION + (1 - EXPAND_PORTION) * 0.666).toFixed(3)),
              1,
            ]
          : [0, 0.25, 0.5, 0.75, 1];

        const context = gsap.context(() => {
          const trigger = ScrollTrigger.create({
            id: section.id ? `${section.id}-flight` : "cargo-wms-flight",
            trigger: section,
            start: `top ${flightTop}px`,
            end: () => `+=${distance}`,
            onUpdate: (self) => applyProgress(self.progress),
            onRefresh: (self) => applyProgress(self.progress),
            ...(enableSnap
              ? {
                  snap: {
                    snapTo: snapPoints,
                    duration: { min: 0.25, max: 0.6 },
                    delay: 0.15,
                    ease: "power2.out",
                    inertia: false,
                  },
                }
              : {}),
          });

          applyProgress(trigger.progress);
        }, section);

        revert = () => context.revert();
        section.dataset.engine = "ready";
        ScrollTrigger.refresh();
      }).catch(() => {
        if (!disposed) error();
      });

      preload.disconnect();
    }, { rootMargin: "600px" });

    video.addEventListener("loadeddata", loaded);
    video.addEventListener("seeked", schedule);
    video.addEventListener("error", error);
    document.addEventListener("visibilitychange", visibility);
    preload.observe(section);

    return () => {
      disposed = true;
      preload.disconnect();
      playback.disconnect();
      stop();
      video.removeEventListener("loadeddata", loaded);
      video.removeEventListener("seeked", schedule);
      video.removeEventListener("error", error);
      document.removeEventListener("visibilitychange", visibility);
      jumpRef.current = null;
      revert?.();
      delete section.dataset.engine;
      delete section.dataset.expanded;
      if (frameEl) {
        frameEl.style.removeProperty("--expand-progress");
      }
    };
  }, [root, scrollMode, distance, flightTop, enableSnap, expandOnScroll, activate, source, frameTimes, sceneStarts]);

  const choose = (index: number) => {
    activate(index);
    if (scrollMode && root.current) {
      const chapterPoint = sceneStarts && index > 0 ? (index + CHAPTER_HOLD / 2) / frameTimes.length : index / frameTimes.length;
      const snapProgress = sceneStarts
        ? expandOnScroll ? EXPAND_PORTION + (1 - EXPAND_PORTION) * chapterPoint : chapterPoint
        : expandOnScroll
        ? index === 0
          ? EXPAND_PORTION
           : EXPAND_PORTION + (1 - EXPAND_PORTION) * (index / (frameTimes.length - 1))
        : index / frameTimes.length;
      jumpRef.current?.(snapProgress + 1 / distance);
      const targetScroll =
        root.current.getBoundingClientRect().top +
        scrollY -
        flightTop +
        distance * snapProgress +
        1;
      window.scrollTo({
        top: targetScroll,
        // A cut-based film should jump to its selected scene without replaying intervening chapters.
        behavior: sceneStarts ? "instant" : "smooth",
      });
    }
  };

  return { videoRef, progressRef, active, status, choose };
}
