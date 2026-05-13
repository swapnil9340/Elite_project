// Shared RSS feed builder with proper namespaces and varied dates.
// Google + Bing reward feeds with unique pubDate per item (freshness signal).

const SITE_URL = "https://www.safecompanion.in";
const LOGO_URL = `${SITE_URL}/icon.svg`;
const BRAND = "Safe Companion India";

export function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Deterministic backdated pubDate so each item has a unique, plausible date.
// Spreads dates across last 180 days based on a slug hash.
function djb2(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
  return h >>> 0;
}

export function staggeredDate(slugSeed, recencyDays = 180) {
  const offsetDays = djb2(slugSeed) % recencyDays;
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return d.toUTCString();
}

export function buildRss({ title, description, selfPath, items, category }) {
  const now = new Date().toUTCString();
  const channelLink = `${SITE_URL}${selfPath.replace(/\.xml$/, "")}`;

  const itemXml = items
    .map((i) => {
      const guid = i.link;
      return `    <item>
      <title>${escapeXml(i.title)}</title>
      <link>${escapeXml(i.link)}</link>
      <guid isPermaLink="true">${escapeXml(guid)}</guid>
      <description><![CDATA[${i.description}]]></description>
      <content:encoded><![CDATA[${i.content || i.description}]]></content:encoded>
      <dc:creator>${BRAND}</dc:creator>
      <dc:date>${new Date(i.pubDate).toISOString()}</dc:date>
      <pubDate>${i.pubDate}</pubDate>${
        i.category
          ? `\n      <category>${escapeXml(i.category)}</category>`
          : ""
      }
      <media:thumbnail url="${LOGO_URL}" />
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${channelLink}</link>
    <atom:link href="${SITE_URL}${selfPath}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(description)}</description>
    <language>en-in</language>
    <copyright>© ${new Date().getFullYear()} ${BRAND}</copyright>
    <managingEditor>contact@safecompanion.in (${BRAND})</managingEditor>
    <webMaster>contact@safecompanion.in (${BRAND})</webMaster>
    <pubDate>${now}</pubDate>
    <lastBuildDate>${now}</lastBuildDate>
    <category>${escapeXml(category || "Lifestyle")}</category>
    <generator>Next.js — Safe Companion India</generator>
    <ttl>720</ttl>
    <sy:updatePeriod>daily</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <image>
      <url>${LOGO_URL}</url>
      <title>${escapeXml(title)}</title>
      <link>${channelLink}</link>
      <width>64</width>
      <height>64</height>
    </image>
${itemXml}
  </channel>
</rss>`;
}

export function buildAtom({ title, description, selfPath, items }) {
  const now = new Date().toISOString();
  const channelLink = `${SITE_URL}${selfPath.replace(/\.xml$/, "")}`;

  const entryXml = items
    .map(
      (i) => `  <entry>
    <title>${escapeXml(i.title)}</title>
    <link href="${escapeXml(i.link)}" />
    <id>${escapeXml(i.link)}</id>
    <updated>${new Date(i.pubDate).toISOString()}</updated>
    <published>${new Date(i.pubDate).toISOString()}</published>
    <author><name>${BRAND}</name><email>contact@safecompanion.in</email></author>
    <summary><![CDATA[${i.description}]]></summary>
    <content type="html"><![CDATA[${i.content || i.description}]]></content>${
        i.category
          ? `\n    <category term="${escapeXml(i.category)}" />`
          : ""
      }
  </entry>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(title)}</title>
  <subtitle>${escapeXml(description)}</subtitle>
  <link href="${SITE_URL}${selfPath}" rel="self" />
  <link href="${channelLink}" />
  <updated>${now}</updated>
  <id>${SITE_URL}${selfPath}</id>
  <author><name>${BRAND}</name><email>contact@safecompanion.in</email></author>
  <generator>Next.js</generator>
  <rights>© ${new Date().getFullYear()} ${BRAND}</rights>
${entryXml}
</feed>`;
}

export function rssResponse(xml) {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800, s-maxage=3600",
      "X-Robots-Tag": "all",
    },
  });
}

export function atomResponse(xml) {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800, s-maxage=3600",
      "X-Robots-Tag": "all",
    },
  });
}
