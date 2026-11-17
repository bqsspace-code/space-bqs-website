# Space BQS solution page and survey film

## Placement

- Page: `/solutions/space-bqs`
- Section: `#survey-journey`
- Player: `#bqs-film-journey`
- Four chapters: Vessel → Capture → Calculate → Certify.

The solution page shares Cargo WMS's hero, wave transitions, section typography, glass surfaces, and expanding cinematic treatment. Its content, footage, chapter timing, and mobile posters are specific to bunker quantity surveying.

## Film provenance

This is a newly rendered editorial film, **not a newly generated text-to-video clip**. No connected text-to-video service was available.

1. Supplied `Drone_flying_over_oil_tanker_1080p_20261027163505.mp4` establishes vessel context.
2. Supplied `bqs-app-beingused.mp4` illustrates on-deck capture.
3. An original calculation graphic incorporates the supplied mobile calculation-breakdown capture, `WhatsApp Image 2026-10-09 at 11.09.07 PM (8).jpeg`.
4. An original certificate/workbook composition illustrates reviewed client proof.

The page identifies the film as illustrative and links to the actual app walkthrough. The document graphic is explicitly illustrative, rather than a purported issued certificate.

## Media output

- `public/assets/videos/space-bqs-survey-journey.mp4`
- Four `space-bqs-survey-01.webp` … `space-bqs-survey-04.webp` chapter posters.
- 14.5 seconds, 960×540, 60fps, silent H.264, fast-start MP4.
- All 870 frames are independently decodable keyframes for forward/reverse seeking.
- Final video is approximately 8.4 MB.
- Photographic footage is motion-interpolated from 24fps; graphics use native 60fps camera movement.
- Four 4-second scenes with 0.5-second crossfades; holding frames at 1s, 5s, 9s, and 13s.
- Content switches at edit midpoints: 0s, 3.75s, 7.25s, and 10.75s.

The media can be recreated with `node scripts/render-space-bqs-film.cjs`, using FFmpeg and the project's installed `sharp` package. The script does not overwrite existing outputs.

## Player integration

`space-bqs-survey-flight.tsx` supplies its own media definition, chapters, and labels to the existing player. Cargo WMS retains its default container film, chapter times, and continuous-shot behavior.

For the cut-based BQS film, chapter navigation lands directly on holding frames instead of visibly scrolling through unrelated chapters. Scroll-driven traversal still advances/reverses the film. Small screens and reduced-motion preferences use the BQS posters and chapter controls.

## Validation

- Production build and TypeScript checks passed.
- All chapter buttons settle on the intended chapter and holding frame.
- Forward/reverse navigation, real wheel input, and manual controls verified.
- Mobile layout, still-image fallback, reduced motion, image loading, and key links verified.
- Existing Cargo WMS film and chapter behavior regression-checked.
- No browser errors observed in the final checks.
