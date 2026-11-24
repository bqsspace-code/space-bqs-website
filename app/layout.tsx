import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import GlassInteractions from "./components/GlassInteractions";


import { SITE_URL, SITE_NAME, CONTACT_EMAIL } from "./lib/site";
import PageProgress from "./components/PageProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["wdth"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Next resolves "./" against the current route, including dynamic slugs.
  alternates: { canonical: "./" },
  title: {
    default: `${SITE_NAME} — BQS Software for Marine Surveyors`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Space BQS is software for bunker surveyors and survey firms: offline mobile capture, temperature-corrected MT engine, locked certificates, fleet dashboard. Quantity-only.",
    openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — BQS software for surveyors`,
    description:
      "Software for survey firms: offline capture, temperature-corrected MT engine, locked PDF certificates, fleet dashboard. Quantity-only.",
  },
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ["AI BQS", "Space BQS Marine"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logo.png`,
        caption: `${SITE_NAME} Logo`,
      },
      description:
        "Deterministic Bunker Quantity Survey (BQS) calculation software and offline mobile platform for independent marine fuel surveyors, inspection agencies, and vessel charterers.",
      sameAs: [
        "https://www.linkedin.com/company/space-bqs",
        "https://x.com/spacebqs",
        "https://github.com/bqsspace-code",
        "https://www.youtube.com/@SPACEBQS",
        "https://www.instagram.com/bqsspace",
        "https://apps.apple.com/sg/app/space-bqs/id6812992991",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: CONTACT_EMAIL,
        contactType: "customer support",
        areaServed: "Global",
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "Space BQS Platform",
      operatingSystem: "iOS 16.0+, Android 12.0+, Web (Modern Browsers)",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Maritime Logistics & Inspection Software",
      description:
        "Professional Bunker Quantity Survey software suite for marine surveyors. Combines an offline mobile deck app with a tamper-evident ASTM Table 54B calculation engine, automated tank sounding interpolation, locked PDF certificates, and audit-ready Excel packages.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description:
          "Commercial team license based on active surveyors and monthly survey volume. Pilot workspace available upon request.",
      },
      featureList: [
        "ASTM D1250 Table 54B Volume Correction Factor (VCF) Engine",
        "72-Hour Zero-Connectivity Deck Offline Lease",
        "QR Vessel Identification & Tank Strapping Curve Interpolation",
        "Locked Cryptographic PDF Certificate Generation",
        "Four-Sheet Raw Data Audit Excel Package",
        "Three Dedicated Workflows: Bunker Delivery vs BDN, On/Off-Hire ROB Settlement, Debunkering Removal",
        "Quantity-Only Independent Verification Scope",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bricolage.variable} ${jetbrainsMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
        <SmoothScroll>
          <GlassInteractions />
          <Header />
          <main>{children}</main>
          <Footer />
          <PageProgress />
        </SmoothScroll>
      </body>
    </html>
  );
}
