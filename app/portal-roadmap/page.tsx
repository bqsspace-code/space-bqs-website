import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, Section, AnswerBlock, CtaRow } from "../components/ui";
import { CheckCircle2, FileCheck, Users, Lock } from "lucide-react";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/portal-roadmap", {
  title: "Client Portal Roadmap & Bunker Proof",
  description:
    "A roadmap concept for client access to bunker survey reports. See what is available today and what remains a proposal.",
});

const COMPARISONS = [
  {
    capability: "Certificate Delivery",
    currentStatus: "Live",
    currentDetail: "Supervisor exports finalised PDF + Excel",
    concept: "Client self-service download via tokenized link",
  },
  {
    capability: "Authenticity Verification",
    currentStatus: "Not confirmed",
    currentDetail: "Public verification details not confirmed",
    concept: "Possible online report verification, subject to product design and security review",
  },
  {
    capability: "Charterer / Owner Multi-tenancy",
    currentStatus: "Firm only",
    currentDetail: "Surveyor, Supervisor, Org Admin roles",
    concept: "Read-only Client Portal invited per vessel IMO or time-charter period",
  },
  {
    capability: "API & Webhook Ingestion",
    currentStatus: "Live",
    currentDetail: "REST webhooks with x-api-key",
    concept: "Direct webhook push to client TMS/ERP upon finalisation lock",
  },
];

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
        <div className="space-y-3 md:hidden">
          {COMPARISONS.map((item) => (
            <article key={item.capability} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-display text-lg font-bold text-ocean-950">{item.capability}</h3>
              <div className="mt-4 grid gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current status · {item.currentStatus}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{item.currentDetail}</p>
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ocean-700">Portal concept · not live</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{item.concept}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
              <tr>
                <th scope="col" className="px-5 py-3">Capability</th>
                <th scope="col" className="px-4 py-3">Current status</th>
                <th scope="col" className="px-4 py-3">Portal concept · not live</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {COMPARISONS.map((item) => (
                <tr key={item.capability}>
                  <th scope="row" className="px-5 py-4 font-semibold text-slate-900">{item.capability}</th>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${item.currentStatus === "Live" ? "bg-sea-100 text-sea-700" : "bg-slate-100 text-slate-700"}`}>
                      {item.currentStatus === "Live" && <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />}
                      {item.currentStatus}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">{item.currentDetail}</span>
                  </td>
                  <td className="px-4 py-4 text-sm leading-6 text-slate-600">{item.concept}</td>
                </tr>
              ))}
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
            <h3 className="font-display font-bold text-ocean-950 mt-3">Read-only concept</h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              A future portal could let authorized recipients view a report without changing the underlying survey record. Access controls and record behavior have not been finalized here.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="rounded-lg bg-sea-50 p-2 text-sea-700 w-fit">
              <FileCheck className="h-5 w-5" />
            </div>
            <h3 className="font-display font-bold text-ocean-950 mt-3">Quantity survey context</h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Space BQS is positioned as bunker quantity survey software. Any future portal would present the report information available in the product; details require product confirmation.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="rounded-lg bg-ocean-50 p-2 text-ocean-700 w-fit">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-display font-bold text-ocean-950 mt-3">Access model to be determined</h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Authentication, link expiry, recipient roles, and supported delivery channels are part of the future design and need security review.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#032AAC] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1B4FD1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean-700">
            Ask about portal availability <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>
    </div>
  );
}
