# Space BQS SEO, GEO, International SEO & Conversion Implementation

**Production domain:** https://aibqs.com  
**Product:** Space BQS — Bunker Quantity Survey software  
**Primary audience:** Independent bunker survey companies, marine inspection agencies, and survey managers  
**Status:** Implementation in progress  
**Created:** 2026-11-23

## Guardrails

- Preserve current branding, routes, visual identity, and working user journeys.
- BQS means **Bunker Quantity Survey**. Space BQS sells software; it is not a survey agency.
- Never add unverified certifications, testimonials, customers, awards, ratings, performance statistics, legal conclusions, or product capabilities.
- Local-market statements must be backed by current primary sources. Do not imply local offices, attendance, compliance, or integrations that are not verified.
- Do not make a local page indexable until its content is distinctive, sourced, reviewed, and useful to that market.
- Do not add hreflang to single-language regional pages. Use it only for equivalent language/region variants with reciprocal links and correct canonicals.
- Do not expose analytics IDs or private credentials in code. Do not send form PII to analytics.
- The existing App Store/Google Play privacy and publisher details appear inconsistent with parts of the website/product description. Resolve with the product/legal owner before repeating them as proof.

## Audit baseline

### Confirmed working

- `app/lib/site.ts` uses `https://aibqs.com` by default; `NEXT_PUBLIC_SITE_URL` may override it.
- Live `/robots.txt` and `/sitemap.xml` use the `aibqs.com` host.
- `www.aibqs.com` and HTTP requests tested redirect to the HTTPS apex while preserving the path.
- The live homepage and `/solutions/space-bqs` return 200 and each contain one H1.
- Existing BQS solution, mobile app, platform, report, calculation, survey workflow, resource, and tool pages already cover most of the requested topics.
- The demo form validates, posts to `/api/quote`, and has success and error states. The API submits through the existing GraphQL `CreateDemoRequest` integration.
- Organization, WebSite, SoftwareApplication, Article, FAQ, and Breadcrumb JSON-LD already exist.
- Both linked mobile app store listings load publicly.

### Confirmed gaps / review items

- Live homepage and solution-page HTML have no `rel=canonical` tag.
- Sitemap static URLs get the current build time as `lastModified`, not a per-page content revision date.
- Animated `WeightText` headings contain duplicated character text in raw HTML extraction, although the visual animation is intentional.
- Existing metadata and share-card coverage is inconsistent across routes. Every indexable route needs a current crawl and unique metadata review.
- The SoftwareApplication schema states price `0` for a product sold via team licensing; it also contains detailed product claims and points at `/assets/logo.png`, whose existence must be verified.
- Resource `Article` markup uses each resource's `updated` date as both `datePublished` and `dateModified`; author/source detail is limited. FAQ markup exists but is not a promise of a Google FAQ rich result.
- The demo form asks for first/last name, email, required phone, company, optional company size and project details. It has no country or organization type. The GraphQL input has no named country/organization-type fields.
- `track()` only pushes events into `window.dataLayer`; the inspected app layout has no GA4/GTM loader or Measurement ID. Cookie/privacy copy does not match the inspected setup and actual lead/app data handling needs owner review.
- `app/lib/resources.ts`, app store descriptions, schema, pricing, and older SEO documents contain claims that must be technically reviewed before reuse (including standards, certification, signature, legal, offline duration, tiers, SLA, and pilot wording).
- Historical `audit-pages.csv` and AI visibility data are dated snapshots, not a current Search Console, CWV, keyword, or GEO baseline.

## Ordered work plan

### Phase 0 — Product and claim verification

- [x] Build a claim register from homepage, product pages, pricing, resources, schema, and app store listings.
- [ ] Confirm current vs roadmap behavior, the pilot offer and its terms, team licensing language, standards/method version, offline duration, report security wording, and pricing/service promises.
- [ ] Confirm the legal publisher/entity relationship shown on Apple App Store and Google Play; verify the official logo and customer-support address.
- [ ] Have a qualified technical reviewer validate ASTM/API references and all worked calculations; do not reproduce copyrighted tables.
- [ ] Have a privacy/legal owner reconcile website form collection, backend processing, mobile-app synchronization, and app-store privacy disclosures.
- [ ] Venezuela market gate: obtain legal review of whether Space BQS may solicit, demo, provision, and support software for Venezuela. Keep any Venezuela marketing page unpublished/noindex until cleared.

### Phase 1 — Technical SEO foundations

