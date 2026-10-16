import { Section, Breadcrumbs, CtaRow } from "../components/ui";

export const metadata = { title: "About — Quantity-Only, Independent" };

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/about", label: "About" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold">About Space BQS — software, not a survey firm</h1>
      </div>
      <Section eyebrow="Who" title="We build the system your surveyors run on">
        <p className="max-w-3xl text-slate-700">
          Space BQS does one thing: software for bunker quantity surveys. Delivery, ROB remaining on
          board, and debunkering workflows. Your teams measure on board; the system corrects for
          temperature, deducts water, and locks the result in a certificate your clients can share.
          No lab testing, no quality opinions — and we never claim to attend vessels ourselves.
        </p>
        <div className="mt-6"><CtaRow /></div>
      </Section>
    </div>
  );
}
