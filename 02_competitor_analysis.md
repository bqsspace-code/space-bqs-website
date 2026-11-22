# Space BQS — Global Competitor Benchmarking, Feature Matrix & GEO Footprint

**Document Version:** 1.0.0  
**Date:** November 18, 2026  
**Master Data File:** [`02_competitors.csv`](file:///c:/My%20Folder/Codes/BQS/02_competitors.csv) (20 detailed competitor records, UTF-8 BOM formatted)  
**Analyzed Subject:** Space BQS (`https://aibqs.com`)

---

## 1. Executive Summary & Market Landscape

The global maritime fuel quantity verification landscape is bifurcated between **legacy, manual field instruments** (handwritten sounding notebooks, unprotected Excel sheets, standalone pocket calculators) and **heavyweight enterprise transaction portals** (e-BDN platforms, procurement optimization suites, laboratory testing conglomerates).

Space BQS occupies a distinct, high-value middle ground: **a purpose-built, offline-first digital operating system engineered specifically for bunker quantity surveyors and inspection firms**.

```
MARKET SEGMENTATION TAXONOMY:
├── DIRECT SOFTWARE (BQS Field & Report Tools):
│   ├── CargoSurveyor Tools (iOS/Android mobile calculator)
│   ├── SurveyorMates / Seven Surveyor (BunkerCal Windows/Excel software)
│   ├── ZakosBunkerSurvey (Greek desktop software)
│   ├── iMSurveyor / marinesurvey.online (AI inspection app)
│   ├── MMS - Bunker Fuel Calculator (Singapore iOS app)
│   └── Automated Marine Calculations / amcBunker (Greek naval architecture software)
├── ADJACENT PLATFORMS (e-BDN & Fleet Digitalization):
│   ├── FuelBoss by Ofiniti / DNV (MPA whitelisted e-BDN platform)
│   ├── ZeroNorth Bunker / BTS (Commercial bunker optimization)
│   ├── Bunkerchain (Singapore digital bunkering)
│   ├── Digital Bunker / Vortex Development Group (E-Ship Safety, E-BDN)
│   ├── MarineSnap (General offline inspection app)
│   └── ADP Clear / Minerva Bunkering (MFM hardware telemetry platform)
├── INDIRECT SUBSTITUTES:
│   ├── TheNavalArch (Excel Table 54B templates)
│   └── In-house unsealed spreadsheets & paper sounding books
└── SERVICE GIANTS (Potential Customers & Channel Partners):
    ├── VPS (VeriSphere / MySurveys)
    ├── Petro Inspect Group (Global independent survey firm)
    ├── Viswa Group / Viswa Lab
    └── SGS, Intertek, Saybolt, CCIC, Bureau Veritas
```

---

## 2. Feature Comparison Matrix: Space BQS vs. Top 8 Competitors

| Evaluation Dimension | Space BQS | CargoSurveyor Tools | SurveyorMates (Seven Surveyor) | iMSurveyor | amcBunker (AMC) | TheNavalArch (Excel) | MarineSnap | FuelBoss (Ofiniti) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Category** | Direct BQS SaaS | Direct App | Direct Desktop | Direct SaaS | Direct Software | Substitute | Adjacent App | Adjacent Portal |
| **Primary Platform** | iOS / Android / Web | iOS / Android | Windows Desktop | Web / iOS / Android | Windows Desktop | MS Excel | iOS / Android | Web Cloud |
| **Offline Architecture** | **72h Token Lease** | Full Offline | Full Offline | Full Offline | Full Offline | Full Offline | Full Offline | Cached Forms |
| **ASTM Table 54B Engine** | **Deterministic v1.0** | 1980 & 2004 Tables | Table 54B Lookup | Table 54B Chain | Naval Arch Engine | Excel Lookup | None | Cloud Engine |
| **Free Water Deduction** | **Yes (Automatic)** | Manual | Manual | Yes | Yes | Manual | No | No |
| **Tank Strapping Lookup** | **1D Linear Interp** | Manual Entry | Yes | Yes | 3D Calibration | Manual Entry | No | No |
| **QR Vessel Identification** | **Yes (Deck Scan)** | No | No | No | No | No | No | No |
| **Tamper-Evident Locked PDF**| **Cryptographic Seal**| Standard PDF | Standard Print | Standard PDF | Standard PDF | None (Unprotected)| Standard PDF | Digital Signature |
| **4-Sheet Audit Excel Pack** | **Yes (Included)** | No | Yes (Source file)| Yes | Yes | Source file only | No | Audit Logs |
| **Survey Warehouse Archive** | **Yes (Cloud Web)** | Local device only | Local drive only | Yes (Cloud) | Local network | Local drive only | Yes (Cloud) | Yes (Cloud) |
| **Workflow: Delivery vs BDN**| **Dedicated Mode** | Generic Report | Basic sheet | Yes (with LOP) | Detailed | Template | No | Supplier Focus |
| **Workflow: ROB On/Off-Hire**| **Dedicated Mode** | ROB Calculator | Dedicated sheet | Dedicated | Dedicated | Dedicated | No | No |
| **Workflow: Debunkering** | **Dedicated Mode** | No | No | No | Custom | No | No | No |
| **Letter of Protest (LOP)** | **Context Notes** | No | No | **Auto-Generated** | Custom | No | No | Protest Ticket |
| **Pricing Model** | **Team License** | One-Time ($49) | One-Time ($150) | Sub ($49-149/mo) | Custom ($2,500+) | One-Off ($79) | Sub ($49-99/mo) | Enterprise / Stem |
| **Per-Job Usage Fees** | **NONE ($0)** | None | None | None | None | None | None | Yes (per delivery)|
| **Quality/Lab Scope** | **Quantity-Only** | Quantity-Only | Quantity-Only | Quantity-Only | Quantity-Only | Quantity-Only | None | Quantity / e-BDN |
| **Target Audience** | **Survey Firms** | Solo Surveyors | Solo Surveyors | Surveyors / P&I | Technical Offices | Junior Surveyors | Yacht Inspectors| Barge Suppliers |

---

## 3. Market Positioning Map

```
                          ▲ HIGH AUDIT DEPTH & CERTIFICATION RIGOR
                          │
                          │                                  [FuelBoss / Ofiniti]
                          │                                  (Supplier e-BDN focus)
                          │
                          │          ★ SPACE BQS
                          │          (Tamper-evident locked PDF,
                          │           4-sheet raw data Excel,
                          │           72h offline lease, QR scan)
                          │
                          │                                  [amcBunker / AMC]
                          │                                  (High-cost naval arch)
                          │
  [CargoSurveyor Tools]   │          [iMSurveyor]
  (Pocket calculator,     │          (Multi-inspection AI)
   local device only)     │
                          │
◄─────────────────────────┼────────────────────────────────────────────────────────►
FIELD CAPABILITY &        │                                    DESKTOP / CLOUD ONLY
OFFLINE-FIRST MOBILITY    │
                          │          [TheNavalArch Excel]
                          │          (Vulnerable to formula errors)
                          │
                          │          [SurveyorMates]
                          │          (Legacy Windows desktop)
                          │
  [MarineSnap]            │
  (General checklist,     │
   zero bunker logic)     │
                          │
                          ▼ LOW AUDIT DEPTH (CHECKLIST / POCKET CALC)
```

---

## 4. GEO Footprint: 20 Test Prompts Across AI Engines

To evaluate how Generative AI engines (ChatGPT, Perplexity, Gemini, Copilot, Claude) recommend bunker software, 20 buyer queries were tested. Findings are summarized below:

| # | Test Buyer Query | Space BQS Mentioned? | Web Citations to aibqs.com | Primary Competitors / Sources Cited by LLMs |
| :-: | :--- | :---: | :---: | :--- |
| **1** | What software automates bunker quantity calculations from tank soundings? | **YES** | 0 (Cited App Store) | Apple App Store, MarineSurvey.online, SMMNet |
| **2** | Which tools support ASTM 54B bunker quantity calculations? | **NO** | 0 | Automated Marine Calculations (amc.gr), Seven Surveyor, TheNavalArch |
| **3** | What is the best mobile app for marine bunker surveyors? | **YES** | 0 (Cited App Store) | Apple App Store (Space BQS), Cargo Surveyor Tools, IM Surveyor |
| **4** | What bunker survey software calculates marine fuel quantities using ASTM Table 54B? | **YES** | 0 | Seven Surveyor, TheNavalArch, amc.gr |
| **5** | Which bunker survey software supports offline data capture on a vessel? | **YES** | 0 (Cited App Store) | Apple App Store (Space BQS), MarineSnap, IM Surveyor |
| **6** | Which marine survey apps work without an internet connection onboard? | **NO** | 0 | MarineSnap (Web + App Store), Google Play |
| **7** | How do bunker calculation systems prevent spreadsheet formula errors? | **NO** | 0 | BIMCO, DNV Guidelines, North Standard P&I |
| **8** | What is the easiest way to calculate ROB fuel during an on-hire or off-hire survey? | **NO** | 0 | TheNavalArch, Seven Surveyor, Maritime Safety Innovation Lab |
| **9** | Which bunker survey platforms create audit-ready bunker certificates? | **YES** | 0 | MPA Singapore, WorldPorts, BluSense |
| **10** | How can a marine survey app reduce errors when recording tank soundings? | **NO** | 0 | MarineQA, ISO 13739, AmSpec |
| **11** | What should I look for in a marine survey app for iPhone and Android? | **NO** | 0 | Marine Inspect, KDMT |
| **12** | Which marine survey app connects field readings with office review? | **NO** | 0 | Q8 Digital SurveyHub, Aptixx Marine |
| **13** | How do surveyors verify bunker delivery against BDN figures? | **NO** | 0 | IBIA, BIMCO, Veritas Petroleum Services (VPS) |
| **14** | What software is used for debunkering survey calculations? | **NO** | 0 | Seven Surveyor, ShipInspection.eu |
| **15** | Best bunker quantity survey software for independent survey firms? | **YES** | 0 | Seven Surveyor, iMSurveyor, VPS VeriSphere |
| **16** | Who provides digital bunker survey reports under Singapore SS 600 standards? | **NO** | 0 | MPA Singapore, Bunkerchain, Majestic Maritime Services (MMS) |
| **17** | How to convert observed bunker volume to metric tonnes at 15°C? | **NO** | 0 | Seven Surveyor, TheNavalArch, ISO 8217 documentation |
| **18** | What is the difference between bunker sounding and ullage calculation? | **NO** | 0 | Marine Insight, Seven Surveyor, Wartsila Voyage |
| **19** | Can bunker survey certificates be cryptographically locked against tampering? | **YES** | 0 | BunkerTrace, TradeGo, Space BQS (body mention) |
| **20** | What is the alternative to using Excel for bunker quantity surveys? | **NO** | 0 | TheNavalArch, Seven Surveyor, AMC |

### GEO Key Takeaways:
1. **The App Store Anchor:** Space BQS gets mentioned in **7 out of 20 prompts (35%)**, but **100% of LLM citations point to the Apple App Store**. The domain `aibqs.com` achieved **0 citations**.
2. **The "ASTM 54B" Vacuum:** When buyers ask about "ASTM Table 54B software", LLMs cite `amc.gr`, `sevensurveyor.com`, and `thenavalarch.com`. Space BQS is omitted because its website copy lacks indexed, structured technical formula explainers.
3. **The "Spreadsheet Failure" Opportunity:** Prompt #7 and #20 produced zero direct software recommendations. Publishing authoritative whitepapers and articles explaining why Excel fails in bunker audits will allow Space BQS to capture this uncited query space.

---

## 5. Honest Assessment: Where Space BQS is Stronger vs. Weaker

### Where Space BQS is STRONGER:
1. **Purpose-Built Field Workflow:** Unlike generic inspection apps (MarineSnap) that offer generic checklists, Space BQS has a dedicated deck wizard (Ship-Fuel-Tanks) designed specifically for soundings, free water cuts, and ASTM 54B.
2. **72-Hour Offline Lease:** True zero-connectivity resilience in double-bottom steel fuel tanks and offshore anchorages with automated cryptographic reconciliation upon reconnecting.
3. **Tamper-Evident Certification:** Generates cryptographically locked A4 PDF certificates that cannot be altered by rogue parties, paired with an open 4-sheet transparent Excel calculation pack.
4. **Predictable Team Pricing:** No per-certificate or per-job transactional fees, creating substantial cost savings for high-volume survey firms compared to per-stem platforms.
5. **Strict Quantity-Only Independence:** Zero conflict of interest. Does not sell bunker fuel (unlike TFG Marine/Minerva) and does not operate physical surveyor workforces (unlike VPS/Petro Inspect).

### Where Space BQS is WEAKER (Honest Diagnostic):
1. **Zero Web Citation Authority:** Search engines and LLMs cite competitors' websites because competitors have 10+ years of backlinked blog tutorials (`sevensurveyor.com`), downloadable spreadsheets (`thenavalarch.com`), or App Store age (`cargosurveyor.com`).
2. **No Automated Letter of Protest (LOP) Generator:** Competitors like `iMSurveyor` automatically draft formal Letters of Protest when BDN discrepancies exceed 0.5%. Space BQS records notes but does not generate standalone legal LOP documents.
3. **Absence of Singapore SS 600 / SS 648 Endorsements:** Space BQS has not yet published explicit compliance mapping to Singapore MPA digital bunkering standards or SS 600 guidelines.
4. **Thin Technical Content on Site:** The site explains that it calculates Table 54B, but does not publish the underlying mathematical equations, matrix boundaries, or worked numerical examples that technical buyers and LLMs look for.
5. **Android Store Visibility:** While an iOS app is live on the Singapore App Store, there is no direct link to a public Google Play Store listing on the website, creating hesitation for Android-equipped survey teams.
6. **Vulnerability of the "World's First" Claim:** Older mobile apps (CargoSurveyor Tools on iOS since ~2012, MMS on iOS since ~2016) make claiming "The world's first mobile app for bunker quantity surveys" legally and commercially fragile.

---

## 6. How to Beat Each Competitor (Tactical Battlecards)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ BATTLECARD: CargoSurveyor Tools                                                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ WEAKNESS: Built for solo surveyors on a single phone. No office cloud dashboard,      │
│ no team licensing, no centralized vessel strapping database, no supervisor review.    │
│ KILL SHOT: "CargoSurveyor is a great personal calculator for a surveyor's pocket, but │
│ Space BQS is an operating system for your entire survey firm."                         │
└────────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────┐
│ BATTLECARD: SurveyorMates (Seven Surveyor) & TheNavalArch                              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ WEAKNESS: Rely on unsealed Excel sheets and legacy desktop software. Spreadsheets are │
│ vulnerable to accidental formula deletion, corrupted cell links, and intentional data │
│ tampering. No mobile app for deck capture.                                             │
│ KILL SHOT: "Spreadsheets lose charter disputes because lawyers know formulas can be    │
│ altered. Space BQS delivers mathematically locked, cryptographically sealed proof."   │
└────────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────┐
│ BATTLECARD: iMSurveyor (marinesurvey.online)                                           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ WEAKNESS: Broad generic inspection app attempting to cover yacht condition, pre-       │
│ purchase, cargo, and draft surveys all at once. Bunker survey is an afterthought.     │
│ KILL SHOT: "Jack of all trades, master of none. Space BQS is 100% dedicated to bunker │
│ quantity verification with zero irrelevant bloat."                                     │
└────────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────┐
│ BATTLECARD: FuelBoss / Ofiniti & Bunkerchain                                           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ WEAKNESS: Supplier-centric e-BDN platforms designed for barge operators issuing notes. │
│ They charge transactional per-stem fees and do not provide independent tank sounding   │
│ verification for the buyer's surveyor.                                                 │
│ KILL SHOT: "They digitize what the supplier claims they delivered. Space BQS proves   │
│ what actually arrived in your vessel's tanks."                                         │
└────────────────────────────────────────────────────────────────────────────────────────┘
```
