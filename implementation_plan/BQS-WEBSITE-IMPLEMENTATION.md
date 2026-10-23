# Space BQS Website: Implementation Spec

> Cinematic, scroll-driven marketing site for the Space BQS (Bunker Quantity Survey) platform.
> Reference: the Sony WH-1000XM6 scrollytelling brief (mechanic, navbar, palette logic, beat structure) and four Framer Marketplace components (motion language). Everything here is re-targeted to bunker surveying.

---

## 0. Read this first

**What we are borrowing, and what we are not**

| Source | Borrow | Do not copy |
|---|---|---|
| Sony brief | Pinned canvas + 120-frame sequence, scroll-beat copy, Apple-style glass navbar, near-black seamless background, gradient headline fill | Headphone subject, Sony blue as the only accent, consumer-electronics tone |
| Font Weight Hover (Anux) | Variable-font weight reacting to cursor / scroll, per-letter | Framer component itself |
| Liquid Wave Divider (Joao Porto, $6) | Canvas wave between sections, agitated by scroll velocity | Framer component itself |
| Kinetic Wave Pro (Buster Studios, $12) | Wave surface that swells toward the pointer, touch-drag on phones | Framer component itself |
| Water Impact (Edi Priatama, free) | Random "droplet" ripples, layered rings, auto-removed | Framer component itself |

**Important:** all four are Framer-only components. They cannot be dropped into a Next.js project. This spec re-implements the *behaviour* natively (Canvas 2D + CSS + Framer Motion). The two paid ones carry Single-Use licences and the free ones a Limited licence, so we build our own equivalents rather than extract or clone their code. If you would rather buy and use them, the alternative is to build the site in Framer (see section 15).

**Assumptions I made (change any of them, nothing else breaks)**

1. Stack: Next.js 14 App Router, TypeScript, Tailwind, `framer-motion`, optional `lenis` for smooth scroll.
2. The site is the one already planned in the sitemap (`/`, `/services`, `/features`, ... `/contact`).
3. Audience: BQS surveyor teams, superintendents, bunker buyers / charterers who want proof of quantity.
4. Hero sequence subject: **"the measurement chain"** (see section 3). A fallback subject is given if 3D rendering the full chain is too heavy.
5. Brand tone: precise, calm, audit-grade. Not hype.
6. No statistics, certifications or customer names are invented. Anything unconfirmed is marked `[TBC]`.

---

## 1. Experience concept

**One-line idea:** *A bunker survey, taken apart so you can see why you can trust it, then put back together as a signed report.*

Sony's headphones explode to show engineering. Ours explodes to show **evidence**: every reading, correction and calculation that turns a dipstick-level sounding into a defensible quantity. The "wow" and the product proof are the same thing.

Water is the natural visual metaphor (marine fuel, oceanic palette already chosen for the mobile app), so the Framer wave and ripple references are not decoration. They are the connective tissue between sections:

| Motion | Where | Meaning |
|---|---|---|
| Image-sequence explode / reassemble | Pinned hero (400vh) | The survey chain |
| Water Impact ripples | Hero idle state, CTA buttons on hover/click, demo form success | A reading being "taken" |
| Liquid / Kinetic wave | Section dividers, footer, final CTA band | Moving from deck to office to report |
| Font weight hover | Section headlines, big numerals | Precision, "weight" of a measurement |

---

## 2. Design system

### 2.1 Colour tokens

The page background and the frame background **must be the same value**. Render frames on `--bg` or eyedrop frame 1 and overwrite `--bg`.

```css
:root {
  --bg:        #03070C;  /* primary, matches sequence frames */
  --bg-2:      #08111A;  /* sections, cards */
  --bg-3:      #0D1824;  /* raised surfaces */
  --line:      rgba(255,255,255,0.08);
  --text-hi:   rgba(255,255,255,0.92);
  --text-mid:  rgba(255,255,255,0.62);
  --text-low:  rgba(255,255,255,0.38);

  --ocean:     #0B5CFF;  /* primary accent */
  --aqua:      #19D3F3;  /* secondary accent, highlights */
  --signal:    #FFB020;  /* tiny use only: "measured value" markers, warnings */
  --ok:        #2BD99F;

  --grad-accent: linear-gradient(90deg, var(--ocean), var(--aqua));
  --grad-hero:   radial-gradient(60% 50% at 50% 42%, #061326 0%, var(--bg) 70%);
  --grad-text:   linear-gradient(180deg, #fff 55%, #9BEAFF 100%);
}
```

