import Link from "next/link";
import { ENGINE_VERSION } from "../lib/site";

const FOOTER_LINKS = {
  services: [
    { href: "/services", label: "All Services" },
    { href: "/services/bunker-delivery-survey", label: "Bunker Delivery" },
    { href: "/services/rob-survey", label: "ROB / On-Off Hire" },
    { href: "/services/debunkering-survey", label: "Debunkering" },
    { href: "/why-independent", label: "Why Independent" },
    { href: "/who-its-for", label: "Who Needs BQS" },
  ],
  product: [
    { href: "/platform", label: "Office Platform" },
    { href: "/mobile-app", label: "Deck Mobile Tool" },
    { href: "/how-we-measure", label: "Method (Table 54B)" },
    { href: "/features", label: "All Features" },
    { href: "/sample-report", label: "Sample Certificate" },
    { href: "/integrations-api", label: "API & Webhooks" },
    { href: "/security-audit", label: "Security & Locks" },
  ],
  company: [
    { href: "/pricing", label: "Pricing" },
    { href: "/request-demo", label: "Request a Demo" },
    { href: "/resources", label: "Resources" },
    { href: "/about", label: "About" },
    { href: "/changelog", label: "Changelog" },
    { href: "/contact", label: "Contact" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{
        background: "linear-gradient(180deg, #032AAC 0%, #031038 100%)",
      }}
    >
      {/* Top wave edge (simple CSS) */}
      <div
        className="absolute -top-px left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, var(--color-foam-50) 0%, transparent 100%)",
          maskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,0 L0,0Z' fill='white'/%3E%3C/svg%3E\")",
          WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,0 L0,0Z' fill='white'/%3E%3C/svg%3E\")",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      />

      <div className="mx-auto max-w-[1200px] px-4 pt-20 pb-8">
        {/* Link columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <span className="font-display text-xl font-bold text-white">
              Space BQS
            </span>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(247,251,253,0.6)" }}>
              Software for marine bunker surveyors and survey firms. Quantity-only: delivery, ROB, debunkering.
            </p>
            <div
              className="rounded-2xl p-4 text-xs"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(247,251,253,0.5)",
              }}
            >
              <span className="block font-semibold text-white text-[11px] uppercase tracking-wider mb-1">
                Quantity-Only Scope
              </span>
              No lab testing. No sludge. No sampling for quality.
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white mb-4">
              Services
            </p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.services.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(247,251,253,0.55)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Product */}
          <nav aria-label="Product">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white mb-4">
              Product
            </p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.product.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(247,251,253,0.55)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white mb-4">
              Company
            </p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(247,251,253,0.55)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-xs"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            color: "rgba(247,251,253,0.4)",
          }}
        >
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Space BQS.</span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            <span>Software for bunker surveyors.</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "#19B5C9" }}
              />
              <span style={{ color: "rgba(247,251,253,0.6)" }}>
                Engine v{ENGINE_VERSION}
              </span>
            </span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            <span>ASTM D1250-04 Table 54B</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/legal/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/llms.txt" className="hover:text-white transition-colors font-mono text-[11px]">
              llms.txt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
