export type Resource = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  answer: string;
  body: string[];
  faq: { q: string; a: string }[];
};

export const RESOURCES: Resource[] = [
  {
    slug: "what-is-bunker-quantity-survey",
    title: "What is a bunker quantity survey?",
    description: "Simple explanation for survey teams: what happens on board and what your clients receive.",
    updated: "2026-10-15",
    answer:
      "A bunker quantity survey is an independent check of how much fuel a ship received. Your surveyors measure tanks before and after delivery, correct for temperature and water in the system, and issue a locked report in tonnes your clients compare against the supplier's BDN.",
    body: [
      "Your clients buy fuel far from the ship. The delivery happens while they are in an office. The supplier gives them a BDN receipt with a number. Your BQS gives them their own number from your team.",
      "On board your surveyor records vessel, port, date, inspector and BDN, then measures each tank: ullage or sounding in metres, temperature in Celsius, and free water in cubic metres.",
      "Back in the system each tank goes through the same steps: volume from the tank table, minus water, times a temperature correction factor, times density, divided by 1000 to get metric tonnes. The total is the custody transfer quantity.",
      "Your clients receive a PDF certificate and Excel breakdown. Once finalised it is locked and cannot be edited. If a reading is out of range it is flagged, never guessed.",
    ],
    faq: [
      { q: "How long does a job take?", a: "Depends on tanks and operations. The survey runs alongside normal delivery." },
      { q: "Is quality tested?", a: "No. Space BQS is quantity-only." },
    ],
  },
  {
    slug: "ullage-vs-sounding",
    title: "Ullage vs sounding, simply",
    description: "Two ways your surveyors read a tank level, and why the app accepts both.",
    updated: "2026-10-15",
    answer:
      "Ullage is the empty space from the top of the tank down to the fuel. Sounding is the fuel depth from the bottom up. Both point to the same volume in the tank table — your surveyors use whichever the ship's tables support.",
    body: [
      "Think of a glass of water. Ullage measures from the rim down. Sounding measures from the base up. Ships have calibration tables indexed by one of them.",
      "Space BQS forms accept either per tank. The engine looks up the matching table and never mixes them. If the mode and table disagree, it warns.",
      "Your surveyors choose on deck based on the ship. Clients reading the report do not need to choose.",
    ],
    faq: [{ q: "Which is more accurate?", a: "Neither in general — accuracy comes from the right table, careful reading and temperature." }],
  },
  {
    slug: "bdn-vs-actual",
    title: "BDN says X, your team measured Y — what now?",
    description: "What your surveyors hand clients when the supplier receipt and surveyed quantity differ.",
    updated: "2026-10-15",
    answer:
      "The BDN is the supplier's receipt. Your survey certificate is the independent check your clients forward. If they differ, share both with method, date and version, and let clients resolve commercially. The certificate is dated proof, not just an opinion.",
    body: [
      "First, your team checks the basics: same tanks included, same units in metric tonnes, same delivery window, BDN number recorded correctly.",
      "Second, open the audit: which tank tables and correction versions were used, any interpolated or flagged lines, water deducted, temperature noted.",
      "Third, hand clients the PDF + Excel promptly. The faster a shortage is raised with evidence, the easier it is for them to resolve.",
    ],
    faq: [{ q: "Does a difference prove a shortage?", a: "It proves two numbers differ with method shown. Settlement is commercial — evidence helps." }],
  },
  {
    slug: "temperature-correction-explained",
    title: "Why temperature changes fuel quantity",
    description: "Hot fuel expands. Clients pay for mass in tonnes, not hot litres. How your system corrects it.",
    updated: "2026-10-15",
    answer:
      "Fuel expands when hot and shrinks when cold. The system corrects every tank to standard volume with ASTM D1250 Table 54B using grade, density and temperature, then converts to mass. That is why two identical volumes at different temperatures give different tonnes.",
    body: [
      "Example from engine checks: density 0.9500 at 40C gives a correction factor around 0.9677. Small factor, big money over hundreds of tonnes.",
      "The system shows the factor per tank to 4 decimals and the weighted average for the survey, plus a sensitivity note of how much MT moves per degree.",
      "Heated grades like VLSFO/HFO are often measured warm. That is normal — correction makes it fair.",
    ],
    faq: [{ q: "Do surveyors need to understand the tables?", a: "Only which grade maps where. The system picks the right table; teams read the result and audit trail." }],
  },
  {
    slug: "rob-checklist",
    title: "ROB at on-hire and off-hire: checklist for survey teams",
    description: "What your teams prepare for a Remaining On Board job at charter start and end.",
    updated: "2026-10-15",
    answer:
      "ROB records all fuel on board at charter start and end. Your teams prepare vessel, port, date, access to all fuel tanks, and logbook figures for comparison. Each leg gets its own locked ROB certificate for your clients.",
    body: [
      "Run on-hire and off-hire as separate jobs in the app. Confirm vessel access early with your scheduler.",
      "On board, all fuel tanks are measured with temperature and water, same as a delivery — just at a charter moment instead.",
      "Hand clients both certificates with bunker receipts. Consumption equals opening ROB plus bunkered minus closing ROB, adjusted for grade.",
    ],
    faq: [{ q: "What if logbook and measured differ?", a: "Both are recorded. Measured is independent; logbook is the ship's record. Differences are noted, not hidden." }],
  },
  {
    slug: "bunker-shortage-claim-checklist",
    title: "Bunker shortage claim checklist: what your teams attach",
    description: "Steps when measured quantity is below the BDN, and which evidence clients send first.",
    updated: "2026-10-15",
    answer:
      "If measured quantity is below the BDN, your teams first recheck tanks, units and BDN number. Then clients send the locked PDF certificate plus Excel breakdown with method, date and version promptly to all parties. Dated evidence with audit trail settles faster than late claims.",
    body: [
      "Recheck basics: same tanks included on both sides, metric tonnes on both, same delivery window, BDN number copied correctly.",
      "Open the audit: which strapping and VCF tables and revisions were used, any interpolated or flagged lines, water deducted, temperatures noted, engine version and calculation time.",
      "Hand clients a fast packet: PDF certificate for humans plus Excel for analysts, with survey number, vessel, port and date in the subject. Keep the register record searchable for later.",
      "Note what this proves: two numbers differ with method shown. Settlement stays commercial — evidence helps, and speed helps more.",
    ],
    faq: [
      { q: "How fast should I raise it?", a: "As soon as the certificate is finalised. Same-day with evidence beats next-week without." },
      { q: "What if the supplier disagrees?", a: "Share method and audit, not just the total. Tables, temperatures and warnings are harder to argue with." },
    ],
  },
  {
    slug: "glossary-10-terms",
    title: "10 bunker terms in plain English",
    description: "BDN, ROB, VCF, ullage, sounding, debunkering, MT and more — one line each for teams and clients.",
    updated: "2026-10-15",
    answer:
      "BDN is the supplier receipt. ROB is fuel left on board. VCF corrects volume for temperature. Ullage measures empty space from the top, sounding measures fuel depth from the bottom. MT is metric tonnes — what clients pay for.",
    body: [
      "BDN (Bunker Delivery Note): the supplier's receipt for a delivery. Your certificate is the independent check against it.",
      "ROB (Remaining On Board): all fuel left in tanks at a moment — used at charter start and end.",
      "VCF (Volume Correction Factor): adjusts measured volume for temperature using standard tables.",
      "Ullage: empty space from tank top to fuel. Sounding: fuel depth from tank bottom. Both map to volume via the tank table.",
      "Debunkering: removing fuel from the vessel, measured before and after like a delivery in reverse.",
      "MT: metric tonnes of mass. Grades teams will see: VLSFO, HFO, MGO, LSMGO, ULSFO. Mass basis: in air or vacuum.",
    ],
    faq: [{ q: "Where do I use these?", a: "Every service and guide on this site links back here, so jargon never blocks you." }],
  },
  {
    slug: "on-off-hire-fuel-settlement",
    title: "On/off-hire fuel settlement: the simple math",
    description: "Opening ROB plus bunkered minus closing ROB per grade. What your clients keep.",
    updated: "2026-10-15",
    answer:
      "Fuel used during a charter equals opening ROB plus all bunkered minus closing ROB, tracked per grade. Your teams hand clients both locked ROB certificates plus every BDN and delivery certificate — that packet settles the bill.",
    body: [
      "Collect three things per charter: on-hire ROB certificate, every delivery certificate with BDNs during the charter, and the off-hire ROB certificate.",
      "Do the math per grade, not blended: VLSFO, HFO, MGO each have their own opening, bunkered and closing.",
      "If logbook and measured differ at either end, record both. Measured is independent; logbook is the ship's record.",
      "Disputes shrink when the packet is complete and dated: certificates beat reconstructed spreadsheets.",
    ],
    faq: [{ q: "Can one ROB cover both ends?", a: "No. Run on-hire and off-hire as separate jobs so each moment has its own locked record." }],
  },
  {
    slug: "standards-in-plain-English",
    title: "Fuel standards in plain English (context only)",
    description: "What ISO 8217, ISO 13739 and MARPOL Annex VI cover — and why the system stays quantity-only.",
    updated: "2026-10-15",
    answer:
      "ISO 8217 names fuel grades and quality limits. ISO 13739 covers how representative samples are drawn. MARPOL Annex VI governs sulphur and emissions sampling duties. Space BQS is quantity-only: surveyors measure how much through the system, not lab quality — this page is context, not certification.",
    body: [
      "ISO 8217 is the grade catalogue teams see as VLSFO, HFO, MGO and friends, with quality limits a lab would test against.",
      "ISO 13739 describes drawing a representative sample during transfer — the sampling discipline behind quality disputes.",
      "MARPOL Annex VI sets sulphur and emissions duties, including keeping delivery samples on board.",
      "Space BQS does not run labs, draw quality samples for testing, or certify compliance. It records quantity with BDN cross-reference so quality providers and lawyers have clean inputs.",
    ],
    faq: [{ q: "Can quantity evidence help a quality dispute?", a: "Only with quantity facts: what, when and how much was measured. Quality needs a lab." }],
  },
];

export function getResource(slug: string) {
  return RESOURCES.find((r) => r.slug === slug);
}
