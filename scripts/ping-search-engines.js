// Run after every deploy: `node scripts/ping-search-engines.js`
// Notifies IndexNow (Bing/Yandex) + pings sitemap so crawlers re-fetch.

const SITE_URL = "https://www.safecompanion.in";
const HOST = "www.safecompanion.in";
const INDEXNOW_KEY = "7953420b5032cd775e967140f86c256a";

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

const cities = [
  "bhopal", "indore", "mumbai", "delhi", "bangalore", "hyderabad", "pune",
  "ahmedabad", "kolkata", "chennai", "jaipur", "lucknow", "chandigarh",
  "surat", "nagpur", "noida", "gurgaon", "ghaziabad", "faridabad", "patna",
  "kanpur", "nashik", "vadodara", "agra", "varanasi", "ranchi", "raipur",
  "coimbatore", "kochi", "thiruvananthapuram", "visakhapatnam", "vijayawada",
  "guwahati", "bhubaneswar", "amritsar", "ludhiana", "dehradun", "udaipur",
  "jodhpur", "goa",
];

function buildAllUrls() {
  const urls = [
    `${SITE_URL}/`,
    `${SITE_URL}/services`,
    `${SITE_URL}/city`,
    `${SITE_URL}/contact`,
    `${SITE_URL}/privacy`,
    `${SITE_URL}/sitemap-html`,
  ];
  for (const s of services) urls.push(`${SITE_URL}/services/${s}`);
  for (const c of cities) {
    urls.push(`${SITE_URL}/city/${c}`);
    for (const s of services) urls.push(`${SITE_URL}/city/${c}/${s}`);
  }
  return urls;
}

async function indexNow(endpoint) {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: buildAllUrls(),
  };
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    console.log(`[IndexNow] ${endpoint} → ${res.status}`);
  } catch (e) {
    console.log(`[IndexNow] ${endpoint} → ERROR ${e.message}`);
  }
}

async function pingSitemap(engineUrl) {
  try {
    const res = await fetch(engineUrl);
    console.log(`[Sitemap ping] ${engineUrl} → ${res.status}`);
  } catch (e) {
    console.log(`[Sitemap ping] ${engineUrl} → ERROR ${e.message}`);
  }
}

(async () => {
  console.log(`Submitting ${buildAllUrls().length} URLs...`);
  await Promise.all([
    indexNow("https://api.indexnow.org/indexnow"),
    indexNow("https://www.bing.com/indexnow"),
    indexNow("https://yandex.com/indexnow"),
    pingSitemap(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(
        SITE_URL + "/sitemap.xml"
      )}`
    ),
    pingSitemap(
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(
        SITE_URL + "/sitemap.xml"
      )}`
    ),
  ]);
  console.log("Done.");
})();
