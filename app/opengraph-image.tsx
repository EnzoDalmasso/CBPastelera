import { ImageResponse } from "next/og";
import { business } from "@/data/business";

export const alt = `${business.name} | ${business.tagline}`;
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
          alignItems: "center",
          justifyContent: "center",
          background: "#f9f4ec",
          color: "#2e1e17",
          border: "18px solid #412b21",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#92623b",
          }}
        >
          {business.tagline}
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 128, letterSpacing: -4 }}>
          {business.name}
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#6a5244" }}>
          {`Pedidos y consultas por WhatsApp · @${business.instagram.handle}`}
        </div>
      </div>
    ),
    size,
  );
}