Rules: accent colours appear on less than ~5% of any viewport. `--signal` is reserved for data callouts in the sequence and the sample-report page. No pure white backgrounds anywhere (including the pricing and docs pages) to keep the "unified void".

### 2.2 Typography

- Family: **Inter** (variable, via `next/font`), fallback `-apple-system, "SF Pro Display", system-ui`.
- Variable axis `wght` 300–800 is required for the weight-hover effect.
- Numerals: `font-variant-numeric: tabular-nums` on all measurements.

| Role | Size (desktop / mobile) | Weight | Tracking | Line height |
|---|---|---|---|---|
| Display (hero) | clamp(56px, 8vw, 120px) / 44px | 700 | -0.04em | 0.95 |
| H1 | clamp(40px, 5vw, 72px) | 650 | -0.035em | 1.0 |
| H2 | clamp(32px, 3.6vw, 52px) | 600 | -0.03em | 1.05 |
| H3 | 24px | 600 | -0.02em | 1.2 |
| Body | 17px | 400 | -0.005em | 1.6 |
| Label / eyebrow | 12px, uppercase | 600 | 0.14em | 1.2 |
| Mono (readings) | 14px, `ui-monospace` | 500 | 0 | 1.4 |

Headline gradient: apply `--grad-text` with `background-clip: text` only to display and H1. Body stays solid.

### 2.3 Spacing, layout, radius

- 8px base scale. Section padding: `clamp(96px, 14vh, 200px)` vertical.
- Max content width 1240px; hero and dividers are full-bleed.
- Radius: 14px cards, 999px pills. Gradient 1px borders on cards and CTAs (mask-composite technique).
- Faint 12-column alignment grid at 3% opacity behind hero only (the "grounding hint" from the Sony brief).

### 2.4 Motion tokens

```ts
export const ease = {
  out:   [0.16, 1, 0.3, 1],     // reveals
  inOut: [0.65, 0, 0.35, 1],    // beat transitions
  soft:  [0.25, 0.1, 0.25, 1],
};
export const dur = { fast: 0.25, base: 0.6, slow: 1.1 };
export const spring = { stiffness: 120, damping: 30, mass: 0.3 }; // scroll smoothing
```

Only animate `transform` and `opacity` (plus canvas draws). Never animate layout properties.

---

## 3. The hero sequence (120 frames)

### 3.1 Subject

**Primary (recommended): "The measurement chain".** A matte-dark, semi-translucent cutaway of a bunker tank section, with these floating components:

1. Tank section with visible fuel level (soft aqua tint)
2. Sounding / ullage tape and reference point
3. Temperature probe
4. Density sample bottle
5. Rugged tablet running Space BQS
6. Calculation "layers": translucent plates labelled by correction (trim, list, temperature, density)
7. Report sheet with a signature seal that locks in at the end

**Fallback (cheaper to render): "The app, exploded".** The Space BQS phone/tablet separating into layers: glass, capture UI, calculation engine, audit trail, report output. Same beats, fewer 3D assets.

### 3.2 Storyboard

| Frames | Scroll % | State |
|---|---|---|
| 1–18 | 0–15 | Assembled hero pose, three-quarter angle, rim light, water surface faintly glowing under the tank |
| 19–48 | 15–40 | Tank lifts, probe and tape detach, tablet floats forward. Capture components isolated |
| 49–78 | 40–65 | Maximum spread. Correction plates fan out in order (trim, list, temperature, density). Callouts light up |
| 79–102 | 65–85 | Plates collapse into one calculation stack, report sheet slides in beneath |
| 103–120 | 85–100 | Everything glides back to a clean hero pose. Signature seal lights up in `--aqua` on the final frame |

The last frame should differ slightly from frame 1 (seal visible, report present) so the end state reads as a *result*, not a loop.

### 3.3 Rendering brief (for the 3D artist or AI render pipeline)

- Resolution: 2560×1440 master, delivered at 1920×1080 and 1280×720.
- Background: flat `#03070C`, no vignette baked into the corners. Any glow is a soft radial that fades to exactly `#03070C` before the edge.
- Lighting: cool rim light (aqua/blue), deep blacks, controlled reflections, matte materials. No lens flares, no text baked into frames (text is HTML).
- Camera: locked. Only the objects move, so scaling and positioning stay stable.
- Keep the object's bounding box inside ~70% of frame width so mobile crop and nav overlays never clip it.

