# Space BQS: Website Gap Analysis and Implementation Plan

*Prepared 23 October 2026 from the uploaded build (v0.2.0: 27 pages plus 9 guides) and public research on BQS software providers.*

## 1. The short version

Your build is accurate and unusually honest for this category. What it lacks is everything that makes a product site persuasive. It has no images or screenshots, most pages are four-bullet lists, and nothing shows what happens to a survey after it is finalised. Competitors win on five things: a visible product, free calculators, workflow breadth, regulation-aware content, and proof. Priorities, in order:

1. Fix the quick issues in section 2 (half a day).
2. Add the **Survey Warehouse** feature page and a home teaser (section 4).
3. Show the product: screenshots, a certificate render, a phone mockup, and an interactive worked example.
4. Add five missing page types: Compare, Tools, Standards, e-BDN & MFM, Roadmap.
5. Rebuild navigation and the home page around the questions a survey-firm buyer actually asks.
6. Add real proof: pilot results, one case study, named quotes.

## 2. What the build contains today

**Inventory.** 27 indexed pages: home; services hub plus delivery, ROB and debunkering; features hub plus register & dashboard, calculation & audit, vessels & master data, reports & AI; platform; mobile app; how we measure; why independent; who it’s for; integrations & API; security & audit; sample report; pricing; demo; book-survey; partners; customers; changelog; resources; about; contact. Plus nine guides in `app/lib/resources.ts`, a quote API route, `llms.txt`, schema markup (Organization, FAQ, Breadcrumb) and a sitemap. Stack: Next.js 16, Tailwind 4, Inter and Plus Jakarta Sans, an ocean-blue palette on a white background.

**Strengths to keep.** Clear scope (software, quantity-only). The “In short” answer block is good for search and AI citation. The method page shows its working. FAQ schema is already wired. Roadmap items are labelled rather than implied.

**Quick issues to fix first**

| # | Issue | Where | Fix |
| --- | --- | --- | --- |
| 1 | Typo “3.Clients get proof” | `app/page.tsx` | Add the space, and rewrite the step titles as verbs |
| 2 | Two demo destinations: header “Demo” goes to `/demo`, “Request a demo” goes to `/book-survey` | `Header.tsx`, `ui.tsx` | Keep one form page; 301 the other |
| 3 | Breadcrumb with only “Home” in the hero | `app/page.tsx` | Remove from home |
| 4 | “Who it’s for” metadata title lists owners and charterers; the H1 says survey firms | `who-its-for/page.tsx` | Align to the buyer (survey firms) |
| 5 | Public changelog reads like an internal dev log (“build green”) | `changelog/page.tsx` | Rewrite as product release notes, or hide until there are product releases |
| 6 | Internal caveats on public pages (“seed data is illustrative until approved”) | `features/vessels-master-data` | Move to a Live / Roadmap status chip; call it “demo data” |
| 7 | “Tamper-proof by design” is an absolute claim | `security-audit` | Use “tamper-evident” unless engineering confirms otherwise |
| 8 | Placeholder `SITE_URL` and `CONTACT_EMAIL` (spacebqs.example); `lang="en"` while copy is British | `lib/site.ts`, `layout.tsx` | Set real values; use `en-GB` |
| 9 | `llms.txt` points to `/pricing.md`, which is only in `public/` | `llms.txt/route.ts` | Confirm it is served; keep it in sync with the pricing page |

**Structural weaknesses.** The seven-link header plus three buttons is crowded. “Quantity-only” is repeated on nearly every page, which reads as defensive; state it once clearly in the hero strip, services hub, FAQ and footer. Customers is an empty promise (“names on request”). Pricing says nothing about plan shape.

## 3. Competitor gap matrix

Based on public pages of BQS and surveyor software (Labsols BQS, Marine Survey .Online, SurveyorMates/BQSmates, TankerCalc, CargoSurveyor Tools), survey firms with digital reporting (Bureau Veritas VeriFuel, VPS, Seahawk) and e-BDN platforms (ZeroNorth, Ofiniti, Bunkerchain, TradeGo). Re-verify any competitor detail before naming a company in public copy.

| Content type | Seen at | Space BQS today | Action |
| --- | --- | --- | --- |
| Free calculators (ullage/sounding, VCF, MT) | Marine Survey .Online, TankerCalc | None | `/tools` with three calculators; no gate; best lead magnet |
| Downloadable sample files | SurveyorMates (demo template) | Description only | Real sample PDF plus 4-sheet Excel on `/sample-report` |
| Product screenshots and mockups | Labsols, Marine Survey .Online | None | Capture 8 screens (section 10) |
| Workflow breadth: nomination, notifications, review, order tracking | Labsols | Roadmap mention only | `/roadmap` with status; showcase the live review workflow |
| Offline-first and multi-device sync | Marine Survey .Online | Offline 72 h on mobile page | Promote to home; add a “what happens when sync conflicts” explainer (confirm behaviour) |
| Fleet and vessel management | Marine Survey .Online | Vessels & master data page | Add screenshots and an import story |
| Suite breadth (draft survey, oil survey, on/off-hire) | SurveyorMates | Three workflows | Say plainly what is out of scope; ask product whether draft survey is planned |
| Client report access / portal | Bureau Veritas (global database and portal), Seahawk | Locked PDF and Excel sent to client; portal on roadmap | Put the portal on the roadmap page; warehouse share links (confirm) |
| Loss and claims education | VPS, Rotterdam/ARA guidance | One claim checklist guide | “Cost of a quantity dispute” explainer with sourced figures plus a shortfall-cost calculator |
| Regulation and standards context (MFM mandates, e-BDN, SS 648, ISO 22192, MARPOL Annex VI) | Port authorities, e-BDN vendors | One guide: standards in plain English | `/standards` hub and `/e-bdn-mfm` explainer |
| Verifiable digital documents | Angsana, Bunkerchain, ZeroNorth | Locked reports | “How a locked certificate is verified” (confirm mechanism) |
| Integrations with MFM, ERP, procurement | ZeroNorth, Ofiniti | Webhook, REST, MCP, Firebase bridge | Rewrite `/integrations-api` for non-developers; add recipes |
| Customer proof | BV, VPS, e-BDN vendors | “Names on request” | Pilot-results page, one case study, quote slots |
| Pricing transparency | CargoSurveyor lists a price | Quote only | Show plan shapes and inclusions |
| Records, archive, analytics | Labsols (records/LIMS), BV (global database) | Register and dashboard only | **Survey Warehouse** (section 4) |
| Onboarding, training, support | Enterprise vendors | One line in pricing | `/support` and a “move from Excel in a week” promise only if true |

