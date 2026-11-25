export interface GlossaryFaq {
  q: string;
  a: string;
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  category: "Physical Gauging" | "Calculation & ASTM" | "Custody & Dispute" | "Fuel Sampling & MARPOL";
  shortDefinition: string;
  fullExplanation: string;
  formula?: string;
  standardsReference: string;
  relatedTermSlugs: string[];
  faqs: GlossaryFaq[];
}

export const GLOSSARY_TERMS: Record<string, GlossaryTerm> = {
  "sounding": {
    slug: "sounding",
    term: "Sounding (Dip)",
    category: "Physical Gauging",
    shortDefinition: "The vertical depth measurement of liquid fuel present in a vessel tank from the bottom plating (or datum plate) up to the liquid surface.",
    fullExplanation: "Sounding (also referred to as 'dipping' or 'innage') is conducted by lowering a calibrated steel measuring tape with a weighted brass bob through the designated tank sounding pipe until the tip contacts the bottom datum striker plate. Upon retrieval, the liquid cut mark left on the tape indicates the total depth of fuel plus any settled bottom water. In bunker quantity surveying, soundings must be cross-checked with calibrated tank strapping tables and corrected for vessel trim and heel list.",
    formula: "Observed Depth = Wetted Tape Reading (at bottom datum)",
    standardsReference: "API MPMS Chapter 3.1A / ISO 4266-1 / SS 600",
    relatedTermSlugs: ["ullage", "water-cut", "strapping-table", "trim-correction"],
    faqs: [
      {
        q: "What is the difference between sounding and ullage?",
        a: "Sounding measures the depth of liquid from the bottom datum plate upwards to the fuel surface, whereas ullage measures the empty space (vapor headspace) from the top reference point down to the fuel surface."
      },
      {
        q: "When is sounding preferred over ullage in marine surveys?",
        a: "Sounding is preferred for deep double-bottom tanks, fuel tanks with complex internal piping, and when testing for bottom water cuts using water-finding paste."
      }
    ]
  },
  "ullage": {
    slug: "ullage",
    term: "Ullage (Outage)",
    category: "Physical Gauging",
    shortDefinition: "The distance measured from an established upper reference gauge point (typically the top of the sounding pipe or ullage port) down to the liquid fuel surface.",
    fullExplanation: "Ullage (also termed 'outage') represents the unfilled volume or vapor headspace in a ship's fuel tank. In high-viscosity residual fuel oils or agitated sea conditions, ullage measurement is frequently chosen because the tape does not need to travel through heavy bottom sludge, minimizing tape dragging and reducing cleaning time. Ullage is converted to total liquid volume by referencing the vessel's certified ullage calibration tables.",
    formula: "Ullage = Reference Gauge Height (RGH) - Sounding Depth",
    standardsReference: "API MPMS Chapter 3.1B / ISO 4266-1",
    relatedTermSlugs: ["sounding", "strapping-table", "trim-correction"],
    faqs: [
      {
        q: "Why do surveyors take ullage measurements instead of soundings?",
        a: "Ullage is taken on high-capacity settling and service tanks or when heavy asphaltic sludge at the tank bottom makes hitting the datum strike plate unreliable."
      }
    ]
  },
  "innage": {
    slug: "innage",
    term: "Innage",
    category: "Physical Gauging",
    shortDefinition: "An industry synonym for sounding; the measurable volume or liquid height contained within a storage tank.",
    fullExplanation: "Innage directly quantifies the physical presence of product inside a tank, as opposed to outage (ullage) which quantifies empty capacity. In standard petroleum terminology (particularly under API MPMS standards), innage gauging requires verified contact between the gauge bob plumb and the tank strike plate.",
    standardsReference: "API MPMS Chapter 3.1A",
    relatedTermSlugs: ["sounding", "ullage"],
    faqs: [
      {
        q: "Are innage and sounding the exact same measurement?",
        a: "Yes. In marine bunker surveying, 'sounding', 'dip', and 'innage' are interchangeable terms describing liquid height from the tank bottom."
      }
    ]
  },
  "strapping-table": {
    slug: "strapping-table",
    term: "Tank Strapping Table (Calibration Table)",
    category: "Physical Gauging",
    shortDefinition: "A certified volumetric calibration table that converts linear sounding or ullage measurements (in cm or mm) into gross liquid volume (in cubic meters or barrels).",
    fullExplanation: "Every ship fuel tank has an officially approved tank calibration book (strapping table) created by shipyard laser measurement or physical volumetric strapping. Because ship hulls curve along bilge keels and double bottoms, the volume per centimeter of height varies non-linearly across the tank height. Modern survey software like Space BQS executes piecewise linear interpolation between calibrated points and prohibits extrapolation beyond table boundaries.",
    formula: "V_gross = Table_V1 + [(Depth - Depth_1) / (Depth_2 - Depth_1)] * (Table_V2 - Table_V1)",
    standardsReference: "ISO 4512 / ISO 7507 / API MPMS Chapter 2",
    relatedTermSlugs: ["sounding", "ullage", "trim-correction", "wedge-formula"],
    faqs: [
      {
        q: "Why can't surveyors extrapolate beyond strapping table limits?",
        a: "Extrapolating outside calibrated limits introduces severe non-linear volumetric errors due to tank internal structural members, suction wells, and hull curvature. Calculations must strictly adhere to certified shipyard boundaries."
      }
    ]
  },
  "cappuccino-effect": {
    slug: "cappuccino-effect",
    term: "Cappuccino Effect (Aerated Fuel)",
    category: "Custody & Dispute",
    shortDefinition: "An intentional or accidental injection of compressed air into viscous fuel oil during bunker pumping, creating entrained micro-bubbles that artificially inflate apparent volume.",
    fullExplanation: "When compressed air is blown through delivery lines during barge tank stripping or high-velocity pumping, heavy residual oil traps micro-bubbles into a persistent foam colloquially known as 'cappuccino fuel'. During manual dip gauging immediately post-bunkering, the expanded froth yields an inflated volumetric reading. Over 24 to 48 hours, the air escapes, causing the liquid level to drop and revealing a substantial delivery deficit. Space BQS flags aeration risks through temperature-density mismatch warnings and step-by-step Letter of Protest generation.",
    standardsReference: "SS 600 Annex G / BIMCO BQS Dispute Clauses",
    relatedTermSlugs: ["water-cut", "coriolis-mass-flow-meter", "letter-of-protest"],
    faqs: [
      {
        q: "How can a surveyor detect cappuccino fuel on deck?",
        a: "Signs include bubbling or hissing at the bunker manifold, erratic pressure surges on the manifold pressure gauge, froth adhering to the sounding tape bob, and a noticeable temperature spike caused by compressed air injection."
      },
      {
        q: "Does a Coriolis Mass Flow Meter prevent the cappuccino effect?",
        a: "Modern Coriolis meters detect entrained gas by monitoring drive gain and resonant tube damping. However, severe multi-phase aeration can cause meter error codes or damping spikes, making independent surveyor oversight mandatory."
      }
    ]
  },
  "water-cut": {
    slug: "water-cut",
    term: "Free Water Cut",
    category: "Physical Gauging",
    shortDefinition: "The layer of un-emulsified free water that settles at the bottom of a fuel tank due to density differences, measured using water-finding paste.",
    fullExplanation: "Water has a higher density (~1.000 g/cm³) than heavy fuel oil (~0.950 - 0.991 g/cm³) and low-sulfur marine gasoil (~0.850 g/cm³), causing un-dissolved water to settle at the lowest point of the tank. Surveyors apply specialized water-finding paste to the bottom 10-20 cm of the sounding tape bob. Upon contact with water, the paste undergoes an instant color change (e.g., green to pink). The resulting free water volume is looked up in the strapping table and deducted directly from the gross liquid volume before applying temperature corrections.",
    formula: "Net Fuel Volume (m³) = Gross Liquid Volume (m³) - Free Water Volume (m³)",
    standardsReference: "API MPMS Chapter 3.1A / ISO 3170 / SS 600",
    relatedTermSlugs: ["sounding", "strapping-table", "table-54b"],
    faqs: [
      {
        q: "Why must water volume be deducted before multiplying by VCF?",
        a: "ASTM Table 54B Volume Correction Factors are calibrated specifically for hydrocarbons, not water. Multiplying water volume by petroleum VCF violates ASTM D1250 thermodynamic principles."
      }
    ]
  },
  "table-54b": {
    slug: "table-54b",
    term: "ASTM D1250 Table 54B",
    category: "Calculation & ASTM",
    shortDefinition: "The internationally recognized petroleum measurement table used to convert generalized product fuel volumes at observed temperatures to standard volume at 15°C.",
    fullExplanation: "Because petroleum expands when heated and contracts when cooled, custody transfer requires converting observed cubic meters to standard cubic meters at the international reference temperature of 15°C. ASTM D1250 Table 54B provides the Volume Correction Factor (VCF) as a function of the fuel's standard density at 15°C and observed tank temperature. Space BQS integrates the exact bilinear mathematical formulation of Table 54B.",
    formula: "VCF = exp(-α * ΔT * (1 + 0.8 * α * ΔT)), where ΔT = T_obs - 15°C",
    standardsReference: "ASTM D1250-80 / ASTM D1250-04 / API MPMS Chapter 11.1 / IP 200",
    relatedTermSlugs: ["vcf", "density-at-15c", "weight-in-air-factor"],
    faqs: [
      {
        q: "What is the difference between Table 54A and Table 54B?",
        a: "Table 54A is designed for generalized crude oils, whereas Table 54B is formulated specifically for refined generalized petroleum products, including marine distillates and residual fuel oils."
      }
    ]
  },
  "vcf": {
    slug: "vcf",
    term: "Volume Correction Factor (VCF)",
    category: "Calculation & ASTM",
    shortDefinition: "The dimensionless multiplier that corrects a liquid fuel volume from observed temperature to standard volume at 15°C.",
    fullExplanation: "The Volume Correction Factor (VCF) expresses the ratio between the volume of petroleum at reference temperature (15°C) and its volume at actual operating temperature. If bunker fuel is heated to 50°C, the VCF is less than 1.0000 (typically ~0.9760), correctly reducing the expanded observed volume back to standard reference conditions before mass conversion.",
    formula: "Gross Standard Volume (GSV @ 15°C) = Gross Observed Volume (GOV) * VCF",
    standardsReference: "ASTM D1250 / ISO 91-1",
    relatedTermSlugs: ["table-54b", "density-at-15c", "weight-in-air-factor"],
    faqs: [
      {
        q: "Can VCF be greater than 1.0000?",
        a: "Yes. If the fuel temperature in the tank is below 15°C (for example, marine gasoil in Northern Europe at 5°C), the oil has contracted, so VCF will be greater than 1.0000."
      }
    ]
  },
  "trim-correction": {
    slug: "trim-correction",
    term: "Trim Correction",
    category: "Physical Gauging",
    shortDefinition: "A mathematical adjustment applied to measured soundings or ullages to compensate for the vessel's fore-and-aft pitch inclination.",
    fullExplanation: "When a vessel trims by the stern or head, the liquid inside each tank slopes relative to the horizontal datum. Because sounding pipes are usually located in the aft corner of the tank, a stern trim causes the sounding tape to dip into a deeper wedge of fuel than the true horizontal liquid level. Vessel calibration books provide trim tables or angular correction charts to adjust observed sounding to equivalent even-keel sounding.",
    formula: "Sounding_corr = Sounding_obs ± (Trim * Tank_Length_Factor)",
    standardsReference: "ISO 4512 / SS 600:2022",
    relatedTermSlugs: ["heel-list-correction", "sounding", "strapping-table", "wedge-formula"],
    faqs: [
      {
        q: "What happens if a surveyor ignores vessel trim?",
        a: "Failing to apply trim correction can distort calculated volume by 2% to 8% on large double bottom tanks, resulting in significant apparent delivery discrepancies."
      }
    ]
  },
  "heel-list-correction": {
    slug: "heel-list-correction",
    term: "Heel & List Correction",
    category: "Physical Gauging",
    shortDefinition: "Volumetric adjustment compensating for the transverse port-or-starboard tilt of the vessel during tank gauging.",
    fullExplanation: "When a vessel lists to port or starboard due to cargo loading or ballast distribution, the liquid surface slopes athwartships. If the sounding pipe is located toward the inboard or outboard bulkhead, the sounding reading is distorted. Heel corrections adjust the liquid height to an upright, zero-degree baseline.",
    standardsReference: "ISO 4512 / SS 600",
    relatedTermSlugs: ["trim-correction", "sounding", "strapping-table"],
    faqs: [
      {
        q: "What is an acceptable list limit during bunker surveying?",
        a: "Under SS 600 and international good practice, vessels should be brought to an upright keel (list less than 0.5 degrees) whenever feasible before sounding."
      }
    ]
  },
  "density-at-15c": {
    slug: "density-at-15c",
    term: "Density at 15°C",
    category: "Calculation & ASTM",
    shortDefinition: "The mass per unit volume of fuel oil measured at standard 15°C reference temperature, expressed in kg/m³ or g/cm³.",
    fullExplanation: "Density at 15°C is the foundational physical property on the Bunker Delivery Note (BDN) and laboratory certificate of quality. It governs both the Table 54B VCF lookup and the ultimate conversion from cubic meters into commercial metric tonnes. Space BQS cross-validates BDN density against hydrometer dip readings taken on deck.",
    formula: "Density (kg/m³) = Mass (kg) / Volume (m³ @ 15°C)",
    standardsReference: "ISO 3675 / ISO 12185 / ASTM D4052",
    relatedTermSlugs: ["table-54b", "vcf", "weight-in-air-factor"],
    faqs: [
      {
        q: "How does an error in BDN density affect calculated metric tonnes?",
        a: "An over-declared BDN density produces both an artificially inflated VCF and an overestimated mass multiplier, compounding delivery shortfalls."
      }
    ]
  },
  "rob": {
    slug: "rob",
    term: "ROB (Remaining On Board)",
    category: "Custody & Dispute",
    shortDefinition: "The total quantity of bunker fuel physically present in the vessel's tanks prior to the start of bunkering (Opening ROB) or after bunkering (Closing ROB).",
    fullExplanation: "A rigorous Bunker Quantity Survey requires measuring all fuel tanks on the receiving vessel and barge twice: before delivery (Opening ROB) and after delivery (Closing ROB). The delivered quantity is determined as Closing ROB minus Opening ROB, plus any fuel consumed by engines or boilers during the bunkering operation.",
    formula: "Quantity Delivered = Closing ROB - Opening ROB + Fuel Consumed During Bunkering",
    standardsReference: "SS 600 / ISO 13739",
    relatedTermSlugs: ["bdn", "sounding", "letter-of-protest"],
    faqs: [
      {
        q: "Why must non-receiving tanks also be sounded during a BQS?",
        a: "To prevent unrecorded internal fuel transfers (e.g., shifting fuel between storage tanks during bunkering), complete opening and closing ROB across all fuel tanks is essential."
      }
    ]
  },
  "bdn": {
    slug: "bdn",
    term: "Bunker Delivery Note (BDN)",
    category: "Custody & Dispute",
    shortDefinition: "The legal shipping document issued by the bunker supplier specifying the fuel grade, delivery quantity, density, sulfur content, and seal numbers.",
    fullExplanation: "The BDN is a statutory requirement under MARPOL Annex VI Regulation 18. It must be retained on board for a minimum of 3 years. In a BQS audit, the physical delivered quantity measured by the surveyor is compared directly with the BDN stated mass to identify shortfalls.",
    standardsReference: "MARPOL Annex VI Reg 18 / ISO 8217 / SS 600",
    relatedTermSlugs: ["rob", "letter-of-protest", "marpol-sample"],
    faqs: [
      {
        q: "Can a Chief Engineer refuse to sign a BDN if there is a shortfall?",
        a: "The Chief Engineer should sign the BDN marked 'Signed for volume only, subject to Letter of Protest attached' rather than refusing to sign, ensuring the discrepancy is legally documented."
      }
    ]
  },
  "coriolis-mass-flow-meter": {
    slug: "coriolis-mass-flow-meter",
    term: "Coriolis Mass Flow Meter (MFM)",
    category: "Calculation & ASTM",
    shortDefinition: "An electronic in-line flow meter that measures the true inertial mass flow rate and density of fluid directly, without relying on volume-to-mass conversion.",
    fullExplanation: "Coriolis meters measure fluid mass directly through the Coriolis effect on vibrating flow tubes. In major bunkering hubs like Singapore (under SS 648) and Rotterdam, MFMs are mandated on bunker barges to accelerate delivery and reduce manual dip disputes. Independent BQS remains vital to verify pipework seals, check for meter zero drift, and compare meter totals with receiver tank soundings.",
    formula: "Mass = ∫ [Mass Flow Rate(t)] dt",
    standardsReference: "SS 648:2024 / ISO 22192 / OIML R 117",
    relatedTermSlugs: ["table-54b", "cappuccino-effect", "strapping-table"],
    faqs: [
      {
        q: "Can a Mass Flow Meter be tricked by aerated fuel?",
        a: "While Coriolis meters measure mass, excessive entrained air creates multi-phase flow conditions that cause drive gain saturation or measurement error codes. Proper BQS oversight confirms meter stability flags throughout pumping."
      }
    ]
  },
  "letter-of-protest": {
    slug: "letter-of-protest",
    term: "Letter of Protest (LOP)",
    category: "Custody & Dispute",
    shortDefinition: "A formal written maritime legal notice served immediately by the vessel master or surveyor to record a delivery shortfall, aeration, contamination, or procedural breach.",
    fullExplanation: "When a quantity discrepancy exceeds acceptable commercial tolerances (typically >0.5% or shipowner threshold), an immediate Letter of Protest (LOP) must be issued before the bunker barge departs and before signing commercial custody receipts. Space BQS generates pre-filled, timestamped LOP documents with attached calculation proofs.",
    standardsReference: "BIMCO Bunker Terms / SS 600 Clause 9",
    relatedTermSlugs: ["bdn", "cappuccino-effect", "rob"],
    faqs: [
      {
        q: "What happens if a barge captain refuses to sign a Letter of Protest?",
        a: "The surveyor notes 'Barge Master refused to sign' on the document, signs with witness chief engineer, timestamps it, and immediately forwards it to charterers, shipowners, and local port authorities."
      }
    ]
  },
  "unpumpable-sludge": {
    slug: "unpumpable-sludge",
    term: "Unpumpable Sludge (Tank Bottom Residue)",
    category: "Physical Gauging",
    shortDefinition: "The heavy layer of settled asphaltic sludge, wax, and sediment at the bottom of a fuel tank that cannot be mobilized by standard transfer pumps.",
    fullExplanation: "Over months of voyage operation, heavy fuel oil precipitates asphaltenes and cat fines into an unpumpable bottom residue layer. If a surveyor misidentifies this bottom layer as usable fuel, opening ROB is overstated and apparent received quantity is understated. Proper dipping paste and historical tank analysis are critical.",
    standardsReference: "ISO 8217 / SS 600",
    relatedTermSlugs: ["sounding", "water-cut", "rob"],
    faqs: [
      {
        q: "How does Space BQS account for unpumpable residues?",
        a: "Space BQS maintains tank-by-tank historical sounding floors to highlight unexpected bottom sediment build-ups before delivery calculations begin."
      }
    ]
  },
  "drip-sampling": {
    slug: "drip-sampling",
    term: "Continuous Drip Sampling",
    category: "Fuel Sampling & MARPOL",
    shortDefinition: "The continuous mechanical collection of fuel droplets from the bunker manifold throughout the entire duration of fuel delivery to obtain a representative composite sample.",
    fullExplanation: "Because fuel characteristics can vary across a multi-tank barge delivery, spot grab samples are legally invalid for commercial and regulatory testing. A certified manual or automatic needle valve drip sampler is installed at the receiving ship's bunker manifold, continuously drawing drops into a sealed cubitainer.",
    standardsReference: "IMO Resolution MEPC.96(47) / MARPOL Annex VI / SS 600",
    relatedTermSlugs: ["marpol-sample", "bdn"],
    faqs: [
      {
        q: "Where must the drip sampler be installed?",
        a: "Under MARPOL guidelines, the continuous drip sampler must be positioned at the receiving vessel's bunker manifold connection."
      }
    ]
  },
  "marpol-sample": {
    slug: "marpol-sample",
    term: "MARPOL Delivered Sample",
    category: "Fuel Sampling & MARPOL",
    shortDefinition: "The statutory representative fuel sample required under MARPOL Annex VI, sealed and signed by supplier and receiver, kept on board for regulatory inspection.",
    fullExplanation: "Under MARPOL Annex VI Regulation 18.8.1, the bunker supplier must deliver a representative fuel sample accompanied by the BDN. It must be sealed with tamper-evident serial numbers, signed by both parties, and retained in the ship's sample locker for 12 months or until the fuel is substantially consumed.",
    standardsReference: "MARPOL Annex VI Reg 18 / IMO MEPC.182(59)",
    relatedTermSlugs: ["drip-sampling", "bdn"],
    faqs: [
      {
        q: "What is the minimum volume required for a MARPOL bunker sample?",
        a: "The MARPOL sample bottle must contain a minimum volume of 400 mL, though commercial practice typically utilizes 750 mL to 1000 mL bottles."
      }
    ]
  },
  "wedge-formula": {
    slug: "wedge-formula",
    term: "Wedge Formula (Trim Geometry)",
    category: "Calculation & ASTM",
    shortDefinition: "A geometric calculation used to determine liquid volume in a trimmed tank when the liquid level does not cover the entire tank bottom.",
    fullExplanation: "When a vessel has significant stern trim and liquid depth is very low, the fuel forms a triangular wedge at the aft end that does not reach the forward bulkhead. In this state, regular strapping table interpolation fails. The wedge formula calculates volume based on liquid contact height, tank breadth, and trim angle.",
    formula: "Volume_wedge = (1/2) * Tank_Width * Strike_Height * Length_Contact",
    standardsReference: "API MPMS Chapter 17.2 / SS 600",
    relatedTermSlugs: ["trim-correction", "strapping-table", "sounding"],
    faqs: [
      {
        q: "When does the wedge formula apply?",
        a: "The wedge formula applies when the fuel level is low enough that the liquid surface intersects the tank bottom before reaching the forward bulkhead."
      }
    ]
  },
  "weight-in-air-factor": {
    slug: "weight-in-air-factor",
    term: "Weight in Air Conversion (0.0011 Buoyancy Correction)",
    category: "Calculation & ASTM",
    shortDefinition: "The standard commercial deduction (typically -0.0011 kg/L) applied to vacuum density to account for atmospheric air buoyancy in commercial metric tonne trade.",
    fullExplanation: "International bunker transactions are traded on 'Weight in Air' (apparent mass), whereas laboratory density and hydrometers measure true mass in vacuum. Under ASTM Table 56 and ISO 91, the buoyancy of standard air is accounted for by subtracting 0.0011 g/cm³ (or applying the commercial conversion factor CCF) from density at 15°C before computing metric tonnes.",
    formula: "Mass in Air (MT) = Gross Standard Volume (m³ @ 15°C) * (Density @ 15°C - 0.0011)",
    standardsReference: "ASTM Table 56 / ISO 91-1 / IP 200",
    relatedTermSlugs: ["table-54b", "vcf", "density-at-15c"],
    faqs: [
      {
        q: "Why is 0.0011 subtracted from density?",
        a: "0.0011 kg/L represents the buoyant force of standard dry atmospheric air at sea level acting on the mass of oil during physical weighing."
      },
      {
        q: "Do all contracts use Weight in Air?",
        a: "Yes. Standard commercial bunker charter contracts (BIMCO, Platts) specify metric tonnes in air."
      }
    ]
  }
};

export const ALL_GLOSSARY_TERMS = Object.values(GLOSSARY_TERMS);

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS[slug];
}
