import type { Metadata } from "next";
import Link from "next/link";
import { Section, CtaRow, Breadcrumbs, AnswerBlock } from "../components/ui";
import DeckInteractiveShowcase from "../components/DeckInteractiveShowcase";
import AppDemoVideoSection from "../components/AppDemoVideoSection";
import { QrCode, WifiOff, Clock, ShieldCheck, CheckCircle2, AlertCircle, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Mobile App — Survey on Deck, Even Offline",
  description:
    "Space BQS mobile app: scan ship QR, 3-step wizard Ship Fuel Tanks, offline calculation up to 72 hours, supervisor review. Quantity-only.",
};

export default function Page() {
  return (
    <div className="space-y-12 pb-16">
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
          The world’s first mobile app for bunker quantity surveys.
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Capture readings, calculate offline, and sync for office review when you reconnect. Built for quantity survey teams on deck and in engine rooms.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <AnswerBlock>
          <p>
            Choose or scan the vessel, enter fuel and tank details, and calculate locally. QR identifies the vessel and optional port; it does not populate tank measurements. A 72-hour offline lease supports field work before synchronising with the web platform.
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
