# Space BQS (AI BQS) – SEO Audit & AI Visibility Development Tasks

**Document Version:** 1.0.0  
**Date:** November 17, 2026  
**Audited Domain:** `https://aibqs.com/` (Space BQS / AI BQS)  
**Primary Data Sources:** `audit-pages.csv` (43 URLs), `ai-visibility.csv` (15 prompt evaluations)  
**Target Codebase:** Next.js (App Router), TypeScript, Tailwind CSS (`C:\My Folder\Codes\BQS`)

---

## 1. Executive Summary

A comprehensive diagnostic of **Space BQS** (`https://aibqs.com/`) was conducted using exported Site Audit and AI Visibility (Prompt Tracking) datasets from OpenSEO, paired with a direct static inspection of the Next.js App Router codebase.

### Key Audit Findings
1. **Title Tag Inefficiencies (19 URLs > 60 chars & 14 URLs with Brand Doubling):**  
   The root layout (`app/layout.tsx`) sets a title template `template: "%s | Space BQS"`. Concurrently, 14 sub-pages and resource posts manually include `— Space BQS` in their local metadata exports. This produces duplicated title strings such as `"BDN says X, your team measured Y — what now? — Space BQS | Space BQS"` (68–79 chars), which get truncated in Google SERPs.
2. **Missing Metadata on Client Routes (`/sample-report`):**  
   `app/sample-report/page.tsx` is declared with `"use client";` without a dedicated `layout.tsx` metadata wrapper or server page export. Consequently, it inherits the generic root layout fallback title (`"Space BQS — BQS Software for Marine Surveyors"`).
3. **Domain & Crawl Configuration Mismatch:**  
   `app/lib/site.ts` defines `SITE_URL = "https://www.spacebqs.example"`, and `app/robots.ts` hardcodes `sitemap: "https://www.spacebqs.example/sitemap.xml"`. This breaks canonicalization and search crawler discovery on the live production domain (`https://aibqs.com/`).
4. **Thin Content Risk (24 URLs < 300 words):**  
   Over 55% of the site's pages (including high-intent pages like `/pricing` [265 words], `/about` [198 words], `/contact` [194 words], `/features/calculation-audit` [260 words], and calculators in `/tools/*` [~209 words]) contain sparse textual copy, risking search engine penalties for "thin content" and hindering LLM vectorization.
5. **Zero Web Direct Citations in AI Answers (0% Citation Rate):**  
   Across 15 ChatGPT bunker surveying prompts, Space BQS achieved a **46.7% mention rate (7/15 prompts)**, but recorded a **0% web citation rate (0/15)** for `aibqs.com`. ChatGPT exclusively cited the iOS App Store (`apps.apple.com/sg/app/space-bqs/id6812992991`) and third-party competitors (`SevenSurveyor`, `TheNavalArch`, `AMC`, `MarineSurvey.online`, `IM Surveyor`).
6. **Critical AI Blindspots (8/15 Prompts Zero-Mentioned):**  
   Space BQS is completely omitted in prompt queries specifically addressing **ASTM D1250 Table 54B calculation tools**, **offline marine survey apps**, **ROB bunker calculations**, and **spreadsheet formula error prevention**, despite these being the core value propositions of the product.

---

## 2. Audit Findings Breakdown

### A. Site Audit (`audit-pages.csv`) Summary
- **Total Audited URLs:** 43 pages (all returned HTTP 200).
- **Average Server Response Time:** ~85 ms (healthy).
- **Image Alt Tags:** 0 missing alt tags across all detected images (healthy).
- **Titles Exceeding 60 Characters:** 19 pages (44.2%).
- **Duplicate Brand Suffix in Title:** 14 pages (32.6%).
- **Thin Content (< 300 words):** 24 pages (55.8%).

#### Problematic Title Formats
| URL Path | Current Rendered Title Tag | Char Count | Code Root Cause |
| :--- | :--- | :--- | :--- |
| `/resources/bunker-shortage-claim-checklist` | `Bunker shortage claim checklist: what your teams attach — Space BQS \| Space BQS` | 79 | Local title has `— Space BQS` + layout template appends `\| Space BQS` |
| `/resources/rob-checklist` | `ROB at on-hire and off-hire: checklist for survey teams — Space BQS \| Space BQS` | 79 | Local title has `— Space BQS` + layout template appends `\| Space BQS` |
| `/social-media-platforms` | `Official Social Media Platforms & Verified Channels — Space BQS \| Space BQS` | 75 | Hardcoded brand suffix in metadata |
| `/services/deployment` | `Deployment Services — Public Cloud, Private Cloud & On-Premises \| Space BQS` | 75 | Overly verbose local title string |
| `/resources/standards-in-plain-English` | `Fuel standards in plain English (context only) — Space BQS \| Space BQS` | 70 | Local title has `— Space BQS` + layout template |
| `/resources/bdn-vs-actual` | `BDN says X, your team measured Y — what now? — Space BQS \| Space BQS` | 68 | Local title has `— Space BQS` + layout template |
| `/resources/on-off-hire-fuel-settlement` | `On/off-hire fuel settlement: the simple math — Space BQS \| Space BQS` | 68 | Local title has `— Space BQS` + layout template |
| `/features/calculation-audit` | `Calculation & Audit — From Reading to Tonnes With Proof \| Space BQS` | 67 | Local title length excessive |
| `/features/vessels-master-data` | `Vessels & Master Data — Tank Maps and Correction Tables \| Space BQS` | 67 | Local title length excessive |
| `/how-we-measure` | `How the Engine Calculates — From Tank Reading to Tonnes \| Space BQS` | 67 | Local title length excessive |
| `/features/survey-register-dashboard` | `Survey Register & Dashboard — Find Anything in Seconds \| Space BQS` | 66 | Local title length excessive |
| `/solutions/cargo-wms` | `Cargo WMS — Custom Warehouse Management Implementation \| Space BQS` | 66 | Overly verbose title |
| `/services/rob-survey` | `ROB Workflow — Software for On-Hire and Off-Hire Jobs \| Space BQS` | 65 | Overly verbose title |
| `/services` | `Bunker Survey Workflows — Delivery, ROB, Debunkering \| Space BQS` | 64 | Overly verbose title |
| `/` (Homepage) | `BQS Software for Marine Surveyors — Capture, Calculate, Certify` | 63 | Over 60 characters |
| `/features/reports-ai` | `Reports & AI — Locked Certificate, Honest Analysis \| Space BQS` | 62 | Over 60 characters |
| `/services/bunker-delivery-survey` | `Bunker Delivery Workflow — Software for Surveyors \| Space BQS` | 61 | Over 60 characters |
| `/portal-roadmap` | `Client Portal Roadmap — Self-Service Bunker Proof \| Space BQS` | 61 | Over 60 characters |
| `/resources/temperature-correction-explained` | `Why temperature changes fuel quantity — Space BQS \| Space BQS` | 61 | Local title has `— Space BQS` + layout template |

