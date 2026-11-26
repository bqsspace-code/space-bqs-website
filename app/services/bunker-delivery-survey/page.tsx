import type { Metadata } from "next";
import Link from "next/link";
import { Section, AnswerBlock, CtaRow, Faq } from "../../components/ui";
import EditorialHero, { HeroImage } from "../../components/EditorialHero";
import { routeMetadata } from "../../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/services/bunker-delivery-survey", {
  title: "Bunker Delivery Survey Workflow",
  description:
    "See how bunker survey teams record delivery readings, review inputs, compare quantities with the BDN, and prepare a report.",
});

export default function Page() {
  return (
    <div className="bg-[#f7fbfd]">
      <EditorialHero
        trail={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: "/services/bunker-delivery-survey", label: "Bunker delivery" }]}
        eyebrow="Survey workflow / 01"
        title="Bunker delivery, from first reading to review."
        description="Your surveyors attend the delivery. Space BQS provides software to organize the captured information, calculation inputs, office review, and report workflow."
        primaryAction={{ href: "/request-demo", label: "Discuss this workflow" }}
        secondaryAction={{ href: "/sample-report", label: "View illustrative report" }}
        visual={<HeroImage src="/assets/videos/bqs-app-beingused-poster.webp" alt="Surveyor using a tablet beside an open vessel tank" caption="Field-capture context · confirm exact app screens for your product release." position="center" />}
      />
      <Section eyebrow="Where it fits" title="One delivery. Two sets of records." lede="The supplier's delivery note and the survey team's measurement record serve different roles. Keep the scope and inputs visible for review.">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-[#d6e4ed] bg-white p-6 shadow-sm sm:p-7"><p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#52718d]">Supplier record</p><h3 className="mt-3 font-display text-xl font-semibold text-[#031038]">Bunker Delivery Note</h3><p className="mt-2 text-sm leading-7 text-[#52657c]">The supplier's declared delivery information, retained as a reference for the survey team's comparison.</p></article>
          <article className="rounded-2xl border border-[#b8dbea] bg-[#eaf4f9] p-6 shadow-sm sm:p-7"><p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#176a8e]">Survey team record</p><h3 className="mt-3 font-display text-xl font-semibold text-[#031038]">Measured information</h3><p className="mt-2 text-sm leading-7 text-[#405771]">The survey firm's readings and relevant inputs, captured under its agreed measurement procedure and reviewed by its team.</p></article>
        </div>
      </Section>
      <Section eyebrow="Workflow" title="A clear sequence for the job">
        <ol className="grid gap-4 lg:grid-cols-3">
          {[["01", "Before delivery", "Record the opening measurements and survey context required by the agreed scope."], ["02", "After delivery", "Record the closing readings, observed conditions, and relevant BDN reference."], ["03", "Review & report", "Review the captured information and calculation details, then prepare the report output for the current release."]].map(([n, title, copy]) => <li key={n} className="relative min-h-[220px] overflow-hidden rounded-2xl border border-[#d6e4ed] bg-white p-6 sm:p-7"><span className="font-mono text-xs font-semibold tracking-[.18em] text-[#16879a]">STEP {n}</span><h3 className="mt-9 font-display text-2xl font-semibold tracking-tight text-[#031038]">{title}</h3><p className="mt-3 text-sm leading-7 text-[#52657c]">{copy}</p></li>)}
        </ol>
        <div className="mt-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <AnswerBlock><p>The BDN is the supplier's receipt. The survey firm's record documents its own measurements for comparison. A difference alone does not establish cause or determine a commercial outcome.</p></AnswerBlock>
          <div className="flex flex-col justify-center rounded-2xl bg-[#071b43] p-6 text-white sm:p-7"><p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#8ce4e4]">Continue exploring</p><h3 className="mt-2 font-display text-xl font-semibold">See the report layout before a walkthrough.</h3><Link href="/sample-report" className="mt-4 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-[#b9f1e8] underline underline-offset-4">Open illustrative sample report <span aria-hidden="true">↗</span></Link></div>
        </div>
        <div className="mt-8"><CtaRow /></div>
      </Section>
      <Section eyebrow="FAQ" title="Delivery workflow questions">
        <Faq items={[
          { q: "Do you provide the surveyors?", a: "No. You do. We provide the software your surveyors run on deck and in the office." },
          { q: "What if BDN and measured differ?", a: "Your report shows both with method and version, ready for your client to resolve commercially." },
          { q: "Do you test quality?", a: "No — quantity only. No lab testing." },
        ]} />
      </Section>
    </div>
  );
}
