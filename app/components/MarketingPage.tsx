import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import EditorialHero from "./EditorialHero";

export function MarketingHeader({ eyebrow, title, description, parent = "/solutions", parentLabel = "Solutions", currentHref, visual, primaryAction, secondaryAction }: { eyebrow: string; title: string; description: string; parent?: string; parentLabel?: string; currentHref: string; visual?: ReactNode | null; primaryAction?: { href: string; label: string }; secondaryAction?: { href: string; label: string } }) {
  const trail = currentHref === parent
    ? [{ href: "/", label: "Home" }, { href: currentHref, label: eyebrow }]
    : [{ href: "/", label: "Home" }, { href: parent, label: parentLabel }, { href: currentHref, label: eyebrow }];

  return <EditorialHero
    trail={trail}
    eyebrow={eyebrow}
    title={title}
    description={description}
    visual={visual === null ? undefined : visual ?? <div className="grid aspect-[4/3] min-h-[280px] place-items-center rounded-[1.65rem] border border-white/15 bg-[radial-gradient(circle_at_70%_35%,rgba(25,181,201,.22),transparent_35%),linear-gradient(145deg,#10264d,#07142f)] p-8 text-center sm:min-h-[360px]"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#7de1e5]">{eyebrow}</p><p className="mt-4 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">A considered workflow, built around your team.</p><span className="mx-auto mt-6 block h-px w-14 bg-[#19b5c9]" /></div></div>}
    primaryAction={primaryAction}
    secondaryAction={secondaryAction}
  />;
}

export function MarketingCard({ title, children, href, linkLabel = "Explore" }: { title: string; children: ReactNode; href?: string; linkLabel?: string }) {
  return <article className="group flex min-h-full flex-col rounded-[1.4rem] border border-[#d3e4ee] bg-white p-6 shadow-[0_12px_36px_-28px_rgba(3,42,172,.35)] transition duration-300 hover:-translate-y-1 hover:border-[#81c7d2] hover:shadow-[0_24px_50px_-30px_rgba(3,42,172,.42)] motion-reduce:transform-none motion-reduce:transition-none sm:p-7">
    <h3 className="font-display text-xl font-semibold tracking-tight text-[#031038] group-hover:text-[#032aac]">{title}</h3>
    <div className="mt-3 flex-1 text-sm leading-7 text-[#52657c]">{children}</div>
    {href && <Link href={href} className="mt-6 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-[#032aac] underline decoration-[#9bcbd7] underline-offset-4 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#032aac]">{linkLabel}<ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></Link>}
  </article>;
}

export function ServiceLinks() {
  return <div className="mt-10 grid gap-4 md:grid-cols-2"><MarketingCard title="Bring your existing data" href="/services/data-migration" linkLabel="Plan your migration">Map, validate, trial-import, and reconcile before the final move.</MarketingCard><MarketingCard title="Choose your deployment" href="/services/deployment" linkLabel="Compare deployment options">Public cloud, private cloud, or on-premises—scoped around your team and infrastructure.</MarketingCard></div>;
}
