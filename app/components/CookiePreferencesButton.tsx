"use client";

import { ANALYTICS_CONSENT_EVENT, ANALYTICS_CONSENT_KEY } from "../lib/analytics-consent";

export default function CookiePreferencesButton() {
  function reopenPreferences() {
    try {
      window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
    } catch {
      // The notice will remain available when storage is blocked.
    }
    window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
  }

  return (
    <button type="button" onClick={reopenPreferences} className="mt-6 rounded-full border border-[#b9d3e8] bg-white px-4 py-2 text-sm font-semibold text-[#032aac] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#032aac]">
      Manage analytics preferences
    </button>
  );
}
