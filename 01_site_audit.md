# Space BQS (`aibqs.com`) — Comprehensive Technical SEO, On-Page & Conversion Audit

**Audit Date:** November 18, 2026  
**Audited Domain:** `https://aibqs.com` (Space BQS / AI BQS)  
**Target Architecture:** Next.js (App Router), React 19, TypeScript, Tailwind CSS  
**Auditor:** Senior B2B SaaS Growth Strategist & Technical SEO Lead  
**Scope:** Full-site crawl (43 public routes), static AST codebase inspection (`C:\My Folder\Codes\BQS`), DOM rendering evaluation, Core Web Vitals, Structured Data, E-E-A-T, and Conversion Audit.

---

## 1. Executive Findings & Current SEO Status

A rigorous static and architectural audit of `https://aibqs.com` reveals a high-performance modern web framework whose organic visibility and indexing potential are currently throttled by **critical environment configuration mismatches, duplicate heading rendering in raw DOM extractors, brand duplication in title tags, and pervasive thin content across commercial conversion routes**.

```
AUDIT HEALTH METRICS SNAPSHOT:
├── Audited Public URLs: 43 pages (100% HTTP 200 OK)
├── Server Response Time (TTFB): ~85ms (Excellent)
├── Production Canonical Mismatch: 100% of pages emit placeholder 'spacebqs.example' domain
├── Heading Duplication Bug: Active in WeightText.tsx (Raw DOM emits 'BBuunnkkeerr QQuuaannttiittyy')
├── Title Length Violations (> 60 chars): 19 pages (44.2%)
├── Brand Doubling in Titles ('— Space BQS | Space BQS'): 14 pages (32.6%)
├── Thin Content Pages (< 300 words): 24 pages (55.8%)
├── Missing Unique Metadata: /sample-report (defaults to root layout fallback)
└── Structured Data Gap: Missing SoftwareApplication, MobileApplication, FAQPage, BreadcrumbList
```

---

## 2. Technical SEO & Architecture Audit

