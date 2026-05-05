import { services } from "../data/services";
import { cities } from "../data/cities";

const SITE_URL = "https://www.safecompanion.in";

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const now = new Date().toUTCString();

  const items = [];

  for (const s of services) {
    items.push({
      title: `${s.name} – Safe Companion India`,
      link: `${SITE_URL}/services/${s.slug}`,
      description: s.intro,
      pubDate: now,
    });
  }

  for (const c of cities) {
    items.push({
      title: `Male Companion Service in ${c.name} (${c.state})`,
      link: `${SITE_URL}/city/${c.slug}`,
      description: `Verified male escort, gigolo, playboy and callboy service in ${c.name}.`,
      pubDate: now,
    });
    for (const s of services) {
      items.push({
        title: `${s.name} in ${c.name} – Verified, Discreet`,
        link: `${SITE_URL}/city/${c.slug}/${s.slug}`,
        description: `Book a verified ${s.name.toLowerCase()} in ${c.name}, ${c.state}. ${s.intro}`,
        pubDate: now,
      });
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Safe Companion India – Latest Pages</title>
    <link>${SITE_URL}</link>
    <description>New service, city and city+service pages on Safe Companion India.</description>
    <language>en-in</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items
  .map(
    (i) => `    <item>
      <title>${escapeXml(i.title)}</title>
      <link>${escapeXml(i.link)}</link>
      <guid isPermaLink="true">${escapeXml(i.link)}</guid>
      <description>${escapeXml(i.description)}</description>
      <pubDate>${i.pubDate}</pubDate>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
