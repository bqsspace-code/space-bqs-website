# Security page: editorial and design decisions

Reviewed 26 November 2026. These are public messaging comparisons, not audits of the vendors' systems. The first source is the requested design reference, the second is a direct use-case competitor, and the last two are adjacent procurement and inspection benchmarks.

| Source | Useful pattern | Space BQS decision |
|---|---|---|
| [XEBO security](https://www.xebo.ai/security) | Short modules for hosting location, on-premise setup, tokenization and support, followed by standards and a CTA. | Keep the clear progression from product to procurement to contact. Avoid importing claims about local servers, PII tokenization, certifications or round-the-clock response. |
| [Agnotic bunker survey software](https://www.agnotic.com/solutions/bunker-survey-software) | Answers operational questions about offline work, calculation references, signatories and the evidence behind an issued report. | Organize controls around the handoffs a survey firm actually reviews. Link directly to the app, register and sample. Don't borrow QR evidence or signing capabilities. |
| [Veson Nautical Trust Center](https://trust.veson.com/) | Its public search listing routes buyers to a dedicated source for documentation, assessments and incident information. The trust portal itself did not permit direct automated access. | Give procurement a stable section and a real contact for evidence requests. Don't suggest a downloadable attestation or report is available unless one exists. |
| [Mitti security](https://mitti.com/security) (the SafetyCulture security URL redirected here) | Separates certifications, product features and responsible data use. | Separate website privacy disclosures from contractual hosting, retention and recovery controls. No borrowed assurance badges. |

## First-party evidence map

- `/mobile-app`: field capture without connectivity, sync after reconnection, office review and finalisation. Digital signatures are described as roadmap work.
- `/features/survey-register-dashboard`: draft/submitted/finalised register views and surveyor/supervisor responsibilities. Describes workflow, not an exhaustive permissions matrix.
- `/sample-report`: illustrative certificate and workbook layouts. An unsigned example does not verify cryptographic signing, tamper-proof storage or a real customer outcome.
- `/services/deployment`: scope hosting, connectivity, recovery and operating responsibilities for the proposed deployment. No blanket residency, uptime or recovery promise.
- `/legal/privacy`, `/legal/cookies`, `/legal/terms`: scope website collection and contact requests separately from vessel-record processing agreements.
- `app/lib/site.ts`: existing operations mailbox. An enquiry route is not a dedicated incident hotline or a guaranteed response SLA.

For publication of future assurance claims, obtain a current document that names the product, scope and validity period. This page describes documented behavior; it does not independently verify the mobile app or backend security controls.
