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
    <form onSubmit={onSubmit} className={`quote-form grid gap-5 ${compact ? "" : "md:grid-cols-2"}`}>
      <label className="quote-field">Your name <span aria-hidden="true">*</span><input name="name" autoComplete="name" placeholder="Your full name" className="rounded-lg border p-3" required /></label>
      <label className="quote-field">Work email <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" className="rounded-lg border p-3" required /></label>
      <label className="quote-field">Company / survey firm <span aria-hidden="true">*</span><input name="company" autoComplete="organization" placeholder="Company name" className="rounded-lg border p-3" required /></label>
      <label className="quote-field">Your role <span aria-hidden="true">*</span><input name="role" autoComplete="organization-title" placeholder="Your role" className="rounded-lg border p-3" required /></label>
      <label className="quote-field">Solution<select name="solution" className="rounded-lg border bg-white p-3" defaultValue="Space BQS"><option>Space BQS</option><option>Cargo WMS</option><option>Discuss both</option></select></label>
      <label className="quote-field">Deployment preference<select name="deployment" className="rounded-lg border bg-white p-3" defaultValue="Discuss options"><option>Discuss options</option><option>Public cloud</option><option>Private cloud</option><option>On-premises</option></select></label>
      <label className="quote-field">Team size <span aria-hidden="true">*</span><select name="teamSize" required className="rounded-lg border bg-white p-3" defaultValue="">
        <option value="" disabled>Team size *</option>
        <option>1–5</option><option>6–20</option><option>21–50</option><option>50+</option>
      </select></label>
      <label className="quote-field">Monthly volume <span className="quote-optional">Optional</span><input name="volume" placeholder="Surveys / cargo transactions" maxLength={100} className="rounded-lg border p-3" /></label>
      <label className={`quote-field ${compact ? "" : "md:col-span-2"}`}>Tell us about your operation <span className="quote-optional">Optional</span><textarea name="message" placeholder="Tell us about your workflows, migration files, or infrastructure requirements." maxLength={2000} className="rounded-lg border p-3" rows={4} /></label>
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
