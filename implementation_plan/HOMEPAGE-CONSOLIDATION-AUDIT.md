# Homepage consolidation and motion audit

## Outcome

The homepage now has **nine main sections instead of fifteen**. The primary issue was repeated explanations and cumulative scroll distance, especially where several pinned or tall demonstrations covered the same capture → calculation → approval → certificate journey.

Measurements were taken against production builds in Edge/Chromium after hydration and font loading. They describe total document height, including the shared footer, rather than a performance/FPS benchmark.

| Viewport | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Desktop, 1440 × 900 | 21,247px | 11,429px | 46.2% |
| Mobile, 390 × 844 | 23,615px | 13,475px | 42.9% |
| Main homepage sections | 15 | 9 | 40% |

## Findings

1. **The workflow was explained repeatedly.** The concept video, four-stage mobile showcase, office approval preview, temperature explanation, and report preview all described different parts of the same job. Their information belongs in one connected introduction, with deeper pages available for exploration.
2. **The cost of a section was not just its content.** Desktop comparison, team, and rollout showcases added 3,320px of explicit scroll travel on top of their viewport-sized displays. The separate on-deck section was another 4,198px.
3. **The problem story occupied too much of the introduction.** Three full illustrated scenes required 2,182px on desktop and 2,325px on mobile before the visitor reached the product explanation.
4. **Evidence claims were distributed across too many blocks.** Locked records, audit context, PDF certificates, and Excel outputs appeared in office, warehouse, calculations, comparison, evidence, and FAQ sections. Repetition reduced the distinction between sections.
5. **Mobile stacked several large demonstrations.** Three service cards with phone mockups, four deck scenes, and four persona cards created particularly long stretches. The service cards now use a native horizontal rail on smaller screens.
6. **The closing decision was fragmented.** Implementation, licensing, report CTAs, and the footer CTA competed as separate endings. Licensing now sits with implementation, with the footer remaining the main closing demo invitation.

## Section-by-section decisions

| Previous section | Desktop height | Decision |
| --- | ---: | --- |
| Hero + ocean reveal | 1,710px | Keep; shorten the reveal from 90svh to 55svh of additional travel. Add compact standards/output proof points. |
| Trust strip | 79px | Merge into the hero. Technical details remain in the FAQ and measurement page. |
| Where numbers go wrong | 2,182px | Replace the three long illustrated scenes on the homepage with three concise problem/solution cards. Preserve the three animated story headings. |
| Three survey workflows | 926px | Keep; tighten spacing and make the three phone cards swipeable on mobile. These explain survey types, not process steps. |
| How it works | 770px | Expand modestly into the unified capture/calculate/certify story. Keep the normal, automatically playing concept-video card. |
| In the office | 563px | Merge supervisor review and finalisation into the third journey card and retained warehouse experience. |
| Four-stage on-deck showcase | 4,198px | Remove from the homepage; retain the full walkthrough on `/mobile-app`. |
| Survey Warehouse | 1,242px | Keep: this is an interactive demonstration of evidence retrieval, with distinct search and record behavior. |
| Temperature / Table 54B | 641px | Merge the worked VCF example into the calculation card; link to `/how-we-measure` for the full explanation. |
| Why firms switch | 2,700px | Keep the preferred horizontal transitions; reduce additional pinned travel from 1,800px to 900px. |
| Built for the whole team | 1,460px | Keep the image-split/flip interaction; reduce additional travel from 560px to 360px. |
| Solutions & implementation | 1,860px | Keep the continuous horizontal showcase and incoming-card lift; reduce additional travel from 960px to 600px and add licensing/pricing. |
| Evidence, delivered | 553px | Merge PDF/Excel handover into the final journey card and warehouse. Keep direct access to `/sample-report`. |
| Pricing teaser | 578px | Merge the team licence/no-per-job-fee message and pricing link into rollout. Remove the extra ambient-video panel. |
| FAQ | 798px | Keep all seven answers and add a direct pricing link. |

Detailed components and destination pages were retained. The changes reduce the homepage's composition rather than deleting the deeper product content.

## New nine-section reading order

1. **Product promise:** hero, standards, app download links, and app walkthrough invitation.
2. **The problem:** three recognizable handoff failures, summarized.
3. **Survey coverage:** delivery, ROB/on-off-hire, and debunkering.
4. **The connected workflow:** normal video card plus Capture → Calculate → Review/Lock/Deliver.
5. **Evidence retrieval:** interactive Survey Warehouse.
6. **Why switch:** compact six-step comparison for deeper consideration.
7. **Who benefits:** the four team roles.
8. **Rollout and licensing:** migration, deployment, Cargo WMS, and team pricing.
9. **Remaining questions:** FAQ, leading into the shared footer CTA.

## GSAP interaction

`HomeWorkflowJourney.tsx` introduces a short, unpinned scroll sequence:

- Three slightly offset/rotated cards assemble into a clear workflow.
- A small marker travels along a wave-shaped route from capture through calculation to proof.
- The route draws as the visitor scrolls.
- The certificate receives a small "Locked" stamp at the end.
- Reversing scroll reverses the sequence.

Implementation uses `gsap`, `ScrollTrigger`, and `MotionPathPlugin`. Animation modules load only near this section on a suitable viewport. A scoped `gsap.matchMedia()` context reverts animations and ScrollTriggers when motion preferences change or the component unmounts.

There is **no additional pin, forced scrolling, scroll-to-play video, background blur animation, or continuous decorative animation loop** in this sequence. Cards remain readable if JavaScript or the optional animation chunk is unavailable. Mobile and reduced-motion users receive the complete static content.

## Validation

- Production build and TypeScript checks passed; 58 routes generated.
- Browser checks confirmed nine main sections and the measured height reductions.
- GSAP assembly, marker travel, route drawing, final stamp, and reverse scroll verified.
- Reduced-motion switching reverts the sequence to its static readable layout.
- Client navigation away and back recreates one working sequence without duplicate content.
- Normal concept-video card retained; mobile service-card rail, FAQ toggles, key product links, and viewport overflow checked.
- Browser checks confirmed that the comparison reaches its sixth step, all four team cards finish flipping, and the rollout reaches Cargo WMS at the shorter scroll distances.

## Further opportunities

If the page still feels too long after reviewing this version, the next useful content decision is whether the complete six-step comparison belongs on the homepage or on `/why-independent` / a dedicated comparison page. The Warehouse and team fallback layouts are also substantial on mobile. Measure engagement before replacing these distinctive sections with shorter summaries; they answer different buyer questions and were recently selected for their interaction design.
