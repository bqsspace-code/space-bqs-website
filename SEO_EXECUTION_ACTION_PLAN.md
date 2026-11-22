# Space BQS — SEO & GEO Master Execution Action Plan
**Domain:** https://aibqs.com | **Last Updated:** 2025-11 | **Owner:** ops@aibqs.com

> [!IMPORTANT]
> Execute phases **in order**. Phase 0 P0 bugs corrupt every downstream SEO signal. Fix them first before submitting to any directory, running any outreach, or publishing any new content.

---

## Quick Reference — All Deliverable Files

| File | Purpose |
|------|---------|
| `00_executive_summary.md` | Strategic master brief, top 10 actions, top 5 risks |
| `01_site_audit.md` | Full technical SEO audit, prioritised issue table |
| `02_competitors.csv` | 20 competitors master data (UTF-8 BOM) |
| `02_competitor_analysis.md` | Feature matrix, GEO test results, battlecards |
| `03_seo_strategy.md` | 320+ keyword universe, programmatic SEO, 12-month roadmap |
| `04_geo_strategy.md` | 50 buyer prompts, entity SEO, citation-readiness guide |
| `05_portals_100.csv` | 100 verified portals with direct signup links |
| `05_submission_kit.md` | Brand copy kit, taglines, 4-wave rollout schedule |
| `100_PORTALS_TO_REGISTER_FIRST.md` | 100 portals in 4 waves with step-by-step guides |
| `TOP_10_IMMEDIATE_QUICK_WINS_REGISTRATION.md` | Top 10 portals, copy-paste bio kit, tracking checklist |
| `schema/01_homepage.json` | Organization + WebSite + SoftwareApplication JSON-LD |
| `schema/02_mobile_app.json` | MobileApplication + BreadcrumbList JSON-LD |
| `schema/03_how_we_measure.json` | TechArticle + HowTo + FAQPage JSON-LD |
| `schema/04_sample_report.json` | DigitalDocument JSON-LD |
| `schema/05_pricing.json` | Product + Offer + FAQPage JSON-LD |
| `public/llms.txt` | Concise machine-readable LLM instructions |
| `public/llms-full.txt` | Complete technical spec for AI crawlers |
| **`SEO_EXECUTION_ACTION_PLAN.md`** | **This file — master execution checklist** |

---

## Phase 0 — Critical Code Fixes (Day 1 · ~3 hours · P0)

> [!CAUTION]
> These bugs mean every canonical URL, OG tag, sitemap entry, and JSON-LD schema currently emits `www.spacebqs.example` instead of `aibqs.com`. Google, Bing, and all AI crawlers are receiving broken signals. Fix before any other work.

### 0-A · Fix Domain Mismatch in `app/lib/site.ts`

**Current (broken):**
```ts
export const SITE_URL = "https://www.spacebqs.example";
```

**Fix:**
```ts
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aibqs.com";
```

**Also add to `.env.production`:**
```
NEXT_PUBLIC_SITE_URL=https://aibqs.com
```

**Also add to `.env.local` (for local dev):**
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- [ ] Edit `app/lib/site.ts`
- [ ] Add `NEXT_PUBLIC_SITE_URL` to `.env.production`
- [ ] Add `NEXT_PUBLIC_SITE_URL` to `.env.local`
- [ ] Verify build: `pnpm build` → check `out/sitemap.xml` entries start with `https://aibqs.com`

---

### 0-B · Fix `app/robots.ts` Hardcoded Domain

**Current (broken):**
```ts
sitemap: "https://www.spacebqs.example/sitemap.xml",
```

**Fix — import SITE_URL:**
```ts
import { SITE_URL } from "@/app/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

- [ ] Edit `app/robots.ts`
- [ ] After deploy, verify: `curl https://aibqs.com/robots.txt` shows correct sitemap URL

---

### 0-C · Fix `WeightText.tsx` — Heading Duplication Bug

The current implementation renders two DOM TextNodes per character (a hidden sizing anchor + visible letter). Crawlers, screen readers, and LLMs read doubled text: `"BBuunnkkeerr QQuuaannttiittyy SSSuurrvveeyy"`.

**Fix — use CSS `::before` pseudo-element for the sizing anchor:**

```tsx
// app/components/WeightText.tsx
// Replace the hidden-span sizing pattern with a CSS data-char approach

export function WeightText({ text, ...props }: WeightTextProps) {
  return (
    <span aria-label={text} {...props}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          data-char={char}
          className="wt-char"
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
    </span>
  );
}
```

**Add to global CSS (`app/globals.css`):**
```css
/* WeightText sizing anchor — no duplicate TextNode */
.wt-char {
  position: relative;
  display: inline-block;
}
.wt-char::before {
  content: attr(data-char);
  display: block;
  height: 0;
  visibility: hidden;
  overflow: hidden;
  font-weight: 900; /* heaviest weight for sizing */
  pointer-events: none;
  user-select: none;
}
```

**Result:** `aria-label={text}` on the outer `<span>` gives screen readers and crawlers the clean string once. The `::before` pseudo-element is CSS-only — no extra DOM TextNode.

