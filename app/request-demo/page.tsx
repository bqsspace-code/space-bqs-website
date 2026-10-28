import type { Metadata } from "next";
import QuoteForm from "../components/QuoteForm";
import { Section, Breadcrumbs } from "../components/ui";

export const metadata: Metadata = {
  title: "Request a Demo or Implementation Consultation",
  description:
    "Request a Space BQS demo, discuss a Cargo WMS implementation, or scope data migration and deployment services.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/request-demo", label: "Request a Demo" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Request a demo or discuss your rollout.</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">Choose Space BQS, Cargo WMS, or both. Tell us about your team, source data, and deployment preference so the conversation starts with your operation.</p>
      </div>
      <Section eyebrow="Request" title="Demo form">
        <QuoteForm />
      </Section>
    </div>
  );
}
