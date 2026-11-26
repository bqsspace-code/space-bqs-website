import type { Metadata } from "next";
import Link from "next/link";
import { routeMetadata } from "../lib/seo-metadata";
import { Section, CtaRow, Breadcrumbs, AnswerBlock } from "../components/ui";
import DeckInteractiveShowcase from "../components/DeckInteractiveShowcase";
import AppDemoVideoSection from "../components/AppDemoVideoSection";
import { QrCode, WifiOff, Clock, ShieldCheck, CheckCircle2, AlertCircle, Smartphone } from "lucide-react";
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
