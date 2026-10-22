# Space BQS Website — Full Detailed Analysis & Build Spec

> Purpose: single source of truth to generate prompts for building a better version of this website.
> Generated: 2026-10-16. Stack: Next.js 16.4.1 + React 19.3 + Tailwind v4 + TypeScript. Repo: https://github.com/pmspaceai7-wq/space-bqs-website.git (branch `main`, commit `c3e2026`).

---

## 1. Positioning (non-negotiable)

- **We are SOFTWARE providers to marine bunker surveyors / survey firms. We are NOT a survey company. We do not attend vessels.**
- Buyer = survey firm. Users = surveyors (field) + supervisors/admins (office). End beneficiaries = owners / charterers / operators who receive locked proof (no login needed).
- Scope = **quantity-only**: Bunker Delivery, ROB (Remaining On Board, incl. on/off-hire legs), Debunkering. Temperature-corrected mass in MT, water deducted, BDN cross-referenced as free text.
- Explicitly OUT of scope: lab/quality testing, sludge surveys, sampling-for-quality, cargo / IHM / P&I / condition / HSE / iOCM, crew training, 24/7 global attendance, fixed port list, per-job public pricing, tank photos/signatures (roadmap, placeholders only: `chiefEngStampOk`, `bdnSignedNo`).
- Voice: plain people, Grade-8 reading, short sentences. No `tankLines`, `VCF grid`, `DTO`, `Firestore`, `interpolateVcfGrid` on public pages. Every claim names evidence or is cut. No AI tells (no "it's not X, it's Y", no negation lists, no em-dashes in short copy, no stock openers).
- CTAs: primary **Request a demo** (`/demo`, `/request-demo`), secondary **See sample report** (`/sample-report`). Old `/book-survey` slug renamed to `/request-demo` (no redirect; site never deployed/indexed).

## 2. Truth anchors from the real product (Spaceai-app code)

- Engine `BQS_CALC_VERSION = 1.0.0`, pure/dependency-free (`projectflownestbackend/src/bqs/engine/bqs-calc.engine.ts`): (1) ullage/sounding → observed volume via strapping table `interpolate1D`, no extrapolation (`OutOfRangeError`); (2) net = observed − free water (Decimal.js); (3) VCF via ASTM D1250-04 Table 54B grid `interpolateVcfGrid`; (4) corrected = net × VCF; (5) massKg = corrected × ρ×1000, MT = ÷1000. Per-line never throws (`{ok:false, calcError}`). Precision: volume 3, VCF 4, density 4, mass 2, MT 3. Worked check: ρ=0.9500 @ 40°C → VCF 0.9677 → **457.819 MT**.
- Master data (`reference/bqs-master-data.ts`): Fuel Oils 0.900–1.000 kg/L × 0–90°C + Middle Distillates 0.820–0.900 × 0–60°C; fallback VLSFO←HFO/ULSFO; 5-tank product-tanker seed. Reference injected, never imported.
- Survey lifecycle web: `DRAFT → CALCULATED → UNDER_REVIEW → FINALISED` (locked, immutable, undeletable); mobile: `DRAFT → IN_PROGRESS → SUBMITTED → COMPLETED` (only SUPERVISOR/ADMIN completes). Survey no. format `BQS-YYYY-0001` per org. Enums: grades VLSFO/HFO/MGO/LSMGO/ULSFO; modes ULLAGE/SOUNDING; mass basis IN_AIR/IN_VACUUM.
- BDN = free-text `bdnNumber` only (no BDN entity). Sampling/sample entities do not exist. Backend has no PDF generator (reports = AI markdown + JSON); PDFs built on frontend/mobile.
- Web frontend (`projectworflow/src/app/bqs/`): DashboardTab (KPIs, trend daily/weekly/monthly, donuts, top vessels, recent 6 + needs attention), SurveysTab (search surveyNo/vessel/port/inspector/bdn; status+grade filter; soft-delete+restore), create wizard (Context + Product&Density + TankRows, 450 ms live preview, Copilot fill), detail (report/breakdown/detailed-ai tabs, recalc/finalise/reopen/restore, unit toggle, PDF/Excel gated on calculatedAt), VesselsTab (IMO7, DWT/GT, import modals), MasterDataTab (54B viewer + strapping SVG + Activepieces card), ReportsTab, FloatingAiChat (`ASK_BQS_QUESTION`), exports (`bqs-export.ts`: single PDF A4 + Excel 4 sheets; register landscape PDF + Excel).
- Backend APIs: GraphQL JWT-guarded (org from JWT), queries `getBqsSurveys/ById/DashboardStats/VesselTanks/VcfTables/previewCalculation/webhookUrl/hasApiKey`, mutations `create/update/calculate/finalise/reopen/delete/upsert/deleteTank/seed*/analyse/ask/saveWebhook/generateApiKey`; REST `GET /bqs/webhook/survey/:id` + `POST /:id/detailed-analysis` via `x-api-key`; MCP `list/get/dashboard_stats`; voice searchable.
- Mobile (`BQS-app@1.1.0`, Expo 57, RNFirebase 26.4): offline-first Firestore POC; 72 h offline lease (expiry blocks writes, never deletes); QR = vessel + optional port only (`SPACE_BQS_VESSEL v1`, IMO 7 digits, rejects anything else); 3-step wizard Context→Product→Tanks; autosave ~1 s; offline calc via `packages/bqs-calculation` (engine port); assignment same-org; notes 1000 ch; exports (expo-print/sharing/filesystem + hand-rolled XLSX) gated COMPLETED; temp files deleted after share; roles SURVEYOR/SUPERVISOR/ADMIN, no CLIENT role.
- AI (`bqs-ai.service.ts`, Claude Sonnet 5): 6-section analysis (Quantity Outcome, Tank-by-Tank, Temp&VCF Sensitivity with dVCF/dT, Free Water, Conversions MT→LT/ST/kg/lb and m³→bbl/gal, Points for Attention); grounded Q&A with history; forbids recalculation/certification/BDN-fitness claims; flags illustrative VCF.

