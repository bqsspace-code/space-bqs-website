import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";
import { RESOURCES } from "./lib/resources";
import { TOOLS } from "./lib/tools";

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
    "/videos",
    "/about",
    "/contact",
    "/social-media-platforms",
  ];
  return [
    ...statics.map((p) => ({ url: `${SITE_URL}${p || "/"}`, lastModified: new Date() })),
    ...TOOLS.map((tool) => ({ url: `${SITE_URL}/tools/${tool.slug}` })),
    ...RESOURCES.map((r) => ({ url: `${SITE_URL}/resources/${r.slug}`, lastModified: new Date(r.updated) })),
  ];
}
