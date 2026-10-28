import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export function MarketingHeader({ eyebrow, title, description, parent = "/solutions", parentLabel = "Solutions" }: { eyebrow: string; title: string; description: string; parent?: string; parentLabel?: string }) {
  return <header className="border-b border-[#d3e9f3] bg-gradient-to-br from-[#f7fbfd] via-[#edf7fc] to-[#e2edff] px-6 pb-14 pt-32 sm:pt-36">
    <div className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-xs text-[#60748a]"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href={parent}>{parentLabel}</Link><span aria-hidden="true">/</span><span aria-current="page">{eyebrow}</span></nav>
      <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#032aac]">{eyebrow}</p>
      <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-[#031038] sm:text-5xl lg:text-6xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-base leading-8 text-[#52657c] sm:text-lg">{description}</p>
    </div>
  </header>;
}

export function MarketingCard({ title, children, href, linkLabel = "Explore" }: { title: string; children: ReactNode; href?: string; linkLabel?: string }) {
  return <article className="liquid-glass-ui flex flex-col rounded-2xl border border-[#d3e9f3] p-6 sm:p-7">
    <h3 className="font-display text-xl font-semibold text-[#032aac]">{title}</h3>
    <div className="mt-3 flex-1 text-sm leading-7 text-[#52657c]">{children}</div>
    {href && <Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#032aac]">{linkLabel}<ArrowRight aria-hidden="true" className="size-4" /></Link>}
  </article>;
}

export function ServiceLinks() {
  return <div className="mt-10 grid gap-4 md:grid-cols-2"><MarketingCard title="Bring your existing data" href="/services/data-migration" linkLabel="Plan your migration">Map, validate, trial-import, and reconcile before the final move.</MarketingCard><MarketingCard title="Choose your deployment" href="/services/deployment" linkLabel="Compare deployment options">Public cloud, private cloud, or on-premises—scoped around your team and infrastructure.</MarketingCard></div>;
}
