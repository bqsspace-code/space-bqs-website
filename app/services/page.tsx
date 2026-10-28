import type { Metadata } from "next";
import Link from "next/link";
import { Section, AnswerBlock, CtaRow, Faq, Breadcrumbs } from "../components/ui";
import WaveDivider from "../components/WaveDivider";
import { ServiceLinks } from "../components/MarketingPage";

export const metadata: Metadata = {
  title: "Bunker Survey Workflows — Delivery, ROB, Debunkering",
  description:
    "Bunker survey workflows plus data migration and public-cloud, private-cloud, and on-premises implementation services.",
};

export default function Page() {
  return (
    <div>
      {/* Hero */}
      <section
        className="pt-24 pb-16"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 20%, #FFFFFF 0%, #EAF4F9 50%, #D3E9F3 100%)",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-4">
          <Breadcrumbs trail={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }]} />
          <h1 className="font-display mt-4 text-3xl font-bold text-abyss-900 sm:text-4xl lg:text-5xl tracking-tight">
            Workflows and implementation services
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed" style={{ color: "rgba(3,16,56,0.68)" }}>
            Three workflows in one system for survey firms. Quantity-only — no lab testing.
          </p>

          <div className="mt-8">
            <AnswerBlock>
              <p>
                Each workflow uses the same ASTM D1250-04 Table 54B engine and produces the same locked, immutable certificate.
                The only difference is what your surveyor measures: fuel in (delivery), fuel already on board (ROB), or fuel removed (debunkering).
              </p>
            </AnswerBlock>
          </div>
        </div>
      </section>

      <Section eyebrow="Implementation services" title="Move your data. Choose your environment." lede="Support for Space BQS and separately scoped Cargo WMS implementations."><ServiceLinks /></Section>

      {/* Comparison table */}
      <Section eyebrow="Compare" title="Which workflow does the job need?">
        <div className="overflow-x-auto">
          <table
            className="w-full min-w-[640px] text-sm"
            style={{ borderCollapse: "separate", borderSpacing: 0 }}
          >
            <thead>
              <tr>
                <th className="text-left px-4 py-3 font-display font-bold text-abyss-900 border-b" style={{ borderColor: "#D3E9F3" }}>Workflow</th>
                <th className="text-left px-4 py-3 font-display font-bold text-abyss-900 border-b" style={{ borderColor: "#D3E9F3" }}>When your team runs it</th>
                <th className="text-left px-4 py-3 font-display font-bold text-abyss-900 border-b" style={{ borderColor: "#D3E9F3" }}>What they record</th>
                <th className="text-left px-4 py-3 font-display font-bold text-abyss-900 border-b" style={{ borderColor: "#D3E9F3" }}>Client gets</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  href: "/services/bunker-delivery-survey",
                  name: "Bunker delivery",
                  when: "Fuel is being supplied to the ship",
                  records: "Tanks before + after, temperature, water, BDN noted",
                  gets: "Delivery certificate vs BDN",
                },
                {
                  href: "/services/rob-survey",
                  name: "ROB / On-Off hire",
                  when: "Charter starts or ends",
                  records: "All fuel on board at that moment",
                  gets: "ROB certificate for settlement",
                },
                {
                  href: "/services/debunkering-survey",
                  name: "Debunkering",
                  when: "Fuel must be removed",
                  records: "Tanks before + after removal",
                  gets: "Removed-quantity certificate",
                },
              ].map((row) => (
                <tr key={row.href} className="group">
                  <td className="px-4 py-3 border-b" style={{ borderColor: "rgba(211,233,243,0.5)" }}>
                    <Link
                      href={row.href}
                      className="font-semibold text-marine-700 hover:underline"
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 border-b" style={{ borderColor: "rgba(211,233,243,0.5)", color: "rgba(3,16,56,0.6)" }}>{row.when}</td>
                  <td className="px-4 py-3 border-b" style={{ borderColor: "rgba(211,233,243,0.5)", color: "rgba(3,16,56,0.6)" }}>{row.records}</td>
                  <td className="px-4 py-3 border-b" style={{ borderColor: "rgba(211,233,243,0.5)", color: "rgba(3,16,56,0.6)" }}>{row.gets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <CtaRow />
        </div>
      </Section>

      <WaveDivider
        layers={2}
        colors={["#D3E9F3", "#EAF4F9"]}
        height={75}
        direction="up"
      />

      {/* FAQ */}
      <Section eyebrow="FAQ" title="Services questions">
        <div className="max-w-3xl">
          <Faq items={[
            { q: "Do you provide surveyors?", a: "No. Survey firms run jobs with their teams; Space BQS is the software they run on." },
            { q: "Do you test fuel quality?", a: "No. Quantity-only. No lab, no sludge, no sampling for quality." },
            { q: "Can teams run on/off-hire as a pair?", a: "Yes. Each leg gets its own locked record. Keep both certificates with bunker receipts." },
          ]} />
        </div>
      </Section>
    </div>
  );
}
