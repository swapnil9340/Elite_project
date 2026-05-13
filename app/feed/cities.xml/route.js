import { cities } from "../../data/cities";
import { forWomenCities } from "../../data/forWomen";
import {
  buildRss,
  staggeredDate,
  rssResponse,
} from "../../data/feedBuilder";

const SITE_URL = "https://www.safecompanion.in";

export function GET() {
  const items = [];

  for (const c of forWomenCities) {
    items.push({
      title: c.title,
      link: `${SITE_URL}/for-women/${c.slug}`,
      description: c.metaDescription,
      content: `${c.tagline}. Areas: ${c.areas.join(", ")}.`,
      pubDate: staggeredDate(`forwomen-${c.slug}`, 20),
      category: "For Women",
    });
  }

  for (const c of cities) {
    items.push({
      title: `Male Companion Service in ${c.name} (${c.state}) — Verified & Discreet`,
      link: `${SITE_URL}/city/${c.slug}`,
      description: `Verified male escort, gigolo, playboy and callboy service in ${c.name}. No hidden charges. WhatsApp & Telegram booking 24/7.`,
      content: `Safe Companion India serves ${c.name}, ${c.state} with verified male companion options. Discreet bookings, transparent pricing, professional companions.`,
      pubDate: staggeredDate(`city-${c.slug}`, 90),
      category: "City",
    });
  }

  items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  const xml = buildRss({
    title: "Safe Companion India — City Coverage",
    description:
      "Male companion service across 40+ Indian cities. Updates on city coverage, area-wise availability, and local booking options.",
    selfPath: "/feed/cities.xml",
    items,
    category: "City Guides",
  });

  return rssResponse(xml);
}