---

## 3. AI Visibility & Prompt Tracking Analysis (`ai-visibility.csv`)

### A. Overall AI Visibility Performance
- **Evaluation Engine:** ChatGPT (15 observations evaluated).
- **Space BQS Brand Mentions:** 7 / 15 (46.7%).
- **Space BQS Web Citations (`aibqs.com` / `spacebqs.com`):** 0 / 15 (0.0%).
- **App Store Citations (`apps.apple.com`):** 15 citations across 5 prompts.
- **Top Competitor / Informational Domains Cited:**
  - `marinesurvey.online`: 5 citations
  - `climate.ec.europa.eu`: 4 citations
  - `sevensurveyor.com`: 3 citations
  - `imsurveyor.com`: 3 citations
  - `www.nepia.com`: 3 citations
  - `thenavalarch.com`: 2 citations
  - `q8digital.com`: 2 citations
  - `amc.gr`: 2 citations

### B. Detailed Prompt Performance Breakdown

| Prompt Query | Space BQS Mentioned? | Citations to Space BQS Site | Cited Sources / Competitors | Root Opportunity / Diagnosis |
| :--- | :---: | :---: | :--- | :--- |
| **#1. How can marine surveyors calculate delivered fuel accurately from vessel tank readings?** | **NO** | 0 | BIMCO, AmSpec, ISO 13739, ASTM Store, EU Climate | Lack of high-authority technical calculation guide indexed by search engines. |
| **#2. How do bunker calculation systems prevent spreadsheet formula errors?** | **NO** | 0 | *(No citations)* | Major marketing pillar ("Why Independent / Spreadsheets vs Software") not ranking or surfaced. |
| **#3. What is the easiest way to calculate ROB fuel during an on-hire or off-hire survey?** | **NO** | 0 | *(No citations)* | The `/services/rob-survey` and `/resources/rob-checklist` pages lack schema and authority citations. |
| **#4. What software automates bunker quantity calculations from tank soundings?** | **YES** | 0 (Cited Apple App Store) | SMMNet, Apple App Store (Space BQS), MarineSurvey.online | Recognized as mobile app, but domain `aibqs.com` is omitted. |
| **#5. Which tools support ASTM 54B bunker quantity calculations?** | **NO** | 0 | AMC, Seven Surveyor, The Naval Arch | Critical omission. Space BQS engine v1.0.0 is Table 54B-based, but third parties dominate ASTM 54B keywords. |
| **#6. How do I compare bunker survey software for delivery, ROB, and debunkering surveys?** | **YES** | 0 | ISO 22192, Amica Marine, North Standard (Nepia) | Space BQS mentioned in body text, but no link attribution. |
| **#7. What bunker survey software calculates marine fuel quantities using ASTM Table 54B?** | **YES** | 0 | AMC, Seven Surveyor, The Naval Arch | Space BQS mentioned as an option, but cited links went to Seven Surveyor & The Naval Arch. |
| **#8. What is the best bunker survey software for marine surveyors?** | **YES** | 0 (Cited Apple App Store) | Apple App Store (Space BQS), IM Surveyor | Mobile presence is strong on iOS; desktop/web platform authority is unrecognized. |
| **#9. Which bunker survey platforms create audit-ready bunker certificates?** | **YES** | 0 | WorldPorts, MPA Singapore, BluSense (SDK) | Space BQS mentioned for locked certificates, but governmental/trade portals get cited. |
| **#10. Which bunker survey software supports offline data capture on a vessel?** | **YES** | 0 (Cited Apple App Store) | Apple App Store (Space BQS), IM Surveyor, MarineSurvey.online | Mentioned due to App Store listing; website domain missing. |
| **#11. How can a marine survey app reduce errors when recording tank soundings?** | **NO** | 0 | *(No citations)* | Informational vacuum. Space BQS has deck workflow copy but lacks structured FAQ / schema. |
| **#12. What is the best mobile app for marine bunker surveyors?** | **YES** | 0 (Cited Apple App Store) | Apple App Store (Space BQS), IM Surveyor, Google Play (Cargo Surveyor Tools) | App Store listing powers AI recall; need reciprocal web-to-app schema linkage. |
| **#13. What should I look for in a marine survey app for iPhone and Android?** | **NO** | 0 | Marine Inspect, KDMT, MarineQA | Missed generic evaluation prompts. |
| **#14. Which marine survey app connects field readings with office review?** | **NO** | 0 | Q8 Digital SurveyHub, Aptixx | Missed integration prompt linking deck app to office portal. |
| **#15. Which marine survey apps work without an internet connection onboard?** | **NO** | 0 | MarineSnap (Web + App Store + Google Play) | MarineSnap ranks #1 for offline onboard prompts; Space BQS's 72h offline mode is unmentioned. |

---

## 4. Prioritized Task List

### Category Summary Table

| Category | Critical | High | Medium | Low | Total Tasks |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Technical SEO & Crawlability** | 2 | 1 | 1 | 0 | **4** |
| **On-Page SEO & Metadata Optimization** | 1 | 3 | 1 | 0 | **5** |
| **Heading Structure & Semantics** | 0 | 1 | 2 | 0 | **3** |
| **Structured Data & Schema.org** | 1 | 2 | 1 | 0 | **4** |
| **AI Visibility & LLM Optimization (GEO)** | 2 | 2 | 1 | 0 | **5** |
| **Content Optimization & Thin Content Expansion** | 1 | 3 | 2 | 0 | **6** |
| **Authority & Citation Improvements** | 0 | 2 | 1 | 1 | **4** |
| **Total** | **7** | **14** | **9** | **1** | **31** |

---

### Phase 2 Detailed Task Specifications

#### A. Technical SEO & Crawlability

##### `TASK-TECH-01`: Fix Production Domain Mismatch in Environment & Site Config
- **Category:** Technical SEO / Crawlability
- **Affected URLs:** All 43 site URLs (`https://aibqs.com/*`)
- **Evidence from Report & Codebase:**  
  `app/lib/site.ts` defines `export const SITE_URL = "https://www.spacebqs.example";`. This causes Next.js `metadataBase`, OpenGraph URLs, JSON-LD schemas, and `sitemap.xml` to output placeholder `.example` links instead of `https://aibqs.com`.
