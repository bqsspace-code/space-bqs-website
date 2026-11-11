"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import WaveDivider from "./WaveDivider";
import WaveTransition from "./WaveTransition";
import FlowingCenterRipple from "./FlowingCenterRipple";

export default function Footer({ hideCta = false }: { hideCta?: boolean }) {
  const pathname = usePathname();
  const isDemoPage = pathname === "/demo" || pathname === "/request-demo";
  const shouldShowCta = !hideCta && !isDemoPage;

  return (
    <footer className="relative text-white overflow-hidden bg-transparent">
      {/* ───────────────── 1. TOP WAVE DIVIDER ───────────────── */}
      <div className="relative w-full bg-transparent pointer-events-none select-none">
        {pathname === "/" ? (
          <WaveTransition variant="deep" to="#071E62" accent="#4e8deb" flip overlay={false} />
        ) : (
          <WaveDivider
            colors={["#A5D3E8", "#1B4FD1", "#071E62"]}
            alphas={[0.45, 0.22, 1.0]}
            depths={[0.35, 0.54, 0.74]}
            kinetic={true}
          />
        )}
      </div>

      {/* ───────────────── 2. PILOT CTA SECTION ───────────────── */}
      {shouldShowCta && (
        <section
          aria-label="Pilot CTA"
          className="relative -mt-px w-full pt-4 pb-20 sm:pb-24 lg:pb-28"
          style={{
            background:
              "linear-gradient(to bottom, #071E62, transparent 100px), radial-gradient(ellipse 80% 65% at 50% 25%, #071E62 0%, #051A59 55%, #031038 100%)",
          }}
        >
          {/* Dynamic Flowing Water Ripple and Pulsing Core */}
          <FlowingCenterRipple ringCount={3} speed={8.5} />

          {/* CTA Content */}
          <div className="relative z-10 pointer-events-auto mx-auto max-w-[1200px] px-6 text-center pt-8 sm:pt-12">
            {/* Eyebrow */}
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-blue-200/80 mb-4 sm:mb-5">
              YOUR NEXT QUANTITY JOB
            </p>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.12] mb-4 sm:mb-5 max-w-3xl mx-auto">
              Run a pilot with your team.
            </h2>

            {/* Subtext */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal">
              Bring one real job. We will walk it through capture, calculation, and certificate.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-white text-[#031038] font-semibold text-sm shadow-md hover:bg-slate-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Request a demo</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 11L11 3M11 3H5M11 3V9" />
                </svg>
              </Link>

              <Link
                href="/sample-report"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#081a4b]/80 border border-white/20 text-white font-medium text-sm hover:bg-[#0c2466] hover:border-white/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>See sample report</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 11L11 3H5M11 3V9" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ───────────────── 3. MAIN FOOTER LINKS ───────────────── */}
      <div className="relative w-full bg-[#020718]">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8 pt-16 sm:pt-20 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand info (lg: col 4) */}
            <div className="lg:col-span-4 space-y-4">
              <Link href="/" className="inline-flex items-center gap-2.5 text-white group">
                {/* Marine Wave triple-curve icon */}
                <svg
                  width="24"
                  height="20"
                  viewBox="0 0 24 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white flex-shrink-0"
                >
                  <path d="M3 5c3-2.5 6-2.5 9 0s6 2.5 9 0" />
                  <path d="M3 10c3-2.5 6-2.5 9 0s6 2.5 9 0" />
                  <path d="M3 15c3-2.5 6-2.5 9 0s6 2.5 9 0" />
                </svg>
                <span className="font-display text-xl font-bold tracking-tight text-white">
                  Space BQS
                </span>
              </Link>

              <p className="text-sm leading-relaxed text-slate-400 max-w-sm pt-1">
                Software for bunker surveyors.<br />
                Built for quantity. Made for proof.
              </p>

              <p className="text-sm text-slate-400 pt-2">
                We are not a survey company.
              </p>

              {/* ── Official Channels (matching 2nd image) ── */}
              <div className="pt-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400">
                    OFFICIAL CHANNELS
                  </span>
                  <span className="h-px w-20 bg-slate-700/60" />
                </div>

                {/* 5 Icons Row */}
                <div className="flex items-center gap-2.5">
                  {/* X */}
                  <a
                    href="https://x.com/spacebqs"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Space BQS on X"
                    className="w-10 h-10 rounded-xl bg-[#0f172a]/90 border border-cyan-500/60 flex items-center justify-center text-white hover:border-cyan-400 hover:bg-[#1e293b] transition-all shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  {/* GitHub */}
                  <a
                    href="https://github.com/bqsspace-code"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Space BQS on GitHub"
                    className="w-10 h-10 rounded-xl bg-[#0f172a]/90 border border-slate-700/70 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-[#1e293b] transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/@SPACEBQS"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Space BQS on YouTube"
                    className="w-10 h-10 rounded-xl bg-[#0f172a]/90 border border-slate-700/70 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-[#1e293b] transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/bqsspace/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Space BQS on Instagram"
                    className="w-10 h-10 rounded-xl bg-[#0f172a]/90 border border-slate-700/70 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-[#1e293b] transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  {/* Medium */}
                  <a
                    href="https://medium.com/@bqsspace"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Space BQS on Medium"
                    className="w-10 h-10 rounded-xl bg-[#0f172a]/90 border border-slate-700/70 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-[#1e293b] transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                    </svg>
                  </a>
                </div>

                {/* All official profiles & channels ↗ */}
                <div className="mt-3.5">
                  <Link
                    href="/social-media-platforms"
                    className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#38bdf8] hover:text-[#7dd3fc] transition-colors"
                  >
                    <span>All official profiles &amp; channels</span>
                    <span className="text-base font-normal">↗</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Links columns (lg: col 8 -> 4 subcolumns matching 1st image) */}
            <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
              {/* SOLUTIONS */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-4 sm:mb-5">
                  SOLUTIONS
                </p>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/solutions/space-bqs" className="text-slate-300 hover:text-white">Space BQS</Link></li>
                  <li><Link href="/solutions/cargo-wms" className="text-slate-300 hover:text-white">Cargo WMS</Link></li>
                  <li>
                    <Link
                      href="/services/bunker-delivery-survey"
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      Bunker delivery
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/rob-survey"
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      ROB survey
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/debunkering-survey"
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      Debunkering
                    </Link>
                  </li>
                </ul>
              </div>

              {/* SERVICES */}
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 sm:mb-5">
                  SERVICES
                </p>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/services/data-migration" className="text-slate-300 hover:text-white">Data migration</Link></li>
                  <li><Link href="/services/deployment" className="text-slate-300 hover:text-white">Deployment options</Link></li>
                  <li><Link href="/services" className="text-slate-300 hover:text-white">All services</Link></li>
                </ul>
              </div>

              {/* PRODUCT */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-4 sm:mb-5">
                  PRODUCT
                </p>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/mobile-app" className="text-slate-300 hover:text-white">Mobile app</Link></li>
                  <li><Link href="/platform" className="text-slate-300 hover:text-white">Web platform</Link></li>
                  <li><Link href="/tools" className="text-slate-300 hover:text-white">Free survey tools</Link></li>
                  <li>
                    <Link
                      href="/demo"
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      App &amp; product demo
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/how-we-measure"
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      How we measure
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sample-report"
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      Sample report
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>

              {/* COMPANY */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-4 sm:mb-5">
                  COMPANY
                </p>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/resources" className="text-slate-300 hover:text-white">Resources</Link></li>
                  <li><Link href="/why-independent" className="text-slate-300 hover:text-white">Why independent</Link></li>
                  <li>
                    <Link
                      href="/about"
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      About Space BQS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/request-demo"
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      Request a demo
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ───────────────── 4. DISTINCT BOTTOM BAR (matching 1st image) ───────────────── */}
        <div className="w-full bg-[#010410]/50">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © {new Date().getFullYear()} Space BQS
            </div>

            {/* Pill: ✦ POWERED BY aibizmod (matching 1st image) */}
            <a
              href="https://aibizmod.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-gradient-to-r from-blue-900/30 via-slate-900/40 to-blue-900/30 px-5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all hover:border-cyan-400/40 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-cyan-200"
            >
              <span className="text-cyan-300 text-sm leading-none font-bold">✦</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">POWERED BY</span>
              <span className="text-sm font-semibold tracking-tight text-white">aibizmod</span>
            </a>

            <div className="text-slate-400 text-right">
              Quantity. Confidence. Proof.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
