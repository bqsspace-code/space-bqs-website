import type { Metadata } from "next";
import Link from "next/link";
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
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          Email <a className="font-semibold text-ocean-700 underline decoration-ocean-300 underline-offset-4 hover:text-ocean-900" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <span aria-hidden="true"> · </span>
          For survey firms, <Link className="font-semibold text-ocean-700 underline decoration-ocean-300 underline-offset-4 hover:text-ocean-900" href="/request-demo">request a demo</Link> to discuss your requirements.
        </p>
      </div>
      <Section eyebrow="Message" title="Request a quote">
        <QuoteForm />
      </Section>
    </div>
  );
}