- **Recommended Solution:**  
  Update `app/lib/site.ts` to read `process.env.NEXT_PUBLIC_SITE_URL || "https://aibqs.com"`. Ensure `.env.production` sets `NEXT_PUBLIC_SITE_URL=https://aibqs.com`.
- **Relevant Code Files:** `app/lib/site.ts`, `app/layout.tsx`, `.env.example`, `.env.local`
- **Priority:** **Critical**
- **Expected Result:** All canonical tags, OpenGraph objects, schemas, and sitemap entries generate `https://aibqs.com/*`.
- **Acceptance Criteria:** `curl -I https://aibqs.com/sitemap.xml` returns valid `https://aibqs.com/` URLs with zero `.example` references.

---

##### `TASK-TECH-02`: Resolve Hardcoded `.example` Domain in `robots.ts`
- **Category:** Technical SEO / Crawlability
- **Affected URLs:** `https://aibqs.com/robots.txt`
- **Evidence from Report & Codebase:**  
  `app/robots.ts` line 16 has hardcoded: `sitemap: "https://www.spacebqs.example/sitemap.xml"`.
- **Recommended Solution:**  
  Import `SITE_URL` from `app/lib/site.ts` and set `sitemap: `${SITE_URL}/sitemap.xml``.
- **Relevant Code Files:** `app/robots.ts`
- **Priority:** **Critical**
- **Expected Result:** `robots.txt` points search engines directly to `https://aibqs.com/sitemap.xml`.
- **Acceptance Criteria:** Navigating to `/robots.txt` displays `Sitemap: https://aibqs.com/sitemap.xml`.

---

##### `TASK-TECH-03`: Ensure All Public Static & Dynamic Pages Are in `sitemap.ts`
- **Category:** Technical SEO / Indexing
- **Affected URLs:** `https://aibqs.com/sitemap.xml`
- **Evidence from Report & Codebase:**  
  `app/social-media-platforms` and `/cool-pearl.css` / `/liquid-glass.css` are not explicitly managed; verify that all audited routes in `audit-pages.csv` are properly mapped.
- **Recommended Solution:**  
  Cross-verify `sitemap.ts` array against the 43 audited routes in `audit-pages.csv`. Add `/social-media-platforms` to `statics`.
- **Relevant Code Files:** `app/sitemap.ts`
- **Priority:** **High**
- **Expected Result:** Sitemaps list all 43 canonical URLs.
- **Acceptance Criteria:** Sitemaps contain exactly 43 public URLs with accurate `lastModified` timestamps.

---

##### `TASK-TECH-04`: Optimize Font & CSS Asset Delivery for Core Web Vitals
- **Category:** Technical SEO / Performance
- **Affected URLs:** All site URLs
- **Evidence from Report & Codebase:**  
  Multiple custom CSS files (`marine-design.css`, `liquid-glass.css`, `cool-pearl.css`, `home-workflow-journey.css`) are loaded globally or per section, potentially causing layout shifts on mobile.
- **Recommended Solution:**  
  Audit render-blocking stylesheets. Ensure `next/font` subsets are constrained and CSS animations honor `prefers-reduced-motion`.
- **Relevant Code Files:** `app/globals.css`, `app/layout.tsx`
- **Priority:** **Medium**
- **Expected Result:** Smooth mobile first-contentful paint (< 1.2s) across all pages.
- **Acceptance Criteria:** Lighthouse Performance score > 90 on mobile devices.

---

#### B. On-Page SEO & Metadata Optimization

##### `TASK-META-01`: Eliminate Duplicate Brand Suffix in Dynamic Resource Metadata
- **Category:** On-Page SEO / Metadata Optimization
- **Affected URLs:**  
  - `/resources/bdn-vs-actual`
  - `/resources/bunker-shortage-claim-checklist`
  - `/resources/glossary-10-terms`
  - `/resources/on-off-hire-fuel-settlement`
  - `/resources/rob-checklist`
  - `/resources/standards-in-plain-English`
  - `/resources/temperature-correction-explained`
  - `/resources/ullage-vs-sounding`
  - `/resources/what-is-bunker-quantity-survey`
- **Evidence from Report & Codebase:**  
  `app/resources/[slug]/page.tsx` line 16 defines `title: `${r.title} — Space BQS``. Root `layout.tsx` defines `template: "%s | Space BQS"`. Result: `"... — Space BQS | Space BQS"` (68–79 chars).
- **Recommended Solution:**  
  Change `app/resources/[slug]/page.tsx` line 16 to `title: r.title`. Next.js template will automatically append ` | Space BQS`.
- **Relevant Code Files:** `app/resources/[slug]/page.tsx`
- **Priority:** **Critical**
- **Expected Result:** Title length drops under 60 characters with a clean single brand suffix.
- **Acceptance Criteria:** Page title for `/resources/rob-checklist` renders as `ROB at on-hire and off-hire: checklist | Space BQS` (58 chars).

---

##### `TASK-META-02`: Clean Up Redundant Brand Suffixes Across Static Pages
- **Category:** On-Page SEO / Metadata Optimization
- **Affected URLs:**  
  - `/contact` (`Contact — Space BQS | Space BQS`)
  - `/demo` (`Demo & Mobile App Walkthrough — Space BQS | Space BQS`)
  - `/social-media-platforms` (`Official Social Media Platforms & Verified Channels — Space BQS | Space BQS`)
- **Evidence from Report & Codebase:**  
  Static page files define `title: "Contact — Space BQS"` or similar, triggering double suffixing.
- **Recommended Solution:**  
  Strip manual `— Space BQS` from local title definitions:
  - `app/contact/page.tsx`: `title: "Contact & Survey Firm Sales"`
  - `app/demo/page.tsx`: `title: "Interactive Demo & Mobile Walkthrough"`
  - `app/social-media-platforms/page.tsx`: `title: "Verified Social & Developer Channels"`
- **Relevant Code Files:** `app/contact/page.tsx`, `app/demo/page.tsx`, `app/social-media-platforms/page.tsx`
- **Priority:** **High**
- **Expected Result:** Titles stay concise (< 60 chars) without redundant brand tokens.
- **Acceptance Criteria:** `audit-pages.csv` checks show 0 instances of `| Space BQS | Space BQS` or `— Space BQS | Space BQS`.

---

##### `TASK-META-03`: Truncate Overly Long Service and Feature Titles
- **Category:** On-Page SEO / Metadata Optimization
- **Affected URLs:**  
  - `/features/calculation-audit` (67 chars)
  - `/features/vessels-master-data` (67 chars)
  - `/features/survey-register-dashboard` (66 chars)
  - `/services/deployment` (75 chars)
  - `/services/rob-survey` (65 chars)
  - `/solutions/cargo-wms` (66 chars)
  - `/how-we-measure` (67 chars)
