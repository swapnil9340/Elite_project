import { ImageResponse } from "next/og";
import { getCityBySlug } from "../../../data/cities";
import { getServiceBySlug } from "../../../data/services";

// Per-combo dynamic OG image — 320 unique social-share images auto-generated.

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = "Safe Companion India — Service Page";

export default async function Image({ params }) {
  const city = getCityBySlug(params.slug);
  const service = getServiceBySlug(params.service);
  const cityName = city?.name || "India";
  const serviceName = service?.name || "Companion Service";

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

        <div
          style={{
            fontSize: "60px",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "16px",
            color: "#ffffff",
          }}
        >
          Best {serviceName}
        </div>
        <div
          style={{
            fontSize: "60px",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "30px",
            background:
              "linear-gradient(135deg, #3b82f6, #ec4899)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          in {cityName}
        </div>

        <div
          style={{
            fontSize: "30px",
            fontWeight: 500,
            opacity: 0.8,
          }}
        >
          Verified · Discreet · Transparent Pricing
        </div>

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
          💬 WhatsApp · ✈️ Telegram · 24/7
        </div>
      </div>
    ),
    { ...size }
  );
}