### 3.4 Asset pipeline

```bash
# From a PNG sequence (frame_0001.png ...) to WebP at two sizes
ffmpeg -i frame_%04d.png -vf "scale=1920:-2" -c:v libwebp -quality 82 -compression_level 6 public/sequence/desktop/bqs-%04d.webp
ffmpeg -i frame_%04d.png -vf "scale=1080:-2" -c:v libwebp -quality 78 public/sequence/mobile/bqs-%04d.webp

# Mobile uses every 2nd frame (60 frames). Rename sequentially after selecting.
```

Budget: desktop sequence under 9 MB total, mobile under 3 MB. Check with a quick `du -sh public/sequence/*`.

---

## 4. Project structure

```
/app
  layout.tsx                 # fonts, providers, nav, footer
  page.tsx                   # home: <ScrollyHero/> + sections
  /services /features /platform /mobile-app /how-we-measure
  /why-independent /who-its-for /integrations-api /security-audit
  /sample-report /pricing /demo /partners /customers /changelog
  /book-survey /resources /resources/[slug] /about /contact
  sitemap.ts
/components
  /scrolly
    ScrollyHero.tsx          # pinned section + beats
    SequenceCanvas.tsx       # canvas player
    Beat.tsx                 # text overlay with in/out ranges
    beats.config.ts          # copy + ranges (single source of truth)
  /motion
    WaveDivider.tsx          # liquid / kinetic wave (canvas)
    WaterRipple.tsx          # droplet rings
    WeightText.tsx           # variable-font weight hover
    Reveal.tsx               # standard fade/slide-in
  /ui
    Navbar.tsx  Button.tsx  GradientCard.tsx  Stat.tsx  Footer.tsx
/lib
  site.ts  resources.ts  motion.ts  useReducedMotion.ts
/public/sequence/{desktop,mobile}/bqs-0001.webp ...
```

Install:

```bash
npm i framer-motion lenis
```

---

## 5. Scrollytelling hero

### 5.1 Layout

```tsx
// ScrollyHero.tsx
'use client';
import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import SequenceCanvas from './SequenceCanvas';
import Beat from './Beat';
import { beats } from './beats.config';

export default function ScrollyHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <section ref={ref} className="relative h-[400vh] bg-[var(--bg)]" aria-label="How a Space BQS survey works">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'var(--grad-hero)' }} />
        <SequenceCanvas progress={scrollYProgress} />
        {beats.map((b) => <Beat key={b.id} beat={b} progress={scrollYProgress} />)}
      </div>
    </section>
  );
}
```

Use `h-[400vh]` on desktop; on mobile use `h-[320vh]` (shorter scroll, 60 frames).

### 5.2 Canvas player

Requirements: preload progressively, draw only when the frame index changes, `contain` fit, DPR aware, smoothed progress.

```tsx
// SequenceCanvas.tsx
'use client';
import { useEffect, useRef } from 'react';
import { MotionValue, useSpring, useMotionValueEvent } from 'framer-motion';

type Props = { progress: MotionValue<number> };

export default function SequenceCanvas({ progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<(ImageBitmap | null)[]>([]);
  const current = useRef(-1);
  const smooth = useSpring(progress, { stiffness: 120, damping: 30, mass: 0.3 });

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  const COUNT = isMobile ? 60 : 120;
  const dir = isMobile ? 'mobile' : 'desktop';
  const src = (i: number) => `/sequence/${dir}/bqs-${String(i + 1).padStart(4, '0')}.webp`;

  const draw = (i: number) => {
    const c = canvasRef.current, img = frames.current[i];
    if (!c || !img) return;
    const ctx = c.getContext('2d')!;
    const { width: W, height: H } = c;
    ctx.clearRect(0, 0, W, H);
    const s = Math.min(W / img.width, H / img.height);          // contain
    const w = img.width * s, h = img.height * s;
    ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
  };

  // size canvas to viewport * DPR
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current!, dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = innerWidth * dpr; c.height = innerHeight * dpr;
      if (current.current >= 0) draw(current.current);
    };
    resize(); addEventListener('resize', resize);
    return () => removeEventListener('resize', resize);
  }, []);

  // progressive load: frame 0 first, then every 6th, then fill gaps
  useEffect(() => {
    let cancelled = false;
    const load = async (i: number) => {
      if (frames.current[i]) return;
      const blob = await (await fetch(src(i))).blob();
      if (!cancelled) frames.current[i] = await createImageBitmap(blob);
      if (i === 0 || i === current.current) draw(i);
    };
    (async () => {
      await load(0);
      for (let i = 6; i < COUNT; i += 6) await load(i);
      for (let i = 0; i < COUNT; i++) await load(i);
    })();
    return () => { cancelled = true; };
  }, []);

  useMotionValueEvent(smooth, 'change', (p) => {
    const i = Math.min(COUNT - 1, Math.max(0, Math.round(p * (COUNT - 1))));
    if (i === current.current) return;
    // fall back to nearest loaded frame if this one is still loading
    let j = i; while (j >= 0 && !frames.current[j]) j--;
    current.current = i;
    if (j >= 0) requestAnimationFrame(() => draw(j));
  });

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
```