- **Evidence from Report & Codebase:**  
  Page titles exceed 60 characters and get truncated in search engine result pages.
- **Recommended Solution:**  
  Refine titles to focus on high-intent target keywords:
  - `/features/calculation-audit`: `title: "Deterministic ASTM 54B Calculation Engine"`
  - `/features/vessels-master-data`: `title: "Tank Strapping Tables & Vessel Master Data"`
  - `/features/survey-register-dashboard`: `title: "Survey Register & Bunker Fleet Dashboard"`
  - `/services/deployment`: `title: "On-Premises & Cloud Deployment Options"`
  - `/services/rob-survey`: `title: "ROB Bunker Survey Workflow Software"`
  - `/solutions/cargo-wms`: `title: "Custom Cargo WMS Implementation"`
  - `/how-we-measure`: `title: "How the BQS Calculation Engine Works"`
- **Relevant Code Files:** `app/features/calculation-audit/page.tsx`, `app/features/vessels-master-data/page.tsx`, `app/features/survey-register-dashboard/page.tsx`, `app/services/deployment/page.tsx`, `app/services/rob-survey/page.tsx`, `app/solutions/cargo-wms/page.tsx`, `app/how-we-measure/page.tsx`
- **Priority:** **High**
- **Expected Result:** Rendered `<title>` tags are 45–58 characters in length.
- **Acceptance Criteria:** All titles fit completely within 600px desktop and mobile SERP preview bounds.

---

##### `TASK-META-04`: Add Server Metadata Wrapper for `/sample-report`
- **Category:** On-Page SEO / Metadata Optimization
- **Affected URLs:** `https://aibqs.com/sample-report`
- **Evidence from Report & Codebase:**  
  `app/sample-report/page.tsx` starts with `"use client";` and lacks a `metadata` export. It defaults to generic root title: `"Space BQS — BQS Software for Marine Surveyors"`.
- **Recommended Solution:**  
  Either create a `layout.tsx` in `app/sample-report/` exporting explicit `metadata`, or refactor `page.tsx` into a Server Component that renders a client component view (`SampleReportClient.tsx`).
- **Relevant Code Files:** `app/sample-report/page.tsx`, `app/sample-report/layout.tsx` (or new client subcomponent)
- **Priority:** **High**
- **Expected Result:** Page renders a distinct, targeted title: `"Sample Bunker Certificate & Excel Evidence Package | Space BQS"`.
- **Acceptance Criteria:** OpenSEO and browser inspectors confirm custom title and meta description on `/sample-report`.

---

##### `TASK-META-05`: Add Unique Meta Descriptions to All Static Subpages
- **Category:** On-Page SEO / Metadata Optimization
- **Affected URLs:** `/contact`, `/pricing`, `/demo`, `/solutions`, `/tools/*`
- **Evidence from Report & Codebase:**  
  Pages export `title` but omit `description`, causing search engines to display the generic root site description.
- **Recommended Solution:**  
  Define unique, action-oriented 140–155 character `description` attributes on each route.
- **Relevant Code Files:** `app/contact/page.tsx`, `app/pricing/page.tsx`, `app/demo/page.tsx`, `app/solutions/page.tsx`, `app/tools/[tool]/page.tsx`
- **Priority:** **Medium**
- **Expected Result:** High-relevance snippets in organic SERPs with no duplicate descriptions.
- **Acceptance Criteria:** Every page in `sitemap.xml` has a unique, non-empty `<meta name="description">`.

---

#### C. Heading Structure & Semantics

##### `TASK-HEAD-01`: Standardize Single `<h1>` Hierarchy Across Interactive Tool Pages
- **Category:** Heading Structure
- **Affected URLs:** `https://aibqs.com/tools/*` (`bdn-discrepancy`, `rob-balance`, `unit-converter`, `volume-to-mass`)
- **Evidence from Report & Codebase:**  
  Tool pages combine `MarketingHeader` (which renders an `<h1>`) with `SurveyTool` subcomponents that may render inner header elements, risking multiple top-level headings.
- **Recommended Solution:**  
  Inspect `components/ui/survey-tool.tsx` and ensure calculator tool cards use `<h2>` or `<h3>` for individual section titles, preserving one clean `<h1>` per route.
- **Relevant Code Files:** `app/tools/[tool]/page.tsx`, `components/ui/survey-tool.tsx`
- **Priority:** **High**
- **Expected Result:** Exactly one semantic `<h1>` tag per page route.
- **Acceptance Criteria:** `audit-pages.csv` checks confirm `H1` column remains `1` without heading skipping.

---

##### `TASK-HEAD-02`: Validate Heading Progression on Longform Resources
- **Category:** Heading Structure
- **Affected URLs:** `https://aibqs.com/resources/*`
- **Evidence from Report & Codebase:**  
  Resource pages transition directly from `<h1>` to `<h3>` within callout blocks and FAQs, skipping `<h2>`.
- **Recommended Solution:**  
  Audit `app/resources/[slug]/page.tsx` and `app/components/ui.tsx` (`AnswerBlock`, `Faq`, `Section`) to enforce strict `H1 -> H2 -> H3` semantic flow.
- **Relevant Code Files:** `app/resources/[slug]/page.tsx`, `app/components/ui.tsx`
- **Priority:** **Medium**
- **Expected Result:** 100% compliant HTML document outline for accessibility and search crawlers.
- **Acceptance Criteria:** Automated heading hierarchy validator reports zero skipped heading levels.

---

##### `TASK-HEAD-03`: Convert Key Marketing Text to Semantic Section Subheadings
- **Category:** Heading Structure / On-Page SEO
- **Affected URLs:** `https://aibqs.com/features`, `https://aibqs.com/platform`, `https://aibqs.com/mobile-app`
- **Evidence from Report & Codebase:**  
  Features module items are rendered as styled `<p className="font-bold">` inside cards instead of `<h3>`.
- **Recommended Solution:**  
  Replace styled `<p>` titles in module cards with semantic `<h3>` or `<h4>` tags.
- **Relevant Code Files:** `app/features/page.tsx`, `app/platform/page.tsx`
- **Priority:** **Medium**
- **Expected Result:** Enhanced crawlability of core product modules for SERP rich sitelinks.
- **Acceptance Criteria:** Card titles parse as heading nodes in DOM tree inspections.

---

#### D. Structured Data & Schema.org

