"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Database, FileSpreadsheet, MoveHorizontal, Server, Ship } from "lucide-react";
import { useViewportScroll } from "./useViewportScroll";
import WeightText from "./WeightText";
import deploymentImage from "@/public/assets/web_image/Data-Centre-Racks-Understanding-rack-sizes-and-sizing-units.jpg";
import cargoImage from "@/public/assets/web_image/cargo-terminal-showcase.webp";


const OFFERINGS = [
  { title: "Move your existing data.", tag: "Data migration", description: "Map, trial-import, and reconcile your records before the final move. A clear path from old files to a shared system.", href: "/services/data-migration", link: "Plan a migration", icon: Database },
  { title: "Choose your environment.", tag: "Deployment", description: "Public cloud, private cloud, or on-premises. Scope the rollout with your infrastructure team and your operational needs.", href: "/services/deployment", link: "Compare deployments", icon: Server },
  { title: "Managing cargo instead?", tag: "Cargo WMS", description: "A separate custom implementation for manifests, locations, tariffs, and controlled cargo release.", href: "/solutions/cargo-wms", link: "Explore Cargo WMS", icon: Ship },
] as const;

function MigrationVisual() {
  return (
    <div className="rollout-migration-art" aria-label="Illustrative record migration: map, trial-import, and reconcile">
      <div className="rollout-source-sheet">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-[#52657c]"><FileSpreadsheet className="h-4 w-4" aria-hidden="true" />Existing records</div>
        <div className="rollout-sheet-grid" aria-hidden="true">{Array.from({ length: 20 }, (_, i) => <span key={i} className={i < 4 ? "rollout-sheet-heading" : ""} />)}</div>
      </div>
      <div className="rollout-record-panel">
        <div className="mb-5 flex items-center justify-between"><Database className="h-6 w-6 text-[#032aac]" aria-hidden="true" /><span className="font-mono text-[9px] text-[#5a7691]">IMPORT CHECK</span></div>
        {["Map the fields", "Run a trial import", "Reconcile the records"].map(text => <div key={text} className="flex items-center gap-2 border-t border-[#d8e6f1] py-3 text-[11px] font-medium text-[#28425f]"><Check className="h-3.5 w-3.5 text-[#168698]" aria-hidden="true" />{text}</div>)}
      </div>
      <span className="rollout-art-arrow" aria-hidden="true"><ArrowRight className="h-5 w-5" /></span>
      <span className="rollout-visual-note">Illustrative migration workflow</span>
    </div>
  );
}

export default function RolloutShowcase() {
  const ref = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panels = useRef<(HTMLElement | null)[]>([]);
  const progressRef = useRef<HTMLSpanElement>(null);
  const metrics = useRef({ distance: 0, width: 0, centers: [] as number[] });
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const [reduced, setReduced] = useState(false);

  const paint = useCallback((x: number) => {
    const { distance, width, centers } = metrics.current;
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${distance ? x / distance : 0})`;
    let closest = 0;
    centers.slice(1).forEach((center, index, values) => {
      const target = Math.max(0, Math.min(distance, center - width / 2));
      const current = Math.max(0, Math.min(distance, values[closest] - width / 2));
      if (Math.abs(target - x) < Math.abs(current - x)) closest = index;
    });
    if (activeRef.current !== closest) { activeRef.current = closest; setActive(closest); }
  }, []);

  const update = useCallback(() => {
    if (!enhanced || !ref.current || ref.current.dataset.enhanced !== "true" || !trackRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (96 - rect.top) / Math.max(1, rect.height - innerHeight)));
    const x = progress * metrics.current.distance;
    trackRef.current.style.transform = `translate3d(${-x}px, 0, 0)`;
    const { centers, width, distance } = metrics.current;
    panels.current.slice(1).forEach((card, index) => {
      if (!card || !width) return;
      const arrival = Math.max(0, Math.min(distance, centers[index + 1] - width / 2));
      const remaining = Math.max(0, Math.min(1, (arrival - x) / (width * .5)));
      const eased = remaining * remaining * (3 - 2 * remaining);
      // Incoming cards rise from a lower plane; outgoing cards stay aligned.
      const lift = Math.min(120, innerHeight * .14) * eased;
      card.style.transform = `translate3d(0, ${lift.toFixed(2)}px, 0)`;
    });
    paint(x);
  }, [enhanced, paint]);
  useViewportScroll(ref, update);

  useEffect(() => {
    const desktop = matchMedia("(min-width: 1024px) and (min-height: 600px)");
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { setEnhanced(desktop.matches && !preference.matches); setReduced(preference.matches); };
    sync();
    desktop.addEventListener("change", sync);
    preference.addEventListener("change", sync);
    return () => { desktop.removeEventListener("change", sync); preference.removeEventListener("change", sync); };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    if (enhanced) viewport.scrollLeft = 0;
    else {
      track.style.removeProperty("transform");
      panels.current.forEach(panel => panel?.style.removeProperty("transform"));
    }
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      metrics.current = { distance: Math.max(0, track.scrollWidth - viewport.clientWidth), width: viewport.clientWidth, centers: panels.current.map(panel => panel ? panel.offsetLeft + panel.offsetWidth / 2 : 0) };
      if (enhanced) update(); else paint(viewport.scrollLeft);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    measure();
    return () => { disposed = true; observer.disconnect(); };
  }, [enhanced, update, paint]);

  const navigate = (index: number) => {
    const { centers, width, distance } = metrics.current;
    const x = Math.max(0, Math.min(distance, (centers[index] || 0) - width / 2));
    if (enhanced && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      window.scrollTo({ top: rect.top + scrollY - 96 + (distance ? x / distance : 0) * Math.max(1, rect.height - innerHeight), behavior: "instant" });
    } else viewportRef.current?.scrollTo({ left: x, behavior: reduced ? "instant" : "smooth" });
  };

  return (
    <section ref={ref} id="section-rollout" className="rollout-showcase" data-enhanced={enhanced} aria-labelledby="rollout-showcase-heading">
      <div className="rollout-showcase-pin">
        <div ref={viewportRef} className="rollout-showcase-viewport" onScroll={() => { if (!enhanced && viewportRef.current) paint(viewportRef.current.scrollLeft); }}>
          <div ref={trackRef} className="rollout-showcase-track">
            <header ref={el => { panels.current[0] = el; }} className="rollout-showcase-intro" onFocusCapture={() => { if (enhanced) navigate(0); }}>
              <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#032aac]">Solutions &amp; implementation</p>
              <WeightText id="rollout-showcase-heading" tag="h2" mode="scroll-reveal" restWeight={400} activeWeight={700} className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-[#031038] sm:text-5xl">A rollout that fits your operation.</WeightText>
              <p className="mt-5 max-w-xs text-sm leading-7 text-[#52657c]">Bring your records, your infrastructure, and your next operational challenge. Build the right starting point.</p>
              <Link href="/request-demo" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#032aac]">Let’s scope your rollout<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
              <p className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] text-[#637c94]"><MoveHorizontal className="h-4 w-4" aria-hidden="true" />{enhanced ? "Scroll to explore" : "Swipe or choose an offering"}</p>
            </header>
            {OFFERINGS.map((item, index) => <article ref={el => { panels.current[index + 1] = el; }} key={item.tag} className="rollout-showcase-card" onFocusCapture={() => { if (enhanced) navigate(index + 1); }}>
              <div className={`rollout-showcase-visual rollout-showcase-visual--${index}`}>
                {index === 0 ? <MigrationVisual /> : <>
                  <Image src={index === 1 ? deploymentImage : cargoImage} alt={index === 1 ? "Server racks illustrating infrastructure deployment options" : "A container vessel and cranes alongside a working cargo terminal"} fill sizes="(min-width: 1024px) 480px, 85vw" className="object-cover" />
                  <div className="rollout-photo-shade" />
                  <span className="rollout-visual-note">{index === 1 ? "Public cloud / Private cloud / On-premises" : "Manifests / Locations / Controlled release"}</span>
                </>}
                <span className="rollout-showcase-tag"><item.icon className="h-3.5 w-3.5" aria-hidden="true" />{item.tag}</span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-5">
                <div>
                  <p className="mb-2 font-mono text-[9px] uppercase tracking-[.14em] text-[#637c94]">0{index + 1} / {item.tag}</p>
                  <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-[#031038]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#52657c]">{item.description}</p>
                </div>
                <Link href={item.href} aria-label={item.link} className="rollout-showcase-link"><ArrowUpRight className="h-5 w-5" aria-hidden="true" /></Link>
              </div>
            </article>)}
          </div>
        </div>
        <div className="rollout-showcase-navigation">
          <div className="rollout-showcase-progress" aria-hidden="true"><span ref={progressRef} /></div>
          <nav aria-label="Explore rollout offerings">{OFFERINGS.map((item, index) => <button type="button" key={item.tag} aria-current={active === index ? "step" : undefined} onClick={() => navigate(index + 1)}><span>0{index + 1}</span>{item.tag}</button>)}</nav>
          <p className="rollout-showcase-licensing">One team. One licence. No per-job fees. <Link href="/pricing">See team pricing<ArrowUpRight className="h-3 w-3" aria-hidden="true" /></Link></p>
        </div>
      </div>
    </section>
  );
}
