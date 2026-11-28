import type { Metadata } from "next";
import AppDemoVideoSection from "../components/AppDemoVideoSection";
import { PageHero, HeroFacts, Chapter } from "../components/Editorial";
import { routeMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = routeMetadata("/demo", {
  title: "Mobile App Walkthrough",
  description:
    "Watch the Space BQS mobile app walkthrough: capture bunker survey readings, review calculations, and see the survey workflow.",
});

export default function Page() {
  return (
    <div>
      <PageHero
        href="/demo"
        crumb="Demo"
        eyebrow="Video walkthrough"
        title="Watch a survey happen on deck."
        description="See how surveyors capture tank soundings offline on deck and compute temperature-corrected quantities. For a tailored one-to-one team pilot, request a demo."
        primaryAction={{ href: "/request-demo", label: "Request a demo" }}
        secondaryAction={{ href: "/mobile-app", label: "About the mobile app" }}
        visual={<HeroFacts title="In this walkthrough" rows={[
          { label: "Format", value: "Video" },
          { label: "Product", value: "Mobile deck tool" },
          { label: "Shows", value: "Capture and calculation" },
        ]} />}
      />
      <div className="bg-[#f7fbfd] py-10 sm:py-16">
        <AppDemoVideoSection />
      </div>
    </div>
  );
}
