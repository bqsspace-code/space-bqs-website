export interface PortSurveyChallenge {
  title: string;
  description: string;
}

export interface PortFaq {
  q: string;
  a: string;
}

export interface BunkerPort {
  slug: string;
  name: string;
  city: string;
  country: string;
  region: string;
  coordinates: { lat: number; lng: number };
  annualBunkerVolume: string;
  rank: string;
  regulatoryBody: string;
  primaryStandards: string[];
  keyFuelGrades: string[];
  headline: string;
  summary: string;
  surveyOverview: string;
  localProcedures: string[];
  challenges: PortSurveyChallenge[];
  softwareAdvantage: string[];
  faqs: PortFaq[];
}

export const BUNKER_PORTS: Record<string, BunkerPort> = {
  singapore: {
    slug: "singapore",
    name: "Port of Singapore",
    city: "Singapore",
    country: "Singapore",
    region: "Southeast Asia",
    coordinates: { lat: 1.29027, lng: 103.851959 },
    annualBunkerVolume: "54+ Million MT (World's #1)",
    rank: "1st Globally",
    regulatoryBody: "Maritime and Port Authority of Singapore (MPA)",
    primaryStandards: ["SS 600:2022 (Bunker Surveying)", "SS 648:2024 (MFM Bunkering)", "SS 660 (LNG Bunkering)", "ISO 8217:2024"],
    keyFuelGrades: ["VLSFO 0.50% S (380 cSt)", "LSMGO 0.10% S", "HSFO 380 cSt (with scrubber)", "B24 Biofuel Blend", "Methanol (Pilot)"],
    headline: "BQS Software for Singapore Anchorage & Terminal Bunkering Operations",
    summary: "Singapore is the world's leading bunkering hub, handling over 54 million metric tonnes annually. Surveys require strict compliance with MPA guidelines, SS 600, and mandatory SS 648 Coriolis Mass Flow Meter (MFM) cross-checks.",
    surveyOverview: "In Singapore's high-turnaround anchorages (Eastern, Western, and Raffles Petroleum Anchorages), bunker surveyors face rigorous MPA compliance checks. While Coriolis Mass Flow Meter (MFM) systems are mandatory for bunker tankers, independent bunker quantity surveys (BQS) remain crucial for verifying bunker barge seal integrity, zero meter drift, profile logging, and cross-comparing receiver tank soundings with MFM totalizer delivery logs.",
    localProcedures: [
      "Pre-delivery barge and receiving vessel tank sounding and ullage measurement using calibrated gauging tapes.",
      "MPA-approved MFM system seal verification and inspection of flow meters, transmitter housings, and ancillary bypass pipework.",
      "Continuous temperature monitoring across delivery to detect aeration, high-viscosity thermal stratification, or artificial expansion.",
      "Triplicate 5-liter composite manifold drip sampling in adherence to MARPOL Annex VI, SS 600, and commercial custody split.",
      "Post-bunkering mass reconciliation between barge opening/closing figures, MFM totalizer printouts, and receiving ship strapping tables."
    ],
    challenges: [
      {
        title: "Cappuccino Fuel & Aeration Entrainment",
        description: "Compressed air injection during barge stripping or turbulent high-rate pumping causes micro-aeration in heavy fuel oil, creating temporary volumetric froth that collapses over 24-48 hours. Space BQS enforces free water and density stabilization tracking to flag aerated fuel volumes."
      },
      {
        title: "MFM Totalizer vs Tank Sounding Discrepancies",
        description: "Differences between Coriolis mass flow meter readings and vessel manual strapping calculations often arise from trim, heel, or vessel-specific piping hold-up. Space BQS produces side-by-side reconciliation sheets isolating line displacement from meter readouts."
      },
      {
        title: "72-Hour Offshore Anchorages Zero-Connectivity",
        description: "Surveyors working at Raffles or Eastern Boarding Ground frequently lose cellular connection during rough swell. Space BQS provides offline cryptographic caching so surveyors calculate ASTM Table 54B metric tonnes on deck without internet access."
      }
    ],
    softwareAdvantage: [
      "MPA SS 600 and SS 648 checklist automation directly in the field mobile app.",
      "Deterministic ASTM D1250 Table 54B calculation engine eliminates manual interpolation disputes between barge master and chief engineer.",
      "Locked PDF certificates and 4-sheet transparent Excel evidence packs ready within 60 seconds of post-delivery soundings.",
      "Built-in Letter of Protest (LOP) generator pre-populated with certified discrepancies and timestamped evidence."
    ],
    faqs: [
      {
        q: "Do I still need a BQS survey in Singapore if Mass Flow Meters (MFM) are mandatory?",
        a: "Yes. While MPA mandates MFMs on all licensed bunker tankers, independent BQS ensures the physical pipework seals are intact, verifies line displacement before and after delivery, confirms temperature/density parameters, takes legally valid MARPOL manifold samples, and resolves discrepancies between the barge's meter and the receiving ship's tank strapping tables."
      },
      {
        q: "Does Space BQS support SS 648 MFM data fields?",
        a: "Yes. Space BQS captures MFM totalizer starting and ending register counts, meter temperature, pressure drop, and sealing certificate IDs alongside traditional physical tank sounding measurements for full auditability."
      },
      {
        q: "How does Space BQS handle high-ambient temperature soundings in Singapore?",
        a: "Fuel oil at tropical Singapore anchorages is often heated to 45°C - 60°C. Space BQS applies exact ASTM D1250-04 Table 54B Volume Correction Factors (VCF) with bilinear interpolation down to 0.05°C increments, preventing temperature-induced volume distortion."
      }
    ]
  },
  rotterdam: {
    slug: "rotterdam",
    name: "Port of Rotterdam",
    city: "Rotterdam",
    country: "Netherlands",
    region: "Northwest Europe (ARA)",
    coordinates: { lat: 51.92442, lng: 4.477733 },
    annualBunkerVolume: "10+ Million MT (Europe's #1)",
    rank: "Largest in Europe",
    regulatoryBody: "Port of Rotterdam Authority & Port of Antwerp-Bruges",
    primaryStandards: ["Bunker Licensing Scheme 2024", "ISO 8217:2024", "NEN-EN-ISO 17025", "Coriolis MFM Mandate (Phased ARA)"],
    keyFuelGrades: ["VLSFO 0.50% S", "ULSFO 0.10% S (SECA Compliant)", "Bio-Bunkers (B30, B100)", "LNG / Bio-LNG", "Methanol"],
    headline: "BQS Inspection Software for Rotterdam & ARA Bunkering Operations",
    summary: "The Port of Rotterdam is Europe's premier bunkering hub within the North Sea Emission Control Area (SECA). Space BQS simplifies complex multi-grade biofuel blends, ULSFO density verification, and ARA bunker licensing compliance.",
    surveyOverview: "Operating across the Maasvlakte, Europoort, and Waalhaven basins, bunker surveying in the Amsterdam-Rotterdam-Antwerp (ARA) range demands strict adherence to EU emissions regulations, sulfur limits, and evolving bunker licensing mandates. The prevalence of drop-in biofuel blends (FAME, HVO) requires precise reference density corrections and high-precision Table 54B VCF calculations.",
    localProcedures: [
      "Barge custody transfer inspection under Rotterdam Port Authority bunkering license protocols.",
      "Pre-transfer tank gauging of high-density fuel oil and bio-blend storage tanks.",
      "Continuous temperature and density verification for ULSFO / VLSFO fuel grade changes.",
      "Strict EU SECA sulfur compliance sampling and seal custody chain documentation.",
      "Reconciliation of delivered mass against barge loading terminal meter delivery receipts."
    ],
    challenges: [
      {
        title: "Biofuel Blend Density & VCF Variations",
        description: "Drop-in marine biofuels (B20 to B100) have non-standard thermal expansion characteristics that deviate from pure mineral hydrocarbons. Space BQS adapts density-at-15°C and VCF lookup tables for approved marine bio-feedstocks."
      },
      {
        title: "Severe Weather and Cold-Water Tank Stratification",
        description: "North Sea winter temperatures create significant vertical temperature gradients between the cold double-bottom tanks and heated top layers. Space BQS supports multi-depth temperature logging for accurate average tank calculations."
      },
      {
        title: "ARA Multi-Port Barge Operations",
        description: "Barges often load in Antwerp, top up in Flushing, and discharge in Rotterdam. Space BQS tracks running barge inventory across multi-stop voyages without data drift."
      }
    ],
    softwareAdvantage: [
      "Standardized ARA bunker license digital checklists and tamper-evident documentation.",
      "Automated metric tonnes in vacuum and air calculation compliant with European commercial customs standards.",
      "Instant export of 4-sheet transparent audit workbooks for Dutch and international claims arbitration.",
      "Offline deck operation across exposed North Sea anchorages and river terminals."
    ],
    faqs: [
      {
        q: "Is Mass Flow Meter (MFM) mandatory in Rotterdam?",
        a: "The Port of Rotterdam Authority and the Port of Antwerp-Bruges have mandated certified Mass Flow Meters on bunker vessels operating in their waters. Space BQS accommodates both MFM electronic records and physical tank sounding verification."
      },
      {
        q: "How does Space BQS handle SECA ULSFO 0.10% sulfur surveys in Rotterdam?",
        a: "Space BQS flags tank clean-out history, line flushing requirements, and density thresholds to prevent inadvertent cross-contamination between high-sulfur residual fuels and ultra-low sulfur distillates."
      }
    ]
  },
  fujairah: {
    slug: "fujairah",
    name: "Port of Fujairah",
    city: "Fujairah",
    country: "United Arab Emirates",
    region: "Middle East / Gulf of Oman",
    coordinates: { lat: 25.12881, lng: 56.326484 },
    annualBunkerVolume: "8+ Million MT (Middle East's #1)",
    rank: "Largest in Middle East / Top 3 Globally",
    regulatoryBody: "Fujairah Port Authority & UAE Ministry of Energy and Infrastructure",
    primaryStandards: ["Port of Fujairah Marine Notice 262", "ISO 8217:2024", "ASTM D1250 Petroleum Measurement Tables"],
    keyFuelGrades: ["VLSFO 0.50% S (380 cSt & 180 cSt)", "LSMGO 0.10% S", "HSFO 380 cSt"],
    headline: "BQS Software for Fujairah Offshore Anchorage & Tanker Terminal Operations",
    summary: "Positioned strategically outside the Strait of Hormuz, Fujairah's open-sea anchorage requires robust offshore survey tools. Space BQS delivers 72-hour offline operation, swell trim compensation, and rapid protest documentation.",
    surveyOverview: "Fujairah's bunkering takes place predominantly in expansive open-sea anchorages (Anchorage Areas A, B, and C) subject to Indian Ocean swells and intense summer heat. Surveyors board via pilot launch several nautical miles offshore, where reliable cellular connectivity is absent. Accurate sounding tape readings require swift pitch/roll calibration and stable density corrections under extreme ambient temperatures exceeding 45°C.",
    localProcedures: [
      "Offshore launch transit and safe boarding protocol under Fujairah Marine Notices.",
      "Deep-water anchorage trim and heel verification before barge line connection.",
      "Tank temperature measurement accounting for intense solar deck heating and high ambient heat.",
      "Free water interface paste testing to detect bottom water accumulation in heavy fuel tanks.",
      "Cryptographic digital signing of sounding registers before launch disembarkation."
    ],
    challenges: [
      {
        title: "Extreme Ambient Heat & Solar Radiative Distortion",
        description: "Deck temperatures in Fujairah can exceed 55°C, causing surface fuel layers to expand while lower tank fuel remains cooler. Space BQS supports upper, middle, and lower temperature averaging to prevent artificial volume inflation."
      },
      {
        title: "Open-Water Swell & Pitch/Roll Motion",
        description: "Long-period swells in the Gulf of Oman cause liquid sloshing in bunker tanks. Space BQS provides fast dual-dip averaging and trim-heel boundary validation to ensure soundings align with calibrated strapping tables."
      },
      {
        title: "Zero Offshore Connectivity in Outer Anchorages",
        description: "Cellular towers on the East Coast of the UAE do not reliably reach Anchorages B and C. Space BQS runs completely offline on iOS and Android devices, allowing full survey completion and calculation on deck."
      }
    ],
    softwareAdvantage: [
      "True offline operation with 72-hour autonomous license lease for remote offshore anchorages.",
      "Pre-configured Fujairah Port Authority marine notice compliance templates.",
      "Instant discrepancy alerts when barge delivery figures deviate beyond 0.5% tolerance.",
      "One-click Letter of Protest (LOP) generation directly from the surveyor's tablet."
    ],
    faqs: [
      {
        q: "Can surveyors calculate metric tonnes while offshore without internet?",
        a: "Yes. The Space BQS mobile app contains the full ASTM D1250 Table 54B calculation matrix and vessel calibration tables offline. No cellular or Wi-Fi connection is needed to calculate certified metric tonnes on deck."
      },
      {
        q: "How does Space BQS help resolve Fujairah bunker disputes?",
        a: "Disputes in Fujairah frequently involve water cut disagreements or temperature corrections. Space BQS generates an unalterable PDF certificate and transparent Excel workbook showing exact sounding heights, water cuts, temperatures, and strapping table lookups."
      }
    ]
  },
  houston: {
    slug: "houston",
    name: "Port of Houston",
    city: "Houston, Texas",
    country: "United States",
    region: "US Gulf Coast / Americas",
    coordinates: { lat: 29.7604, lng: -95.3698 },
    annualBunkerVolume: "5+ Million MT (Americas' #1)",
    rank: "Largest in North America",
    regulatoryBody: "United States Coast Guard (USCG) Sector Houston-Galveston & EPA",
    primaryStandards: ["API MPMS (Manual of Petroleum Measurement Standards)", "ASTM D1250 Table 6B & 54B", "USCG Title 33 CFR Part 156", "ISO 8217"],
    keyFuelGrades: ["VLSFO 0.50% S", "LSMGO 0.10% S (North American ECA Compliant)", "HSFO 380 cSt", "Biofuel Blends (B30)"],
    headline: "BQS Software for Houston Ship Channel & Galveston Bunkering Operations",
    summary: "The Port of Houston and Galveston Bay represent the premier bunkering hub in North America. Space BQS provides dual API MPMS Table 6B (Barrels / Long Tons) and ASTM Table 54B (Metric Tonnes) calculation engines for US domestic and international vessels.",
    surveyOverview: "Stretching along the 52-mile Houston Ship Channel and Galveston offshore lightering anchorages, bunkering operations adhere strictly to USCG 33 CFR bunker transfer regulations and EPA North American ECA sulfur limits (0.10%). Marine surveyors frequently need to convert between US customary units (barrels at 60°F, short/long tons) and international metric units (cubic meters at 15°C, metric tonnes), demanding zero unit-conversion errors.",
    localProcedures: [
      "USCG Declaration of Inspection (DOI) cross-check and pre-transfer conference verification.",
      "Tank gauging in feet/inches and metric millimeters with API MPMS Chapter 3 compliant sounding tapes.",
      "Dual calculation verification across API Table 6B (Barrels 60°F) and ASTM Table 54B (Metric Tonnes).",
      "North American ECA compliance sample sealing and MARPOL Annex VI custody tracking.",
      "Discrepancy reconciliation against Texas terminal pipeline and push-barge strapping books."
    ],
    challenges: [
      {
        title: "US Customary vs Metric Unit Confusion",
        description: "US push-barges often operate in barrels (bbls) at 60°F and long tons (LT), while international ship masters require metric tonnes (MT) at 15°C. Space BQS calculates both standards simultaneously with zero rounding drift."
      },
      {
        title: "Shallow Draft & Severe Barge Trim in the Ship Channel",
        description: "Narrow berths along the Houston Ship Channel create pronounced stern trim on bunker barges. Space BQS incorporates barge trim and list tables to prevent volume calculation errors."
      },
      {
        title: "Galveston Offshore Lightering Zone Distance",
        description: "Surveys conducted in Galveston Offshore Lightering Areas (GOLA) occur up to 30 miles offshore where wireless coverage is non-existent. Space BQS operates with zero internet requirement."
      }
    ],
    softwareAdvantage: [
      "Automatic simultaneous generation of API MPMS Table 6B and ASTM Table 54B certified figures.",
      "USCG Title 33 CFR transfer safety protocol verification checklists.",
      "Integrated vessel and barge strapping table lookup with bilinear interpolation.",
      "Instant generation of Letter of Protest (LOP) formatted for US Admiralty arbitration and P&I Club documentation."
    ],
    faqs: [
      {
        q: "Does Space BQS calculate in US Barrels as well as Metric Tonnes?",
        a: "Yes. Space BQS natively handles both API MPMS Table 6A/6B (barrels at 60°F, API gravity, long tons) and ASTM Table 54A/54B (metric tonnes in vacuum and air at 15°C) to bridge US barge and international vessel standards."
      },
      {
        q: "Can Space BQS be used during Galveston offshore lightering?",
        a: "Yes. The mobile application operates 100% offline for up to 72 hours, allowing surveyors to conduct full bunker surveys in remote Gulf of Mexico lightering zones without cell service."
      }
    ]
  },
  piraeus: {
    slug: "piraeus",
    name: "Port of Piraeus",
    city: "Piraeus / Athens",
    country: "Greece",
    region: "Mediterranean / Southern Europe",
    coordinates: { lat: 37.94299, lng: 23.64698 },
    annualBunkerVolume: "3+ Million MT (Eastern Med #1)",
    rank: "Premier Eastern Mediterranean Hub",
    regulatoryBody: "Hellenic Coast Guard & Piraeus Port Authority (PPA)",
    primaryStandards: ["ISO 8217:2024", "EU Marine Sulfur Directive", "Hellenic Bunker Regulations", "ASTM D1250 Table 54B"],
    keyFuelGrades: ["VLSFO 0.50% S", "LSMGO 0.10% S", "HSFO 380 cSt (Scrubber Equipped)"],
    headline: "BQS Software for Piraeus & Greek Anchorage Bunkering Operations",
    summary: "Piraeus is the heart of Greek ship management and the primary bunkering crossroads of the Eastern Mediterranean. Space BQS provides fast turnaround, multi-tank verification, and rigorous dispute prevention for global Greek shipping operations.",
    surveyOverview: "Operating across the Piraeus anchorage, Eleusis Bay, and Aspropyrgos refinery terminals, bunker surveyors handle heavy maritime traffic connecting the Suez Canal, Black Sea, and Western Mediterranean. Fast vessel turnarounds and high container/ferry schedules demand rapid sounding capture, instant Table 54B math, and immediate certificate sign-off.",
    localProcedures: [
      "Pre-bunker inspection at Piraeus outer anchorage or Eleusis designated bunkering spots.",
      "Verification of Greek Customs and Hellenic Coast Guard documentation.",
      "Manual sounding and electronic gauging of refinery supply barges.",
      "Water finding paste verification on deep fuel oil tanks.",
      "Final bunker certificate generation and electronic distribution to Greek shipowner headquarters."
    ],
    challenges: [
      {
        title: "Short Anchorage Dwell Times & Rapid Turnarounds",
        description: "Containerships and cruise liners calling at Piraeus frequently have narrow 4-6 hour turnaround windows. Space BQS enables surveyors to complete full tank calculations and issue signed certificates within minutes of hose disconnection."
      },
      {
        title: "Refinery Fuel Temperature Variations",
        description: "Deliveries from nearby Aspropyrgos and Corinth refineries can arrive with significant temperature variations. Space BQS applies exact Table 54B VCF lookups to ensure volume adjustments reflect real physical mass."
      },
      {
        title: "Immediate Office Review for Greek Fleet Managers",
        description: "Greek technical superintendents require instant visibility into delivered figures. As soon as the surveyor's mobile device connects to 4G/5G, survey registers sync immediately to the office web portal."
      }
    ],
    softwareAdvantage: [
      "Optimized for Mediterranean short-sea and deep-sea bunkering protocols.",
      "Direct cloud synchronization to fleet superintendents and operations executives.",
      "Mathematical transparency that withstands London and Piraeus maritime arbitration scrutiny.",
      "Offline deck operation across Eleusis and Salamis anchorages."
    ],
    faqs: [
      {
        q: "How quickly can a surveyor issue a bunker certificate in Piraeus using Space BQS?",
        a: "With Space BQS, surveyors enter final tank soundings on deck and the app immediately calculates Table 54B VCF and mass in metric tonnes. A locked PDF certificate can be generated and signed on-site within 2 minutes."
      },
      {
        q: "Does Space BQS support Greek shipowners' internal reporting templates?",
        a: "Yes. In addition to standard locked PDF certificates, Space BQS exports 4-sheet transparent Excel packs that can be directly mapped to ship management ERPs and technical performance databases."
      }
    ]
  },
  shanghai: {
    slug: "shanghai",
    name: "Port of Shanghai & Zhoushan",
    city: "Shanghai / Zhoushan",
    country: "China",
    region: "East Asia",
    coordinates: { lat: 31.2304, lng: 121.4737 },
    annualBunkerVolume: "25+ Million MT (Combined Yangtze Delta)",
    rank: "Top 2 Globally (Combined Hub)",
    regulatoryBody: "Maritime Safety Administration of the PRC (China MSA) & Zhoushan Port Authority",
    primaryStandards: ["China MSA Bunkering Regulations", "GB/T 17411 (Marine Fuel Oils)", "ISO 8217:2024", "ASTM D1250 Table 54B"],
    keyFuelGrades: ["VLSFO 0.50% S (Bonded)", "LSMGO 0.10% S", "HSFO 380 cSt", "Clean Biofuel Blends", "LNG / Green Methanol"],
    headline: "BQS Software for Shanghai & Zhoushan Anchorage Bunkering Operations",
    summary: "The Shanghai-Zhoushan maritime complex is East Asia's rapidly expanding bunkering megahub. Space BQS delivers bilingual auditability, bonded fuel discrepancy tracking, and strict China MSA compliance.",
    surveyOverview: "Covering the Yangtze River estuary, Yangshan Deep Water Port, and Zhoushan offshore anchorages (Tiaozhoumen, Xiazhimen), bunker surveyors navigate complex customs bonded fuel regimes and strict Maritime Safety Administration (MSA) inspection standards. Vast geographical dispersion requires dependable offline mobile apps and transparent mathematical calculation proofs.",
    localProcedures: [
      "China MSA and Customs pre-bunkering safety checklist completion.",
      "Bonded bunker oil tank measurement on supply barges and receiving ships.",
      "Verification of Coriolis mass flow meter calibration certificates where equipped.",
      "Representative continuous drip sampling adhering to GB/T standards and MARPOL requirements.",
      "Post-transfer quantity reconciliation with dual-currency and dual-unit documentation."
    ],
    challenges: [
      {
        title: "Vast Offshore Anchorages & Heavy Yangtze Fog",
        description: "Zhoushan outer anchorages face dense seasonal fog and turbulent tidal currents, isolating boarding surveyors for extended periods. Space BQS's 72-hour offline engine guarantees uninterrupted survey completion."
      },
      {
        title: "Strict Bonded Fuel Customs Reconciliation",
        description: "Chinese customs enforces zero-tolerance discrepancies on bonded marine fuel quotas. Space BQS ensures mathematical precision down to the kilogram, avoiding costly customs holds."
      },
      {
        title: "Dual Language & International Compliance Requirements",
        description: "Surveyors frequently coordinate between Mandarin-speaking barge crew and international ship officers. Space BQS formats outputs clearly with universal ISO/ASTM terminology."
      }
    ],
    softwareAdvantage: [
      "Engineered for China MSA and bonded bunker operational requirements.",
      "Zero-drift Table 54B calculation matrix compliant with Chinese national and international standards.",
      "High-speed offline mobile workflow suited for Yangtze estuary and Zhoushan anchorages.",
      "Instant tamper-evident PDF certificates and auditable Excel evidence packages."
    ],
    faqs: [
      {
        q: "Can Space BQS be used at Zhoushan anchorages without internet?",
        a: "Yes. The Space BQS mobile application is completely offline-capable, storing all vessel calibration tables and Table 54B calculation models locally on the surveyor's phone or tablet."
      },
      {
        q: "How does Space BQS assist with China Customs bonded bunker compliance?",
        a: "Space BQS produces transparent 4-sheet calculation workbooks showing exact tank strapping steps, water deductions, and temperature corrections, providing indisputable mathematical evidence for customs auditors."
      }
    ]
  }
};

export const ALL_PORTS = Object.values(BUNKER_PORTS);
