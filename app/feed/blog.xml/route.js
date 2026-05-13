import { posts } from "../../data/blog";
import { buildRss, rssResponse } from "../../data/feedBuilder";

const SITE_URL = "https://www.safecompanion.in";

export function GET() {
  const items = posts
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => ({
      title: p.title,
      link: `${SITE_URL}/blog/${p.slug}`,
      description: p.excerpt,
      content: p.body
        .filter((b) => b.type === "p" || b.type === "h2")
        .slice(0, 8)
        .map((b) => b.text)
        .join("\n\n"),
      pubDate: new Date(p.date).toUTCString(),
      category: p.category,
    }));

  const xml = buildRss({
    title: "Safe Companion India — Blog",
    description:
      "Expert articles on gigolo, playboy, callboy and male escort careers, booking guides, pricing, safety, and legal status in India.",
    selfPath: "/feed/blog.xml",
    items,
    category: "Lifestyle",
  });

  return rssResponse(xml);
}
