import type { Metadata } from "next";
import QuoteForm from "../components/QuoteForm";
import { Breadcrumbs } from "../components/ui";
import { LiquidGlassNav } from "@/components/ui/liquid-glass-nav";
import "./request-demo.css";

export const metadata: Metadata = {
  title: "Request a Demo or Implementation Consultation",
  description:
    "Request a Space BQS demo, discuss a Cargo WMS implementation, or scope data migration and deployment services.",
};

export default function Page() {
  return (
    <div className="demo-page relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 sm:pb-28 lg:px-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/request-demo", label: "Request a Demo" }]} />
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="lg:sticky lg:top-32">
            <p className="demo-eyebrow">A clearer view starts here</p>
            <h1 className="font-display mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-[#031038] sm:text-5xl lg:text-6xl">Let’s bring your operation into focus.</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#52657c] sm:text-lg">Request a Space BQS demo or discuss your Cargo WMS rollout. Tell us a little about your team and we’ll start with what matters to your operation.</p>
            <div className="demo-detail mt-8 rounded-2xl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#176a8e]">Built around your workflow</p>
              <p className="mt-3 text-sm leading-6 text-[#405a75]">From on-deck survey capture to warehouse workflows, migration and deployment — let’s find the right fit together.</p>
            </div>
          </div>
          <LiquidGlassNav className="demo-form-card">
            <div className="p-6 sm:p-9">
            <p className="demo-eyebrow">Start a conversation</p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-[#031038] sm:text-3xl">Request a demo</h2>
            <p className="mb-8 mt-2 text-sm leading-6 text-[#52657c]">Share your details and we’ll be in touch. Fields marked * are required.</p>
            <QuoteForm />
            </div>
          </LiquidGlassNav>
        </div>
      </div>
    </div>
  );
}
