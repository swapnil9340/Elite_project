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
      `${SITE_URL}/sitemap/0.xml`,
      `${SITE_URL}/sitemap/1.xml`,
      `${SITE_URL}/sitemap/2.xml`,
      `${SITE_URL}/sitemap/3.xml`,
      `${SITE_URL}/sitemap/4.xml`,
      `${SITE_URL}/sitemap/5.xml`,
      `${SITE_URL}/feed.xml`,
      `${SITE_URL}/feed/blog.xml`,
      `${SITE_URL}/feed/cities.xml`,
      `${SITE_URL}/feed/services.xml`,
      `${SITE_URL}/feed/jobs.xml`,
      `${SITE_URL}/atom.xml`,
    ],
    host: SITE_URL,
  };
}
