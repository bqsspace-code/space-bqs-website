"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Document progress outside the navbar, updated at most once per frame. */
export default function PageProgress() {
  const pathname = usePathname();
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setPercent(distance > 0 ? Math.round(Math.min(1, Math.max(0, window.scrollY / distance)) * 100) : 100);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [pathname]);
  return <div role="progressbar" aria-label="Page reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} className="pointer-events-none fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-[calc(env(safe-area-inset-right)+1rem)] z-40 hidden size-11 items-center justify-center rounded-full border border-[#c4ddec] bg-white/90 shadow-lg backdrop-blur-sm print:hidden sm:flex">
    <svg aria-hidden="true" viewBox="0 0 44 44" className="absolute inset-0 size-11 -rotate-90"><circle cx="22" cy="22" r="18" fill="none" stroke="#dbeaf5" strokeWidth="2" /><circle cx="22" cy="22" r="18" fill="none" stroke="#032aac" strokeWidth="2" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - percent} strokeLinecap="round" /></svg>
    <span className="font-mono text-[9px] font-semibold tabular-nums text-[#032aac]">{percent}%</span>
  </div>;
}
