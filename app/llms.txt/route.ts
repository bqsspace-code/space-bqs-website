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
- Mobile App (iOS): https://apps.apple.com/sg/app/space-bqs/id6812992991
- Calculation methodology: ${SITE_URL}/how-we-measure
- Illustrative sample report layout (fictional values): ${SITE_URL}/sample-report
- Deployment options: ${SITE_URL}/services/deployment
- Data migration service: ${SITE_URL}/services/data-migration
- Commercial Team Pricing: ${SITE_URL}/pricing
- Delivery Survey Workflow: ${SITE_URL}/services/bunker-delivery-survey
- ROB On/Off-Hire Workflow: ${SITE_URL}/services/rob-survey
- Debunkering Survey Workflow: ${SITE_URL}/services/debunkering-survey
- Why Spreadsheets Fail in Bunker Audits: ${SITE_URL}/why-independent
- Free Calculation Tools: ${SITE_URL}/tools
- Evaluation & Pilot Consultation: ${SITE_URL}/request-demo or ${CONTACT_EMAIL}

## Standards references
- ASTM D1250 is the ASTM/API guide family for temperature and pressure volume correction factors. Confirm the applicable edition and licensed adjunct against the production product release and survey requirements.
- Singapore MPA publishes information on SS 600:2022 tank gauging and SS 648:2024 mass-flow metering. These are distinct procedures; this site does not claim MPA approval or certification.
- Standards and contract requirements vary by jurisdiction and measurement method. This summary is not a compliance determination.
`;

export async function GET() {
  return new Response(TEXT, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
