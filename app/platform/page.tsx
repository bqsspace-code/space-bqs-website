import type { Metadata } from "next";
import Link from "next/link";
import { routeMetadata } from "../lib/seo-metadata";
import EditorialHero from "../components/EditorialHero";
import { Section, CtaRow, AnswerBlock } from "../components/ui";
import { ArrowRight, Database, FileSpreadsheet, Lock, Search } from "lucide-react";

export const metadata: Metadata = routeMetadata("/platform", {
  title: "Platform — Your Office View of Every Survey",
  description:
    "Review bunker survey calculations, manage vessel records, follow survey status, and prepare PDF and Excel reports in the Space BQS web platform.",
});

export default function Page() {
  return (
    <div className="bg-[#f7fbfd] pb-16">
      <EditorialHero
        trail={[{ href: "/", label: "Home" }, { href: "/platform", label: "Platform" }]}
        eyebrow="Office web platform / review and reporting"
        title="Bring field submissions into office review."
        description="Use the Space BQS web platform to find survey records, review available inputs, manage vessel references, and work with report outputs. Confirm release-specific details with the product team."
        primaryAction={{ href: "/order-lifecycle", label: "Follow the record workflow" }}
        secondaryAction={{ href: "/sample-report", label: "View the sample report" }}
      />

      <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-6">
        <AnswerBlock>
          <p>
            Product materials describe a web workflow for office review and finalization, with PDF and Excel report workflows. Mobile field capture and web review are distinct parts of the survey record process; confirm the current status labels, permissions, and available outputs for your release.
          </p>
        </AnswerBlock>
      </div>

      <Section eyebrow="Office workflow" title="A review workspace for survey teams" lede="The web platform complements the field workflow. Use it to review records and reference information, then prepare the report outputs supported by your product release.">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-[#d3e4ee] bg-white p-6 shadow-sm sm:p-7">
            <span className="grid size-11 place-items-center rounded-xl bg-[#eaf4f9] text-[#176a8e]"><Search aria-hidden="true" className="size-5" /></span>
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#16879a]">01 / Find</p>
            <h2 className="mt-2 font-display text-xl font-semibold text-[#031038]">Survey register</h2>
            <p className="mt-2 text-sm leading-7 text-[#52657c]">Use the available search and status controls to find survey records for office review.</p>
          </article>
          <article className="rounded-2xl border border-[#d3e4ee] bg-white p-6 shadow-sm sm:p-7">
            <span className="grid size-11 place-items-center rounded-xl bg-[#eaf4f9] text-[#176a8e]"><Lock aria-hidden="true" className="size-5" /></span>
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#16879a]">02 / Review</p>
            <h2 className="mt-2 font-display text-xl font-semibold text-[#031038]">Supervisor workflow</h2>
            <p className="mt-2 text-sm leading-7 text-[#52657c]">Review captured information and calculation inputs before finalizing a survey record under your organization’s process.</p>
          </article>
          <article className="rounded-2xl border border-[#d3e4ee] bg-white p-6 shadow-sm sm:p-7">
            <span className="grid size-11 place-items-center rounded-xl bg-[#eaf4f9] text-[#176a8e]"><Database aria-hidden="true" className="size-5" /></span>
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#16879a]">03 / Reference</p>
            <h2 className="mt-2 font-display text-xl font-semibold text-[#031038]">Vessel information</h2>
            <p className="mt-2 text-sm leading-7 text-[#52657c]">Review vessel particulars and the reference information associated with survey work. Confirm supported data and calculation details for your release.</p>
          </article>
        </div>

        <div className="mt-8 rounded-2xl border border-[#d3e4ee] bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#071b43] text-[#7de1e5]"><FileSpreadsheet aria-hidden="true" className="size-5" /></span>
            <div className="flex-1"><p className="font-display text-lg font-semibold text-[#031038]">Report handover</p><p className="mt-1 text-sm leading-6 text-[#52657c]">Product materials describe PDF and Excel report workflows. View the sample layout and confirm the current outputs and fields with the product team.</p></div>
            <Link href="/sample-report" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-[#032aac] underline decoration-[#9bcbd7] underline-offset-4">Explore the sample <ArrowRight aria-hidden="true" className="size-4" /></Link>
          </div>
        </div>
      </Section>

      <Section bg="mist" eyebrow="Field to office" title="Keep the handoff clear">
        <ol className="grid gap-4 md:grid-cols-3">
          <li className="rounded-2xl border border-[#d3e4ee] bg-white p-6"><span className="font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#16879a]">Step 01 / Mobile</span><h2 className="mt-5 font-display text-xl font-semibold text-[#031038]">Capture on site</h2><p className="mt-2 text-sm leading-7 text-[#52657c]">Surveyors record field information using the mobile workflow. Offline behavior and synchronization requirements should be confirmed for the current app release.</p><Link className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#032aac] underline underline-offset-4" href="/mobile-app">Review mobile capture <ArrowRight aria-hidden="true" className="size-4" /></Link></li>
          <li className="rounded-2xl border border-[#d3e4ee] bg-white p-6"><span className="font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#16879a]">Step 02 / Web</span><h2 className="mt-5 font-display text-xl font-semibold text-[#031038]">Review the record</h2><p className="mt-2 text-sm leading-7 text-[#52657c]">Office users review the submitted information and available calculation details before finalization.</p><Link className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#032aac] underline underline-offset-4" href="/order-lifecycle">See the record lifecycle <ArrowRight aria-hidden="true" className="size-4" /></Link></li>
          <li className="rounded-2xl border border-[#d3e4ee] bg-white p-6"><span className="font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#16879a]">Step 03 / Handover</span><h2 className="mt-5 font-display text-xl font-semibold text-[#031038]">Prepare outputs</h2><p className="mt-2 text-sm leading-7 text-[#52657c]">Prepare the report outputs supported by your release and follow your organization’s process for storing and sharing them.</p><Link className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#032aac] underline underline-offset-4" href="/sample-report">Open the sample layout <ArrowRight aria-hidden="true" className="size-4" /></Link></li>
        </ol>
      </Section>

      <Section eyebrow="Next step" title="See how the workflow fits your team" lede="Discuss roles, data, and release-specific capabilities with the product team before planning a rollout.">
        <div className="flex flex-col items-center gap-5"><CtaRow /><Link href="/portal-roadmap" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#032aac] underline underline-offset-4">Read about the client portal roadmap concept <ArrowRight aria-hidden="true" className="size-4" /></Link></div>
      </Section>
    </div>
  );
}
