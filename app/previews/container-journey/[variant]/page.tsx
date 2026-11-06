import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MarketingCard, ServiceLinks } from "@/app/components/MarketingPage";
import { FLIGHT_KEYS, FLIGHT_VARIANTS, isFlightVariant } from "../variants";
import ContainerFlight from "../ContainerFlight";

export function generateStaticParams() { return FLIGHT_KEYS.map(variant => ({ variant })); }

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }): Promise<Metadata> {
  const { variant } = await params;
  if (!isFlightVariant(variant)) return { title: "Preview not found" };
  return { title: `Option ${FLIGHT_VARIANTS[variant].letter} — ${FLIGHT_VARIANTS[variant].name}`, robots: { index: false, follow: false } };
}

export default async function FlightPreviewPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (!isFlightVariant(variant)) notFound();
  const config = FLIGHT_VARIANTS[variant];
  return <>
    <header className="flight-preview-heading flight-preview-heading--context">
      <p className="flight-preview-kicker">Option {config.letter} / {config.placement}</p>
      <h1>{config.title}</h1>
      <p>{config.description}</p>
      <div className="flight-preview-header-links"><a href="#film-journey">Try the journey<ArrowDown className="h-4 w-4" aria-hidden="true" /></a><Link href={config.route}>View current page<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link></div>
    </header>
    <ContainerFlight key={variant} variant={variant} />
    <div className="flight-preview-context">
      <p className="flight-preview-note">{config.note}</p>
      {variant === "home" && <div className="flight-preview-followup"><div><p className="flight-preview-kicker">What follows on the homepage</p><h2>One team. One licence.</h2><p>Team-based pricing, no per-job fees, and a clear next step. The FAQ and final demo invitation follow this section.</p></div><Link href="/pricing" className="btn-primary">See team pricing<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link></div>}
      {variant === "cargo-wms" && <><h2 className="flight-context-title">The controls beneath the workflow.</h2><div className="grid gap-5 md:grid-cols-3"><MarketingCard title="Permissions & approvals">Agree roles, approval thresholds, and maker-checker separation for your operation.</MarketingCard><MarketingCard title="Documents & customer access">Scope document storage, authorised access, customer tracking, and release booking.</MarketingCard><MarketingCard title="Reports & data exchange">Define movement, billing, utilisation, and exceptions reporting, alongside validated imports.</MarketingCard></div></>}
      {variant === "solutions" && <><h2 className="flight-context-title">Two solutions. Clear operational boundaries.</h2><div className="grid gap-5 md:grid-cols-2"><MarketingCard title="Space BQS" href="/solutions/space-bqs">Bunker quantity surveying with offline mobile capture and office review.</MarketingCard><MarketingCard title="Cargo WMS" href="/solutions/cargo-wms">A custom warehouse-management implementation scoped around your cargo operation.</MarketingCard></div><ServiceLinks /></>}
      <Link href="/previews/container-journey" className="flight-back-to-comparison">Back to all three options<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
    </div>
  </>;
}
