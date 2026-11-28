import type { Metadata } from "next";
import Link from "next/link";
import { routeMetadata } from "../lib/seo-metadata";
import { AnswerBlock } from "../components/ui";
import { PageHero, HeroImage, Chapter, StatStrip, Ledger, Notice } from "../components/Editorial";
import DeckInteractiveShowcase from "../components/DeckInteractiveShowcase";
import AppDemoVideoSection from "../components/AppDemoVideoSection";
import { ExternalLink } from "lucide-react";
import mobileAppSchema from "@/schema/02_mobile_app.json";

export const metadata: Metadata = routeMetadata("/mobile-app", {
  title: "Mobile App — Survey on Deck, Even Offline",
  description:
    "Capture bunker survey readings on a mobile device, work offline, then sync records for supervisor review in the Space BQS web platform.",
});

const storeBtn = "inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#032aac]";

export default function Page() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mobileAppSchema) }} />
      <PageHero
        href="/mobile-app"
        crumb="Mobile App"
        eyebrow="Field deck tool · iOS & Android"
        title="Survey on deck, even offline."
        description="Capture readings, calculate offline, and sync for office review when you reconnect. Built for quantity survey teams on deck and in engine rooms."
        primaryAction={{ href: "/request-demo", label: "Request a demo" }}
        secondaryAction={{ href: "/demo", label: "Watch the walkthrough" }}
        visual={<HeroImage src="/assets/web_image/marine-surveyor-qr-deck-capture.jpg" alt="A surveyor scanning a vessel QR code on deck" caption="Scan the vessel. Record the tanks. Sync later." />}
      />

      <section className="bg-[#f7fbfd] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-8 px-5 sm:px-8 lg:px-10">
          <StatStrip items={[
            { value: "3", label: "Steps: Ship, Fuel, Tanks" },
            { value: "Offline", label: "Calculate without signal" },
            { value: "QR", label: "Identifies vessel and port" },
            { value: "Sync", label: "On reconnect, for review" },
          ]} />
          <AnswerBlock>
            <p>Choose or scan the vessel, enter fuel and tank details, and calculate locally. QR identifies the vessel and optional port; it does not populate tank measurements. The app supports offline field work and synchronization when connectivity returns.</p>
          </AnswerBlock>
        </div>
      </section>

      <Chapter index="01" eyebrow="Get the app" title="Official Space BQS app listings." lede="Open the publisher listings for current availability and device requirements." tone="white">
        <div className="flex flex-wrap gap-3">
          <a href="https://apps.apple.com/in/app/space-bqs/id6812992991" target="_blank" rel="noreferrer" className={`${storeBtn} bg-[#032aac] text-white hover:bg-[#1b4fd1]`}>App Store <ExternalLink aria-hidden="true" className="size-4" /></a>
          <a href="https://play.google.com/store/apps/details?id=com.spaceai.bqs" target="_blank" rel="noreferrer" className={`${storeBtn} border border-[#b9d3e8] bg-white text-[#032aac] hover:bg-[#f7fbfd]`}>Google Play <ExternalLink aria-hidden="true" className="size-4" /></a>
        </div>
      </Chapter>

      <AppDemoVideoSection />
      <DeckInteractiveShowcase />

      <Chapter index="02" eyebrow="Capture and review" title="Capture on mobile. Review on the web." tone="mist">
        <Ledger items={[
          { title: "Surveyors submit the field record", body: "An authorised supervisor or administrator completes it. The web platform manages review and finalisation." },
          { title: "Context, not corrections", body: "Trim and list are recorded as context, not calculated as corrections." },
          { title: "Still on the roadmap", body: "Tank photos and digital signatures remain roadmap items." },
        ]} />
        <div className="mt-8"><Notice label="Next">Continue in the <Link href="/platform" className="font-semibold text-[#032aac] underline decoration-[#9bcbd7] underline-offset-4">office web app</Link>, where supervisors review and finalise the record.</Notice></div>
      </Chapter>

    </div>
  );
}
