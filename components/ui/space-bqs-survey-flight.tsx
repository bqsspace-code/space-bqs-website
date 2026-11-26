"use client";

import CargoWmsFlight, { type CargoWmsChapter } from "./cargo-wms-flight";
import type { ScrollJourneyMedia } from "./use-cargo-wms-flight";

const MEDIA: ScrollJourneyMedia = {
  src: "/assets/videos/space-bqs-survey-journey.mp4",
  frameTimes: [1, 5, 9, 13],
  sceneStarts: [0, 3.75, 7.25, 10.75],
  posters: [1, 2, 3, 4].map(index => `/assets/videos/space-bqs-survey-0${index}.webp`),
};

const CHAPTERS: CargoWmsChapter[] = [
  { label: "Vessel", eyebrow: "01 / Vessel context", title: "Start With The Right Vessel.", description: "Choose the vessel or scan its QR code. Start the right survey with the tank register and reference data in context.", points: ["Vessel and tank context", "Delivery, ROB, or debunkering"], href: "/features/vessels-master-data", action: "Explore vessel master data" },
  { label: "Capture", eyebrow: "02 / On deck", title: "Capture Once. On Deck.", description: "Enter tank readings, temperature, and free water where the work happens. Offline capture supports field work without cellular coverage; confirm current offline-storage behavior with the team.", points: ["Offline-first mobile capture", "Sync when you reconnect"], href: "/mobile-app", action: "Explore the mobile app" },
  { label: "Calculate", eyebrow: "03 / Calculation context", title: "Follow Every Calculation.", description: "Keep the tank readings, water deductions, and temperature corrections with the calculated quantity. Review the working before field submission.", points: ["Tank-level calculation breakdown", "Inputs and factors stay together"], href: "/how-we-measure", action: "See how quantities are calculated" },
  { label: "Report", eyebrow: "04 / Office review", title: "Review. Finalise. Deliver.", description: "An authorised supervisor finalises the survey on the web. Product materials describe PDF and Excel report outputs.", points: ["Supervisor-controlled finalisation", "Readable proof with its working"], href: "/sample-report", action: "Explore the sample report" },
];

export default function SpaceBqsSurveyFlight() {
  return <CargoWmsFlight id="bqs-film-journey" className="bqs-survey-film" topOffset={96} enableSnap expandOnScroll distance={1500} media={MEDIA} chapters={CHAPTERS} brandLabel="SPACE / BQS" journeyLabel="Space BQS survey journey" />;
}
