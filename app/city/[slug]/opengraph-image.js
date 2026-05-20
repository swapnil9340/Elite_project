import { ImageResponse } from "next/og";
import { getCityBySlug } from "../../data/cities";

// Next.js auto-generates per-city OG image at /city/[slug]/opengraph-image
// → Better social share previews (WhatsApp, Telegram, FB, Twitter)
// → Higher CTR when site is shared = ranking boost

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = "Safe Companion India — City Page";

export default async function Image({ params }) {
  const city = getCityBySlug(params.slug);
  const cityName = city?.name || "India";
  const stateName = city?.state || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #070b14 0%, #1a0b2e 50%, #0f1a2f 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "56px",
              fontWeight: 900,
            }}
          >
            S
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              opacity: 0.9,
            }}
          >
            Safe Companion India
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "20px",
            color: "#ffffff",
          }}
        >
          Best Male Service in {cityName}
        </div>

        {/* Subhead */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: 600,
            background:
              "linear-gradient(135deg, #3b82f6, #ec4899)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "30px",
          }}
        >
          {stateName ? `${stateName} · ` : ""}Verified · Discreet · 24/7
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 500,
            opacity: 0.75,
          }}
        >
          Top Gigolo · Playboy · Callboy · Male Escort
        </div>

        {/* Footer badge */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "60px",
            left: "80px",
            fontSize: "24px",
            fontWeight: 600,
            color: "#10b981",
          }}
        >
          💬 WhatsApp · ✈️ Telegram · 📞 Call · No Hidden Charges
        </div>
      </div>
    ),
    { ...size }
  );
}
