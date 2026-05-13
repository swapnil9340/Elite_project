import { services } from "../../data/services";
import { cities } from "../../data/cities";
import {
  buildRss,
  staggeredDate,
  rssResponse,
} from "../../data/feedBuilder";

const SITE_URL = "https://www.safecompanion.in";

export function GET() {
  const items = [];

  // Service hub pages first
  for (const s of services) {
    items.push({
      title: `${s.name} — Verified Service Across India`,
      link: `${SITE_URL}/services/${s.slug}`,
      description: s.intro,
      content: s.intro,
      pubDate: staggeredDate(`service-${s.slug}`, 30),
      category: "Service",
    });
  }

  // Top 30 city × service combos (highest priority)
  const priorityCities = cities.slice(0, 30);
  for (const c of priorityCities) {
    for (const s of services) {
      items.push({
        title: `${s.name} in ${c.name} — Verified, Discreet`,
        link: `${SITE_URL}/city/${c.slug}/${s.slug}`,
        description: `Book a verified ${s.name.toLowerCase()} in ${c.name}, ${c.state}. ${s.intro}`,
        content: `${s.intro} Available across ${c.name}, ${c.state} with transparent pricing and complete discretion.`,
        pubDate: staggeredDate(`${c.slug}-${s.slug}`, 180),
        category: `${c.name} · ${s.name}`,
      });
    }
  }

  items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  const xml = buildRss({
    title: "Safe Companion India — Services & City Combinations",
    description:
      "Specialized service offerings: gigolo, playboy, callboy, male escort, boyfriend on rent, event companion, travel companion — across 40+ Indian cities.",
    selfPath: "/feed/services.xml",
    items: items.slice(0, 100),
    category: "Services",
  });

  return rssResponse(xml);
}
