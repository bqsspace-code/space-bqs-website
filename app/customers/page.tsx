import type { Metadata } from "next";
import { Section, CtaRow, Breadcrumbs } from "../components/ui";

export const metadata: Metadata = {
  title: "Customers — Who We Serve",
  description:
    "Space BQS serves owners, charterers, operators and survey firms. Early users — names on request. No invented logos.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/customers", label: "Customers" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Customers — survey firms</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">Built for firms running BQS jobs. Early adopters — names on request.</p>
      </div>
      <Section eyebrow="Fit" title="You fit if reports cost you time or disputes">
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
