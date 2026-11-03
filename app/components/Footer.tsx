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
        {pathname === "/" ? <WaveTransition variant="deep" to="#071E62" accent="#4e8deb" flip overlay={false} /> : <WaveDivider
          colors={["#A5D3E8", "#1B4FD1", "#071E62"]}
          alphas={[0.45, 0.22, 1.0]}
          depths={[0.35, 0.54, 0.74]}
          kinetic={true}
        />}
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
            {/* Brand info (lg: col 5) */}
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
            </div>

            {/* Links columns (lg: col 7 -> 3 subcolumns) */}
            <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
              {/* WORKFLOWS */}
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

              <div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 sm:mb-5">SERVICES</p><ul className="space-y-3 text-sm"><li><Link href="/services/data-migration" className="text-slate-300 hover:text-white">Data migration</Link></li><li><Link href="/services/deployment" className="text-slate-300 hover:text-white">Deployment options</Link></li><li><Link href="/services" className="text-slate-300 hover:text-white">All services</Link></li></ul></div>

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

        {/* ───────────────── 4. DISTINCT BOTTOM BAR ───────────────── */}
        <div className="w-full bg-[#010410]/50">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © {new Date().getFullYear()} Space BQS
            </div>



            <div className="text-slate-400 text-right">
              Quantity. Confidence. Proof.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
