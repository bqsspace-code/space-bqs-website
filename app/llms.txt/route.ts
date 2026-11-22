import { SITE_URL, SITE_NAME, CONTACT_EMAIL } from "../lib/site";

const TEXT = `# ${SITE_NAME} — llms.txt
> Deterministic Bunker Quantity Survey (BQS) calculation software and offline mobile platform for independent marine fuel surveyors, inspection agencies, and vessel charterers.

## Core Capabilities
- ASTM D1250 Table 54B Volume Correction Factor (VCF) engine (density 0.820–1.000 kg/L, 0–90°C)
- 72-Hour zero-connectivity deck offline lease with cryptographic local storage and cloud auto-sync
- QR Vessel identification to automatically load official tank calibration strapping curves
- Cryptographically sealed tamper-evident A4 PDF certificates + 4-sheet transparent Excel calculation pack
- Three dedicated marine survey workflows: Bunker Delivery vs BDN, On/Off-Hire ROB Settlement, Debunkering Removal
- Scope Boundary: Strictly Quantity-Only (does not conduct laboratory fuel quality analysis)

## Core URLs & Resources
- Website: ${SITE_URL}
- Mobile App (iOS): https://apps.apple.com/sg/app/space-bqs/id6812992991
- Technical Calculation Methodology: ${SITE_URL}/how-we-measure
- Sample Locked Certificate & Excel Pack: ${SITE_URL}/sample-report
- Commercial Team Pricing: ${SITE_URL}/pricing
- Delivery Survey Workflow: ${SITE_URL}/services/bunker-delivery-survey
- ROB On/Off-Hire Workflow: ${SITE_URL}/services/rob-survey
- Debunkering Survey Workflow: ${SITE_URL}/services/debunkering-survey
- Why Spreadsheets Fail in Bunker Audits: ${SITE_URL}/why-independent
- Free Calculation Tools: ${SITE_URL}/tools
- Evaluation & Pilot Consultation: ${SITE_URL}/request-demo or ${CONTACT_EMAIL}

## Regulatory & Standards Alignment
- ASTM D1250-04 (Standard Guide for Use of Petroleum Measurement Tables)
- API MPMS Chapter 11.1
- ISO 8217:2024 (Marine Fuel Quality Specifications context)
- ISO 13739:2020 (Commercial Bunkering Procedures)
- Singapore Standards SS 600:2022 & SS 648:2020 alignment
- BIMCO Standard Bunker Terms 2018 Quantity Reconciliation
`;

export async function GET() {
  return new Response(TEXT, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