## 3. Information architecture (44 built routes)

### 3.1 Route table with file, purpose, primary query, schema

| URL | File | Purpose (one line) | Primary query → GEO prompt | Schema |
|---|---|---|---|---|
| `/` | `app/page.tsx` | Software hero + proof + funnels | `bunker quantity survey` → software for surveyors | Org+WebSite+Breadcrumb, FAQ |
| `/services/` | `app/services/page.tsx` | Workflow hub + compare table | `bunker survey services` → delivery vs ROB vs debunkering | Breadcrumb+ItemList, FAQ |
| `/services/bunker-delivery-survey/` | `app/services/bunker-delivery-survey/page.tsx` | Delivery workflow for firms | `bunker delivery survey` → measured vs BDN | Product+Breadcrumb+FAQ |
| `/services/rob-survey/` | `app/services/rob-survey/page.tsx` | ROB/on-off-hire workflow | `ROB survey / on off hire bunker` → settlement | Product+Breadcrumb+FAQ |
| `/services/debunkering-survey/` | `app/services/debunkering-survey/page.tsx` | Removal workflow | `debunkering survey` → removed quantity | Product+Breadcrumb+FAQ |
| `/features/` | `app/features/page.tsx` | Module hub (register, calc, vessels, reports) | `bunker survey software features` | Breadcrumb |
| `/features/survey-register-dashboard/` | `app/features/survey-register-dashboard/page.tsx` | Register+dashboard spec | `survey register dashboard` | Article+Breadcrumb |
| `/features/calculation-audit/` | `app/features/calculation-audit/page.tsx` | Engine + audit spec | `VCF correction / strapping` | Article+Breadcrumb |
| `/features/vessels-master-data/` | `app/features/vessels-master-data/page.tsx` | Vessels + strapping + 54B | `tank calibration table` | Article+Breadcrumb |
| `/features/reports-ai/` | `app/features/reports-ai/page.tsx` | PDF/Excel + AI limits | `bunker survey report sample` | Article+Breadcrumb |
| `/platform/` | `app/platform/page.tsx` | Office web view | `bunker survey dashboard` | SoftwareApplication+Breadcrumb |
| `/mobile-app/` | `app/mobile-app/page.tsx` | Deck tool, offline | `bunker survey app offline` | SoftwareApplication+Breadcrumb |
| `/how-we-measure/` | `app/how-we-measure/page.tsx` | Engine in plain words (H1: "How the engine calculates") | `how bunker quantity calculated` | Article+Breadcrumb+FAQ |
| `/why-independent/` | `app/why-independent/page.tsx` | BDN vs independent | `bunker shortage causes` | Article+FAQ |
| `/who-its-for/` | `app/who-its-for/page.tsx` | Personas: surveyor/supervisor/client | `who needs bunker survey` | Article |
| `/integrations-api/` | `app/integrations-api/page.tsx` | Webhook/key/MCP/Firebase table | `bunker survey API` | Article |
| `/security-audit/` | `app/security-audit/page.tsx` | Tenancy/roles/lock/lease | `tamper-proof survey data` | Article |
| `/sample-report/` | `app/sample-report/page.tsx` | PDF+Excel anatomy | `bqs certificate sample` | Article+Breadcrumb |
| `/pricing/` | `app/pricing/page.tsx` | Team license, no numbers | `bunker survey software price` | Breadcrumb |
| `/demo` | `app/demo/page.tsx` | 20-min walkthrough agenda | `bqs software demo` | Breadcrumb |
| `/request-demo` | `app/request-demo/page.tsx` + `components/QuoteForm.tsx` + `api/quote/route.ts` | Demo form (firm, role, team size, volume) → `quote-requests/*.json` | transactional | Breadcrumb |
| `/resources/` | `app/resources/page.tsx` | Guide hub | `bunker survey guides` | Breadcrumb |
| `/resources/[slug]` ×9 | `app/resources/[slug]/page.tsx` + `app/lib/resources.ts` | Guides (see §4) | long-tail per guide | Article+Breadcrumb+FAQ |
| `/about/` | `app/about/page.tsx` | "Software, not a survey firm" | brand | Org |
| `/contact/` | `app/contact/page.tsx` | Sales/support + demo form | brand | Breadcrumb |
| `/partners/` | `app/partners/page.tsx` | Resell/implement | `survey software partners` | Breadcrumb |
| `/customers/` | `app/customers/page.tsx` | Survey-firm fit, no fake logos | brand | Breadcrumb |
| `/changelog/` | `app/changelog/page.tsx` | v0.1.0 + v0.2.0 | brand release notes | Article list |
| `/legal/privacy`, `/legal/terms` | `app/legal/*/page.tsx` | Quantity-only terms | — | — |
| `/sitemap.xml`, `/robots.txt` | `app/sitemap.ts`, `app/robots.ts` | 27 statics + 9 guides; discovery bots allowed separately from training bots | — | — |
| `/llms.txt` | `app/llms.txt/route.ts` | Machine-readable positioning + links | — | — |
| `/pricing.md` | `public/pricing.md` | "Contact for quote (team license)" + inclusions | — | — |

