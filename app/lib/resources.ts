export type Resource = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  answer: string;
  body: string[];
  sections?: { heading: string; body: string[] }[];
  sources?: { label: string; url: string }[];
  related?: { label: string; href: string }[];
  faq: { q: string; a: string }[];
};

export const RESOURCES: Resource[] = [
  {
    "slug": "what-is-bunker-quantity-survey",
    "title": "What is a bunker quantity survey?",
    "description": "Simple explanation for survey teams: what happens on board and what your clients receive.",
    "updated": "2026-11-23",
    "answer": "A bunker quantity survey records how much fuel is measured on a vessel during a delivery or at a specified point in a voyage. Survey teams record tank readings and relevant inputs, then compare the resulting quantity with delivery documents under the applicable contract and procedure.",
    "body": [],
    "sections": [
      { "heading": "How a bunker quantity survey works", "body": [
        "A bunker quantity survey is performed by a marine survey team. Space BQS provides software for recording survey information and supporting calculation and report workflows; it does not send surveyors to vessels.",
        "The survey team records vessel and delivery details, tank soundings or ullages, temperature, free water where measured, fuel grade, density, and the supplier's Bunker Delivery Note (BDN). The applicable process depends on the contract, port procedure, and measurement method used.",
        "A software workflow can organize the readings, apply configured calculation inputs, support supervisor review, and prepare PDF or Excel report outputs. The report documents its inputs; it does not itself decide contractual liability or prove fuel quality."
      ] },
      { "heading": "Where Space BQS fits", "body": [
        "Space BQS supports bunker delivery, Remaining On Board (ROB), and debunkering workflows for survey firms. The mobile app supports field capture, while the web platform supports review and report workflows.",
        "The sample report and calculation-method pages provide additional detail about product outputs and calculation inputs."
      ] }
    ],
    "related": [
      { "label": "View the sample bunker survey report", "href": "/sample-report" },
      { "label": "Read how the calculation workflow works", "href": "/how-we-measure" }
    ],
    "faq": [
      {
        "q": "How long does a job take?",
        "a": "Timing depends on the vessel, access, number of tanks, and the applicable survey procedure. Space BQS supplies software; the survey firm performs the attendance."
      },
      {
        "q": "Is quality tested?",
        "a": "No. Space BQS is software for bunker quantity survey workflows. Fuel quality testing is a separate service."
      },
      {
        "q": "Which procedure or standard applies?",
        "a": "That depends on the port, transfer method, contract, and current applicable standard. Confirm requirements with the relevant authority and technical reviewer; the software is not a certification of compliance."
      }
    ],
    "sources": [
      { "label": "ASTM D1250-25 catalog entry (current edition listing)", "url": "https://store.astm.org/d1250-25.html" },
      { "label": "Singapore MPA bunkering standards (SS 600:2022 and SS 648:2024 information)", "url": "https://www.mpa.gov.sg/port-marine-ops/marine-services/bunkering/bunkering-standards" }
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
        "a": "Neither method is universally more accurate. Follow the vessel's calibration tables and applicable survey procedure, and record the measurement method used."
      },
      {
        "q": "What is the tank reference height?",
        "a": "Reference height is a vessel tank-table datum. Use the value and definition supplied with the applicable calibration information; this article does not replace that vessel documentation."
      }
    ]
  },
  {
    "slug": "bdn-vs-actual",
    "title": "BDN says X, your team measured Y — what now?",
    "description": "What your surveyors hand clients when the supplier receipt and surveyed quantity differ.",
    "updated": "2026-11-23",
    "answer": "A Bunker Delivery Note records the supplier's declared delivery quantity. A survey firm's measurement record is a separate source that can be compared with the BDN using matching units, periods, tanks, and mass basis.",
    "body": [
      "Check that the survey and BDN refer to the same delivery period, fuel grade, tanks, units, and mass basis before comparing totals.",
      "Review the inputs used for the survey calculation, including tank readings, density, temperature, free water where measured, and the applicable vessel reference data.",
      "Record the difference and supporting details. Whether a notice is required, when it must be sent, and who should receive it depend on the contract and local process.",
      "Space BQS provides software for survey firms to capture and review quantity-survey information. The software does not determine the cause of a difference or give legal advice."
    ],
    "faq": [
      {
        "q": "Does a difference prove a shortage?",
        "a": "No. It shows that the compared figures differ under the inputs provided. Check scope, units, timing, and applicable contractual terms before drawing conclusions."
      },
      {
        "q": "What causes common BDN delivery discrepancies?",
        "a": "Potential factors depend on the transfer and measurement method. Review the survey scope and inputs with the responsible technical team."
      }
    ],
    "related": [
      { "label": "Bunker delivery workflow software", "href": "/services/bunker-delivery-survey" },
      { "label": "Compare declared and measured mass", "href": "/tools/bdn-discrepancy" },
      { "label": "View the illustrative report layout", "href": "/sample-report" }
    ]
  },
  {
    "slug": "temperature-correction-explained",
    "title": "Why temperature changes fuel quantity",
    "description": "Learn how temperature-based volume correction factors fit into bunker quantity calculations and which inputs affect the result.",
    "updated": "2026-11-23",
    "answer": "A volume correction factor (VCF) is used by applicable petroleum measurement methods to relate observed volume to a base-temperature volume. The factor depends on the method, product classification, reference density, observed temperature, and units used.",
    "body": [],
    "sections": [
      { "heading": "What a volume correction factor does", "body": [
        "Liquid petroleum volume varies with temperature. A VCF is applied as part of a defined method to adjust observed volume to specified base conditions before converting volume to mass.",
        "Do not use a generic example factor in place of a licensed table or the method specified by the applicable contract and survey procedure."
      ] },
      { "heading": "Check the method and reference data", "body": [
        "ASTM lists D1250-25 as the active guide for API/ASTM temperature and pressure volume correction factors. The applicable adjunct, table, edition, commodity group, base condition, and product implementation must be verified for the survey.",
        "Space BQS product materials refer to Table 54B. Confirm the production engine version and table source with the product team; this educational page does not reproduce the standard or establish standards compliance."
      ] },
      { "heading": "Inputs and review", "body": [
        "Typical inputs include observed volume, temperature, reference density, units, and vessel tank calibration data. Survey teams should retain the source values and review the resulting calculation before completing a record."
      ] }
    ],
    "sources": [
      { "label": "ASTM D1250-25 catalog entry", "url": "https://store.astm.org/d1250-25.html" }
    ],
    "related": [
      { "label": "Read the calculation-method guide", "href": "/how-we-measure" },
      { "label": "Try the supplied-factor volume-to-mass worksheet", "href": "/tools/volume-to-mass" },
      { "label": "Review calculation inputs", "href": "/features/calculation-audit" }
    ],
    "faq": [
      {
        "q": "Does this guide reproduce Table 54B?",
        "a": "No. ASTM standards and associated adjuncts are licensed publications. Consult the current authorized edition and confirm which version applies to the survey."
      },
      {
        "q": "Which exact table edition does Space BQS use?",
        "a": "Confirm the engine and table version for the product release used by your organization in current product documentation or with the Space BQS team."
      }
    ]
  },
  {
    "slug": "rob-checklist",
    "title": "ROB at on-hire and off-hire: checklist for survey teams",
    "description": "Prepare a Remaining On Board (ROB) survey record for a charter start or end, with a clear period and fuel-grade scope.",
    "updated": "2026-11-23",
    "answer": "A Remaining On Board (ROB) survey records fuel quantities at a defined point, such as a charter start or end. To reconcile a period, teams compare opening and closing ROB with bunkers received and other recorded movements, using consistent fuel grades, units, and time boundaries.",
    "body": [],
    "sections": [
      { "heading": "Define the period and scope", "body": [
        "Record the vessel, date and time, port, survey type, fuel grades, and tanks included. The survey firm determines access, measurement scope, and the procedure applicable to its assignment.",
        "Keep opening and closing records distinct when they occur at different charter milestones. Record transfers and deliveries that fall within the period being reconciled."
      ] },
      { "heading": "Reconcile the fuel movements", "body": [
        "A basic balance for one fuel grade is opening ROB plus receipts, minus transfers out and closing ROB. The calculation is only meaningful when the input figures share the same period, unit, and mass basis.",
        "The balance does not verify the physical measurements or determine contractual settlement. Review the original survey records and the applicable charter terms."
      ] },
      { "heading": "Where survey software fits", "body": [
        "Space BQS provides software for marine survey firms to capture survey information, support review, and prepare report outputs. The survey firm performs attendance and measurements."
      ] }
    ],
    "faq": [
      {
        "q": "What if logbook and measured differ?",
        "a": "Record the source and scope of each figure. Compare units, period, tanks, and measurement method before interpreting a difference."
      },
      {
        "q": "Which tanks should be included?",
        "a": "The applicable survey scope and procedure determine which tanks are included. Document the tanks measured and any exclusions in the survey record."
      }
    ],
    "related": [
      { "label": "ROB survey workflow software", "href": "/services/rob-survey" },
      { "label": "ROB balance worksheet", "href": "/tools/rob-balance" },
      { "label": "ROB and on/off-hire settlement math", "href": "/resources/on-off-hire-fuel-settlement" }
    ]
  },
  {
    "slug": "bunker-shortage-claim-checklist",
    "title": "Bunker shortage claim checklist: what your teams attach",
    "description": "A neutral checklist for comparing measured bunker quantity with a supplier BDN and organizing the survey record.",
    "updated": "2026-11-23",
    "answer": "When a measured bunker quantity differs from the supplier BDN, first confirm the survey scope, period, units, fuel grade, and mass basis. Then review the readings and calculation inputs. Follow the contract and local procedures for any notice or commercial action.",
    "body": [],
    "sections": [
      { "heading": "Check the comparison", "body": [
        "Confirm that the BDN and survey refer to the same delivery, fuel grade, units, mass basis, tanks, and time period. Note any differences in scope before comparing totals.",
        "Verify the BDN identifier and the vessel and port particulars recorded for the survey. A transcription or period mismatch can make otherwise correct figures incomparable."
      ] },
      { "heading": "Review survey inputs", "body": [
        "Check the recorded tank readings, reference data, temperature, density, free water where measured, and volume-correction method. Keep the method and source versions with the report when the product provides them.",
        "A difference identifies a discrepancy between figures; it does not establish the cause, responsibility, or legal outcome."
      ] },
      { "heading": "Follow the relevant procedure", "body": [
        "Contract terms and port procedures determine whether a notice is needed, the recipient, and any deadline. Consult the responsible survey manager or legal/commercial adviser for case-specific action.",
        "Space BQS is software for survey teams to record and review information. It does not provide legal advice or perform survey attendance."
      ] }
    ],
    "faq": [
      {
        "q": "How quickly should a discrepancy be raised?",
        "a": "Follow the timing and notice requirements in the applicable contract and port procedure. This guide is not legal advice."
      },
      {
        "q": "What if the supplier disagrees?",
        "a": "Keep the compared figures, units, survey scope, and calculation inputs together, and follow the commercial process agreed by the parties."
      }
    ],
    "related": [
      { "label": "Bunker delivery workflow", "href": "/services/bunker-delivery-survey" },
      { "label": "BDN discrepancy worksheet", "href": "/tools/bdn-discrepancy" },
      { "label": "Calculation methodology", "href": "/how-we-measure" }
    ]
  },
  {
    "slug": "glossary-10-terms",
    "title": "Bunker Quantity Survey Terms in Plain English",
    "description": "Plain-English definitions for common bunker quantity survey abbreviations and tank measurement terms.",
    "updated": "2026-11-23",
    "answer": "BDN means Bunker Delivery Note, ROB means Remaining On Board, and VCF means Volume Correction Factor. Ullage measures the space above liquid; sounding measures liquid depth from a reference point. MT means metric tonne.",
    "body": [
      "BDN (Bunker Delivery Note): the supplier's receipt for a delivery. Your certificate is the independent check against it.",
      "ROB (Remaining On Board): all fuel left in tanks at a moment — used at charter start and end.",
      "VCF (Volume Correction Factor): adjusts measured volume for temperature using standard tables.",
      "Ullage: empty space from tank top to fuel. Sounding: fuel depth from tank bottom. Both map to volume via the tank table.",
      "Debunkering: removing fuel from the vessel, measured before and after like a delivery in reverse.",
      "MT (metric tonne): a unit of mass. Fuel grades and reporting conventions depend on the product and applicable contract.",
      "Cappuccino Effect: aerated or frothy fuel pumped into tanks causing temporary volume inflation before settling.",
      "Striker plate: a reference surface at the lower end of a sounding pipe, as described in the vessel's measurement documentation.",
      "Water-finding paste: a product applied according to its instructions to help identify a water interface."
    ],
    "faq": [
      {
        "q": "Where do I use these?",
        "a": "Every service and guide on this site links back here, so jargon never blocks you."
      }
    ],
    "related": [
      { "label": "Explore bunker survey workflows", "href": "/services" },
      { "label": "Read the calculation-method guide", "href": "/how-we-measure" }
    ]
  },
  {
    "slug": "on-off-hire-fuel-settlement",
    "title": "On/off-hire fuel settlement: the simple math",
    "description": "Understand the fuel balance between opening and closing ROB, receipts, and other recorded movements.",
    "updated": "2026-11-23",
    "answer": "A basic fuel-consumption balance is opening ROB plus receipts, minus transfers out and closing ROB. Calculate per fuel grade and for a defined period, using consistent units and mass basis. Contractual settlement terms determine how the result is applied.",
    "body": [],
    "sections": [
      { "heading": "The balance relationship", "body": [
        "For a defined period and one fuel grade: consumption balance = opening ROB + receipts − transfers out − closing ROB. Include other movements that affect the chosen scope and document the source for each value.",
        "This arithmetic reconciles inputs; it does not verify the measurements or determine contractual settlement."
      ] },
      { "heading": "Keep records comparable", "body": [
        "Use the same fuel grade, units, mass basis, time period, and scope for the opening, receipts, transfers, and closing figures. Keep on-hire and off-hire survey records distinct when they refer to different times or locations.",
        "Space BQS provides software for survey firms to record bunker quantity survey work and prepare report outputs. The survey firm performs attendance and measurements."
      ] }
    ],
    "faq": [
      {
        "q": "Can one ROB certificate cover both on-hire and off-hire?",
        "a": "They refer to different points in time. Keeping the records separate helps preserve the survey scope and inputs for each point."
      },
      {
        "q": "How are intermediate bunkerings during the charter voyage verified?",
        "a": "Record receipts that fall within the period and scope being reconciled. The applicable contract and survey process determine which supporting documents are required."
      }
    ],
    "related": [
      { "label": "ROB survey checklist", "href": "/resources/rob-checklist" },
      { "label": "ROB balance worksheet", "href": "/tools/rob-balance" },
      { "label": "Compare ROB and delivery surveys", "href": "/resources/rob-vs-bunker-delivery-survey" }
    ]
  },
  {
    "slug": "standards-in-plain-English",
    "title": "Bunkering standards and quantity measurement: context",
    "description": "A sourced overview of selected bunkering standards and how their measurement approaches differ from survey software.",
    "updated": "2026-11-23",
    "answer": "Bunkering requirements depend on the port, contract, and measurement method. In Singapore, MPA lists SS 600:2022 for tank gauging and SS 648:2024 for mass-flow metering. ASTM D1250 is a separate guide family for volume correction factors; listing a standard does not certify software compliance.",
    "body": [],
    "sections": [
      { "heading": "Tank gauging and mass-flow metering are distinct", "body": [
        "Singapore MPA's current bunkering standards page describes SS 600:2022 for tank gauging and SS 648:2024 for mass-flow metering. The authority describes tank gauging for specified circumstances, including MFM system failure, subject to its stated procedures.",
        "These standards concern different measurement approaches. A software workflow should not be described as replacing a required measurement method or as receiving port-authority approval unless that is explicitly documented."
      ] },
      { "heading": "Volume correction reference", "body": [
        "ASTM lists D1250-25 as the active guide for API/ASTM temperature and pressure volume correction factors. The applicable adjunct, table, edition, and implementation must be confirmed for a particular calculation.",
        "Space BQS product materials refer to Table 54B. Confirm the exact production implementation and version with the product team. This page does not reproduce ASTM material or determine regulatory compliance."
      ] },
      { "heading": "Quantity and fuel quality are separate scopes", "body": [
        "Space BQS is bunker quantity survey software. It does not perform laboratory fuel-quality testing. Follow the applicable authority and contract documentation for sampling, quality analysis, and other obligations."
      ] }
    ],
    "sources": [
      { "label": "ASTM D1250-25 catalog entry", "url": "https://store.astm.org/d1250-25.html" },
      { "label": "Singapore MPA bunkering standards", "url": "https://www.mpa.gov.sg/port-marine-ops/marine-services/bunkering/bunkering-standards" }
    ],
    "faq": [
      {
        "q": "Can quantity evidence help a quality dispute?",
        "a": "Only with quantity facts: what, when and how much was measured. Quality needs a lab."
      },
      {
        "q": "Why does Space BQS stay quantity-only?",
        "a": "Space BQS is designed for bunker quantity survey workflows. Fuel-quality testing and laboratory analysis are separate functions."
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
  },
  {
    "slug": "rob-vs-bunker-delivery-survey",
    "title": "ROB Survey vs Bunker Delivery Survey",
    "description": "Understand the different questions answered by an onboard ROB record and a bunker delivery survey.",
    "updated": "2026-11-23",
    "answer": "A bunker delivery survey records a fuel transfer and compares pre- and post-delivery measurements with delivery information. A Remaining On Board (ROB) survey records fuel quantities at a defined point, such as charter start or end. They have different scopes and should be recorded as distinct survey events.",
    "body": [],
    "sections": [
      { "heading": "Bunker delivery survey", "body": [
        "A delivery survey concerns a bunkering transfer. A survey firm defines the tank scope, collects before-and-after readings under its procedure, and records the supplier Bunker Delivery Note (BDN) for comparison.",
        "In Singapore, MPA describes SS 600:2022 tank gauging in specified circumstances and SS 648:2024 mass-flow metering. Follow current port procedures; a software workflow does not replace either measurement method."
      ] },
      { "heading": "Remaining On Board survey", "body": [
        "An ROB survey records fuel in scope at a point in time. Common business contexts include charter start and end, but the applicable contract and survey instructions define the work.",
        "To reconcile a period, teams compare opening ROB, bunker receipts, other movements, and closing ROB using consistent units, mass basis, fuel grades, and period boundaries."
      ] },
      { "heading": "What the software supports", "body": [
        "Space BQS provides bunker quantity survey software for marine survey teams. It supports mobile capture, web review, and PDF/Excel report workflows; it does not send surveyors to vessels or decide contractual outcomes."
      ] }
    ],
    "faq": [
      { "q": "Can one record represent both an ROB survey and a bunker delivery?", "a": "They describe different survey scopes. Keep the event type and its readings, period, and supporting documents clear in the survey record." },
      { "q": "Does a delivery-versus-BDN difference prove a shortage?", "a": "No. Confirm the compared scope, units, timing, and inputs, then follow the applicable contract and port procedure." }
    ],
    "sources": [
      { "label": "Singapore MPA bunkering standards", "url": "https://www.mpa.gov.sg/port-marine-ops/marine-services/bunkering/bunkering-standards" }
    ],
    "related": [
      { "label": "Bunker delivery workflow software", "href": "/services/bunker-delivery-survey" },
      { "label": "ROB survey workflow software", "href": "/services/rob-survey" },
      { "label": "ROB balance worksheet", "href": "/tools/rob-balance" }
    ]
  },
  {
    "slug": "reduce-spreadsheet-errors-in-bunker-surveys",
    "title": "How to Reduce Spreadsheet Errors in Bunker Surveys",
    "description": "A review checklist for controlling inputs, formulas, reference data, and survey report handoffs.",
    "updated": "2026-11-23",
    "answer": "Reduce spreadsheet risk by separating entered measurements from calculated outputs, validating units and ranges, controlling formula and reference-table versions, reviewing totals, and preserving each final record with its source inputs. These controls can help teams find mistakes; no tool guarantees every survey is error-free.",
    "body": [],
    "sections": [
      { "heading": "Separate source readings from calculations", "body": [
        "Keep original readings, units, timestamps, fuel grade, and source documents identifiable. Avoid overwriting readings with derived values or converting units without recording the transformation.",
        "For volume-to-mass arithmetic, identify the observed volume, any water deduction, the correction factor, density, base condition, and final unit. Confirm reference values with the applicable survey procedure."
      ] },
      { "heading": "Control formulas and reference data", "body": [
        "Keep dated, reviewed copies of workbooks and record which vessel tank and correction references were used. Validate required fields, review formula changes, and flag missing or out-of-range inputs rather than silently substituting values.",
        "Test workbook changes against known examples and arrange an independent review of representative calculations. A spreadsheet check does not replace the applicable standard or qualified survey review."
      ] },
      { "heading": "Make review and handoff traceable", "body": [
        "Compare totals back to line items, record who reviewed the result, and preserve the issued version with its inputs and supporting documents. Document corrections rather than silently overwriting a prior report.",
        "Space BQS provides software for survey firms to capture, review, and report survey information. See the calculation-method guide and illustrative report layout for the current website examples."
      ] }
    ],
    "faq": [
      { "q": "Can spreadsheet checks guarantee a calculation is correct?", "a": "No. Validation and review can catch some data and formula errors, but accuracy still depends on correct readings, reference data, assumptions, and competent review." },
      { "q": "What should be kept with a calculation?", "a": "Retain source readings, units, reference data and versions, calculation steps, reviewer information, and the report issued for the survey." }
    ],
    "related": [
      { "label": "Explore the calculation review feature", "href": "/features/calculation-audit" },
      { "label": "Read how the calculation workflow works", "href": "/how-we-measure" },
      { "label": "View the illustrative report layout", "href": "/sample-report" }
    ]
  },
  {
    "slug": "what-a-bunker-survey-report-contains",
    "title": "What a Bunker Survey Report Contains",
    "description": "A guide to survey particulars, readings, calculation context, and report outputs teams may document.",
    "updated": "2026-11-23",
    "answer": "A bunker quantity survey report commonly identifies the vessel, port, time, survey scope, fuel grade, BDN reference, readings, calculation inputs, result, and relevant remarks. Required fields and formats depend on the survey firm's process, contract, and port procedure.",
    "body": [],
    "sections": [
      { "heading": "Survey particulars and scope", "body": [
        "A report should make clear which vessel and delivery it describes, when and where the survey took place, which tanks and fuel grades were included, and which documents were cross-referenced. Include only particulars collected and checked by the survey team."
      ] },
      { "heading": "Measurements and calculation context", "body": [
        "A report may present tank readings, measurement mode, units, temperature, free-water input where measured, reference data, correction factor, density, and calculated quantities. Identify the method and versions used where the workflow retains them.",
        "A result should be understandable from its inputs and stated assumptions. Record flags or exceptions rather than filling missing values with guesses."
      ] },
      { "heading": "Report outputs and limits", "body": [
        "Space BQS supports PDF and Excel report workflows. The sample page on this site is an illustrative layout using fictional data, not a customer survey or issued certificate.",
        "A quantity report documents measurement information. It does not establish fuel quality, decide a commercial claim, or guarantee legal admissibility."
      ] }
    ],
    "faq": [
      { "q": "Is the report example on this site a real survey?", "a": "No. The current web preview is labeled as an illustrative layout using fictional example data." },
      { "q": "Does a bunker survey report certify fuel quality?", "a": "No. Space BQS is quantity-survey software; laboratory fuel-quality analysis is outside its stated product scope." }
    ],
    "related": [
      { "label": "View the illustrative report layout", "href": "/sample-report" },
      { "label": "Explore survey report workflows", "href": "/features/reports-ai" },
      { "label": "Request a product demo", "href": "/request-demo" }
    ]
  }
];


export function getResource(slug: string) {
  return RESOURCES.find((r) => r.slug === slug);
}