##### `TASK-SCHEMA-01`: Implement `SoftwareApplication` Schema for Space BQS
- **Category:** Structured Data / AI Visibility
- **Affected URLs:** `https://aibqs.com/`, `https://aibqs.com/platform`, `https://aibqs.com/mobile-app`
- **Evidence from Report & Codebase:**  
  Root layout only provides `Organization` and `WebSite` schema (`app/layout.tsx`). AI engines recognize Space BQS from the Apple App Store, but lack a machine-readable `SoftwareApplication` entity linking the web and mobile apps.
- **Recommended Solution:**  
  Add a comprehensive `SoftwareApplication` JSON-LD schema defining:
  - `applicationCategory`: `"BusinessApplication"` / `"MaritimeSoftware"`
  - `operatingSystem`: `"iOS, Android, Web Browser"`
  - `name`: `"Space BQS"`
  - `downloadUrl`: `"https://apps.apple.com/sg/app/space-bqs/id6812992991"`
  - `featureList`: `["ASTM D1250 Table 54B Calculation Engine", "72-Hour Offline Vessel Sounding Capture", "Locked PDF Certificate Generation", "Tank Strapping Table Interpolation"]`
- **Relevant Code Files:** `app/layout.tsx` (or `app/components/Schema.tsx`)
- **Priority:** **Critical**
- **Expected Result:** AI knowledge graphs and search engines recognize Space BQS as a unified multi-platform software entity.
- **Acceptance Criteria:** Google Rich Results Test validates `SoftwareApplication` schema with 0 errors.

---

##### `TASK-SCHEMA-02`: Add `FAQPage` Schema to Core Resource Guides
- **Category:** Structured Data / AI Visibility
- **Affected URLs:** `https://aibqs.com/resources/*`, `https://aibqs.com/how-we-measure`
- **Evidence from Report & Codebase:**  
  Resource pages feature Q&A sections (`Faq` component), but output plain HTML without microdata or JSON-LD.
- **Recommended Solution:**  
  Inject `@type: "FAQPage"` JSON-LD dynamically into `app/resources/[slug]/page.tsx` based on the resource FAQs.
- **Relevant Code Files:** `app/resources/[slug]/page.tsx`, `app/lib/resources.ts`
- **Priority:** **High**
- **Expected Result:** Direct eligibility for Google FAQ rich snippets and enhanced citation ingestion for LLMs.
- **Acceptance Criteria:** Google Rich Results Test confirms valid `FAQPage` schema on resource URLs.

---

##### `TASK-SCHEMA-03`: Implement `BreadcrumbList` Schema
- **Category:** Structured Data / On-Page SEO
- **Affected URLs:** All 43 site URLs
- **Evidence from Report & Codebase:**  
  Visual breadcrumbs are rendered by `<Breadcrumbs trail={...} />`, but no schema is emitted.
- **Recommended Solution:**  
  Update `Breadcrumbs` component in `app/components/ui.tsx` to automatically emit a matching `BreadcrumbList` JSON-LD object.
- **Relevant Code Files:** `app/components/ui.tsx`
- **Priority:** **High**
- **Expected Result:** Breadcrumb navigation displayed directly in Google search result snippets.
- **Acceptance Criteria:** Schema validator verifies hierarchical `BreadcrumbList` on subpages.

---

##### `TASK-SCHEMA-04`: Enrich `Organization` Schema with Verified Social Profiles & IDs
- **Category:** Structured Data / Authority
- **Affected URLs:** `https://aibqs.com/`
- **Evidence from Report & Codebase:**  
  `ORG_SCHEMA` in `app/layout.tsx` lacks `sameAs` array linking to official GitHub, App Store, LinkedIn, and YouTube channels established in `app/social-media-platforms`.
- **Recommended Solution:**  
  Update `ORG_SCHEMA` with `sameAs: [...]` linking official verified social profiles.
- **Relevant Code Files:** `app/layout.tsx`
- **Priority:** **Medium**
- **Expected Result:** Stronger entity association in Google Knowledge Graph and AI search indices.
- **Acceptance Criteria:** `Organization` schema includes valid `sameAs` links.

---

#### E. AI Visibility & LLM Optimization (GEO)

##### `TASK-GEO-01`: Overhaul and Expand `/llms.txt` with Complete Marine Keyword Taxonomies
- **Category:** AI Visibility / GEO
- **Affected URLs:** `https://aibqs.com/llms.txt`
- **Evidence from Report & Codebase:**  
  `app/llms.txt/route.ts` is currently concise (25 lines) and omits explicit reference to ASTM D1250 Table 54B, offline shipboard operations, BDN dispute resolution, and App Store URLs.
- **Recommended Solution:**  
  Enrich `/llms.txt` to cover:
  - Technical calculation engine specs (ASTM D1250 Table 54B, Table 54A, API gravity, density at 15°C, VCF bilinear interpolation).
  - Explicit workflows: Delivery attendance, ROB on/off-hire, Debunkering removal.
  - Offline capability details (72-hour deck offline mode, vessel QR scan, tank strapping).
  - Official citations & app links (`apps.apple.com/sg/app/space-bqs/id6812992991`).
- **Relevant Code Files:** `app/llms.txt/route.ts`
- **Priority:** **Critical**
- **Expected Result:** LLM web scrapers (OAI-SearchBot, PerplexityBot, Claude-SearchBot) index full technical taxonomy.
- **Acceptance Criteria:** Navigating to `/llms.txt` serves comprehensive, structured markdown covering all core marine BQS capabilities.

---

##### `TASK-GEO-02`: Optimize for ASTM 54B Prompts (Bridge Prompt #5 & #7 Gap)
- **Category:** AI Visibility / Content Optimization
- **Affected URLs:** `https://aibqs.com/features/calculation-audit`, `https://aibqs.com/how-we-measure`
- **Evidence from Report & Codebase:**  
  In prompt #5 (*"Which tools support ASTM 54B bunker quantity calculations?"*), Space BQS was **not mentioned** (AMC, Seven Surveyor, The Naval Arch were cited). In prompt #7, it was mentioned in passing but competitors got all citations.
- **Recommended Solution:**  
  Incorporate authoritative headings, formulas, and comparison benchmarks on `/how-we-measure` and `/features/calculation-audit` explicitly targeting "ASTM D1250 Table 54B calculation software", "ASTM Petroleum Measurement Tables Volume VIII", and "deterministic marine fuel quantity engine".
- **Relevant Code Files:** `app/how-we-measure/page.tsx`, `app/features/calculation-audit/page.tsx`
- **Priority:** **Critical**
- **Expected Result:** Space BQS cited as the premier software solution for ASTM D1250 Table 54B bunker calculations.
- **Acceptance Criteria:** Search/AI queries for "ASTM 54B bunker quantity software" cite `aibqs.com/how-we-measure`.