- [ ] Update `app/components/WeightText.tsx`
- [ ] Add `.wt-char` + `.wt-char::before` to `app/globals.css`
- [ ] Verify with: `pnpm build && node -e "const html = require('fs').readFileSync('.next/server/app/page.html','utf8'); console.log(html.match(/Bunker Quantity/g))"` — should appear only once
- [ ] Run Google Rich Results Test on homepage after deploy

---

### 0-D · Fix Title Brand Doubling (14 pages)

14 pages append `— Space BQS` locally while root layout appends `| Space BQS` → titles up to 79 chars.

**Root layout template (keep this, it's correct):**
```ts
// app/layout.tsx
export const metadata: Metadata = {
  title: { default: "Space BQS", template: "%s | Space BQS" },
};
```

**Find and remove all manual brand suffixes:**
```powershell
# Run from project root to find offenders
Select-String -Path "app/**/*.tsx","app/**/*.ts" -Pattern "Space BQS$|— Space BQS" -Recurse
```

For each result, strip `— Space BQS` or `| Space BQS` from the page-level `title` string — the template handles it.

- [ ] Run the PowerShell search above
- [ ] Remove manual brand suffix from each file found
- [ ] Verify: `pnpm build` → check `.next/server/app/**/page.html` `<title>` tags

---

### 0-E · Add Server Metadata Wrapper for `/sample-report`

`app/sample-report/page.tsx` is `"use client"` — Next.js App Router cannot export metadata from client components.

**Fix — split into layout + client component:**

1. Create `app/sample-report/layout.tsx`:
```tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sample Bunker Survey Certificate",
  description:
    "Download a real Space BQS tamper-evident PDF certificate. See exactly what your clients receive after every bunker quantity survey.",
  openGraph: {
    title: "Sample Bunker Survey Certificate — Space BQS",
    description:
      "Real PDF output from a completed bunker quantity survey. ASTM 54B calculations, VCF, observed and corrected volumes.",
  },
};
export default function SampleReportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

2. Keep existing `page.tsx` as the client component (no changes needed there).

- [ ] Create `app/sample-report/layout.tsx` with metadata above
- [ ] Verify: `curl -s https://aibqs.com/sample-report | grep "<title>"` shows correct title after deploy

---

### 0-F · Add `/social-media-platforms` to Sitemap

`app/sitemap.ts` currently omits this route.

**Add to the routes array in `app/sitemap.ts`:**
```ts
"/social-media-platforms",
```

- [ ] Edit `app/sitemap.ts`, add the route
- [ ] After deploy, verify at `https://aibqs.com/sitemap.xml`

---

### 0-G · Update `ORG_SCHEMA` `sameAs` in `app/layout.tsx`

The root `ORG_SCHEMA` JSON-LD should include all verified social/channel URLs so Google's Knowledge Graph can link the entity.

**Add/update `sameAs` array:**
```ts
sameAs: [
  "https://x.com/spacebqs",
  "https://www.linkedin.com/company/space-bqs",
  "https://www.youtube.com/@SPACEBQS",
  "https://www.instagram.com/bqsspace",
  "https://github.com/bqsspace-code",
  "https://apps.apple.com/app/space-bqs/id[YOUR-APP-ID]",
  "https://play.google.com/store/apps/details?id=[YOUR-PACKAGE]",
],
```

> Replace `[YOUR-APP-ID]` and `[YOUR-PACKAGE]` with actual store IDs.

- [ ] Edit `ORG_SCHEMA` in `app/layout.tsx`
- [ ] Add `sameAs` with all social + app store URLs
- [ ] Validate with Google Rich Results Test after deploy

---

### Phase 0 Completion Checklist

| Task | File | Done |
|------|------|------|
| Fix `SITE_URL` | `app/lib/site.ts` | ☐ |
| Fix `robots.ts` sitemap URL | `app/robots.ts` | ☐ |
| Fix `WeightText.tsx` duplication | `app/components/WeightText.tsx` + `app/globals.css` | ☐ |
| Remove 14× title brand doubles | Multiple page files | ☐ |
| Add `/sample-report` layout with metadata | `app/sample-report/layout.tsx` | ☐ |
| Add `/social-media-platforms` to sitemap | `app/sitemap.ts` | ☐ |
| Update `sameAs` in `ORG_SCHEMA` | `app/layout.tsx` | ☐ |
| `pnpm build` passes clean | — | ☐ |
| Deploy to production | — | ☐ |
| Submit sitemap in Google Search Console | search.google.com/search-console | ☐ |
| Request re-indexing of homepage | Google Search Console URL Inspect | ☐ |

---

## Phase 1 — Entity Setup Sprint (Day 1–3 · ~2 hours active work · P0)

> Register the brand entity across the top-authority directories. Every registration creates a backlink, confirms the entity to Google's Knowledge Graph, and seeds AI training data with the correct facts about Space BQS.

### 1-A · Execute Top 10 Immediate Quick Wins

Full step-by-step instructions are in `TOP_10_IMMEDIATE_QUICK_WINS_REGISTRATION.md`. Do them in this order (highest ROI first):

| # | Portal | URL | Time | Notes |
|---|--------|-----|------|-------|
| 1 | G2 | https://sell.g2.com/ | 20 min | Most influential software review site. Use brand copy from `05_submission_kit.md` |
| 2 | Capterra | https://www.capterra.com/vendors/ | 15 min | Syndicates to GetApp + Software Advice automatically |
| 3 | Crunchbase | https://www.crunchbase.com/add-new | 10 min | Creates Google Knowledge Graph entity node |
| 4 | Product Hunt | https://www.producthunt.com/posts/new | 20 min | High-DA dofollow link; plan a launch day for maximum upvotes |
| 5 | Trustpilot Business | https://business.trustpilot.com/signup | 10 min | Claims `aibqs.com` domain trust |
| 6 | SaaSHub | https://www.saashub.com/submit | 5 min | Direct dofollow, positions vs Excel and CargoSurveyor |
| 7 | AlternativeTo | https://alternativeto.net/software/post/ | 5 min | Surfaces Space BQS to surveyors replacing spreadsheets |
| 8 | GitHub Organization | https://github.com/organizations/new | 10 min | Validates developer/technical entity |
| 9 | ShipServ Pages | https://www.shipserv.com/join | 15 min | Core marine procurement directory |
| 10 | MagicPort | https://magicport.ai/company/register | 5 min | Modern maritime tech listing |

**Copy-paste brand description (short — 160 chars):**
> Space BQS is a mobile-first bunker quantity survey platform for independent surveyors. ASTM 54B offline app, tamper-evident PDF certificates, zero per-job fees.

**Copy-paste brand description (long — 400 chars):**
> Space BQS is a team-licensed bunker quantity survey platform built for independent marine survey firms and in-house surveyor groups. The iOS and Android app works fully offline (72-hour lease), calculates ASTM Table 54B VCF for VLSFO, HFO, MGO, LSMGO and ULSFO, and produces tamper-evident locked PDF certificates plus 4-sheet Excel workbooks. Supports BDR vs BDN, ROB on/off-hire, and debunkering workflows. No per-job fees.

- [ ] G2 registered
- [ ] Capterra registered
- [ ] Crunchbase profile created
- [ ] Product Hunt listing scheduled
- [ ] Trustpilot Business claimed
- [ ] SaaSHub listed
- [ ] AlternativeTo listed
- [ ] GitHub org updated/created
- [ ] ShipServ Pages listed
- [ ] MagicPort listed

---

### 1-B · Deploy `llms.txt` and `llms-full.txt`

The files `public/llms.txt` and `public/llms-full.txt` are already written to the repo. They need to go live at:

- `https://aibqs.com/llms.txt`
- `https://aibqs.com/llms-full.txt`

**Verify after deploy:**
```
curl https://aibqs.com/llms.txt
curl https://aibqs.com/llms-full.txt
```

Both should return 200 with the correct content. These files are read by ChatGPT's crawler (OAI-SearchBot), Perplexity (PerplexityBot), Anthropic (anthropic-ai), and Google Extended (Googlebot-Extended).

- [ ] Deploy to production
- [ ] Verify `https://aibqs.com/llms.txt` returns 200
- [ ] Verify `https://aibqs.com/llms-full.txt` returns 200
- [ ] Add entry to `robots.txt` pointing to llms.txt (optional but recommended)

---

### 1-C · Update App Store Marketing URLs

In both Apple App Store Connect and Google Play Console, set the **Marketing URL** field to `https://aibqs.com` (not the `.example` domain or any old URL). This is the URL Google uses to attribute app reviews and ratings back to your website entity.

- [ ] Apple App Store Connect → App Information → Marketing URL → `https://aibqs.com`
- [ ] Google Play Console → Store listing → Website → `https://aibqs.com`

---

### 1-D · Set Up Google Search Console

If not already done:

1. Go to https://search.google.com/search-console
2. Add property: `https://aibqs.com` (domain property preferred)
3. Verify via DNS TXT record or HTML file
4. Submit sitemap: `https://aibqs.com/sitemap.xml`
5. Request indexing of homepage via URL Inspect tool

- [ ] GSC property verified
- [ ] Sitemap submitted
- [ ] Homepage index requested
- [ ] Bing Webmaster Tools also configured (https://www.bing.com/webmasters)

---

## Phase 2 — Structured Data Injection (Week 1–2 · ~4 hours · High Impact)

The JSON-LD schema files are already written in `schema/`. Now inject them into the Next.js pages.

### 2-A · Homepage Schema (`schema/01_homepage.json`)

Inject Organization + WebSite + SoftwareApplication into `app/layout.tsx` as a `<script type="application/ld+json">` in the root layout. This applies site-wide.

```tsx
// In app/layout.tsx, inside <head> or as a next/script component
import homepageSchema from "@/schema/01_homepage.json";

// Add inside <head>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
/>
```

> Or use a `JsonLd` utility component for cleanliness.

- [ ] Import and inject `schema/01_homepage.json` in `app/layout.tsx`

---

### 2-B · Mobile App Page Schema (`schema/02_mobile_app.json`)

```tsx
// app/(marketing)/mobile-app/page.tsx  or equivalent path
import appSchema from "@/schema/02_mobile_app.json";
// Add <script type="application/ld+json"> in page head
```

- [ ] Find the mobile-app page file path
- [ ] Inject `schema/02_mobile_app.json`

---

### 2-C · How We Measure Page Schema (`schema/03_how_we_measure.json`)

This page gets TechArticle + HowTo + FAQPage — the highest-value schema for GEO (AI citation eligibility).

```tsx
// app/how-we-measure/page.tsx
import howToSchema from "@/schema/03_how_we_measure.json";
```

- [ ] Inject `schema/03_how_we_measure.json` into `app/how-we-measure/page.tsx`

---

### 2-D · Sample Report Page Schema (`schema/04_sample_report.json`)

Inject into the new `app/sample-report/layout.tsx` created in Phase 0-E.

- [ ] Inject `schema/04_sample_report.json` into `app/sample-report/layout.tsx`

---

### 2-E · Pricing Page Schema (`schema/05_pricing.json`)

Product + Offer + FAQPage schema on the pricing page helps Google surface pricing in rich snippets.

- [ ] Inject `schema/05_pricing.json` into `app/pricing/page.tsx`

---

### 2-F · Add BreadcrumbList to Navigation Component

Add `BreadcrumbList` JSON-LD dynamically to any page that has a breadcrumb UI component (`app/components/ui.tsx` Breadcrumbs). Use the current route segments to build the schema automatically.

```tsx
// Utility: components/BreadcrumbSchema.tsx
"use client";
import { usePathname } from "next/navigation";

export function BreadcrumbSchema() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://aibqs.com" },
    ...segments.map((seg, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      item: `https://aibqs.com/${segments.slice(0, i + 1).join("/")}`,
    })),
  ];
  const schema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
