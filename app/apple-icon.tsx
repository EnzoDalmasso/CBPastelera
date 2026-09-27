import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#412b21",
          color: "#f9f4ec",
          fontSize: 76,
          fontStyle: "italic",
          fontFamily: "serif",
          letterSpacing: -2,
        }}
      >
        CB
      </div>
    ),
    size,
  );
}
