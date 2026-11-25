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
    "slug": "what-is-bunker-quantity-survey",
    "title": "What is a bunker quantity survey?",
    "description": "Simple explanation for survey teams: what happens on board and what your clients receive.",
    "updated": "2026-10-15",
    "answer": "A bunker quantity survey is an independent check of how much fuel a ship received. Your surveyors measure tanks before and after delivery, correct for temperature and water in the system, and issue a locked report in tonnes your clients compare against the supplier's BDN.",
    "body": [
      "Your clients buy fuel far from the ship. The delivery happens while they are in an office. The supplier gives them a BDN receipt with a number. Your BQS gives them their own number from your team.",
      "On board your surveyor records vessel, port, date, inspector and BDN, then measures each tank: ullage or sounding in metres, temperature in Celsius, and free water in cubic metres.",
      "Back in the system each tank goes through the same steps: volume from the tank table, minus water, times a temperature correction factor, times density, divided by 1000 to get metric tonnes. The total is the custody transfer quantity.",
      "Your clients receive a PDF certificate and Excel breakdown. Once finalised it is locked and cannot be edited. If a reading is out of range it is flagged, never guessed.",
      "Independent verification protects buyers from aerated deliveries (cappuccino effect) and ensures custody handoffs comply with ISO 13739 and BIMCO standard terms."
    ],
    "faq": [
      {
        "q": "How long does a job take?",
        "a": "Depends on tanks and operations. The survey runs alongside normal delivery."
      },
      {
        "q": "Is quality tested?",
        "a": "No. Space BQS is quantity-only."
      },
      {
        "q": "What standards govern the survey?",
        "a": "ISO 13739:2020 commercial bunkering procedures, ASTM D1250 Table 54B petroleum measurement, and local port codes like Singapore SS 600."
      }
    ]
  },
  {
    "slug": "ullage-vs-sounding",
    "title": "Ullage vs sounding, simply",
    "description": "Two ways your surveyors read a tank level, and why the app accepts both.",
    "updated": "2026-10-15",
    "answer": "Ullage is the empty space from the top of the tank down to the fuel. Sounding is the fuel depth from the bottom up. Both point to the same volume in the tank table — your surveyors use whichever the ship's tables support.",
    "body": [
      "Think of a glass of liquid. Ullage measures from the top rim down to the liquid surface. Sounding measures from the base of the glass up to the liquid surface. Every ship tank calibration booklet is indexed by either sounding depth or ullage height.",
      "Sounding is traditional for double-bottom and wing tanks where steel sounding rods or weighted steel tapes drop through the sounding pipe down to the striker plate. The fuel level is read directly from the wet line (cut mark) on the graduated brass tape.",
      "Ullage is common for deep tanks, cargo holds, and fuel tanks with high liquid levels or vapor concerns. The tape is lowered until the brass bob touches the surface, and the reading is taken against the upper reference datum plate.",
      "Space BQS accepts both ullage and sounding inputs per tank. The calculation engine matches the input mode against that tank's digitized strapping table, automatically flagging discrepancies if an ullage reading is submitted for a table calibrated strictly in sounding depth.",
      "Trim and list corrections must always correspond to the measurement point. Shipyard tables specify whether corrections are added or subtracted based on whether sounding or ullage was taken."
    ],
    "faq": [
      {
        "q": "Which is more accurate?",
        "a": "Neither is inherently more accurate. Precision depends on using calibrated tapes, reading against the verified datum plate, taking three temperature levels, and applying the ship's specific calibration tables."
      },
      {
        "q": "What is the tank reference height?",
        "a": "The total certified vertical distance from the striker plate at the tank bottom to the upper rim of the sounding pipe. Verifying this height ensures the pipe has not been deformed or damaged."
      }
    ]
  },
  {
    "slug": "bdn-vs-actual",
    "title": "BDN says X, your team measured Y — what now?",
    "description": "What your surveyors hand clients when the supplier receipt and surveyed quantity differ.",
    "updated": "2026-10-15",
    "answer": "The BDN is the supplier's receipt. Your survey certificate is the independent check your clients forward. If they differ, share both with method, date and version, and let clients resolve commercially. The certificate is dated proof, not just an opinion.",
    "body": [
      "A Bunker Delivery Note (BDN) represents the barge or terminal's declared custody transfer figure. When the surveyor's post-delivery tank measurements indicate a shortfall, fast, methodical documentation is essential to preserve your client's commercial position.",
      "First, re-examine the core arithmetic: verify that opening and closing soundings were taken on all fuel and settling tanks, ensure identical metric tonne mass units on both sides, confirm the BDN receipt number, and verify that the delivery barge pipeline was blown down with compressed air.",
      "Second, examine the intermediate audit: inspect the ASTM D1250 Table 54B VCF factors applied, verify fuel density from the delivery note against observed tank temperatures, and confirm that free water bottoms were deducted before volume correction.",
      "Third, draft and issue an immediate Letter of Protest (LOP) before the delivery barge casts off if the discrepancy exceeds customary commercial tolerance (typically ±0.5%). State the measured figures clearly and invite the barge master to countersign.",
      "Finally, provide clients with the complete locked evidence packet: the tamper-evident PDF certificate for commercial executives, and the 4-sheet transparent Excel workbook for technical superintendents and claims analysts. Dated evidence backed by an immutable audit trail settles disputes far faster than late opinions."
    ],
    "faq": [
      {
        "q": "Does a difference prove a shortage?",
        "a": "It proves two numbers differ with methodology shown. Commercial contracts stipulate settlement terms, and a dated survey certificate provides the legal substantiation needed for claim recovery."
      },
      {
        "q": "What causes common BDN delivery discrepancies?",
        "a": "Frequent causes include aerated fuel delivery (cappuccino effect), temperature stratification in barge tanks, unrecorded pipeline displacement, or uncalibrated flow meters."
      }
    ]
  },
  {
    "slug": "temperature-correction-explained",
    "title": "Why temperature changes fuel quantity",
    "description": "Hot fuel expands. Clients pay for mass in tonnes, not hot litres. How your system corrects it.",
    "updated": "2026-10-15",
    "answer": "Fuel expands when hot and shrinks when cold. The system corrects every tank to standard volume with ASTM D1250 Table 54B using grade, density and temperature, then converts to mass. That is why two identical volumes at different temperatures give different tonnes.",
    "body": [
      "Marine fuels, particularly heavy fuel oil (HFO) and very low sulphur fuel oil (VLSFO), are heated on board to maintain pumpable viscosity, often between 40°C and 60°C. As fuel warms, its volumetric thermal expansion increases physical volume while its mass remains constant.",
      "Bunker contracts are priced and settled by mass (Metric Tonnes), not volumetric litres or cubic metres. Therefore, observed tank volumes must be mathematically normalized back to standard reference conditions at 15°C.",
      "The Space BQS engine performs this normalization using ASTM D1250 Table 54B (Generalized Products). For example, a heavy fuel with density 0.9500 kg/L measured at 40°C has a Volume Correction Factor around 0.9677. Over a 500-tonne delivery, that factor represents a commercial difference of more than 16 metric tonnes—amounting to over $10,000.",
      "The system displays the VCF per tank to four decimal places, computes the volume-weighted average factor for the entire survey, and alerts surveyors if a single degree of temperature measurement drift significantly impacts metric tonnage.",
      "Because heated tanks frequently experience thermal stratification, surveyors must take temperature readings across three levels (top, middle, bottom) and compute a representative average rather than relying on a single surface measurement."
    ],
    "faq": [
      {
        "q": "Do surveyors need to memorize Table 54B grids?",
        "a": "No. The system automatically executes bilinear interpolation across the official ASTM D1250 Table 54B grid using standard density at 15°C and observed temperature, displaying intermediate factors transparently."
      },
      {
        "q": "What happens if a temperature reading is out of range?",
        "a": "The engine enforces fail-safe validation: inputs beyond standard petroleum matrix bounds trigger an immediate error rather than generating speculative extrapolated numbers."
      }
    ]
  },
  {
    "slug": "rob-checklist",
    "title": "ROB at on-hire and off-hire: checklist for survey teams",
    "description": "What your teams prepare for a Remaining On Board job at charter start and end.",
    "updated": "2026-10-15",
    "answer": "ROB records all fuel on board at charter start and end. Your teams prepare vessel, port, date, access to all fuel tanks, and logbook figures for comparison. Each leg gets its own locked ROB certificate for your clients.",
    "body": [
      "An ROB (Remaining On Board) survey establishes the precise fuel inventory on board at delivery into or redelivery from a time charter. Because fuel costs represent the largest variable expense of a voyage, meticulous execution prevents costly charterparty disputes.",
      "Prior to boarding, confirm vessel schedule, berth access, and coordinate with the Chief Engineer. Ensure calibrated sounding tapes, water-finding paste, and certified digital thermometry are prepared.",
      "On board, conduct physical soundings across all fuel storage tanks, settling tanks, daily service tanks, and overflow compartments. Take liquid temperatures across multiple depths and test for bottom water using paste.",
      "Inspect the engine room daily sounding book and official logbooks. Record the ship's figures alongside independent surveyor measurements, noting any operational transfers in progress.",
      "Account for non-suction dead bottom stock and unpumpable sludge allowances as documented in the ship's calibration tables, ensuring usable commercial fuel is clearly segregated from unusable residues.",
      "Issue locked on-hire and off-hire certificates as paired independent records with cryptographic hashes. Consumption equals opening on-hire ROB plus bunkers received minus closing off-hire ROB per fuel grade."
    ],
    "faq": [
      {
        "q": "What if logbook and measured differ?",
        "a": "Both figures are transparently recorded on the survey certificate. The independent surveyor measurement represents the objective physical record, while logbook notes provide operational context."
      },
      {
        "q": "Why must daily service and settling tanks be sounded?",
        "a": "Excluding service or settling tanks can hide 10 to 40 metric tonnes of fuel, distorting redelivery settlement and speed/consumption warranties."
      }
    ]
  },
  {
    "slug": "bunker-shortage-claim-checklist",
    "title": "Bunker shortage claim checklist: what your teams attach",
    "description": "Steps when measured quantity is below the BDN, and which evidence clients send first.",
    "updated": "2026-10-15",
    "answer": "If measured quantity is below the BDN, your teams first recheck tanks, units and BDN number. Then clients send the locked PDF certificate plus Excel breakdown with method, date and version promptly to all parties. Dated evidence with audit trail settles faster than late claims.",
    "body": [
      "Recheck basics: same tanks included on both sides, metric tonnes on both, same delivery window, BDN number copied correctly.",
      "Open the audit: which strapping and VCF tables and revisions were used, any interpolated or flagged lines, water deducted, temperatures noted, engine version and calculation time.",
      "Hand clients a fast packet: PDF certificate for humans plus Excel for analysts, with survey number, vessel, port and date in the subject. Keep the register record searchable for later.",
      "Note what this proves: two numbers differ with method shown. Settlement stays commercial — evidence helps, and speed helps more.",
      "Include any signed Letters of Protest (LOP) countersigned by the barge master, as well as seal numbers and witness timestamps."
    ],
    "faq": [
      {
        "q": "How fast should I raise it?",
        "a": "As soon as the certificate is finalised. Same-day with evidence beats next-week without."
      },
      {
        "q": "What if the supplier disagrees?",
        "a": "Share method and audit, not just the total. Tables, temperatures and warnings are harder to argue with."
      },
      {
        "q": "Does the survey certificate serve as legal evidence in arbitration?",
        "a": "Yes. Cryptographically sealed certificates with per-line calculation provenance and surveyor signatures are standard submissions in LMAA and international maritime arbitration."
      }
    ]
  },
  {
    "slug": "glossary-10-terms",
    "title": "10 bunker terms in plain English",
    "description": "BDN, ROB, VCF, ullage, sounding, debunkering, MT and more — one line each for teams and clients.",
    "updated": "2026-10-15",
    "answer": "BDN is the supplier receipt. ROB is fuel left on board. VCF corrects volume for temperature. Ullage measures empty space from the top, sounding measures fuel depth from the bottom. MT is metric tonnes — what clients pay for.",
    "body": [
      "BDN (Bunker Delivery Note): the supplier's receipt for a delivery. Your certificate is the independent check against it.",
      "ROB (Remaining On Board): all fuel left in tanks at a moment — used at charter start and end.",
      "VCF (Volume Correction Factor): adjusts measured volume for temperature using standard tables.",
      "Ullage: empty space from tank top to fuel. Sounding: fuel depth from tank bottom. Both map to volume via the tank table.",
      "Debunkering: removing fuel from the vessel, measured before and after like a delivery in reverse.",
      "MT: metric tonnes of mass. Grades teams will see: VLSFO, HFO, MGO, LSMGO, ULSFO. Mass basis: in air or vacuum.",
      "Cappuccino Effect: aerated or frothy fuel pumped into tanks causing temporary volume inflation before settling.",
      "Striker Plate: reinforced steel plate at the bottom of a sounding pipe protecting the hull plate from tape weight impact.",
      "Water Finding Paste: chemically reactive paste applied to the bottom of a sounding tape that turns red in contact with free water."
    ],
    "faq": [
      {
        "q": "Where do I use these?",
        "a": "Every service and guide on this site links back here, so jargon never blocks you."
      }
    ]
  },
  {
    "slug": "on-off-hire-fuel-settlement",
    "title": "On/off-hire fuel settlement: the simple math",
    "description": "Opening ROB plus bunkered minus closing ROB per grade. What your clients keep.",
    "updated": "2026-10-15",
    "answer": "Fuel used during a charter equals opening ROB plus all bunkered minus closing ROB, tracked per grade. Your teams hand clients both locked ROB certificates plus every BDN and delivery certificate — that packet settles the bill.",
    "body": [
      "Charter voyage fuel accounting relies on a straightforward mass balance principle: Voyage Consumption = Opening ROB (On-Hire) + Total Bunkers Received − Closing ROB (Off-Hire). However, execution errors frequently generate multi-thousand-dollar settlement claims.",
      "Rule 1: Always calculate settlement separately per fuel grade. VLSFO 0.5%, LSMGO 0.1%, and high-sulphur heavy fuel have different densities, pricing, and consumption rates. Blending them into a single lump sum invalidates commercial accounting.",
      "Rule 2: Collect the complete custody documentation chain: the on-hire ROB certificate, every delivery certificate with supporting BDNs during the charter voyage, and the off-hire redelivery ROB certificate.",
      "Rule 3: Reconcile intermediate transfers and auxiliary generator consumption during off-hire waiting times or laydays. Discrepancies between logbook estimates and physical tank soundings must be recorded without retroactive adjustment.",
      "Disputes evaporate when the commercial packet is complete, dated, and tamper-evident: cryptographically sealed Space BQS certificates protect charterers and shipowners alike far better than post-voyage reconstructed spreadsheets."
    ],
    "faq": [
      {
        "q": "Can one ROB certificate cover both on-hire and off-hire?",
        "a": "No. On-hire and off-hire are legally distinct delivery events taking place at different ports and draft conditions. Each requires its own independent locked certificate."
      },
      {
        "q": "How are intermediate bunkerings during the charter voyage verified?",
        "a": "Every bunkering event during the charter period must include the supplier's signed BDN and independent bunker delivery survey certificate to prove actual received mass."
      }
    ]
  },
  {
    "slug": "standards-in-plain-English",
    "title": "Fuel standards in plain English (context only)",
    "description": "What ISO 8217, ISO 13739 and MARPOL Annex VI cover — and why the system stays quantity-only.",
    "updated": "2026-10-15",
    "answer": "ISO 8217 names fuel grades and quality limits. ISO 13739 covers how representative samples are drawn. MARPOL Annex VI governs sulphur and emissions sampling duties. Space BQS is quantity-only: surveyors measure how much through the system, not lab quality — this page is context, not certification.",
    "body": [
      "ISO 8217 is the grade catalogue teams see as VLSFO, HFO, MGO and friends, with quality limits a lab would test against.",
      "ISO 13739 describes drawing a representative sample during transfer — the sampling discipline behind quality disputes.",
      "MARPOL Annex VI sets sulphur and emissions duties, including keeping delivery samples on board.",
      "Space BQS does not run labs, draw quality samples for testing, or certify compliance. It records quantity with BDN cross-reference so quality providers and lawyers have clean inputs.",
      "ASTM D1250-04 governs petroleum measurement tables, providing the mathematical standard used by the Space BQS engine to convert temperature-expanded volumes to certified metric tonnes."
    ],
    "faq": [
      {
        "q": "Can quantity evidence help a quality dispute?",
        "a": "Only with quantity facts: what, when and how much was measured. Quality needs a lab."
      },
      {
        "q": "Why does Space BQS stay quantity-only?",
        "a": "Specialization ensures defensibility. Mixing laboratory quality testing with field quantity measurement creates conflicting responsibilities. Space BQS focuses exclusively on delivering unassailable quantity proof."
      }
    ]
  },
  {
    "slug": "cappuccino-effect-bunker-survey",
    "title": "Cappuccino Effect in Bunker Surveys: Detection & Protest Guide",
    "description": "How micro-aeration expands bunker volume, visual detection signs on deck, and issuing an unyielding Letter of Protest.",
    "updated": "2026-11-20",
    "answer": "The cappuccino effect occurs when compressed air is entrained into heavy fuel oil during pumping, causing micro-bubbles that temporarily inflate measured tank volume. When the froth settles over 24-48 hours, volume collapses, creating massive delivery deficits. Space BQS enforces density stabilization logging and auto-populates Letters of Protest (LOP).",
    "body": [
      "The 'cappuccino effect' is one of the most persistent and costly physical deceptions in marine fuel bunkering. By introducing compressed air into the delivery line—either through intentional air injection, aggressive line blowing, or running barge pumps dry—the viscous fuel oil traps micro-bubbles into a persistent foam emulsion.",
      "During post-delivery tank sounding, this aerated emulsion artificially elevates the liquid level. The surveyor's tape touches a liquid surface that appears to contain full fuel volume. However, the true mass of oil delivered is substantially lower because a significant percentage of the observed volume consists of trapped air bubbles.",
      "Within 24 to 48 hours of voyage departure, the entrained air gradually breaks free from the heavy oil and vents to atmosphere. The fuel level in the vessel's settling and storage tanks plummets, often leaving ship operators with apparent shortfalls ranging from 15 to over 80 metric tonnes.",
      "How to detect cappuccino fuel on deck: Look for continuous hissing or sputtering at the bunker manifold, irregular surging on line pressure gauges, frothy oil clinging to the sounding tape bob, and unexpected fuel temperature spikes (compressed air generates thermodynamic heat). Taking hydrometer density readings on deck can also reveal an apparent density lower than the BDN specification.",
      "When aeration is detected, the surveyor and chief engineer must immediately issue a formal Letter of Protest (LOP) before signing commercial receipts. Space BQS streamlines this with an automated LOP generator that timestamps evidence, attaches manifold pressure records, and marks certificates as 'Volume subject to aeration settling protest'."
    ],
    "faq": [
      {
        "q": "Can a Coriolis Mass Flow Meter (MFM) detect cappuccino fuel?",
        "a": "Yes. Modern Coriolis mass flow meters monitor drive gain and resonant frequency damping. When multi-phase aerated flow passes through the vibrating sensor tubes, drive gain spikes or triggers error alerts. However, severe aeration can still distort mass integration if meter security profiles are improperly configured."
      },
      {
        "q": "What should the Chief Engineer write on the Bunker Delivery Note (BDN) if cappuccino fuel is suspected?",
        "a": "The Chief Engineer should write: 'Delivered volume contains entrained air (cappuccino effect). Accepted for volume under protest. Subject to settling and re-measurement after 24 hours. Letter of Protest attached.'"
      },
      {
        "q": "How long does it take for aerated fuel to settle in ship fuel tanks?",
        "a": "Heavy fuel oil (VLSFO / HSFO) typically requires between 24 and 48 hours to fully de-aerate, depending on tank heating temperatures and fuel viscosity."
      }
    ]
  },
  {
    "slug": "singapore-ss600-bunker-surveying-standard",
    "title": "Singapore SS 600 & SS 648: Digital Standards for Bunkering",
    "description": "Deep dive into MPA Singapore's SS 600 bunker survey standard and mandatory SS 648 Mass Flow Meter (MFM) procedures.",
    "updated": "2026-11-20",
    "answer": "Singapore SS 600 governs the code of practice for marine bunker surveying, establishing standardized tank sounding, sampling, and custody handoff rules. SS 648 mandates Coriolis Mass Flow Metering (MFM) across all MPA-licensed bunker tankers, requiring strict meter seal verification, profile logging, and zero-drift custody accounting.",
    "body": [
      "The Maritime and Port Authority of Singapore (MPA) pioneered global bunkering governance by introducing the Singapore Standard SS 600 (Code of Practice for Bunker Surveying) and subsequently SS 648 (Code of Practice for Bunker Mass Flow Metering). Together, these standards have transformed Singapore into the world's most transparent and high-volume bunkering port.",
      "Under SS 600:2022, licensed bunker surveyors must follow strict operational sequences: pre-delivery barge and ship tank gauging, continuous composite drip sampling at the receiving ship manifold (in compliance with MARPOL Annex VI), and post-delivery soundings to establish custody transfer quantities.",
      "Under SS 648:2024, Coriolis Mass Flow Meters (MFMs) are mandatory for all bunker deliveries in Singapore waters. The standard eliminates traditional dip-and-sounding disputes between barge masters and chief engineers by measuring true mass flow directly in metric tonnes, independent of temperature expansion or fluid viscosity.",
      "However, SS 648 does NOT eliminate the need for independent BQS surveyors. Independent surveyors must verify that physical wire seals on MFM meter transmitters and bypass valves remain intact, ensure that zero-drift checks are executed, inspect the bunker barge for unauthorized tank connections, and take legally binding representative manifold samples.",
      "Space BQS natively integrates SS 600 inspection workflows and SS 648 MFM totalizer data fields directly into its offline mobile deck app. Surveyors capture meter ticket start/stop totals alongside vessel soundings, generating MPA-compliant audit evidence packs ready within 60 seconds."
    ],
    "faq": [
      {
        "q": "Why is an independent bunker survey still necessary under SS 648?",
        "a": "An independent surveyor verifies physical meter seal integrity, verifies that delivery pipelines are primed without air pocket pockets, monitors manifold pressure, draws certified MARPOL samples, and reconciles receiving vessel tank soundings against meter totalizers."
      },
      {
        "q": "What happens if there is a discrepancy between Singapore MFM readings and ship soundings?",
        "a": "Under MPA terms, the approved MFM reading is the primary commercial delivery figure unless physical meter tampering, seal breakage, or meter system error is documented. Space BQS produces side-by-side comparison sheets to clearly isolate line displacement from meter readings."
      },
      {
        "q": "Does Space BQS support Singapore MPA digital bunkering initiatives?",
        "a": "Yes. Space BQS produces locked, tamper-evident digital certificates and structured data payloads designed to interface with electronic bunker delivery note (e-BDN) workflows."
      }
    ]
  },
  {
    "slug": "mass-flow-meters-vs-tank-sounding",
    "title": "Mass Flow Meters vs Tank Sounding: Reconciling Discrepancies",
    "description": "Why Coriolis mass flow meters and manual dip soundings disagree, and how to prove custody quantities without disputes.",
    "updated": "2026-11-20",
    "answer": "Mass flow meters measure fluid mass directly through inertial Coriolis forces, whereas tank soundings measure liquid height and calculate mass via strapping tables, temperature corrections (VCF), and density in air. Common discrepancies arise from vessel trim errors, piping line packing, bottom sludge, or entrained air.",
    "body": [
      "In modern marine bunkering, chief engineers and surveyors frequently encounter differences between the bunker barge's Mass Flow Meter (MFM) totalizer readout and the receiving vessel's manual tank sounding calculations. Understanding why these discrepancies occur is essential for preventing costly charter disputes.",
      "A Coriolis MFM measures mass directly: fluid flowing through vibrating sensor tubes causes phase shifts proportional to true inertial mass flow rate. In contrast, tank sounding is an indirect volumetric calculation: tape height -> strapping table -> gross volume -> minus water -> times Table 54B VCF -> times (density - 0.0011).",
      "Discrepancy Source 1: Vessel Trim & List Corrections. Ship sounding tables are calibrated on an even keel. If the ship has a 2-meter stern trim and the surveyor applies approximate or non-linear corrections improperly, the calculated tank volume can deviate by 1% to 3% from true mass.",
      "Discrepancy Source 2: Bunker Line Pack and Piping Hold-Up. The ship's bunker delivery manifold and internal engine room transfer lines can hold between 1 and 6 metric tonnes of fuel. If lines were empty prior to bunkering and remain full upon completion, that volume is measured by the MFM but does not appear in the soundings of the storage tanks.",
      "Discrepancy Source 3: Temperature Stratification & Density Mismatch. If fuel in the vessel's deep double-bottom tanks is unheated and stratified, a single surface temperature reading will miscalculate the Volume Correction Factor (VCF). Space BQS eliminates these disputes by providing systematic line pack accounting, bilinear Table 54B interpolation, and transparent 4-sheet comparison workbooks."
    ],
    "faq": [
      {
        "q": "What is an acceptable discrepancy tolerance between MFM and ship soundings?",
        "a": "In commercial bunkering practice, a discrepancy of up to ±0.5% is widely recognized as standard measurement variance. Discrepancies exceeding 0.5% warrant investigation of line displacement, trim corrections, and density parameters."
      },
      {
        "q": "Can ship tank strapping tables be wrong?",
        "a": "Yes. Strapping tables reflect shipyard calculations when the vessel was built. Over years of service, structural modifications, hull deformations, and accumulated unpumpable tank bottom sludge can alter true tank volume."
      },
      {
        "q": "How does Space BQS resolve MFM vs sounding disagreements?",
        "a": "Space BQS provides a dual-input reconciliation matrix that compares MFM start/stop figures against vessel opening/closing soundings, factoring in line displacement and multi-depth temperature readings to pinpoint the exact root cause of any divergence."
      }
    ]
  }

];


export function getResource(slug: string) {
  return RESOURCES.find((r) => r.slug === slug);
}
