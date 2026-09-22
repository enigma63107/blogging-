import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.name;

// The social card for the site itself — shown when someone shares the homepage
// or any page without its own image.
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 24,
        background: "#fbfbfd",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 76,
          fontWeight: 700,
          color: "#18181b",
          letterSpacing: "-0.02em",
        }}
      >
        {site.name}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 30,
          color: "#6b7280",
          maxWidth: 900,
        }}
      >
        {site.description}
      </div>
    </div>,
    size,
  );
}
