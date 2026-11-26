import { routeMetadata } from "../../lib/seo-metadata";

export const metadata = routeMetadata("/legal/privacy", {
  title: "Privacy Information",
  description: "Privacy information for Space BQS website visitors and demo request submissions.",
  robots: { index: false, follow: true },
});
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-28 sm:pt-32 pb-16">
      <h1 className="font-display text-3xl font-bold">Privacy</h1>
      <div className="mt-4 space-y-4 text-slate-700">
        <p>The demo form asks for your name, work email, company, country, organization type, and team size. Phone number and project details are optional. The site sends a submitted request to its configured GraphQL inquiry service so the Space BQS team can respond. Space BQS provides software and does not provide vessel survey attendance.</p>
        <p>If you allow optional analytics and a valid analytics ID is configured, the site records page and interaction events. Form names, email addresses, phone numbers, and free-text inquiry details are not included in analytics events.</p>
        <p>For questions about a submission or a request to correct or delete it, contact <a className="underline" href="mailto:ops@aibqs.com">ops@aibqs.com</a>. Retention periods, controller details, and processor arrangements require confirmation from the responsible business owner before this page can be treated as a complete privacy notice.</p>
      </div>
    </div>
  );
}