```

- [ ] Create `components/BreadcrumbSchema.tsx`
- [ ] Add `<BreadcrumbSchema />` to the layout or breadcrumb UI component
- [ ] Validate on 3 deep pages with Google Rich Results Test

---

### 2-G · Validate All Schema

After deploy:
1. Google Rich Results Test: https://search.google.com/test/rich-results
2. Schema.org Validator: https://validator.schema.org/
3. Test URLs: `/`, `/pricing`, `/how-we-measure`, `/sample-report`, `/features` (or mobile app page)

- [ ] Homepage passes Rich Results Test
- [ ] Pricing page passes (Product + Offer visible)
- [ ] How-We-Measure passes (HowTo + FAQ visible)
- [ ] Sample Report passes
- [ ] Mobile App page passes (MobileApplication visible)

---

## Phase 3 — Content Depth Expansion (Week 2–3 · ~8 hours writing · High Impact)

> [!NOTE]
> 55.8% of pages (24/43) are under 300 words. Thin content suppresses domain authority. These expansions target the highest-traffic pages first.

### 3-A · Expand `/pricing` to 700+ Words

**Current:** ~265 words  
**Target:** 700+ words  
**Primary keyword:** `bunker survey software pricing`  
**Secondary:** `bunker quantity survey app cost`, `marine survey software subscription`

**Content to add:**
- Full feature breakdown by tier (what's included)
- FAQ section (min 5 Q&As) targeting cost/value objections:
  - "Is there a free trial?"
  - "What happens if I need more than X users?"
  - "How does this compare to paying per job?"
  - "Is there an annual discount?"
  - "What's included in deployment?"
- ROI calculator narrative: "A team of 5 surveyors doing 20 jobs/month saves $X vs per-job software"
- Comparison table: Space BQS licence vs per-job fee vs Excel

- [ ] Draft pricing page expansion
- [ ] Add FAQPage schema (already in `schema/05_pricing.json` — align Q&As)
- [ ] Publish

---

### 3-B · Expand 5 Feature Pages to 500+ Words Each

**Priority pages (from audit — currently thin):**

| Page | Estimated Current Words | Target | Primary Keyword |
|------|------------------------|--------|-----------------|
| `/features` | ~200 | 600 | bunker quantity survey software features |
| `/features/offline-app` (or equivalent) | ~180 | 500 | offline bunker survey app |
| `/features/astm-calculations` | ~150 | 500 | ASTM 54B bunker calculator |
| `/features/survey-reports` | ~160 | 500 | bunker survey certificate PDF |
| `/features/survey-warehouse` | ~120 | 500 | bunker survey data archive |

For each page add:
- Definition/context paragraph (what this feature solves)
- Step-by-step "How it works" (3–5 steps) → enables HowTo schema
- Real surveyor scenario / use case
- Comparison: "Before Space BQS / After Space BQS"
- FAQ block (3 questions)

- [ ] Expand `/features` index
- [ ] Expand offline app feature page
- [ ] Expand ASTM calculations feature page
- [ ] Expand survey reports feature page
- [ ] Expand Survey Warehouse feature page

---

### 3-C · Expand Calculator Tool Pages to 450+ Words Each

**Pages under `/tools`:**

| Tool Page | Action |
|-----------|--------|
| VCF / ASTM 54B Calculator | Add explanation of ASTM D1250 Table 54B, density ranges, correction formula, worked example (2 vessels) |
| Trim Correction Calculator | Add context: why trim matters, IMO/SOLAS references, formula |
| ROB Estimator | Add context: on-hire vs off-hire, common disputes, how to use the tool |
| BDN Reconciliation Tool | Add what a BDN is, common discrepancy causes, MARPOL Annex VI context |

- [ ] Expand VCF/ASTM calculator page
- [ ] Expand Trim Correction calculator page  
- [ ] Expand ROB Estimator page
- [ ] Expand BDN Reconciliation page

---

### 3-D · Deepen `/how-we-measure` with ASTM D1250 Formulas

This is the **#1 GEO target page** — AI assistants answering "how to calculate bunker quantity" should cite this page.

**Add these sections:**
1. ASTM D1250 Table 54B — what it is, when it applies (fuel oil, marine distillates)
2. Volume Correction Factor (VCF) formula with notation:
   `VCF = f(density_15, observed_temp)` — refer to Table 54B for lookup
3. Worked example: Tank sounding → Observed Volume → VCF → Corrected Volume at 15°C
4. Density range coverage: 0.820–1.000 kg/L (Space BQS engine range)
5. Temperature range: 0–90°C
6. SS 600 (Singapore Standard) reference
7. ISO 4267 (petroleum/petrochemical) reference
8. Comparison: ASTM vs ISO methods for bunker surveys
9. "Last Updated: [Month Year]" timestamp — required for AI citation eligibility

- [ ] Write ASTM D1250 section with formulas
- [ ] Add worked example with real numbers
- [ ] Add ISO 4267 / SS 600 context
- [ ] Add "Last Updated" timestamp
- [ ] Verify HowTo schema aligns with new content

---

### 3-E · Expand Service Pages for ROB and Debunkering

| Page | Target | Primary Keyword |
|------|--------|-----------------|
| `/services/rob-survey` | 500+ words | ROB survey bunker, remaining on board fuel survey |
| `/services/debunkering-survey` | 500+ words | debunkering survey, bunker removal certificate |

For each page:
- Define the survey type (what it is, why it's done)
- Key measurement steps
- Certificate output (what it looks like, what it proves)
- Common disputes / legal context (P&I relevance)
- How Space BQS handles it in the app

- [ ] Expand ROB survey page
- [ ] Expand debunkering survey page

---

## Phase 4 — Programmatic SEO & Topical Authority (Week 3–4 · ~12 hours · Medium-High Impact)

### 4-A · Launch Port Hub Pages

Create location-specific bunker survey pages targeting surveyors at major bunker ports. These pages rank for `bunker survey [port]` and feed AI context about Space BQS operating in those regions.

**Priority ports (by global bunker volume):**

| URL | H1 | Primary Keyword | Secondary |
|-----|----|-----------------|-----------|
| `/ports/singapore` | Bunker Quantity Surveys in Singapore | bunker survey Singapore | MPA licensed surveyors Singapore, SS 600 bunker |
| `/ports/rotterdam` | Bunker Quantity Surveys in Rotterdam | bunker survey Rotterdam | Rotterdam bunker surveyors, ARA bunker survey |
| `/ports/fujairah` | Bunker Quantity Surveys in Fujairah | bunker survey Fujairah | Fujairah bunker surveyors, UAE bunkering |
| `/ports/houston` | Bunker Quantity Surveys in Houston | bunker survey Houston | Gulf Coast bunker survey, USCG bunkering |
| `/ports/piraeus` | Bunker Quantity Surveys in Piraeus | bunker survey Greece | Greek bunker surveyors, Piraeus bunkering |
| `/ports/shanghai` | Bunker Quantity Surveys in Shanghai | bunker survey Shanghai | China bunker surveyors, VLSFO Shanghai |

**Each port page template (minimum 500 words) must include:**
- Port overview (annual bunker volumes — cite source)
- Fuel grades available at that port (VLSFO, MGO, HSFO mix)
- Local regulations / authority (MPA for SG, DCSA Rotterdam, etc.)
- Common survey types at that port (delivery, ROB, barge-to-vessel)
- How Space BQS serves surveyors at this port
- Link to request demo with `utm_source=ports-singapore&utm_medium=programmatic`
- LocalBusiness or Place schema (or augment ORG_SCHEMA with `areaServed`)

- [ ] Create `app/ports/[port]/page.tsx` dynamic route
- [ ] Write Singapore port page
- [ ] Write Rotterdam port page
- [ ] Write Fujairah port page
- [ ] Write Houston port page (lower priority)
- [ ] Write Piraeus port page (lower priority)
- [ ] Add port pages to sitemap

---

### 4-B · Marine Sounding Glossary (50 Initial Terms)

Create `app/glossary/[term]/page.tsx` and seed with 50 high-value terms. Each glossary page targets long-tail "what is [term]" queries and feeds AI assistants with authoritative definitions citing Space BQS.

**Highest-priority 20 terms to publish first:**

| Term (URL slug) | Definition target |
|-----------------|-------------------|
| `volume-correction-factor` | VCF definition, ASTM 54B context |
| `astm-d1250` | ASTM standard, marine fuel application |
| `astm-table-54b` | Specific table, density/temperature lookup |
| `bunker-delivery-note` | BDN legal definition, MARPOL Annex VI |
| `remaining-on-board` | ROB definition, on/off-hire context |
| `debunkering` | Definition, legal, certificate requirements |
| `tank-sounding` | Method, ullage vs dip, corrections |
| `trim-correction` | Formula, why needed, tables |
| `list-correction` | Formula, risk of error |
| `free-water-correction` | Definition, measurement method |
| `bunker-survey` | What it is, who does it, why |
| `independent-surveyor` | Role, independence requirement |
| `mass-flow-meter` | MFM definition, IMO circular, vs tank sounding |
| `vlsfo` | Fuel grade, IMO 2020, density |
| `hfo` | HFO/HSFO definition, usage context |
| `mgo` | Marine Gas Oil, density, usage |
| `ulsfo` | Ultra Low Sulphur Fuel Oil |
| `bdn-discrepancy` | Types, causes, claims process |
| `bunker-claim` | P&I context, quantity dispute process |
| `cappuccino-effect` | Foam/aeration in fuel measurement |

**Glossary page template:**
- Term definition (1 paragraph, answer-first)
- Full explanation with context (3–5 paragraphs)
- Related terms (internal links)
- "How Space BQS handles [term]" CTA
- DefinedTerm or Glossary schema

- [ ] Create `app/glossary/[term]/page.tsx` route
- [ ] Write first 20 glossary terms
- [ ] Add glossary index at `/glossary`
- [ ] Add all glossary pages to sitemap

---

### 4-C · Publish Key Resource Articles

Create the following articles in `/resources` (blog). Each should be 800–1,200 words, have a clear author attribution, and include a "Last Updated" date.

**Priority articles:**

| Title | Target Keyword | Linkable Asset Opportunity |
|-------|---------------|---------------------------|
| What is the Cappuccino Effect in Bunker Surveying? | cappuccino effect bunker fuel | Shareable explainer, P&I community interest |
| How to Spot a BDN Discrepancy (And What to Do) | BDN discrepancy bunker survey | Downloadable checklist PDF |
| Singapore SS 600 Bunker Surveying Standard Explained | SS 600 bunker survey Singapore | Port-specific authority |
| Mass Flow Meters vs Tank Sounding: 2025 Comparison | mass flow meter vs tank sounding | Comparison table embed |
| VLSFO Density Ranges and Why They Matter for ASTM 54B | VLSFO density ASTM 54B | Calculator widget integration |
| IMO 2020 and Bunker Quantity Surveys: What Changed | IMO 2020 bunker survey | Historical reference, link magnet |
| How On-Hire and Off-Hire Bunker Surveys Work | on hire off hire bunker survey | P&I audience targeting |
| Bunker Quantity Dispute: A Step-by-Step Resolution Guide | bunker quantity dispute | P&I / Legal audience, link magnet |

- [ ] Commission/write Cappuccino Effect article
- [ ] Commission/write BDN Discrepancy article
- [ ] Commission/write SS 600 explainer
- [ ] Commission/write MFM vs Tank Sounding comparison
- [ ] Commission/write VLSFO Density article
- [ ] Commission/write On-hire/Off-hire guide
- [ ] Commission/write Bunker Dispute guide
- [ ] Add all articles to sitemap

---

## Phase 5 — Off-Page Authority & Trade Media (Month 2–3)

### 5-A · Execute Portal Submission Waves 2–4

Full wave schedule is in `100_PORTALS_TO_REGISTER_FIRST.md`. After completing Wave 1 (Top 10 above):

**Wave 2 (Days 4–7) — Maritime & Industry Directories:**
- Lloyd's List Intelligence supplier directory
- IBIA (International Bunker Industry Association) member directory
- IIMS (International Institute of Marine Surveying) affiliate listing
- Manifold Times supplier directory
- Ship & Bunker vendor directory

**Wave 3 (Week 2) — General SaaS & Software Directories:**
Remaining 50 portals in `05_portals_100.csv`, columns: Software Suggest, Slashdot, SourceForge, GetApp (auto via Capterra), Tekpon, Crozdesk, etc.

**Wave 4 (Month 2) — Maritime-Specific & Regional:**
Port authority supplier registers, regional maritime association directories, bunker supplier association listings.

- [ ] Wave 2 complete (5 maritime directories)
- [ ] Wave 3 complete (50 SaaS directories)
- [ ] Wave 4 complete (maritime + regional)
- [ ] All submissions tracked in `05_portals_100.csv` (update "Submitted" and "Date" columns)

---

### 5-B · Trade Media Press Outreach

**Target publications (all maritime/bunker niche):**

| Publication | Contact Approach | Story Angle |
|-------------|-----------------|-------------|
| Ship & Bunker | shipandbunker.com/contact | "Why bunker surveyors are going mobile-first" — quote from an actual surveyor using Space BQS |
| Manifold Times | manifoldtimes.com | Singapore MPA licensed surveyors + SS 600 digital tool angle |
| MarineLink | marinelink.com | Product launch / tech innovation angle |
| Splash247 | splash247.com | "IMO 2020 changed what bunker surveyors need — here's the software catching up" |
| TradeWinds | tradewinds.no | Quantity dispute data angle — "Bunker quantity disputes cost the industry $X million" |
| Hellenic Shipping News | hellenicshippingnews.com | Greek surveyor community angle |
| Offshore Energy | offshore-energy.biz | Offshore bunker survey market angle |

**Pitchable story angles (top 5 for immediate outreach):**
1. **"The Cappuccino Effect is costing ship operators millions — here's the data"** — link to your Cappuccino Effect article + free calculator
2. **"Why 73% of bunker quantity disputes happen within 48 hours of delivery"** (create this stat from your data or survey; label as proprietary research)
3. **"MFM vs tank sounding: the debate that's splitting the bunker industry in 2025"**
4. **"Singapore's SS 600 standard is 10 years old — does it still work for VLSFO?"**
5. **"First mobile-first bunker quantity survey app: what early-adopter surveyors say"** (requires getting 2–3 surveyor quotes)

- [ ] Identify PR contact for each publication
- [ ] Write 300-word pitch for top story angle
- [ ] Send outreach to Ship & Bunker
- [ ] Send outreach to Manifold Times
- [ ] Send outreach to Splash247
- [ ] Follow up 7 days after each send

---

### 5-C · IBIA and IIMS Membership Applications

**IBIA (International Bunker Industry Association):**
- URL: https://www.ibia.net/membership
- Benefit: Directory listing, conference speaking opportunities, link from ibia.net (high DA maritime domain)
- Cost: Varies by company size (check current rates at ibia.net)

**IIMS (International Institute of Marine Surveying):**
- URL: https://www.iims.org.uk/membership/
- Benefit: Affiliate/supplier listing, credibility signal for E-E-A-T
- Cost: Affiliate membership fee (check current rates)

- [ ] Apply for IBIA Corporate Membership
- [ ] Apply for IIMS Affiliate listing
- [ ] Confirm listings are live and link to `https://aibqs.com`

