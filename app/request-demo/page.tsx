import type { Metadata } from "next";
import QuoteForm from "../components/QuoteForm";
import { Breadcrumbs } from "../components/ui";
import { Chapter, Steps, Checklist, Tiles, Tile } from "../components/Editorial";
import { FaqList } from "../components/EditorialExtras";
import { LiquidGlassNav } from "@/components/ui/liquid-glass-nav";
import { routeMetadata } from "../lib/seo-metadata";
import "./request-demo.css";

export const metadata: Metadata = routeMetadata("/request-demo", {
  title: "Request a Demo",
  description:
    "Request a bunker quantity survey software demo for your marine survey team. Tell us about your company and survey workflows.",
});

export default async function Page({ searchParams }: { searchParams: Promise<{ country?: string | string[]; intent?: string | string[] }> }) {
  const query = await searchParams;
  const country = typeof query.country === "string" ? query.country.trim().slice(0, 100) : "";
  const formType = query.intent === "pilot" ? "space-bqs-pilot" : "space-bqs";

  return (
    <>
    <div className="demo-page relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 sm:pb-28 lg:px-8">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/request-demo", label: "Request a Demo" }]} />
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="lg:sticky lg:top-32">
            <p className="demo-eyebrow">A clearer view starts here</p>
            <h1 className="hero-in font-display mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-[#031038] sm:text-5xl lg:text-6xl">Let’s bring your operation into focus.</h1>
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
            <QuoteForm initialCountry={country} formType={formType} />
            </div>
          </LiquidGlassNav>
        </div>
      </div>
    </div>

    <Chapter index="01" eyebrow="What happens next" title="From your message to a walkthrough." tone="white" lede="No hard sell. The aim is to find out whether Space BQS fits your work.">
      <Steps items={[
        { meta: "You", title: "Send the form", body: "Name, work email, company, country, organisation type and team size. Phone number and project details are optional." },
        { meta: "The team", title: "We reply directly", body: "A person reads it and replies to confirm what you want to see and who should be there." },
        { meta: "Together", title: "A walkthrough on your workflow", body: "Mobile capture, web review and the report, shaped around your survey types. Pilot availability and scope are confirmed with the team." },
      ]} />
    </Chapter>

    <Chapter index="02" eyebrow="Helpful to include" title="What to mention." tone="mist" lede="You do not need a finalised plan, only enough to talk about fit.">
      <div className="space-y-5">
        <Checklist items={[
          "Your organisation type and roughly how many field surveyors you have",
          "Which surveys you run: delivery, ROB, debunkering, or a Cargo WMS project",
          "Any vessel data, migration, integration or hosting requirements",
        ]} />
        <Tiles>
          <Tile art="doc" tag="Before you ask" title="How to evaluate" href="/evaluate" cta="Evaluation guide">A short path from first look to a decision.</Tile>
          <Tile art="sync" tag="Common questions" title="FAQ" href="/faq" cta="Read the FAQ">Scope, calculation, mobile, reports and licensing.</Tile>
        </Tiles>
      </div>
    </Chapter>

    <Chapter index="03" eyebrow="Questions" title="Before you submit." tone="white">
      <FaqList schema={false} items={[
        { q: "Do I need to be a survey firm?", a: "Space BQS is designed for survey firms and inspection teams. If you are in another role, say so and we will tell you plainly whether it fits." },
        { q: "Is there a price list?", a: "No fixed prices are published. Licensing is scoped around your team and workflows.", more: { href: "/pricing", label: "Pricing" } },
        { q: "Can we pilot first?", a: "Ask. Whether a pilot is available, and its scope, is confirmed directly with the team." },
      ]} />
    </Chapter>
    </>
  );
}
