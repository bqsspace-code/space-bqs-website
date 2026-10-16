import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";
import { RESOURCES } from "./lib/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = [
    "",
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
    "/about",
    "/contact",
  ];
  return [
    ...statics.map((p) => ({ url: `${SITE_URL}${p || "/"}`, lastModified: new Date() })),
    ...RESOURCES.map((r) => ({ url: `${SITE_URL}/resources/${r.slug}`, lastModified: new Date(r.updated) })),
  ];
}
