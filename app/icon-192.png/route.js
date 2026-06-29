// Raster (PNG) favicon served at a stable URL /icon-192.png.
// Generated with next/og (Satori) — no external image library, no binary commit.
// Google Search prefers a raster, square favicon (≥48px) for the search-result
// icon; an SVG-only favicon is supported but picked up far less reliably.
// Older browsers that ignore SVG favicons also fall back to this.

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
const CACHE = "public, max-age=86400, s-maxage=604800, immutable";

export async function GET() {
  const res = new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <svg width="192" height="192" viewBox="0 0 64 64">
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
      </div>
    ),
    { width: 192, height: 192 }
  );
  res.headers.set("Cache-Control", CACHE);
  return res;
}
