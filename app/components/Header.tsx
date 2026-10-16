import Link from "next/link";

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/features", label: "Features" },
  { href: "/platform", label: "Platform" },
  { href: "/how-we-measure", label: "Method" },
  { href: "/why-independent", label: "Why Independent" },
  { href: "/pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-display text-lg font-bold text-ocean-950">
          Space BQS
          <span className="ml-2 hidden rounded-full bg-ocean-100 px-2 py-0.5 text-xs font-medium text-ocean-900 sm:inline">
            Software for surveyors
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-5 text-sm lg:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-slate-600 hover:text-ocean-700">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/demo"
            className="hidden rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium sm:block"
          >
            Demo
          </Link>
          <Link
            href="/sample-report"
            className="hidden rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium sm:block"
          >
            Sample report
          </Link>
          <Link
            href="/request-demo"
            className="rounded-lg bg-ocean-900 px-4 py-2 text-sm font-semibold text-white hover:bg-ocean-700"
          >
            Request a demo
          </Link>
        </div>
      </div>
      <nav aria-label="Mobile" className="flex gap-4 overflow-x-auto border-t border-slate-100 px-4 py-2 text-sm lg:hidden">
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="whitespace-nowrap text-slate-600">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
