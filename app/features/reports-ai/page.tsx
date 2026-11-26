import type { Metadata } from "next";
import Link from "next/link";
import { Section, AnswerBlock, CtaRow } from "../../components/ui";
import EditorialHero, { HeroImage } from "../../components/EditorialHero";
import { FileText, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import { routeMetadata } from "../../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/features/reports-ai", {
  title: "Bunker Survey PDF and Excel Reports",
  description:
    "See how Space BQS organizes bunker survey information in PDF and Excel report workflows for review and handover.",
});

export default function Page() {
  return (
    <div className="space-y-12 pb-20">
      <EditorialHero
        trail={[{ href: "/", label: "Home" }, { href: "/features", label: "Features" }, { href: "/features/reports-ai", label: "Reports" }]}
        eyebrow="Feature / report handover"
        title="A report is the next reader's starting point."
        description="Explore PDF and Excel report workflows for bunker quantity survey records. Examples are illustrative and use fictional data—not customer survey results."
        primaryAction={{ href: "/sample-report", label: "View illustrative report" }}
        secondaryAction={{ href: "/request-demo", label: "Discuss report workflows" }}
        visual={<HeroImage src="/assets/videos/space-bqs-survey-04.webp" alt="Illustrative quantity certificate and audit workbook mockups" caption="Illustrative visuals with fictional information—not a customer survey record." position="center" />}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <AnswerBlock>
          <p>
            Space BQS provides PDF and Excel report workflows for bunker survey records. The report contents depend on the survey information and current product release. A software report does not itself certify a survey, establish fuel quality, or determine legal admissibility.
          </p>
        </AnswerBlock>
      </div>

      {/* Deliverables Breakdown */}
      <Section eyebrow="Report workflows" title="PDF and Excel report layouts">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#d3e4ee] bg-white p-6 shadow-[0_12px_36px_-28px_rgba(3,42,172,.35)] sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-ocean-950">
                PDF report layout
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600 leading-7">
              The linked sample page shows an illustrative report layout with fictional data. It is not an issued certificate or a real customer survey.
            </p>
            <ul className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-ocean-600" />
                <span>Example survey particulars and report fields</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-ocean-600" />
                <span>Survey scope and reporting requirements vary by contract and procedure</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-ocean-600" />
                <span>Use the sample page to inspect the current illustrative layout</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#d3e4ee] bg-white p-6 shadow-[0_12px_36px_-28px_rgba(3,42,172,.35)] sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-ocean-950">
                Excel report layout
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600 leading-7">
              The workbook preview illustrates how measurement and calculation information can be organized for review. The displayed rows are fictional examples, not a customer record.
            </p>
            <ul className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-700">
              <li className="flex items-center gap-2">
                <span className="font-mono text-ocean-700 font-bold">Example:</span>
                <span>Survey particulars and BDN reference</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-mono text-ocean-700 font-bold">Example:</span>
                <span>Tank readings and measured inputs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-mono text-ocean-700 font-bold">Example:</span>
                <span>Calculation fields and report outputs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-mono text-ocean-700 font-bold">Scope:</span>
                <span>Check the current sample report for available detail</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Product scope */}
      <Section eyebrow="Scope" title="Quantity survey reporting, not fuel-quality testing">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-ocean-700" />
            <h3 className="font-display text-xl font-bold text-ocean-950">
              What these report workflows describe
            </h3>
          </div>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Space BQS is bunker quantity survey software. Its product materials describe mobile capture, web review, and PDF/Excel report workflows. Fuel-quality testing, laboratory analysis, and legal determinations are outside this software description.
          </p>
          <div className="mt-6"><Link className="font-semibold text-ocean-700 underline" href="/sample-report">See the illustrative report layout</Link></div>
        </div>
        <div className="mt-8">
          <CtaRow />
        </div>
      </Section>
    </div>
  );
}
