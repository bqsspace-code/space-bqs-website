import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#f7fbfd",
          background: "linear-gradient(135deg, #031038 0%, #073d50 58%, #032aac 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#a5d3e8", fontSize: 24, letterSpacing: 5 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ width: 34, height: 3, borderRadius: 5, background: "#ffffff" }} />
            <div style={{ width: 34, height: 3, borderRadius: 5, background: "#a5d3e8" }} />
            <div style={{ width: 34, height: 3, borderRadius: 5, background: "#19b5c9" }} />
          </div>
          <span>SPACE BQS</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.08, maxWidth: 960 }}>
            Bunker Quantity Survey Software
          </div>
          <div style={{ fontSize: 27, color: "#d3e9f3" }}>
            Mobile capture · Web review · PDF and Excel reports
          </div>
        </div>
        <div style={{ fontSize: 20, color: "#b9d3e8" }}>aibqs.com</div>
      </div>
    ),
    size,
  );
}
