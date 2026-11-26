import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";
import { RESOURCES } from "./lib/resources";
import { TOOLS } from "./lib/tools";
import { ALL_PORTS } from "./lib/ports";
import { ALL_GLOSSARY_TERMS } from "./lib/glossary";
import { MARKETS } from "./markets/market-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = [
    "",
    "/solutions",
    "/solutions/space-bqs",
    "/solutions/cargo-wms",
    "/services/data-migration",
    "/services/deployment",
    "/tools",
    "/services",
    "/services/bunker-delivery-survey",
    "/services/rob-survey",
    "/services/debunkering-survey",
    "/features",
    "/features/survey-register-dashboard",
    "/features/calculation-audit",
    "/features/vessels-master-data",
    "/features/reports-ai",
    "/platform",
    "/mobile-app",
    "/how-we-measure",
    "/order-lifecycle",
    "/portal-roadmap",
    "/why-independent",
    "/who-its-for",
    "/integrations-api",
    "/security-audit",
    "/sample-report",
    "/pricing",
    "/demo",
    "/partners",
    "/customers",
    "/changelog",
    "/request-demo",
    "/resources",
    "/ports",
    "/glossary",
    "/videos",
    "/about",
    "/contact",
    "/social-media-platforms",
    "/markets",
  ];
  return [
    ...statics.map((p) => ({ url: `${SITE_URL}${p || "/"}` })),
    ...TOOLS.map((tool) => ({ url: `${SITE_URL}/tools/${tool.slug}` })),
    ...MARKETS.filter((market) => market.publishable !== false).map((market) => ({ url: `${SITE_URL}/markets/${market.slug}` })),
    ...RESOURCES.map((r) => ({ url: `${SITE_URL}/resources/${r.slug}`, lastModified: new Date(r.updated) })),
    ...ALL_PORTS.map((port) => ({ url: `${SITE_URL}/ports/${port.slug}` })),
    ...ALL_GLOSSARY_TERMS.map((term) => ({ url: `${SITE_URL}/glossary/${term.slug}` })),
  ];
}
