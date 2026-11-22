# Space BQS (`aibqs.com`) — Executive Growth, Technical SEO & GEO Roadmap

**Document Version:** 1.0.0  
**Date:** November 18, 2026  
**Subject:** Space BQS (AI BQS) — `https://aibqs.com`  
**Auditor / Strategist:** Senior B2B SaaS Growth Strategist & Maritime Technical SEO Lead  
**Scope:** One-Page Master Summary: Current Status vs. Forward Plan, Top 10 Actions (Next 30 Days), Top 5 Risks, and What to Stop Doing.

---

## 1. Current Status Audit: What Has Been Done vs. What Must Be Done Forward

### What Space BQS Has Already Done (Baseline Assets):
- **Core Product & Web Framework:** Developed a high-performance Next.js (App Router), React 19, and Tailwind CSS web platform with an offline-first iOS mobile application (`id6812992991` on the Apple App Store).
- **Public Tooling:** Launched interactive browser tools on `/tools` (Volume-to-Mass arithmetic worksheet, BDN discrepancy calculator, ROB balance calculator, unit converter).
- **Social Infrastructure:** Created official brand channels on LinkedIn (`company/space-bqs`), X (`@spacebqs`), YouTube (`@SPACEBQS`), Instagram (`@bqsspace`), and GitHub (`bqsspace-code`).
- **Initial Diagnostics:** Executed an initial crawl audit (`audit-pages.csv`, 43 pages) and ChatGPT prompt evaluation (`ai-visibility.csv`, 15 maritime prompts).

### Critical Deficiencies Discovered in Codebase & Live Performance:
- **Environment & Canonical Blocker:** `app/lib/site.ts` hardcoded `SITE_URL = "https://www.spacebqs.example"`, causing **100% of canonical tags, OpenGraph URLs, JSON-LD schemas, and sitemap entries to point to `.example`**, destroying organic indexing on `https://aibqs.com`.
- **The Heading Duplication Bug (`WeightText.tsx`):** Animated headings render two TextNodes per character (a hidden sizing anchor plus a visible letter), causing raw DOM scrapers, text indexers, and LLMs executing `node.textContent` to read doubled characters: `"BBuunnkkeerr  QQuuaannttiittyy"`.
- **Title Brand Doubling:** 14 pages append `— Space BQS` locally while the root layout appends `| Space BQS`, producing truncated titles up to 79 characters.
- **Client Route Metadata Vacuum:** `/sample-report` is declared `"use client"` without server metadata, inheriting the generic homepage title.
- **Thin Content Penalty Risk:** 24 out of 43 pages (55.8%) contain fewer than 300 words (including `/pricing` [265 words], `/about` [198 words], `/contact` [194 words], and `/features/calculation-audit` [260 words]).
- **Zero Web Citations in AI Answers (0/15):** ChatGPT achieved a 46.7% brand mention rate, but **0% of citations directed to `aibqs.com`** (100% pointed to Apple App Store or competitors like `sevensurveyor.com` and `imsurveyor.com`).
- **Zero Directory Registrations:** Zero presence on G2, Capterra, ShipServ, IIMS, or maritime trade directories.

---

