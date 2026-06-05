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

      // ===== AI SEARCH BOTS — ALLOWED =====
      // These power Google AI Overviews, ChatGPT Search, Claude search,
      // Perplexity answers. Allowing them = our pages can appear inside
      // AI-generated answers (the new "AI search" surface area).
      { userAgent: "Google-Extended", allow: "/" },   // Google AI Overviews / Gemini
      { userAgent: "OAI-SearchBot", allow: "/" },     // ChatGPT Search results
      { userAgent: "ChatGPT-User", allow: "/" },      // ChatGPT user-triggered browsing
      { userAgent: "PerplexityBot", allow: "/" },     // Perplexity AI answers
      { userAgent: "Perplexity-User", allow: "/" },   // Perplexity user-triggered fetch
      { userAgent: "ClaudeBot", allow: "/" },         // Anthropic Claude
      { userAgent: "Claude-Web", allow: "/" },        // Claude web browsing
      { userAgent: "anthropic-ai", allow: "/" },      // Anthropic legacy UA
      { userAgent: "Applebot", allow: "/" },          // Apple Intelligence / Siri
      { userAgent: "Applebot-Extended", allow: "/" }, // Apple AI surfaces
      { userAgent: "Meta-ExternalAgent", allow: "/" },// Meta AI search
      { userAgent: "Amazonbot", allow: "/" },         // Amazon Alexa / Q
      { userAgent: "YouBot", allow: "/" },            // You.com AI search

      // ===== TRAINING-ONLY / LOW-VALUE SCRAPERS — STILL BLOCKED =====
      // Pure-training crawlers (no search surface) and SEO tool scrapers
      // waste crawl budget without driving any visitor traffic.
      { userAgent: "GPTBot", disallow: "/" },         // OpenAI training (separate from search)
      { userAgent: "CCBot", disallow: "/" },          // Common Crawl
      { userAgent: "Bytespider", disallow: "/" },     // ByteDance scraping
      { userAgent: "AhrefsBot", disallow: "/" },      // SEO tool
      { userAgent: "SemrushBot", disallow: "/" },     // SEO tool
      { userAgent: "MJ12bot", disallow: "/" },        // Majestic crawler
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
