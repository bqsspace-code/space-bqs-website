import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, Section, AnswerBlock, CtaRow } from "../components/ui";
import { Shield, Clock, CheckCircle2, ArrowRight, FileCheck, Users, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Portal Roadmap — Self-Service Bunker Proof",
  description:
    "Space BQS client portal roadmap: read-only access for vessel owners and charterers to verify locked certificates, download Excel breakdowns, and audit figures. Quantity-only.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/platform", label: "Platform" },
            { href: "/portal-roadmap", label: "Portal Roadmap" },
          ]}
        />
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            Product Roadmap (Honest Disclosure)
          </span>
          <span className="text-xs text-slate-500 font-mono">Target: Q1 2027</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl">
          Client Self-Serve Portal Roadmap
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          How vessel owners, charterers, and operators will view, verify, and retrieve locked bunker quantity certificates without emailing survey supervisors.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 mt-6">
        <AnswerBlock>
          <p>
            Unlike heavy LIMS systems that require 12 user roles, client portals in Space BQS will be lightweight and strictly read-only. Survey firms maintain full chain-of-custody control. Clients receive secure verification links to inspect certified quantities, download 4-sheet Excel workbooks, and check cryptographic hashes without an account.
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
                <th className="px-4 py-3">Portal Roadmap (v1.2)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="px-5 py-3.5 font-medium text-slate-900">Certificate Delivery</td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1 rounded bg-sea-100 px-2 py-0.5 text-xs font-semibold text-sea-700">
                    <CheckCircle2 className="h-3 w-3" /> Live
                  </span>
                  <span className="block text-xs text-slate-500 mt-0.5">Supervisor exports locked PDF + Excel</span>
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
                  <span className="block text-xs text-slate-500 mt-0.5">SHA-256 fingerprint on every export</span>
                </td>
                <td className="px-4 py-3.5 text-xs text-slate-600">
                  Public web verify page (`/verify/[hash]`) with instant pass/fail
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

      <Section eyebrow="Principles" title="Why we will never build bloated LIMS portals">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="rounded-lg bg-ocean-50 p-2 text-ocean-700 w-fit">
              <Lock className="h-5 w-5" />
            </div>
            <h4 className="font-display font-bold text-ocean-950 mt-3">Zero Write Access</h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Clients cannot edit readings, alter sounding tables, or dispute calculations inside the portal. BQS records are immutable legal records created by independent surveyors.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="rounded-lg bg-sea-50 p-2 text-sea-700 w-fit">
              <FileCheck className="h-5 w-5" />
            </div>
            <h4 className="font-display font-bold text-ocean-950 mt-3">Quantity-Only Scope</h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              We do not pretend to offer lab sample tracking, sludge testing, or commercial fuel invoicing. The portal displays verified metric tonnes, water deduction, and Table 54B factors.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="rounded-lg bg-ocean-50 p-2 text-ocean-700 w-fit">
              <Users className="h-5 w-5" />
            </div>
            <h4 className="font-display font-bold text-ocean-950 mt-3">No Account Friction</h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Vessel superintendents and charterers receive a secure access link on WhatsApp or email. No corporate password resets or complex 12-level role configurations.
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
