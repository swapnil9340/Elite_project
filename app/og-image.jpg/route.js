// Dynamic Open Graph / social-share image served at /og-image.jpg.
// Generated with Next's built-in next/og (Satori) — no external image library
// needed, no binary asset to commit. Fixes the previous 404 that broke every
// WhatsApp / Google / Twitter link preview (metadata + LocalBusiness/Article
// JSON-LD all reference /og-image.jpg).

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
// Cache hard at the CDN — the image is static branding, regenerate rarely.
const CACHE = "public, max-age=86400, s-maxage=604800, immutable";

export async function GET() {
  const res = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background:
            "linear-gradient(135deg, #070b14 0%, #0b1224 55%, #131a30 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand mark + name */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
          <svg width="120" height="120" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="55%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <rect width="64" height="64" rx="14" fill="#0b1224" />
            <g transform="translate(6,6)">
              <path
                d="M26 0 L52 8 V28 C52 42 40 50 26 52 C12 50 0 42 0 28 V8 Z"
                fill="url(#g1)"
              />
              <path
                d="M26 38 C18 32 10 26 10 19 C10 14.5 13.5 11 18 11 C21 11 23.5 12.5 26 15.5 C28.5 12.5 31 11 34 11 C38.5 11 42 14.5 42 19 C42 26 34 32 26 38 Z"
                fill="url(#g2)"
              />
              <path
                d="M19 23 L24 28 L34 18"
                stroke="#ffffff"
                strokeWidth="2.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 32 }}>
            <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -1 }}>
              Safe Companion India
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: 8,
                color: "#9aa3b2",
                marginTop: 6,
              }}
            >
              VERIFIED · DISCREET · 50+ CITIES
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.2, maxWidth: 980 }}>
          Genuine Verified Male Companion Service
        </div>

        {/* Sub-line */}
        <div style={{ fontSize: 30, color: "#cbd5e1", marginTop: 24 }}>
          Transparent pricing · No hidden charges · Book on WhatsApp 24/7
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
  res.headers.set("Cache-Control", CACHE);
  return res;
}
