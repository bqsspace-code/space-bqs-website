import type { Metadata } from "next";
import Link from "next/link";
import AppDemoVideoSection from "../components/AppDemoVideoSection";
import VideoSchema from "../components/VideoSchema";
import WmsVideoSection from "../components/WmsVideoSection";
import { BreadcrumbJsonLd } from "../components/ui";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/videos", {
  title: "Space BQS & Space WMS Product Videos",
  description:
    "Watch the Space BQS mobile survey walkthrough and the Space WMS warehouse-management dashboard and feature overview.",
});

export default function VideosPage() {
  return (
    <div className="bg-[#F7FBFD]">
      <VideoSchema />
      <header className="mx-auto max-w-6xl px-6 pb-10 pt-32 sm:pt-40">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#031038]/60">
          <BreadcrumbJsonLd trail={[{ href: "/", label: "Home" }, { href: "/videos", label: "Videos" }]} />
          <Link href="/" className="hover:text-[#032AAC]">Home</Link>
          <span className="mx-3" aria-hidden="true">/</span>
          <span aria-current="page">Videos</span>
        </nav>
        <h1 className="font-display text-5xl font-bold tracking-tight text-[#031038] sm:text-6xl">Videos</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#031038]/70">
          Watch product walkthroughs for two distinct Space offerings: bunker quantity surveys and warehouse management.
        </p>
        <nav aria-label="Video categories" className="mt-7 flex flex-wrap gap-3">
          <a href="#space-bqs-video" className="inline-flex min-h-11 items-center rounded-full border border-[#b8dbea] bg-white px-5 py-2 text-sm font-semibold text-[#032aac] shadow-sm transition hover:bg-[#eaf4f9] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#032aac]">Space BQS</a>
          <a href="#space-wms-video" className="inline-flex min-h-11 items-center rounded-full border border-[#b8dbea] bg-white px-5 py-2 text-sm font-semibold text-[#032aac] shadow-sm transition hover:bg-[#eaf4f9] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#032aac]">Space WMS</a>
        </nav>
      </header>
      <div id="space-bqs-video"><AppDemoVideoSection /></div>
      <WmsVideoSection pagePath="/videos" />
    </div>
  );
}
