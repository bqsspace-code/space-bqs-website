import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import EditorialHero, { HeroImage } from "./EditorialHero";
import ScrollReveal from "./ScrollReveal";
import WaveTransition from "./WaveTransition";
import { CountUp, GlowScope } from "./Motion";

/* Shared editorial kit for secondary pages: dark hero, numbered chapters, hairline ledgers,
   bento tiles and a closing call-to-action band. Server components only. */

type Action = { href: string; label: string };
type Trail = { href: string; label: string }[];

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#032aac]";

/* ─── Hero ─── */
export function PageHero({
  href,
  crumb,
  parent,
  eyebrow,
  title,
  description,
  visual,
  primaryAction,
  secondaryAction,
  waveTo = "#f7fbfd",
}: {
  href: string;
  crumb: string;
  parent?: { href: string; label: string };
  eyebrow: string;
  title: string;
  description: string;
  visual?: ReactNode;
  primaryAction?: Action;
  secondaryAction?: Action;
  waveTo?: string;
}) {
  const trail: Trail = [{ href: "/", label: "Home" }, ...(parent ? [parent] : []), { href, label: crumb }];
  return (
    <>
      <EditorialHero
        trail={trail}
        eyebrow={eyebrow}
        title={title}
        description={description}
        visual={visual}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
      />
      <div className="hero-wave"><WaveTransition variant="swell" to={waveTo} accent="#7fbecb" /></div>
    </>
  );
}

export { HeroImage };

/** A calm, data-led hero panel: labelled rows over a faint wave line. */
export function HeroFacts({ title, rows }: { title: string; rows: { label: string; value: string }[] }) {
  return (
    <div className="relative">
    <span aria-hidden="true" className="aurora-orb -left-6 top-4 size-44 bg-[#19b5c9]/45" />
    <span aria-hidden="true" className="aurora-orb -bottom-8 right-0 size-52 bg-[#1b4fd1]/55" />
    <div className="glass-card-dark relative overflow-hidden rounded-[1.65rem] p-7 sm:p-9">
      <svg aria-hidden="true" viewBox="0 0 600 160" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full opacity-60">
        <path d="M0 90 C 80 40, 160 140, 260 90 S 440 40, 600 95 V160 H0Z" fill="rgba(25,181,201,.10)" />
        <path d="M0 90 C 80 40, 160 140, 260 90 S 440 40, 600 95" fill="none" stroke="rgba(125,225,229,.55)" strokeWidth="1.5" />
      </svg>
      <p className="relative font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-[#7de1e5]">{title}</p>
      <dl className="relative mt-5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-6 border-t border-white/10 py-4 first:border-t-0 sm:py-5">
            <dt className="font-mono text-[10px] uppercase tracking-[.16em] text-white/50">{row.label}</dt>
            <dd className="text-right font-display text-lg font-semibold leading-snug text-white sm:text-xl">{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="h-16" aria-hidden="true" />
    </div>
    </div>
  );
}

/* ─── Chapter: numbered section with a sticky heading column ─── */
const tones = {
  light: { fill: "#f7fbfd", accent: "#8fc9d6", bg: "bg-[#f7fbfd]", title: "text-[#031038]", lede: "text-[#52657c]", eyebrow: "text-[#032aac]", num: "text-[#032aac]/15" },
  white: { fill: "#ffffff", accent: "#a9d3ea", bg: "bg-white", title: "text-[#031038]", lede: "text-[#52657c]", eyebrow: "text-[#032aac]", num: "text-[#032aac]/15" },
  mist: { fill: "#eaf4f9", accent: "#7fbecb", bg: "bg-[#eaf4f9]", title: "text-[#031038]", lede: "text-[#445b73]", eyebrow: "text-[#032aac]", num: "text-[#032aac]/15" },
  dark: { fill: "#031038", accent: "#19b5c9", bg: "bg-[#031038]", title: "text-white", lede: "text-[#c5d2e7]", eyebrow: "text-[#7de1e5]", num: "text-white/10" },
} as const;

const WAVES = ["swell", "sweep", "crest", "ripple", "deep"] as const;

export function Chapter({
  index,
  eyebrow,
  title,
  lede,
  tone = "light",
  id,
  wave = true,
  children,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  tone?: keyof typeof tones;
  id?: string;
  wave?: boolean;
  children: ReactNode;
}) {
  const t = tones[tone];
  const seed = Number.parseInt(index ?? "", 10) || title.length;
  return (
    <>
    {wave && (
      <div className="chapter-wave">
        <WaveTransition variant={WAVES[seed % WAVES.length]} to={t.fill} accent={t.accent} flip={seed % 2 === 0} />
      </div>
    )}
    <section id={id} className={`relative overflow-clip ${t.bg} py-20 [contain-intrinsic-size:auto_720px] [content-visibility:auto] sm:py-24 lg:py-28`}>
      {tone === "dark" ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_10%,rgba(25,181,201,.16),transparent_40%)]" />
      ) : (
        <>
          <span aria-hidden="true" className="aurora-orb -right-24 top-32 size-[26rem] bg-[#7fc4f2]/55" />
          <span aria-hidden="true" className="aurora-orb -left-28 bottom-0 size-[24rem] bg-[#5fd3d8]/40" />
        </>
      )}
      <GlowScope className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.5fr)] lg:gap-16 lg:px-10">
        <ScrollReveal className="lg:sticky lg:top-28 lg:self-start">
          {index && <p aria-hidden="true" className={`font-display text-7xl font-semibold leading-none tracking-tighter sm:text-8xl ${t.num}`}>{index}</p>}
          {eyebrow && (
            <p className={`mt-3 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[.2em] sm:text-xs ${t.eyebrow}`}>
              <span aria-hidden="true" className="rule-grow h-px w-8 bg-current opacity-60" />
              {eyebrow}
            </p>
          )}
          <h2 className={`mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-[-.03em] sm:text-4xl lg:text-[2.6rem] ${t.title}`}>{title}</h2>
          {lede && <p className={`mt-5 max-w-md text-base leading-7 ${t.lede}`}>{lede}</p>}
        </ScrollReveal>
        <div className="min-w-0">{children}</div>
      </GlowScope>
    </section>
    </>
  );
}