- [x] Add a reusable metadata helper for page title, description, canonical, Open Graph, and Twitter metadata; give every indexable route a unique, relevant description and canonical URL.
- [x] Use `https://aibqs.com` as production canonical origin, validate deployment environment overrides, and preserve the existing apex redirect.
- [x] Make the XML sitemap contain only existing canonical, indexable production URLs. Omit modification dates unless the corresponding page has a real last-reviewed/modified date.
- [x] Review robots rules. Allow public content and assets; keep API/private endpoints out of crawl paths as appropriate. Robots directives are not access control.
- [x] Crawl every `app/**/page.tsx` route and dynamic resource/tool page for status, redirect, metadata, canonical, indexability, H1 count, internal 404s, and rendered content.
- [ ] Verify Next.js metadata and route output in the generated production build and on `aibqs.com`.

### Phase 2 — Homepage and semantic heading quality

- [x] Keep the ocean/liquid-glass design and current page composition.
- [x] Set homepage title to **Bunker Quantity Survey Software** and use a concise, accurate unique description.
- [x] Use one H1: **Bunker Quantity Survey Software** (hero copy remains marine-survey specific).
- [x] Explain offline capture, tank readings, calculation, supervisor review, and PDF/Excel issue in concise, verifiable copy.
- [x] Retain Request a Demo and Sample Report actions; refer to a pilot as a discussion item without asserting unconfirmed duration or terms.
- [x] Reuse current problem cards, workflow cards, role sections, app screens, report preview, and FAQ. Strengthen section labels and H2/H3 hierarchy without adding redundant blocks.
- [x] Mark all synthetic/demo operational figures as illustrative, or remove them if they could be mistaken for customer results or supported tolerances.
- [x] Fix `WeightText` so heading text is single in raw HTML/accessibility extraction while retaining the visible letter-weight effect.

### Phase 3 — Accurate schema/entity and resource/product links

- [ ] Correct Organization `sameAs`, legal name/contact details, logo URL, and publisher identity from verified sources only.
- [x] Correct SoftwareApplication identity, operating-system details and paid/free offer representation; split mobile app vs commercial platform only when supported by visible product facts.
- [x] Keep Article JSON-LD only for editorial resources; use true publication dates, true modification dates, and truthful author/reviewer details. Omit unknown properties rather than inventing them.
- [x] Preserve accurate BreadcrumbList markup. Remove duplicate FAQ markup emission if visible FAQ content is already represented elsewhere; no Google FAQ rich-result promise.
- [x] Add contextual links between product/workflow pages and their relevant guides, calculators, and sample report; retain all current paths.

### Phase 4 — Demo form, GraphQL compatibility, privacy and consent

- [x] Extend the form with company name, work email, country, organization type, team size, and optional inquiry.
- [x] Consider making phone optional unless the sales follow-up process requires it; keep labels, accessible validation, mobile tap targets, success/error states, and reduced-motion behavior.
- [x] Validate new fields server-side. Do not invent GraphQL mutation fields: verify backend contract and pass extra country/organization-type values through an approved existing field or coordinated API change.
- [ ] Preserve the current `/api/quote` path and GraphQL integration; test success and failures against a safe test/staging destination.
- [ ] Update privacy/cookie wording to match actual controller, processor, purposes, retention, deletion/contact process, app behavior, and actual analytics configuration. Require owner/legal review for unresolved retention and legal-entity facts.
- [x] Do not load optional analytics before the approved consent state for applicable markets; the present banner’s accept-only behavior needs review before adding analytics.

### Phase 5 — Content and AI-answer discovery

- [x] Improve existing pages before creating routes:
  - Bunker quantity survey explanation: `/resources/what-is-bunker-quantity-survey`
  - ASTM Table 54B and calculation: `/how-we-measure`, `/features/calculation-audit`, `/resources/temperature-correction-explained`
  - ROB vs delivery: added `/resources/rob-vs-bunker-delivery-survey` plus existing workflow pages.
  - Spreadsheet error reduction: `/why-independent`, homepage comparison, `/features/calculation-audit`, and `/resources/bunker-spreadsheet-errors`.
  - Report contents: `/sample-report`, `/features/reports-ai`, and `/resources/bunker-survey-report-contents`.
- [x] Each article should answer its question up front, include verified steps/examples, source links, a clear reviewer, a real updated date, relevant internal links, and a contextual demo CTA.
- [x] Avoid legal or “compliant” conclusions, unsourced tolerances, fake ROI, and claims that software independently conducts surveys.
- [x] Keep `llms.txt` factual and maintained as an optional aid; do not treat it as a ranking requirement or guarantee of citations.
- [ ] Prepare a 10–20 prompt GEO baseline; distinguish retrieved/cited, brand mention, recommendation, answer accuracy, and AI referrals. Use repeat runs and record dates/engines.