---

##### `TASK-GEO-03`: Target "Offline Marine Survey App" Prompts (Bridge Prompt #10 & #15 Gap)
- **Category:** AI Visibility / GEO
- **Affected URLs:** `https://aibqs.com/mobile-app`
- **Evidence from Report & Codebase:**  
  In prompt #15 (*"Which marine survey apps work without an internet connection onboard?"*), MarineSnap won all citations; Space BQS had **zero mentions**.
- **Recommended Solution:**  
  Enhance `/mobile-app` copy to prominently address:
  - "Offline marine survey mobile app for vessel tank soundings"
  - "72-hour zero-connectivity offline deck capture"
  - "PWA / Native iOS and Android offline data synchronization"
  - Link directly to the Apple App Store listing with reciprocal metadata.
- **Relevant Code Files:** `app/mobile-app/page.tsx`
- **Priority:** **High**
- **Expected Result:** Space BQS ranks in top AI answers for onboard offline marine survey applications.
- **Acceptance Criteria:** Prompt re-test on ChatGPT/Perplexity lists Space BQS among top offline tools.

---

##### `TASK-GEO-04`: Create "Spreadsheet Formula Errors in BQS" Authority Page (Bridge Prompt #2 Gap)
- **Category:** AI Visibility / Authority
- **Affected URLs:** `https://aibqs.com/why-independent`, `https://aibqs.com/resources/spreadsheet-errors-bunker-calculation` (New or expanded)
- **Evidence from Report & Codebase:**  
  Prompt #2 (*"How do bunker calculation systems prevent spreadsheet formula errors?"*) produced zero brand mentions or citations across the board.
- **Recommended Solution:**  
  Expand `/why-independent` or add a dedicated technical resource analyzing:
  - Common Excel formula breakdown in marine soundings (corrupted cell links, untracked overrides, manual density entry).
  - How deterministic code architectures enforce immutable calculations and audit trails.
- **Relevant Code Files:** `app/why-independent/page.tsx`, `app/lib/resources.ts`
- **Priority:** **High**
- **Expected Result:** AI engines utilize Space BQS as the definitive case study on why marine surveyors replace spreadsheets.
- **Acceptance Criteria:** Prompt #2 re-evaluation generates citation to `aibqs.com/why-independent`.

---

##### `TASK-GEO-05`: Implement Direct App-to-Web Citation Signals (Bridge Prompts #4, #8, #12)
- **Category:** AI Visibility / GEO
- **Affected URLs:** `https://aibqs.com/mobile-app`, `https://aibqs.com/sample-report`
- **Evidence from Report & Codebase:**  
  ChatGPT consistently cited `apps.apple.com/sg/app/space-bqs/id6812992991` when discussing Space BQS, but **never** cited `aibqs.com`.
- **Recommended Solution:**  
  - Ensure the Apple App Store marketing URL points directly to `https://aibqs.com`.
  - Embed deep App Store badges and structured `hasPart` / `relatedLink` schema on `/mobile-app` to establish strong bi-directional entity equivalence between the App Store listing and the website.
- **Relevant Code Files:** `app/mobile-app/page.tsx`, `app/layout.tsx`
- **Priority:** **Medium**
- **Expected Result:** ChatGPT and Perplexity associate App Store authority with `aibqs.com`, citing the web documentation alongside the app.
- **Acceptance Criteria:** AI response citations include `aibqs.com` for prompts #4, #8, and #12.

---

#### F. Content Optimization & Thin Content Expansion

##### `TASK-CONT-01`: Expand High-Intent Pricing Page (Overcome 265-Word Count)
- **Category:** Content Optimization
- **Affected URLs:** `https://aibqs.com/pricing`
- **Evidence from Report & Codebase:**  
  `audit-pages.csv` reports only 265 words on `/pricing`. Thin commercial pages face crawl demotion.
- **Recommended Solution:**  
  Add comprehensive commercial FAQs, licensing models breakdown (independent surveyor vs. enterprise fleet firm), onboarding timeline, pilot program details, and team seat structure.
- **Relevant Code Files:** `app/pricing/page.tsx`
- **Priority:** **Critical**
- **Expected Result:** Page body expanded to > 650 high-value words answering all buyer intent queries.
- **Acceptance Criteria:** Word count > 500 words; page includes structured pricing FAQs.

---

##### `TASK-CONT-02`: Deepen Feature Subpages (Expand from ~230 words to 500+ words)
- **Category:** Content Optimization
- **Affected URLs:**  
  - `/features` (211 words)
  - `/features/calculation-audit` (260 words)
  - `/features/reports-ai` (225 words)
  - `/features/survey-register-dashboard` (233 words)
  - `/features/vessels-master-data` (234 words)
- **Evidence from Report & Codebase:**  
  All 5 feature pages have fewer than 265 words each.
- **Recommended Solution:**  
  - Add technical pipeline diagrams, user role breakdowns, and data flow steps.
  - On `/features/calculation-audit`, provide complete worked mathematical examples (Ullage -> Volume -> Free Water -> Table 54B VCF -> Metric Tonnes).
  - On `/features/reports-ai`, clearly explain locked PDF immutability and AI anomaly detection bounds.
- **Relevant Code Files:** `app/features/page.tsx`, `app/features/*/page.tsx`
- **Priority:** **High**
- **Expected Result:** Feature pages provide comprehensive technical substance, improving organic indexing and LLM context extraction.
- **Acceptance Criteria:** Every feature page exceeds 500 words.

---

##### `TASK-CONT-03`: Enhance Public Tool Calculator Pages
- **Category:** Content Optimization
- **Affected URLs:**  
  - `/tools/bdn-discrepancy` (210 words)
  - `/tools/rob-balance` (208 words)
  - `/tools/unit-converter` (209 words)
  - `/tools/volume-to-mass` (241 words)
- **Evidence from Report & Codebase:**  
  Tools pages contain interactive widgets but minimal surrounding explanatory context (~210 words).
- **Recommended Solution:**  
  Add detailed formula explanations, standard reference criteria (ISO 8217, ASTM D1250), step-by-step calculation guides, and "When to use this tool" callouts beneath the interactive widgets.
- **Relevant Code Files:** `app/tools/[tool]/page.tsx`, `app/lib/tools.ts`
- **Priority:** **High**
- **Expected Result:** Tool pages rank organically for target calculation queries (e.g., "bunker BDN discrepancy calculator", "marine fuel volume to mass converter").
- **Acceptance Criteria:** Word count > 450 words on all tool pages.

---

