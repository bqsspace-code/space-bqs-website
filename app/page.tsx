import type { Metadata } from "next";
import Link from "next/link";
import { Section, AnswerBlock, CtaRow, Faq, Breadcrumbs } from "./components/ui";
import HeroCertificateMock from "./components/HeroCertificateMock";
import LiquidTankStage from "./components/LiquidTankStage";
import KineticWave from "./components/KineticWave";
import WaveDivider from "./components/WaveDivider";
import RippleField from "./components/RippleField";
import WeightText from "./components/WeightText";

export const metadata: Metadata = {
  title: "BQS Software for Marine Surveyors — Capture, Calculate, Certify",
  description:
    "Space BQS is software for bunker surveyors and survey firms: offline mobile capture, temperature-corrected MT engine, locked certificates, fleet dashboard. Quantity-only.",
};

const FAQ = [
  {
    q: "Are you a survey company?",
    a: "No. Space BQS builds software for surveyors and survey firms. Your teams attend vessels; our web and mobile apps handle capture, calculation, certificates, and fleet records. We do not attend ships and do not compete with survey firms.",
  },
  {
    q: "What survey types does the software support?",
    a: "Bunker delivery (custody transfer), ROB (remaining on board, including on/off-hire legs), and debunkering — all quantity-only with the same ASTM D1250 Table 54B engine and audit trail.",
  },
  {
    q: "Does it test fuel quality or sludge?",
    a: "No. Space BQS is strictly quantity-only. We do not perform or fabricate lab testing, sludge surveys, or sampling-for-quality.",
  },
  {
    q: "How do we evaluate and what does it cost?",
    a: "We offer a 20-minute walkthrough followed by a pilot workspace for your survey team. Pricing is per team and usage — contact us and we quote transparently based on surveyors, vessels, and monthly survey volume.",
  },
];

