"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { quoteSchema, COMPANY_SIZES, ORGANIZATION_TYPES } from "../lib/quote-schema";
import { track } from "../lib/analytics";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

interface QuoteFormProps {
  compact?: boolean;
  formType?: string;
  initialCountry?: string;
}

export default function QuoteForm({ compact = false, formType = "space-bqs", initialCountry = "" }: QuoteFormProps) {
  const reducedMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const [message, setMessage] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const startedRef = useRef(false);
  const [pilotIntent, setPilotIntent] = useState(false);

  useEffect(() => {
    const syncIntent = () => setPilotIntent(window.location.hash === "#pilot");
    syncIntent();
    window.addEventListener("hashchange", syncIntent);
    return () => window.removeEventListener("hashchange", syncIntent);
  }, []);

  function onFormFocus() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("demo_form_start", { formType });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const submissionType = window.location.hash === "#pilot" ? "space-bqs-pilot" : formType;
    const data = { ...Object.fromEntries(fd.entries()), formType: submissionType };
    const parsed = quoteSchema.safeParse(data);

    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0]?.message ?? "Check the highlighted fields.");
      track("demo_form_error", { formType: submissionType, reason: "validation" });
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; id?: string; error?: string } | null;

      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Submit failed");
      }

      track("demo_submit", {
        formType: parsed.data.formType,
        lead_type: parsed.data.formType === "space-bqs-pilot" ? "pilot" : "demo",
      });

      setSubmittedEmail(parsed.data.email);
      setReferenceId(json.id ?? null);
      setStatus("done");
      setMessage(parsed.data.formType === "space-bqs-pilot"
        ? "Thanks — your pilot enquiry is saved. We’ll follow up to discuss fit and scope."
        : "Thanks — your demo request is saved. We’ll follow up with next steps for your team.");
      form.reset();
    } catch (err) {
      setStatus("error");
      track("demo_form_error", { formType: parsed.data.formType, reason: "submission" });
      setMessage(
        err instanceof Error && err.message !== "Submit failed"
          ? err.message
          : "Could not send just now. Please try again or use the contact details in the header.",
      );
    }
  }

  function handleReset() {
    setStatus("idle");
    setMessage("");
    setSubmittedEmail("");
    setReferenceId(null);
  }

  if (status === "done") {
    return (
      <motion.div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: EASE_OUT }}
        className="rounded-2xl border border-[#bde0d3] bg-gradient-to-br from-[#f2fcf8] via-[#ebf9f3] to-[#e4f5f8] p-6 shadow-[0_14px_34px_-16px_rgba(3,42,172,0.14),inset_0_1px_0_#ffffff]"
      >
        <div className="flex items-start gap-3.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0e7a52] shadow-2xs ring-1 ring-[#bde0d3]">
            <CheckCircle2 className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg font-semibold text-[#031038]">
              Request received
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-[#35544d]">{message}</p>
            {(submittedEmail || referenceId) && (
              <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#3f6473]">
                {submittedEmail && (
                  <span className="rounded-full border border-[#cce5df] bg-white/80 px-2.5 py-0.5">
                    {submittedEmail}
                  </span>
                )}
                {referenceId && (
                  <span className="rounded-full border border-[#cce5df] bg-white/80 px-2.5 py-0.5">
                    Ref #{referenceId.slice(-6).toUpperCase()}
                  </span>
                )}
              </div>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[#b9d3e8] bg-white px-4 py-2 text-xs font-semibold text-[#032aac] shadow-2xs transition-transform duration-150 hover:bg-[#f5faff] active:scale-[0.97] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-[#032aac]"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              <span>Send another request</span>
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  const isSending = status === "sending";

  return (
    <form onSubmit={onSubmit} onFocusCapture={onFormFocus} className={`quote-form grid gap-5 ${compact ? "" : "md:grid-cols-2"}`}>
      <label className="quote-field">
        Your name <span aria-hidden="true">*</span>
        <input name="name" autoComplete="name" placeholder="Your full name" disabled={isSending} className="rounded-lg border p-3" required />
      </label>

      <label className="quote-field">
        Work email <span aria-hidden="true">*</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          disabled={isSending}
          className="rounded-lg border p-3"
          required
        />
      </label>

      <label className="quote-field">
        Phone number <span className="quote-optional">Optional</span>
        <input
          name="phoneNumber"
          type="tel"
          autoComplete="tel"
          placeholder="+1 (555) 123-4567"
          maxLength={40}
          disabled={isSending}
          className="rounded-lg border p-3"
        />
      </label>

      <label className="quote-field">
        Company <span aria-hidden="true">*</span>
        <input
          name="company"
          autoComplete="organization"
          placeholder="Company name"
          disabled={isSending}
          className="rounded-lg border p-3"
          required
        />
      </label>

      <label className="quote-field">
        Team size <span aria-hidden="true">*</span>
        <select
          name="companySize"
          disabled={isSending}
          className="rounded-lg border bg-white p-3"
          defaultValue=""
          required
        >
          <option value="" disabled>Select team size</option>
          {COMPANY_SIZES.map((size) => (
            <option key={size} value={size}>
              {size} team members
            </option>
          ))}
        </select>
      </label>

      <label className="quote-field">
        Country <span aria-hidden="true">*</span>
        <input name="country" autoComplete="country-name" placeholder="Country where your team operates" defaultValue={initialCountry} maxLength={100} disabled={isSending} className="rounded-lg border p-3" required />
      </label>

      <label className="quote-field">
        Organization type <span aria-hidden="true">*</span>
        <select name="organizationType" disabled={isSending} className="rounded-lg border bg-white p-3" defaultValue="" required>
          <option value="" disabled>Select organization type</option>
          {ORGANIZATION_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </label>

      <label className={`quote-field ${compact ? "" : "md:col-span-2"}`}>
        Project details <span className="quote-optional">Optional</span>
        <textarea
          name="projectDetails"
          placeholder="Tell us about your bunker survey workflows or what your team wants to evaluate."
          maxLength={1500}
          disabled={isSending}
          className="rounded-lg border p-3"
          rows={3}
        />
      </label>

      <div className={compact ? "" : "md:col-span-2"}>
        <button
          type="submit"
          disabled={isSending}
          className="marine-shiny marine-shiny--primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50"
        >
          <span>{isSending ? "Sending…" : pilotIntent ? "Discuss a pilot" : "Request a demo"}</span>
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
        {status === "error" && (
          <p
            role="alert"
            className="mt-3 rounded-xl border border-red-200 bg-red-50/90 px-4 py-2.5 text-sm text-red-700"
          >
            {message}
          </p>
        )}
        <p className="mt-2.5 text-xs text-slate-500">
          Space BQS provides survey software, not survey attendance. Read our <Link href="/legal/privacy" className="underline underline-offset-2">privacy information</Link> before submitting.
        </p>
      </div>
    </form>
  );
}