---

### 5-D · Build Linkable Asset — Free Web VCF Calculator

A publicly accessible web-based VCF/ASTM 54B calculator (beyond the app) is the **single highest-potential link magnet** in this niche. It gives bunker surveyors, traders, and P&I clubs a tool to bookmark and share.

**Spec:**
- Inputs: Observed Volume (m³ or BBL), Observed Temperature (°C), Density at 15°C (kg/L)
- Output: VCF, Corrected Volume at 15°C, Mass (MT)
- Fuel grade selector: VLSFO / HFO / MGO / LSMGO / ULSFO
- Display ASTM D1250 Table 54B reference
- CTA: "Need a full bunker survey report? See Space BQS →"
- URL: `https://aibqs.com/tools/vcf-calculator`

**Outreach after launch:**
- Ping Ship & Bunker, Manifold Times with "new free tool" angle
- Post to LinkedIn maritime groups
- Add to IBIA member resources if accepted

- [ ] Design calculator spec with engineering team
- [ ] Build and test `app/tools/vcf-calculator/page.tsx`
- [ ] Add structured data (SoftwareApplication or WebApplication)
- [ ] Launch and do outreach

---

## Phase 6 — GEO (Generative Engine Optimization) Actions (Month 2 · Ongoing)

> Reference `04_geo_strategy.md` for the full 50-prompt test suite and citation-readiness checklist.

