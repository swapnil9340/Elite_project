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
  "lesbian-companion-service",
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

const blogSlugs = [
  "how-to-become-a-gigolo-in-india",
  "playboy-job-salary-india",
  "callboy-job-legal-status-india",
  "how-to-find-genuine-male-escort-india",
  "gigolo-job-near-me",
  "boyfriend-on-rent-india",
  "callboy-vs-gigolo-vs-playboy",
  "how-much-do-male-escorts-charge-india",
  "is-it-safe-to-book-male-companion",
  "playboy-job-apply-online",
  "best-male-companion-service-bhopal-women",
  "best-male-companion-service-indore-women",
  "why-women-bhopal-indore-choose-male-companion",
  "first-time-booking-male-companion-women-guide",
  "ladies-special-discreet-meeting-tips",
];

const jobSlugs = ["gigolo-job", "playboy-job", "callboy-job", "male-escort-job"];

const forWomenSlugs = ["bhopal", "indore"];

function buildAllUrls() {
  const urls = [
    `${SITE_URL}/`,
    `${SITE_URL}/hi`,
    `${SITE_URL}/about`,
    `${SITE_URL}/services`,
    `${SITE_URL}/city`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/join`,
    `${SITE_URL}/contact`,
    `${SITE_URL}/privacy`,
    `${SITE_URL}/sitemap-html`,
    `${SITE_URL}/for-women`,
  ];
  for (const c of forWomenSlugs) urls.push(`${SITE_URL}/for-women/${c}`);
  for (const s of services) urls.push(`${SITE_URL}/services/${s}`);
  for (const c of cities) {
    urls.push(`${SITE_URL}/city/${c}`);
    for (const s of services) urls.push(`${SITE_URL}/city/${c}/${s}`);
  }
  for (const b of blogSlugs) urls.push(`${SITE_URL}/blog/${b}`);
  for (const j of jobSlugs) urls.push(`${SITE_URL}/join/${j}`);
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