/* ─── Ledger: hairline-divided, numbered rows ─── */
export function Ledger({
  items,
  dark = false,
}: {
  items: { title: string; body: ReactNode; href?: string; tag?: string; cta?: string }[];
  dark?: boolean;
}) {
  return (
    <ScrollReveal as="ol" stagger className={`border-t ${dark ? "border-white/15" : "border-[#c9dce8]"}`}>
      {items.map((item, i) => (
        <li key={item.title} className={`group relative grid gap-x-6 gap-y-2 border-b py-7 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:py-8 ${dark ? "border-white/15" : "border-[#c9dce8]"}`}>
          <span className={`font-mono text-xs font-semibold tracking-widest ${dark ? "text-[#7de1e5]" : "text-[#032aac]"}`}>{String(i + 1).padStart(2, "0")}</span>
          <div>
            {item.tag && <p className={`mb-2 font-mono text-[10px] uppercase tracking-[.18em] ${dark ? "text-white/50" : "text-[#176a8e]"}`}>{item.tag}</p>}
            <h3 className={`font-display text-xl font-semibold tracking-tight sm:text-2xl ${dark ? "text-white" : "text-[#031038]"}`}>
              {item.href ? (
                <Link href={item.href} className={`transition-colors after:absolute after:inset-0 ${dark ? "group-hover:text-[#7de1e5]" : "group-hover:text-[#032aac]"} ${focusRing}`}>{item.title}</Link>
              ) : item.title}
            </h3>
            <div className={`mt-2 max-w-2xl text-[15px] leading-7 ${dark ? "text-[#c5d2e7]" : "text-[#52657c]"}`}>{item.body}</div>
          </div>
          {item.href && (
            <span aria-hidden="true" className={`mt-1 hidden items-center gap-2 self-start text-sm font-semibold sm:inline-flex ${dark ? "text-[#7de1e5]" : "text-[#032aac]"}`}>
              {item.cta ?? "Explore"}
              <span className={`grid size-9 place-items-center rounded-full border transition group-hover:translate-x-1 motion-reduce:transform-none ${dark ? "border-white/25 group-hover:bg-white/10" : "border-[#b9d3e8] group-hover:bg-white"}`}><ArrowRight className="size-4" /></span>
            </span>
          )}
        </li>
      ))}
    </ScrollReveal>
  );
}

