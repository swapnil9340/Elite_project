import { services } from "./data/services";
import { cities } from "./data/cities";
import { posts } from "./data/blog";
import { jobs } from "./data/jobs";
import { forWomenCities } from "./data/forWomen";

const SITE_URL = "https://www.safecompanion.in";

// Priority cities — get top sitemap slot, priority 1.0, daily crawl signal.
// Add a city slug here to give all its URLs (main + service combos + for-women)
// maximum indexing priority.
const PRIORITY_CITIES = ["bhopal", "indore", "delhi"];
const isPriority = (slug) => PRIORITY_CITIES.includes(slug);
// Subset of priority cities that ALSO have a /for-women/<slug> route.
const FORWOMEN_PRIORITY = new Set(["bhopal", "indore"]);

// Split into 7 chunks so Google can fetch + index in parallel.
// 0 = main pages + PRIORITY-CITY URLs (highest signal), 1 = services,
// 2 = remaining cities, 3 = remaining city-service combos,
// 4 = blog, 5 = jobs + for-women (non-priority), 6 = reserved
export async function generateSitemaps() {
  return [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];
}

export default function sitemap({ id }) {
  const lastModified = new Date();

  if (id === 0) {
    // Main static pages + ALL priority-city URLs — highest priority, daily crawl signal.
    const main = [
      { url: `${SITE_URL}/`, lastModified, changeFrequency: "daily", priority: 1.0 },
      { url: `${SITE_URL}/hi`, lastModified, changeFrequency: "weekly", priority: 0.95 },
      { url: `${SITE_URL}/for-women`, lastModified, changeFrequency: "weekly", priority: 0.95 },
      { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
      { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.9 },
      { url: `${SITE_URL}/services`, lastModified, changeFrequency: "weekly", priority: 0.9 },
      { url: `${SITE_URL}/city`, lastModified, changeFrequency: "weekly", priority: 0.9 },
      { url: `${SITE_URL}/blog`, lastModified, changeFrequency: "weekly", priority: 0.9 },
      { url: `${SITE_URL}/join`, lastModified, changeFrequency: "weekly", priority: 0.95 },
      { url: `${SITE_URL}/sitemap-html`, lastModified, changeFrequency: "weekly", priority: 0.7 },
      { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    ];

    // Priority city URLs — bumped to top sitemap with priority 1.0 and daily change frequency.
    const priorityCityUrls = [];
    for (const slug of PRIORITY_CITIES) {
      priorityCityUrls.push({
        url: `${SITE_URL}/city/${slug}`,
        lastModified,
        changeFrequency: "daily",
        priority: 1.0,
      });
      if (FORWOMEN_PRIORITY.has(slug)) {
        priorityCityUrls.push({
          url: `${SITE_URL}/for-women/${slug}`,
          lastModified,
          changeFrequency: "daily",
          priority: 1.0,
        });
      }
      for (const s of services) {
        priorityCityUrls.push({
          url: `${SITE_URL}/city/${slug}/${s.slug}`,
          lastModified,
          changeFrequency: "daily",
          priority: 0.95,
        });
      }
    }

    return [...main, ...priorityCityUrls];
  }

  if (id === 1) {
    return services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    }));
  }

  if (id === 2) {
    // Non-priority cities only — priority cities are already in chunk 0.
    return cities
      .filter((c) => !isPriority(c.slug))
      .map((c) => ({
        url: `${SITE_URL}/city/${c.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.85,
      }));
  }

  if (id === 3) {
    // Non-priority city × service combos only — priority ones are already in chunk 0.
    const entries = [];
    for (const c of cities) {
      if (isPriority(c.slug)) continue;
      for (const s of services) {
        entries.push({
          url: `${SITE_URL}/city/${c.slug}/${s.slug}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
    return entries;
  }

  if (id === 4) {
    return posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly",
      priority: p.city && isPriority(p.city) ? 0.95 : 0.75,
    }));
  }

  if (id === 5) {
    return [
      ...jobs.map((j) => ({
        url: `${SITE_URL}/join/${j.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.9,
      })),
      // Non-priority for-women cities only (priority ones already in chunk 0).
      ...forWomenCities
        .filter((c) => !isPriority(c.slug))
        .map((c) => ({
          url: `${SITE_URL}/for-women/${c.slug}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.95,
        })),
    ];
  }

  return [];
}