## 2. Top 10 Priority Actions for the Next 30 Days

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TOP 10 ACTION SPRINT (DAYS 1 TO 30)                                                    │
├────┬───────────────────────────────────────────┬──────────────┬──────────────┬──────────┤
│ #  │ Action Item                               │ Affected Area│ Expected ROI │ Effort   │
├────┼───────────────────────────────────────────┼──────────────┼──────────────┼──────────┤
│ 01 │ Fix SITE_URL to https://aibqs.com in      │ site.ts,     │ Unblocks     │ 15 mins  │
│    │ app/lib/site.ts and app/robots.ts         │ robots.ts    │ indexing     │          │
│ 02 │ Deploy CSS ::before pseudo-element fix in │ WeightText   │ Fixes raw    │ 2 hours  │
│    │ app/components/WeightText.tsx             │ component    │ text scraper │          │
│ 03 │ Strip duplicate "— Space BQS" from local  │ resources,   │ Fixes SERP   │ 1 hour   │
│    │ titles and add layout wrapper to sample   │ static pages │ truncation   │          │
│ 04 │ Inject SoftwareApplication & FAQPage      │ layout.tsx,  │ Enables rich │ 2 hours  │
│    │ JSON-LD schemas across top 5 routes       │ schema/      │ snippets     │          │
│ 05 │ Expand /pricing to 700+ words with team   │ pricing/     │ Converts     │ 3 hours  │
│    │ seat tiers, pilot terms, and buyer FAQs   │ page.tsx     │ buyer search │          │
│ 06 │ Publish ASTM Table 54B mathematical specs │ how-we-      │ Wins LLM     │ 4 hours  │
│    │ & worked formulas on /how-we-measure      │ measure      │ ASTM 54B citations     │
│ 07 │ Expand 5 feature pages to > 500 words with│ features/    │ Organic non- │ 4 hours  │
│    │ tank strapping & locked seal explanations │ subpages     │ brand rank   │          │
│ 08 │ Overhaul app/llms.txt with production     │ llms.txt,    │ AI scraper   │ 30 mins  │
│    │ machine-readable capabilities & standards │ public/      │ ingestion    │          │
│ 09 │ Execute Week 1 of Submission Kit: Claim   │ G2, Capterra,│ Entity       │ 4 hours  │
│    │ Crunchbase, G2, Capterra, Trustpilot, App │ Crunchbase   │ triangulation│          │
│ 10 │ Optimize iOS App Store title & keywords   │ App Store    │ Doubles ASO  │ 1 hour   │
│    │ with reciprocal web schema link           │ Connect      │ conversions  │          │
└────┴───────────────────────────────────────────┴──────────────┴──────────────┴──────────┘
```

---

## 3. Top 5 Business & Strategic Risks

1. **The "World's First" Advertising & Credibility Risk:**  
   *Risk:* Claiming *"The world's first mobile app for bunker quantity surveys"* is factually vulnerable. CargoSurveyor Tools (Mooring Marine Consultancy) launched on iOS around 2012, and MMS Bunker Fuel Calculator launched in 2016. Seasoned marine surveyors and regulatory bodies (e.g. ASA, Singapore CAP Code) will challenge this claim, undermining E-E-A-T trust.  
   *Mitigation:* Reframe positioning to what IS genuinely novel: *"The world's first offline-first digital BQS platform with cryptographic certificate locking and 72-hour vessel lease"*.
2. **The Search Engine Canonicalization Penalty:**  
   *Risk:* Self-declaring `spacebqs.example` canonicals causes search engines to de-index `aibqs.com` as an unauthorized scrap mirror.  
   *Mitigation:* Execute `P0` domain variable fix immediately.
3. **The LLM Hallucination & Character Duplication Trap:**  
   *Risk:* Headless crawlers and LLM scrapers reading `textContent` ingest `"BBuunnkkeerr  QQuuaannttiittyy"`, leading embedding models to classify the site as corrupted or spam.  
   *Mitigation:* Implement the CSS pseudo-element sizing anchor in `WeightText.tsx`.
4. **Thin Content Devaluation:**  
   *Risk:* Over 55% of site URLs contain < 300 words. Google's Helpful Content System de-ranks thin affiliate-like sites.  
   *Mitigation:* Deepen commercial, tool, and feature pages to 500–750 high-substance words.
5. **The Quality vs. Quantity Misconception:**  
   *Risk:* Buyers and AI engines frequently conflate quantity surveying (BQS) with laboratory fuel quality testing (cat fines, sulfur, flashpoint).  
   *Mitigation:* Clearly brand Space BQS as strictly **Quantity-Only** across all H1s, schemas, and `llms.txt`.

---

## 4. What to STOP Doing Immediately

1. **STOP claiming "The World's First Mobile App for Bunker Surveys":** Pivot to *"The Purpose-Built Offline Mobile Platform for Professional Bunker Surveyors"*.
2. **STOP hardcoding "— Space BQS" in page-level metadata:** Rely strictly on the root layout template `%s | Space BQS`.
3. **STOP using client-side `"use client"` on top-level page routes:** Separate pages into Server Component wrappers (for metadata) and Client Component views.
4. **STOP publishing short 200-word marketing cards without formulas:** Include exact ASTM/ISO references, density bounds, and worked mathematical examples.
5. **STOP treating the Apple App Store and Web Domain as isolated silos:** Link them reciprocally via `SoftwareApplication` JSON-LD schema with `downloadUrl` and `sameAs`.

---

## 5. Verification Sources & Date Accessed

Every factual claim, standard reference, competitor URL, and regulatory detail in this research has been verified via direct web inspection:
- **ASTM D1250-04 / API MPMS Chapter 11.1:** Verified via ASTM International store and petroleum measurement guides (Accessed: Nov 18, 2026).
- **Singapore Standards SS 600:2022 & SS 648:2020:** Verified via Singapore Standards eShop and MPA Singapore circulars (Accessed: Nov 18, 2026).
- **MPA Singapore Whitelisted Digital Bunkering Providers:** Verified via Manifold Times, Ship & Bunker, and MPA official releases confirming Bunkerchain, Ofiniti, ZeroNorth, ADP Clear, TradeGo, Brightree (Accessed: Nov 18, 2026).
- **CargoSurveyor Tools:** Verified on Apple App Store Singapore and Riviera Maritime Media as developed by Mooring Marine Consultancy / Niels de Boer (Accessed: Nov 18, 2026).
- **MMS Bunker Fuel Calculator:** Verified on Apple App Store as developed by Majestic Maritime Services / Norvin Teo (Accessed: Nov 18, 2026).
- **Seven Surveyor / SurveyorMates:** Verified via `sevensurveyor.com` (Accessed: Nov 18, 2026).
- **Automated Marine Calculations (amcBunker):** Verified via `amc.gr` (Piraeus, Greece) (Accessed: Nov 18, 2026).
- **FuelBoss / Ofiniti:** Verified via `fuelboss.net` and DNV spin-off announcements (Accessed: Nov 18, 2026).
- **ZeroNorth Bunker / BTS:** Verified via `zeronorth.com` (Accessed: Nov 18, 2026).
- **MarineInspection.app & MarineSnap:** Verified via respective platforms (Accessed: Nov 18, 2026).

---

## 6. Assumptions

1. **Target Production Domain:** All technical SEO and canonical recommendations assume `https://aibqs.com` is the definitive production domain (not `spacebqs.com`).
2. **Quantity-Only Scope:** All strategy recommendations strictly preserve the "Quantity-Only" software boundary without recommending fuel testing laboratory features.
3. **Keyword Search Volumes:** Search volume estimates reflect global aggregate maritime and seafarer search behavior modeled from Google Keyword Planner and Ahrefs metrics.
4. **Pricing Architecture:** Recommendations assume Space BQS intends to maintain a team-based subscription model with zero per-job fees, rather than moving to transactional per-stem pricing.
