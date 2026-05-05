import { services } from "../../data/services";
import { cities } from "../../data/cities";

const SITE_URL = "https://www.safecompanion.in";
const HOST = "www.safecompanion.in";
const KEY = "7953420b5032cd775e967140f86c256a";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;

function buildAllUrls() {
  const urls = [
    `${SITE_URL}/`,
    `${SITE_URL}/services`,
    `${SITE_URL}/city`,
    `${SITE_URL}/contact`,
    `${SITE_URL}/privacy`,
    `${SITE_URL}/sitemap-html`,
  ];
  for (const s of services) urls.push(`${SITE_URL}/services/${s.slug}`);
  for (const c of cities) {
    urls.push(`${SITE_URL}/city/${c.slug}`);
    for (const s of services) {
      urls.push(`${SITE_URL}/city/${c.slug}/${s.slug}`);
    }
  }
  return urls;
}

async function pingEndpoint(endpoint, payload) {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Host: new URL(endpoint).host,
      },
      body: JSON.stringify(payload),
    });
    return { endpoint, status: res.status, ok: res.ok };
  } catch (err) {
    return { endpoint, error: err.message };
  }
}

export async function GET() {
  const urlList = buildAllUrls();
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
  ];

  const results = await Promise.all(
    endpoints.map((e) => pingEndpoint(e, payload))
  );

  return Response.json({
    submitted: urlList.length,
    keyLocation: KEY_LOCATION,
    results,
  });
}

export const dynamic = "force-dynamic";