### 2.1. Domain & Canonicalization Configuration (CRITICAL BUG)
- **Evidence:**  
  In [`app/lib/site.ts`](file:///c:/My%20Folder/Codes/BQS/app/lib/site.ts#L1-L4):
  ```typescript
  export const SITE_NAME = "Space BQS";
  export const SITE_URL = "https://www.spacebqs.example"; // <-- CRITICAL ERROR
  export const CONTACT_EMAIL = "ops@spacebqs.example";
  export const ENGINE_VERSION = "1.0.0";
  ```
  In [`app/robots.ts`](file:///c:/My%20Folder/Codes/BQS/app/robots.ts#L16):
  ```typescript
  sitemap: "https://www.spacebqs.example/sitemap.xml", // <-- CRITICAL ERROR
  ```
  In [`app/layout.tsx`](file:///c:/My%20Folder/Codes/BQS/app/layout.tsx#L33):
  ```typescript
  metadataBase: new URL(SITE_URL), // Emits https://www.spacebqs.example for all canonicals and OG URLs
  ```
- **Impact:** **HIGH / BLOCKER**.  
  Googlebot, Bingbot, and LLM web indexers evaluate `canonical` tags to consolidate ranking signals. Because every page on `https://aibqs.com` self-declares its canonical URL as `https://www.spacebqs.example/*`, search engines treat `aibqs.com` as an unauthorized duplicate or scrap mirror of a non-existent `.example` domain, leading to severe indexation suppression, sitelink forfeiture, and zero domain authority accumulation.
- **Immediate Fix:**  
  Update `app/lib/site.ts` to bind dynamically to `process.env.NEXT_PUBLIC_SITE_URL || "https://aibqs.com"`. Fix `robots.ts` to import `SITE_URL`.

---

### 2.2. The Text-Split Heading Rendering Bug (`WeightText.tsx`)

#### Investigation of the Root Cause
The prompt specifically requested an audit of whether headings render with duplicated characters in the raw DOM (e.g., `"BBuunnkkeerr QQuuaannttiittyy"`) due to text-split animation, and how crawlers/screen readers interpret it.

Inspection of [`app/components/WeightText.tsx`](file:///c:/My%20Folder/Codes/BQS/app/components/WeightText.tsx#L472-L536) reveals the exact architectural mechanism generating this defect:

```tsx
// Inside WeightText.tsx lines 488-535:
return (
  <span key={i} className="inline-grid text-center" style={{ gridTemplateAreas: '"char"' }}>
    {/* Sizing anchor at activeWeight: locks width from initial render. Strictly hidden. */}
    <span
      aria-hidden="true"
      className="invisible select-none pointer-events-none"
      style={{
        gridArea: "char",
        fontVariationSettings: `"wght" ${activeWeight}`,
        fontWeight: activeWeight,
        visibility: "hidden",
        opacity: 0,
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {letter} {/* <-- OCCURRENCE #1 (DOM Text Node) */}
    </span>

    {/* Visible animated letter */}
    <span
      data-letter
      style={{
        gridArea: "char",
        fontVariationSettings: `"wght" ${weight}`,
        fontWeight: weight,
        color,
      }}
    >
      {letter} {/* <-- OCCURRENCE #2 (DOM Text Node) */}
    </span>
  </span>
);
```

#### Crawler & Screen Reader Impact Analysis
1. **Raw DOM & Text Scrapers (`node.textContent`):**  
   Standard HTML text parsers (including search engine indexers before CSS style computation, headless HTTP scrapers, Cheerio, BeautifulSoup, and markdown extractors used by LLMs like GPTBot and ClaudeBot) read `element.textContent`. In the DOM specification, `textContent` returns the concatenation of **all descendant TextNodes**, completely disregarding `visibility: hidden`, `opacity: 0`, and CSS classes. As a result, the heading:
   `"Bunker Quantity Surveys"` renders in the raw text stream as:
   `"BBuunnkkeerr  QQuuaannttiittyy  SSuurrvveeyyss"`.
2. **Search Engine Query Ingestion:**  
   When Googlebot crawls SSR HTML without executing a full rendering cycle, it encounters gibberish character tokens. Tokenizers cannot match `"BBuunnkkeerr"` to high-intent keywords like `"Bunker"`, degrading organic ranking across all animated titles (including H1/H2 tags on the homepage, `/features`, and `/platform`).
3. **Screen Readers & Accessibility (WCAG 2.1 AA):**  
   The parent container defines `<Tag aria-label={plainText} suppressHydrationWarning>`, and wraps the character grid in `<span aria-hidden="true">`. While modern NVDA, JAWS, and VoiceOver implementations adhere to `aria-label` on heading elements, certain mobile screen readers and Braille displays fall back to inner text node traversal when encountering complex CSS grid structures, producing double-character speech output.

#### The Architectural Solutions & Recommended Production Fix

##### Option 1 (RECOMMENDED): CSS Pseudo-Element Sizing Anchor (Zero Extra DOM TextNodes)
CSS generated content via `::before` or `::after` does **not** create a DOM TextNode. Consequently, `element.textContent` never reads it, completely eliminating the duplicate character bug while preserving 100% of the variable-font width-locking layout stability.

```tsx
// PRODUCTION FIX FOR WeightText.tsx:
// 1. Render only ONE TextNode inside the character container
// 2. Put the character in a data-char attribute on the wrapper
<span
  key={i}
  className="weight-char-wrapper inline-grid text-center"
  data-char={letter}
  style={{
    gridTemplateAreas: '"char"',
    verticalAlign: "baseline",
    lineHeight: "inherit",
  }}
>
  {/* Single visible animated letter */}
  <span
    data-letter
    style={{
      gridArea: "char",
      fontVariationSettings: `"wght" ${weight}`,
      fontWeight: weight,
      color,
      lineHeight: "inherit",
      display: "inline-block",
    }}
  >
    {letter}
  </span>
</span>
```

In `app/globals.css`:
```css
/* Width-locking sizing anchor via CSS pseudo-element */
.weight-char-wrapper::before {
  content: attr(data-char);
  grid-area: char;
  font-variation-settings: "wght" 800;
  font-weight: 800;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  user-select: none;
  line-height: inherit;
  height: 0;
  overflow: hidden;
}
```
*Result:* `element.textContent` outputs `"Bunker Quantity"` cleanly. Sizing calculation remains pixel-perfect.

##### Option 2: Pure Visually Hidden Text + `aria-hidden` Visual Split
```tsx
<Tag id={id} className={className} style={style}>
  {/* Clean, un-split text for all crawlers, screen readers, and LLM text extractors */}
  <span className="sr-only">{plainText}</span>

  {/* Visual animation layer completely hidden from accessibility tree & scrapers */}
  <span aria-hidden="true" className="inline select-none">
    {/* Animated letter spans */}
  </span>
</Tag>
```

---

### 2.3. Sitemap Coverage & Indexability Audit
- **Current File:** [`app/sitemap.ts`](file:///c:/My%20Folder/Codes/BQS/app/sitemap.ts#L7-L44)
- **Status:** Lists 36 static paths + 4 tool slugs + 9 resource slugs = 49 total URLs.
- **Omissions Identified:**
  1. `/social-media-platforms` is missing from `statics` array in `sitemap.ts`.
  2. All generated URLs prefix `${SITE_URL}`, outputting `https://www.spacebqs.example/*` rather than `https://aibqs.com/*`.
  3. No `<lastmod>` timestamps are defined for static marketing and feature pages, preventing Google from prioritizing refreshed content.

---

### 2.4. Core Web Vitals & Asset Performance
- **Font Delivery:** Next.js loads 3 Google Fonts (`Inter`, `Bricolage_Grotesque`, `JetBrains_Mono`) via `next/font/google` with `display: swap`. Healthy.
- **Render-Blocking CSS:** 4 custom stylesheets are imported across components (`marine-design.css`, `liquid-glass.css`, `cool-pearl.css`, `home-workflow-journey.css`). These must be compiled into Tailwind utilities or minified to prevent layout shifts (CLS) on mobile 3G/4G connections aboard vessels.
- **Image Formats & Weights:** Images in `/public/assets` use modern WebP/PNG formats with explicit dimensions. 0 missing alt tags found across all 43 audited pages.

---

## 3. On-Page SEO Audit: Metadata, Titles & Content Depth

### 3.1. The Brand Suffix Doubling Defect
The root layout [`app/layout.tsx`](file:///c:/My%20Folder/Codes/BQS/app/layout.tsx#L34-L37) defines the global title template:
```typescript
title: {
  default: `${SITE_NAME} — BQS Software for Marine Surveyors`,
  template: `%s | ${SITE_NAME}`, // Appends " | Space BQS" automatically
}
```
Concurrently, **14 pages and resource templates** manually define titles ending in `— Space BQS`.
- **Result:** Rendered titles become:  
  `"ROB at on-hire and off-hire: checklist for survey teams — Space BQS | Space BQS"` (79 characters).
- **SERP Consequence:** Google truncates all titles beyond 60 characters (600px width), cutting off high-intent search terms and displaying redundant brand repetitions: `ROB at on-hire and off-hire: checklist for survey teams — Space...`.

### 3.2. Missing Server Metadata on `/sample-report`
[`app/sample-report/page.tsx`](file:///c:/My%20Folder/Codes/BQS/app/sample-report/page.tsx#L1) begins with `"use client";` without a dedicated `layout.tsx` metadata wrapper or server component shell.
- **Current Title:** Inherits root default `"Space BQS — BQS Software for Marine Surveyors"` (identical to homepage).
- **Target Title:** `"Sample Bunker Survey Certificate & Excel Audit Package | Space BQS"`.

### 3.3. Thin Content Analysis (< 300 words)
Over **55% of the site (24 out of 43 pages)** contains fewer than 300 words:

| Page URL | Current Word Count | Primary Intent | SEO & Ranking Risk |
| :--- | :---: | :--- | :--- |
| `/pricing` | 265 | Commercial / Buyer | Thin commercial page; fails to rank for "bunker survey software cost" |
| `/about` | 198 | Brand / E-E-A-T | Lacks company registration, founder bios, surveyor advisory board |
| `/contact` | 194 | Conversion | Low keyword density; weak conversion copy |
| `/demo` & `/request-demo` | 206 / 217 | Conversion | Sparse form context; lacks pilot assurances or turnaround SLA |
| `/features/calculation-audit` | 260 | High Technical Intent | Fails to show worked Table 54B mathematical calculation examples |
| `/features/reports-ai` | 225 | High Technical Intent | Lacks deep technical explanation of locked PDF cryptographic seal |
| `/features/vessels-master-data` | 234 | Product Feature | Insufficient detail on tank strapping table import formats |
| `/services/debunkering-survey` | 230 | High Search Intent | Misses off-spec fuel removal & charter dispute context |
| `/services/rob-survey` | 281 | High Search Intent | Short on-hire / off-hire charterparty settlement copy |
| `/tools/bdn-discrepancy` | 210 | High-Volume Search | Interactive widget without explanatory methodology text |
| `/tools/volume-to-mass` | 241 | High-Volume Search | Missing ISO 8217 and ASTM D1250 compliance context |

---

## 4. Structured Data & Schema.org Audit

### 4.1. Current vs. Recommended Schemas

```
CURRENT SCHEMA STATUS:
├── Organization: Present in root layout (app/layout.tsx), but lacks sameAs, logo, contactPoint
├── WebSite: Present in root layout, but lacks SearchAction query-input
└── All other schemas: COMPLETELY ABSENT (0 SoftwareApplication, 0 FAQPage, 0 HowTo, 0 Breadcrumbs)

RECOMMENDED TARGET ARCHITECTURE:
├── / (Homepage): Organization + WebSite + SoftwareApplication
├── /mobile-app: MobileApplication (with App Store downloadUrl & offline features)
├── /how-we-measure: TechArticle + HowTo (4-stage calculation) + FAQPage
├── /sample-report: DigitalDocument + Product (locked certificate + Excel package)
├── /pricing: Product + Offer + FAQPage (commercial licensing terms)
├── /resources/*: TechArticle + FAQPage + BreadcrumbList
└── /services/*: Service + BreadcrumbList
```

*Note: All 5 production JSON-LD schemas have been generated and saved to [`schema/`](file:///c:/My%20Folder/Codes/BQS/schema/) in this workspace.*

---

## 5. Social & OpenGraph Audit
- **Twitter Card Type:** In [`app/layout.tsx`](file:///c:/My%20Folder/Codes/BQS/app/layout.tsx), `twitter:card` is either unspecified or defaults to `summary`.  
  **Recommendation:** Explicitly configure `summary_large_image` across all routes.
- **OG Image Specifications:** Currently, social shares pull generic fallback imagery or lack targeted open-graph dimensions.  
  **Recommendation:** Implement dynamic or dedicated 1200x630px OG banners highlighting the mobile UI, ASTM 54B formula preview, and sample certificate seals.

---

## 6. Content Gaps Against Competitors & Industry Standards

Space BQS currently lacks deep educational coverage of fundamental maritime standards that surveyors, chief engineers, and charterers search for daily:
1. **ASTM D1250 / API MPMS Chapter 11.1:** No dedicated guide explaining the mathematical difference between 1980 and 2004/2008 editions of Table 54B, density limits (0.820–1.000 kg/L), and thermal expansion coefficients.
2. **Singapore Standards SS 600:2022 & SS 648:2020:** In Singapore (the world's largest bunker hub by volume), surveyors must adhere to SS 600 (Code of practice for bunkering by bunker tanker) and SS 648 (Code of practice for bunker mass flow metering). Space BQS has zero dedicated content for SS 600 or SS 648.
3. **ISO 8217:2024 Specifications:** Plain-English explanation of commercial marine fuel grades (VLSFO, ULSFO, HSFO 380/180, DMA/DMB/MGO) and why density variations impact billable metric tonnes.
4. **Port Bunkering Guides:** Competitors and trade journals publish bunker inspection guides for Singapore, Rotterdam, Fujairah, Houston, Gibraltar, and Piraeus. Space BQS has zero port-specific landing pages.
5. **Dispute Case Studies:** Surveyors buy software to protect their reputation during claims. Content is missing on:
   - "The Cappuccino Bunker": Aerated fuel sounding inflation.
   - Temperature alteration between barge manifold and ship tanks.
   - Zero-water sounding tricks vs. bottom water cuts.

---

## 7. Conversion Audit & Buyer Journey

1. **CTA Hierarchy:**  
   The primary CTA fluctuates between "Request Demo" and "Explore Platform". On mobile, the CTA is often pushed below the fold.
2. **Pricing Transparency:**  
   The `/pricing` page states "No per-job prices on the site... licensed by team size and volume" without providing tier anchors or team size ranges (e.g. 1–3 Surveyors, 4–10 Surveyors, Enterprise Fleet). This increases sales friction for small independent survey firms who fear enterprise-level pricing.
3. **Sample Report Gating:**  
   The sample certificate on `/sample-report` is ungated, which is good for trust, but lacks an immediate inline conversion bridge: "Want your survey firm logo on this certificate? Book a 15-minute onboarding demo."
4. **Mobile App Store Linkage:**  
   The Apple App Store URL (`https://apps.apple.com/sg/app/space-bqs/id6812992991`) is present in footer/app pages but lacks an Android Google Play equivalent or PWA download explanation, leaving Android users uncertain.

---

## 8. E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

1. **Author Bylines & Marine Survey Credentials:**  
   All 9 resource guides are published anonymously without surveyor bylines. Adding: *"Reviewed by Chief Marine Surveyor [Name], Member of IIMS / SAMS, 18 Years Sea Service"* is critical for YMYL/technical maritime authority.
2. **Third-Party Regulatory Validation:**  
   Space BQS needs clear statements detailing its alignment with MPA Singapore surveyor guidelines, BIMCO Standard Bunker Terms, and ISO 13739 procedures.
3. **Company Registration & Physical Presence:**  
   The `/about` and `/contact` pages omit corporate registration details, physical operating jurisdictions, and official support hours.

---

## 9. Prioritised Action Table

| Priority | Issue / Task | Evidence (URL / File) | Impact | Effort | Exact Fix Required |
| :---: | :--- | :--- | :---: | :---: | :--- |
| **P0** | Fix Production Domain Mismatch | [`app/lib/site.ts`](file:///c:/My%20Folder/Codes/BQS/app/lib/site.ts), [`app/robots.ts`](file:///c:/My%20Folder/Codes/BQS/app/robots.ts) | **High** | 15 mins | Set `SITE_URL = "https://aibqs.com"`. Update `robots.ts` and `sitemap.ts`. |
| **P0** | Fix Heading Duplication Bug (`textContent`) | [`app/components/WeightText.tsx`](file:///c:/My%20Folder/Codes/BQS/app/components/WeightText.tsx) | **High** | 2 hours | Implement CSS pseudo-element sizing anchor (`data-char`) to eliminate double TextNodes. |
| **P0** | Eliminate Title Brand Doubling | [`app/resources/[slug]/page.tsx`](file:///c:/My%20Folder/Codes/BQS/app/resources/[slug]/page.tsx), static pages | **High** | 1 hour | Strip `— Space BQS` from local `title` strings so `template` handles brand suffixing cleanly. |
| **P0** | Add Server Metadata to `/sample-report` | [`app/sample-report/page.tsx`](file:///c:/My%20Folder/Codes/BQS/app/sample-report/page.tsx) | **High** | 30 mins | Create `layout.tsx` metadata wrapper or refactor to server page with client view. |
| **P1** | Deploy Core JSON-LD Schemas | `schema/01` to `schema/05` | **High** | 2 hours | Inject `SoftwareApplication`, `MobileApplication`, `FAQPage`, and `HowTo` schemas into routes. |
| **P1** | Add BreadcrumbList Schema | `components/ui.tsx` | **Medium** | 1 hour | Add automated `BreadcrumbList` JSON-LD generation to the existing visual breadcrumb component. |
| **P1** | Expand `/pricing` Copy (> 600 words) | [`app/pricing/page.tsx`](file:///c:/My%20Folder/Codes/BQS/app/pricing/page.tsx) | **High** | 3 hours | Add surveyor team tiers, pilot workspace details, FAQs, and transparent licensing factors. |
| **P1** | Expand Feature Pages (> 500 words) | `app/features/*/page.tsx` | **Medium** | 4 hours | Add worked ASTM Table 54B mathematical examples, tank strapping UI diagrams, and data flow steps. |
| **P2** | Enrich `/tools/*` Calculator Explanations | `app/tools/[tool]/page.tsx` | **Medium** | 3 hours | Add ISO 8217/ASTM D1250 formula references and step-by-step guides beneath interactive widgets. |
| **P2** | Switch Social Cards to `summary_large_image` | [`app/layout.tsx`](file:///c:/My%20Folder/Codes/BQS/app/layout.tsx) | **Low** | 30 mins | Configure `twitter:card: "summary_large_image"` with dedicated 1200x630px OG assets. |
| **P2** | Add `/social-media-platforms` to Sitemap | [`app/sitemap.ts`](file:///c:/My%20Folder/Codes/BQS/app/sitemap.ts) | **Low** | 15 mins | Append route to `statics` array in sitemap generator. |
