import { SITE_URL, SITE_NAME, CONTACT_EMAIL } from "../lib/site";

const TEXT = `# ${SITE_NAME} — llms.txt

> BQS software for marine surveyors and survey firms (quantity-only): delivery, ROB, debunkering workflows.
> Surveyors capture offline; system calculates temperature-corrected MT and locks certificates.

- Who: survey firms buy; surveyors and supervisors use; owners/charterers receive locked proof, no login.
- Workflows: /services/bunker-delivery-survey, /services/rob-survey, /services/debunkering-survey
- Lifecycle: /order-lifecycle (Draft -> In Progress -> Submitted -> Completed / Finalised)
- Portal Roadmap: /portal-roadmap (Read-only client verification & tokenized report retrieval)
- Method: /how-we-measure (measure, subtract water, VCF correct, convert to MT)
- Product: /platform (register, dashboard, audit, PDF+Excel), /mobile-app (offline 72h, QR vessel, Ship-Fuel-Tanks)
- Solutions: /solutions/space-bqs (bunker quantity surveys) and /solutions/cargo-wms (separate custom implementation offering; capabilities scoped per project)
- Services: /services/data-migration (mapping, trial import, reconciliation), /services/deployment (public cloud, private cloud, on-premises; responsibilities agreed per project)
- Public tools: /tools (supplied-VCF volume-to-mass worksheet, BDN discrepancy, ROB balance, unit conversions; browser arithmetic, not the production ASTM engine)
- Sample: /sample-report (A4 PDF Certificate layout + 4-sheet analytical Excel workbook)
- Pricing: team license by surveyors and volume, see /pricing; WMS and implementation services quoted separately
- Evaluate: /demo or /request-demo (firm, team size, volume) or ${CONTACT_EMAIL}
- Site: ${SITE_URL}
`;

export async function GET() {
  return new Response(TEXT, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
