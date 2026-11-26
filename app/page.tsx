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
import ServiceSchema from "./components/ServiceSchema";
import AppPreviewCard from "./components/AppPreviewCard";
import WeightText from "./components/WeightText";
import { routeMetadata } from "./lib/seo-metadata";

export const metadata = routeMetadata("/", {
  title: "Bunker Quantity Survey Software",
  description:
    "Offline bunker quantity survey software for marine survey teams. Capture tank readings, review fuel calculations, and issue PDF and Excel reports.",
});

const FAQ_ITEMS = [
  {
    q: "What is Space BQS?",
    a: "Space BQS is bunker quantity survey software for marine survey firms. Surveyors capture tank readings in the mobile app; the web platform supports review and PDF and Excel report workflows.",
  },
  {
    q: "Does the mobile app work without internet on deck?",
    a: "Yes. The mobile app supports recording survey work offline and synchronizing it with the web platform when connectivity returns. Ask the team about current device and offline-storage requirements.",
  },
  {
    q: "Which fuel grades and calculation standards are supported?",
    a: "Space BQS product materials list VLSFO, HFO, MGO, LSMGO, and ULSFO. Confirm the exact calculation-table edition, fuel coverage, and supported input ranges for your product release with the team.",
  },
  {
    q: "What does the client receive?",
    a: "Space BQS supports PDF and Excel report workflows. The illustrative sample on this site uses fictional data; request a current product output sample during a demo.",
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
    a: "Finalized survey records can be reviewed in the Space BQS register, with report outputs available through the web platform. Contact your organization administrator for account access and applicable retention details.",
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
      <section id="section-workflows" className="bg-mist-100 px-6 pt-16 pb-16 lg:pt-20 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-5 border-b border-[#D3E9F3]/70 pb-8 md:flex-row md:items-end">
            <div><Eyebrow>Three Workflows. One Engine.</Eyebrow><H2>Every Quantity Job.<br />The Same Confidence.</H2></div>
            <p className="max-w-[290px] text-sm leading-6 text-[#52657c]">Delivery, fuel remaining on board, or removal. Keep the reading and the proof together.</p>
          </div>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-[#637c94] md:hidden">Swipe to explore the three workflows →</p>
          <div className="home-service-cards mt-5 md:mt-8"><BevelWorkflowCards /></div>

          {/* Real app in action — on-deck execution card */}
          <div className="mt-12 lg:mt-16">
            <AppPreviewCard asSection={false} badge="See It In Action" />
            <aside aria-label="Worked bunker survey example" className="mt-6 border-l-2 border-[#19b5c9] pl-5 text-sm leading-7 text-[#52657c]">
              <h3 className="font-semibold text-[#031038]">Worked example: checking a bunker delivery note</h3>
              <table className="my-3 w-full max-w-md text-sm">
                <caption className="pb-2 text-left">Illustrative figures in metric tonnes (MT), not a customer result.</caption>
                <tbody className="divide-y divide-[#d3e9f3]">
                  <tr><th scope="row" className="py-1 text-left font-normal">Supplier’s bunker delivery note</th><td className="text-right tabular-nums">460.000</td></tr>
                  <tr><th scope="row" className="py-1 text-left font-normal">Sample survey total</th><td className="text-right tabular-nums">457.819</td></tr>
                  <tr><th scope="row" className="py-1 text-left font-semibold">Difference (survey minus note)</th><td className="text-right font-semibold tabular-nums">−2.181 (−0.47%)</td></tr>
                </tbody>
              </table>
              <div className="flex flex-wrap gap-x-5 gap-y-1 font-semibold text-[#032aac]">
                <Link href="/tools/bdn-discrepancy?example=delivery-note" className="underline">Check these figures</Link>
                <Link href="/sample-report" className="underline">View the sample certificate and workbook</Link>
                <Link href="/how-we-measure#bdn-validation" className="underline">See the formula and test cases</Link>
              </div>
            </aside>
          </div>
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
      <ServiceSchema offering="deployment" />
      <ServiceSchema offering="data-migration" />
      <WaveTransition variant="sweep" />

      {/* 9. Remaining objections, followed by the shared footer's final demo CTA. */}
      <Section id="section-faq" className="bg-[#F7FBFD]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>A Little More Clarity</Eyebrow>
            <WeightText
              id="faq-heading"
              tag="h2"
              mode="scroll-reveal"
              restWeight={400}
              activeWeight={700}
              activeColor="#032AAC"
              accentColor="#19B5C9"
              className="max-w-[240px] font-display text-2xl font-bold leading-tight tracking-tight text-[#031038] sm:text-3xl lg:text-4xl"
            >
              Common Questions.
            </WeightText>
            <p className="mt-3 text-base leading-relaxed text-[#52657c]">The details that matter to your firm.</p>
            <Link href="/pricing" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#032aac] hover:underline">Team licensing &amp; pricing<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="lg:col-span-7"><Faq items={FAQ_ITEMS} /></div>
        </div>
      </Section>
    </div>
  );
}
