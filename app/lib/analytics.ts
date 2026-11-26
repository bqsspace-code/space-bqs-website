export type AnalyticsEvent =
  | "cta_click"
  | "demo_form_start"
  | "demo_submit"
  | "demo_form_error"
  | "app_store_click"
  | "sample_report_view"
  | "scroll_beat_view"
  | "book_survey_submit";

export function track(event: AnalyticsEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const consentKey = "spacebqs-analytics-consent";
  try {
    if (window.localStorage.getItem(consentKey) !== "granted") return;
  } catch {
    return;
  }
  const w = window as unknown as {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  w.gtag = w.gtag || function () {
    w.dataLayer!.push(arguments as unknown as Record<string, unknown>);
  };
  const providerEvent = event === "demo_submit" ? "generate_lead" : event;
  w.gtag("event", providerEvent, params);
}
