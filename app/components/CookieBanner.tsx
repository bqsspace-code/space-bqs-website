"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ANALYTICS_CONSENT_EVENT, ANALYTICS_CONSENT_KEY } from "../lib/analytics-consent";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const syncVisibility = (event?: Event) => {
      if (event instanceof CustomEvent && (event.detail === "granted" || event.detail === "denied")) {
        setShow(false);
        return;
      }
      try {
        setShow(!localStorage.getItem(ANALYTICS_CONSENT_KEY));
      } catch {
        setShow(true);
      }
    };
    syncVisibility();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, syncVisibility);
    return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, syncVisibility);
  }, []);

  if (!show) return null;

  const choose = (value: "granted" | "denied") => {
    try {
      localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
    } catch {
      // Optional analytics stay disabled if preferences cannot be saved.
    }
    window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: value }));
    setShow(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie and analytics preferences"
      className="liquid-glass-ui liquid-glass-ui--dark fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line)] p-4"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
        <p className="flex-1 text-sm text-[var(--text-mid)]">
          This site uses browser storage for essential preferences. Optional analytics load only if configured and you allow them. Read the <Link href="/legal/cookies" className="underline">cookie information</Link>.
        </p>
        <button
          onClick={() => choose("denied")}
          className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
        >
          Essential only
        </button>
        <button
          onClick={() => choose("granted")}
          className="grad-cta px-5 py-2 text-sm font-semibold"
        >
          Allow analytics
        </button>
      </div>
    </div>
  );
}
