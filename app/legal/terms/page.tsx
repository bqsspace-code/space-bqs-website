import { routeMetadata } from "../../lib/seo-metadata";

export const metadata = routeMetadata("/legal/terms", {
  title: "Terms of Use",
  description: "Terms of use for the Space BQS website and demo request process.",
  robots: { index: false, follow: true },
});
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-28 sm:pt-32 pb-16">
      <h1 className="font-display text-3xl font-bold">Terms</h1>
      <p className="mt-4 text-slate-700">Space BQS provides independent quantity measurement only. Reports state measured quantity with method and version. Quality testing is out of scope. Commercial settlement remains between parties.</p>
    </div>
  );
}
