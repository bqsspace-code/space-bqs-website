import Link from "next/link";

export const metadata = { title: "Page not found — Space BQS" };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-32 sm:pt-40 pb-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="grad-text mt-3 text-4xl font-bold">That sounding missed the tank.</h1>
      <p className="mt-4 text-[var(--text-mid)]">
        The page you looked for isn&apos;t on board. Try the services hub or ask us for a demo.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/services"
          className="grad-cta px-6 py-3 font-semibold"
        >
          Browse services
        </Link>
        <Link href="/demo" className="rounded-full border border-[var(--line)] px-6 py-3 font-semibold text-[var(--text-mid)]">
          Request a demo
        </Link>
      </div>
    </div>
  );
}