Notes:
- Show a still `<img>` of frame 1 as the LCP element under the canvas, then let the canvas take over. This keeps first paint instant.
- Under `prefers-reduced-motion`, skip the canvas entirely: render 5 static key frames (one per beat) stacked as normal scroll sections.

### 5.3 Beats (copy and timing)

```ts
// beats.config.ts
export const beats = [
  { id: 'hero',    range: [0.00, 0.15], align: 'center', ... },
  { id: 'capture', range: [0.15, 0.40], align: 'left',   ... },
  { id: 'calc',    range: [0.40, 0.65], align: 'right',  ... },
  { id: 'report',  range: [0.65, 0.85], align: 'left',   ... },
  { id: 'cta',     range: [0.85, 1.00], align: 'center', ... },
] as const;
```

Each `Beat` fades in over the first 20% of its range and out over the last 20%, with a 24px slide from its alignment side (`ease.out`).

| Beat | Align | Eyebrow | Headline | Body |
|---|---|---|---|---|
| Hero | Center | SPACE BQS | **Every tonne, proven.** | Independent bunker quantity surveys, captured on deck and audited in the cloud. |
| Capture | Left | 01 · CAPTURE | **Take the reading once.** | Soundings, trim and list, temperatures and density, entered on the vessel, on the barge, offline if the signal drops. Nothing gets retyped later. |
| Calculate | Right | 02 · CALCULATE | **Every correction, in plain sight.** | Tank tables, trim and list, temperature and density corrections applied in a fixed, visible order. Open any survey and see exactly how the number was reached. |
| Report | Left | 03 · REPORT | **From soundings to a signed report.** | Surveys become consistent, branded reports in minutes. Every figure links back to the readings behind it. |
| CTA | Center | | **Measure once. Prove every tonne.** | Space BQS gives surveyor teams one record from first sounding to final report. |

CTA beat buttons: primary **Book a demo** (gradient border + water ripple on hover/press), secondary text link **See a sample report →**. Micro-copy: *Built for bunker delivery, ROB and debunkering surveys.*

Callout labels inside the sequence (HTML, absolutely positioned, appear on beats 2–3, mono font, 1px line to the object): `SOUNDING`, `TRIM / LIST`, `TEMP`, `DENSITY`, `CALC`, `AUDIT TRAIL`. Positions are percentages of the canvas box so they track the object at any viewport.

---

## 6. Navbar (Apple-style)

- Fixed, 48px tall (56px mobile). `backdrop-filter: blur(20px) saturate(140%)`, `background: rgba(3,7,12,0.72)`, bottom hairline `--line`.
- At scroll 0: opacity 0 background and border; fades in between 0 and 80px of scroll (`useScroll` + `useTransform`).
- Left: wordmark **Space BQS** (weight 600) with small `by pmspace` in `--text-low` (drop on mobile).
- Centre links: **Services · Platform · How we measure · Sample report · Pricing**. Hover: opacity 60% → 100% and a 1px aqua underline growing from the centre.
- Right: **Book a demo** pill, gradient 1px border, soft aqua glow on hover. Secondary text link **Sign in** (links to the app subdomain).
- Mobile: hamburger opens a full-screen glass sheet, links stagger in (40ms), body scroll locked.
- Anchor behaviour on the home page: nav links scroll to sections with Lenis, offset by nav height.

---

## 7. Framer-reference motion components (native builds)

### 7.1 `WaveDivider` (Liquid Wave Divider + Kinetic Wave Pro)

Purpose: replace hard section edges with a living wave. One component, two modes (`liquid` is scroll-driven, `kinetic` adds pointer pull).

