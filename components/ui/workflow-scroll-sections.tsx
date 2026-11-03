"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, FileSpreadsheet } from "lucide-react";
import { useViewportScroll } from "@/app/components/useViewportScroll";
import WeightText from "@/app/components/WeightText";
import { STAGES } from "./survey-workflow-comparison";
import capture from "@/public/assets/web_image/marine-surveyor-deck-sounding.jpg";
import calculate from "@/public/assets/web_image/csm_Bunkering_STW150_UTS150_9880832433.jpg";
import tables from "@/public/assets/web_image/vessel-tank-strapping-context.jpg";
import certify from "@/public/assets/web_image/marine-surveyor-officer-verification.jpg";
import archive from "@/public/assets/web_image/maritime-operations-center-survey-warehouse.jpg";
import audit from "@/public/assets/web_image/ship-to-ship-bunkering-custody-transfer.jpg";


const VISUALS = [
  { image: capture, alt: "Marine surveyor measuring tank levels with a sounding tape on deck", caption: "At the tank hatch", position: "50% 40%", href: "/mobile-app", link: "Explore mobile capture", wipe: "inset(0 100% 0 0)" },
  { image: calculate, alt: "Operator working with the valves and hoses on a bunker vessel", caption: "From measurement to quantity", position: "65% 40%", href: "/how-we-measure", link: "Follow the calculation", wipe: "inset(100% 0 0 0)" },
  { image: tables, alt: "Oil tanker deck layout detailing cargo tank grid, strapping sections, and piping manifolds", caption: "Vessel and tank context", position: "50% 50%", href: "/features/vessels-master-data", link: "Explore vessel master data", wipe: "inset(0 0 0 100%)" },
  { image: certify, alt: "Marine surveyor and ship's officer verifying bunker calculation certificates on deck", caption: "Checked before issue", position: "50% 40%", href: "/sample-report", link: "See a sample report", wipe: "inset(0 0 100% 0)" },
  { image: archive, alt: "Maritime operations center coordinating vessel surveys, port logistics, and warehouse records", caption: "Survey Warehouse records", position: "50% 50%", href: "/features/survey-register-dashboard", link: "Explore the Survey Warehouse", wipe: "inset(0 100% 0 0)" },
  { image: audit, alt: "Ship-to-ship bunker fuel custody transfer between bunker barge and container vessel", caption: "Every handoff, connected", position: "50% 50%", href: "/order-lifecycle", link: "Follow the review trail", wipe: "inset(100% 0 0 0)" },
] as const;

const clamp = (value: number) => Math.max(0, Math.min(1, value));