/* ─── Bento tiles ─── */
export function Tiles({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 }) {
  return <ScrollReveal stagger className={`grid gap-4 sm:gap-5 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>{children}</ScrollReveal>;
}

const tileTone = {
  light: "glass-card glass-lift text-[#031038]",
  dark: "border-white/10 bg-[linear-gradient(150deg,#10264d,#07142f)] text-white hover:border-[#19b5c9]/60",
  accent: "border-transparent bg-[radial-gradient(ellipse_at_90%_0%,rgba(63,185,230,.4),transparent_60%),linear-gradient(145deg,#0738b9,#032aac_55%,#062066)] text-white",
} as const;

export function Tile({
  tag,
  title,
  children,
  href,
  cta = "Explore",
  tone = "light",
  className = "",
  art,
}: {
  tag?: string;
  title: string;
  children: ReactNode;
  href?: string;
  cta?: string;
  tone?: keyof typeof tileTone;
  className?: string;
  art?: ArtKind;
}) {
  const light = tone === "light";
  return (
    <article className={`group relative flex min-h-full flex-col overflow-hidden rounded-[1.6rem] border p-7 transition duration-300 hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none sm:p-9 ${tileTone[tone]} ${light ? "shadow-[0_18px_40px_-30px_rgba(3,42,172,.4)]" : "shadow-[0_30px_70px_-40px_rgba(3,16,56,.9)]"} ${className}`}>
      {!light && <div aria-hidden="true" className="absolute -right-16 -top-16 size-56 rounded-full border border-white/10" />}
      {art && <CardArt kind={art} tone={light ? "light" : "dark"} className="relative mb-6" />}
      {tag && <p className={`relative font-mono text-[10px] font-semibold uppercase tracking-[.2em] ${light ? "text-[#176a8e]" : "text-[#7de1e5]"}`}>{tag}</p>}
      <h3 className="relative mt-3 font-display text-2xl font-semibold leading-tight tracking-tight sm:text-[1.7rem]">{title}</h3>
      <div className={`relative mt-3 flex-1 text-[15px] leading-7 ${light ? "text-[#52657c]" : "text-[#c5d2e7]"}`}>{children}</div>
      {href && (
        <Link href={href} className={`relative mt-7 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold after:absolute after:inset-[-3rem] after:content-[''] ${light ? "text-[#032aac]" : "text-[#b9f1e8]"} ${focusRing}`}>
          {cta}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
        </Link>
      )}
    </article>
  );
}

/* ─── Stat strip ─── */
export function StatStrip({ items, tone = "light" }: { items: { value: string; label: string }[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ScrollReveal as="dl" stagger className={`${dark ? "glass-card-dark" : "glass-card"} grid grid-cols-2 gap-px overflow-hidden rounded-[1.4rem] ${items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
      {items.map((item) => (
        <div key={item.label} className="p-6 sm:p-8 outline outline-1 -outline-offset-[0.5px] outline-[#9db8c9]/30">
          <dd className={`font-display text-4xl font-semibold tracking-tight sm:text-5xl ${dark ? "text-white" : "text-[#032aac]"}`}>{/^\d+$/.test(item.value) ? <CountUp to={Number(item.value)} /> : item.value}</dd>
          <dt className={`mt-2 font-mono text-[10px] uppercase tracking-[.16em] ${dark ? "text-white/55" : "text-[#52657c]"}`}>{item.label}</dt>
        </div>
      ))}
    </ScrollReveal>
  );
}

/* ─── Image + copy split ─── */
export function Split({
  src,
  alt,
  caption,
  reverse = false,
  children,
}: {
  src: string;
  alt: string;
  caption?: string;
  reverse?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`grid gap-8 ${reverse ? "[&>figure]:order-2" : ""}`}>
      <figure className="relative aspect-[16/10] overflow-hidden rounded-[1.8rem] border border-[#d3e4ee] bg-[#10264d] shadow-[0_30px_70px_-40px_rgba(3,16,56,.7)]">
        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#031038]/70 via-transparent to-transparent" />
        {caption && <figcaption className="absolute inset-x-0 bottom-0 p-5 font-mono text-[10px] uppercase tracking-[.16em] text-white/85 sm:p-6">{caption}</figcaption>}
      </figure>
      <div>{children}</div>
    </div>
  );
}

/* ─── Scope note ─── */
export function Notice({ label = "Scope", children }: { label?: string; children: ReactNode }) {
  return (
    <aside className="glass-card rounded-r-2xl border-l-[3px] border-l-[#19b5c9] p-6 sm:p-7">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#176a8e]">{label}</p>
      <div className="mt-2 text-[15px] leading-7 text-[#31485f]">{children}</div>
    </aside>
  );
}

