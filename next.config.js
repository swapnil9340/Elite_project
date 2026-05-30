/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // SEO / performance basics
  compress: true,            // gzip/brotli responses
  poweredByHeader: false,    // remove "X-Powered-By: Next.js" header
  trailingSlash: false,      // canonical URLs without trailing slash
  generateEtags: true,       // proper conditional caching for crawlers

  experimental: {
    // Windows + nested dynamic routes ([slug]/[service]) ke saath
    // jest-worker race condition fix.
    cpus: 1,
    workerThreads: false,

    // Tree-shake heavy MUI / emotion imports — smaller JS bundle, better LCP,
    // better Core Web Vitals → ranking boost.
    optimizePackageImports: [
      "@mui/material",
      "@mui/icons-material",
      "@emotion/react",
      "@emotion/styled",
    ],
  },

  // Custom headers — explicitly tell crawlers everything is indexable and
  // set aggressive cache for static assets (faster repeat visits = better UX
  // = better Web Vitals = better ranking).
  async headers() {
    return [
      {
        // Allow all crawlers everywhere by default.
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "all" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Long cache for Next.js static chunks (hashed, content-addressable).
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Sitemap chunks — short cache, daily revalidate so Google sees updates.
        source: "/sitemap/:path*.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" },
          { key: "X-Robots-Tag", value: "all" },
        ],
      },
      {
        // Main sitemap entry.
        source: "/sitemap.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" },
          { key: "X-Robots-Tag", value: "all" },
        ],
      },
      {
        // RSS feeds — encourage frequent revalidation for fresh items.
        source: "/feed/:path*.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=1800, s-maxage=3600" },
          { key: "X-Robots-Tag", value: "all" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