function WorkflowSlide({ index, direction, reduced, id }: { index: number; direction: number; reduced: boolean; id: string }) {
  const present = useIsPresent();
  const stage = STAGES[index];
  const visual = VISUALS[index];
  const ProofIcon = stage.proofIcon;
  return (
    <motion.div
      className="workflow-tour-slide"
      custom={direction}
      variants={{
        enter: (travel: number) => ({ x: reduced ? 0 : `${travel * 104}%` }),
        center: { x: 0 },
        exit: (travel: number) => ({ x: reduced ? 0 : `${travel * -104}%` }),
      }}
      initial="enter" animate="center" exit="exit"
      transition={{ duration: reduced ? 0 : .48, ease: [.22, 1, .36, 1] }}
      inert={!present}
      aria-hidden={!present}
    >
      <figure className="workflow-tour-media" aria-label={visual.caption}>
        <div className="workflow-tour-image">
          <Image src={visual.image} alt={visual.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" style={{ objectPosition: visual.position }} />
          <div className="workflow-tour-shade" />
        </div>
        <figcaption className="workflow-tour-media-caption">{visual.caption}</figcaption>
        <div className="workflow-tour-proof">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-white"><ProofIcon aria-hidden="true" className="h-4 w-4 text-cyan-200" />{stage.proofTitle}<span className="ml-auto text-[9px] font-normal text-blue-100/70">Illustrative record</span></div>
          <dl>{stage.rows.map(([label, value]) => <div key={label} className="flex flex-wrap justify-between gap-x-3 gap-y-1 border-t border-white/10 py-2 text-[10px]"><dt className="text-blue-100/75">{label}</dt><dd className="font-mono font-medium text-white">{value}</dd></div>)}</dl>
          <p className="mt-2 text-[10px] leading-5 text-cyan-100">{stage.artifact}</p>
        </div>
      </figure>
      <div id={present ? `${id}-panel` : undefined} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} tabIndex={present ? 0 : -1} className="workflow-tour-copy">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[.14em] text-[#032aac]">0{index + 1} / {stage.subtitle}</p>
        <h3 aria-label={stage.headline} className="workflow-tour-headline font-display">{stage.headline}</h3>
        <div className="workflow-tour-before">
          <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold text-[#62758a]"><FileSpreadsheet aria-hidden="true" className="h-3.5 w-3.5" />With separate spreadsheets</p>
          <p>{stage.manual}</p>
        </div>
        <div className="workflow-tour-after">
          <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold text-[#032aac]"><Check aria-hidden="true" className="h-3.5 w-3.5" />With Space BQS</p>
          <p>{stage.approach}</p>
        </div>
        <p className="workflow-tour-benefit">{stage.benefit}</p>
        <Link href={visual.href} className="workflow-tour-link">{visual.link}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
      </div>
    </motion.div>
  );
}

export default function WorkflowScrollSections() {
  const id = useId();
  const ref = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [pinned, setPinned] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const desktop = matchMedia("(min-width: 1024px) and (min-height: 860px)");
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(preference.matches);
      setPinned(desktop.matches && !preference.matches);
    };
    sync();
    desktop.addEventListener("change", sync);
    preference.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      preference.removeEventListener("change", sync);
    };
  }, []);

  const select = useCallback((index: number) => {
    if (activeRef.current === index) return;
    setDirection(index > activeRef.current ? 1 : -1);
    activeRef.current = index;
    setActive(index);
  }, []);

  const update = useCallback(() => {
    if (!pinned || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const progress = clamp((96 - rect.top) / Math.max(1, rect.height - innerHeight));
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    select(Math.round(progress * (STAGES.length - 1)));
  }, [pinned, select]);
  useViewportScroll(ref, update);

  const navigate = (index: number) => {
    select(index);
    if (pinned && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      window.scrollTo({ top: rect.top + scrollY - 96 + Math.max(1, rect.height - innerHeight) * index / (STAGES.length - 1), behavior: "instant" });
    }
  };
  const onKeys = (event: KeyboardEvent<HTMLElement>) => {
    const target = event.key === "ArrowRight" || event.key === "ArrowDown" ? Math.min(active + 1, 5)
      : event.key === "ArrowLeft" || event.key === "ArrowUp" ? Math.max(active - 1, 0)
      : event.key === "Home" ? 0 : event.key === "End" ? 5 : null;
    if (target === null) return;
    event.preventDefault();
    navigate(target);
    buttons.current[target]?.focus({ preventScroll: true });
  };

  return (
    <section ref={ref} id="section-comparison" className="workflow-compare workflow-tour" data-pinned={pinned} data-reduced={reduced} aria-labelledby={`${id}-heading`}>
      <div className="workflow-tour-pin">
        <header className="workflow-tour-header">
          <div>
            <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#032aac]">Why survey firms switch</p>
            <WeightText id={`${id}-heading`} tag="h2" mode="scroll-reveal" restWeight={400} activeWeight={700} className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#031038] sm:text-4xl">From the first reading<br />to the final record.</WeightText>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#52657c]">Spreadsheets hold numbers. Space BQS connects the readings, calculations, review, and proof.</p>
        </header>

        <div className="workflow-tour-layout">
          <nav role="tablist" aria-label="Explore workflow benefits" onKeyDown={onKeys} className="workflow-tour-rail">
            {STAGES.map((item, index) => <button
              key={item.short} ref={el => { buttons.current[index] = el; }} type="button" role="tab"
              id={`${id}-tab-${index}`} aria-selected={active === index} aria-controls={`${id}-panel`} tabIndex={active === index ? 0 : -1}
              onClick={() => navigate(index)}
            ><span className="workflow-tour-step">0{index + 1}</span><span>{item.short}</span></button>)}
          </nav>

          <div className="workflow-tour-slides">
            <AnimatePresence initial={false} custom={direction}>
              <WorkflowSlide key={active} index={active} direction={direction} reduced={reduced} id={id} />
            </AnimatePresence>
          </div>
        </div>

        <div className="workflow-tour-footer">
          <Link href="/demo" className="inline-flex min-h-11 items-center gap-2 font-semibold text-[#032aac]">See the workflow in a demo<ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-[#63758a]">0{active + 1} / 06</span>
            <button type="button" disabled={active === 0} onClick={() => navigate(active - 1)} aria-label="Previous workflow step" className="workflow-tour-arrow"><ArrowLeft aria-hidden="true" className="h-4 w-4" /></button>
            <button type="button" disabled={active === 5} onClick={() => navigate(active + 1)} aria-label="Next workflow step" className="workflow-tour-arrow"><ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="workflow-tour-progress" aria-hidden="true"><span ref={barRef} style={pinned ? undefined : { transform: `scaleX(${active / 5})` }} /></div>
      </div>
    </section>
  );
}
