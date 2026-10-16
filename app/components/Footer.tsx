import Link from "next/link";
import { ENGINE_VERSION } from "../lib/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-4">
        <div>
          <p className="font-display font-bold">Space BQS</p>
          <p className="mt-2 text-sm text-slate-600">
            Software for bunker surveyors and survey firms. Offline capture, corrected MT engine,
            locked certificates, fleet dashboard. Quantity-only.
          </p>
        </div>
        <nav aria-label="Services">
          <p className="text-sm font-semibold">Services</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li><Link href="/services">All services</Link></li>
            <li><Link href="/services/bunker-delivery-survey">Bunker delivery</Link></li>
            <li><Link href="/services/rob-survey">ROB / On-Off hire</Link></li>
            <li><Link href="/services/debunkering-survey">Debunkering</Link></li>
            <li><Link href="/why-independent">Why independent</Link></li>
            <li><Link href="/who-its-for">Who it&apos;s for</Link></li>
          </ul>
        </nav>
        <nav aria-label="Product">
          <p className="text-sm font-semibold">Product</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/platform">Platform</Link></li>
            <li><Link href="/mobile-app">Mobile app</Link></li>
            <li><Link href="/integrations-api">Integrations & API</Link></li>
            <li><Link href="/security-audit">Security & audit</Link></li>
            <li><Link href="/how-we-measure">How it calculates</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/sample-report">Sample report</Link></li>
            <li><Link href="/demo">Demo</Link></li>
          </ul>
        </nav>
        <nav aria-label="Company">
          <p className="text-sm font-semibold">Company</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/partners">Partners</Link></li>
            <li><Link href="/customers">Customers</Link></li>
            <li><Link href="/changelog">Changelog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/demo">Request a demo</Link></li>
            <li><Link href="/resources">Resources</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-slate-500">
          <span>© Space BQS · Quantity surveys only</span>
          <span>Engine v{ENGINE_VERSION} · ASTM D1250 Table 54B</span>
          <span>
            <Link href="/legal/privacy" className="underline">Privacy</Link>
            {" · "}
            <Link href="/legal/terms" className="underline">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
