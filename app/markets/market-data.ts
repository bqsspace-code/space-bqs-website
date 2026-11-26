export type MarketSource = { label: string; url: string };

export type MarketPage = {
  slug: string;
  country: string;
  title: string;
  description: string;
  terminology: string;
  context: string[];
  workflow: string[];
  standardsNote: string;
  ports: string[];
  sources: MarketSource[];
  faqs: { q: string; a: string }[];
  publishable?: boolean;
  legalReviewRequired?: boolean;
};

/** Market pages are intentionally limited to locales with reviewed primary-source context. */
export const MARKETS: MarketPage[] = [
  {
    slug: "malaysia",
    country: "Malaysia",
    title: "Bunker Quantity Survey Software for Malaysia",
    description: "Space BQS software for marine survey firms in Malaysia. Record bunker survey work and connect port-specific approval processes with your existing procedures.",
    terminology: "The Marine Department Malaysia uses the term “bunkering” and publishes lists of vessels permitted to conduct bunkering activities by region.",
    context: [
      "Malaysia's Marine Department publishes regional lists of ships permitted to conduct bunkering activities. Port and vessel approvals remain separate from survey record software.",
      "For teams working around Port Klang and other Malaysian ports, confirm current port, vessel, and eBunkering procedures with the relevant authority. Space BQS does not submit permits or represent that it integrates with government systems."
    ],
    workflow: [
      "Capture the survey firm's bunker delivery, ROB, or debunkering records on mobile.",
      "Keep the applicable port procedure and measurement method with the team's operating instructions.",
      "Review survey inputs in the web platform and prepare the report outputs available in the current release."
    ],
    standardsNote: "The official source below concerns vessel authorization for bunkering, not a software certification. Confirm the current standard and port procedure with the Marine Department and relevant port authority.",
    ports: ["Port Klang", "Johor Port", "Port of Tanjung Pelepas"],
    sources: [
      { label: "Marine Department Malaysia: vessels permitted to conduct bunkering", url: "https://www.marine.gov.my/warga-awam/senarai-kapal-yang-dibenarkan-menjalankan-aktiviti-bunkering/" },
      { label: "Port Klang Authority", url: "https://www.pka.gov.my/index.php/en" },
      { label: "Port of Tanjung Pelepas", url: "https://www.ptp.com.my/" }
    ],
    faqs: [
      { q: "Does Space BQS obtain Malaysian bunkering approvals?", a: "No. The survey firm and vessel operators remain responsible for approvals and port procedures. Space BQS is survey software." },
      { q: "Can the software be used for work around Port Klang?", a: "The software supports bunker quantity survey workflows. Confirm the applicable Port Klang and vessel procedures with the relevant authority and your survey firm." }
    ]
  },
  {
    slug: "singapore",
    country: "Singapore",
    title: "Bunker Quantity Survey Software for Singapore",
    description: "Bunker quantity survey software for Singapore marine survey teams. Keep tank-gauging and mass-flow measurement records distinct in the survey workflow.",
    terminology: "The Maritime and Port Authority of Singapore (MPA) uses the terms “tank gauging”, “mass flow metering (MFM)”, and “Bunker Delivery Note (BDN)” in its bunkering guidance.",
    context: [
      "Singapore's MPA describes SS 600:2022 for bunkering by tank gauging and SS 648:2024 for mass-flow metering. The MPA page describes tank gauging in specified situations, including MFM failure and subject to its stated procedure.",
      "These are different measurement methods. Space BQS can support survey teams' record and review workflows; it does not replace an MFM system, authorize a method change, or claim MPA approval."
    ],
    workflow: [
      "Identify whether the survey record relates to tank gauging or an MFM-supported delivery.",
      "Record the BDN and survey inputs according to the applicable port procedure and contract.",
      "Review the survey calculations and report output with the survey firm's supervisor."
    ],
    standardsNote: "MPA lists SS 600:2022 and SS 648:2024 for distinct bunkering measurement methods. Their applicability depends on current MPA rules and the specific operation. ASTM D1250 is a separate volume-correction reference; confirm the production software's engine and table version.",
    ports: ["Port of Singapore"],
    sources: [
      { label: "MPA Singapore: Bunkering Standards", url: "https://www.mpa.gov.sg/port-marine-ops/marine-services/bunkering/bunkering-standards" },
      { label: "ASTM D1250-25 catalog entry", url: "https://store.astm.org/d1250-25.html" }
    ],
    faqs: [
      { q: "Does Space BQS replace Singapore's MFM or tank-gauging requirements?", a: "No. Space BQS is survey software. Use the measurement method and procedure required for the operation by the relevant authority and contract." },
      { q: "Does Space BQS have MPA certification?", a: "This website makes no claim of MPA certification or approval. Ask the product team for current product documentation." }
    ]
  },
  {
    slug: "india",
    country: "India",
    title: "Bunker Quantity Survey Software for India",
    description: "Space BQS bunker survey software for marine inspection teams in India. Record delivery, ROB, and debunkering survey workflows with review and report outputs.",
    terminology: "Cochin Port Authority uses “bunkering”, “bunker suppliers”, “barge operators”, and “Code of Practice for Supply of Bunkers” in its marine-services information.",
    context: [
      "Cochin Port Authority identifies bunkering as a marine service and provides links to its bunker-supply procedure and code of practice. Its public page also contains older standards references, so teams should verify current editions and notices directly before relying on them.",
      "For survey teams working around Cochin or other Indian ports, the relevant measurement method and required documentation may depend on port instructions, transfer equipment, and the contract. Space BQS does not provide survey attendance or port approvals."
    ],
    workflow: [
      "Record the survey location, delivery documents, fuel grade, and readings gathered by the attending survey firm.",
      "Keep the measurement method and applicable vessel reference data available for review.",
      "Use the web platform for survey review and the available PDF/Excel report workflow."
    ],
    standardsNote: "Cochin Port Authority links to a bunker-supply procedure and code of practice. Verify the latest versions with the port and relevant authority; do not infer that the product is certified or approved against them.",
    ports: ["Cochin Port", "Jawaharlal Nehru Port (Nhava Sheva)"],
    sources: [
      { label: "Cochin Port Authority: Bunkering", url: "https://cochinport.gov.in/bunkering" },
      { label: "Jawaharlal Nehru Port Authority", url: "https://www.jnport.gov.in/" },
      { label: "ASTM D1250-25 catalog entry", url: "https://store.astm.org/d1250-25.html" }
    ],
    faqs: [
      { q: "Does Space BQS provide bunker surveyors in India?", a: "No. Space BQS provides software; survey firms provide their own attendance and measurement services." },
      { q: "Which local bunker procedure should my team use?", a: "Confirm the current port procedure, required measurement method, and contract terms with the relevant port and survey organization." }
    ]
  },
  {
    slug: "uae",
    country: "United Arab Emirates",
    title: "Bunker Quantity Survey Software for the UAE",
    description: "Bunker quantity survey software for UAE marine survey firms. Review fuel survey workflows for Fujairah and other ports with your local procedures.",
    terminology: "Fujairah Ports Authority describes the Port of Fujairah as a major anchorage and bunkering hub. The page uses the term “bunkering”.",
    context: [
      "Fujairah Ports Authority describes its east-coast port, anchorage, and bunkering role. This is a port context, not evidence that Space BQS has an office, local customer, or port endorsement there.",
      "Survey teams in Fujairah and other UAE ports should confirm current port notices, terminal instructions, transfer method, and contract requirements with the relevant parties. Space BQS supports software workflows only."
    ],
    workflow: [
      "Choose the survey type and record the vessel and port context.",
      "Capture readings and the survey firm's chosen measurement references on mobile.",
      "Review the record in the web workflow and prepare the available PDF/Excel output."
    ],
    standardsNote: "The reviewed Fujairah Ports Authority source establishes port context, not a UAE-wide survey standard. Confirm applicable local requirements with the port, flag-state/port authority where relevant, and the contract. Verify the product's Table 54B edition with Space BQS.",
    ports: ["Port of Fujairah"],
    sources: [
      { label: "Fujairah Ports Authority", url: "https://www.fujairahport.ae/" },
      { label: "ASTM D1250-25 catalog entry", url: "https://store.astm.org/d1250-25.html" }
    ],
    faqs: [
      { q: "Does Space BQS operate in Fujairah or attend vessels?", a: "Space BQS is software and does not provide survey attendance. The website does not claim a Fujairah office." },
      { q: "Can a UAE team use the software for bunker survey records?", a: "The product supports bunker quantity survey workflows. Confirm deployment, local procedure, and your organization's requirements with the Space BQS team." }
    ]
  },
  {
    slug: "kuwait",
    publishable: false,
    legalReviewRequired: true,
    country: "Kuwait",
    title: "Bunker Quantity Survey Software for Kuwait",
    description: "Space BQS software for bunker quantity survey firms and marine inspection teams evaluating digital survey capture in Kuwait.",
    terminology: "The Kuwait Ports Authority publishes English-language port names including Shuwaikh, Shuaiba, and Doha Port. Current local bunker-survey terminology and procedures require confirmation with port users.",
    context: [
      "Kuwait Ports Authority identifies Shuwaikh as a main commercial port, Shuaiba as an industrial port, and Doha as a regional trade port. The reviewed public information does not specify a bunker quantity survey standard or a current bunkering process for each port.",
      "This page therefore avoids assigning a common procedure to all Kuwait ports. Survey firms should confirm current terminal notices, measurement scope, and contract requirements with the relevant local authority and counterparties."
    ],
    workflow: [
      "Capture the survey firm’s selected port and delivery or ROB scope.",
      "Record readings and supporting documents according to local instructions.",
      "Review the software workflow and report outputs with the product team before adoption."
    ],
    standardsNote: "No current Kuwait-specific bunker survey standard was verified from the public primary source reviewed for this page. ASTM D1250 is a global volume-correction reference, not a Kuwait port approval. Confirm applicable national rules, port notices, and contract terms before use.",
    ports: ["Shuwaikh Port", "Shuaiba Port", "Doha Port"],
    sources: [
      { label: "Kuwait Ports Authority", url: "https://www.kpa.gov.kw/" },
      { label: "ASTM D1250-25 catalog entry", url: "https://store.astm.org/d1250-25.html" }
    ],
    faqs: [
      { q: "Does Space BQS provide local survey attendance in Kuwait?", a: "No. Space BQS is software; survey firms perform attendance and measurements." },
      { q: "Which Kuwait port standard does Space BQS comply with?", a: "This website does not claim compliance with a Kuwait port standard. Confirm applicable procedures with the relevant authority and technical reviewer." }
    ]
  },
  {
    slug: "saudi-arabia",
    publishable: false,
    legalReviewRequired: true,
    country: "Saudi Arabia",
    title: "Bunker Quantity Survey Software for Saudi Arabia",
    description: "Bunker quantity survey software for Saudi marine survey and inspection teams. Capture records and review survey workflows with your port procedures.",
    terminology: "Saudi Ports Authority uses English-language terms such as “bunker station” in public port development announcements. Confirm current local usage with the relevant port and survey organization.",
    context: [
      "Saudi Press Agency reported an agreement in 2023 concerning an integrated bunker station at King Fahad Industrial Port in Yanbu. That announcement is historical context and does not verify current operating status.",
      "Teams should verify the current port, terminal, and transfer procedures before planning a survey workflow. Space BQS is software and does not provide vessel attendance or port services."
    ],
    workflow: [
      "Select the survey type and record port, vessel, and delivery references.",
      "Capture measurements made by the survey firm and retain applicable units and reference data.",
      "Review the survey record and available report outputs in the product demonstration."
    ],
    standardsNote: "The reviewed public source is a historical port-development announcement, not a current Saudi bunker survey standard. ASTM D1250 is a global volume-correction reference, not a Saudi port approval. Verify current requirements with Mawani, the port/terminal, and the survey firm's technical lead.",
    ports: ["King Fahad Industrial Port, Yanbu (development announcement; current service status to verify)"],
    sources: [
      { label: "Saudi Press Agency: Mawani bunker-station announcement (2023)", url: "https://www.spa.gov.sa/w1921246" },
      { label: "Mawani Saudi Ports Authority", url: "https://www.mawani.gov.sa/" },
      { label: "ASTM D1250-25 catalog entry", url: "https://store.astm.org/d1250-25.html" }
    ],
    faqs: [
      { q: "Does Space BQS have a Saudi office or conduct surveys?", a: "This website does not claim a Saudi office. Space BQS is software; local survey firms provide attendance." },
      { q: "Is the Yanbu bunker station currently operating?", a: "The source cited here is an announcement from 2023 and does not establish current operating status. Verify directly with the port authority." }
    ]
  },
  {
    slug: "norway",
    country: "Norway",
    title: "Bunker Quantity Survey Software for Norway",
    description: "Space BQS software for marine survey teams in Norway. Record bunkering and ROB survey data while keeping operational procedures with the vessel team.",
    terminology: "The Norwegian Maritime Authority uses “bunkering” and “internal transfer of fuel” in English-language safety information.",
    context: [
      "The Norwegian Maritime Authority's 2025 incident review describes fuel spills during bunkering and internal transfers and recommends vessel procedures, monitoring, communication, and spill-response readiness.",
      "These operational controls belong to the vessel and transfer parties. Survey software can help teams capture quantity-survey information but does not prevent spills, conduct transfer operations, or replace vessel procedures."
    ],
    workflow: [
      "Record the port, survey time, measurement scope, and source documents.",
      "Capture bunker delivery or ROB readings using the method agreed for that survey.",
      "Review the recorded information and report output; keep safety and pollution procedures separate."
    ],
    standardsNote: "The cited Norwegian Maritime Authority item is incident-prevention guidance, not a quantity-survey standard. Confirm applicable national rules, port instructions, and contracts with the relevant authority and vessel operator.",
    ports: ["Port of Oslo", "Port of Bergen"],
    sources: [
      { label: "Norwegian Maritime Authority: discharges during bunkering and internal fuel transfer", url: "https://www.sdir.no/en/lessons-learned/utslipp-under-bunkring-og-intern-transfer-av-drivstoff/" },
      { label: "Port of Oslo", url: "https://www.oslohavn.no/en/" },
      { label: "Port of Bergen", url: "https://www.bergenhavn.no/en/" }
    ],
    faqs: [
      { q: "Does Space BQS replace the vessel's bunkering procedures?", a: "No. Vessel and transfer safety procedures remain with the responsible operators. Space BQS is quantity-survey software." },
      { q: "Can Space BQS provide surveyors in Norway?", a: "No. The product is software for survey firms; it does not provide local attendance." }
    ]
  },
  {
    slug: "canada",
    country: "Canada",
    title: "Bunker Quantity Survey Software for Canada",
    description: "Bunker quantity survey software for Canadian marine inspection and survey teams. Review onboard records alongside applicable transfer and recordkeeping requirements.",
    terminology: "Canadian federal regulations use the terms “oil transfer operations”, “person in charge”, “declaration of inspection”, and “record-keeping”.",
    context: [
      "Canada's Vessel Pollution and Dangerous Chemicals Regulations include provisions for oil transfer operations and record-keeping. Applicability depends on the vessel, operation, and regulatory scope; software should not be represented as satisfying those obligations by itself.",
      "The Vancouver Fraser Port Authority describes the Port of Vancouver as a shared stewardship port with marine operations and procedures. Follow current port, vessel, and transfer instructions for each job."
    ],
    workflow: [
      "Record the measurement scope, time, port, fuel grade, and source documents identified by the survey firm.",
      "Keep transfer-operation paperwork and quantity-survey records distinct but cross-referenced where appropriate.",
      "Review survey inputs and report outputs with the survey supervisor."
    ],
    standardsNote: "The cited Canadian regulations concern vessel pollution and transfer operations; they are not a bunker-survey software certification. Check the current law and port instructions with the responsible operator or legal adviser.",
    ports: ["Port of Vancouver", "Port of Montréal"],
    sources: [
      { label: "Justice Laws Website: Vessel Pollution and Dangerous Chemicals Regulations (SOR/2012-69)", url: "https://laws-lois.justice.gc.ca/eng/regulations/SOR-2012-69/" },
      { label: "Vancouver Fraser Port Authority", url: "https://www.portvancouver.com/" }
    ],
    faqs: [
      { q: "Does Space BQS replace a Declaration of Inspection?", a: "No. Applicable transfer documents and responsibilities remain with the regulated vessel and facility parties." },
      { q: "Is Space BQS certified under Canadian maritime regulations?", a: "This website makes no certification claim. Ask the product team for current technical information and have your organization assess regulatory applicability." }
    ]
  },
  {
    slug: "usa",
    country: "United States",
    title: "Bunker Quantity Survey Software for the USA",
    description: "Space BQS bunker survey software for U.S. marine survey firms. Record quantity-survey inputs separately from Coast Guard transfer-operation requirements.",
    terminology: "The U.S. Coast Guard regulations use “oil and hazardous material transfer operations” and require a Declaration of Inspection in specified transfers.",
    context: [
      "U.S. 33 CFR Part 156 covers oil and hazardous material transfer operations. Its scope and exceptions depend on vessel and transfer circumstances; it is an operational regulation, not a bunker-survey software certification.",
      "The Port of Houston describes the Houston Ship Channel and its public terminals as a major part of its port operations. Local terminal and Coast Guard requirements should be checked for the actual transfer."
    ],
    workflow: [
      "Capture the survey's vessel, port, BDN, tank reading, and measurement context as provided by the survey team.",
      "Do not substitute a quantity-survey record for a required transfer declaration, operating procedure, or other regulatory document.",
      "Review the quantity comparison with the survey firm's supervisor and applicable commercial documentation."
    ],
    standardsNote: "33 CFR Part 156 covers specified oil/hazardous-material transfer operations. Determine applicability from the current regulation and responsible authorities; Space BQS does not certify or perform those operations.",
    ports: ["Port Houston / Houston Ship Channel"],
    sources: [
      { label: "eCFR: 33 CFR Part 156 — Oil and Hazardous Material Transfer Operations", url: "https://www.ecfr.gov/current/title-33/chapter-I/subchapter-O/part-156" },
      { label: "Port Houston", url: "https://porthouston.com/" }
    ],
    faqs: [
      { q: "Does Space BQS complete the Coast Guard Declaration of Inspection?", a: "No. Transfer documents and regulated duties remain with the people and organizations responsible for the transfer." },
      { q: "Does Space BQS provide U.S. survey attendance?", a: "No. Space BQS sells software; survey firms conduct attendance and measurements." }
    ]
  },
  {
    slug: "venezuela",
    publishable: false,
    country: "Venezuela",
    title: "Software para encuestas de cantidad de bunker en Venezuela",
    description: "Borrador informativo sobre Space BQS, software para registrar encuestas de cantidad de combustible marino. Publicación y contacto comercial pendientes de revisión legal.",
    terminology: "Bolipuertos utiliza el término “bunkering” en noticias en español sobre operaciones portuarias. La terminología preferida por encuestadores locales requiere revisión local.",
    context: [
      "Bolipuertos informó sobre actividades de bunkering en el Puerto de Guanta y menciona también La Guaira y Puerto Cabello en su información pública. Esa noticia portuaria no confirma disponibilidad de Space BQS ni una oficina local.",
      "Esta página se mantiene como borrador no indexable hasta completar revisión jurídica y comercial sobre prestación de software, pagos, soporte y elegibilidad de clientes para Venezuela."
    ],
    workflow: [
      "Borrador: describir captura móvil, revisión web y reportes usando terminología revisada por un especialista local.",
      "Borrador: validar las referencias portuarias y las normas vigentes con las autoridades y expertos locales.",
      "No publicar una llamada comercial ni activar leads para Venezuela antes de la aprobación jurídica."
    ],
    standardsNote: "Sin verificación de los requisitos de cumplimiento comercial y las normas portuarias vigentes para esta oferta. Esta página no está disponible para indexación ni generación de leads.",
    ports: ["Guanta", "La Guaira", "Puerto Cabello"],
    sources: [
      { label: "Bolipuertos (sitio oficial; noticias y contexto portuario)", url: "https://www.bolipuertos.gob.ve/" },
      { label: "U.S. Treasury OFAC: Venezuela-related sanctions", url: "https://ofac.treasury.gov/sanctions-programs-and-country-information/venezuela-related-sanctions" }
    ],
    faqs: [],
    legalReviewRequired: true
  }
];
