"use client";

import type { MouseEvent, ReactNode } from "react";
import { track } from "../lib/analytics";

/** Fires the existing market CTA events for any request-demo link inside, so shared page components stay server-rendered. */
export default function MarketCtaTracker({ market, children }: { market: string; children: ReactNode }) {
  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='/request-demo']");
    if (!anchor) return;
    const isPilot = anchor.getAttribute("href")?.includes("intent=pilot");
    track("cta_click", { target: isPilot ? "market_pilot" : "market_demo", market });
  };
  return <div onClick={onClick}>{children}</div>;
}
