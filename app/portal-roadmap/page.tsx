import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, Section, AnswerBlock, CtaRow } from "../components/ui";
import { Shield, Clock, CheckCircle2, ArrowRight, FileCheck, Users, Lock } from "lucide-react";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/portal-roadmap", {
  title: "Client Portal Roadmap & Bunker Proof",
  description:
    "Space BQS client portal roadmap concept: read-only access for vessel owners and charterers to review finalised survey figures and download Excel breakdowns. Quantity-only.",
});

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/platform", label: "Platform" },
            { href: "/portal-roadmap", label: "Portal Roadmap" },
          ]}
        />
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            Roadmap concept
          </span>
          <span className="text-xs text-slate-500 font-mono">Not a live customer portal</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl">
          Client Self-Serve Portal Roadmap
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          A proposed direction for how vessel owners, charterers, and operators might access survey reports in the future. Contact the product team to confirm current availability.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 mt-6">
        <AnswerBlock>
          <p>
            Space BQS currently describes its client portal as a roadmap concept. The table below separates available product areas from proposed portal capabilities; it does not promise a delivery date or security certification.
          </p>
        </AnswerBlock>
      </div>

      <Section eyebrow="Architecture" title="What is live today vs. what is on the roadmap">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
              <tr>
                <th className="px-5 py-3">Capability</th>
                <th className="px-4 py-3">Current Status</th>
                <th className="px-4 py-3">Portal concept (not live)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="px-5 py-3.5 font-medium text-slate-900">Certificate Delivery</td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1 rounded bg-sea-100 px-2 py-0.5 text-xs font-semibold text-sea-700">
                    <CheckCircle2 className="h-3 w-3" /> Live
                  </span>
                  <span className="block text-xs text-slate-500 mt-0.5">Supervisor exports finalised PDF + Excel</span>
                </td>
                <td className="px-4 py-3.5 text-xs text-slate-600">
                  Client self-service download via tokenized link
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 font-medium text-slate-900">Authenticity Verification</td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1 rounded bg-sea-100 px-2 py-0.5 text-xs font-semibold text-sea-700">
                    <CheckCircle2 className="h-3 w-3" /> Live
                  </span>
                  <span className="block text-xs text-slate-500 mt-0.5">Public verification details not confirmed</span>
                </td>
                <td className="px-4 py-3.5 text-xs text-slate-600">
                  Possible online report verification, subject to product design and security review
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 font-medium text-slate-900">Charterer / Owner Multi-tenancy</td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                    Firm Only
                  </span>
                  <span className="block text-xs text-slate-500 mt-0.5">Surveyor, Supervisor, Org Admin roles</span>
                </td>
                <td className="px-4 py-3.5 text-xs text-slate-600">
                  Read-only Client Portal invited per vessel IMO or time-charter period
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 font-medium text-slate-900">API & Webhook Ingestion</td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1 rounded bg-sea-100 px-2 py-0.5 text-xs font-semibold text-sea-700">
                    <CheckCircle2 className="h-3 w-3" /> Live
                  </span>
                  <span className="block text-xs text-slate-500 mt-0.5">REST webhooks with `x-api-key`</span>
                </td>
                <td className="px-4 py-3.5 text-xs text-slate-600">
                  Direct webhook push to client TMS/ERP upon finalisation lock
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="Proposed principles" title="Potential client-access boundaries">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="rounded-lg bg-ocean-50 p-2 text-ocean-700 w-fit">
              <Lock className="h-5 w-5" />
            </div>
            <h4 className="font-display font-bold text-ocean-950 mt-3">Read-only concept</h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              A future portal could let authorized recipients view a report without changing the underlying survey record. Access controls and record behavior have not been finalized here.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="rounded-lg bg-sea-50 p-2 text-sea-700 w-fit">
              <FileCheck className="h-5 w-5" />
            </div>
            <h4 className="font-display font-bold text-ocean-950 mt-3">Quantity survey context</h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Space BQS is positioned as bunker quantity survey software. Any future portal would present the report information available in the product; details require product confirmation.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="rounded-lg bg-ocean-50 p-2 text-ocean-700 w-fit">
              <Users className="h-5 w-5" />
            </div>
            <h4 className="font-display font-bold text-ocean-950 mt-3">Access model to be determined</h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Authentication, link expiry, recipient roles, and supported delivery channels are part of the future design and need security review.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <CtaRow />
        </div>
      </Section>
    </div>
  );
}