/* ─── Steps: a connected process with glass nodes ─── */
export function Steps({ items, dark = false }: { items: { title: string; body: ReactNode; meta?: string }[]; dark?: boolean }) {
  return (
    <ScrollReveal as="ol" stagger className="relative grid gap-4 sm:gap-5">
      <span aria-hidden="true" className={`scroll-line absolute bottom-10 left-[1.65rem] top-10 w-px ${dark ? "bg-white/25" : "bg-[#6fa6c2]"}`} />
      {items.map((item, i) => (
        <li key={item.title} className={`${dark ? "glass-card-dark" : "glass-card"} relative grid grid-cols-[3.3rem_minmax(0,1fr)] gap-4 rounded-[1.4rem] p-5 sm:gap-6 sm:p-7`}>
          <span aria-hidden="true" className={`relative z-10 grid size-[3.3rem] place-items-center rounded-full font-mono text-sm font-semibold ${dark ? "bg-[#b9f1e8] text-[#062141]" : "bg-[#032aac] text-white shadow-[0_10px_24px_-10px_rgba(3,42,172,.8)]"}`}>{String(i + 1).padStart(2, "0")}</span>
          <div>
            {item.meta && <p className={`font-mono text-[10px] font-semibold uppercase tracking-[.18em] ${dark ? "text-[#7de1e5]" : "text-[#176a8e]"}`}>{item.meta}</p>}
            <h3 className={`mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl ${dark ? "text-white" : "text-[#031038]"}`}>{item.title}</h3>
            <div className={`mt-2 max-w-2xl text-[15px] leading-7 ${dark ? "text-[#c5d2e7]" : "text-[#52657c]"}`}>{item.body}</div>
          </div>
        </li>
      ))}
    </ScrollReveal>
  );
}

/* ─── Compare: row-by-row comparison of two approaches, stacked on mobile ─── */
export function Compare({
  left,
  right,
  rows,
}: {
  left: string;
  right: string;
  rows: { topic: string; a: ReactNode; b: ReactNode }[];
}) {
  return (
    <div className="glass-card overflow-hidden rounded-[1.6rem]">
      <div className="hidden grid-cols-[.8fr_1fr_1fr] gap-6 border-b border-[#c9dce8] bg-white/40 px-7 py-4 font-mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#176a8e] md:grid">
        <span>Topic</span><span>{left}</span><span className="text-[#032aac]">{right}</span>
      </div>
      <ScrollReveal as="dl" stagger>
        {rows.map((row) => (
          <div key={row.topic} className="grid gap-2 border-b border-[#c9dce8]/70 px-5 py-6 last:border-b-0 md:grid-cols-[.8fr_1fr_1fr] md:gap-6 md:px-7">
            <dt className="font-display text-lg font-semibold text-[#031038]">{row.topic}</dt>
            <dd className="text-[15px] leading-7 text-[#52657c]"><span className="mb-1 block font-mono text-[10px] uppercase tracking-[.16em] text-[#176a8e] md:hidden">{left}</span>{row.a}</dd>
            <dd className="text-[15px] leading-7 text-[#031038]"><span className="mb-1 block font-mono text-[10px] uppercase tracking-[.16em] text-[#032aac] md:hidden">{right}</span>{row.b}</dd>
          </div>
        ))}
      </ScrollReveal>
    </div>
  );
}

