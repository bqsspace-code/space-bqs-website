"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Calculator, FileCheck2, LockKeyhole, Smartphone, WifiOff } from "lucide-react";
import AmbientVideo from "./AmbientVideo";
import { Eyebrow, H2 } from "./ui";


/** One short, unpinned GSAP story replaces the repeated deck/calculation/report sections. */
export default function HomeWorkflowJourney() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const preference = matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    let near = false;
    let loading = false;
    let disposed = false;
    let revert: (() => void) | undefined;

    const setup = () => {
      if (!near || !preference.matches || loading || disposed) return;
      loading = true;
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/MotionPathPlugin")]).then(async ([{ gsap }, { ScrollTrigger }, { MotionPathPlugin }]) => {
        await document.fonts.ready;
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
        const media = gsap.matchMedia();
        revert = () => media.revert();
        media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
          const cards = Array.from(stage.querySelectorAll<HTMLElement>(".journey-card"));
          const route = stage.querySelector<SVGPathElement>(".journey-route")!;
          const token = stage.querySelector<SVGGElement>(".journey-token")!;
          const stamp = stage.querySelector<HTMLElement>(".journey-stamp")!;
          const timeline = gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: { id: "home-survey-journey", trigger: stage, start: "top 88%", end: "bottom 48%", scrub: .45, invalidateOnRefresh: true },
          });
          timeline.fromTo(cards[0], { x: -36, y: 42, rotation: -7, rotationY: -8, opacity: .65 }, { x: 0, y: 0, rotation: 0, rotationY: 0, opacity: 1, duration: .8 }, 0);
          timeline.fromTo(cards[1], { y: 56, scale: .92, rotationX: 8, opacity: .65 }, { y: 0, scale: 1, rotationX: 0, opacity: 1, duration: .8 }, .25);
          timeline.fromTo(cards[2], { x: 36, y: 48, rotation: 7, rotationY: 8, opacity: .65 }, { x: 0, y: 0, rotation: 0, rotationY: 0, opacity: 1, duration: .8 }, .5);
          timeline.fromTo(route, { attr: { "stroke-dashoffset": 1 } }, { attr: { "stroke-dashoffset": 0 }, duration: 1.35, ease: "none" }, .15);
          timeline.to(token, { motionPath: { path: route, align: route, alignOrigin: [.5, .5] }, duration: 1.35, ease: "none" }, .15);
          timeline.fromTo(stamp, { scale: 1.45, rotation: 12, opacity: 0 }, { scale: 1, rotation: -8, opacity: 1, duration: .4, ease: "back.out(1.6)" }, 1.3);
          stage.dataset.motion = "ready";
          return () => { delete stage.dataset.motion; };
        }, stage);
        observer.disconnect();
      }).catch(() => {
        // The baseline stays fully readable if an optional animation chunk cannot load.
        if (!disposed) stage.dataset.motion = "unavailable";
      });
    };
    const observer = new IntersectionObserver(([entry]) => { near = entry.isIntersecting; setup(); }, { rootMargin: "500px" });
    observer.observe(stage);
    preference.addEventListener("change", setup);
    return () => {
      disposed = true;
      observer.disconnect();
      preference.removeEventListener("change", setup);
      revert?.();
      delete stage.dataset.motion;
    };
  }, []);

  return (
    <section id="section-how-it-works" className="home-workflow-journey bg-[#F7FBFD] px-6 py-16 lg:py-20" aria-labelledby="home-workflow-heading">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <div id="home-workflow-heading"><H2>Your whole workflow.<br />Within reach.</H2></div>
            <p className="mt-5 max-w-md text-base leading-7 text-[#52657c]">Capture once on deck. Calculate with the same engine. Review and issue the proof from the office.</p>
            <Link href="/mobile-app" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#032aac] hover:underline">Explore the mobile app<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <figure data-glass-depth data-glass-surface aria-label="Space BQS mobile app concept video" className="relative isolate m-0 w-full min-w-0 overflow-hidden rounded-3xl border border-[#D3E9F3] bg-[#D3E9F3] shadow-[0_24px_70px_-30px_rgba(3,42,172,0.3)]">
            <div className="relative aspect-video w-full"><AmbientVideo src="/assets/videos/mobile-showcase-web.mp4" poster="/assets/videos/mobile-showcase-poster.webp" label="mobile app concept video" className="object-center" /></div>
          </figure>
        </div>

        <div ref={stageRef} className="journey-stage">
          <div className="journey-route-label" aria-hidden="true">One reading. A connected record.</div>
          <svg className="journey-route-svg" viewBox="0 0 1000 96" preserveAspectRatio="none" aria-hidden="true">
            <path d="M165 48 C275 4 390 92 500 48 S725 4 835 48" fill="none" stroke="#c5ddec" strokeWidth="2" strokeDasharray="4 7" />
            <path className="journey-route" d="M165 48 C275 4 390 92 500 48 S725 4 835 48" pathLength="1" fill="none" stroke="#19b5c9" strokeWidth="2.5" strokeDasharray="1" strokeDashoffset="0" />
            {[165, 500, 835].map(x => <circle key={x} cx={x} cy="48" r="5" fill="#f0f6fc" stroke="#032aac" strokeWidth="2" />)}
            <g className="journey-token"><circle cx="165" cy="48" r="12" fill="#19b5c9" opacity=".15" /><circle cx="165" cy="48" r="6" fill="#032aac" /></g>
          </svg>
          <div className="journey-cards">
            <article className="journey-card">
              <div className="journey-card-top"><Smartphone aria-hidden="true" /><span>01 / On deck</span><WifiOff aria-hidden="true" /></div>
              <h3>Capture once.</h3>
              <p>Enter ullage or sounding, temperature, and free water at the tank. Keep working offline.</p>
              <div className="journey-reading"><span>Tank 1P / sounding</span><strong>4.250 <small>m</small></strong><span className="journey-reading-note">Illustrative field reading</span></div>
              <Link href="/mobile-app">See the on-deck workflow<ArrowUpRight aria-hidden="true" /></Link>
            </article>
            <article className="journey-card">
              <div className="journey-card-top"><Calculator aria-hidden="true" /><span>02 / One engine</span></div>
              <h3>Calculate with context.</h3>
              <p>Apply strapping tables, water deductions, and temperature correction. Keep the factors visible.</p>
              <div className="journey-reading"><span>Worked check / Table 54B</span><strong>0.9677 <small>VCF</small></strong><span className="journey-reading-note">Density 0.9500 at 40°C → volume at 15°C</span></div>
              <Link href="/how-we-measure">Follow the calculation<ArrowUpRight aria-hidden="true" /></Link>
            </article>
            <article className="journey-card journey-card--proof">
              <div className="journey-card-top"><FileCheck2 aria-hidden="true" /><span>03 / In the office</span></div>
              <h3>Review. Lock. Deliver.</h3>
              <p>A supervisor finalises the survey on the web. The client gets a locked PDF and a four-sheet Excel workbook.</p>
              <div className="journey-reading"><span>Illustrative certificate</span><strong>457.819 <small>MT</small></strong><span className="journey-reading-note">Readings, factors, and totals together</span><span className="journey-stamp"><LockKeyhole aria-hidden="true" />Locked</span></div>
              <Link href="/sample-report">Explore the sample report<ArrowUpRight aria-hidden="true" /></Link>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
