export type FlightVariant = "home" | "cargo-wms" | "solutions";

export interface FlightChapter {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  href: string;
  action: string;
}

export const FRAME_TIMES = [.7, 3.5, 6.6, 9.4];
export const FRAME_POSTERS = FRAME_TIMES.map((_, index) => `/assets/videos/container-flight-0${index + 1}.webp`);
export const FLIGHT_TOP = 168;

export const FLIGHT_VARIANTS: Record<FlightVariant, {
  letter: string; name: string; placement: string; title: string; description: string; distance: number; route: string; note: string; chapters: FlightChapter[];
}> = {
  home: {
    letter: "A", name: "Homepage rollout", placement: "Homepage / Solutions & implementation", route: "/#section-rollout", distance: 900,
    title: "A rollout that fits your operation.",
    description: "A compact alternative to the homepage’s horizontal rollout showcase. The three offerings arrive as the camera travels from containers to open water.",
    note: "Homepage placement: replaces the rollout showcase rather than adding another section.",
    chapters: [
      { label: "Your records", eyebrow: "01 / Data migration", title: "Bring the records. Keep the context.", description: "Map your source files, trial the import, and reconcile with your team before the final move.", points: ["Agreed field mapping", "Trial import & reconciliation"], href: "/services/data-migration", action: "Plan your migration" },
      { label: "Your foundation", eyebrow: "02 / Deployment", title: "Choose the right foundation.", description: "Public cloud, private cloud, or on-premises. Scope the environment around your infrastructure and operational needs.", points: ["Your infrastructure requirements", "An agreed deployment plan"], href: "/services/deployment", action: "Compare deployments" },
      { label: "Your operation", eyebrow: "03 / Cargo WMS", title: "Connect the cargo operation.", description: "A separately scoped warehouse implementation for manifests, locations, tariffs, and controlled release.", points: ["Cargo and location visibility", "Approvals before release"], href: "/solutions/cargo-wms", action: "Explore Cargo WMS" },
      { label: "Next horizon", eyebrow: "04 / Start with a conversation", title: "A clear next step.", description: "Bring your current workflow and the outcome you need. We’ll scope the right solution and rollout with you.", points: ["Requirements first", "A practical implementation plan"], href: "/request-demo", action: "Let’s scope your rollout" },
    ],
  },
  "cargo-wms": {
    letter: "B", name: "Cargo WMS journey", placement: "Cargo WMS / Operational journey", route: "/solutions/cargo-wms", distance: 1350,
    title: "From expected cargo to controlled release.",
    description: "The full storytelling version: arrival, operational control, and authorised release. Six workflow steps become three chapters and a clear final handoff.",
    note: "Proposed Cargo WMS workflow. Modules, rules, integrations, and delivery are agreed during discovery. Footage is illustrative.",
    chapters: [
      { label: "Arrival", eyebrow: "01 / Plan + receive", title: "Know what’s coming.", description: "Register the manifest before arrival. Receive against the expected cargo, record exceptions, and organise destuffing.", points: ["Expected versus arrived cargo", "Receipt and destuffing records"], href: "/request-demo", action: "Discuss your inbound workflow" },
      { label: "Control", eyebrow: "02 / Locate + calculate", title: "Keep the operation in view.", description: "Connect cargo locations and movement history with the tariff version, period, and inputs behind each charge.", points: ["Locations and movement history", "Traceable charges and tariff rules"], href: "/request-demo", action: "Scope your operational controls" },
      { label: "Release", eyebrow: "03 / Approve + hand over", title: "Release with confidence.", description: "Make payment, document, and approval requirements clear before handover. Close the movement with the right records.", points: ["Agreed release approval gates", "Handover documents and reports"], href: "/request-demo", action: "Plan your release workflow" },
      { label: "Your workflow", eyebrow: "04 / Custom implementation", title: "Your operation. Connected.", description: "Turn the journey into an agreed scope: modules, permissions, reports, integrations, and acceptance criteria.", points: ["Discovery and workflow mapping", "Test, train, launch, and hand over"], href: "/request-demo", action: "Discuss your WMS requirements" },
    ],
  },
  solutions: {
    letter: "C", name: "Solutions overview", placement: "Solutions / Choose your operational path", route: "/solutions", distance: 720,
    title: "Purpose-built workflows. Connected records.",
    description: "A shorter editorial treatment. The container corridor introduces Cargo WMS, the ship’s deck introduces Space BQS, and open water leads to the next step.",
    note: "Two distinct offerings: Space BQS for bunker quantity surveying; Cargo WMS as a separately scoped implementation.",
    chapters: [
      { label: "Cargo WMS", eyebrow: "01 / Cargo operations", title: "Cargo. Under control.", description: "A custom implementation for manifests, cargo locations, tariffs, approvals, and controlled release.", points: ["Warehouse operations", "Custom implementation"], href: "/solutions/cargo-wms", action: "Explore Cargo WMS" },
      { label: "Space BQS", eyebrow: "02 / Bunker quantity surveying", title: "Every reading. Connected.", description: "Capture offline on deck, calculate quantities, review in the office, and issue locked proof through Space BQS.", points: ["Mobile app + web platform", "Delivery / ROB / Debunkering"], href: "/solutions/space-bqs", action: "Explore Space BQS" },
      { label: "Implementation", eyebrow: "03 / Make the move", title: "A practical way forward.", description: "Prepare the records and the environment. Plan migration and deployment around the solution your team needs.", points: ["Data migration", "Deployment planning"], href: "/services", action: "Explore implementation services" },
      { label: "Find your fit", eyebrow: "04 / Choose your path", title: "Built around your operation.", description: "Start with the workflow. We’ll help you identify the appropriate product or implementation scope.", points: ["Clear product boundaries", "Requirements-led scoping"], href: "/request-demo", action: "Find the right fit" },
    ],
  },
};

export const FLIGHT_KEYS = Object.keys(FLIGHT_VARIANTS) as FlightVariant[];
export function isFlightVariant(value: string): value is FlightVariant { return FLIGHT_KEYS.includes(value as FlightVariant); }
