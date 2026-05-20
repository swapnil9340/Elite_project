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
          "/admin",
          "/admin/",
        ],
      },
      // No crawlDelay for Googlebot/Bingbot — they ignore it anyway,
      // and any restriction makes Search Console report a "Crawl rate" warning.
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "YandexBot", allow: "/" },
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
    // Only declare actual XML sitemaps here.
    // RSS/Atom feeds are NOT sitemaps — Google tries to treat them as such
    // and reports "Discovered - currently not indexed" for every URL inside
    // them, polluting Search Console. RSS feeds remain discoverable via
    // <link rel="alternate"> tags in <head>.
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap/0.xml`,
      `${SITE_URL}/sitemap/1.xml`,
      `${SITE_URL}/sitemap/2.xml`,
      `${SITE_URL}/sitemap/3.xml`,
      `${SITE_URL}/sitemap/4.xml`,
      `${SITE_URL}/sitemap/5.xml`,
    ],
    host: SITE_URL,
  };
}
