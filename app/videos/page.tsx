import type { Metadata } from "next";
import Link from "next/link";
import AppDemoVideoSection from "../components/AppDemoVideoSection";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/videos", {
  title: "App and Product Walkthrough Videos",
  description:
    "Explore the Space BQS workflow, from on-deck tank readings and volume correction to the final survey certificate.",
});

export default function VideosPage() {
  return (
    <div className="bg-[#F7FBFD]">
      <header className="mx-auto max-w-6xl px-6 pb-10 pt-32 sm:pt-40">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#031038]/60">
          <Link href="/" className="hover:text-[#032AAC]">Home</Link>
          <span className="mx-3" aria-hidden="true">/</span>
          <span aria-current="page">Videos</span>
        </nav>
        <h1 className="font-display text-5xl font-bold tracking-tight text-[#031038] sm:text-6xl">Videos</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#031038]/70">
          Explore the workflow. Get to know the tools behind every survey.
        </p>
      </header>
      <AppDemoVideoSection />
    </div>
  );
}
