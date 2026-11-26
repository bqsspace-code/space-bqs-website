import type { Metadata } from "next";
import Link from "next/link";
import { Section, AnswerBlock, Faq } from "../components/ui";
import WaveDivider from "../components/WaveDivider";
import { ServiceLinks } from "../components/MarketingPage";
import EditorialHero, { HeroImage } from "../components/EditorialHero";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/services", {
  title: "Bunker Survey Software Workflows",
  description:
    "Explore Space BQS software workflows for bunker delivery, ROB, and debunkering surveys, plus available migration and rollout support.",
});

export default function Page() {
  return (
    <div className="bg-[#f7fbfd]">
      <EditorialHero
        trail={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }]}
        eyebrow="Survey workflows · implementation support"
        title="Every bunker movement has its own story."
        description="Explore software workflows for bunker delivery, remaining on board, and debunkering—plus separately scoped migration and deployment support."
        primaryAction={{ href: "/request-demo", label: "Discuss your workflow" }}
        secondaryAction={{ href: "/features", label: "Explore product features" }}
        visual={<HeroImage src="/assets/videos/tablet-on-deck-poster.webp" alt="Surveyor using a tablet on a vessel deck" caption="Field context, office review, and a clear report trail." position="62% center" />}
      />

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10" aria-label="Service scope">
        <AnswerBlock>
          <p>Space BQS organizes bunker delivery, ROB, and debunkering survey records. Your survey firm determines the measurement scope and performs survey attendance. The software is for quantity workflows, not laboratory fuel-quality testing.</p>
        </AnswerBlock>
      </section>

      <Section id="service-workflows" eyebrow="Three operational moments" title="Choose the workflow that matches the job" lede="Each route begins with a different operational question. Select one to see the records and review context in more detail.">
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { n: "01", name: "Bunker delivery", when: "Fuel is supplied to the vessel", record: "Before-and-after measurements, observed conditions, and BDN reference.", href: "/services/bunker-delivery-survey", color: "from-[#0c2d64] to-[#0b4972]" },
            { n: "02", name: "ROB survey", when: "At a defined charter milestone", record: "Fuel-on-board information at the point set by the survey scope.", href: "/services/rob-survey", color: "from-[#071b43] to-[#123b67]" },
            { n: "03", name: "Debunkering", when: "Fuel is removed from a vessel", record: "Relevant opening and closing measurements under the agreed procedure.", href: "/services/debunkering-survey", color: "from-[#063446] to-[#0b5265]" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className={`group relative flex min-h-[330px] flex-col overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${item.color} p-6 text-white shadow-[0_24px_70px_-45px_rgba(3,16,56,.8)] transition hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#032aac] motion-reduce:transform-none motion-reduce:transition-none sm:p-7`}>
              <span aria-hidden="true" className="absolute -right-10 -top-14 font-display text-[11rem] font-semibold leading-none text-white/[.055]">{item.n}</span>
              <span className="relative font-mono text-[10px] uppercase tracking-[.2em] text-[#8ce4e4]">Workflow / {item.n}</span>
              <h3 className="relative mt-12 max-w-xs font-display text-3xl font-semibold tracking-tight sm:text-4xl">{item.name}</h3>
              <div className="relative mt-auto border-t border-white/15 pt-5">
                <p className="text-[10px] font-mono uppercase tracking-[.16em] text-white/55">When it happens</p>
                <p className="mt-1 text-sm font-medium text-white">{item.when}</p>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">{item.record}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#b9f1e8]">Explore workflow <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none">↗</span></span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section bg="mist" eyebrow="Implementation support" title="Move the records. Plan the environment." lede="Migration and deployment are scoped to your source data, requirements, and project—rather than assumed as one-size-fits-all services.">
        <ServiceLinks />
      </Section>

      <WaveDivider
        layers={2}
        colors={["#D3E9F3", "#EAF4F9"]}
        height={75}
        direction="up"
      />

      {/* FAQ */}
      <Section eyebrow="FAQ" title="Services questions">
        <div className="max-w-3xl">
          <Faq items={[
            { q: "Do you provide surveyors?", a: "No. Survey firms run jobs with their teams; Space BQS is the software they run on." },
            { q: "Do you test fuel quality?", a: "No. Quantity-only. No lab, no sludge, no sampling for quality." },
            { q: "Can on-hire and off-hire records be reviewed together?", a: "The survey scope and reporting process determine how the records are prepared and compared. Confirm the current product workflow with the team." },
          ]} />
        </div>
      </Section>
    </div>
  );
}
