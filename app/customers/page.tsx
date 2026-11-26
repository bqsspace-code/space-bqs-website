import type { Metadata } from "next";
import { Section, CtaRow, Breadcrumbs } from "../components/ui";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/customers", {
  title: "Who Space BQS Is Designed For",
  description:
    "See who Space BQS is designed for: independent bunker survey firms, marine inspection agencies, surveyors, and supervisors.",
});

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/customers", label: "Customers" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">For bunker survey firms and marine inspection teams</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">Space BQS is designed for organizations that perform bunker quantity surveys and want software for field capture, office review, and report workflows.</p>
      </div>
      <Section eyebrow="Fit" title="Teams that may evaluate Space BQS">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Survey firms wanting one standard report from every surveyor and port.</li>
          <li>Teams losing hours to spreadsheets, retyping and version confusion.</li>
          <li>Firms whose clients demand audit trails: table versions, flags, locks.</li>
          <li>Operations covering delivery, ROB and debunkering with one method.</li>
        </ul>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
