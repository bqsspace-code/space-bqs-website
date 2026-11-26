import { routeMetadata } from "../../lib/seo-metadata";
import { Breadcrumbs } from "../../components/ui";

export const metadata = routeMetadata("/legal/terms", {
  title: "Terms of Use",
  description: "Terms of use for the Space BQS website and demo request process.",
  robots: { index: false, follow: true },
});
export default function Page() {
  return (
    <div className="min-h-[65vh] bg-[radial-gradient(ellipse_at_10%_0%,rgba(165,211,232,.24),transparent_44%),linear-gradient(180deg,#f0f6fc,#f8fbff)] px-4 pb-20 pt-28 sm:px-6 sm:pt-36">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/legal/terms", label: "Terms" }]} />
        <header className="mt-8 border-b border-[#cddfef] pb-8">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#032aac]">Website policy</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#031038] sm:text-5xl">Terms of use</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#52657c]">Product and survey-service boundaries described on this site.</p>
        </header>
        <section className="mt-8 rounded-2xl border border-[#cddfef] bg-white/90 p-5 shadow-[0_12px_30px_-24px_rgba(3,42,172,.3)] sm:p-7">
          <h2 className="font-display text-lg font-bold text-[#031038]">Product scope</h2>
          <p className="mt-2 text-sm leading-7 text-[#405771]">Space BQS provides independent quantity measurement only. Reports state measured quantity with method and version. Quality testing is out of scope. Commercial settlement remains between parties.</p>
        </section>
      </div>
    </div>
  );
}
