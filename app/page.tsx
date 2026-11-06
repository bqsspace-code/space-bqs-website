import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, Eyebrow, H2, Faq } from "./components/ui";
import HeroLiquidSection from "./components/HeroLiquidSection";
import HomeProblemSummary from "./components/HomeProblemSummary";
import DeckInteractiveShowcase from "./components/DeckInteractiveShowcase";
import WaveTransition from "./components/WaveTransition";
import { SurveyWarehouseSection, SpreadsheetCompareSection, WhoItsForSection } from "./components/HomeEnhancements";
import { BevelWorkflowCards } from "@/components/ui/bevel-workflow-cards";
import RolloutShowcase from "./components/RolloutShowcase";

export const metadata: Metadata = {
  title: "BQS Software for Marine Surveyors — Capture, Calculate, Certify",
  description:
    "Space BQS is software for bunker surveyors and survey firms: offline mobile capture, temperature-corrected MT engine, locked certificates, fleet dashboard. Quantity-only.",
};

const FAQ_ITEMS = [
  {
    q: "What is Space BQS?",
    a: "Space BQS is bunker quantity survey software built specifically for survey firms. It captures tank readings on deck, runs certified volume correction calculations, and produces locked, tamper-evident certificates.",
  },
  {
    q: "Does the mobile app work without internet on deck?",
    a: "Yes. The mobile app carries your vessel tank register and volume correction tables cached locally. It computes quantities offline in engine rooms and barges, with a 72-hour offline lease that syncs automatically when signal returns.",
  },
  {
    q: "Which fuel grades and calculation standards are supported?",
    a: "Grades include VLSFO, HFO, MGO, LSMGO, and ULSFO, using standard temperature volume correction factors (VCF), with density ranges 0.820–1.000 kg/L and temperatures 0–90°C.",
  },
  {
    q: "What does the client receive?",
    a: "Clients receive a locked, tamper-evident A4 PDF certificate, plus an audit-ready four-sheet Excel workbook detailing particulars, soundings, strapping interpolations, and volume correction factors.",
  },
  {
    q: "Do surveyors need an account to use the mobile app?",
    a: "The app is free to install on iPhone, iPad, and Android from the official App Store and Google Play. Surveyors sign in with an account provisioned by their survey firm's administrator.",
  },
  {
    q: "Does Space BQS perform fuel quality or lab testing?",
    a: "No. Space BQS is strictly quantity-only. Quality testing is a separate laboratory discipline. Bunker Delivery Note (BDN) numbers are recorded for cross-reference and reconciliation.",
  },
  {
    q: "What happens to survey data after sign-off?",
    a: "Every finalised survey is permanently stored in the Survey Warehouse with its raw tank readings, calibration table revisions, engine version, and certificate. When a dispute arrives months later, you open the verifiable record instead of rebuilding it.",
  },
];

export default function Home() {
  return (
    <div className="liquid-home">
      {/* 1. Product promise, proof points, and the real app walkthrough link. */}
      <HeroLiquidSection compact />
      <WaveTransition variant="swell" accent="#7fbecb" />

      {/* 2. One concise explanation of the problem. */}
      <HomeProblemSummary />
      <WaveTransition variant="sweep" to="var(--pearl-mist, #e4eff9)" />

      {/* 3. The three survey types; mobile users can swipe between the cards. */}
      <section id="section-workflows" className="bg-mist-100 px-6 pt-16 lg:pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-5 border-b border-[#D3E9F3]/70 pb-8 md:flex-row md:items-end">
            <div><Eyebrow>Three workflows. One engine.</Eyebrow><H2>Every quantity job.<br />The same confidence.</H2></div>
            <p className="max-w-[290px] text-sm leading-6 text-[#52657c]">Delivery, fuel remaining on board, or removal. Keep the reading and the proof together.</p>
          </div>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-[#637c94] md:hidden">Swipe to explore the three workflows →</p>
          <div className="home-service-cards mt-5 md:mt-8"><BevelWorkflowCards /></div>
        </div>
      </section>
      <WaveTransition variant="crest" flip />

      {/* 4. One connected story: interactive on-deck phone showcase with scroll wipe effects. */}
      <DeckInteractiveShowcase />
      <WaveTransition variant="sweep" to="var(--pearl-mist, #e4eff9)" flip />

      {/* 5. Let visitors explore the retained evidence rather than repeat its description. */}
      <SurveyWarehouseSection />
      <WaveTransition variant="swell" to="#edf4fc" accent="#8bbce7" flip />

      {/* 6. A compact comparison for visitors who need more detail. */}
      <SpreadsheetCompareSection />
      <WaveTransition variant="ripple" to="var(--pearl-mist, #e4eff9)" />

      {/* 7. The four people connected by the same record. */}
      <WhoItsForSection />
      <WaveTransition variant="crest" to="var(--pearl-mist, #e4eff9)" flip />

      {/* 8. Implementation and licensing now share a single decision point. */}
      <RolloutShowcase />
      <WaveTransition variant="sweep" />

      {/* 9. Remaining objections, followed by the shared footer's final demo CTA. */}
      <Section id="section-faq" className="bg-[#F7FBFD]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>A little more clarity</Eyebrow>
            <H2>Common<br />questions.</H2>
            <p className="mt-3 text-base leading-relaxed text-[#52657c]">The details that matter to your firm.</p>
            <Link href="/pricing" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#032aac] hover:underline">Team licensing &amp; pricing<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="lg:col-span-7"><Faq items={FAQ_ITEMS} /></div>
        </div>
      </Section>
    </div>
  );
}