### 3.2 Homepage sections (in order, `app/page.tsx`)
1. Hero (H1: "BQS software for surveyors: capture, calculate, issue locked certificates.", sub: teams attend / system handles rest, dual CTA demo + sample, trust microline, 457.819 MT example card). 2. Trust strip (engine v1.0.0, Table 54B, grades, modes, mass basis). 3. Three workflow cards. 4. How-it-works (capture → calculate → proof). 5. Platform preview + lock story. 6. Mobile preview + photos/signatures roadmap note. 7. Temperature AnswerBlock → methodology. 8. Sample teaser (PDF + Excel). 9. Pricing teaser (per-team license). 10. Resources ×3. 11. FAQ ×4 (survey company? no; workflows; quantity-only; evaluate/cost). 12. Pilot CTA.

### 3.3 Shared components
`components/Header.tsx` (7 links: Services, Features, Platform, Method, Why Independent, Pricing, Resources; Demo ghost + Request-a-demo solid; mobile scroll nav), `components/Footer.tsx` (Services/Product/Company columns + engine version + privacy/terms), `components/ui.tsx` (`Section`, `AnswerBlock` "In short", `CtaRow` demo+sample, `Faq` with FAQPage JSON-LD, `Breadcrumbs` with BreadcrumbList JSON-LD), `components/QuoteForm.tsx` (zod-validated demo form), `lib/site.ts` (SITE_NAME/URL/EMAIL/ENGINE_VERSION — URL+email still `spacebqs.example` placeholders), `lib/resources.ts` (9 guides), `app/globals.css` (Tailwind v4 `@theme` ocean/sea palette, Inter + Plus Jakarta Sans).

## 4. Resources: 9 guides (surveyor voice)

