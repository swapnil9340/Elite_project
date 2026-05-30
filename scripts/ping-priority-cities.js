// Priority-city IndexNow push: focused submission of Bhopal + Indore URLs
// to Bing/Yandex/IndexNow API. Run this after every deploy + every time you
// publish new Bhopal/Indore content.
//
// Usage:  node scripts/ping-priority-cities.js
//
// Why a separate script? IndexNow has per-host rate limits and dedupes URLs
// over short windows. A focused push of only priority URLs gives them clear
// signal weight without diluting the request with 400+ other URLs.

const SITE_URL = "https://www.safecompanion.in";
const HOST = "www.safecompanion.in";
const INDEXNOW_KEY = "7953420b5032cd775e967140f86c256a";

const PRIORITY_CITIES = ["bhopal", "indore"];

const services = [
  "gigolo-service",
  "playboy-service",
  "callboy-service",
  "male-escort-service",
  "boyfriend-on-rent",
  "ladies-service",
  "event-companion",
  "travel-companion",
];

const priorityBlogSlugs = [
  "boyfriend-on-rent-bhopal",
  "best-male-companion-service-bhopal-women",
  "best-male-companion-service-indore-women",
  "why-women-bhopal-indore-choose-male-companion",
];

function buildPriorityUrls() {
  const urls = [];
  for (const slug of PRIORITY_CITIES) {
    urls.push(`${SITE_URL}/city/${slug}`);
    urls.push(`${SITE_URL}/for-women/${slug}`);
    for (const s of services) {
      urls.push(`${SITE_URL}/city/${slug}/${s}`);
    }
  }
  for (const b of priorityBlogSlugs) {
    urls.push(`${SITE_URL}/blog/${b}`);
  }
  return urls;
}

async function indexNow(endpoint, urls) {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    const txt = await res.text().catch(() => "");
    console.log(`[Priority IndexNow] ${endpoint} → ${res.status} ${txt.slice(0, 120)}`);
  } catch (e) {
    console.log(`[Priority IndexNow] ${endpoint} → ERROR ${e.message}`);
  }
}

(async () => {
  const urls = buildPriorityUrls();
  console.log(`Submitting ${urls.length} PRIORITY URLs (Bhopal + Indore):`);
  for (const u of urls) console.log("  • " + u);

  await Promise.all([
    indexNow("https://api.indexnow.org/indexnow", urls),
    indexNow("https://www.bing.com/indexnow", urls),
    indexNow("https://yandex.com/indexnow", urls),
  ]);
  console.log("Priority push done.");
})();
