import type { Metadata } from "next";
import Link from "next/link";
import EditorialHero from "../components/EditorialHero";
import { Section } from "../components/ui";
import { RESOURCES } from "../lib/resources";
import { routeMetadata } from "../lib/seo-metadata";
import { ArrowRight, BookOpen, Calculator, ClipboardCheck, FileText, Ruler, Ship } from "lucide-react";

export const metadata: Metadata = routeMetadata("/resources", {
  title: "Bunker Survey Resources and Guides",
  description: "Explore plain-language bunker survey guides on tank readings, calculations, BDN comparisons, ROB, reports, and standards context.",
});

const RESOURCE_GROUPS = [
  { id: "foundations", title: "Start with the fundamentals", description: "Understand the survey and the language used in the records.", icon: BookOpen, slugs: ["what-is-bunker-quantity-survey", "glossary-10-terms"] },
  { id: "measurements", title: "Measurements and methods", description: "Explore tank readings, volume correction, and measurement approaches.", icon: Ruler, slugs: ["ullage-vs-sounding", "temperature-correction-explained", "mass-flow-meters-vs-tank-sounding"] },
  { id: "delivery", title: "Delivery records and comparisons", description: "Compare survey records with delivery information and organize review.", icon: ClipboardCheck, slugs: ["bdn-vs-actual", "bunker-shortage-claim-checklist", "cappuccino-effect-bunker-survey", "what-a-bunker-survey-report-contains"] },
  { id: "rob", title: "ROB and charter periods", description: "Keep opening and closing ROB, movements, and reporting periods in view.", icon: Ship, slugs: ["rob-checklist", "on-off-hire-fuel-settlement", "rob-vs-bunker-delivery-survey"] },
  { id: "standards", title: "Standards and port context", description: "Read standards context separately from software claims or approval.", icon: FileText, slugs: ["standards-in-plain-english", "singapore-ss600-bunker-surveying-standard"] },
  { id: "working-with-data", title: "Working with digital records", description: "Consider repeatable arithmetic, inputs, and review in software workflows.", icon: Calculator, slugs: ["reduce-spreadsheet-errors-in-bunker-surveys"] },
];

export default function Page() {
  const resourcesBySlug = new Map(RESOURCES.map((resource) => [resource.slug, resource]));
  const groupedSlugs = new Set(RESOURCE_GROUPS.flatMap((group) => group.slugs));
  const uncategorized = RESOURCES.filter((resource) => !groupedSlugs.has(resource.slug));

  return (
    <div className="bg-[#f7fbfd]">
      <EditorialHero
        trail={[{ href: "/", label: "Home" }, { href: "/resources", label: "Resources" }]}
        eyebrow="Field notes / calculation context / report review"
        title="Useful answers for the work behind every survey."
        description="Browse plain-language guides to tank readings, bunker quantity calculations, delivery comparisons, ROB, and standards context. Start with a question and follow the references that matter to your workflow."
        primaryAction={{ href: "#guide-library", label: "Browse the guide library" }}
        secondaryAction={{ href: "/tools", label: "Open the worksheets" }}
      />

      <Section eyebrow="Guide library" title="Choose a topic, then open a guide." lede="The library is grouped around common survey questions. Standards and product implementation details should always be checked against the current source and release.">
        <nav aria-label="Resource topics" className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCE_GROUPS.map(({ id, title, icon: Icon }) => (
            <a key={id} href={`#${id}`} className="flex min-h-14 items-center gap-3 rounded-xl border border-[#d3e4ee] bg-white px-4 py-3 text-sm font-semibold text-[#17314f] transition hover:border-[#81c7d2] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#032aac]">
              <Icon aria-hidden="true" className="size-4 shrink-0 text-[#16879a]" />{title}<ArrowRight aria-hidden="true" className="ml-auto size-4 text-[#52718d]" />
            </a>
          ))}
        </nav>

        <div id="guide-library" className="scroll-mt-28 space-y-12">
          {RESOURCE_GROUPS.map(({ id, title, description, icon: Icon, slugs }) => {
            const guides = slugs.map((slug) => resourcesBySlug.get(slug)).filter((guide) => guide !== undefined);
            if (guides.length === 0) return null;
            return (
              <section key={id} id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28">
                <div className="mb-5 flex items-start gap-3 border-b border-[#d7e5ed] pb-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#eaf4f9] text-[#176a8e]"><Icon aria-hidden="true" className="size-5" /></span>
                  <div><h2 id={`${id}-heading`} className="font-display text-xl font-semibold text-[#031038] sm:text-2xl">{title}</h2><p className="mt-1 text-sm leading-6 text-[#60748a]">{description}</p></div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {guides.map((guide) => (
                    <Link key={guide.slug} href={`/resources/${guide.slug}`} className="group flex min-h-full flex-col rounded-2xl border border-[#d3e4ee] bg-white p-5 shadow-[0_12px_36px_-30px_rgba(3,42,172,.35)] transition hover:-translate-y-0.5 hover:border-[#81c7d2] hover:shadow-[0_20px_40px_-30px_rgba(3,42,172,.38)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#032aac] sm:p-6">
                      <span className="font-mono text-[9px] font-semibold uppercase tracking-[.16em] text-[#16879a]">Guide · updated {guide.updated}</span>
                      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-[#031038] group-hover:text-[#032aac]">{guide.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-6 text-[#52657c]">{guide.description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#032aac]">Read guide <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" /></span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

          {uncategorized.length > 0 && (
            <section aria-labelledby="more-guides-heading">
              <div className="mb-5 border-b border-[#d7e5ed] pb-4"><h2 id="more-guides-heading" className="font-display text-xl font-semibold text-[#031038] sm:text-2xl">More guides</h2></div>
              <div className="grid gap-4 md:grid-cols-2">{uncategorized.map((guide) => <Link key={guide.slug} href={`/resources/${guide.slug}`} className="rounded-2xl border border-[#d3e4ee] bg-white p-5 transition hover:border-[#81c7d2] sm:p-6"><h3 className="font-display text-lg font-semibold text-[#031038]">{guide.title}</h3><p className="mt-2 text-sm leading-6 text-[#52657c]">{guide.description}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#032aac]">Read guide <ArrowRight aria-hidden="true" className="size-4" /></span></Link>)}</div>
            </section>
          )}
        </div>
      </Section>
    </div>
  );
}