Props: `layers (1–5)`, `colorFrom`, `colorTo` (set to the adjoining section backgrounds or transparent), `height (default 160)`, `direction ('up'|'down')`, `interactive (boolean)`, `pull`, `reach`, `response`.

Behaviour:
- Canvas 2D, no libraries. Each layer is a sum of 2–3 sines with different frequency, phase speed and amplitude.
- **Scroll agitation:** read scroll velocity (`lenis.velocity` or delta between frames). Add `velocity * k` to amplitude, decaying with exponential smoothing (~0.92 per frame).
- **Kinetic:** track pointer x within the canvas. Add a gaussian bump to the wave height centred at pointer x: `lift * exp(-((x - px)^2) / (2 * reach^2))`, eased toward the target with `response`. Touch-drag uses the same code via pointer events.
- Pause with `IntersectionObserver` when off screen. Render one static frame for `prefers-reduced-motion`.
- Pixel-accurate at any width (`ResizeObserver`, DPR capped at 2).

```tsx
// core of the draw loop
for (let l = 0; l < layers; l++) {
  ctx.beginPath(); ctx.moveTo(0, H);
  for (let x = 0; x <= W; x += 4) {
    const t = time * (0.6 + l * 0.25);
    let y = base + l * 10
          + Math.sin(x * 0.006 + t + l) * (amp + vel * 18)
          + Math.sin(x * 0.013 - t * 1.3) * (amp * 0.45);
    if (interactive) y -= lift * Math.exp(-((x - px) ** 2) / (2 * reach ** 2));
    ctx.lineTo(x, y);
  }
  ctx.lineTo(W, H); ctx.closePath();
  ctx.fillStyle = layerColor(l); ctx.fill();
}
```

Where used: between every major home section, above the footer (interactive), and as the band behind the final CTA (interactive). Use at most one visible wave per viewport.

### 7.2 `WaterRipple` (Water Impact)

Purpose: droplets that spawn rings, then remove themselves.

Props: `colorFrom`, `colorTo`, `rings (3)`, `maxRadius (240)`, `ringWidth (1.5)`, `duration (2400ms)`, `frequency (1800ms)`, `shape ('circle'|'rect')`, `trigger ('auto'|'hover'|'click')`.

Implementation: absolutely positioned layer. Each drop creates N `motion.span` rings with `scale: 0 → 1`, `opacity: 0.5 → 0`, staggered by 120ms, border gradient `colorFrom → colorTo`. Remove from state on animation complete. Cap concurrent ripples at 6.

Where used:
- Hero: very faint `auto` ripples on the water surface under the tank in frames 1–18 and 103–120 (fade out during the explode).
- Buttons: `click` ripple from the pointer position.
- Demo form success state: one large ripple behind the confirmation.

### 7.3 `WeightText` (Font Weight Hover)

Purpose: headline weight reacts to the cursor, letter by letter.

Modes to implement (same four as the reference):
1. **Cursor radius:** weight rises with proximity (`wght = min + (max - min) * falloff(distance / radius)`).
2. **Whole text:** weight animates when the text or its parent is hovered.
3. **Scroll reveal:** weight eases from `min` to `max` as the element enters view, with a stagger wave.
4. **Scroll scrub:** weight follows scroll progress; "sweep" variant sends a bold band across the letters.

Rules:
- Split into `<span aria-hidden>` per letter inside one element with the full string in `aria-label`, or visually-hidden text, so screen readers read one sentence.
- Update via CSS variable `--w` set inside `requestAnimationFrame`, applied as `font-variation-settings: "wght" var(--w)`.
- Touch devices switch automatically to scroll reveal or scrub.
- Width stability: put each letter in a fixed-width inline-block only for tabular numerals; for words accept slight reflow or add `letter-spacing` compensation (test on H2 widths).

Where used: Home H2s, the "How we measure" step titles, and large stat numerals (for example `0.00%` variance placeholders in the sample report). Not on body text.

---

## 8. Home page structure (after the pinned hero)

