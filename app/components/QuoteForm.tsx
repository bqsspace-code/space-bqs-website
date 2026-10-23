"use client";

import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Your name required"),
  email: z.string().email("Valid work email required"),
  company: z.string().min(2, "Survey firm / company required"),
  role: z.string().min(2, "Your role required"),
  teamSize: z.string().min(1, "Team size required"),
  volume: z.string().optional(),
  message: z.string().max(2000).optional(),
});

export default function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0]?.message ?? "Check the highlighted fields.");
      return;
    }
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("done");
      setMessage("Thanks — we received your request. We reply with a demo slot and pilot plan for your team.");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("Could not send just now. Please email ops with your firm, team size and volume.");
    }
  }

  if (status === "done") {
    return <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-sm">{message}</div>;
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-3 ${compact ? "" : "md:grid-cols-2"}`}>
      <input name="name" placeholder="Your name *" className="rounded-lg border p-3" required />
      <input name="email" type="email" placeholder="Work email *" className="rounded-lg border p-3" required />
      <input name="company" placeholder="Survey firm / company *" className="rounded-lg border p-3" required />
      <input name="role" placeholder="Your role (ops manager, lead surveyor…) *" className="rounded-lg border p-3" required />
      <select name="teamSize" className="rounded-lg border p-3" defaultValue="">
        <option value="" disabled>Surveyors on team *</option>
        <option>1–5</option><option>6–20</option><option>21–50</option><option>50+</option>
      </select>
      <select name="volume" className="rounded-lg border p-3" defaultValue="">
        <option value="">Surveys per month (if known)</option>
        <option>1–10</option><option>11–50</option><option>51–200</option><option>200+</option>
      </select>
      <textarea name="message" placeholder="What should the demo cover? Ports you serve, grades, current tools" className="rounded-lg border p-3 md:col-span-2" rows={4} />
      <div className="md:col-span-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#032AAC] hover:bg-[#1B4FD1] text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <span>Request a demo</span>
          <svg
            width="13"
            height="13"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 11L11 3M11 3H5M11 3V9" />
          </svg>
        </button>
        <p className="mt-2 text-xs text-slate-500">For survey firms evaluating software — not a per-job booking form.</p>
      </div>
    </form>
  );
}
