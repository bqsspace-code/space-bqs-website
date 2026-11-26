import { SITE_URL, SITE_NAME, CONTACT_EMAIL } from "../lib/site";

export const dynamic = "force-static";

const TEXT = `# ${SITE_NAME}
> Bunker Quantity Survey (BQS) software for independent marine survey firms and inspection teams. Space BQS provides mobile capture and web review/report workflows; it does not provide survey attendance or fuel-quality testing.

## Product workflows
- Mobile bunker-survey data capture with offline support and synchronization when connected
- Web-based survey review and report workflows
- Bunker delivery, Remaining On Board (ROB), and debunkering survey types
- PDF and Excel report outputs
- Quantity-survey software; no vessel attendance or laboratory fuel-quality testing

## Core URLs & Resources
- Website: ${SITE_URL}
- Sitemap: ${SITE_URL}/sitemap.xml
- Mobile App (iOS): https://apps.apple.com/sg/app/space-bqs/id6812992991
- Mobile App (Google Play): https://play.google.com/store/apps/details?id=com.spaceai.bqs
- Calculation methodology: ${SITE_URL}/how-we-measure
- Illustrative sample report layout (fictional values): ${SITE_URL}/sample-report
- Product and solutions: ${SITE_URL}/solutions/space-bqs, ${SITE_URL}/mobile-app, ${SITE_URL}/platform
- Survey workflow guides: ${SITE_URL}/services/bunker-delivery-survey, ${SITE_URL}/services/rob-survey, ${SITE_URL}/services/debunkering-survey
- Implementation information: ${SITE_URL}/services/deployment, ${SITE_URL}/services/data-migration
- Tools and resources: ${SITE_URL}/tools, ${SITE_URL}/resources, ${SITE_URL}/glossary
- Market and port guides: ${SITE_URL}/markets, ${SITE_URL}/ports
- Features and security: ${SITE_URL}/features, ${SITE_URL}/security-audit, ${SITE_URL}/integrations-api
- Commercial licensing: ${SITE_URL}/pricing
- Contact and demo requests: ${SITE_URL}/request-demo or ${CONTACT_EMAIL}
- Video walkthroughs: ${SITE_URL}/videos
- Official profiles: ${SITE_URL}/social-media-platforms

## Standards references
- ASTM D1250 is the ASTM/API guide family for temperature and pressure volume correction factors. Confirm the applicable edition and licensed adjunct against the production product release and survey requirements.
- Singapore MPA publishes information on SS 600:2022 tank gauging and SS 648:2024 mass-flow metering. These are distinct procedures; this site does not claim MPA approval or certification.
- Standards and contract requirements vary by jurisdiction and measurement method. This summary is not a compliance determination.
`;

export async function GET() {
  return new Response(TEXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