1. `what-is-bunker-quantity-survey` — what BQS is; teams record, clients compare vs BDN.
2. `ullage-vs-sounding` — top-down vs bottom-up; system accepts either per tank, warns on mode/table mismatch.
3. `bdn-vs-actual` ("BDN says X, your team measured Y") — recheck tanks/units/window/BDN; open audit; hand clients fast packet.
4. `temperature-correction-explained` — expand/shrink, 54B, 0.9500@40°C→0.9677 example, per-tank 4dp + sensitivity.
5. `rob-checklist` — separate on/off-hire jobs, access + logbook compare, keep both certs.
6. `bunker-shortage-claim-checklist` — recheck, audit (tables/revs/flags/water/temp/version/time), fast PDF+Excel packet.
7. `glossary-10-terms` — BDN/ROB/VCF/ullage/sounding/debunkering/MT/grades/mass basis, one line each.
8. `on-off-hire-fuel-settlement` — opening + bunkered − closing per grade; packet = 2 ROB certs + delivery certs/BDNs.
9. `standards-in-plain-English` — ISO 8217 (grades) vs ISO 13739 (sampling) vs MARPOL Annex VI (sulphur/sampling duties); system = quantity-only context, not certification.
- Format per guide: description + 40–60w AnswerBlock + 3–4 short paragraphs + FAQ + `Last updated: 2026-10-15` + Article/FAQ JSON-LD.

## 5. SEO/GEO layer (marketingskills applied)

- Skills used: `product-marketing` (positioning first), `site-architecture` (flat ≤3 levels, breadcrumbs=URL, hub-and-spoke: services↔children, resources↔services↔method), `seo-audit` (crawl→tech→on-page→quality→authority; striking-distance + claim-drift loops planned), `ai-seo` (Structure: 40–60w blocks, tables>prose, H2s as questions; Authority: dated stats, named engine version, audit evidence; Presence: third-party later), `schema` (only supported types; FAQ semantic, no rich-result promise — FAQ results ended May 2026; HowTo retired; sitelinks searchbox retired), `content-strategy` (searchable-first, information-gain gate, 60/30/10), `copywriting` (supportable claims, `[NEED:]` over invention, no AI tells), `cro` (one primary CTA hierarchy), `launch/site-launch-qa` (pending: forms, tracking, redirects, staging-noindex check, perf, rollback), `analytics` (GA4+GSC day 1, events `demo_request`, `sample_download`), `pricing` (quote-based, `/pricing.md` for agents).
- Per-page: title 50–60 ch, description 150–160 ch, canonical via `metadataBase`, OG, 1×H1, breadcrumbs, `Last updated` on guides.
- Machine files: `/llms.txt` (buyer, workflows, method, product, pricing, evaluate links), `/pricing.md`, robots allow-lists `OAI-SearchBot/PerplexityBot/Claude-SearchBot` separately.
- Deferred per `programmatic-seo` (needs proprietary data + platform limits): `/ports/[port]`, `/grades/[grade]`, `/compare/[supplier]`. Rule: 100 great pages > 10k thin.

## 6. Competitors crawled (13 fetches, 11 ok)

### 6.1 The Viswa Group (TIC giant, est. 1991) — 7 pages
- `/` — 5 pillars (Testing: fuel/lube/water/coolant/grease; Inspection: BQS, ROB+sludge, IHM, cargo, on/off-hire, condition, P&I, sampling; Emission compliance; Consultancy; Digital: V-Track, VLOG360, bunker fuel module, futures); stats 1000+ clients / 9500+ ships / 30 yrs; 8 global labs; Client Dashboard + Sample Pickup portals; white papers; quote form (Name/Company/Email/Phone).
- `/services/bunker-quantity-surveys/` — types standard/detective/continuous; watches trim/list, flowmeters, strapping, magic pipes, temperature, cappuccino air; eyes/ears at custody transfer; hidden/overflow/bilge tanks; scope incl. correctional/ROB/sludge/pre-delivery sample.
- `/services/rob-and-sludge-surveys/` — temp/density/trim/tape/meter/table tricks; inventory control; kit list (tape, e-thermometer, paste, seals, bottles, gas detector).
- `/services/on-off-hire-surveys/` — bunkers + full condition (holds/decks/cranes/cleanliness, certs, securing gear), photos, figures signed by surveyor/master/chief; insurance-grade.
- `/services/sampling-jobs/` — MARPOL Annex VI sampling, 350+/mo, per-product protocol (fuel/cylinder/lube/grease/water/foam).
- `/services/bunker-fuel-module/` — closest to software: port/supplier/grade/sulphur analytics, past-year data, favorites, N-way compare, PDF download, catfines/problem-fuel frequency (`vbfm.theviswagroup.com`).
- `/services/v-track/` + `/digital/` — emission consultancy (IMO DCS/CII, EU MRV/ETS, Thetis, FuelEU, MOHA) + hub pattern (V-Track, IHM, VLOG360, SVMS).

