import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../components/ui";
import AppDemoVideoSection from "../components/AppDemoVideoSection";

export const metadata: Metadata = {
  title: "Demo & Mobile App Walkthrough — Space BQS",
  description:
    "Watch the Space BQS mobile deck tool in action, explore our ASTM Table 54B calculation engine, and request a pilot workspace for your survey firm.",
};

export default function Page() {
  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/demo", label: "Demo" }]} />
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            Interactive Product Demo
          </span>
          <span className="text-xs text-slate-500 font-mono">Mobile Deck Tool</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl">
          Space BQS Demo &amp; App Walkthrough
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          See how surveyors capture tank soundings offline on deck and compute temperature-corrected quantities. For a tailored 1-on-1 team pilot, use{" "}
          <Link href="/request-demo" className="font-semibold text-ocean-700 underline hover:text-ocean-900">
            Request a demo
          </Link>.
        </p>
      </div>

      {/* Mobile App Demo Video Player */}
      <AppDemoVideoSection />
    </div>
  );
}
