import { routeMetadata } from "../../lib/seo-metadata";
import { PageHero, Chapter, Ledger, Notice } from "../../components/Editorial";

export const metadata = routeMetadata("/legal/privacy", {
  title: "Privacy Information",
  description: "Privacy information for Space BQS website visitors and demo request submissions.",
  robots: { index: false, follow: true },
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/legal/privacy"
        crumb="Privacy"
        eyebrow="Website policy"
        title="Privacy information."
        description="Information about demo inquiries and optional website analytics."
      />
      <Chapter index="01" eyebrow="What we collect" title="What happens to what you send.">
        <Ledger items={[
          { title: "Demo inquiries", body: "The demo form asks for your name, work email, company, country, organisation type and team size. Phone number and project details are optional. The site sends a submitted request to its configured GraphQL inquiry service so the Space BQS team can respond. Space BQS provides software and does not provide vessel survey attendance." },
          { title: "Optional analytics", body: "If you allow optional analytics and a valid analytics ID is configured, the site records page and interaction events. Form names, email addresses, phone numbers and free-text inquiry details are not included in analytics events." },
          { title: "PM Space AI platform privacy policy", body: <>PM Space AI publishes a separate privacy policy for its AI-powered project management platform. That policy describes information collected and used by that platform; it is not a substitute for this Space BQS website notice. It states it was last updated January 15, 2025. <a className="font-semibold text-[#032aac] underline underline-offset-4" href="https://pmspace.ai/privacy-policy/" target="_blank" rel="noopener noreferrer">Read PM Space AI&apos;s Privacy Policy ↗</a></> },
        ]} />
      </Chapter>
      <Chapter index="02" eyebrow="Your requests" title="Questions and notice status." tone="white">
        <div className="space-y-5">
          <p className="max-w-2xl text-[17px] leading-8 text-[#31485f]">For questions about a submission, or a request to correct or delete it, contact <a className="font-semibold text-[#032aac] underline underline-offset-4" href="mailto:ops@aibqs.com">ops@aibqs.com</a>.</p>
          <Notice label="Notice status">Retention periods, controller details and processor arrangements require confirmation from the responsible business owner before this page can be treated as a complete privacy notice.</Notice>
        </div>
      </Chapter>
    </div>
  );
}
