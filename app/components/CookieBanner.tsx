"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "spacebqs-cookie-ok";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const accept = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* private mode — banner simply returns next visit */
    }
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie notice"
      className="liquid-glass-ui liquid-glass-ui--dark fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line)] p-4"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
        <p className="flex-1 text-sm text-[var(--text-mid)]">
          We use essential cookies to run the site and remember this choice, plus optional
          analytics to understand visits. <Link href="/legal/cookies" className="underline">Cookie policy</Link>
        </p>
        <button
          onClick={accept}
          className="grad-cta px-5 py-2 text-sm font-semibold"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
