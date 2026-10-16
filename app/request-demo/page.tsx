import type { Metadata } from "next";
import QuoteForm from "../components/QuoteForm";
import { Section, Breadcrumbs } from "../components/ui";

export const metadata: Metadata = {
  title: "Request a Demo — Software for Your Survey Team",
  description:
    "Request a Space BQS demo for your survey firm: tell us team size and volume. We reply with a walkthrough and pilot plan.",
};

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/request-demo", label: "Request a Demo" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Request a demo</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">For survey firms evaluating software. Tell us about your team — we reply with a walkthrough and pilot plan.</p>
      </div>
      <Section eyebrow="Request" title="Demo form">
        <QuoteForm />
      </Section>
    </div>
  );
}