### 6-A · Citation-Readiness Checklist (per high-value page)

For each of the 8 target pages (homepage, how-we-measure, pricing, sample-report, each major feature page):

- [ ] Answer-first paragraph: lead with the definition or answer, not the history
- [ ] Include at least one numbered list or table (AI prefers structured content for extraction)
- [ ] Add a visible "Last Updated: [Month Year]" line above the fold
- [ ] Add an FAQ block with ≥3 Q&As in plain language
- [ ] Add a stat box or callout with one verifiable number
- [ ] Ensure the page has an H1 that matches the target query
- [ ] Add `speakable` schema (SpeakableSpecification) to pages you want voice assistants to cite

---

### 6-B · Robots Directives for AI Crawlers

Verify `public/robots.txt` (or `app/robots.ts`) does **not** block these AI crawlers:

```txt
# AI crawlers — allow all
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Googlebot-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://aibqs.com/sitemap.xml
```

- [ ] Verify no AI crawlers are blocked
- [ ] Confirm `llms.txt` is linked from `robots.txt` via a comment or header

---

### 6-C · Monthly GEO Benchmark Test

Every month, run the 50-prompt test suite from `04_geo_strategy.md` across ChatGPT, Perplexity, Gemini, Copilot, and Claude. Record:
- Which prompts cite `aibqs.com` directly (not App Store)
- Which prompts cite competitors
- Month-over-month delta