| # | Section | Content | Motion |
|---|---|---|---|
| 1 | Trust strip | "Built for independent surveyors, bunker buyers and superintendents." Logos `[TBC]` | Logo marquee, slow |
| 2 | Wave divider | | Liquid |
| 3 | Services | Three tiles: Bunker delivery survey, ROB survey, Debunkering survey. One-line description each + link | Tiles reveal 80ms stagger |
| 4 | Why independent | Short statement on neutral, documented quantity checks. Two-column: text left, animated "reading vs claim" diagram right | `WeightText` headline |
| 5 | Features bento | Survey register dashboard, Calculation audit, Vessels master data, Reports AI. Bento grid, each with a mini UI visual | Hover tilt, gradient border |
| 6 | How we measure | Sticky vertical stepper: Sounding → Corrections → Quantity → Report. Each step shows the matching UI | Scroll-scrubbed highlight |
| 7 | Mobile app | Phone mockup (offline, cloud sync, on-deck capture) | Parallax float |
| 8 | Sample report | Embedded preview of a report page with "Download sample" CTA | Page flip on scroll |
| 9 | Security and audit | Audit trail, roles, data handling summary `[TBC details]` | Reveal |
| 10 | Pricing teaser | Plan summary + link to `/pricing` | None |
| 11 | Resources | Three latest `/resources` posts | Reveal |
| 12 | Final CTA band | Kinetic wave + water ripple, "Book a demo" / "Book a survey" | Interactive |
| 13 | Footer | Sitemap columns, contact, legal | Interactive wave on top edge |

---

## 9. Page-by-page implementation tasks

Each page uses the same template: **hero (eyebrow, H1, one-line value, primary + secondary CTA) → proof/content blocks → related links → CTA band → footer.** Content must be filled for every page before launch.

| Route | Purpose | Required content blocks |
|---|---|---|
| `/services` | Overview of survey types | Three service cards, comparison table (what is measured, when it is used, deliverable), CTA |
| `/services/bunker-delivery-survey` | Survey at delivery | Process timeline, what we record, documents produced, common discrepancy causes, FAQ |
| `/services/rob-survey` | Remaining on board | When it is required, procedure, report contents, FAQ |
| `/services/debunkering-survey` | Fuel removal | Procedure, risk points, report contents, FAQ |
| `/features` | Platform capabilities | Four feature sections linking to children |
| `/features/survey-register-dashboard` | Oversight | Filters, statuses, export, screenshot |
| `/features/calculation-audit` | Traceable maths | Calculation order, version history, who changed what |
| `/features/vessels-master-data` | Vessel and tank data | Tank tables, calibration data management |
| `/features/reports-ai` | Report generation | Templates, AI-assisted summary, review-before-issue flow |
| `/platform` | Web platform (app.pmspace.ai BQS module) | Architecture-in-one-picture, roles, workflow |
| `/mobile-app` | On-deck capture | Offline mode, cloud sync, screen gallery from the app redesign |
| `/how-we-measure` | Method transparency | Step-by-step method, formulas described in words, standards references `[TBC]` |
| `/why-independent` | Positioning | Argument page, scenario cards |
| `/who-its-for` | Segments | Surveyors, superintendents, bunker buyers, charterers |
| `/integrations-api` | Technical buyers | Integration list, API overview, example payload |
| `/security-audit` | Trust | Audit trail, access control, backups `[TBC]` |
| `/sample-report` | Proof | Interactive sample report with callouts |
| `/pricing` | Plans | Plan cards, comparison table, FAQ, "Talk to us" |
| `/demo` | Lead capture | Short form, expectation setting, ripple success state |
| `/partners` | Ecosystem | Partner types, enquiry form |
| `/customers` | Social proof | Logos and quotes `[TBC]`; hide section until real |
| `/changelog` | Momentum | Dated entries, filters |
| `/book-survey` | Service lead | Vessel, port, date window, contact |
| `/resources`, `/resources/[slug]` | Content hub | Cards, categories, article template (TOC, related posts) |
| `/about` | Company | Story, team `[TBC]`, relationship to pmspace |
| `/contact` | Contact | Form, email, regions `[TBC]` |

Scrolly effects stay on the home page only. Inner pages use `Reveal`, one `WaveDivider`, and `WeightText` on H1.

---

## 10. Copy guidelines (senior content writer notes)

- Lead with the outcome (proven quantity), then the mechanism.
- Short sentences. Verbs first: *Capture. Calculate. Prove.*
- Use surveyor vocabulary correctly and sparingly (sounding, ullage, trim, list, ROB, BDN). Explain once in a tooltip or glossary link, never in the hero.
- Never claim accuracy figures, certifications or regulatory approval unless confirmed. Use `[TBC]` until then.
- Avoid hype words (revolutionary, game-changing). The product is about trust; the tone is calm and exact.
- Every CTA says what happens next: *Book a demo*, *See a sample report*, *Request a survey*.

