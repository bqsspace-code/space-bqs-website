import { routeMetadata } from "../../lib/seo-metadata";
import CookiePreferencesButton from "../../components/CookiePreferencesButton";
import { PageHero, Chapter, Ledger } from "../../components/Editorial";

export const metadata = routeMetadata("/legal/cookies", {
  title: "Cookie and Browser Storage Information",
  description: "Learn how the Space BQS website uses browser storage and whether analytics technologies are enabled.",
  robots: { index: false, follow: true },
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/legal/cookies"
        crumb="Cookies"
        eyebrow="Website policy"
        title="Cookies and browser storage."
        description="What the site stores in your browser, and what you control."
      />
      <Chapter index="01" eyebrow="Storage" title="What is stored, and why.">
        <div className="space-y-8">
          <Ledger items={[
            { title: "Your analytics choice", body: "The site stores your analytics choice in browser storage. The demo form works without analytics consent." },
            { title: "Optional Google Analytics", body: <>Optional Google Analytics loads only when a valid <code className="rounded bg-[#eaf4f9] px-1.5 py-0.5 font-mono text-sm">NEXT_PUBLIC_GA_MEASUREMENT_ID</code> is configured and you choose to allow analytics. If no ID is configured, the analytics script does not load.</> },
            { title: "Questions", body: <>For questions about browser storage, contact <a className="font-semibold text-[#032aac] underline underline-offset-4" href="mailto:ops@aibqs.com">ops@aibqs.com</a>.</> },
          ]} />
          <div className="glass-card rounded-[1.4rem] p-6"><p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-[#176a8e]">Your choice</p><CookiePreferencesButton /></div>
        </div>
      </Chapter>
    </div>
  );
}
