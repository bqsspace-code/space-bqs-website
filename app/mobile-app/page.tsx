import type { Metadata } from "next";
import Link from "next/link";
import { Section, CtaRow, Breadcrumbs, AnswerBlock } from "../components/ui";
import DeckToolMock from "../components/DeckToolMock";
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

      {/* Visual Mobile Mock Showcase */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-12 items-center rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
          <div className="lg:col-span-5 flex justify-center">
            <DeckToolMock />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display text-2xl font-bold text-ocean-950 sm:text-3xl">
              Engineered for the realities of offshore bunkering
            </h3>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <QrCode className="h-5 w-5 text-ocean-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ocean-950 text-sm block">Vessel QR Plate Verification</strong>
                  <p className="mt-1 text-slate-600 leading-relaxed">
                    Surveyors scan the vessel QR plate on arrival. The app verifies the 7-digit IMO number and automatically pulls that ship&apos;s specific tank calibration tables. Eliminates manual typing errors on deck.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <WifiOff className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ocean-950 text-sm block">72-Hour Autonomous Offline Lease</strong>
                  <p className="mt-1 text-slate-600 leading-relaxed">
                    Surveyors can stay offshore for days. The 72-hour cryptographic lease permits full calculations and draft saves while disconnected. When signal is re-established, the completed draft syncs securely to the office console.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <Clock className="h-5 w-5 text-sea-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ocean-950 text-sm block">1-Second Autosave to Encrypted Local DB</strong>
                  <p className="mt-1 text-slate-600 leading-relaxed">
                    Every sounding, temperature cut, and water measurement is immediately stored to persistent device memory. If the phone runs out of battery, simply plug in and resume from the exact last tank.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Honest Product Roadmap Disclosure:</strong> Tank photos and Chief Engineer digital signatures are currently in active development for v1.2. The production app today captures verified numerical figures and notes.
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-4">
        <CtaRow />
      </div>
    </div>
  );
}