**Current baseline (from session research):**
- ChatGPT: 46.7% mention Space BQS, 0% cite `aibqs.com` URL directly
- Target by Month 3: ≥25% cite `aibqs.com` directly

- [ ] Set monthly reminder for GEO benchmark test
- [ ] Log results in a tracking spreadsheet
- [ ] Update `04_geo_strategy.md` with monthly findings

---

## Phase 7 — Video & App Store SEO (Month 2–3)

### 7-A · YouTube Series: "Bunker Survey Explained"

**Suggested episode list (prioritised by search volume):**

| # | Title | Target Keyword |
|---|-------|---------------|
| 1 | How to Read a Bunker Delivery Note (BDN) | how to read bunker delivery note |
| 2 | What is an ROB Survey? Complete Guide | ROB survey bunker |
| 3 | ASTM Table 54B Explained for Bunker Surveyors | ASTM 54B bunker calculator |
| 4 | How to Calculate VCF for Marine Fuel | VCF calculation bunker |
| 5 | Mass Flow Meter vs Tank Sounding: Which is More Accurate? | MFM vs tank sounding |
| 6 | Cappuccino Effect: What It Is and How to Avoid It | cappuccino effect bunker |
| 7 | On-Hire vs Off-Hire Bunker Survey: Key Differences | on hire off hire bunker survey |
| 8 | Singapore SS 600 Bunker Survey Standard Explained | SS 600 bunker survey |

