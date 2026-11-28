import type { Metadata } from "next";
import Link from "next/link";
import { routeMetadata } from "../lib/seo-metadata";
import { PageHero, Chapter } from "../components/Editorial";

export const metadata: Metadata = routeMetadata("/faq", {
  title: "Space BQS FAQ: Scope, Calculation, Mobile, Reports, Licensing",
  description:
    "Straight answers about Space BQS bunker quantity survey software: what it does and does not do, how it calculates, how the mobile app works, reports, deployment and licensing.",
});

const link = "font-semibold text-[#032aac] underline decoration-[#9bcbd7] underline-offset-4";

type Item = { q: string; a: string; more?: { href: string; label: string } };
const GROUPS: { id: string; eyebrow: string; title: string; tone: "light" | "white" | "mist"; items: Item[] }[] = [
  {
    id: "scope",
    eyebrow: "Scope",
    title: "What it is, and is not.",
    tone: "light",
    items: [
      { q: "What is Space BQS?", a: "Software for bunker quantity survey teams: a mobile app for capture on deck and a web platform for office review, finalisation and reports.", more: { href: "/about", label: "About Space BQS" } },
      { q: "Does Space BQS attend vessels or perform surveys?", a: "No. Marine survey firms provide attendance and make the measurements. Space BQS is the software they use." },
      { q: "Does it test fuel quality?", a: "No. There is no laboratory testing and no quality opinion in the product. Quality testing is out of scope." },
      { q: "Which surveys does it cover?", a: "Bunker delivery, remaining on board (ROB) and debunkering.", more: { href: "/services", label: "Survey workflows" } },
    ],
  },
  {
    id: "calculation",
    eyebrow: "Calculation",
    title: "How the numbers are produced.",
    tone: "white",
    items: [
      { q: "How is a quantity calculated?", a: "From the tank reading, less water, with a temperature volume correction, then converted to mass in metric tonnes.", more: { href: "/how-we-measure", label: "How we measure" } },
      { q: "Does a BDN difference prove a shortage?", a: "No. A difference is a reason to check scope, units, timing, inputs and applicable terms. It does not establish a cause or a contractual outcome.", more: { href: "/why-independent", label: "BDN vs measured quantity" } },
      { q: "Does software verify the physical measurement?", a: "No. It does not confirm physical measurements, vessel calibration data or contract requirements. A repeatable result still needs review against the applicable procedure." },
      { q: "Can I try the arithmetic myself?", a: "Yes. The tools section has worksheets that show the steps using factors you supply.", more: { href: "/tools", label: "Tools" } },
    ],
  },
  {
    id: "mobile",
    eyebrow: "Mobile app",
    title: "On deck.",
    tone: "mist",
    items: [
      { q: "Does the app work offline?", a: "Yes. You can capture readings and calculate locally, then synchronise when connectivity returns.", more: { href: "/mobile-app", label: "Mobile app" } },
      { q: "What does the QR code do?", a: "It identifies the vessel and optional port. It does not populate tank measurements." },
      { q: "Where do I get the app?", a: "From the official App Store and Google Play listings linked on the mobile app page." },
      { q: "Are tank photos and digital signatures supported?", a: "Not yet. They remain roadmap items. Trim and list are recorded as context, not calculated as corrections." },
    ],
  },
  {
    id: "reports",
    eyebrow: "Review and reports",
    title: "In the office.",
    tone: "white",
    items: [
      { q: "Who can finalise a record?", a: "An authorised supervisor or firm administrator completes the record on the web platform. Product roles are Surveyor, Supervisor and Org Admin.", more: { href: "/platform", label: "Platform" } },
      { q: "What report formats are available?", a: "PDF and Excel outputs prepared from the finalised record.", more: { href: "/sample-report", label: "Sample report" } },
      { q: "Can clients log in to see reports?", a: "Not today. A client self-serve portal is a roadmap concept, and reports are issued by your team.", more: { href: "/portal-roadmap", label: "Portal roadmap" } },
      { q: "Can it connect to our systems?", a: "Finalisation webhooks, REST access with an API key, MCP tools and a realtime bridge are described. Keys are issued per organisation.", more: { href: "/integrations-api", label: "Integrations and API" } },
    ],
  },
  {
    id: "commercial",
    eyebrow: "Commercial and deployment",
    title: "Getting started.",
    tone: "mist",
    items: [
      { q: "Does Space BQS publish prices?", a: "No fixed prices are listed. Licensing is scoped around your team and workflows.", more: { href: "/pricing", label: "Pricing" } },
      { q: "Can we run a pilot?", a: "Contact the team to discuss whether a pilot is available and what its setup and evaluation scope would be.", more: { href: "/evaluate", label: "How to evaluate" } },
      { q: "Can we bring existing records over?", a: "Data migration is planned as map, validate, trial-import and reconcile before the final move.", more: { href: "/services/data-migration", label: "Data migration" } },
      { q: "Where can it be hosted?", a: "Public cloud, private cloud or on-premises, scoped around your team and infrastructure.", more: { href: "/services/deployment", label: "Deployment" } },
    ],
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: GROUPS.flatMap((g) => g.items).map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
};

export default function Page() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        href="/faq"
        crumb="FAQ"
        eyebrow="Questions, answered"
        title="Straight answers."
        description="What Space BQS does and does not do, how it calculates, how the app and reports work, and how to get started. Each answer points to the page with the detail."
        primaryAction={{ href: "/request-demo", label: "Ask us something else" }}
        secondaryAction={{ href: "/evaluate", label: "How to evaluate" }}
      />

      <nav aria-label="FAQ topics" className="sticky top-16 z-30 border-b border-[#d3e4ee] bg-white/70 backdrop-blur-xl">
        <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 sm:px-8 lg:px-10">
          {GROUPS.map((g) => (
            <li key={g.id} className="shrink-0">
              <a href={`#${g.id}`} className="inline-flex min-h-10 items-center rounded-full border border-[#b9d3e8] bg-white/70 px-4 text-sm font-semibold text-[#032aac] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#032aac]">{g.eyebrow}</a>
            </li>
          ))}
        </ul>
      </nav>

      {GROUPS.map((g, i) => (
        <Chapter key={g.id} id={g.id} index={String(i + 1).padStart(2, "0")} eyebrow={g.eyebrow} title={g.title} tone={g.tone}>
          <div className="space-y-3">
            {g.items.map((item) => (
              <details key={item.q} className="group glass-card rounded-[1.3rem] open:shadow-[0_28px_60px_-34px_rgba(19,68,111,.5)]">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-[1.3rem] px-5 py-4 font-display text-lg font-semibold text-[#031038] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#032aac] sm:px-7 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full border border-[#b9d3e8] text-[#032aac] transition group-open:rotate-45">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 1v10M1 6h10" /></svg>
                  </span>
                </summary>
                <div className="px-5 pb-6 sm:px-7">
                  <p className="max-w-2xl text-[15px] leading-7 text-[#405a75]">{item.a}</p>
                  {item.more && <Link href={item.more.href} className={`mt-3 inline-block text-sm ${link}`}>{item.more.label} →</Link>}
                </div>
              </details>
            ))}
          </div>
        </Chapter>
      ))}

    </div>
  );
}
