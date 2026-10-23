import { SITE_URL, SITE_NAME, CONTACT_EMAIL } from "../lib/site";

const TEXT = `# ${SITE_NAME} — llms.txt

> BQS software for marine surveyors and survey firms (quantity-only): delivery, ROB, debunkering workflows.
> Surveyors capture offline; system calculates temperature-corrected MT and locks certificates.

- Who: survey firms buy; surveyors and supervisors use; owners/charterers receive locked proof, no login.
- Workflows: /services/bunker-delivery-survey, /services/rob-survey, /services/debunkering-survey
- Lifecycle: /order-lifecycle (Draft -> In Progress -> Submitted -> Completed / Finalised)
- Portal Roadmap: /portal-roadmap (Read-only client verification & tokenized report retrieval)
- Method: /how-we-measure (measure, subtract water, VCF correct ASTM D1250 Table 54B, convert to MT, engine v1.0.0)
- Product: /platform (register, dashboard, audit, PDF+Excel), /mobile-app (offline 72h, QR vessel, Ship-Fuel-Tanks)
- Sample: /sample-report (A4 PDF Certificate layout + 4-sheet analytical Excel workbook)
- Pricing: team license by surveyors and volume, see /pricing and /pricing.md
- Evaluate: /demo or /request-demo (firm, team size, volume) or ${CONTACT_EMAIL}
- Site: ${SITE_URL}
`;

export async function GET() {
  return new Response(TEXT, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
