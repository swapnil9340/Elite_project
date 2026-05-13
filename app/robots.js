const SITE_URL = "https://www.safecompanion.in";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/api/",
          "/_next/",
          "/private/",
          "/*?*", // block query-string URLs (don't waste crawl budget on params)
        ],
      },
      { userAgent: "Googlebot", allow: "/", crawlDelay: 1 },
      { userAgent: "Bingbot", allow: "/", crawlDelay: 1 },
      { userAgent: "YandexBot", allow: "/", crawlDelay: 2 },
      { userAgent: "DuckDuckBot", allow: "/" },
      { userAgent: "Baiduspider", allow: "/" },
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "Twitterbot", allow: "/" },
      // Block known AI/scraper bots that waste budget without benefit
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "AhrefsBot", disallow: "/" },
      { userAgent: "SemrushBot", disallow: "/" },
      { userAgent: "MJ12bot", disallow: "/" },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/feed.xml`,
    ],
    host: SITE_URL,
  };
}
