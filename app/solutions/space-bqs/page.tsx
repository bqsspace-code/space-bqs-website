import type { Metadata } from "next";
import { routeMetadata } from "../../lib/seo-metadata";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, FileCheck2, LockKeyhole, Monitor, Smartphone, WifiOff } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { BevelWorkflowCards } from "@/components/ui/bevel-workflow-cards";
import SpaceBqsSurveyFlight from "@/components/ui/space-bqs-survey-flight";
import { ServiceLinks } from "../../components/MarketingPage";
import { BreadcrumbJsonLd } from "../../components/ui";
import WeightText from "../../components/WeightText";
import WaveTransition from "../../components/WaveTransition";
import ScrollReveal from "../../components/ScrollReveal";
import "../cargo-wms/cargo-wms-page.css";
import "./space-bqs-page.css";

export const metadata: Metadata = routeMetadata("/solutions/space-bqs", {
  title: "Bunker Quantity Survey Software",
  description: "Bunker quantity survey software for marine survey firms. Capture tank readings offline, review calculations, and issue PDF and Excel reports.",
});

function BqsHeading({ id, eyebrow, children, description }: { id: string; eyebrow: string; children: ReactNode; description: string }) {
  return <header className="cargo-section-heading"><div><p className="cargo-eyebrow">{eyebrow}</p><WeightText id={id} tag="h2" mode="scroll-reveal" restWeight={400} activeWeight={700} className="cargo-section-title font-display">{children}</WeightText></div><p className="cargo-section-lede">{description}</p></header>;
}

