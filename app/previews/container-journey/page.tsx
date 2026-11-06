import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Film } from "lucide-react";
import { FLIGHT_KEYS, FLIGHT_VARIANTS, FRAME_POSTERS } from "./variants";

export default function FlightComparisonPage() {
  return <div className="flight-preview-hub">
    <header className="flight-preview-heading">
      <p className="flight-preview-kicker"><Film className="h-4 w-4" aria-hidden="true" />One film. Three directions.</p>
      <h1>Find the right home<br />for the journey.</h1>
      <p>Compare the same container-to-ocean footage in three working page concepts. Scroll through each one, stop to read, and reverse to revisit. Use the switcher above to try the next option.</p>
    </header>
    <div className="flight-preview-grid">{FLIGHT_KEYS.map((key, index) => {
      const config = FLIGHT_VARIANTS[key];
      return <Link key={key} href={`/previews/container-journey/${key}`} className="flight-preview-card">
        <div className="flight-preview-thumbnail"><Image src={FRAME_POSTERS[index]} alt={index === 2 ? "Ship deck opening toward the ocean" : "Camera view through stacked shipping containers"} fill sizes="(min-width: 1024px) 380px, 90vw" className="object-cover" /><span>OPTION {config.letter}</span></div>
        <div className="flight-preview-card-copy"><h2>{config.name}<ArrowUpRight className="h-5 w-5" aria-hidden="true" /></h2><p>{config.description}</p><span>{key === "home" ? "Compact glass panel / Short chapter sequence" : key === "cargo-wms" ? "Immersive workflow / Strongest content fit" : "Editorial typography / Shortest sequence"}</span></div>
      </Link>;
    })}</div>
    <div className="flight-preview-guide"><h2>What to compare</h2><p>Does the footage clarify the content? Is there enough time to read? Does the scroll length feel justified? On mobile, or with reduced motion enabled, use the chapter buttons to compare the static layouts.</p><p>Once you’ve chosen A, B, or C, that version can take the corresponding section’s place. These are preview routes, so your choice can stay reversible.</p></div>
  </div>;
}
