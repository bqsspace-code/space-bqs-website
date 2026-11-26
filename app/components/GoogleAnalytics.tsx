"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { ANALYTICS_CONSENT_EVENT, hasAnalyticsConsent } from "../lib/analytics-consent";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const validMeasurementId = measurementId && /^G-[A-Z0-9]+$/.test(measurementId) ? measurementId : null;

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const updateConsent = () => setEnabled(hasAnalyticsConsent());
    updateConsent();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, updateConsent);
    return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, updateConsent);
  }, []);

  if (!enabled || !validMeasurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${validMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="space-bqs-ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; window.gtag = window.gtag || function(){window.dataLayer.push(arguments);}; window.gtag('js', new Date()); window.gtag('config', '${validMeasurementId}');`}
      </Script>
    </>
  );
}