**For each video:**
- Write a 150-word description with target keyword in first 25 words
- Add chapters with timestamps
- Upload transcript (YouTube auto-captions are not sufficient for SEO)
- Link to relevant page on `aibqs.com` in description
- Use VideoObject schema on the corresponding page on the website

- [ ] Script and film Episode 1 (BDN explainer)
- [ ] Upload with optimised title, description, chapters, transcript
- [ ] Add VideoObject schema to `/resources` or landing page
- [ ] Script and schedule Episodes 2–4

---

### 7-B · App Store Listing Optimisation

**Apple App Store — optimise these fields:**
- **Title:** `Space BQS – Bunker Survey App` (keyword in title)
- **Subtitle (30 chars):** `ASTM 54B · Offline · PDF Report`
- **Keywords field (100 chars):** `bunker,survey,sounding,ASTM,VCF,BDN,ROB,offshore,marine,fuel,calculator,ship,tanker,surveyor`
- **Description:** Lead with benefit statement. First 3 lines visible before "More" — make them count.
- **Screenshots:** Show the sounding input screen, the PDF certificate, and the Survey Warehouse dashboard. Add text overlays.
- **Preview video:** 30-second demo — offline mode → sounding entry → PDF generated

**Google Play — same optimisation:**
- **Title:** `Space BQS – Bunker Survey App`
- **Short description (80 chars):** `ASTM 54B bunker quantity surveys. Offline. Tamper-evident PDF certificates.`
- **Full description:** Mirror App Store description; include all target keywords naturally

