"use client";

import RippleField from "./RippleField";

/**
 * Hero certificate card — light glass card with 457.819 MT.
 * White at 80% opacity, hairline #D3E9F3 border.
 * RippleField behind for ambient water impact.
 */
export default function HeroCertificateMock() {
  return (
    <div className="relative">
      {/* Ambient ripples behind */}
      <div className="absolute inset-0 -m-8 pointer-events-none">
        <RippleField
          color1="#19B5C9"
          color2="#032AAC"
          opacity={0.18}
          ringCount={3}
          maxRadius={360}
          ringWidth={1.5}
          duration={3200}
          dropFrequency={2200}
          shape="circle"
        />
      </div>

      {/* Glass certificate card */}
      <div
        className="relative rounded-3xl p-6 sm:p-8 overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.80)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid #D3E9F3",
          boxShadow: "0 8px 40px rgba(3, 16, 56, 0.06), 0 1px 3px rgba(3, 42, 172, 0.04)",
        }}
      >
        {/* Soft ambient glow */}
        <div
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(25,181,201,0.08) 0%, transparent 70%)" }}
        />

        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: "#D3E9F3" }}>
          <div className="flex items-center gap-2">
            <span
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
              style={{
                background: "rgba(3, 42, 172, 0.06)",
                color: "#032AAC",
                border: "1px solid rgba(3, 42, 172, 0.1)",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" fill="#032AAC" />
              </svg>
              FINALISED
            </span>
            <span className="font-mono text-xs" style={{ color: "rgba(3,16,56,0.4)" }}>
              #BQS-2026-0142
            </span>
          </div>
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: "rgba(255, 106, 61, 0.08)",
              color: "#FF6A3D",
              border: "1px solid rgba(255, 106, 61, 0.15)",
            }}
          >
            Locked
          </span>
        </div>

        {/* Certificate header */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-marine-700">
              BQS Inspection Certificate
            </p>
            <h3 className="font-display text-lg font-bold text-abyss-900 mt-0.5">
              M/V PACIFIC MARINER
            </h3>
            <p className="font-mono text-xs" style={{ color: "rgba(3,16,56,0.5)" }}>
              IMO 9412345 · Singapore (Eastern Anc)
            </p>
          </div>

          {/* Big number */}
          <div
            className="rounded-2xl p-4 text-right"
            style={{
              background: "rgba(3, 42, 172, 0.04)",
              border: "1px solid rgba(3, 42, 172, 0.08)",
            }}
          >
            <p className="text-[11px]" style={{ color: "rgba(3,16,56,0.5)" }}>Certified Net Mass</p>
            <p
              className="font-display text-3xl font-black tracking-tight"
              style={{
                color: "#032AAC",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              457.819 MT
            </p>
            <p className="font-mono text-[10px]" style={{ color: "rgba(3,16,56,0.4)" }}>
              VCF 0.9677 · Engine v1.0.0
            </p>
          </div>
        </div>

        {/* Key parameters */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: "Fuel Grade", value: "VLSFO" },
            { label: "Density @ 15°C", value: "0.9500 kg/L", mono: true },
            { label: "Avg Temp", value: "40.0°C", mono: true },
            { label: "Mass Basis", value: "In Air" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl p-2.5"
              style={{ background: "rgba(234, 244, 249, 0.6)" }}
            >
              <span className="text-[10px] block" style={{ color: "rgba(3,16,56,0.4)" }}>
                {item.label}
              </span>
              <span
                className={`text-xs font-semibold text-abyss-900 ${item.mono ? "font-mono" : ""}`}
                style={{ fontVariantNumeric: item.mono ? "tabular-nums" : undefined }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Mini tank table */}
        <div
          className="mt-4 rounded-2xl overflow-hidden"
          style={{
            border: "1px solid #D3E9F3",
          }}
        >
          <div
            className="px-3 py-2 text-[11px] font-semibold flex justify-between items-center"
            style={{ background: "rgba(234, 244, 249, 0.5)", color: "rgba(3,16,56,0.6)" }}
          >
            <span>TANK-BY-TANK (SOUNDING)</span>
            <span className="text-lagoon-500 text-[10px]">Water Deducted</span>
          </div>
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr style={{ borderBottom: "1px solid #D3E9F3" }}>
                <th className="px-3 py-2 font-medium" style={{ color: "rgba(3,16,56,0.4)" }}>Tank</th>
                <th className="px-2 py-2 font-medium" style={{ color: "rgba(3,16,56,0.4)" }}>Sounding</th>
                <th className="px-2 py-2 font-medium" style={{ color: "rgba(3,16,56,0.4)" }}>Obs Vol</th>
                <th className="px-2 py-2 font-medium" style={{ color: "rgba(3,16,56,0.4)" }}>VCF</th>
                <th className="px-3 py-2 text-right font-medium" style={{ color: "rgba(3,16,56,0.4)" }}>MT</th>
              </tr>
            </thead>
            <tbody className="font-mono" style={{ fontVariantNumeric: "tabular-nums" }}>
              <tr style={{ borderBottom: "1px solid rgba(211,233,243,0.5)" }}>
                <td className="px-3 py-2 font-medium text-abyss-900">1P (FO)</td>
                <td className="px-2 py-2" style={{ color: "rgba(3,16,56,0.6)" }}>4.250 m</td>
                <td className="px-2 py-2" style={{ color: "rgba(3,16,56,0.6)" }}>245.10 m³</td>
                <td className="px-2 py-2" style={{ color: "rgba(3,16,56,0.6)" }}>0.9677</td>
                <td className="px-3 py-2 text-right font-bold text-marine-700">225.567</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-abyss-900">1S (FO)</td>
                <td className="px-2 py-2" style={{ color: "rgba(3,16,56,0.6)" }}>4.380 m</td>
                <td className="px-2 py-2" style={{ color: "rgba(3,16,56,0.6)" }}>252.18 m³</td>
                <td className="px-2 py-2" style={{ color: "rgba(3,16,56,0.6)" }}>0.9677</td>
                <td className="px-3 py-2 text-right font-bold text-marine-700">232.252</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "1px solid #D3E9F3", background: "rgba(234,244,249,0.4)" }}>
                <td colSpan={4} className="px-3 py-2 text-[10px] uppercase tracking-wider" style={{ color: "rgba(3,16,56,0.5)" }}>
                  Total Corrected Quantity
                </td>
                <td className="px-3 py-2 text-right text-sm font-bold text-marine-700">457.819</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Verification footer */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t text-[11px]" style={{ borderColor: "#D3E9F3" }}>
          <div className="flex items-center gap-2" style={{ color: "rgba(3,16,56,0.5)" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L2 4V7C2 10.31 4.14 13.39 7 14C9.86 13.39 12 10.31 12 7V4L7 1Z" stroke="#032AAC" strokeWidth="1.2" fill="rgba(3,42,172,0.06)" />
              <path d="M5 7L6.5 8.5L9 5.5" stroke="#032AAC" strokeWidth="1.2" fill="none" />
            </svg>
            <span>Engine v1.0.0 · Table 54B</span>
          </div>
          <span className="font-mono text-[10px]" style={{ color: "rgba(3,16,56,0.3)" }}>
            Density 0.9500 at 40°C · VCF 0.9677
          </span>
        </div>
      </div>
    </div>
  );
}
