import type { Metadata } from "next";
import { Section, CtaRow, Breadcrumbs, AnswerBlock } from "../../components/ui";
import { Search, Database, BarChart3, Filter, ShieldCheck, CheckCircle2, Clock, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Survey Register & Bunker Dashboard",
  description:
    "Space BQS register: search by survey number, vessel, port, inspector or BDN. Filters, Total MT, dashboard trends, needs-attention. Plain guide.",
};

export default function Page() {
  return (
    <div className="space-y-12 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/features", label: "Features" },
            { href: "/features/survey-register-dashboard", label: "Register & Dashboard" },
          ]}
        />
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            Operations Center
          </span>
          <span className="text-xs text-slate-500 font-mono">Real-Time Register</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl lg:text-5xl">
          Central survey register &amp; fleet operations dashboard
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Find any past survey in seconds. Track deck jobs in progress, review draft calculations, and uncover recurring bunker supplier discrepancies across ports.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnswerBlock>
          <p>
            The Space BQS Survey Register replaces scattered email attachments and local folders with a unified, searchable registry for all bunker operations. Operations managers and superintendents can monitor live deck attendances, inspect submitted calculations, and identify multi-port fuel trends across bunker barges and suppliers.
          </p>
        </AnswerBlock>
      </div>

      {/* Core Functions */}
      <Section eyebrow="Core Features" title="Built for high-volume marine survey firms">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 mb-4">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Instant Multi-Criteria Search
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Locate any historical bunker record immediately by IMO number, vessel name, delivery port, attending surveyor, or BDN receipt number. No lost paper soundings or missing PDF files.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 mb-4">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Live Job Lifecycle Tracking
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Filter surveys by operational state: Draft (deck capture in progress), Submitted (surveyor finished, awaiting supervisor review), or Finalised (locked certificate issued to client).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 mb-4">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ocean-950">
              Supplier Discrepancy Analytics
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Visualize cumulative metric tonnage delivered versus BDN figures. Filter by bunkering barge, fuel supplier, or port terminal to pinpoint repeat shortages before nominations occur.
            </p>
          </div>
        </div>
      </Section>

      {/* Governance & Role-Based Access */}
      <Section eyebrow="Governance" title="Multi-role permissions for field surveyors and supervisors">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h3 className="font-display text-xl font-bold text-ocean-950">
            Defensible checks before any certificate is locked
          </h3>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed max-w-3xl">
            In marine surveying, issuing an incorrect certificate exposes your firm to claim liability. Space BQS enforces a strict separation of duties between deck surveyors recording physical measurements and senior supervisors reviewing calculation outputs:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-4 border border-slate-200">
              <span className="font-mono text-xs font-bold text-ocean-700 uppercase">Role 1: Deck Surveyor</span>
              <h4 className="font-display mt-1 font-bold text-slate-900 text-sm">Mobile Deck Capture</h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Records ullage/sounding, temperature, and water on mobile. Can view real-time calculations but cannot finalize client-facing certificates alone.
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-slate-200">
              <span className="font-mono text-xs font-bold text-ocean-700 uppercase">Role 2: Operations Supervisor</span>
              <h4 className="font-display mt-1 font-bold text-slate-900 text-sm">Review &amp; Finalisation</h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Reviews calculation audit trail, verifies BDN numbers, resolves any flagged warnings, and applies the digital seal to lock the certificate.
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-slate-200">
              <span className="font-mono text-xs font-bold text-ocean-700 uppercase">Role 3: Client Viewer</span>
              <h4 className="font-display mt-1 font-bold text-slate-900 text-sm">Read-Only Token Access</h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Shipowners, charterers, and bunker buyers receive a direct token link to download locked PDF certificates and Excel sheets with zero login hurdles.
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
