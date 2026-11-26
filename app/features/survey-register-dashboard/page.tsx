import type { Metadata } from "next";
import { Section, CtaRow, AnswerBlock } from "../../components/ui";
import EditorialHero, { HeroImage } from "../../components/EditorialHero";
import { Search, BarChart3, Clock } from "lucide-react";
import { routeMetadata } from "../../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/features/survey-register-dashboard", {
  title: "Survey Register & Bunker Dashboard",
  description:
    "Space BQS register: search by survey number, vessel, port, inspector or BDN. Filters, Total MT, dashboard trends, needs-attention. Plain guide.",
});

export default function Page() {
  return (
    <div className="space-y-12 pb-20">
      <EditorialHero
        trail={[{ href: "/", label: "Home" }, { href: "/features", label: "Features" }, { href: "/features/survey-register-dashboard", label: "Survey register" }]}
        eyebrow="Feature / office review"
        title="A clearer view of survey work in progress."
        description="Explore the Space BQS register and dashboard concepts for reviewing survey records, workflow status, and office-held reference information."
        primaryAction={{ href: "/request-demo", label: "See the current register" }}
        secondaryAction={{ href: "/features", label: "All platform features" }}
        visual={<HeroImage src="/assets/videos/space-bqs-survey-03.webp" alt="Illustrative Space BQS mobile calculation interface and survey record mockup" caption="Illustrative interface concept · confirm current register features with the product team." position="center" />}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <AnswerBlock>
          <p>
            Product materials describe a survey register and dashboard for office review. Search fields, status behavior, analytics, permissions, and access options should be confirmed against the current release and configured account.
          </p>
        </AnswerBlock>
      </div>

      {/* Core Functions */}
      <Section eyebrow="Register & review" title="Bring the survey record into focus" lede="A useful register helps a team find relevant records, understand their current review stage, and know what still needs confirmation.">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#d3e4ee] bg-white p-6 shadow-[0_12px_36px_-28px_rgba(3,42,172,.35)] sm:p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 mb-4">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Find a survey record
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Explore the register's available search and filtering fields with your product team. Confirm which vessel, port, survey, or delivery identifiers are indexed in your release.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d3e4ee] bg-white p-6 shadow-[0_12px_36px_-28px_rgba(3,42,172,.35)] sm:p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 mb-4">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Review workflow status
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Product materials describe survey record status. Confirm the status labels, transitions, and whether updates appear live in the current release.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d3e4ee] bg-white p-6 shadow-[0_12px_36px_-28px_rgba(3,42,172,.35)] sm:p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 mb-4">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Review the available summary
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Dashboard summaries vary by release and account configuration. Use a demonstration to verify which aggregate views are available and how their figures are derived.
            </p>
          </div>
        </div>
      </Section>

      {/* Governance & Role-Based Access */}
      <Section eyebrow="Governance" title="Multi-role permissions for field surveyors and supervisors">
        <div className="rounded-2xl border border-[#d3e4ee] bg-[#eaf4f9] p-6 md:p-8">
          <h3 className="font-display text-xl font-bold text-ocean-950">
            Review checks before a certificate is finalised
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Review permissions and sign-off responsibilities with your administrator. Product materials and account configuration determine which roles and controls are available:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-4 border border-slate-200">
              <span className="font-mono text-xs font-bold text-ocean-700 uppercase">Role 1: Deck Surveyor</span>
              <h4 className="font-display mt-1 font-bold text-slate-900 text-sm">Mobile Deck Capture</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Field users may capture survey information. Confirm available fields, connectivity behavior, and finalisation permissions for the evaluated release.
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-slate-200">
              <span className="font-mono text-xs font-bold text-ocean-700 uppercase">Role 2: Operations Supervisor</span>
              <h4 className="font-display mt-1 font-bold text-slate-900 text-sm">Review &amp; Finalisation</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Office review can be demonstrated against your team's process. Confirm which review controls, warnings, and report actions are available.
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-slate-200">
              <span className="font-mono text-xs font-bold text-ocean-700 uppercase">Role 3: Client Viewer</span>
              <h4 className="font-display mt-1 font-bold text-slate-900 text-sm">Read-only client access</h4>
              <p className="mt-2 text-sm text-slate-600 leading-7">
                Client access options may depend on the release and configuration. Confirm current availability and access controls before relying on them.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <CtaRow />
        </div>
      </Section>
    </div>
  );
}
