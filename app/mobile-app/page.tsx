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
      <div className="mx-auto max-w-6xl px-4 pt-8">
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
          Mobile app — your surveyors&apos; rugged deck tool
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          No cellular signal deep in the cargo holds? No problem. Your teams scan, record in 3 steps, calculate offline, and sync when reconnecting.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <AnswerBlock>
          <p>
            The Space BQS mobile application is designed specifically for wet, high-glare deck environments. Built with large touch targets and high-contrast numerical inputs, surveyors scan the vessel QR code to pull verified particulars, walk through a 3-step wizard (Ship → Fuel → Tanks), and execute ASTM Table 54B calculations locally on the device without an internet connection.
          </p>
        </AnswerBlock>
      </div>

      {/* Mobile App Demo Video */}
      <AppDemoVideoSection />

      {/* Visual Interactive Mobile Showcase */}
      <DeckInteractiveShowcase />

      {/* Product Roadmap Disclosure */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-amber-950 font-semibold block text-sm">
              Honest Product Roadmap Disclosure
            </strong>
            <p className="leading-relaxed">
              Tank photos and Chief Engineer digital signatures are currently in active testing for v1.2 release. The production app deployed today captures verified numerical figures, water cuts, temperature probes, and generates immutable SHA-256 certificate hashes.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-4">
        <CtaRow />
      </div>
    </div>
  );
}
