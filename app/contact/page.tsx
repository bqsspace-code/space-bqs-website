import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "../components/QuoteForm";
import { PageHero, HeroFacts, Chapter } from "../components/Editorial";
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
      <PageHero
        href="/contact"
        crumb="Contact"
        eyebrow="Software sales and support"
        title="Talk to the team."
        description="Ask about bunker quantity survey software, team licensing, product questions, or integrations."
        visual={<HeroFacts title="Reach us" rows={[
          { label: "Email", value: CONTACT_EMAIL },
          { label: "For survey firms", value: "Request a demo" },
        ]} />}
        primaryAction={{ href: "/request-demo", label: "Request a demo" }}
      />

      <Chapter index="01" eyebrow="Message" title="Request a quote." lede="Tell us about your team and what you need.">
        <div className="glass-card rounded-[1.6rem] p-6 sm:p-9">
          <QuoteForm />
        </div>
        <p className="mt-6 text-sm leading-7 text-[#52657c]">
          Prefer email? Write to <a className="font-semibold text-[#032aac] underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Survey firms can also <Link className="font-semibold text-[#032aac] underline underline-offset-4" href="/request-demo">request a demo</Link> to discuss requirements.
        </p>
      </Chapter>
    </div>
  );
}