### 6.2 Labsols (LIMS vendor, ~20 yrs, Bit Wave unit) — 6 pages
- `/` — Industries × Solutions IA; Smart/Cloud LIMS intro-benefits-implementation; BI, portal, mobile, DMS; logo wall; advantages (budget/custom/compliance/support); services (migration/bespoke/deployment/training).
- `/Home/marine_solutions_bunker_quantity_survey` — direct BQS spec: web sample registration/inspection/points/methods/results/reports/review-approval/invoicing/graphs + nomination, notifications, review, order tracking; Android/iOS; personas (bunkering cos, collectors, shipping cos, retailers/refiners).
- `/Home/marine_solutions_health_safety_management` — HSE modules (audits/equipment, accidents/corrective, COSHH, objectives, training, risk).
- `/Home/marine_solutions_oil_condition_monitoring` — iOCM/FQMS/STARS/FOBAS: lifecycle New→Drawn→Dispatched→Received→Interim→Authorised, 12-level roles, customer tracking.
- `/Home/mobile_lims_introduction` — mobile pattern: PDFs, push alerts, tracking, live updates, result entry, analytics, port-on-map, photos/video/GPS, offline, KPI dashboard, EMM security.
- `/Home/customer_portal_intro` — portal pattern: requests, reports, invoices, support, 24/7, Azure, comms.
- `/Home/pricing` — no numbers: perpetual vs subscription/SaaS, quote by users/infra/needs; "not having LIMS costs too".

### 6.3 Bitwave Solutions (software-house parent) — home ok, subpages blocked
- `/` — Services (Infor M3, digital transformation, app/mobile/cloud/BI/QA/GIS), Products (LIMS variants + Finance P2P/BRS/PAS + Insurance + TripPal/QHSE), stats 12 y / 500+ projects / 100+ customers, testimonials (Techenomics iLMS mobile, Premiere portal), Marine Solutions nav lists HSE / BQS Solution / iOCM under LIMS.
- Subpages (`Marine_Bqs.aspx`, `Hse.aspx`, `AboutUs.aspx`) return 404 to the fetcher (ASP.NET bot/session block; homepage works) — scope recorded at nav level only, no fabricated detail.

### 6.4 Gap table: them vs Space BQS (what to copy, what to refuse)

| Capability | Viswa | Labsols/Bitwave | Space BQS (truth) | Site decision |
|---|---|---|---|---|
| Delivery/ROB/debunkering quantity | service, 3 types | BQS module | 3 workflows, engine v1.0.0, locked certs | SHIP — services hub + 3 pages |
| Malpractice awareness | full page | — | diligence on deck, system records evidence | SHIP — `/why-independent/` with disclaimer |
| Sludge/sampling/quality labs | yes | FQMS/STARS/FOBAS | NO | REFUSE — quantity-only boxes site-wide |
| Cargo/IHM/P&I/condition/HSE/iOCM | yes | HSE/iOCM | NO | REFUSE — no pages until real |
| Bunker analytics (port/supplier compare) | BFM app | BI | register/dashboard trends only | DEFER — no `/compare/` without dataset |
| Nomination/notifications/invoicing/portal | quote form + portals | yes (lifecycle, 12 roles) | NO; demo requests → local JSON | ROADMAP page, not fake live |
| Mobile photos/GPS/push/EMM | — | yes | NO (roadmap) | Honest roadmap notes |
| API/webhooks/MCP/agents | client dashboard | — | webhooks + x-api-key + MCP + Activepieces + Firebase bridge | SHIP — `/integrations-api/` (differentiator) |
| Audit/lock story | 30-yr trust, accreditations | compliance claims | tenancy/JWT/roles/lock/per-line audit/72 h lease | SHIP — `/security-audit/` (no fake certs) |
| Pricing | quote form | quote models | team license, no numbers | SHIP — factors + `/pricing.md` |
| Proof content | white papers | blogs | worked 457.819 MT + audit fields | SHIP — guides + changelog |

## 7. Content still needed (roadmap, in priority order)

