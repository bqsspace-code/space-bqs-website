"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { FLIGHT_KEYS, FLIGHT_VARIANTS } from "./variants";

export default function PreviewSwitcher() {
  const pathname = usePathname();
  return <nav className="flight-preview-switcher" aria-label="Compare container journey previews">
    <Link href="/previews/container-journey" className="flight-preview-index" aria-current={pathname === "/previews/container-journey" ? "page" : undefined}>VIDEO LAB<span>Compare concepts</span></Link>
    <div className="flight-preview-options">{FLIGHT_KEYS.map(key => <Link key={key} href={`/previews/container-journey/${key}`} prefetch={false} aria-current={pathname.endsWith(`/${key}`) ? "page" : undefined}><span>{FLIGHT_VARIANTS[key].letter}</span>{FLIGHT_VARIANTS[key].name}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>)}</div>
  </nav>;
}