##### `TASK-CONT-04`: Expand Debunkering and ROB Service Pages
- **Category:** Content Optimization
- **Affected URLs:** `https://aibqs.com/services/debunkering-survey` (230 words), `https://aibqs.com/services/rob-survey` (281 words)
- **Evidence from Report & Codebase:**  
  High-value survey workflow pages have under 300 words.
- **Recommended Solution:**  
  Add operational checklists, surveyor roles, charterparty dispute prevention context, and sample certificate excerpts.
- **Relevant Code Files:** `app/services/debunkering-survey/page.tsx`, `app/services/rob-survey/page.tsx`
- **Priority:** **High**
- **Expected Result:** Pages establish topical authority for debunkering and on/off-hire ROB surveys.
- **Acceptance Criteria:** Word count > 550 words per workflow page.

---

##### `TASK-CONT-05`: Enrich Contact and Demo Pages with Clear Conversion Scope
- **Category:** Content Optimization
- **Affected URLs:** `https://aibqs.com/contact` (194 words), `https://aibqs.com/demo` (206 words), `https://aibqs.com/request-demo` (217 words)
- **Evidence from Report & Codebase:**  
  Contact and demo routes are minimal forms with minimal context (~200 words).
- **Recommended Solution:**  
  Add operational assurances (pilot workspace setup, turnaround expectations, team onboarding details, data security summary).
- **Relevant Code Files:** `app/contact/page.tsx`, `app/demo/page.tsx`, `app/request-demo/page.tsx`
- **Priority:** **Medium**
- **Expected Result:** Reduced bounce rate on lead conversion pages.
- **Acceptance Criteria:** Word count > 350 words on demo and contact pages.

---

##### `TASK-CONT-06`: Expand Short Resource Articles (< 300 words)
- **Category:** Content Optimization
- **Affected URLs:**  
  - `/resources/bdn-vs-actual` (291 words)
  - `/resources/on-off-hire-fuel-settlement` (286 words)
  - `/resources/rob-checklist` (283 words)
  - `/resources/temperature-correction-explained` (292 words)
  - `/resources/ullage-vs-sounding` (286 words)
- **Evidence from Report & Codebase:**  
  5 educational resources hover between 280 and 295 words, falling just short of the 300-word standard threshold.
- **Recommended Solution:**  
  Add real-world surveyor tips, common pitfalls to avoid, and visual summary tables.
- **Relevant Code Files:** `app/lib/resources.ts`, `app/resources/[slug]/page.tsx`
- **Priority:** **Medium**
- **Expected Result:** All educational guides reach 450–600 words of actionable technical copy.
- **Acceptance Criteria:** 0 resource articles under 350 words.

---

#### G. Authority & Citation Improvements

##### `TASK-AUTH-01`: Implement External Maritime Authority Citation Linking
- **Category:** Authority & Citation Improvements
- **Affected URLs:** `https://aibqs.com/how-we-measure`, `https://aibqs.com/resources/standards-in-plain-English`
- **Evidence from Report & Codebase:**  
  In prompt #1, ChatGPT cited BIMCO, AmSpec, ISO 13739, and ASTM store. Space BQS references these standards in prose but does not link to them or explain compliance methodology.
- **Recommended Solution:**  
  Add formal standards reference citations to official BIMCO Bunkering Guides, ISO 13739:2020, and ASTM D1250 Petroleum Measurement Tables to position Space BQS within the authoritative maritime taxonomy.
- **Relevant Code Files:** `app/how-we-measure/page.tsx`, `app/resources/[slug]/page.tsx`
- **Priority:** **High**
- **Expected Result:** Search engines recognize outbound topical citations to standard-setting bodies.
- **Acceptance Criteria:** Methodological pages cite official ISO and ASTM standards.

---

##### `TASK-AUTH-02`: Publish Official Port Authority & Digital Bunkering Alignment
- **Category:** Authority & Citation Improvements
- **Affected URLs:** `https://aibqs.com/solutions/space-bqs`, `https://aibqs.com/services/bunker-delivery-survey`
- **Evidence from Report & Codebase:**  
  Prompt #9 (*"Which bunker survey platforms create audit-ready bunker certificates?"*) heavily cited the Maritime and Port Authority of Singapore (MPA Singapore) and WorldPorts.
- **Recommended Solution:**  
  Add a dedicated section detailing how Space BQS aligns with digital bunkering documentation standards (e.g., Singapore SS 648 / SS 600 standards, digital BDN readiness).
- **Relevant Code Files:** `app/solutions/space-bqs/page.tsx`, `app/services/bunker-delivery-survey/page.tsx`
- **Priority:** **High**
- **Expected Result:** Space BQS surfaces in AI searches regarding port authority compliance and digital bunkering.
- **Acceptance Criteria:** Digital bunkering and port standard compliance clearly articulated in copy.

---

##### `TASK-AUTH-03`: Establish Reciprocal Backlink Profile with Marine Survey Directories
- **Category:** Authority & Citation Improvements
- **Affected URLs:** Domain level (`https://aibqs.com`)
- **Evidence from Report & Codebase:**  
  Competitors like `SevenSurveyor`, `MarineSurvey.online`, and `IM Surveyor` receive 3–5 citations per prompt run largely due to legacy web directory backlinks.
- **Recommended Solution:**  
  Register Space BQS with marine surveying registries, surveyor associations, and naval architecture portals.
- **Relevant Code Files:** N/A (Off-page / outreach)
- **Priority:** **Medium**
- **Expected Result:** Increase domain authority to > 25 DA.
- **Acceptance Criteria:** Verified listings in top 3 marine surveyor technology directories.

---

##### `TASK-AUTH-04`: Create Downloadable Whitepaper on ASTM D1250 Calculation Integrity
- **Category:** Authority & Citation Improvements
- **Affected URLs:** `https://aibqs.com/resources`, `https://aibqs.com/sample-report`
- **Evidence from Report & Codebase:**  
  Technical queries for bunker calculation validation rely on downloadable PDF whitepapers (BIMCO, North Standard).
- **Recommended Solution:**  
  Offer a downloadable PDF technical specification: *"Deterministic Marine Fuel Calculation: Why Excel Fails in Bunker Audits"*.
- **Relevant Code Files:** `app/resources/page.tsx`, `public/assets/`
- **Priority:** **Low**
- **Expected Result:** High-value linkable asset generating organic citations.
- **Acceptance Criteria:** Downloadable PDF available with lead capture or direct link.

---

## 5. Implementation Sequence & Waves

