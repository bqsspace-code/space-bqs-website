import type { Metadata } from "next";
import AppDemoVideoSection from "../components/AppDemoVideoSection";
import { PageHero, HeroFacts, Chapter, Tiles, Tile, Notice } from "../components/Editorial";
import { LazyMount } from "../components/Motion";
import VideoSchema from "../components/VideoSchema";
import WmsVideoSection from "../components/WmsVideoSection";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/videos", {
  title: "Space BQS & Space WMS Product Videos",
  description:
    "Watch the Space BQS mobile survey walkthrough and the Space WMS warehouse-management dashboard and feature overview.",
});

export default function VideosPage() {
  return (
    <div>
      <VideoSchema />
      <PageHero
        href="/videos"
        crumb="Videos"
        eyebrow="Product walkthroughs"
        title="Watch the product work."
        description="Product walkthroughs for two distinct Space offerings: bunker quantity surveys and warehouse management."
        primaryAction={{ href: "#space-bqs-video", label: "Space BQS" }}
        secondaryAction={{ href: "#space-wms-video", label: "Space WMS" }}
        visual={<HeroFacts title="Two products, two videos" rows={[
          { label: "Space BQS", value: "Bunker quantity surveys" },
          { label: "Space WMS", value: "Warehouse management" },
        ]} />}
      />

      <Chapter index="01" eyebrow="Choose a video" title="Two distinct offerings." lede="They are separate products. Pick the one that matches the work you do.">
        <Tiles>
          <Tile art="phone" tone="accent" tag="Space BQS" title="Mobile survey walkthrough" href="#space-bqs-video" cta="Jump to the video">Capture readings on deck, calculate offline and review the record. For bunker delivery, ROB and debunkering surveys.</Tile>
          <Tile art="stack" tone="dark" tag="Space WMS" title="Warehouse dashboard and features" href="#space-wms-video" cta="Jump to the video">A warehouse-management overview. Requirements and delivery are agreed for each project.</Tile>
        </Tiles>
      </Chapter>

      <div id="space-bqs-video" className="scroll-mt-24 bg-[#f7fbfd] py-12 sm:py-16">
        <LazyMount minHeight={560}><AppDemoVideoSection /></LazyMount>
      </div>
      <div className="scroll-mt-24">
        <LazyMount minHeight={560}><WmsVideoSection pagePath="/videos" /></LazyMount>
      </div>

      <Chapter index="02" eyebrow="After watching" title="Where to go next." tone="white">
        <div className="space-y-5">
          <Tiles cols={3}>
            <Tile art="phone" tag="BQS" title="The mobile app" href="/mobile-app" cta="Mobile app">Store listings and the offline workflow.</Tile>
            <Tile art="doc" tag="BQS" title="A sample report" href="/sample-report" cta="Sample report">What the finished output looks like.</Tile>
            <Tile art="stack" tag="WMS" title="Cargo WMS" href="/solutions/cargo-wms" cta="Cargo WMS">Scope and delivery for the warehouse offering.</Tile>
          </Tiles>
          <Notice label="Note">Videos show product context. Confirm the exact screens and fields for your release in a walkthrough.</Notice>
        </div>
      </Chapter>

    </div>
  );
}