1. **Real domain/email + staging guard** — replace `spacebqs.example` / `ops@spacebqs.example` (`lib/site.ts`, OG/canonical/sitemap/robots/llms); add staging `noindex` until launch; then GA4 + Search Console + events (`demo_request`, `sample_download`).
2. **Visuals** — hero certificate mock + phone wizard mock; dashboard screenshot; 4-box method graphic; tank strapping curve SVG; favicon/OG images; sample PDF asset for `/sample-report` download.
3. **Demo pipeline** — 20-min script matching `/demo` bullets; pilot workspace runbook; Resend/CRM to replace local `quote-requests/*.json` (ephemeral on hosts); privacy page update for demo-data use.
4. **Portal roadmap page** — client self-serve (requests/status/reports) marked coming; protects against Labsols portal comparisons.
5. **Order lifecycle page** — Request→Draft→In Progress→Submitted→Completed mapped to STARS/FQMS language buyers know (without claiming nomination/invoicing).
6. **Changelog habit** — per-release entries (only live customer-visible changes).
7. **Third-party presence (GEO)** — G2/Capterra/Linkedagen profiles mirroring About positioning; review/docs citations; podcast/guest posts (per `ai-seo` Presence pillar).
8. **Deferred scale** — `/ports/[port]`, `/grades/[grade]`, `/compare/[supplier]` only with real coverage/datasets (see §5 rule).
9. **Never build until real** — lab testing, sludge, sampling-for-quality, cargo/IHM/P&I/HSE/iOCM, finance/insurance, 24/7 hotline, live tracking map, customer logos without permission.

## 8. Prompt kit (copy-paste to rebuild better)

- **P0 positioning:** "You are building a marketing site for Space BQS, B2B SaaS for marine bunker surveyors. Never write as if the vendor attends vessels, owns labs, or covers ports 24/7. Buyer = survey firm; users = surveyors/supervisors; beneficiaries = owners/charterers receiving locked proof. Quantity-only. Photos/signatures are roadmap."
- **P1 IA:** "Generate a flat Next.js App Router IA ≤3 levels: /services hub + 3 workflows, /features hub + 4 modules, /platform, /mobile-app, /how-engine-calculates, /why-independent, /who-its-for, /integrations-api, /security-audit, /sample-report, /pricing (team license, no numbers), /demo + /request-demo (firm/role/team-size/volume), /resources hub + 9 guides (list titles), /about, /contact, /partners, /customers (no fake logos), /changelog, /legal/*, sitemap/robots/llms.txt/pricing.md. Breadcrumbs = URL, hub-and-spoke links, one H1 each."
- **P2 page spec:** "Each page: metadata title 50–60 ch + description 150–160 ch, H1, 40–60w AnswerBlock for AI citation, tables over prose for comparisons, numbered lists for processes, FAQ with JSON-LD, author + Last updated on guides, CTAs Request-a-demo + Sample report. Support every claim with engine v1.0.0 / Table 54B / roles / lock / 457.819 MT check or cut it. No AI tells."
- **P3 GEO:** "Add Organization+WebSite+Breadcrumb+Article/SoftwareApplication/FAQ JSON-LD (supported types only), semantic HTML, CWV budget, llms.txt + pricing.md (contact-for-quote team license), discovery-bot vs training-bot robots split, GA4+GSC events."
- **P4 competitors:** "Differentiate vs Viswa (TIC scale, labs, BFM analytics, 24/7), Labsols (LIMS suite, nomination/invoicing/portal/mobile-photos, lifecycle), Bitwave (software-house breadth). Copy their IA patterns (hubs, intro-benefits-implementation, 4-way Demo/Support/Pricing/Info contact, changelog) but refuse their unshipped scope; mark portal/photos as roadmap."

## 9. Build verification record

- `npx tsc --noEmit` clean; `npm run build` (Next 16.4.1 Turbopack) green — 44 routes static (26 → 44 after SEO/GEO expansion; `/book-survey` renamed to `/request-demo` with stale `.next` cleared once).
- Git: root commit `c3e2026` on `main`, 50 files +3773, pushed to `pmspaceai7-wq/space-bqs-website`. Excluded: `marketingskills/` (nested repo), `node_modules/`, `.next/`, `quote-requests/`, `*.tsbuildinfo`, `*.log`. No `.env`/keys in scope.
- Run: `npm run dev` → http://localhost:3000. Deployment intentionally skipped (awaiting domain, email, Resend/CRM, visuals per §7.1–7.3).
