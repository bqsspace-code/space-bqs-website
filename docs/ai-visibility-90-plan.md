# Space BQS: implementation and release plan for an AI visibility score of 90

**Target:** reach 90/100 on a comparable AI-visibility audit of `https://aibqs.com/`.
**Current audit baseline:** 69/100 in the November 26, 2026 PDF. The report's category totals add to 70, so use the auditor's displayed overall score and retain the category breakdown for comparison.
**Important:** 90 is a target, not a guaranteed result. The audit evaluates a limited set of on-page signals; actual discovery and citations also depend on indexing, third-party authority, and the audit provider's methodology.

## Production and source status (verified November 26, 2026)

- The public homepage is serving the worked example and links to the discrepancy calculator and methodology.
- Current source already includes homepage FAQ/schema, Organization/WebSite/SoftwareApplication schema, two Service entities, canonical metadata, crawler rules, sitemap coverage, and `llms.txt`.
- Local `main` and `origin/main` point to the same commit. No application source changes are pending release; only local editor/generated files were modified.
- The report claims Service schema is both detected and missing. Recheck the live page with the same auditor before changing already-present markup.
- Existing score-improvement work is documented in `docs/ai-visibility-80-plan.md`; this 90-point plan supersedes its target, not its useful validation guidance.
- The first implementation batch adds a consistent Product entity to the homepage and pricing page, removes unsupported pricing claims from the pricing JSON-LD, and makes the SEO smoke check assert the expected homepage entities.
- This batch passes typecheck, all 10 project tests, production build, and the SEO smoke check across 92 sitemap routes. The production score has not been remeasured.
- Person, location, case-study, review, and VideoObject signals remain intentionally deferred where the required facts or video metadata are not verified.

## Phase 0 — Re-establish the baseline (required before code work)

1. Run the same audit against the exact public URL, `https://aibqs.com/`, using the same settings and page scope as the 69-point report.
2. Save the new report, date, scanned URLs, overall score, six category scores, and detailed failed checks.
3. Compare the scanner's findings with live rendered HTML, not just source files. Resolve whether the scan can see Service JSON-LD, the worked example, FAQ content, and canonical.
4. If the refreshed score is already 90 or higher, stop score-driven work. Otherwise create tickets only for checks still failing.

**Gate:** do not ship a markup change to fix a check that already passes on the live page.

## Phase 1 — Close verified structured-data gaps (engineering)

For checks that the refreshed audit still reports as missing:

- Validate Organization, SoftwareApplication, FAQPage, and both Service entities in the rendered homepage output.
- Publish the Product entity on the homepage and pricing page with no fabricated offer or price; keep the description aligned with visible product copy.
- Add or repair BreadcrumbList on interior pages where the matching visible breadcrumb exists.
- Add VideoObject to the video page only if the public video URL, poster, title, description, and duration can be verified. Do not invent dates or video metadata.
- Keep product/service schema on the page describing that actual offering; do not inflate homepage markup with unrelated entities.
- Do not add Review/AggregateRating, Product claims, Person entities, business address, or service promises without accurate first-party evidence and a matching visible page.

**Acceptance:** structured data parses, IDs and canonical URLs agree, visible claims match markup, and there are no unsupported claims. Validate with Schema.org tooling and inspect the server-rendered HTML.

## Phase 2 — Supply genuine experience and trust evidence (owner + content)

These are likely the largest remaining opportunities; implementation is blocked until the business supplies/approves the facts:

- **Case studies:** publish 2–3 real customer examples with permission. Include customer/industry context, workflow, dates, methods, measured outcomes, and limitations. If no approved outcomes exist, publish a clearly labeled product-validation or pilot record instead—never present an illustration as a customer result.
- **People:** provide real names, roles, relevant credentials, biographies, and public profile URLs. Add Person markup only for those named, visible contributors.
- **Company identity:** confirm the legal/operating organization name, business location if it should be public, contact details, and authoritative social/profile links. Keep Organization `sameAs` links accurate and reciprocal where possible.
- **Evidence governance:** identify the person/team responsible for the calculation methodology, how corrections are handled, and the product/table versions covered by any validation statement.

**Acceptance:** every experience or expertise statement has a source/owner and is visible on the site; no fabricated addresses, credentials, testimonials, or performance claims.

## Phase 3 — Improve citation-ready proof (product + technical content)

- Expand the existing worked arithmetic into a compact, reproducible validation record: inputs, formula, expected output, units, rounding, edge cases, software revision, and explicit limits.
- Publish only independently verified or internally test-backed quantitative facts, with methodology and date. Label illustrative figures as illustrative.
- Add useful comparison and standards pages for high-intent buyer questions (offline capture, BDN reconciliation, ROB, Table 54B scope, and error prevention), citing primary sources and distinguishing product capability from standards approval.
- Link those pages from the relevant service/product routes and include them in sitemap/`llms.txt` after they are live and reviewed.

**Acceptance:** a reader can reproduce each published calculation and identify its assumptions; every numerical product claim links to evidence or is removed.

## Phase 4 — Build external corroboration (marketing; independent of code deployment)

- Align the company description, product name, website, app-store listings, and social profiles across authoritative profiles.
- Seek legitimate industry citations, partner references, customer references, and relevant directory listings. Do not buy or fabricate reviews/backlinks.
- Track actual citations from AI engines and search sources separately from the audit score.

**Acceptance:** record each live third-party source and date; a profile registration alone is not counted as a citation or score increase.

## Phase 5 — Release and verify (one production release per validated batch)

1. Implement only the audit-confirmed code tasks and approved content from Phases 1–3.
2. Run `npm run typecheck`, `npm run test:tools`, `npm run check:seo`, and `npm run build`.
3. Smoke-test homepage, key service pages, `/how-we-measure`, `/tools/bdn-discrepancy`, `/videos`, `/robots.txt`, `/llms.txt`, and `/sitemap.xml`; inspect canonical URLs and JSON-LD in production output.
4. Deploy through the existing GitHub-to-Netlify production integration after checking the build/owner authorization. Verify the Netlify production build succeeds and the public site serves the new release.
5. Re-run the same AI visibility audit and record the actual overall and category scores. If under 90, use the new failed checks to choose the next batch; do not infer points from markup presence alone.

## Current release status

The public site was serving the `main` version before this implementation batch. The local code changes are validated and ready for the configured production release; the new AI visibility score remains unknown until the same audit is rerun against the deployed URL. Do not treat the documentation update or the passing SEO smoke check as proof of a 90/100 score. Further high-impact E-E-A-T work still requires owner-approved people, customer/pilot evidence, or company identity details.