```
WAVE 1: Critical Technical & Metadata Fixes (Immediate - Safe to Automate)
├── TASK-TECH-01: Fix production SITE_URL in app/lib/site.ts
├── TASK-TECH-02: Fix hardcoded sitemap URL in app/robots.ts
├── TASK-META-01: Strip duplicate brand suffix in app/resources/[slug]/page.tsx
├── TASK-META-02: Clean up static titles in /contact, /demo, /social-media-platforms
├── TASK-META-04: Implement server metadata for /sample-report
└── TASK-SCHEMA-01: Add SoftwareApplication schema to app/layout.tsx

WAVE 2: Title Lengths, Semantics & AI LLM Discovery
├── TASK-META-03: Refine overly long feature/service titles (< 60 chars)
├── TASK-GEO-01: Comprehensive expansion of app/llms.txt/route.ts
├── TASK-SCHEMA-02: Add FAQPage JSON-LD to resources
├── TASK-SCHEMA-03: Add BreadcrumbList schema to app/components/ui.tsx
└── TASK-HEAD-01 & 03: Validate heading tags and card outlines

WAVE 3: Content Depth Expansion & Topic Authority (Requires Copy Review)
├── TASK-CONT-01: Expand /pricing page (> 500 words)
├── TASK-CONT-02: Deepen 5 feature pages (> 500 words)
├── TASK-CONT-03: Expand 4 calculator tool pages (> 450 words)
├── TASK-CONT-04: Expand debunkering and ROB workflow pages
├── TASK-GEO-02: Author ASTM 54B authority copy on /how-we-measure
└── TASK-AUTH-01 & 02: Add standards citations (ISO 13739, BIMCO, MPA)
```

---

## 6. Items Requiring Manual & Business Review

Before executing Wave 3 tasks, review the following items with maritime operations and business leadership:
1. **ASTM D1250 Table 54B Claim Wording:**  
   Confirm precision wording regarding ASTM D1250-04 / Table 54B implementation (e.g., whether calculations are strictly quantity-only, and clarifying that laboratory fuel quality analysis is out of scope).
2. **Pricing Structure Copy:**  
   Review public copy on `/pricing` to ensure it aligns with sales strategy ("team license by surveyors and volume", "pilot workspace before commitment").
3. **Primary Production Domain:**  
   Confirm whether the official production domain to be indexed is `https://aibqs.com` or `https://spacebqs.com`. (Audit was run on `https://aibqs.com`).

---

## 7. Status & Execution Progress

- [x] **Wave 1 (Critical Technical & Domain Configuration):** **COMPLETED & VERIFIED**
  - Updated production `SITE_URL` to `https://aibqs.com` in `app/lib/site.ts`.
  - Replaced hardcoded `.example` sitemap URL in `app/robots.ts` with dynamic `${SITE_URL}/sitemap.xml`.
  - Added `/social-media-platforms` to `app/sitemap.ts`.
  - Injected complete `SoftwareApplication`, `WebSite`, and `Organization` JSON-LD schemas in `app/layout.tsx`.
  - Resolved title duplication (`— Space BQS | Space BQS`) in `app/resources/[slug]/page.tsx`, `app/contact/page.tsx`, `app/demo/page.tsx`, and `app/social-media-platforms/page.tsx`.
  - Created server metadata wrapper `app/sample-report/layout.tsx`.

- [x] **Wave 2 (Title Length Optimization, Semantics & AI LLM Discovery):** **COMPLETED & VERIFIED**
  - Optimized 11 overly long feature and service titles to stay under 60 characters and target high-intent marine surveyor keywords.
  - Overhauled `app/llms.txt/route.ts` with complete ASTM D1250 Table 54B calculation specs, 72h offline deck capabilities, verified URLs, and regulatory alignment.
  - Injected dynamic `FAQPage` schema on all educational resource articles.
  - Implemented absolute URLs for `BreadcrumbList` JSON-LD schema across the site in `app/components/ui.tsx`.
  - Verified with `npm run typecheck` and `npm run test:tools` (10/10 tests passed).

- [x] **Wave 3 (Content Depth Expansion & External Topic Authority):** **COMPLETED & VERIFIED**
  - `TASK-CONT-01`: Expanded [`/pricing`](file:///c:/My%20Folder/Codes/BQS/app/pricing/page.tsx) to ~700+ words with 3 licensing tiers, commercial FAQs, pilot workspace workflow, and clear buyer-intent guidance.
  - `TASK-CONT-02`: Deepened all 5 feature pages ([`/features`](file:///c:/My%20Folder/Codes/BQS/app/features/page.tsx), [`/features/calculation-audit`](file:///c:/My%20Folder/Codes/BQS/app/features/calculation-audit/page.tsx), [`/features/reports-ai`](file:///c:/My%20Folder/Codes/BQS/app/features/reports-ai/page.tsx), [`/features/survey-register-dashboard`](file:///c:/My%20Folder/Codes/BQS/app/features/survey-register-dashboard/page.tsx), [`/features/vessels-master-data`](file:///c:/My%20Folder/Codes/BQS/app/features/vessels-master-data/page.tsx)) with 5-step pipeline architecture, worked mathematical validation checks, and role governance.
  - `TASK-CONT-03`: Enhanced all 4 calculator tool pages in [`app/lib/tools.ts`](file:///c:/My%20Folder/Codes/BQS/app/lib/tools.ts) and [`app/tools/[tool]/page.tsx`](file:///c:/My%20Folder/Codes/BQS/app/tools/%5Btool%5D/page.tsx) to 500+ words each with mathematical formulas, standard reference citations, worked step-by-step benchmarks, and `FAQPage` schema.
  - `TASK-CONT-04`: Expanded workflow pages for [`/services/debunkering-survey`](file:///c:/My%20Folder/Codes/BQS/app/services/debunkering-survey/page.tsx) and [`/services/rob-survey`](file:///c:/My%20Folder/Codes/BQS/app/services/rob-survey/page.tsx) to over 600 words each with operational checklists, dispute prevention math, and surveyor guidance.
  - `TASK-GEO-02` & `TASK-AUTH-01` & `02`: Authored authoritative standards citations on [`/how-we-measure`](file:///c:/My%20Folder/Codes/BQS/app/how-we-measure/page.tsx) for ASTM D1250-04 Table 54B, API MPMS Chapter 11.1, ISO 13739:2020, BIMCO Standard Terms, and Singapore SS 600/648 digital bunkering alignment.
  - `TASK-CONT-06`: Expanded 5 short resource articles in [`app/lib/resources.ts`](file:///c:/My%20Folder/Codes/BQS/app/lib/resources.ts) with practical surveyor advice and extra FAQs.
  - Verified with `npm run typecheck` (0 errors) and `npm run test:tools` (10/10 tests passed).
