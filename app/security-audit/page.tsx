import type { Metadata } from "next";
import { Section, AnswerBlock, CtaRow, Breadcrumbs } from "../components/ui";

export const metadata: Metadata = {
  title: "Security & Audit — Tamper-Proof by Design",
  description:
    "How Space BQS stays trustworthy: per-org tenancy, roles, locked finalised surveys, per-line audit trail, 72-hour offline lease, safe exports.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/security-audit", label: "Security & Audit" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Security &amp; audit — tamper-proof by design</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">Trust comes from what the system refuses to do.</p>
      </div>
      <Section eyebrow="Controls" title="What protects your numbers">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Tenancy per organisation. You only ever see your surveys, vessels and tables.</li>
          <li>Roles: surveyor creates and submits, only supervisor or admin can complete.</li>
          <li>Finalised surveys are immutable — no edits, no deletes. Corrections need an admin override with history.</li>
          <li>Every tank line carries table ID, revision, method, interpolated flags and warnings.</li>
          <li>Mobile offline lease 72 hours: expiry blocks writes but never deletes cached work.</li>
          <li>Exports escape dynamic values; temp report files are deleted after sharing.</li>
        </ul>
        <div className="mt-6"><AnswerBlock><p>We claim operational controls we ship — not certificates we don&apos;t hold. Correction tables follow ASTM D1250 Table 54B; quality management and lab accreditation are out of scope for this quantity-only system.</p></AnswerBlock></div>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
