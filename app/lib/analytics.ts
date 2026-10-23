export type AnalyticsEvent =
  | "cta_click"
  | "demo_submit"
  | "sample_report_view"
  | "scroll_beat_view"
  | "book_survey_submit";

export function track(event: AnalyticsEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: Array<Record<string, unknown>>;
  };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
