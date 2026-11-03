"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Smartphone, ShieldCheck, ChartNoAxesCombined, FileCheck2 } from "lucide-react";
import { useViewportScroll } from "@/app/components/useViewportScroll";
import WeightText from "@/app/components/WeightText";
import teamImage from "@/public/assets/web_image/shutterstock_2507213927-scaled.webp";


const ROLES = [
  { icon: Smartphone, title: "Surveyors on Deck", action: "Scan, measure, submit", tag: "Field tool", description: "Capture tank readings and calculate offline, even in engine rooms. Submit once—without retyping ashore.", href: "/mobile-app", link: "Explore the mobile app" },
  { icon: ShieldCheck, title: "Supervisors in Office", action: "Review, complete, lock", tag: "Quantity review", description: "Check tank-level results and temperature corrections. Review, finalise, and lock the certificate before issue.", href: "/features/calculation-audit", link: "See the review workflow" },
  { icon: ChartNoAxesCombined, title: "Firm Owners & Ops", action: "Oversee fleet, volume & audit", tag: "Business oversight", description: "Track tonnage and team activity across your fleet. Keep every survey ready for audits and client questions.", href: "/features/survey-register-dashboard", link: "Explore the dashboard" },
  { icon: FileCheck2, title: "Clients & Principals", action: "Clear, defensible certificates", tag: "Client handover", description: "Receive a locked PDF and a four-sheet Excel workbook. Follow every reading, factor, and total—no login needed.", href: "/sample-report", link: "See a sample report" },
] as const;

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => value * value * (3 - 2 * value);

export default function TeamSplitCards() {
  const ref = useRef<HTMLElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const rotors = useRef<(HTMLDivElement | null)[]>([]);
  const backs = useRef<(HTMLDivElement | null)[]>([]);
  const phaseRef = useRef<HTMLSpanElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const preference = matchMedia("(min-width: 1024px) and (min-height: 740px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setEnhanced(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  const update = useCallback(() => {
    const section = ref.current;
    if (!section) return;
    if (!enhanced) {
      cards.current.forEach(card => card?.removeAttribute("style"));
      rotors.current.forEach(rotor => rotor?.removeAttribute("style"));
      backs.current.forEach(back => { if (back) back.inert = false; });
      return;
    }
    const rect = section.getBoundingClientRect();
    const progress = showAll ? 1 : clamp((96 - rect.top) / Math.max(1, rect.height - innerHeight));
    const split = ease(clamp((progress - .08) / .3));
    cards.current.forEach((card, index) => {
      if (!card) return;
      const flip = ease(clamp((progress - .42 - index * .035) / .3));
      card.style.transform = `translate3d(${(index - 1.5) * 18 * split}px, ${Math.sin(split * Math.PI) * (index % 2 ? 5 : -5)}px, 0)`;
      card.style.setProperty("--split-radius", `${split * 22}px`);
      const rotor = rotors.current[index];
      if (rotor) rotor.style.transform = `rotateY(${flip * 180}deg)`;
      const back = backs.current[index];
      if (back) back.inert = flip < .5;
    });
    if (phaseRef.current) {
      const label = progress < .15 ? "01 / One shared workflow" : progress < .5 ? "02 / Four connected roles" : "03 / Find your role";
      if (phaseRef.current.textContent !== label) phaseRef.current.textContent = label;
    }
  }, [enhanced, showAll]);

  useViewportScroll(ref, update);
  useEffect(update, [update]);

  return (
    <section ref={ref} id="section-personas" aria-labelledby="team-split-heading" className="team-glass-section team-split-section" data-enhanced={enhanced}>
      <div className="team-split-sticky">
        <header className="team-split-heading">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#032aac]">Built for the whole team</p>
          <WeightText id="team-split-heading" tag="h2" mode="scroll-reveal" restWeight={400} activeWeight={700} className="font-display text-3xl font-bold leading-tight tracking-tight text-[#031038] sm:text-4xl">One platform for everyone<br className="hidden sm:block" /> who relies on the number.</WeightText>
          <p className="text-sm leading-relaxed text-[#52657c]">From the first reading on deck to the final proof in your client’s hands.</p>
        </header>

        <div className="team-split-static-image">
          <Image src={teamImage} alt="An oil tanker underway at sea, connecting the work of surveyors, office teams, and clients" fill sizes="(min-width: 768px) 90vw, 100vw" className="object-cover" />
        </div>

        <div className="team-split-grid">
          {ROLES.map((role, index) => (
            <article key={role.title} ref={el => { cards.current[index] = el; }} className="team-split-card" aria-label={role.title}>
              <div ref={el => { rotors.current[index] = el; }} className="team-split-rotor">
                <div className="team-split-front" aria-hidden="true">
                  <div className="team-split-image-plane" style={{ left: `${index * -100}%` }}>
                    <Image src={teamImage} alt="" fill sizes="(min-width: 1280px) 1080px, 90vw" className="object-cover" />
                  </div>
                  <div className="team-split-image-shade" />
                  <span className="team-split-front-label"><span>0{index + 1}</span>{role.tag}</span>
                </div>
                <div ref={el => { backs.current[index] = el; }} className="team-split-back" inert={enhanced}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white bg-white/70 text-[#032aac]"><role.icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} /></span>
                    <span className="font-mono text-[10px] text-[#647b91]">0{index + 1} / 04</span>
                  </div>
                  <div className="team-split-copy">
                    <p className="font-mono text-[9px] uppercase tracking-[.12em] text-[#526f89]">{role.tag}</p>
                    <h3 className="mt-2 font-display text-xl font-bold leading-tight tracking-tight text-[#031038]">{role.title}</h3>
                    <p className="mt-3 text-xs font-semibold leading-5 text-[#032aac]">{role.action}</p>
                    <p className="mt-3 text-[13px] leading-[1.65] text-[#415971]">{role.description}</p>
                  </div>
                  <Link href={role.href} className="team-split-link">{role.link}<ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {enhanced && <div className="team-split-instruction">
          <span aria-hidden="true" className="inline-flex items-center gap-2"><ArrowDown className="h-3.5 w-3.5" /><span ref={phaseRef}>01 / One shared workflow</span></span>
          <button type="button" onClick={() => setShowAll(value => !value)} aria-pressed={showAll} className="min-h-11 font-semibold text-[#032aac] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">{showAll ? "Follow scroll" : "Show all roles"}</button>
        </div>}
      </div>
    </section>
  );
}
