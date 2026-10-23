# Space BQS Website: Content Plan

> Step 1 of 2. This plan decides **what every page says, to whom, and in what order I write it**. Once you approve it, I write the full copy page by page (Step 2), in the batches listed in section 9.
> The design and animation specs (V1 and V2) stay separate. This document is content only.

---

## 1. Goal of the content

**Primary goal:** make a surveyor team, superintendent or bunker buyer believe, within one scroll, that Space BQS produces quantity records they can defend.

**Secondary goals**
1. Explain the method clearly enough that a technical reader trusts it.
2. Rank for the searches surveyors and buyers actually make (section 8).
3. Move people to one of three actions: **Book a demo**, **See a sample report**, **Book a survey** `[if offered, see question 1]`.

**Content principles**
- Outcome first, mechanism second, proof third.
- Calm, exact, audit-grade. No hype words.
- Real surveyor vocabulary used correctly, explained once in a glossary.
- Nothing unverifiable. Every claim is either confirmed by you or marked `[TBC]`.

---

## 2. Audiences

| Audience | Who they are | What they worry about | What they need to see |
|---|---|---|---|
| **Surveyor / survey team lead** | Runs BQS work, owns the report | Rework, retyping, disputes, being blamed for a number | Fast capture, offline use, clear corrections, defensible report |
| **Surveyor on deck** | Takes the readings | Poor signal, awkward conditions, clunky forms | Simple mobile flow, offline mode, few taps |
| **Superintendent / fleet or technical manager** | Receives the quantity result | Shortfalls, disputes with suppliers | Reliable independent record, easy access to history |
| **Bunker buyer / charterer / trader** | Pays for the fuel | Paying for fuel not delivered | Transparent, traceable quantity proof |
| **Survey company owner / ops manager** | Buys the software | Cost, adoption, audit exposure, lost reports | Register overview, audit trail, security, pricing clarity |
| **Technical evaluator (IT / data)** | Vets integrations | Data handling, access control, API | Security page, integrations and API page |

Each page below names its primary audience so the copy speaks to one reader.

---

## 3. Messaging framework

### 3.1 Positioning statement (draft for your approval)

> For surveyor teams and the companies that rely on them, Space BQS is the bunker quantity survey platform that takes every reading, correction and calculation from the deck to a signed report in one traceable record, so any quantity can be explained and defended.

### 3.2 Three message pillars

| Pillar | Promise | Proof the copy must lean on |
|---|---|---|
| **1. Capture once** | Readings are entered at source and never retyped | Mobile app, offline mode, cloud sync, guided survey flow |
| **2. Show your working** | Every correction and calculation is visible and traceable | Calculation audit, version history, fixed calculation order |
| **3. Report with confidence** | Consistent, branded, reviewable reports in minutes | Report templates, reports AI with review before issue, sample report |

Supporting theme across pillars: **independence and transparency** (feeds `/why-independent` and `/how-we-measure`).

### 3.3 Voice

| Do | Don't |
|---|---|
| Short, verb-first lines: *Capture. Correct. Prove.* | Revolutionary, game-changing, next-gen |
| Concrete: "trim and list corrections" | Vague: "advanced calculations" |
| Plain English first, term second | Jargon in headlines |
| Confident but measured | Absolute claims ("zero disputes", "100% accurate") |
| Say what happens after a click | "Learn more" with no destination |

Reading level: clear to a non-native English speaker. Average sentence under 20 words.

---

## 4. Conversion map

| Action | Where it appears | Destination |
|---|---|---|
| Book a demo | Navbar, hero, every CTA band, `/pricing`, `/platform` | `/demo` |
| See a sample report | Hero secondary, `/how-we-measure`, `/features/reports-ai` | `/sample-report` |
| Book a survey `[if offered]` | `/services/*`, `/who-its-for` (buyers) | `/book-survey` |
| Contact | Footer, `/about` | `/contact` |
| Sign in | Navbar | app subdomain |

Each page gets one primary CTA and at most one secondary.

---

## 5. Page inventory and content blocks

Legend: **P1** = launch-critical, **P2** = launch, **P3** = can follow. Words are approximate final lengths.

### 5.1 Home `/` (P1, ~1,400 words)