export default function Home() {
  return (
    <div>
      {/* ──────────── HERO ──────────── */}
      <section
        className="relative overflow-hidden pt-28 pb-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 20%, #FFFFFF 0%, #EAF4F9 50%, #D3E9F3 100%)",
        }}
      >
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />

        <div className="relative mx-auto max-w-[1000px] px-4">
          <div className="flex flex-col items-center text-center space-y-6 pt-6 pb-12">
            <div className="inline-flex items-center justify-center">
              <Breadcrumbs trail={[{ href: "/", label: "Home" }]} />
            </div>

            <WeightText
              tag="h1"
              mode="cursor-radius"
              restWeight={300}
              activeWeight={800}
              radius={160}
              activeColor="#032AAC"
              baseColor="#031038"
              accentColor="#19B5C9"
              className="font-display text-[clamp(32px,5.5vw,74px)] leading-[1.08] tracking-[-0.03em] max-w-4xl w-full mx-auto"
            >
              BQS software for surveyors: capture, calculate, issue locked certificates.
            </WeightText>

            <p className="text-lg sm:text-xl max-w-2xl leading-relaxed" style={{ color: "rgba(3,16,56,0.68)" }}>
              Your team attends the vessel. The software does the rest.
            </p>

            <div className="pt-2">
              <CtaRow className="justify-center" />
            </div>

            <p className="text-xs" style={{ color: "rgba(3,16,56,0.44)" }}>
              Quantity only. Delivery, ROB and debunkering.
            </p>
          </div>
        </div>

        {/* Hero water — Kinetic Wave at base */}
        <KineticWave
          mode="toward"
          colors={["#A5D3E8", "#1B4FD1", "#032AAC"]}
          height={120}
        />
      </section>

      {/* ──────────── TRUST STRIP ──────────── */}
      <WaveDivider
        layers={5}
        colors={["#D3E9F3", "#A5D3E8", "#4E8DEB", "#1B4FD1", "#032AAC"]}
        height={60}
        direction="up"
        className="-mt-1"
      />

      <section className="py-10" style={{ background: "#F7FBFD" }}>
        <div className="mx-auto max-w-[1200px] px-4">
          <div
            className="rounded-3xl p-5"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid #D3E9F3",
              boxShadow: "0 2px 12px rgba(3,16,56,0.03)",
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              {[
                { label: "Engine", value: "v1.0.0", sub: "Pure math, zero drift" },
                { label: "Standard", value: "ASTM D1250-04", sub: "Table 54B VCF" },
                { label: "Grades", value: "5 Fuel Grades", sub: "VLSFO · HFO · MGO · LSMGO · ULSFO" },
                { label: "Modes", value: "Ullage & Sounding", sub: "Auto bounds check" },
                { label: "Mass", value: "Air & Vacuum", sub: "Commercial MT" },
              ].map((item) => (
                <div key={item.label} className="p-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] block" style={{ color: "rgba(3,16,56,0.35)" }}>
                    {item.label}
                  </span>
                  <span className="font-display font-bold text-abyss-900 text-sm block mt-0.5">
                    {item.value}
                  </span>
                  <span className="text-[11px] block mt-0.5" style={{ color: "rgba(3,16,56,0.45)" }}>
                    {item.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── PINNED LIQUID TANK STORY ──────────── */}
      <LiquidTankStage />

      {/* ──────────── WAVE TRANSITION ──────────── */}
      <WaveDivider
        layers={3}
        colors={["#EAF4F9", "#D3E9F3", "#A5D3E8"]}
        height={100}
        direction="down"
      />

      {/* ──────────── 3 WORKFLOW CARDS ──────────── */}
      <Section
        eyebrow="Workflows"
        title="One engine for your three core survey jobs"
        lede="Your surveyors conduct delivery, ROB, and debunkering jobs using the exact same audit standard and locked certificate generation."
        bg="mist"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              href: "/services/bunker-delivery-survey",
              title: "Bunker Delivery",
              desc: "Before and after tank soundings, temperature tracking, free water deduction, and cross-referencing against the BDN number.",
              link: "Delivery workflow",
            },
            {
              href: "/services/rob-survey",
              title: "ROB / On-Off Hire",
              desc: "Verify fuel remaining on board at vessel delivery and redelivery so owners and time-charterers settle fairly.",
              link: "ROB workflow",
            },
            {
              href: "/services/debunkering-survey",
              title: "Debunkering",
              desc: "Measured removal when off-spec or contaminated fuel must be de-bunkered back to barge or shore facilities.",
              link: "Debunkering workflow",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-3xl p-6 card-hover"
              style={{
                background: "rgba(255,255,255,0.85)",
                border: "1px solid #D3E9F3",
              }}
            >
              <h3 className="font-display text-xl font-bold text-abyss-900 group-hover:text-marine-700 transition-colors">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(3,16,56,0.6)" }}>
                {card.desc}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-marine-700 group-hover:gap-2.5 transition-all">
                {card.link}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 7h8M8 4l3 3-3 3" />
                </svg>
              </span>
              {/* Bottom wave hint on hover */}
              <div
                className="mt-4 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(90deg, #D3E9F3, #19B5C9, #032AAC)" }}
              />
            </Link>
          ))}
        </div>
      </Section>

      <WaveDivider
        layers={2}
        colors={["#EAF4F9", "#D3E9F3"]}
        height={80}
        direction="down"
      />

      {/* ──────────── HOW IT WORKS ──────────── */}
      <Section
        eyebrow="How it works"
        title="Capture, calculate, proof"
        lede="Three steps from the vessel deck to a locked certificate your clients can defend."
      >
        <div className="relative">
          {/* Horizontal waterline */}
          <div className="absolute top-8 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #D3E9F3, #19B5C9, #032AAC, #19B5C9, #D3E9F3)" }} />

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                title: "Capture on deck",
                desc: "Surveyor picks ullage or sounding for each tank. Readings turn into volume via the vessel strapping table. Works offline for 72 hours.",
              },
              {
                step: "02",
                title: "Calculate and check",
                desc: "Net volume minus free water. ASTM Table 54B correction factor applied. Each tank checked individually. Failures shown inline.",
              },
              {
                step: "03",
                title: "Lock and issue proof",
                desc: "Supervisor reviews. Finalised survey is immutable. PDF and Excel certificates exported. Clients receive proof without a login.",
              },
            ].map((item) => (
              <div key={item.step} className="relative pt-12">
                {/* Step number on the waterline */}
                <div
                  className="absolute top-0 left-0 w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-xl"
                  style={{
                    background: "linear-gradient(135deg, #032AAC, #1B4FD1)",
                    color: "#fff",
                    boxShadow: "0 4px 16px rgba(3,42,172,0.2)",
                  }}
                >
                  {item.step}
                </div>
                <h3 className="font-display text-lg font-bold text-abyss-900 mt-4">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(3,16,56,0.6)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <WaveDivider
        layers={2}
        colors={["#F7FBFD", "#EAF4F9"]}
        height={80}
        direction="down"
      />

      {/* ──────────── PLATFORM PREVIEW + LOCK STORY ──────────── */}
      <Section
        eyebrow="Platform"
        title="Real-time visibility across every survey job"
        lede="Search by ship name, IMO, port, date, or BDN. Track progress through Draft, Calculated, Under Review, Finalised."
        bg="mist"
      >
        {/* Browser frame mock */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            border: "1px solid #D3E9F3",
            boxShadow: "0 8px 48px rgba(3,16,56,0.06)",
          }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: "rgba(234,244,249,0.6)" }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "#D3E9F3" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#D3E9F3" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#D3E9F3" }} />
            </div>
            <div
              className="flex-1 mx-4 rounded-lg px-3 py-1.5 text-xs font-mono"
              style={{ background: "rgba(255,255,255,0.6)", color: "rgba(3,16,56,0.3)" }}
            >
              app.spacebqs.example/bqs/surveys
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-6 space-y-4" style={{ background: "#fff" }}>
            {/* Lifecycle chips */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "DRAFT", color: "rgba(3,16,56,0.08)", text: "rgba(3,16,56,0.5)" },
                { label: "CALCULATED", color: "rgba(25,181,201,0.1)", text: "#19B5C9" },
                { label: "UNDER REVIEW", color: "rgba(3,42,172,0.08)", text: "#032AAC" },
                { label: "FINALISED", color: "rgba(3,42,172,0.12)", text: "#032AAC", bold: true },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className={`rounded-full px-3 py-1.5 text-[11px] ${chip.bold ? "font-bold" : "font-medium"}`}
                  style={{ background: chip.color, color: chip.text }}
                >
                  {chip.label}
                </span>
              ))}
            </div>

            {/* Mock survey rows */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid #D3E9F3" }}
            >
              {[
                { survey: "BQS-2026-0142", vessel: "Pacific Mariner", status: "FINALISED", mt: "457.819" },
                { survey: "BQS-2026-0141", vessel: "Atlantic Pioneer", status: "UNDER REVIEW", mt: "312.450" },
                { survey: "BQS-2026-0140", vessel: "Nordic Spirit", status: "CALCULATED", mt: "628.102" },
              ].map((row, i) => (
                <div
                  key={row.survey}
                  className="flex items-center justify-between px-4 py-3 text-xs"
                  style={{ borderBottom: i < 2 ? "1px solid rgba(211,233,243,0.5)" : "none" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-medium text-abyss-900">{row.survey}</span>
                    <span style={{ color: "rgba(3,16,56,0.5)" }}>{row.vessel}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        background: row.status === "FINALISED" ? "rgba(3,42,172,0.1)" : "rgba(25,181,201,0.1)",
                        color: row.status === "FINALISED" ? "#032AAC" : "#19B5C9",
                      }}
                    >
                      {row.status}
                    </span>
                    <span className="font-mono font-bold text-marine-700">{row.mt} MT</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <WaveDivider
        layers={2}
        colors={["#EAF4F9", "#D3E9F3"]}
        height={80}
        direction="down"
      />

      {/* ──────────── MOBILE PREVIEW ──────────── */}
      <Section
        eyebrow="Deck tool"
        title="Built for the vessel deck, not the office desk"
        lede="Surveyors scan the vessel QR code, follow a 3-step wizard, and calculate offline with a 72-hour lease."
      >
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Phone mock */}
          <div className="flex justify-center">
            <div
              className="w-[280px] rounded-[40px] p-3 relative"
              style={{
                background: "#031038",
                boxShadow: "0 24px 80px rgba(3,16,56,0.15)",
              }}
            >
              <div className="rounded-[28px] overflow-hidden" style={{ background: "#F7FBFD" }}>
                {/* Status bar */}
                <div className="px-4 py-2 flex justify-between text-[10px] font-medium" style={{ color: "rgba(3,16,56,0.4)" }}>
                  <span>9:41</span>
                  <span>BQS App</span>
                </div>

                {/* App content */}
                <div className="px-4 pb-6 space-y-3">
                  <h4 className="font-display text-base font-bold text-abyss-900">New Survey</h4>

                  {/* Step indicators */}
                  <div className="flex gap-2">
                    {["Ship", "Fuel", "Tanks"].map((step, i) => (
                      <div
                        key={step}
                        className="flex-1 rounded-lg py-1.5 text-center text-[10px] font-medium"
                        style={{
                          background: i === 0 ? "#032AAC" : "rgba(211,233,243,0.5)",
                          color: i === 0 ? "#fff" : "rgba(3,16,56,0.4)",
                        }}
                      >
                        {step}
                      </div>
                    ))}
                  </div>

                  {/* QR scan */}
                  <div
                    className="rounded-2xl p-4 text-center"
                    style={{ border: "2px dashed #D3E9F3" }}
                  >
                    <svg className="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#032AAC" strokeWidth="1.5">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="3" height="3" />
                      <rect x="18" y="18" width="3" height="3" />
                    </svg>
                    <p className="text-[11px] font-medium text-abyss-900">Scan vessel QR</p>
                    <p className="text-[10px]" style={{ color: "rgba(3,16,56,0.4)" }}>IMO 7-digit verified</p>
                  </div>

                  {/* Offline badge */}
                  <div
                    className="rounded-xl p-2.5 flex items-center gap-2 text-[11px]"
                    style={{ background: "rgba(25,181,201,0.08)", border: "1px solid rgba(25,181,201,0.15)" }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: "#19B5C9" }} />
                    <span className="font-medium" style={{ color: "#19B5C9" }}>Offline ready · 72 h lease</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features grid */}
          <div className="space-y-4">
            {[
              { title: "QR code vessel lock", desc: "Scans vessel IMO particulars. Rejects anything that is not a valid 7-digit IMO." },
              { title: "1-second autosave", desc: "Drafts save locally on every keystroke. Battery loss or app close never loses a measurement." },
              { title: "72-hour offline lease", desc: "Full calculation autonomy at sea. Lease expiry blocks writes but never deletes data." },
              { title: "Supervisor review gating", desc: "Surveyors submit from deck. Only supervisors can finalise and issue locked certificates." },
            ].map((feat) => (
              <div
                key={feat.title}
                className="rounded-2xl p-5"
                style={{ background: "rgba(234,244,249,0.4)", border: "1px solid #D3E9F3" }}
              >
                <h4 className="font-display font-bold text-abyss-900 text-sm">{feat.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "rgba(3,16,56,0.6)" }}>
                  {feat.desc}
                </p>
              </div>
            ))}

            <p className="text-xs italic" style={{ color: "rgba(3,16,56,0.4)" }}>
              Photos and signatures are on the roadmap.
            </p>
          </div>
        </div>
      </Section>

      {/* ──────────── TEMPERATURE ANSWER BLOCK (marine band) ──────────── */}
      <WaveDivider
        layers={4}
        colors={["#A5D3E8", "#4E8DEB", "#1B4FD1", "#032AAC"]}
        height={120}
        direction="down"
      />

      <section
        className="relative py-20 lg:py-28"
        style={{
          background: "linear-gradient(180deg, #032AAC 0%, #031038 100%)",
        }}
      >
        {/* Faint aqua glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(25,181,201,0.08) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 bg-grid-marine pointer-events-none" />

        <div className="relative mx-auto max-w-[1200px] px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: "rgba(25,181,201,0.8)" }}>
              Why temperature correction matters
            </p>
            <h2 className="font-display text-2xl font-bold sm:text-3xl lg:text-4xl text-white tracking-tight">
              Hot fuel looks like more fuel
            </h2>
            <div
              className="rounded-2xl p-6 text-left"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "#19B5C9" }}>
                In short
              </p>
              <p className="leading-relaxed" style={{ color: "rgba(247,251,253,0.78)" }}>
                Marine fuel expands when heated and shrinks when cooled. The engine corrects observed volume to standard 15°C using ASTM D1250-04 Table 54B. Worked example: density 0.9500 at 40°C gives VCF 0.9677, producing 457.819 MT. Clients pay for mass, not expanded litres.
              </p>
            </div>
            <Link
              href="/how-we-measure"
              className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-lagoon-500 transition-colors"
            >
              Read how the engine calculates step-by-step
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 7h8M8 4l3 3-3 3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <WaveDivider
        layers={4}
        colors={["#032AAC", "#1B4FD1", "#4E8DEB", "#A5D3E8"]}
        height={120}
        direction="up"
      />

      {/* ──────────── SAMPLE REPORT TEASER ──────────── */}
      <Section
        eyebrow="Deliverables"
        title="What your surveyors issue and your clients defend"
        lede="Dual export package upon supervisory sign-off: an executive PDF certificate and a 4-sheet analytical Excel workbook."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              type: "PDF",
              title: "BQS Inspection Certificate",
              badge: "A4 Standard",
              desc: "Survey reference BQS-YYYY-0001, vessel IMO, port, grade, BDN reference. Tank-by-tank table with metric tonnes, calculation timestamps, and tamper-proof fingerprint.",
              link: { href: "/sample-report", label: "View certificate layout" },
            },
            {
              type: "Excel",
              title: "4-Sheet Audit Workbook",
              badge: "Claims Grade",
              desc: "Sheet 1: Survey particulars. Sheet 2: Raw tank readings and water cuts. Sheet 3: Table 54B VCF factor steps. Sheet 4: Complete immutable audit log with table revisions.",
              link: { href: "/features/calculation-audit", label: "Inspect audit specification" },
            },
          ].map((doc) => (
            <div
              key={doc.type}
              className="rounded-3xl p-6 card-hover"
              style={{ background: "#fff", border: "1px solid #D3E9F3" }}
            >
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: "#D3E9F3" }}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{
                      background: doc.type === "PDF" ? "rgba(3,42,172,0.08)" : "rgba(25,181,201,0.08)",
                      color: doc.type === "PDF" ? "#032AAC" : "#19B5C9",
                    }}
                  >
                    {doc.type}
                  </div>
                  <span className="font-display font-bold text-abyss-900">{doc.title}</span>
                </div>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                  style={{
                    background: "rgba(3,42,172,0.06)",
                    color: "#032AAC",
                  }}
                >
                  {doc.badge}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(3,16,56,0.6)" }}>
                {doc.desc}
              </p>
              <Link
                href={doc.link.href}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-marine-700 hover:gap-2.5 transition-all"
              >
                {doc.link.label}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 7h8M8 4l3 3-3 3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <WaveDivider
        layers={2}
        colors={["#F7FBFD", "#EAF4F9"]}
        height={80}
        direction="down"
      />

      {/* ──────────── PRICING TEASER ──────────── */}
      <Section
        eyebrow="Pricing"
        title="Per-team licence. No per-survey fees."
        lede="All certificate and Excel exports included. We quote based on surveyors, vessels, and monthly volume."
        bg="mist"
      >
        <div
          className="rounded-3xl p-8 text-center"
          style={{
            background: "rgba(255,255,255,0.7)",
            border: "1px solid #D3E9F3",
          }}
        >
          <p className="text-sm" style={{ color: "rgba(3,16,56,0.6)" }}>
            Contact us with your team size and monthly survey volume. We reply with a transparent quote.
          </p>
          <div className="mt-6">
            <CtaRow className="justify-center" />
          </div>
        </div>
      </Section>

      <WaveDivider
        layers={2}
        colors={["#EAF4F9", "#D3E9F3"]}
        height={80}
        direction="down"
      />

      {/* ──────────── RESOURCES ×3 ──────────── */}
      <Section
        eyebrow="Resources"
        title="Plain-English guides for surveyors and operators"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              href: "/resources/what-is-bunker-quantity-survey",
              title: "What is a Bunker Quantity Survey?",
              desc: "Why independent attendance is necessary during custody transfer and how teams compare physical tanks against the supplier BDN.",
              time: "5 min read",
            },
            {
              href: "/resources/ullage-vs-sounding",
              title: "Ullage vs. Sounding",
              desc: "Top-down ullage measurement versus bottom-up sounding, and how the system prevents table mismatch errors.",
              time: "4 min read",
            },
            {
              href: "/resources/temperature-correction-explained",
              title: "Temperature Correction Explained",
              desc: "How fuel expands when heated, why Table 54B matters, and the worked 0.9500 at 40°C example.",
              time: "6 min read",
            },
          ].map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group rounded-3xl p-6 card-hover"
              style={{
                background: "#fff",
                border: "1px solid #D3E9F3",
              }}
            >
              <div className="flex items-center gap-2 text-[10px] font-medium mb-3" style={{ color: "rgba(3,16,56,0.4)" }}>
                <span>{guide.time}</span>
                <span>·</span>
                <span>Last updated Oct 2026</span>
              </div>
              <h4 className="font-display font-bold text-abyss-900 text-base group-hover:text-marine-700 transition-colors">
                {guide.title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: "rgba(3,16,56,0.6)" }}>
                {guide.desc}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-marine-700 group-hover:gap-2 transition-all">
                Read guide
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 7h8M8 4l3 3-3 3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <WaveDivider
        layers={2}
        colors={["#F7FBFD", "#EAF4F9"]}
        height={80}
        direction="down"
      />

      {/* ──────────── FAQ ──────────── */}
      <Section
        eyebrow="FAQ"
        title="Common questions"
      >
        <div className="max-w-3xl">
          <Faq items={FAQ} />
        </div>
      </Section>

      {/* ──────────── PILOT CTA (deep marine band) ──────────── */}
      <WaveDivider
        layers={4}
        colors={["#A5D3E8", "#4E8DEB", "#1B4FD1", "#032AAC"]}
        height={120}
        direction="down"
      />

      <section
        className="relative py-24 lg:py-32"
        style={{
          background: "linear-gradient(180deg, #032AAC 0%, #031038 100%)",
        }}
      >
        {/* Water Impact behind */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <RippleField
            color1="#FFFFFF"
            color2="#19B5C9"
            opacity={0.14}
            ringCount={3}
            maxRadius={480}
            dropFrequency={2600}
            shape="circle"
          />
        </div>

        <div className="absolute inset-0 bg-grid-marine pointer-events-none" />

        <div className="relative mx-auto max-w-[1200px] px-4 text-center space-y-6">
          <WeightText
            tag="h2"
            mode="scroll-reveal"
            restWeight={300}
            activeWeight={800}
            activeColor="#FFFFFF"
            baseColor="rgba(247,251,253,0.6)"
            accentColor="#19B5C9"
            className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight mx-auto max-w-2xl"
          >
            Evaluate Space BQS with your survey team.
          </WeightText>

          <p className="max-w-xl mx-auto" style={{ color: "rgba(247,251,253,0.65)" }}>
            We provide a 20-minute walkthrough, import your vessels&apos; strapping tables, and let your field surveyors run real jobs in a pilot environment.
          </p>

          <div className="pt-4 flex justify-center">
            <a href="/request-demo" className="btn-white">
              Request a demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
