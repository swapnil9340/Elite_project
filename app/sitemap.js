import { services } from "./data/services";
import { cities } from "./data/cities";

const SITE_URL = "https://www.safecompanion.in";

export default function sitemap() {
  const lastModified = new Date();

  const staticEntries = [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/city`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/#services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/#features`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/#how-it-works`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/#testimonials`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/#faq`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/#connect`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const serviceEntries = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const cityEntries = cities.map((c) => ({
    url: `${SITE_URL}/city/${c.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const cityServiceEntries = [];
  for (const c of cities) {
    for (const s of services) {
      cityServiceEntries.push({
        url: `${SITE_URL}/city/${c.slug}/${s.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return [
    ...staticEntries,
    ...serviceEntries,
    ...cityEntries,
    ...cityServiceEntries,
  ];
}
