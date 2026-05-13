import { services } from "../data/services";
import { posts } from "../data/blog";
import { jobs } from "../data/jobs";
import { forWomenCities } from "../data/forWomen";
import {
  buildAtom,
  staggeredDate,
  atomResponse,
} from "../data/feedBuilder";

const SITE_URL = "https://www.safecompanion.in";

export function GET() {
  const items = [
    ...forWomenCities.map((c) => ({
      title: c.title,
      link: `${SITE_URL}/for-women/${c.slug}`,
      description: c.metaDescription,
      content: c.tagline,
      pubDate: staggeredDate(`forwomen-${c.slug}`, 30),
      category: "For Women",
    })),
    ...posts.map((p) => ({
      title: p.title,
      link: `${SITE_URL}/blog/${p.slug}`,
      description: p.excerpt,
      content: p.body
        .filter((b) => b.type === "p")
        .slice(0, 5)
        .map((b) => b.text)
        .join("\n\n"),
      pubDate: new Date(p.date).toUTCString(),
      category: p.category,
    })),
    ...jobs.map((j) => ({
      title: j.title,
      link: `${SITE_URL}/join/${j.slug}`,
      description: j.intro,
      content: j.intro,
      pubDate: staggeredDate(`job-${j.slug}`, 60),
      category: "Jobs",
    })),
    ...services.map((s) => ({
      title: `${s.name} – Verified Service`,
      link: `${SITE_URL}/services/${s.slug}`,
      description: s.intro,
      content: s.intro,
      pubDate: staggeredDate(`service-${s.slug}`, 90),
      category: "Service",
    })),
  ];

  items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  const xml = buildAtom({
    title: "Safe Companion India — Atom Feed",
    description:
      "Atom feed of latest updates from Safe Companion India — verified male companion service across 40+ Indian cities.",
    selfPath: "/atom.xml",
    items: items.slice(0, 50),
  });

  return atomResponse(xml);
}
