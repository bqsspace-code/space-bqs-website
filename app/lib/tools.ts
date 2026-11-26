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
    standards: "Arithmetic worksheet using a user-supplied VCF; not a standards-compliance check.",
    guidance: [
      "Observed Volume: The liquid volume recorded for this worksheet. Use the measurement basis and calibration references established by the responsible survey team.",
      "Free Water Volume: Measurable unmixed water settled at tank bottom, deducted before applying temperature correction factors.",
      "Volume Correction Factor (VCF): Dimensionless multiplier normalizing liquid volume from observed temperature to 15°C reference condition.",
      "Density: Enter density at a reference condition consistent with the VCF and the mass basis required for the arithmetic. This worksheet does not determine the correct value or mass basis.",
      "Calculated mass: Standard Volume (m³) × Density (kg/m³) ÷ 1,000. This worksheet result is not a survey certificate.",
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
        a: "No. This public worksheet lets you check volume-to-mass arithmetic using a factor you supply. It is separate from the Space BQS production application; confirm the production calculation method and table edition for the release you evaluate.",
      },
    ],
  },
  {
    slug: "bdn-discrepancy",
    title: "BDN discrepancy",
    description: "Compare measured and declared mass, with a signed difference and percentage.",
    formula: "Difference = measured − declared. Percentage = difference ÷ declared × 100.",
    note: "A negative result means measured mass is below the BDN figure. Use the same mass basis and units for both inputs. This comparison does not decide contractual tolerance or liability.",
    standards: "Compare figures using the same units and mass basis; contractual tolerances vary.",
    guidance: [
      "BDN Declared Quantity: The supplier's stated fuel mass in metric tonnes from the physical or digital bunker delivery note.",
      "Surveyor Measured Quantity: Independent custody transfer mass calculated from vessel sounding sheets before and after delivery.",
      "Signed Difference (MT): Entered measured mass minus the entered BDN declared mass. A negative arithmetic result does not by itself establish cause, fault, or a contractual shortfall.",
      "Percentage difference: The signed difference divided by the declared mass. Use the applicable contract and local procedure to interpret the result.",
    ],
    workedExample: {
      inputs: [
        "Supplier BDN Declared Mass: 1,000.000 MT",
        "Independent Surveyor Measured Mass: 988.500 MT",
        "Compare the calculated difference with the tolerance, if any, stated in the applicable contract.",
      ],
      calculation: "Difference = 988.500 − 1,000.000 = −11.500 MT → Percentage = (−11.500 ÷ 1,000.000) × 100 = −1.15%",
      output: "−11.500 MT arithmetic difference (−1.15%)",
    },
    faqs: [
      {
        q: "Does this worksheet decide whether a delivery is outside contractual tolerance?",
        a: "No. It calculates the difference and percentage from the values entered. Check the applicable contract and local procedures to interpret the result.",
      },
      {
        q: "When should our survey team issue a Letter of Protest (LOP)?",
        a: "Follow the applicable contract, port procedure, and your organization’s process. This arithmetic worksheet does not provide legal or operational advice.",
      },
      {
        q: "Does a BDN discrepancy automatically prove supplier fault?",
          a: "No. This worksheet compares the values entered; it does not establish why they differ or determine responsibility. The relevant records, procedures, and contractual terms must be assessed by the responsible parties.",
      },
    ],
  },
  {
    slug: "rob-balance",
    title: "ROB balance",
    description: "Calculate a fuel balance from opening ROB, receipts, transfers out, and closing ROB. Check scope, units, and period.",
    formula: "Calculated consumption = opening ROB + receipts − transfers out − closing ROB.",
    note: "Use one fuel grade, period, and mass basis. Include all movements. This is a balance worksheet; it does not independently verify readings or replace a survey record.",
    standards: "Arithmetic balance worksheet; not a charter settlement or regulatory compliance determination.",
    guidance: [
      "Opening ROB: Recorded fuel remaining on board at the start of the selected period.",
      "Receipts: Fuel quantities entered as received during the selected period.",
      "Transfers / Debunkering Out: Fuel pumped off the vessel or transferred between segregated systems during the period.",
      "Closing ROB: Recorded fuel remaining on board at the end of the selected period.",
      "Calculated balance: A result from the opening ROB, receipts, transfers out, and closing ROB values entered. Verify scope, fuel grade, period, and source records before interpretation.",
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
    description: "Convert supported marine volume or mass units in a browser worksheet. Review the formulas and limits before using the result.",
    formula: "Converted quantity = input × source-unit factor ÷ target-unit factor.",
    note: "US and imperial gallons are different units. Unit conversion does not correct temperature or convert volume to mass. For volume-to-mass calculations, use density and a supplied correction factor in the separate worksheet.",
    standards: "NIST Special Publication 811, ISO 80000-1 Quantities and Units",
    guidance: [
      "Volume units available: cubic metres (m³), litres (L), US gallons (US gal), and Imperial gallons (Imp gal).",
      "Mass units available: metric tonnes (MT), kilograms (kg), and pounds (lb).",
      "US and Imperial gallons are distinct units; select the intended source and target units explicitly.",
      "This worksheet converts within volume or mass. It does not convert volume to mass, apply a temperature correction, or include barrels or long tons.",
    ],
    workedExample: {
      inputs: [
        "Bunker Quantity in Metric Tonnes: 500.000 MT",
        "Target Unit: Kilograms (kg)",
      ],
      calculation: "Converted Mass = 500.000 MT × 1,000 kg/MT = 500,000 kg",
      output: "500,000 kg",
    },
    faqs: [
      {
        q: "Why are US gallons and Imperial gallons separate options?",
        a: "They are different volume units with different conversion factors. Select the unit shown in the source record before converting.",
      },
      {
        q: "Does converting cubic metres to barrels correct for temperature?",
        a: "No. Pure unit conversions assume both units exist under the exact same temperature condition. To convert hot observed volume into standard 60°F barrels or 15°C cubic metres, ASTM Table 54B/Table 52 factors must be applied.",
      },
      {
        q: "Can this converter convert barrels or long tons?",
        a: "No. The current worksheet supports m³, L, US gal, and Imp gal for volume, and MT, kg, and lb for mass.",
      },
    ],
  },
];

export type ToolSlug = (typeof TOOLS)[number]["slug"];
