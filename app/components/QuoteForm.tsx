"use client";

import { useState } from "react";
import { quoteSchema } from "../lib/quote-schema";

export default function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    const parsed = quoteSchema.safeParse(data);
    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0]?.message ?? "Check the highlighted fields.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("done");
      setMessage("Thanks — your request has been received. We’ll follow up about your selected solution and implementation needs.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Could not send just now. Please try again or use the contact page.");
    }
  }

  if (status === "done") {
    return <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-sm">{message}</div>;
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-3 ${compact ? "" : "md:grid-cols-2"}`}>
      <input name="name" placeholder="Your name *" className="rounded-lg border p-3" required />
      <input name="email" type="email" placeholder="Work email *" className="rounded-lg border p-3" required />
      <input name="company" placeholder="Company / survey firm *" aria-label="Company or survey firm" className="rounded-lg border p-3" required />
      <input name="role" placeholder="Your role *" aria-label="Your role" className="rounded-lg border p-3" required />
      <label className="text-xs font-semibold text-slate-600">Solution<select name="solution" className="mt-2 w-full rounded-lg border bg-white p-3 text-sm font-normal" defaultValue="Space BQS"><option>Space BQS</option><option>Cargo WMS</option><option>Discuss both</option></select></label>
      <label className="text-xs font-semibold text-slate-600">Deployment preference<select name="deployment" className="mt-2 w-full rounded-lg border bg-white p-3 text-sm font-normal" defaultValue="Discuss options"><option>Discuss options</option><option>Public cloud</option><option>Private cloud</option><option>On-premises</option></select></label>
      <select name="teamSize" aria-label="Team size" required className="rounded-lg border bg-white p-3" defaultValue="">
        <option value="" disabled>Team size *</option>
        <option>1–5</option><option>6–20</option><option>21–50</option><option>50+</option>
      </select>
      <input name="volume" aria-label="Monthly survey or cargo volume" placeholder="Monthly surveys / cargo transactions (optional)" maxLength={100} className="rounded-lg border p-3" />
      <textarea name="message" aria-label="Your requirements" placeholder="Tell us about your workflows, migration files, or infrastructure requirements." maxLength={2000} className={`rounded-lg border p-3 ${compact ? "" : "md:col-span-2"}`} rows={4} />
      <div className={compact ? "" : "md:col-span-2"}>
        <button
          type="submit"
          disabled={status === "sending"}
          className="marine-shiny marine-shiny--primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50"
        >
          <span>{status === "sending" ? "Sending…" : "Request a demo / consultation"}</span>
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
        {status === "error" && <p role="alert" className="mt-3 text-sm text-red-700">{message}</p>}
        <p className="mt-2 text-xs text-slate-500">Discuss software, migration, or deployment. For BQS, we provide software—not survey attendance.</p>
      </div>
    </form>
  );
}
