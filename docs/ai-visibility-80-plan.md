# Space BQS: one-deploy plan for an AIBizMod score above 80

**Success criterion:** a new AIBizMod report for `https://aibqs.com/` scores **at least 81/100**. Keep the PDF, date, scanned URL and category scores. The November 24 baseline is 65; 72 was a forecast, not a measurement. No outside reviewer or customer material is assumed.

## 1. Establish the actual gap before editing (marketing, 30 minutes)

Rerun the same homepage audit on the currently deployed release. Record the six categories, individual failed checks and which pages were scanned. Verify the report sees the homepage canonical, example table and legal links. If not, compare its scan date and URL with the current public HTML before changing code. A scan doesn't require a Netlify build.

| Category | Nov 24 | Illustrative target |
|---|---:|---:|
| Structured data | 15/30 | 24/30 |
| Citability | 22/25 | 24/25 |
| Experience, expertise and trust | 8/20 | 12/20 |
| Technical readiness | 8/10 | 8/10 |
| Content quality | 8/10 | 8/10 |
| Brand authority | 5/5 | 5/5 |
| **Total** | **66 by displayed components; reported overall 65** | **81 by components** |

The original component scores sum to 66, not 65. Use the **reported overall score** as the acceptance test. Aim for a component total of **83 or higher** for margin; 81 by hand is not a guaranteed pass. Do not add the vendor's overlapping quick-win estimates.

**Decision gate:** if the new overall is already 81+, stop score-driven work. At 78–80, pick the smallest confirmed gap; below 78, batch the applicable tasks below. Preserve checks that already pass.

## 2. Make the homepage's actual offerings identifiable (engineering, half a day)

If `Service` is still missing, describe **deployment planning** and **data migration** in the homepage JSON-LD alongside their visible descriptions and links in the rollout section. Reuse the names, URLs and `#service` IDs from the detail pages and the existing `/#organization` provider. Prefer one shared definition per service so the descriptions do not drift.

**Acceptance:** the server-rendered homepage contains both visible offerings and parseable service entities; each entity links to the correct 200 detail page and matches the ID there. Check with Schema.org's validator and inspect the raw HTML. Retain `SoftwareApplication` for the software itself. Don't classify survey workflows as physical services provided by Space BQS.

## 3. Turn the example into evidence a buyer can test (product + engineering, one day)

Add a **“Check these figures”** link beside the worked example. Open `/tools/bdn-discrepancy` with the sample figures prefilled. Keep ordinary calculator visits unchanged, values editable and the calculator canonical free of query parameters.

On `/how-we-measure`, show a short validation table based on `tests/survey-calculations.test.mjs`: inputs, expected result, rounding convention, test scope and tested version or revision. Start with signed BDN difference, equal quantities and the zero-declared-quantity case; verify edge-case behavior against the implementation before documenting it. Of the current ten tests, six cover calculation behavior; don't present the form and submission tests as maritime validation.

**Acceptance:** starting from the homepage, a visitor can reproduce `457.819 − 460.000 = −2.181 MT` and `−2.181 ÷ 460.000 × 100 ≈ −0.47%`, edit an input, and find the formula and its limits. The arithmetic, inputs and limits remain readable without running the calculator. The example is unsigned and demonstrates neither a real shortage nor independent certification.

## 4. Make ownership and evidence easy to find (content, half a day)

Link the homepage example to the validation record and sample certificate. State who maintains the methodology using the real organization name and provide a working route for corrections. Add a revision date only after checking the published content against the identified software revision. Reconcile factual inconsistencies between the homepage, methodology and sample.

**Acceptance:** a visitor can answer “Who published this?”, “How can I reproduce it?” and “What does it not prove?” within one click of the example. No fabricated byline, physical address, rating, customer quote or case study. An organization-owned validation record may improve buyer trust even if the scanner gives it no Person or case-study credit.

## 5. Local release gate (engineering, half a day; zero deploys)

- Build using locked dependencies; run type checking and the calculation tests. Verify the prefilled calculator, a normal visit, edited values and invalid input.
- Serve the production build locally. Inspect `/`, both implementation services, the calculator, `/how-we-measure`, `/sample-report`, `/robots.txt`, `/llms.txt` and the sitemap. Check status, canonical where applicable, visible internal links and parseable structured data. Compare results with the latest failed checks.
- Check the homepage example and calculator on phone and desktop; verify the path works by keyboard. Keep all work local and avoid deploy-preview branches.
- Record pass/fail and screenshots or HTML evidence. Do not treat local validation as an AIBizMod score.

## 6. One release, one comparable result (release owner + marketing)

Ship the verified batch in one push. Before rescanning, fetch the public homepage and confirm the new service entities and calculator link are present. Run AIBizMod on the same homepage and record before/after overall and category scores.

- **81 or higher:** target met. Monitor periodically; no more score-driven releases.
- **80 or lower and scanner missed live content:** document the URL, HTML and scan timestamp; investigate scanner scope, cache or detection with AIBizMod before deploying anything else.
- **80 or lower and gaps are real:** prioritize the largest remaining applicable category. If only outside expertise or customer outcomes would close it, report that limitation. A genuine future pilot or independent review is a separate project, not a reason to manufacture proof.

**Secondary outcome:** baseline a small, fixed set of unbranded marine-software buyer questions before release. Repeat weekly under comparable conditions and log source URLs and product shortlists. A higher scanner score, an actual citation and a buyer recommendation are three different outcomes.