---

## 11. Accessibility

- `prefers-reduced-motion`: no canvas playback, no waves animating, no ripples, no weight animation; show static beat sections.
- All beat copy is real DOM text, readable without the canvas; canvas is `aria-hidden`.
- Colour contrast: body `--text-mid` on `--bg` is above 4.5:1; check `--text-low` is used only for non-essential text.
- Focus ring: 2px `--aqua`, offset 3px, visible on every interactive element.
- Keyboard: nav fully operable, skip link to main content, no scroll hijacking beyond Lenis smoothing (never block native scroll).

---

## 12. Performance targets

| Metric | Target |
|---|---|
| LCP (home, 4G mid-range phone) | under 2.5 s (still frame 1 as LCP) |
| INP | under 200 ms |
| CLS | under 0.05 |
| Hero sequence | 60 fps scrolling on a mid-range laptop; no main-thread blocking |
| JS (initial route) | under 180 KB gzip excluding the sequence |

Tactics: progressive frame loading, `ImageBitmap`, DPR cap 2, `content-visibility: auto` on below-fold sections, lazy-load wave canvases, pause everything off-screen, `will-change: transform` only on active beat elements.

---

## 13. SEO and analytics

- Server-render all copy. Each page: unique title, description, OG image, canonical, JSON-LD (`Organization`, `SoftwareApplication`, `FAQPage` where FAQs exist).
- Sitemap and `robots.txt` via the existing `sitemap.ts`.
- Events to track: `cta_click` (with location), `demo_submit`, `sample_report_view`, `scroll_beat_view` (one per beat), `book_survey_submit`.

---

## 14. Build plan and acceptance criteria

**Phase 1: Foundation (days 1–3)**
Next.js scaffold, tokens, fonts, Navbar, Footer, `Reveal`, Lenis. *Done when* the empty shell scores 95+ on Lighthouse mobile.

**Phase 2: Hero (days 4–9)**
Placeholder sequence (even a simple numbered-frame test render) to build `SequenceCanvas`, `Beat`, callouts, mobile variant, reduced-motion fallback. *Done when* scrolling is smooth with placeholders, beats fire at the right percentages, and swapping in the real frames needs no code change.

**Phase 3: Motion components (days 10–13)**
`WaveDivider` (liquid + kinetic), `WaterRipple`, `WeightText`. *Done when* each pauses off-screen and respects reduced motion.

**Phase 4: Home sections (days 14–18)**
Sections 1–13 from section 8 with real copy.

**Phase 5: Inner pages (days 19–28)**
Fill every route in section 9 with real content, templates, forms.

**Phase 6: QA and launch (days 29–32)**
Cross-browser (Safari iOS is the risky one for canvas and `backdrop-filter`), accessibility audit, performance pass, analytics, redirects.

**Global acceptance checklist**
- [ ] No visible frame edge at any viewport size or zoom level
- [ ] Hero works on iPhone Safari and low-end Android with the 60-frame set
- [ ] Every sitemap route has real content (or is hidden until it does)
- [ ] No unverified claims anywhere
- [ ] Reduced-motion and keyboard paths tested
- [ ] Performance targets in section 12 met

---

## 15. Alternative: build it in Framer instead

If you want to use the four marketplace components directly:

- Buy Liquid Wave Divider ($6) and Kinetic Wave Pro ($12); copy Font Weight Hover and Water Impact (free).
- Build the pinned image-sequence hero with a Framer code component (the canvas player above ports easily) or a scroll-linked video.
- Trade-off: faster to assemble, but harder to integrate with `app.pmspace.ai`, the existing Next.js sitemap and the `/resources/[slug]` content system. Recommended only if the marketing site will be fully separate from the product repo.

---

## 16. Open decisions

1. **Hero subject:** measurement chain (primary) or app exploded (fallback)?
2. **Who produces the 120 frames:** 3D artist, Blender/Cinema 4D in-house, or AI-assisted render plus clean-up?
3. **Brand name on the site:** "Space BQS", "pmspace BQS", or both (`Space BQS by pmspace`)?
4. **Proof assets:** are customer logos, quotes, standards references and security details available, or do we launch with those sections hidden?
5. **Primary conversion:** book a demo, book a survey, or both with equal weight?
6. **Languages:** English only at launch?