export default function Page() {
  return <div className="cargo-wms-page space-bqs-page">
    <section className="cargo-wms-hero" aria-labelledby="space-bqs-title">
      <div className="cargo-hero-current" aria-hidden="true" />
      <div className="cargo-hero-inner">
        <nav aria-label="Breadcrumb" className="cargo-breadcrumb"><BreadcrumbJsonLd trail={[{ href: "/", label: "Home" }, { href: "/solutions", label: "Solutions" }, { href: "/solutions/space-bqs", label: "Space BQS" }]} /><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/solutions">Solutions</Link><span aria-hidden="true">/</span><span aria-current="page">Space BQS</span></nav>
        <p className="cargo-hero-badge"><Smartphone className="h-3.5 w-3.5" aria-hidden="true" />Space BQS · Mobile + Web</p>
        <WeightText id="space-bqs-title" tag="h1" mode="cursor-radius" restWeight={350} activeWeight={750} className="cargo-hero-title font-display">Mobile On Deck.<br />{" "}Web In The Office.</WeightText>
        <p className="cargo-hero-description">Bunker quantity survey software for survey firms. Keep the reading, calculation, review, and client proof in one connected workflow.</p>
        <div className="cargo-hero-actions">
          <ShinyButton href="/request-demo" className="inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white">Request A Demo<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></ShinyButton>
          <ShinyButton variant="secondary" href="#survey-journey" className="inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#031038]">Follow A Survey<ArrowDown className="h-4 w-4" aria-hidden="true" /></ShinyButton>
        </div>
        <div className="cargo-hero-capabilities" aria-label="Product capabilities">{[{ icon: WifiOff, text: "Offline-first capture" }, { icon: Monitor, text: "Office review" }, { icon: LockKeyhole, text: "Finalised records" }, { icon: FileCheck2, text: "PDF + Excel" }].map(item => <span key={item.text}><item.icon aria-hidden="true" />{item.text}</span>)}</div>
        <p className="cargo-hero-scope">Quantity-only · iOS &amp; Android · Accounts provided by your survey firm</p>
      </div>
    </section>
    <WaveTransition variant="sweep" to="#f0f6fc" />

    <section id="survey-journey" className="cargo-wms-section" aria-labelledby="bqs-journey-heading">
      <div className="cargo-content-width"><BqsHeading id="bqs-journey-heading" eyebrow="From Deck To Proof" description="Follow the record from vessel selection and field capture to calculation, supervisor review, and issued proof.">One Survey.<br />{" "}Every Handoff Connected.</BqsHeading></div>
      <SpaceBqsSurveyFlight />
      <p className="cargo-content-width cargo-scope-note">Illustrative workflow film, created from supplied maritime footage, an app capture, and concept document graphics. <Link href="/videos#app-demo">Watch the actual app walkthrough →</Link></p>
    </section>
    <WaveTransition variant="crest" to="#e4eff9" flip />

    <section id="bqs-interfaces" className="cargo-wms-section cargo-wms-section--mist" aria-labelledby="bqs-interfaces-heading">
      <div className="cargo-content-width">
        <BqsHeading id="bqs-interfaces-heading" eyebrow="Two Interfaces. One Record." description="Give surveyors a focused field tool and supervisors a connected office view. Each person works in the right place.">Built For The Deck.<br />{" "}Ready For The Office.</BqsHeading>
        <ScrollReveal stagger className="bqs-interface-grid">
          <div><article className="bqs-interface-card" data-glass-depth>
            <div className="bqs-interface-visual bqs-interface-visual--mobile">
              <div className="bqs-mobile-caption"><WifiOff aria-hidden="true" /><span>On deck.<br />On device.<br />Offline.</span></div>
              <div className="bqs-phone-preview"><Image src="/assets/mobile_image/WhatsApp%20Image%202026-10-09%20at%2011.09.07%20PM%20(7).jpeg" alt="Space BQS mobile calculation preview with tank readings, draft saving, and survey total" fill sizes="180px" className="object-cover object-top" /></div>
            </div>
            <div className="bqs-interface-copy"><p className="cargo-eyebrow">01 / The Mobile App</p><h3>Capture Without Retyping.</h3><p>Choose or scan a vessel, capture tank readings, calculate locally, and sync after field work. Offline support helps surveyors continue recording when connectivity is unavailable.</p><ul>{["Vessel context and field measurements", "Local calculation before submission", "Sync when your connection returns"].map(text => <li key={text}><Check aria-hidden="true" />{text}</li>)}</ul><Link href="/mobile-app">See the real app screens<ArrowUpRight aria-hidden="true" /></Link></div>
          </article></div>
          <div><article className="bqs-interface-card" data-glass-depth>
            <div className="bqs-interface-visual bqs-interface-visual--office">
              <div className="bqs-office-preview" role="img" aria-label="Illustrative web review queue showing surveys under review, calculated, and finalised">
                <div className="bqs-office-chrome"><span /><span /><span /><strong>Space BQS / Office</strong></div>
                <div className="bqs-office-body"><p>One place to review.</p><span className="bqs-office-caption">ILLUSTRATIVE REVIEW QUEUE</span>{[["Delivery survey", "Under review"], ["ROB survey", "Calculated"], ["Debunkering survey", "Finalised"]].map(([label, state]) => <div key={label} className="bqs-office-row"><span>{label}</span><span>{state}</span></div>)}<div className="bqs-office-lock"><LockKeyhole aria-hidden="true" />Supervisor-controlled finalisation</div></div>
              </div>
            </div>
            <div className="bqs-interface-copy"><p className="cargo-eyebrow">02 / The Web App</p><h3>Review With The Working.</h3><p>Review calculation details, manage vessel master data, follow survey status, and retrieve issued PDF certificates and Excel workbooks.</p><ul>{["Tank-level calculation review", "Controlled finalisation of survey records", "Issued PDF and Excel outputs"].map(text => <li key={text}><Check aria-hidden="true" />{text}</li>)}</ul><Link href="/platform">Explore the office platform<ArrowUpRight aria-hidden="true" /></Link></div>
          </article></div>
        </ScrollReveal>
      </div>
    </section>
    <WaveTransition variant="swell" to="#f0f6fc" />

    <section id="bqs-survey-types" className="cargo-wms-section" aria-labelledby="bqs-types-heading">
      <div className="cargo-content-width"><BqsHeading id="bqs-types-heading" eyebrow="Three Quantity Workflows" description="Delivery, fuel remaining on board, or removal. The same connected approach to readings, calculation, and evidence.">Every Quantity Job.<br />{" "}The Same Confidence.</BqsHeading><ScrollReveal><BevelWorkflowCards /></ScrollReveal></div>
    </section>
    <WaveTransition variant="ripple" to="#e4eff9" flip />

    <section id="bqs-team-rollout" className="cargo-wms-section cargo-wms-section--mist" aria-labelledby="bqs-team-heading">
      <div className="cargo-content-width">
        <BqsHeading id="bqs-team-heading" eyebrow="Your Team. Your Records." description="Bring your existing records and infrastructure requirements. Scope migration and deployment with your firm.">A Clear Start.<br />{" "}A Connected Team.</BqsHeading>
        <ScrollReveal stagger className="bqs-handover-grid">{[
          { icon: Smartphone, title: "Surveyors Capture", text: "Field teams keep working on deck with the mobile app." },
          { icon: Monitor, title: "Supervisors Review", text: "The office reviews the working before finalisation." },
          { icon: FileCheck2, title: "Clients Receive Proof", text: "Clients receive issued PDF and Excel outputs without needing a platform login." },
        ].map(item => <article key={item.title}><item.icon aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></article>)}</ScrollReveal>
        <ScrollReveal className="cargo-support-links"><ServiceLinks /></ScrollReveal>
      </div>
    </section>
  </div>;
}