## 4. New feature: Survey Warehouse

**Naming note.** Your site is quantity-only, so this feature should store *survey results*, not “test results”. Calling it test results invites a lab-quality reading you explicitly rule out. Working name: **Survey Warehouse** (alternatives: Survey Vault, Survey Archive). URL: `/features/data-warehouse`.

**Positioning.** The survey does not end at sign-off. The warehouse is where every finalised survey, with the evidence behind its number, stays searchable for years. When a claim lands eighteen months later, you open the record instead of rebuilding it.

**What it stores (per survey)**

- Particulars: survey number, vessel (IMO), port, date, type, grade, inspector, BDN number.
- Tank-level measurements: ullage or sounding, temperature, free water.
- Calculation steps and results: observed volume, net volume, VCF, corrected volume, mass, MT, per-tank warnings and flags.
- The exact tank table and correction table versions used (ID, revision, method).
- Finalised certificate (PDF) and breakdown workbook (Excel).
- Status history and audit trail; engine version and calculation time.

**Status of each capability.** Do not publish an item as live until engineering confirms it. Use three chips across the whole site: **Live**, **Pilot**, **Roadmap**.

| Capability | Status to claim | Basis |
| --- | --- | --- |
| Finalised surveys are locked; corrections need admin override with history | Live | Current site copy |
| Search by survey number, vessel, port, inspector, BDN; filter by status and grade | Live | Current site copy |
| Soft-delete protection; restore of hidden surveys | Live | Current site copy |
| Dashboard trends: totals, month MT, average correction factor, top vessels | Live | Current site copy |
| PDF, Excel and register exports | Live | Current site copy |
| Webhook on finalise; REST fetch scoped to your organisation | Live | Current site copy |
| Retention policy and period | Confirm with engineering | Not stated anywhere |
| Storage region, backups, data ownership and full export on exit | Confirm | Buyers will ask in the first call |
| Re-open a 2024 survey and regenerate the same PDF with the original table versions | Confirm | Strong claim if true |
| Cross-year analytics (shortfall rate by supplier or port) | Roadmap | Natural next step |
| Claims pack: certificate, workbook and audit as one download | Roadmap | Fits the existing claim checklist guide |
| Client share links or portal | Roadmap | Already on your roadmap |
| Attach BDN, e-BDN or MFM data to a survey | Roadmap | Links the warehouse to the e-BDN trend |

**Page blueprint: `/features/data-warehouse`**

1. Hero: headline, sub, a screenshot of the register with a record open, CTA “See the warehouse in a demo”.
2. “What’s kept”: an illustrated record anatomy (the list above) as an annotated certificate.
3. “Find it in seconds”: search and filter demo (short looping video or interactive).
4. “Locked means locked”: immutability, override history, table versions kept with the number.
5. “Turn history into insight”: dashboard views from stored data.
6. “Get it out”: PDF, Excel, register export, webhook, API.
7. Roadmap strip: retention rules, cross-year analytics, claims pack, share links, with chips.
8. FAQ: who owns the data, how long is it kept, can we export everything, can we delete, where is it hosted.
9. CTA row.

**Draft copy (adjust once statuses are confirmed)**

- H1: *Every survey you’ve run, one search away.*
- Sub: Space BQS keeps each finalised survey (measurements, calculation steps, table versions, certificate and audit trail) in one searchable record. When a claim arrives long after the vessel has sailed, you open the file instead of rebuilding it.
- Section title: *The number and the proof, kept together.*
- Body: A tonnage figure alone settles nothing. The record behind it does. Every stored survey carries the tank tables, correction tables and engine version that produced it, so the figure can be explained as easily on day 900 as on day one.

Also add: a home-page teaser card (“After sign-off, nothing is lost”), a footer link, a line in the pricing “Included” list, a row in the competitor comparison, and a new FAQ entry.

## 4A. The store apps: Google Play and App Store

