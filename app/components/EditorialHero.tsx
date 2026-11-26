import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { BreadcrumbJsonLd } from "./ui";

type TrailItem = { href: string; label: string };

export function HeroImage({
  src,
  alt,
  caption,
  position = "center",
}: {
  src: string;
  alt: string;
  caption: string;
  position?: string;
}) {
  return (
    <figure className="relative aspect-[4/3] min-h-[280px] w-full overflow-hidden rounded-[1.65rem] border border-white/15 bg-[#10264d] shadow-[0_35px_90px_-40px_rgba(0,0,0,.8)] sm:min-h-[360px]">
      <Image
        src={src}
        alt={alt}
        fill
        loading="eager"
        fetchPriority="high"
        sizes="(max-width: 1024px) 100vw, 48vw"
        className="object-cover"
        style={{ objectPosition: position }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#031038]/85 via-[#031038]/10 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <span className="max-w-xs text-sm font-medium leading-6 text-white">{caption}</span>
        <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm">
          <ArrowDownRight className="size-5" />
        </span>
      </figcaption>
    </figure>
  );
}

export default function EditorialHero({
  trail,
  eyebrow,
  title,
  description,
  visual,
  primaryAction,
  secondaryAction,
}: {
  trail: TrailItem[];
  eyebrow: string;
  title: string;
  description: string;
  visual?: ReactNode;
  primaryAction?: { href: string; label: string };
  secondaryAction?: { href: string; label: string };
}) {
  return (
    <header className="relative isolate overflow-hidden border-b border-white/10 bg-[#031038] text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_38%,rgba(25,181,201,.18),transparent_35%),radial-gradient(ellipse_at_20%_0%,rgba(27,79,209,.25),transparent_44%)]" />
      <div aria-hidden="true" className="absolute -right-36 top-24 -z-10 size-[34rem] rounded-full border border-white/[.06]" />
      <div aria-hidden="true" className="absolute -right-20 top-40 -z-10 size-[22rem] rounded-full border border-white/[.06]" />
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36 lg:px-10 lg:pb-20">
        <nav aria-label="Breadcrumb" className="mb-9 text-xs text-white/55">
          <BreadcrumbJsonLd trail={trail} />
          {trail.map((item, index) => (
            <span key={item.href}>
              {index > 0 && <span className="mx-2 text-white/25" aria-hidden="true">/</span>}
              {index === trail.length - 1 ? (
                <span aria-current="page" className="font-medium text-white/85">{item.label}</span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#69d6df]">{item.label}</Link>
              )}
            </span>
          ))}
        </nav>

        <div className={visual ? "grid items-center gap-10 lg:grid-cols-[1.02fr_.98fr] lg:gap-14" : "mx-auto max-w-4xl"}>
          <div className={visual ? "max-w-2xl" : "max-w-4xl"}>
            <p className="mb-5 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-[#7de1e5] sm:text-xs">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-[#7de1e5] shadow-[0_0_16px_#7de1e5]" />
              {eyebrow}
            </p>
            <h1 className="font-display text-[2.7rem] font-semibold leading-[.99] tracking-[-.045em] text-white sm:text-6xl lg:text-[4.65rem]">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#c5d2e7] sm:text-lg sm:leading-8">{description}</p>
            {(primaryAction || secondaryAction) && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {primaryAction && (
                  <Link href={primaryAction.href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#b9f1e8] px-5 py-3 text-sm font-semibold text-[#062141] shadow-[0_12px_35px_-16px_rgba(125,225,229,.75)] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9f1e8] motion-reduce:transition-none">
                    {primaryAction.label}<ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                )}
                {secondaryAction && (
                  <Link href={secondaryAction.href} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 transition hover:border-white/50 hover:bg-white/[.06] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9f1e8] motion-reduce:transition-none">
                    {secondaryAction.label}
                  </Link>
                )}
              </div>
            )}
            <div className="mt-10 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[.16em] text-white/40">
              <span className="h-px w-9 bg-[#19b5c9]" />
              <span>Space BQS · Marine survey software</span>
            </div>
          </div>

          {visual && (
            <div className="relative mx-auto w-full max-w-[620px] lg:ml-auto">
              <div aria-hidden="true" className="absolute -inset-4 rounded-[2rem] border border-white/[.07] sm:-inset-5" />
              {visual}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}