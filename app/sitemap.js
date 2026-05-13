import { services } from "./data/services";
import { cities } from "./data/cities";
import { posts } from "./data/blog";
import { jobs } from "./data/jobs";
import { forWomenCities } from "./data/forWomen";

const SITE_URL = "https://www.safecompanion.in";

// Split into 6 chunks so Google can fetch + index in parallel.
// Each chunk has a focused content theme — better crawl efficiency.
// 0 = main pages, 1 = services, 2 = cities, 3 = city-service combos,
// 4 = blog, 5 = jobs + for-women
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
    // Main static pages — highest priority
    return [
      { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
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
    return cities.map((c) => ({
      url: `${SITE_URL}/city/${c.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    }));
  }

  if (id === 3) {
    const entries = [];
    for (const c of cities) {
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
      priority: 0.75,
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
      ...forWomenCities.map((c) => ({
        url: `${SITE_URL}/for-women/${c.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.95,
      })),
    ];
  }

  return [];
}