- [ ] Update App Store listing title and subtitle
- [ ] Update App Store keywords field
- [ ] Update App Store description
- [ ] Upload new optimised screenshots (min 5)
- [ ] Record and upload preview video
- [ ] Mirror all changes in Google Play

---

## Monthly KPI Dashboard

Track these metrics monthly in a spreadsheet (`SEO_KPI_TRACKER.xlsx`):

| KPI | Baseline | Month 1 | Month 2 | Month 3 | Target (M6) |
|-----|----------|---------|---------|---------|-------------|
| Organic impressions (GSC) | — | | | | 10,000/mo |
| Organic clicks (GSC) | — | | | | 500/mo |
| Average position (GSC) | — | | | | <30 |
| Indexed pages (GSC → Coverage) | — | | | | 60+ |
| Backlinks (Ahrefs/estimate) | — | | | | 50+ |
| Referring domains | — | | | | 25+ |
| Portal registrations complete | 0 | 10 | 50 | 100 | 100 |
| AI prompts citing aibqs.com URL | 0% | | | | 25% |
| Demo requests (organic/listing) | — | | | | 10/mo |
| App Store rating (iOS) | — | | | | 4.5+ |
| App Store reviews | — | | | | 20+ |
| YouTube subscribers | — | | | | 100+ |
| YouTube watch hours | — | | | | 500+ |

**Tools to use:**
- Google Search Console (free) — impressions, clicks, positions
- Bing Webmaster Tools (free) — Bing indexing
- Google Analytics 4 (free) — demo form conversions
- Ahrefs Free / Semrush Free / Ubersuggest — backlinks (limited but useful)
- Manual AI prompt test suite from `04_geo_strategy.md` — GEO tracking

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| "World's First Mobile App" claim challenged | High | High | Soften to "purpose-built for bunker surveyors" — CargoSurveyor Tools pre-dates Space BQS on iOS |
| `.example` domain bug not fixed before portal submissions | High | High | Phase 0 must be completed before any submission |
| Thin content pages penalised by Google HCU update | Medium | High | Phase 3 content expansion resolves this |
| VPS (competitor) also listed in same directories | Medium | Low | Differentiate on team licence / zero per-job fees angle |
| AI crawlers blocked by robots.txt | Low | High | Phase 6-B robots audit resolves this |
| App Store listing de-indexed due to URL mismatch | Medium | Medium | Phase 1-C App Store URL update resolves this |

---

## Summary: Execution Order

```
Day 1 (3 hrs)   → Phase 0: Fix P0 code bugs → pnpm build → deploy
Day 1-3 (2 hrs) → Phase 1: Register Top 10 portals, deploy llms.txt, update App Store URLs
Week 1-2 (4 hrs)→ Phase 2: Inject all 5 JSON-LD schema files, validate
Week 2-3 (8 hrs)→ Phase 3: Expand pricing, feature pages, calculator pages, how-we-measure
Week 3-4 (12 hrs)→Phase 4: Port hub pages, glossary 50 terms, 3 resource articles
Month 2 (ongoing)→ Phase 5: Portal waves 2-4, trade media outreach, IBIA/IIMS, VCF calculator
Month 2-3 (ongoing)→ Phase 6: GEO monthly benchmarks, citation-readiness audit
Month 2-3 (ongoing)→ Phase 7: YouTube series, App Store optimisation
```

---

*All strategies assume `https://aibqs.com` as production domain. All portal/outreach UTM convention: `utm_source={portal-slug}&utm_medium=listing&utm_campaign=portal100`. Contact: ops@aibqs.com.*
