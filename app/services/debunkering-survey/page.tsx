import type { Metadata } from "next";
import { Section, CtaRow, Faq, Breadcrumbs } from "../../components/ui";

export const metadata: Metadata = {
  title: "Debunkering Workflow — Software for Removal Jobs",
  description:
    "Space BQS debunkering workflow for survey firms: before/after measurement of removed fuel with locked certificate both sides accept.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: "/services/debunkering-survey", label: "Debunkering" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Debunkering workflow</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">When fuel must come off, your team records what left — both sides accept the paper.</p>
      </div>
      <Section eyebrow="When" title="Grade change, charter end, repairs">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Your client needs clean tanks or a different grade.</li>
          <li>Charter terms require fuel removal with proof.</li>
          <li>Your team measures before and after removal in the same app.</li>
        </ul>
      </Section>
      <Section eyebrow="Output" title="Removed-quantity certificate">
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Temperature-corrected tonnes with water deducted.</li>
          <li>Locked certificate both commercial sides can use.</li>
        </ul>
        <div className="mt-6"><CtaRow /></div>
      </Section>
      <Section eyebrow="FAQ" title="Debunkering questions">
        <Faq items={[
          { q: "Is removed fuel reusable?", a: "That is commercial and quality advice — out of scope. The software reports quantity only." },
          { q: "How fast can teams be added?", a: "Pilot workspaces go live fast; coverage depends on your surveyors, not us." },
        ]} />
      </Section>
    </div>
  );
}
