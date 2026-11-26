import type { Metadata } from "next";
import Link from "next/link";
import { routeMetadata } from "../lib/seo-metadata";
import { Section, CtaRow, Breadcrumbs, AnswerBlock } from "../components/ui";
import DeckInteractiveShowcase from "../components/DeckInteractiveShowcase";
import AppDemoVideoSection from "../components/AppDemoVideoSection";
import { QrCode, WifiOff, Clock, ShieldCheck, CheckCircle2, AlertCircle, Smartphone, ExternalLink } from "lucide-react";
import mobileAppSchema from "@/schema/02_mobile_app.json";

export const metadata: Metadata = routeMetadata("/mobile-app", {
  title: "Mobile App — Survey on Deck, Even Offline",
  description:
    "Capture bunker survey readings on a mobile device, work offline, then sync records for supervisor review in the Space BQS web platform.",
});

export default function Page() {
  return (
    <div className="space-y-12 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mobileAppSchema) }}
      />
      <div className="mx-auto max-w-6xl px-6 pt-32">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/mobile-app", label: "Mobile App" },
          ]}
        />
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-800">
            Field Deck Tool (iOS & Android)
          </span>
          <span className="text-xs text-slate-500 font-mono">Offline-First Engine</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-bold text-ocean-950 sm:text-4xl">
          Offline bunker survey app for marine teams
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Capture readings, calculate offline, and sync for office review when you reconnect. Built for quantity survey teams on deck and in engine rooms.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <AnswerBlock>
          <p>
            Choose or scan the vessel, enter fuel and tank details, and calculate locally. QR identifies the vessel and optional port; it does not populate tank measurements. The app supports offline field work and synchronization when connectivity returns.
          </p>
        </AnswerBlock>
      </div>

      <section aria-labelledby="official-app-listings" className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border border-[#d3e4ee] bg-white p-5 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
          <div>
            <h2 id="official-app-listings" className="font-display text-lg font-semibold text-[#031038]">Official Space BQS app listings</h2>
            <p className="mt-1 text-sm leading-6 text-[#52657c]">Open the publisher listings for current availability and device requirements.</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 sm:mt-0">
            <a href="https://apps.apple.com/in/app/space-bqs/id6812992991" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#032aac] px-5 text-sm font-semibold text-white hover:bg-[#1b4fd1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#032aac]">App Store <ExternalLink aria-hidden="true" className="size-4" /></a>
            <a href="https://play.google.com/store/apps/details?id=com.spaceai.bqs" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#b9d3e8] bg-white px-5 text-sm font-semibold text-[#032aac] hover:bg-[#f7fbfd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#032aac]">Google Play <ExternalLink aria-hidden="true" className="size-4" /></a>
          </div>
        </div>
      </section>

      {/* Mobile App Demo Video */}
      <AppDemoVideoSection />

      {/* Visual Interactive Mobile Showcase */}
      <DeckInteractiveShowcase />

      {/* Product Roadmap Disclosure */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border border-[#d3e9f3] bg-[#edf5ff] p-5 text-xs text-[#52657c] flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-[#032aac] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-[#032aac] font-semibold block text-sm">
              Capture on mobile. Review on the web.
            </strong>
            <p className="leading-relaxed">
              Surveyors submit the field record; an authorised supervisor or administrator completes it. The web platform manages review and finalisation. Tank photos and digital signatures remain roadmap items. Trim and list are recorded as context, not calculated as corrections.
            </p>
            <Link href="/platform" className="inline-flex pt-2 font-semibold text-[#032aac]">Explore the office web app →</Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-4">
        <CtaRow />
      </div>
    </div>
  );
}
