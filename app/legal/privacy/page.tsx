import { routeMetadata } from "../../lib/seo-metadata";
import { Breadcrumbs } from "../../components/ui";

export const metadata = routeMetadata("/legal/privacy", {
  title: "Privacy Information",
  description: "Privacy information for Space BQS website visitors and demo request submissions.",
  robots: { index: false, follow: true },
});
export default function Page() {
  return (
    <div className="min-h-[65vh] bg-[radial-gradient(ellipse_at_10%_0%,rgba(165,211,232,.24),transparent_44%),linear-gradient(180deg,#f0f6fc,#f8fbff)] px-4 pb-20 pt-28 sm:px-6 sm:pt-36">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/legal/privacy", label: "Privacy" }]} />
        <header className="mt-8 border-b border-[#cddfef] pb-8">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#032aac]">Website policy</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#031038] sm:text-5xl">Privacy information</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#52657c]">Information about demo inquiries and optional website analytics.</p>
        </header>
        <div className="mt-8 space-y-4">
          <section className="rounded-2xl border border-[#cddfef] bg-white/90 p-5 shadow-[0_12px_30px_-24px_rgba(3,42,172,.3)] sm:p-7">
            <h2 className="font-display text-lg font-bold text-[#031038]">Demo inquiries</h2>
            <p className="mt-2 text-sm leading-7 text-[#405771]">The demo form asks for your name, work email, company, country, organization type, and team size. Phone number and project details are optional. The site sends a submitted request to its configured GraphQL inquiry service so the Space BQS team can respond. Space BQS provides software and does not provide vessel survey attendance.</p>
          </section>
          <section className="rounded-2xl border border-[#cddfef] bg-white/90 p-5 shadow-[0_12px_30px_-24px_rgba(3,42,172,.3)] sm:p-7">
            <h2 className="font-display text-lg font-bold text-[#031038]">Optional analytics</h2>
            <p className="mt-2 text-sm leading-7 text-[#405771]">If you allow optional analytics and a valid analytics ID is configured, the site records page and interaction events. Form names, email addresses, phone numbers, and free-text inquiry details are not included in analytics events.</p>
          </section>
          <section className="rounded-2xl border border-[#cddfef] bg-white/90 p-5 shadow-[0_12px_30px_-24px_rgba(3,42,172,.3)] sm:p-7">
            <h2 className="font-display text-lg font-bold text-[#031038]">PM Space AI platform privacy policy</h2>
            <p className="mt-2 text-sm leading-7 text-[#405771]">
              PM Space AI publishes a separate privacy policy for its AI-powered project management platform for the architecture, engineering, construction, and operations industry. That policy describes information collected and used by that platform; it is not a substitute for this Space BQS website notice. The PM Space AI policy states it was last updated January 15, 2025.
            </p>
            <a
              className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-[#032aac] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#032aac]"
              href="https://pmspace.ai/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read PM Space AI&apos;s Privacy Policy <span aria-hidden="true">↗</span>
            </a>
          </section>
          <section className="rounded-2xl border border-[#cddfef] bg-white/90 p-5 shadow-[0_12px_30px_-24px_rgba(3,42,172,.3)] sm:p-7">
            <h2 className="font-display text-lg font-bold text-[#031038]">Questions and notice status</h2>
            <p className="mt-2 text-sm leading-7 text-[#405771]">For questions about a submission or a request to correct or delete it, contact <a className="font-semibold text-[#032aac] underline underline-offset-4" href="mailto:ops@aibqs.com">ops@aibqs.com</a>. Retention periods, controller details, and processor arrangements require confirmation from the responsible business owner before this page can be treated as a complete privacy notice.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