### Phase 6 — International research and page rollout

Proposed route pattern: `/markets/[country]` with a locale data model, unique content and metadata. Do not generate near-identical template pages. Each market page needs a unique port/operational context, source list, genuine buyer value, and a tested demo form handoff.

- [x] Research and publish in batches: seven English market pages are live (Singapore, UAE, Malaysia, India, Norway, Canada, USA). Kuwait, Saudi Arabia, and Venezuela remain withheld from indexing pending owner/legal confirmation.
- [x] Verify country-specific terminology, ports, local primary sources, and which standards/processes apply to the intended workflow. Clearly distinguish public regulations from software capability.
- [x] Use English for the initial market pages. Venezuela exists only as a noindex Spanish draft with no lead capture.
- [x] Add country-specific demo intent/context to the existing form without implying a local office or in-person service.
- [x] Add hreflang only for true locale/language equivalents, including self and reciprocal references. No hreflang was added because no equivalent locale variants are published.
- [ ] Evaluate duplicate/cannibalization risk and indexing in Search Console before publishing each batch.

### Phase 7 — Analytics, verification and release

- [ ] Add an environment-configured GA4/GTM integration only after the owner supplies the real Measurement ID/container and approves consent handling. No placeholder ID in production.
- [x] Track successful `generate_lead`, form start/error, CTA placement, app-store outbound clicks, and solution page context. Do not treat app-store clicks as installs.
- [ ] Add Search Console and Bing Webmaster verification via deployment/environment configuration or account setup, never invented tokens.
- [x] Run `npm run build`, `npm run typecheck`, and `npm run test:tools`. `next lint` is not supported by this Next.js version; the repository has no ESLint configuration or dependency, so the broken `lint` script was removed rather than left failing.
- [x] Validate sitemap/canonicals/robots/OG/Twitter, schema, route status, and HTML heading extraction with `npm run check:seo`.
- [ ] Complete a manual mobile, keyboard, reduced-motion, and form-submission pass, and confirm internal links on the deployed preview.
- [x] Record before/after file list, code/test results, live deployment checks, and unresolved manual account/owner actions here.

## Release log

| Date | Work | Result |
|---|---|---|
| 2026-11-23 | Inspected repository routes, metadata, sitemap/robots, schema, homepage, resources, form/API, assets, local Marketing Skills, and live domain responses. | Baseline documented; implementation not yet started. |
| 2026-11-23 | Added shared route metadata, per-route canonicals and social metadata to current public routes; corrected homepage metadata; removed false build-time sitemap modification dates; disallowed `/api/` crawling and blocked Netlify preview/branch-deploy crawlers. | Source changes in progress; production build and rendered metadata checks pending. |
| 2026-11-24 | Added `app/lib/seo-metadata.ts`, `app/opengraph-image.tsx`, `scripts/check-seo.mjs`; applied canonicals/OG/Twitter across public routes; removed fabricated sitemap `lastModified`; added verification env hooks; repaired `WeightText` duplicate text; removed the broken `next lint` script (no ESLint config or dependency, `next lint` unsupported by Next.js 16). | `typecheck` clean; production build generates 71 pages; `check:seo` passes for 61 sitemap URLs. |
| 2026-11-24 | Removed unsupported claims across homepage, features, workflow, service, pricing, platform, deployment, sample-report, portal-roadmap, security, social-directory, and resource copy: “world’s first”, cryptographic/tamper-proof seals, fabricated hashes and rates, “locked/immutable” wording, invented tolerances, “verified” profile claims, and the unconfirmed 30-day pilot duration. Added illustrative-data labels and “confirm with product team” scoping where release behaviour is unverified. | Public copy now avoids certifications, customer proof, performance statistics, and security guarantees not backed by verified sources. |
| 2026-11-24 | Extended the demo form and validation with country, organization type, and team size; mapped values into GraphQL `projectDetails`; added country/pilot intent handoff; added consent-gated GA4 loading and `generate_lead`/CTA/app-store/form events; updated privacy and cookie pages; added seven sourced market pages and kept Kuwait, Saudi Arabia, and Venezuela gated. | `test:tools` passes 10/10; form, analytics, and market gates are code-complete pending owner-supplied IDs and legal review. |