Primary audience: all. Message: pillars 1–3 in one story.

| Block | Content | Words |
|---|---|---|
| Scrolly hero (5 beats) | Headline + body per beat, callout labels, CTAs | 180 |
| Trust strip | One positioning line, logos `[TBC]` | 20 |
| Services | 3 tiles, 25 words each | 90 |
| Why independent | Statement + 3 supporting points | 120 |
| Features bento | 4 cards, headline + 30 words | 200 |
| How we measure | 4-step stepper, 35 words each | 160 |
| Mobile app | Headline, 3 benefits, offline/sync note | 110 |
| Sample report | Headline, 40 words, CTA | 60 |
| Security and audit | Headline, 3 points | 90 |
| Pricing teaser | Headline, 30 words, CTA | 50 |
| Resources | 3 article cards (pulled from CMS) | n/a |
| Final CTA | Headline, subline, two buttons, micro-copy | 40 |

### 5.2 Services

| Page | P | Audience | Message | Blocks | Words |
|---|---|---|---|---|---|
| `/services` | P1 | Buyers, ops managers | Three survey types, one standard of record | Intro, 3 service cards, comparison table (when used / what is recorded / deliverable), CTA | 500 |
| `/services/bunker-delivery-survey` | P1 | Buyers, team leads | The quantity delivered, measured and documented | What it is, when it is used, process timeline (before / during / after), what we record, documents produced, common causes of quantity discrepancies, FAQ (6), CTA | 1,100 |
| `/services/rob-survey` | P1 | Superintendents, buyers | Know what is on board before and after | What ROB is, why it matters, procedure, what the report includes, FAQ (5), CTA | 850 |
| `/services/debunkering-survey` | P2 | Superintendents, buyers | Fuel removed, measured and recorded | What it is, when it happens, procedure, risk points to document, report contents, FAQ (5), CTA | 850 |

### 5.3 Features and platform

| Page | P | Audience | Message | Blocks | Words |
|---|---|---|---|---|---|
| `/features` | P1 | All | Everything from first reading to final report | Intro, 4 feature sections linking to children, CTA | 450 |
| `/features/survey-register-dashboard` | P1 | Ops managers | See every survey at a glance | Problem, what you see, filters and statuses, export, screenshot captions, FAQ (4) | 650 |
| `/features/calculation-audit` | P1 | Team leads, buyers | Every number can be explained | Problem, calculation order in words, version history, who changed what, screenshot captions, FAQ (4) | 750 |
| `/features/vessels-master-data` | P2 | Ops managers | One source of truth for vessels and tanks | Problem, vessel and tank data, calibration data management, reuse across surveys, FAQ (4) | 600 |
| `/features/reports-ai` | P1 | Team leads | Reports in minutes, reviewed before issue | Problem, templates, AI-assisted summary and what it does and does not do, review-before-issue flow, FAQ (5) | 750 |
| `/platform` | P1 | Ops managers, evaluators | The web platform behind the survey | Overview, workflow diagram text, roles and permissions, how it connects to the mobile app, CTA | 800 |
| `/mobile-app` | P1 | Surveyors on deck | Capture on deck, even offline | Overview, offline mode, cloud sync, guided survey flow, screen gallery captions, device support `[TBC]`, FAQ (5) | 800 |

### 5.4 Trust and method

| Page | P | Audience | Message | Blocks | Words |
|---|---|---|---|---|---|
| `/how-we-measure` | P1 | Buyers, evaluators | Method you can inspect | Principles, 5-step method (sounding, trim/list, temperature, density, quantity), correction order in words, assumptions and limits, standards references `[TBC]`, sample-report link | 1,200 |
| `/why-independent` | P1 | Buyers, superintendents | A neutral record settles disputes | The problem, what independence means in practice, 3 scenarios, what independence does not do, CTA | 800 |
| `/security-audit` | P1 | Evaluators, owners | Controlled access, complete trail | Audit trail, roles and access, data handling, backups and availability `[TBC]`, vulnerability contact `[TBC]`, FAQ (6) | 800 |
| `/sample-report` | P1 | Everyone | See the finished product | Intro, interactive report with callouts, "what to look for" list, download gate `[TBC]` | 400 |

