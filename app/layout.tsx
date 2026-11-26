import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import GlassInteractions from "./components/GlassInteractions";
import CookieBanner from "./components/CookieBanner";
import GoogleAnalytics from "./components/GoogleAnalytics";


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

const searchVerification: NonNullable<Metadata["verification"]> = {
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : {}),
  ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
    ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
    : {}),
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
// Next resolves "./" against the current route, including dynamic slugs.
  alternates: { canonical: "./" },
  verification: searchVerification,
  title: {
    default: `Bunker Quantity Survey Software | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Bunker quantity survey software for marine survey teams. Capture tank readings offline, review calculations, and issue PDF and Excel survey reports.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `Bunker Quantity Survey Software | ${SITE_NAME}`,
    description:
      "Bunker quantity survey software for marine survey teams. Capture tank readings offline, review calculations, and issue PDF and Excel survey reports.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: `Bunker Quantity Survey Software | ${SITE_NAME}`,
    description:
      "Software for bunker survey teams: capture tank readings offline, review calculations, and issue PDF and Excel reports.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/linkedin/space-bqs-wave-linkedin-transparent-800x800.png`,
        caption: `${SITE_NAME} Logo`,
      },
      description:
        "Bunker Quantity Survey software for marine survey firms and inspection teams.",
      sameAs: [
        "https://www.linkedin.com/company/space-bqs",
        "https://x.com/spacebqs",
        "https://github.com/bqsspace-code",
        "https://www.youtube.com/@SPACEBQS",
        "https://www.instagram.com/bqsspace",
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
      name: "Space BQS",
      url: `${SITE_URL}/solutions/space-bqs`,
      operatingSystem: "iOS, Android, Web",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Bunker Quantity Survey Software",
      description:
        "Bunker Quantity Survey software for marine survey teams, with mobile capture and a web platform for review and report workflows.",
      downloadUrl: [
        "https://apps.apple.com/in/app/space-bqs/id6812992991",
        "https://play.google.com/store/apps/details?id=com.spaceai.bqs",
      ],
      featureList: [
        "Mobile capture for bunker survey workflows",
        "Offline work with later synchronization",
        "Web-based survey review",
        "PDF and Excel report workflows",
        "Delivery, ROB, and debunkering workflows",
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
        <GoogleAnalytics />
        <CookieBanner />
      </body>
    </html>
  );
}
