import { routeMetadata } from "../../lib/seo-metadata";
import CookiePreferencesButton from "../../components/CookiePreferencesButton";

export const metadata = routeMetadata("/legal/cookies", {
  title: "Cookie and Browser Storage Information",
  description: "Learn how the Space BQS website uses browser storage and whether analytics technologies are enabled.",
  robots: { index: false, follow: true },
});
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-28 sm:pt-32 pb-16">
      <h1 className="text-3xl font-bold text-[var(--text-hi)]">Cookies</h1>
      <div className="mt-4 space-y-3 text-[var(--text-mid)]">
          <p>The site stores your analytics choice in browser storage. The demo form works without analytics consent.</p>
          <p>Optional Google Analytics loads only when a valid <code>NEXT_PUBLIC_GA_MEASUREMENT_ID</code> is configured and you choose to allow analytics. If no ID is configured, the analytics script does not load.</p>
          <p>For questions about browser storage, contact <a className="underline" href="mailto:ops@aibqs.com">ops@aibqs.com</a>.</p>
        </div>
        <CookiePreferencesButton />
    </div>
  );
}
