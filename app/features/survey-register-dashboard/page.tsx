import type { Metadata } from "next";
import { Section, CtaRow, Breadcrumbs } from "../../components/ui";

export const metadata: Metadata = {
  title: "Survey Register & Dashboard — Find Anything in Seconds",
  description:
    "Space BQS register: search by survey number, vessel, port, inspector or BDN. Filters, Total MT, dashboard trends, needs-attention. Plain guide.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/features", label: "Features" }, { href: "/features/survey-register-dashboard", label: "Register & Dashboard" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Survey register &amp; dashboard</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">Your office view: every ship, every delivery, one searchable list.</p>
      </div>
      <Section eyebrow="Register" title="Find anything in seconds">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Search survey number, vessel, port, inspector or BDN — sorted newest-created first.</li>
          <li>Filter by status (Draft, Calculated, Under Review, Finalised) and fuel grade.</li>
          <li>Footer shows Total MT across the filtered list. Grid or list view.</li>
          <li>Soft-delete protection: finalised surveys cannot be deleted; hidden ones can be restored.</li>
        </ul>
      </Section>
      <Section eyebrow="Dashboard" title="Trends without spreadsheet work">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>KPIs: total surveys, this-month MT, drafts, average correction factor, vessel count.</li>
          <li>Quantity trend by day, week or month; status donut; quantity by grade; top vessels bar.</li>
          <li>Recent 6 + needs-attention: drafts and uncalculated work surface automatically.</li>
        </ul>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
