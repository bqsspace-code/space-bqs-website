"use client";

import Link from "next/link";
import { track, type AnalyticsEvent } from "../lib/analytics";

/** Link that fires an analytics event on click. Usable from server components. */
export default function TrackLink({
  href,
  event,
  params,
  className,
  children,
}: {
  href: string;
  event: AnalyticsEvent;
  params?: Record<string, string>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => track(event, params ?? {})}
    >
      {children}
    </Link>
  );
}
