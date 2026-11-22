export interface ToolConfig {
  slug: "volume-to-mass" | "bdn-discrepancy" | "rob-balance" | "unit-converter";
  title: string;
  description: string;
  formula: string;
  note: string;
  standards: string;
  guidance: string[];
  workedExample: {
    inputs: string[];
    calculation: string;
    output: string;
  };
  faqs: { q: string; a: string }[];
}

export const TOOLS: ToolConfig[] = [
  {
    slug: "volume-to-mass",
    title: "Volume to mass",
    description: "Deduct free water, apply a supplied VCF, and convert corrected volume to mass.",
    formula: "Net volume = observed − free water. Standard volume = net × supplied VCF. Mass = standard volume × density.",
    note: "Enter a VCF from your approved table or calculation source and density at the same reference condition as the corrected volume. This worksheet does not calculate a Table 54B factor, apply air-buoyancy corrections, or issue a certificate.",
    standards: "ASTM D1250-04, API MPMS Chapter 11.1, ISO 13739:2020",
    guidance: [
      "Observed Volume: The total gross liquid volume determined from vessel tank sounding or ullage tape measurements using official calibration tables.",
      "Free Water Volume: Measurable unmixed water settled at tank bottom, deducted before applying temperature correction factors.",
      "Volume Correction Factor (VCF): Dimensionless multiplier normalizing liquid volume from observed temperature to 15°C reference condition.",
      "Standard Density: Density at 15°C (in vacuum or air) as stated on the bunker delivery note (BDN) or surveyor lab certificate.",
      "Custody Transfer Metric Tonnes: Final certified mass calculated as Standard Volume (m³) × Density (kg/m³) ÷ 1,000.",
    ],
    workedExample: {
      inputs: [
        "Observed Tank Volume: 500.000 m³",
        "Free Water Measured: 2.000 m³",
        "Supplied Table 54B VCF: 0.9677 (VLSFO @ 40°C)",
        "Standard Density @ 15°C: 0.9500 kg/L (950.0 kg/m³)",
      ],
      calculation: "Net Volume = 500.000 − 2.000 = 498.000 m³ → Standard Volume = 498.000 × 0.9677 = 481.9146 m³ → Mass = 481.9146 × 0.9500 = 457.81887 MT",
      output: "457.819 Metric Tonnes (rounded to 3 decimals)",
    },
    faqs: [
      {
        q: "Why must free water be subtracted before applying VCF?",
        a: "Free water and hydrocarbon fuel have vastly different thermal expansion coefficients. Applying petroleum Table 54B factors to a mixture containing settled water distorts temperature normalization and metric mass calculations.",
      },
      {
        q: "What is the difference between mass in air and mass in vacuum?",
        a: "Mass in vacuum represents true physical mass. Commercial bunker trading frequently uses apparent mass in air (weight in air), applying a standard buoyancy correction (~1.1 kg/m³ deduction) per local port customs or commercial contracts.",
      },
      {
        q: "Does this worksheet run the full production ASTM engine?",
        a: "No. This public web tool allows surveyors and superintendents to verify volume-to-mass arithmetic using a user-supplied factor. The full Space BQS platform executes bilinear interpolation across the complete ASTM D1250 Table 54B matrix.",
      },
    ],
  },
  {
    slug: "bdn-discrepancy",
    title: "BDN discrepancy",
    description: "Compare measured and declared mass, with a signed difference and percentage.",
    formula: "Difference = measured − declared. Percentage = difference ÷ declared × 100.",
    note: "A negative result means measured mass is below the BDN figure. Use the same mass basis and units for both inputs. This comparison does not decide contractual tolerance or liability.",
    standards: "BIMCO Standard Bunker Terms 2018, Singapore SS 600:2022, ISO 13739:2020",
    guidance: [
      "BDN Declared Quantity: The supplier's stated fuel mass in metric tonnes from the physical or digital bunker delivery note.",
      "Surveyor Measured Quantity: Independent custody transfer mass calculated from vessel sounding sheets before and after delivery.",
      "Signed Difference (MT): Measured mass minus declared BDN mass. A negative figure indicates a physical delivery shortfall.",
      "Percentage Variance: Quantifies discrepancy relative to nomination size. Variations exceeding standard commercial tolerances (e.g. ±0.5%) typically warrant immediate issuance of a formal Letter of Protest.",
    ],
    workedExample: {
      inputs: [
        "Supplier BDN Declared Mass: 1,000.000 MT",
        "Independent Surveyor Measured Mass: 988.500 MT",
        "Discrepancy Threshold: ±0.5% (5.000 MT)",
      ],
      calculation: "Difference = 988.500 − 1,000.000 = −11.500 MT → Percentage = (−11.500 ÷ 1,000.000) × 100 = −1.15%",
      output: "−11.500 MT shortfall (−1.15% variance) — Exceeds ±0.5% tolerance threshold",
    },
    faqs: [
      {
        q: "What is the customary commercial tolerance in bunker delivery?",
        a: "Many charterparty contracts reference a ±0.5% tolerance threshold to account for measurement uncertainty. However, under BIMCO Standard Terms, buyers pay for actual fuel delivered, and significant shortages should always be supported with a signed Letter of Protest and locked survey certificate.",
      },
      {
        q: "When should our survey team issue a Letter of Protest (LOP)?",
        a: "If the difference between the barge delivery figures and vessel tank measurements exceeds acceptable thresholds, the surveyor should draft a Letter of Protest immediately before the barge departs, presenting tank-by-tank evidence.",
      },
      {
        q: "Does a BDN discrepancy automatically prove supplier fault?",
        a: "Not automatically. Discrepancies can arise from tank air pockets (cappuccino effect), temperature differences, unmeasured pipe lines, or incorrect barge soundings. Defensible evidence packages with before/after records are crucial to substantiate claims.",
      },
    ],
  },
  {
    slug: "rob-balance",
    title: "ROB balance",
    description: "Reconcile opening ROB, receipts, transfers out, and closing ROB.",
    formula: "Calculated consumption = opening ROB + receipts − transfers out − closing ROB.",
    note: "Use one fuel grade, period, and mass basis. Include all movements. This is a balance worksheet; it does not independently verify readings or replace a survey record.",
    standards: "BIMCO Fuel Settlement Principles, IMO DCS / EU MRV Fuel Monitoring Guidelines",
    guidance: [
      "Opening ROB: Certified fuel remaining on board at the beginning of the charter voyage or survey period.",
      "Bunker Receipts: Total delivered mass received from all verified bunker delivery attendances during the period.",
      "Transfers / Debunkering Out: Fuel pumped off the vessel or transferred between segregated systems during the period.",
      "Closing ROB: Independent fuel inventory surveyed at off-hire redelivery or end of voyage monitoring.",
      "Calculated Consumption: Reconciles total fuel consumed by main engines, auxiliary boilers, and generators.",
    ],
    workedExample: {
      inputs: [
        "On-Hire Opening ROB: 420.000 MT (VLSFO)",
        "Bunkered Receipts at Sea/Port: 600.000 MT",
        "Debunkered / Transfers Out: 0.000 MT",
        "Off-Hire Closing ROB: 310.000 MT",
      ],
      calculation: "Consumed Mass = 420.000 + 600.000 − 0.000 − 310.000 = 710.000 MT",
      output: "710.000 Metric Tonnes net consumption during charter period",
    },
    faqs: [
      {
        q: "Can one ROB calculation combine multiple fuel grades?",
        a: "No. ROB reconciliations must always be tracked strictly per fuel grade (e.g. VLSFO 0.5%, LSMGO 0.1%, ULSFO, HFO). Blending grades into a single figure obscures density differences and invalidates charterparty settlement accounting.",
      },
      {
        q: "How are unpumpable sludge and settling tank volumes handled?",
        a: "Tank calibration tables indicate non-suction bottom dead stock. Surveyors should distinguish between usable commercial fuel and unpumpable sludge bottoms on the survey certificate to prevent redelivery disputes.",
      },
      {
        q: "What role does the engine room logbook play during an ROB survey?",
        a: "The surveyor records Chief Engineer logbook figures for comparison, but performs completely independent physical soundings across all tanks. Differences between logbook estimates and physical readings are recorded transparently.",
      },
    ],
  },
  {
    slug: "unit-converter",
    title: "Marine unit converter",
    description: "Convert volume or mass between metric, US, and imperial units.",
    formula: "Converted quantity = input × source-unit factor ÷ target-unit factor.",
    note: "US and imperial gallons are different units. Unit conversion does not correct temperature or convert volume to mass. For volume-to-mass calculations, use density and a supplied correction factor in the separate worksheet.",
    standards: "NIST Special Publication 811, ISO 80000-1 Quantities and Units",
    guidance: [
      "Metric Tonnes (MT) vs Long Tons (LT): 1 Metric Tonne = 1,000 kg (2,204.62 lbs). 1 Long Ton (Imperial) = 1,016.047 kg (2,240 lbs). 1 Short Ton (US) = 907.185 kg (2,000 lbs).",
      "Cubic Metres (m³) vs Barrels (bbl): 1 m³ = 6.28981 standard petroleum barrels (42 US gallons per barrel).",
      "US Gallons vs Imperial Gallons: 1 US Liquid Gallon = 3.78541 litres. 1 Imperial Gallon = 4.54609 litres (approx 20% larger).",
      "Litres to Cubic Metres: 1,000 litres = exactly 1.000 cubic metre (m³).",
    ],
    workedExample: {
      inputs: [
        "Bunker Quantity in Metric Tonnes: 500.000 MT",
        "Target Unit: Long Tons (LT)",
      ],
      calculation: "Converted Mass = 500.000 MT × 1,000 kg/MT ÷ 1,016.0469 kg/LT = 492.103 LT",
      output: "492.103 Long Tons (LT)",
    },
    faqs: [
      {
        q: "Why do bunker deliveries in North America reference barrels while Asia/Europe uses MT?",
        a: "Historical regional market customs. US Gulf Coast and Caribbean suppliers often nominate bunkers in petroleum barrels (bbl), whereas international charterparties settle accounts in Metric Tonnes. Accurate unit conversions ensure billing alignment.",
      },
      {
        q: "Does converting cubic metres to barrels correct for temperature?",
        a: "No. Pure unit conversions assume both units exist under the exact same temperature condition. To convert hot observed volume into standard 60°F barrels or 15°C cubic metres, ASTM Table 54B/Table 52 factors must be applied.",
      },
      {
        q: "What is the exact definition of a petroleum barrel?",
        a: "A standard petroleum barrel (bbl) is defined as exactly 42 US liquid gallons, or approximately 158.9873 litres.",
      },
    ],
  },
];

export type ToolSlug = (typeof TOOLS)[number]["slug"];
