import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import GlassInteractions from "./components/GlassInteractions";


import { SITE_URL, SITE_NAME } from "./lib/site";
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
      name: SITE_NAME,
      url: SITE_URL,
      description:
        "BQS software for marine surveyors and survey firms: delivery, ROB and debunkering workflows. Quantity-only.",
    },
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
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