Both store apps are live, and their listings already say more than the website does. Link to them, mirror their facts, and settle the seven wording conflicts below before publishing. Sources: [Google Play listing](https://play.google.com/store/apps/details?id=com.spaceai.bqs&pcampaignid=web_share) and [App Store listing](https://apps.apple.com/in/app/space-bqs/id6812992991), both read on 23 October 2026.

| Item | Google Play | App Store |
| --- | --- | --- |
| Listing name | Space BQS: Bunker Survey | Space BQS (subtitle: Bunker Quantity Survey) |
| Publisher shown | SpacE-Sign, Inc. | Space Ai llc |
| Category, rating | Productivity, rated 3+ | Productivity, age 4+ |
| Latest version | 1.1.0, updated 12 Oct 2026 | 1.1.0, 13 Oct (1.0 was 28 Sept) |
| Devices | Android | iPhone and iPad, iOS or iPadOS 16.4 or later, 71 MB |
| Access | Install button, no price shown; needs an account from your administrator | Free; same account requirement |
| Privacy declaration | No data collected or shared (developer-declared) | Data not collected (developer-declared; Apple has not verified it) |

Neither store shows ratings yet, and Google Play shows only a “5+” download band. Do not display stars, reviews or download counts on the site.

**What the listings say that the site does not (all are in the live app copy)**

- QR scan at the manifold or tank hatch pulls in vessel and tank identity; since 1.1.0 it also fills the Port field.
- A colour-coded form keeps measured, retrieved and calculated fields visually distinct.
- The same five steps run on every tank: observed volume from the calibration table, free-water deduction, VCF lookup (ASTM D1250 / API MPMS Table 54B), correction to 15°C, then mass and MT. Readings between table points are interpolated and flagged. One failed tank does not stop the rest of the survey.
- Status flow: Draft, Calculated, Finalized, with Under Review if a survey is reopened.
- Space AI form-fill, Basic AI Analysis, Detailed AI Analysis and Ask Space AI (answers only from the survey’s own data).
- Offline: tank register, ASTM tables and surveys are cached on the device; Push & Reconcile sends the queue and flags retries.
- Fleet dashboard, per-vessel views, drafts shortcuts, improved filters, PDF and Excel export buttons, Metric/Imperial display toggle (stored figures stay metric).
- On finalisation the report is handed to your organisation’s Space AI agent for delivery and filing.
- Fuel grades listed: VLSFO, HFO, MGO, LSMGO, ULSFO.

**Seven conflicts to resolve first**

1. The App Store copy says “signed custody-transfer quantity”. Your site rule is never “signed”, because signatures are not live. Change one of them.
2. The Detailed AI Analysis is described as showing fuel quality against ISO 8217 limits. That sits awkwardly with “quantity-only”. Reword it (for example, “displays the values you enter”) or explain it on the site.
3. Two publisher names appear: SpacE-Sign, Inc. on Google Play and Space Ai llc on the App Store, and Google links to space-sign.ai. Buyers run vendor checks, so state the relationship on About and Contact, or align the listings.
4. Two app names: “Space BQS: Bunker Survey” and “Space BQS”. Choose one canonical name and one descriptor, and use it everywhere.
5. The site says offline for up to 72 hours; the listings say fully offline with cached data and no limit. Confirm which is true and use the same wording.
6. Google Play lists a Gmail address for support. Use a domain address on both stores and on the site.
7. Both stores declare no data collected, yet the app signs in and syncs surveys to your backend. Confirm the declaration with whoever owns privacy, and make the Security page and the [privacy policy](https://pmspace.ai/privacy-policy/) say the same thing.

**Where the apps appear on the site**

| Place | What goes there |
| --- | --- |
| Home hero | Two official store badges under the CTAs, with the line “Free to download. Sign in with the account your organisation provides.” |
| Home mobile section | Phone mockups, three-step flow, badges |
| `/mobile-app` | Hero with badges; real screenshots; requirements (iOS 16.4+, Android version to confirm); offline explainer; “What’s new in 1.1.0”; FAQ (Is it free? Do I need an account? Does it work offline?) |
| Header and mobile drawer | A “Get the app” link opening a small menu with both stores |
| Footer | Both badges on every page |
| Pricing | Say whether the apps are included in every licence (confirm) |
| Release notes | App versions 1.0 (28 Sept) and 1.1.0 (13 Oct) as dated entries |
| Demo thank-you page | “Download the app, then your administrator invites you” |
| Security page | On-device storage, offline behaviour, sign-out behaviour |
| Guides | New: “Surveying offline: what is saved and when it syncs” |

**Draft copy for `/mobile-app`**

- H1: *Built for the deck, not the desk.*
- Sub: Space BQS runs on iPhone, iPad and Android. Record delivery, ROB and debunkering surveys offline, then sync when you are back in range.
- Badge caption: Free to download. Your administrator provides your account.
- Offline block: *The tank register and ASTM tables travel with you.* Surveys save as drafts, queue for upload, and reconcile when you reconnect.
- Release block: *Version 1.1.0:* better offline saving and sync, drafts keep saved tank measurements, QR codes can carry the port, dashboard shortcuts to all surveys or drafts for a vessel, clearer filters and export buttons.

**Implementation tasks**

1. Put both URLs in `lib/site.ts` as `APP_STORE_URL` and `PLAY_STORE_URL`. Test the country-neutral App Store form (`apps.apple.com/app/id6812992991`) before replacing the India link.
2. Build `StoreBadges` and `AppDownloadCta` in `app/components/`. Use the official badge artwork from Apple and Google and follow their usage rules; do not redraw them.
3. Add `SoftwareApplication` schema per platform (name, operating system, category, download URL), and the iOS Smart App Banner meta tag with app ID 6812992991.
4. Fire an analytics event on each badge click with the platform and the page it was clicked from.
5. Export screenshots from the source files (App Store Connect and Play Console), not from the store pages, so they are full resolution.

## 4B. Deployment options page (public cloud, private cloud, on-premise)

Add one page, `/deployment`, that explains the three ways a survey firm can run Space BQS. **Status warning:** nothing I have read confirms private-cloud or on-premise hosting for Space BQS. The site and store listings describe a hosted product (organisation accounts, sync to a backend), and the WMS proposal you shared assumes managed cloud hosting with region and recovery targets still “to be confirmed”. Write the page now, but publish each model only with the status chip engineering confirms (Live, Pilot, Roadmap, or On request).

| Model | What it means | Best for | Who runs it | Status to claim today |
| --- | --- | --- | --- | --- |
| Public cloud (hosted SaaS) | One platform we host; each organisation’s surveys are kept separate by account | Teams that want to start this week | Us | Live (confirm hosting region) |
| Dedicated private cloud | A separate instance for one customer, in our cloud account or the customer’s own (AWS, Azure, Google Cloud) | Firms with data-residency, isolation or procurement requirements | Us, or the customer | Confirm; likely On request or Roadmap |
| On-premise | Runs inside the customer’s own data centre or private network, with updates under their control | Large groups with strict IT policy | The customer, with our support | Confirm; likely On request or Roadmap |

**Questions engineering must answer before publishing**

1. Is private cloud or on-premise deliverable today, or only planned, and with what lead time?
2. What does the backend depend on? The integrations page mentions a Firebase bridge; if the product relies on managed Firebase services, say whether they can run inside a customer’s environment.
3. How does the store app connect to a private or on-premise backend (custom server address, mobile device management settings), and do offline and sync rules stay the same?
4. Public-cloud hosting region, backup retention, and recovery targets (RPO and RTO).
5. For on-premise: who applies releases, how often, and how engine and table versions stay aligned so old certificates remain reproducible.
6. Support level and pricing shape per model (licence only, or licence plus hosting and implementation).
7. Can a customer move from public to private later with history and certificates intact?

**Page blueprint: `/deployment`**

1. Hero: headline, sub, an architecture visual, CTA “Talk to us about hosting”.
2. Three model cards with status chips and a one-line “best for”.
3. Comparison table: time to start, who operates it, where data lives, update cadence, control, support, pricing shape.
4. “Same in every model” strip (confirm each item): calculation engine and tables, locked certificates, audit trail, Survey Warehouse, API and webhook, role-based access.
5. Decision helper: four questions (data location rules, whether IT policy bars external SaaS, who will operate it, how fast you must start) ending in a recommended model and a CTA.
6. Security and operations: the controls below, each shown only if true for Space BQS.
7. Mobile apps: the same App Store and Google Play apps across models, plus offline behaviour (confirm how they connect to private or on-premise).
8. Moving between models: what is migrated, what stays reproducible.
9. Procurement pack: security summary, architecture diagram, questionnaire answers (Roadmap if not ready).
10. FAQ and CTA.

**Security and operations pattern** (taken from the WMS proposal; confirm it applies to Space BQS before publishing): encryption in transit and at rest; private document storage with short-lived access links; permissions enforced on the server, not just hidden in menus; append-only audit trail; automated backups with a restore test before go-live; separate production and test environments; secrets kept out of source code; recovery targets written into the service agreement.

**Draft hero copy (two versions, depending on what is confirmed)**

- Only public cloud live: *Hosted for you. Private when you need it.* Sub: Space BQS runs as a hosted service, with each organisation’s surveys kept separate. If your data policy needs a dedicated or on-premise setup, tell us what you need and we will scope it.
- All three confirmed: *Run Space BQS where your data policy says it should live.* Sub: Start on our public cloud, move to a dedicated private cloud, or host it inside your own network. The calculation engine, certificates and audit trail are the same in every model.

**FAQ to publish**

1. Where is my data stored? 2. Can we host in our own cloud account? 3. Is on-premise supported, and who handles updates? 4. Do the mobile apps work with a private deployment? 5. How do backups and restores work? 6. Who owns the data, and can we export everything? 7. Can we move from public to private later? 8. What support and uptime commitments apply to each model?

**Implementation tasks**

1. Create `app/deployment/page.tsx` with `DeploymentCards`, `ComparisonTable` and a client component `DeploymentSelector`.
2. Add “Deployment options” to the Product menu in `lib/nav.ts`, the footer, `sitemap.ts` and `llms.txt`; add FAQ schema.
3. Add a “Preferred deployment” select (Public cloud, Private cloud, On-premise, Not sure) to the demo form and the quote API.
4. Link the page from Pricing (a “Deployment” row: public cloud included; others quoted) and from Security.
5. Draw three simple SVG diagrams (users and phones, application, database, with a boundary showing who owns what); use the server-rack photo from section 10 for the hero.
6. Fire an analytics event with the selector’s result.

## 4C. What to reuse from the WMS proposal

The PDF is a draft proposal for a different product, a warehouse management system for a logistics client. It says the vendor’s WMS experience, references and contracting entity are still to be confirmed. The public site must therefore not present a WMS as a Space BQS product, and must not name that client. Use the proposal only for patterns that strengthen the Survey Warehouse and Deployment pages.

| Pattern in the proposal | Use on the BQS site | Where |
| --- | --- | --- |
| Validated import: upload, validate, preview, confirm, reconcile, with row-level errors | “Move from Excel” onboarding and bulk-loading past surveys into the warehouse (confirm it exists) | Warehouse, Support |
| Append-only audit trail | Reuse the wording for “who changed what, and when” | Warehouse, Security |
| Versioned, effective-dated tariff books with calculation provenance | Matches your table IDs and revisions kept with each survey; supports the “explain it on day 900” story | Warehouse, How we measure |
| Private document storage with short-lived links | Certificate and attachment storage; share links (Roadmap) | Warehouse, Security |
| Saved report templates, PDF and Excel export, custom report builder | Warehouse reporting; cross-year analytics (Roadmap) | Warehouse |
| In-app and email notifications | Survey finalised, review requested | Platform |
| Documented versioned API | Rewrite of the API page | Integrations |
| Optimistic concurrency (stale-edit detection) | The “what happens when sync conflicts” explainer | Mobile app |
| Backup and restore test before go-live; recovery targets in the service agreement | Deployment and Security pages | Deployment |

**Leave out of the BQS site:** token booking, destuffing, Emirates ID capture, release gating on BL and payment, and storage-tariff billing. These are logistics operations, outside quantity-only survey software.

## 4D. Free tools section

Modelled on the idea behind [marinesurvey.online/tools](https://marinesurvey.online/tools), not on its wording or layout. That page lists 15 free browser calculators (interpolation, hydrostatics, wedge volume, tank capacity, average density, fuel consumption, squat and UKC, stability, engine slip, ETA, tank inclination, a unit converter, perpendicular correction, hull deflection, missing draft). Each tool has its own URL. They also run solution pages (draft survey software, bunker survey software), guides (including manual vs digital surveys) and a long list of legal and trust pages (data processing agreement, service level agreement, retention, subprocessors, information security).

**What to copy in principle, and what not to.** Do not build all 15. Space BQS is bunker-quantity-only, so draft survey, stability, squat, ETA, engine slip and hull deflection would blur your positioning. Build the bunker and tank subset, add two tools only you can offer (shortfall cost, ROB reconciliation), and use every tool as an SEO landing page, a lead magnet and a live demo of your calculation engine.

| Priority | Tool | What it does | Why it earns its place |
| --- | --- | --- | --- |
| 1 | Ullage or sounding to volume | Table lookup with interpolation, flagged when between points | The core job; matches your engine |
| 1 | Volume correction factor (ASTM D1250 Table 54B) | Density and temperature in, VCF and corrected volume out | Highest search intent; shows the method |
| 1 | Volume to mass (MT) | Air or vacuum conversion | Settles the most common confusion |
| 1 | BDN vs measured shortfall and cost | Difference in MT, percentage, and cost at an entered price per MT | Makes a quantity dispute tangible; unique to you |
| 2 | ROB reconciliation | On-hire ROB, bunkers received, consumption, off-hire ROB, settlement | Ties to your on/off-hire guide |
| 2 | Average density | Blended density from several readings | Simple and useful |
| 2 | Unit converter | m³, litres, barrels, MT, kg, °C/°F, kg/m³, API gravity | Cheap traffic |
| 2 | Tank inclination correction | Trim and list correction | Only if the engine supports it; otherwise skip |

**Pages.** `/tools` hub (hero, filter chips, cards, a persistent “Run this on deck, offline” band with both store badges) and `/tools/[slug]` for each tool. Each tool page has: a plain-English H1 and purpose line; the calculator; a preset worked example; a “how it is calculated” accordion naming the standard and rounding rules; common mistakes; a related guide; the app CTA; an FAQ; and `WebApplication`, `HowTo` and FAQ schema.

**Build rules**

1. Calculate in the browser; send nothing to a server, and say so.
2. Reuse the same calculation package as the app and show “Engine v1.0.0”, so the tools can never disagree with a certificate.
3. Add unit tests against agreed worked examples before launch.
4. State clearly: indicative results; certificates come from finalised surveys.
5. No login. Offer an optional email capture for the Excel template.
6. Shareable result URLs, a copy-result button and a print stylesheet.
7. Track `tool_used`, `result_copied` and `cta_click` per tool.

**Trust pages to add (counsel to draft).** Data processing agreement, service level agreement, data retention, subprocessors, information security. They connect to the Deployment and Security pages and answer procurement questions before the first call. Also add `/bunker-survey-software` as the keyword landing page and a “Manual vs digital bunker surveys” guide.

## 4E. Positioning and hype copy

**A caution on “first”.** Do not claim to be the first or the only. Marine Survey .Online describes itself as an offline-first platform, and Labsols and SurveyorMates are established. A “first” claim is easy to disprove, damages trust with technical buyers, and can breach advertising rules. Use claims you can prove in one sentence instead.

| Claim type | Examples | Rule |
| --- | --- | --- |
| Provable today | Works with no signal; QR scan identifies vessel and tank; PDF and four-sheet Excel; locked certificates; one calculation engine | Use freely, once each is confirmed live |
| Provable only after checking competitors | “The only BQS that…” | Do not use without a documented competitor check |
| Avoid | first, best, fastest, 100% accurate, zero errors, tamper-proof | Never |

**Category name you can own.** *Deck-first BQS* (alternatives: offline-first BQS, survey-at-sea platform). Use it as a label, then let proof carry the excitement.

**Hero headline options**

1. Surveying, rebuilt for the deck.
2. Bunker surveys that never wait for a signal.
3. A new standard for bunker quantity survey.
4. Paper is slow. Spreadsheets are fragile. This works at sea.
5. Every reading, every tank, every tonne. Offline, calculated, certified.
6. Leave the clipboard on the pier.
7. From manifold to certificate without a single retype.
8. Fully digital from gangway to archive.

**Sub-line (pick one).** Capture on the deck with no signal, calculate on the spot, and hand your client a locked certificate before you reach the pier. / Scan the tank, enter the readings, and let one engine do the maths, online or off. / Everything a survey firm needs, from the first reading to the record kept for years.

**Six pillars, with draft copy**

| Pillar | Headline | One-line body | Proof to attach |
| --- | --- | --- | --- |
| Offline-first app | Out of range. Not out of action. | The app carries your tank register and correction tables, so the survey carries on when the signal drops. | Cached tables and surveys on device (store listing) |
| Offline calculation | The answer, right at the hatch. | Volumes, corrections and tonnes are worked out on the device, with every step on show. | Five-step calculation; interpolation flagged |
| Offline sync | Back in range? It catches up by itself. | Surveys queue while you work and reconcile when you reconnect, with retries flagged rather than lost. | Push & Reconcile queue |
| QR scanning | Scan it. Don’t type it. | One scan brings in the vessel, the tank and the port, so there is nothing to mistype on a wet deck. | QR fills vessel, tank, port (v1.1.0) |
| Digital documents | Paperless proof your client can trust. | Each survey ends as a locked, dated certificate with a full audit trail behind it. | Locked report; audit trail |
| Export modes | The right file for every reader. | A PDF for the client, a four-sheet Excel for the auditor, and a register export for the office. | PDF, 4-sheet Excel, register export |

Add a seventh pillar once confirmed: *The archive that remembers* (Survey Warehouse, section 4).

**Before and after strip.** Before: paper sheets, numbers retyped later, formulas that break, PDFs chased by email. After: scanned, entered once, calculated by one engine, locked, filed, found in seconds.

**Button labels.** See it work offline. / Get the app. / Try the free tools. / Book a 20-minute walkthrough. / See a sample certificate.

**Badge strip.** Offline-first · QR-ready · Locked PDF and Excel · Syncs when you’re back.

**Short announcement copy (social or newsletter)**

- The bunker survey just lost its paperwork. Space BQS captures on deck with no signal, calculates on the spot and delivers a locked certificate. Free on iPhone, iPad and Android.
- Your tank table travels with you. Scan, read, calculate, finish, then sync when you’re back in range.
- One survey, three outputs: a PDF for your client, an Excel for your auditor, a record for your archive.

**Boilerplate (about 60 words).** Space BQS is a bunker quantity survey platform for survey firms. Its offline-first mobile app captures tank readings on deck, calculates temperature-corrected quantities on the device and syncs when the vessel is back in range. Each survey ends as a locked digital certificate, exportable as PDF and Excel and kept in a searchable archive.

**Rules for the hype**

1. Pair every big line with a mechanism in the next sentence.
2. Claim only what is Live; give everything else a chip.
3. Keep the voice confident and plain: excitement from specifics, not adjectives.
4. Use the same pillars and wording on the home page, the mobile page, both store listings and social, so the story is consistent.
5. Replace any placeholder number with a measured one, or remove it.

## 5. Sitemap v2 and navigation

Status: **K** keep, **R** rewrite, **N** new.

- **Product**: Platform (R), Mobile app with store links (R), Features hub (R): Register & dashboard (R), Calculation & audit (R), Vessels & master data (R), Reports & AI (R), **Survey Warehouse (N)**; How we measure (R); Security & audit (R); Integrations & API (R); Deployment options (N); Roadmap (N).
- **Solutions**: Services hub (R): Bunker delivery (R), ROB / on-off hire (R), Debunkering (R); By role (replaces Who it’s for) (R): surveyor, supervisor, firm owner, client; Compare (N): vs spreadsheets, vs building in-house, vs generic survey apps.
- **Resources**: Guides hub (K): 9 guides (R); Tools (N): hub plus eight calculators (section 4D); Standards (N); e-BDN & MFM explainer (N); Glossary hub (N, from the glossary guide); Sample report (R).
- **Company**: About (R), Customers (R), Partners (K), Support & onboarding (N), Contact (K), Legal (K), Release notes (R).
- **Conversion**: Demo (one page; `/book-survey` redirects), Pricing (R).

**Navigation.** Four top-level items with mega-menus (Product, Solutions, Resources, Company), one primary button (“Request a demo”), one text link (“Sample report”). Remove the second mobile nav strip; use a drawer. Add a sticky bottom CTA on mobile product pages.

## 6. Page blueprints

Every page follows one skeleton: **Hero** (H1, one-line value, one visual), **Answer block** (“In short”), **Proof** (screenshot, number or quote), **How it works**, **FAQ** (2 to 4, schema-marked), **CTA row**.

| Page | Goal | Draft H1 | Must-have sections | Visual |
| --- | --- | --- | --- | --- |
| Home | Explain and convert in one scroll | Measure on deck. Prove it in the office. | Section 7 | Cinematic hero, product shots |
| Services hub | Route to the right workflow | Three survey jobs, one standard of proof | Comparison table (keep), “which do I need” selector, out-of-scope note | Three illustrated cards |
| Bunker delivery | Win delivery-survey firms | Delivery surveys your clients can defend | Before/after tank flow diagram, worked BDN-vs-measured example, certificate preview, FAQ | Alongside-barge photo, certificate render |
| ROB / on-off hire | Win charter-survey work | Settle charter fuel with a paired record | On-hire and off-hire pair timeline, logbook comparison, settlement guide link | Timeline graphic |
| Debunkering | Cover removal jobs | Record what left the tank | When it applies, before/after flow, certificate | Pipe and valve photo |
| Platform | Show the office view | One register for every survey, vessel and port | Register, dashboard, audit, exports, warehouse teaser | Real screenshots |
| Survey Warehouse | See section 4 | Every survey you’ve run, one search away | See section 4 | Record anatomy graphic |
| Mobile app | Show deck usability | Built for the deck, not the desk | QR scan, three steps, offline lease, sync, review flow, store badges | Phone mockups, deck photo |
| How we measure | Win trust of technical readers | From tank reading to tonnes, step by step | Four steps, interactive worked example, standards table, out-of-range behaviour | Animated diagram |
| Why independent | Educate buyers’ clients | Why the BDN alone isn’t enough | Seven risks as an icon grid, honest scope, claims link | Port aerial |
| By role | Let each persona self-identify | Software your whole survey team will use | Four role cards with day-in-the-life | Role illustrations |
| Integrations & API | Reassure technical evaluators | Connect surveys to the systems you already run | Plain-English recipes first, then endpoint table; MCP and webhook | Flow diagram |
| Security & audit | Pass vendor review | Controls you can verify | Shipped controls only, data handling answers, downloadable security summary | Shield and lock iconography |
| Sample report | Make the output tangible | See the certificate your clients receive | Interactive certificate with callouts, downloadable PDF and Excel | Certificate render |
| Pricing | Remove fear of the quote | Licensed per team, quoted on volume | Plan shapes (Team, Firm, Enterprise), inclusions, onboarding, FAQ | None needed |
| Compare | Capture comparison searches | Space BQS vs spreadsheets | Honest table; where spreadsheets are fine | Table |
| Tools | Earn traffic and trust | Free calculators for bunker surveyors | Worked-example calculators; email capture optional | Calculator UI |
| Standards | Establish authority | The standards behind a bunker quantity survey | ASTM D1250 Table 54B, MFM and e-BDN context, port rules; verify every citation | Diagram |
| e-BDN & MFM | Capture adjacent searches | e-BDN and BQS: how they fit together | What e-BDN is; why an independent check still matters; roadmap for linking | Process graphic |
| Customers | Prove adoption | How survey teams run Space BQS | Pilot results, quote slots, case study | Team photos (real) |
| About | Humanise | Software built by people who know the deck | Story, principles, team | Real team and product photos |
| Release notes | Show momentum | What’s new in Space BQS | Dated product entries with Live/Pilot chips | None |

## 7. Homepage content spec

Section order, each with its job:

1. **Cinematic hero**: dark, scroll-linked image sequence; headline, sub, two CTAs, trust strip beneath.
2. **Problem**: “What a quantity dispute costs” in three numbers (each sourced or removed).
3. **Three workflows**: delivery, ROB, debunkering as visual cards.
4. **How it works**: capture, calculate, certify, with a phone mockup, an engine diagram and a certificate render.
5. **Try the engine**: interactive worked example (preset inputs only, labelled illustrative).
6. **Platform**: register, dashboard, audit, **Survey Warehouse** (four module cards with screenshots).
7. **Mobile**: offline lease, QR, three steps; app store badges once live.
8. **Proof**: certificate preview and pilot results.
9. **Warehouse teaser**: “After sign-off, nothing is lost.”
10. **Why independent** in two sentences with a link.
11. **Space vs spreadsheets**: five-row table.
12. **Roles**: surveyor, supervisor, firm owner, client.
13. **Pricing teaser** and **three guides**.
14. **FAQ** (four to six) and **final CTA** with the demo form inline.

**Hero copy options** (pick one; all avoid claims you cannot yet prove)

- A: *Measure on deck. Prove it in the office.* Sub: Space BQS turns tank readings into locked, temperature-corrected certificates. Captured offline, calculated by one engine, kept for good.
- B: *Every tonne, accounted for.* Sub: Offline capture on deck, one calculation engine, locked certificates and a searchable archive for your survey firm.
- C: *The survey doesn’t end at the gangway.* Sub: Capture, calculate, certify, and keep the evidence behind every number.

Trust strip (keep): Engine v1.0.0, ASTM D1250 Table 54B, grades, ullage or sounding, mass in air or vacuum. Add: offline 72 h, locked certificates, PDF plus 4-sheet Excel.

## 8. Voice and claims policy

- **Voice**: calm, specific, practitioner-to-practitioner. Short sentences. Lead with the outcome, then the mechanism.
- **Spelling**: British throughout (organisation, finalised); set `en-GB`.
- **Terms**: survey firm (the buyer), surveyor, supervisor, client, certificate, finalised/locked, MT (define once per page on first use).
- **Never**: “signed” (signatures are not live), “tamper-proof”, “guaranteed”, “fraud detection”, “test results”, or anything about quality or lab testing.
- **Roadmap items** get a chip and a one-line “when to expect” only if the date is firm; otherwise “planned”.
- **Claims discipline**: every number on the site needs a source or an owner. Competitor statistics are not yours to reuse; cite the original or drop them.
- **Repetition**: say “quantity-only” in five fixed places (hero strip, services hub, FAQ, footer, about), not on every page.

## 9. Design system and motion

**Direction.** Move from the current white-and-ocean marketing look to a dark, cinematic product look: near-black base (around `#050505`), blue and cyan accents, glass navbar, generous type. Keep the ocean palette as the accent source; keep light sections for dense reading (guides, tables, forms) so the site is not dark all the way down.

**Tokens** (extend `globals.css`): `--bg`, `--surface`, `--surface-glass`, `--text`, `--muted`, `--accent-blue`, `--accent-cyan`, `--success`; spacing scale; radius scale; two shadow levels. Define both themes and a section-level `data-theme` switch.

**Type**: keep Plus Jakarta Sans for display and Inter for body; set a fluid scale (H1 clamp 2.5 to 4.5 rem); set measure to 65 characters for body.

**Components to build** (in `app/components/`): `Hero`, `ScrollyHero`, `GlassNav` with `MegaMenu`, `FeatureGrid`, `StatRow` (count-up), `Steps`, `StatusChip` (Live/Pilot/Roadmap), `ImageFrame` (wraps `next/image`), `DeviceMockup`, `CertificateViewer`, `ComparisonTable`, `Timeline`, `QuoteCard`, `LogoStrip`, `Accordion`, `StickyCta`, `EngineDemo`.

**Scrollytelling hero.** A canvas that draws frames from an image sequence as the user scrolls through a pinned section (about 120 to 180 WebP frames at 1600 px width, under 6 MB total, lazy-loaded in chunks, poster frame first). Concept for BQS: an exploded view that peels a vessel tank section into layers (tank, measurement, correction, certificate), with a text beat for each. Fallback: a static poster and reduced-motion variant. Because stock cannot supply this sequence, commission or render it (Blender, or an illustrator).

**Motion references already chosen.** Font Weight Hover for headings, Liquid Wave Divider between sections, Kinetic Wave Pro as a background accent, Water Impact on the primary CTA hover. Use sparingly: one hero motion, one divider style, one hover effect per page.

**Performance and accessibility budgets.** LCP under 2.5 s on mobile; no layout shift from images (set width and height); `prefers-reduced-motion` honoured; contrast AA on the dark theme; all visuals with alt text; keyboard-operable mega-menu and accordion.

## 10. Image and visual plan

**Rule of thumb.** Use real product screenshots wherever the product is the subject; use stock only for context and mood. Download images into `public/images/`, serve through `next/image` as WebP with explicit sizes, and keep a `credits.md` of source and licence. Do not hotlink.

**Sources.** Unsplash and Pexels (both free for commercial use; confirm each licence page at download). Search pattern: `unsplash.com/s/photos/<keyword>` and `pexels.com/search/<keyword>`. Avoid images with legible vessel names, funnel logos or company branding; avoid identifiable crew unless a release exists.

| Slot | Page | Brief | Search keywords | Alt text pattern |
| --- | --- | --- | --- | --- |
| Hero backdrop (poster frame) | Home | Tanker at berth at dusk, moody, wide | oil tanker, ship at port night | A tanker moored at a port at dusk |
| Delivery | Bunker delivery | Barge alongside a larger vessel | bunkering, cargo ship port | A fuel barge alongside a cargo vessel |
| ROB | ROB | Engine room or tank-top view | ship engine room, ship machinery | Marine engine room with machinery and gauges |
| Debunkering | Debunkering | Pipes, valves, manifold | pipeline valves, industrial pipes | Fuel pipework and valves on a vessel |
| Deck work | Mobile app | Person on deck with a tablet, hard hat, daylight | ship deck worker, industrial tablet | A surveyor using a tablet on a ship’s deck |
| Data archive | Survey Warehouse | Server racks, cool light, shallow depth | server room, data center | Rows of servers in a data centre corridor |
| Port context | Why independent, Partners | Aerial of a harbour with tankers | port aerial, harbour aerial | Aerial view of a busy harbour |
| Heat and expansion | Method, temperature guide | Abstract warm-to-cool gradient or steam | heat haze, thermal abstract | Abstract gradient suggesting temperature change |
| Security | Security | Abstract lock or circuit macro | padlock macro, circuit board | A padlock over a circuit pattern |
| Resource cards | Guides | Steel hull, rope, waves, containers (consistent grade) | ship hull, mooring rope, ocean waves | Close view of a ship’s hull |
| Team | About, Customers | Your own team and offices | n/a: use real photos | Names and roles in captions |

**Create in-house (stock cannot supply these).** Eight product screenshots (register, filters, survey detail, tank lines with audit, dashboard, vessel master data, tank table curve, export dialog); the certificate render (PDF page over a soft shadow); two phone mockups (QR scan, tank entry); the scrollytelling image sequence; an annotated record-anatomy graphic for the warehouse; the four-step method diagram; and an OG image template (1200×630) per section.

## 11. Implementation plan

Estimates assume one developer plus a designer and a copywriter.

**Phase 0: Quick fixes (0.5 day).** Apply the nine fixes in section 2. Done when the build is green, the demo URL is single, and no placeholder domains remain.

**Phase 1: Foundations (2 to 3 days).** Add tokens and dual themes to `globals.css`; build `GlassNav`/`MegaMenu`, `StatusChip`, `ImageFrame`, `FeatureGrid`, `Steps`, `ComparisonTable`, `Timeline`, `QuoteCard`, `StickyCta`; refactor `ui.tsx` (`Section` takes a theme and an optional visual). Move nav data into one `lib/nav.ts` used by header and footer. Done when two sample pages render with both themes and pass an accessibility check.

**Phase 2: Home and hero (3 to 4 days).** Produce the frame sequence; build `ScrollyHero` with poster and reduced-motion fallbacks; assemble the home sections in section 7; add `EngineDemo` with preset worked examples. Done when LCP stays under 2.5 s on a mid-range phone and every section has real content, with no placeholder blocks.

**Copy source for Phase 2:** the final homepage text is in Part 1 of [Space BQS Website Copy: Homepage and Tools](https://claude.ai/artifact/1M486gLq47vuqmyMEsPcnn). Build from it, and resolve its \[Confirm\] items and placeholders before launch.

**Phase 3: Product pages (3 days).** Rewrite Platform, Mobile app, the four feature pages and **Survey Warehouse** with screenshots and status chips. Done when each page follows the skeleton in section 6 and every claim maps to a Live, Pilot or Roadmap status agreed with engineering.

**Phase 4: Solutions and trust (3 days).** Rewrite services (hub and three), role pages, how we measure (interactive), why independent, security, integrations (recipes first), pricing (plan shapes), sample report (interactive certificate plus real downloads). Done when the sample files download and open cleanly.

**Phase 5: Growth pages (3 to 4 days).** Build `/tools` (three worked-example calculators), `/compare`, `/standards`, `/e-bdn-mfm`, `/roadmap`, `/support`, glossary hub, and expand the nine guides with diagrams. Done when each page has a unique title, description, one H1, FAQ schema and an internal-link plan.

**Copy source for Phase 5:** the Tools hub copy and the tool page template (Shortfall and cost) are in Part 2 of [Space BQS Website Copy: Homepage and Tools](https://claude.ai/artifact/1M486gLq47vuqmyMEsPcnn). Write the other seven tool pages from that template, using engine-verified examples.

**Phase 6: Conversion and proof (2 days).** Add qualifying fields to the demo form (team size, ports, current tools: already present, keep), a thank-you page with next steps, and analytics events (CTA clicks, form start, form submit, sample download). Add the first case study and quotes when available. Done when the full funnel is measurable.

**Phase 7: SEO, GEO and QA (2 days).** Add `SoftwareApplication`, `Article` and `HowTo` schema where it fits; update `sitemap.ts`, `llms.txt` and `robots.ts`; check redirects; run Lighthouse, a11y, cross-browser and mobile passes; run a copy audit against section 8. Done when Lighthouse scores are 90 or above on performance, accessibility and SEO for home and two inner pages.

**Target queries.** bunker quantity survey software; BQS software; bunker survey app; ROB survey software; on-hire off-hire survey software; ullage to MT calculator; VCF Table 54B calculator; BDN vs measured quantity; e-BDN vs bunker survey.

## 12. Questions to confirm before copy is final

1. Warehouse: retention period, hosting region, backup, bulk export, regenerating old PDFs with original table versions.
2. Is a client share link or portal in the next release, or later?
3. Are there real customers or pilots whose results or quotes you can publish?
4. Is draft survey or any other survey type planned?
5. Can the product team supply eight clean screenshots from a demo workspace?
6. Which numbers (loss statistics, time saved) do you hold your own evidence for?

From the store listings, also confirm:

- Which wording wins for the “signed” and ISO 8217 conflicts in section 4A.
- Which legal entity publishes the app, and which support email goes on both stores and the site.
- The minimum Android version, and whether the apps are included in every licence.