/* ─── Checklist: glass panel of verifiable items ─── */
export function Checklist({ title, items, dark = false }: { title?: string; items: ReactNode[]; dark?: boolean }) {
  return (
    <div className={`${dark ? "glass-card-dark" : "glass-card"} rounded-[1.6rem] p-6 sm:p-8`}>
      {title && <p className={`font-mono text-[10px] font-semibold uppercase tracking-[.2em] ${dark ? "text-[#7de1e5]" : "text-[#176a8e]"}`}>{title}</p>}
      <ScrollReveal as="ul" stagger className={`${title ? "mt-5" : ""} space-y-4`}>
        {items.map((item, i) => (
          <li key={i} className={`flex gap-3 text-[15px] leading-7 ${dark ? "text-[#dbe5f5]" : "text-[#31485f]"}`}>
            <svg aria-hidden="true" viewBox="0 0 20 20" className={`mt-1 size-5 shrink-0 ${dark ? "text-[#7de1e5]" : "text-[#032aac]"}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="8" /><path d="m6.5 10.2 2.4 2.4 4.6-5" /></svg>
            <span>{item}</span>
          </li>
        ))}
      </ScrollReveal>
    </div>
  );
}

/* ─── Card art: small decorative SVG animations, no JS ─── */
export type ArtKind = "wave" | "bars" | "gauge" | "scan" | "doc" | "nodes" | "tank" | "phone" | "shield" | "stack" | "flow" | "sync";

export function CardArt({ kind, tone = "light", className = "" }: { kind: ArtKind; tone?: "light" | "dark"; className?: string }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  let body: ReactNode;
  switch (kind) {
    case "wave":
      body = (<>
        <path className="a-drift" d="M0 40 C 20 18, 40 62, 60 40 S 100 18, 120 40" {...stroke} opacity=".9" />
        <path className="a-drift" style={{ animationDuration: "7s" }} d="M0 54 C 20 32, 40 76, 60 54 S 100 32, 120 54" {...stroke} opacity=".45" />
        <path className="a-drift" style={{ animationDuration: "9s" }} d="M0 26 C 20 4, 40 48, 60 26 S 100 4, 120 26" {...stroke} opacity=".3" />
      </>);
      break;
    case "bars":
      body = (<>
        {[14, 34, 22, 48, 36, 58].map((h, i) => <rect key={i} className={`a-bar d${(i % 4) + 1}`} x={6 + i * 19} y={68 - h} width="11" height={h} rx="3" fill="currentColor" opacity={0.35 + i * 0.1} />)}
        <path d="M0 70H120" {...stroke} opacity=".4" />
      </>);
      break;
    case "gauge":
      body = (<>
        <path d="M20 66 A40 40 0 0 1 100 66" {...stroke} opacity=".25" strokeWidth="7" />
        <path className="a-fill" style={{ ["--len" as string]: 126, ["--off" as string]: 38 }} d="M20 66 A40 40 0 0 1 100 66" {...stroke} strokeWidth="7" />
        <g className="a-bob"><circle cx="60" cy="62" r="4" fill="currentColor" /></g>
      </>);
      break;
    case "scan":
      body = (<>
        <rect x="34" y="8" width="52" height="52" rx="10" {...stroke} opacity=".6" />
        <path d="M44 24v-8h8M76 24v-8h-8M44 44v8h8M76 44v8h-8" {...stroke} />
        <circle className="a-ping" cx="60" cy="34" r="9" fill="currentColor" opacity=".35" />
        <circle cx="60" cy="34" r="4" fill="currentColor" />
      </>);
      break;
    case "doc":
      body = (<>
        <rect x="36" y="6" width="48" height="64" rx="7" {...stroke} opacity=".7" />
        <path d="M46 22h28M46 32h28M46 42h18" {...stroke} opacity=".6" />
        <rect className="a-sweep" x="36" y="26" width="16" height="3" rx="1.5" fill="currentColor" opacity=".7" />
        <path className="a-blink" d="M46 54l5 5 12-12" {...stroke} />
      </>);
      break;
    case "nodes":
      body = (<>
        <path className="a-drift" d="M20 56L50 22 86 50 106 18" {...stroke} opacity=".55" />
        {[[20, 56], [50, 22], [86, 50], [106, 18]].map(([x, y], i) => <circle key={i} className="a-blink" style={{ animationDelay: `${i * 0.5}s` }} cx={x} cy={y} r="5" fill="currentColor" />)}
      </>);
      break;
    case "tank":
      body = (<>
        <rect x="30" y="8" width="60" height="60" rx="12" {...stroke} opacity=".7" />
        <g className="a-bob"><path className="a-drift" d="M30 40 C 45 32, 60 48, 75 40 S 90 34, 90 40V56a12 12 0 0 1-12 12H42a12 12 0 0 1-12-12Z" fill="currentColor" opacity=".25" stroke="none" /></g>
        <path className="a-drift" d="M30 40 C 45 32, 60 48, 75 40 S 90 34, 90 40" {...stroke} />
      </>);
      break;
    case "phone":
      body = (<>
        <rect x="40" y="4" width="40" height="68" rx="9" {...stroke} opacity=".75" />
        <path d="M54 10h12" {...stroke} opacity=".5" />
        {[22, 34, 46].map((y, i) => <rect key={y} className={`a-blink`} style={{ animationDelay: `${i * 0.4}s` }} x="48" y={y} width="24" height="6" rx="3" fill="currentColor" opacity=".55" />)}
        <circle className="a-ping" cx="60" cy="62" r="4" fill="currentColor" opacity=".5" />
      </>);
      break;
    case "shield":
      body = (<>
        <path className="a-fill" style={{ ["--len" as string]: 220, ["--off" as string]: 0 }} d="M60 6 94 18v22c0 18-14 28-34 34C40 68 26 58 26 40V18Z" {...stroke} />
        <path className="a-blink" d="M46 38l10 10 18-20" {...stroke} />
      </>);
      break;
    case "stack":
      body = (<>
        {[8, 28, 48].map((y, i) => (
          <g key={y}>
            <rect x="22" y={y} width="76" height="16" rx="5" {...stroke} opacity=".7" />
            <circle className="a-blink" style={{ animationDelay: `${i * 0.6}s` }} cx="34" cy={y + 8} r="2.6" fill="currentColor" />
            <path d={`M50 ${y + 8}h36`} {...stroke} opacity=".4" />
          </g>
        ))}
      </>);
      break;
    case "flow":
      body = (<>
        <rect x="6" y="26" width="26" height="24" rx="7" {...stroke} opacity=".75" />
        <rect x="47" y="26" width="26" height="24" rx="7" {...stroke} opacity=".75" />
        <rect x="88" y="26" width="26" height="24" rx="7" {...stroke} opacity=".75" />
        <path className="a-drift" d="M32 38h15M73 38h15" {...stroke} />
        <circle className="a-ping" cx="101" cy="38" r="6" fill="currentColor" opacity=".35" />
      </>);
      break;
    case "sync":
      body = (<>
        <path className="a-drift" d="M30 34a30 30 0 0 1 54-12M90 42a30 30 0 0 1-54 12" {...stroke} />
        <path d="M84 8v14H70M36 68V54h14" {...stroke} />
      </>);
      break;
  }
  return (
    <div aria-hidden="true" className={`art ${tone === "dark" ? "art-dark" : ""} h-20 w-32 ${className}`}>
      <svg viewBox="0 0 120 76">{body}</svg>
    </div>
  );
}

/** Wraps arbitrary content in the same scroll reveal used by the kit. */
export function Reveal({ children, className = "", stagger = false }: { children: ReactNode; className?: string; stagger?: boolean }) {
  return <ScrollReveal stagger={stagger} className={className}>{children}</ScrollReveal>;
}

/* ─── Pull statement ─── */
export function PullStatement({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-[#031038] sm:text-3xl lg:text-[2.2rem]">
      <span aria-hidden="true" className="mb-5 block h-px w-14 bg-[#19b5c9]" />
      {children}
    </p>
  );
}

/* ─── Closing call-to-action band ─── */
export function CtaBand({
  title = "See it with your own workflow.",
  description = "Walk through the mobile app, the office platform and a finished report with the team.",
  primary = { href: "/request-demo", label: "Request a demo" },
  secondary = { href: "/sample-report", label: "See a sample report" },
}: {
  title?: string;
  description?: string;
  primary?: Action;
  secondary?: Action;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#031038] py-20 text-white sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_30%,rgba(25,181,201,.22),transparent_40%),radial-gradient(ellipse_at_10%_100%,rgba(27,79,209,.35),transparent_45%)]" />
      <div aria-hidden="true" className="absolute -right-40 -top-24 -z-10 size-[34rem] rounded-full border border-white/[.07]" />
      <div aria-hidden="true" className="absolute -right-16 top-4 -z-10 size-[22rem] rounded-full border border-white/[.07]" />
      <ScrollReveal className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-[#7de1e5] sm:text-xs">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-[#7de1e5] shadow-[0_0_16px_#7de1e5]" />
          Next step
        </p>
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1] tracking-[-.04em] sm:text-6xl">{title}</h2>
        <p className="mt-6 max-w-xl text-base leading-7 text-[#c5d2e7] sm:text-lg sm:leading-8">{description}</p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link href={primary.href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#b9f1e8] px-6 py-3 text-sm font-semibold text-[#062141] shadow-[0_12px_35px_-16px_rgba(125,225,229,.75)] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9f1e8] motion-reduce:transition-none">
            {primary.label}<ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
          <Link href={secondary.href} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/50 hover:bg-white/[.06] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9f1e8] motion-reduce:transition-none">
            {secondary.label}
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
