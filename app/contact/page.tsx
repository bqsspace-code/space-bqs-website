import type { Metadata } from "next";
import QuoteForm from "../components/QuoteForm";
import { Section, Breadcrumbs } from "../components/ui";
import { CONTACT_EMAIL } from "../lib/site";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/contact", {
  title: "Contact",
  description:
    "Contact Space BQS about bunker quantity survey software, team licensing, product questions, and demo requests.",
});

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/contact", label: "Contact" }]} />
        <h1 className="font-display mt-3 text-3xl font-bold">Contact — software sales & support</h1>
        <p className="mt-3 text-slate-600">Email {CONTACT_EMAIL} · For survey firms: request a demo below and we reply with a walkthrough and pilot plan.</p>
      </div>
      <Section eyebrow="Message" title="Request a quote">
        <QuoteForm />
      </Section>
    </div>
  );
}