### 5.5 Audience, commercial and partner pages

| Page | P | Audience | Message | Blocks | Words |
|---|---|---|---|---|---|
| `/who-its-for` | P2 | All | Built for the people who rely on the number | 4 segment sections (survey teams, superintendents, buyers, charterers), each: pain, benefit, feature link | 800 |
| `/pricing` | P1 | Owners, ops managers | Clear plans, no guesswork | Plan cards, comparison table, what is included, FAQ (8), "talk to us" | 700 `[needs pricing]` |
| `/demo` | P1 | Owners, team leads | See your survey in Space BQS | What happens in the demo (3 steps), form, what to prepare, reassurance, success state | 350 |
| `/book-survey` `[if offered]` | P1 | Buyers | Request a survey for your next delivery | Short explainer, form (vessel, port, window, contact), what happens next | 300 |
| `/integrations-api` | P2 | Evaluators | Connects to the systems you already use | Integration overview, API overview, example payload, request access CTA | 700 `[needs facts]` |
| `/partners` | P3 | Prospective partners | Work with us | Partner types, benefits, enquiry form | 400 |
| `/customers` | P3 | Buyers | Teams using Space BQS | Logos, quotes, short case summaries. **Hidden until real** | 400 `[TBC]` |

### 5.6 Company, content and system pages

| Page | P | Audience | Blocks | Words |
|---|---|---|---|---|
| `/about` | P2 | All | Story, mission, how Space BQS relates to pmspace, values, team `[TBC]` | 600 |
| `/contact` | P2 | All | Form, email, regions served `[TBC]`, response expectation | 250 |
| `/changelog` | P3 | Existing and prospective users | Intro, dated entries (seed with 5 from real releases `[TBC]`) | 200 + entries |
| `/resources` | P2 | All | Hub intro, categories, featured article, search/filter | 200 |
| `/resources/[slug]` | P2 | All | Article template plus first 12 articles (section 7) | 900–1,400 each |
| Legal: privacy, terms, cookies | P2 | All | Drafted for legal review, not final legal text | n/a |
| 404, 500, empty states | P2 | All | Helpful, on-brand microcopy | 80 |

**Total estimated written content:** about 17,000 words of page copy, plus about 14,000 words for the 12 launch articles.

---

## 6. Global copy to write once and reuse

| Element | Notes |
|---|---|
| Navbar labels and CTA | Five links plus Book a demo and Sign in |
| Footer | 4 columns (Services, Features, Company, Resources), contact line, legal links, tagline |
| CTA bands | 3 variants (demo, sample report, survey) with headline, subline, button copy |
| Forms | Labels, helper text, validation errors, success messages for demo, survey, contact, partner |
| Meta | Title (under 60 chars), description (under 155), OG title and description for every page |
| Alt text | Pattern and examples for screenshots, diagrams and report previews |
| Cookie banner | Short, plain-language text |
| Email confirmations | Demo requested, survey requested, contact received |
| Tooltips | Glossary terms in 15–25 words each |

---

## 7. Resources plan (first 12 articles)

Chosen to attract the searches in section 8 and to support the method and trust pages. All need review by someone with surveying experience before publishing.

| # | Working title | Category | Supports |
|---|---|---|---|
| 1 | How a bunker delivery survey works, step by step | Guides | `/services/bunker-delivery-survey` |
| 2 | Sounding and ullage: what they mean and why both get recorded | Method | `/how-we-measure` |
| 3 | Trim and list corrections explained | Method | `/features/calculation-audit` |
| 4 | Reading a bunker delivery note: what to check | Guides | Buyers |
| 5 | Mass flow meter vs tank measurement: why checking both matters | Method | `/why-independent` |
| 6 | ROB survey checklist | Checklists | `/services/rob-survey` |
| 7 | Debunkering survey: what to record and why | Guides | `/services/debunkering-survey` |
| 8 | The most common causes of quantity disputes | Insight | `/why-independent` |
| 9 | From notebook to survey register: going paperless | Software | `/features/survey-register-dashboard` |
| 10 | What an audit-ready survey report contains | Guides | `/sample-report` |
| 11 | Working offline: capturing surveys without signal | Software | `/mobile-app` |
| 12 | How to choose BQS software: a buyer's checklist | Software | `/pricing`, `/demo` |

