import type { Metadata } from "next";
import { Section, CtaRow, Breadcrumbs } from "../components/ui";

export const metadata: Metadata = {
  title: "Partners — Resell or Implement Space BQS",
  description:
    "For resellers and implementation partners serving marine survey firms: one standard method, same locked certificate everywhere.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/partners", label: "Partners" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Partners — implement with us</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">For resellers and implementation partners serving marine survey firms. One standard method, same locked certificate everywhere.</p>
      </div>
      <Section eyebrow="Two ways" title="Buy for your firm or resell to firms">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border p-5">
            <p className="font-bold">Survey firm?</p>
            <p className="mt-2 text-sm text-slate-600">Request a demo and pilot with your own surveyors. Coverage depends on your teams — the software works wherever they do.</p>
          </div>
          <div className="rounded-xl border p-5">
            <p className="font-bold">Partner?</p>
            <p className="mt-2 text-sm text-slate-600">Bundle Space BQS with your marine services. Your clients keep their operation; reports look the same in every port.</p>
          </div>
        </div>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
