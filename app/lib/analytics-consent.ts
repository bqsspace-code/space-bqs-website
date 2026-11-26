export const ANALYTICS_CONSENT_KEY = "spacebqs-analytics-consent";
export const ANALYTICS_CONSENT_EVENT = "spacebqs:analytics-consent-change";

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(ANALYTICS_CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}