Article template: summary box, plain-English intro, numbered sections, one diagram or table, "key takeaways", related feature, CTA.

---

## 8. SEO plan (themes, not volumes)

Keyword themes to confirm with a tool before the copy is finalised. I will not quote search volumes I haven't checked.

| Page | Primary theme | Supporting themes |
|---|---|---|
| Home | bunker quantity survey software | BQS software, bunker survey app |
| Bunker delivery survey | bunker delivery survey | bunker quantity survey, bunker surveyor |
| ROB survey | ROB survey, remaining on board survey | bunker ROB measurement |
| Debunkering survey | debunkering survey | fuel removal survey |
| How we measure | how bunker quantity is calculated | trim and list correction, density and temperature correction |
| Why independent | independent bunker surveyor | bunker quantity dispute |
| Features pages | bunker survey reporting software | survey register, calculation audit |
| Mobile app | offline survey app for surveyors | bunker survey mobile app |
| Articles | long-tail question phrases | one question per article |

On-page rules: one H1 per page, primary theme in H1 and first 100 words, FAQ sections marked for `FAQPage` schema, internal links per the "Supports" column above.

---

## 9. Writing sequence

I write in batches so you can review and steer early. Each batch is one markdown file with every page's final copy, meta, CTA and alt text.

| Batch | Contents | Why this order |
|---|---|---|
| **1** | Global copy + Home (including the 5 hero beats) | Sets voice for everything else |
| **2** | Services (4 pages) | Core offer |
| **3** | Features (5 pages) + Platform + Mobile app | Product proof |
| **4** | How we measure, Why independent, Security and audit, Sample report | Trust, needs your fact checks |
| **5** | Pricing, Demo, Book survey, Who it's for, Integrations/API | Conversion pages, depend on your inputs |
| **6** | About, Contact, Partners, Customers shell, Changelog, Resources hub | Company layer |
| **7** | 12 articles | Longest, lowest dependency |
| **8** | Legal drafts, system pages, emails, forms | Needs legal review |

After each batch: you comment, I revise once, then it is locked.

---

## 10. Inputs I need from you

Without these I will write structurally and mark gaps `[TBC]` rather than guess.

**Must have (blocks Batch 1–4)**
- [ ] Is Space BQS **software only**, or does the team also **perform surveys** for clients? (decides whether `/services` and `/book-survey` are "what we do" or "what our customers do")
- [ ] Brand name usage: Space BQS, pmspace BQS, or Space BQS by pmspace
- [ ] Access to review the BQS module at app.pmspace.ai (screens or a walkthrough) so features are described exactly as they work
- [ ] The calculation steps and standards your software follows, in your words
- [ ] Offline behaviour and cloud sync: what works without signal, what syncs when

**Should have (Batch 4–6)**
- [ ] Security facts: hosting, access control, backups, audit trail details
- [ ] Pricing model (per user, per survey, per vessel, or custom) or confirmation it will be "talk to us"
- [ ] Integrations and API: what exists today vs planned
- [ ] Whether reports use AI today and exactly what the AI does
- [ ] Company story, founding year, regions served, team names you want public

**Nice to have**
- [ ] Customer names, quotes or permission to use logos
- [ ] Competitor list so I can sharpen differentiation (your earlier competitor analysis can feed this)
- [ ] Any standards or memberships you can legitimately reference

---

## 11. Quality checklist applied to every page

- [ ] One reader, one message, one primary CTA
- [ ] H1 states the outcome, not the feature
- [ ] No claim without a source or a `[TBC]` marker
- [ ] Surveyor terms used correctly and explained or linked
- [ ] Title, description, OG text and alt text present
- [ ] Reading level and sentence length within guidelines
- [ ] Internal links to at least two related pages
- [ ] Reviewed against the pillars in section 3

---

## 12. Decisions for you to approve

1. Positioning statement in 3.1: approve or edit
2. Three pillars in 3.2: approve or edit
3. Page list and priorities in section 5: anything to add, merge or drop? (for example merging `/partners` and `/customers` into one page for launch)
4. Writing order in section 9
5. Answers to the "must have" inputs in section 10
