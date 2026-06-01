// Priority feed: Bhopal + Indore URLs ONLY, with very recent pubDates so
// crawlers (Google/Bing/Yandex feed reader, and RSS aggregators) treat them
// as the freshest items on the site. Use this to push priority indexing.

import { buildRss, staggeredDate, rssResponse } from "../../data/feedBuilder";

const SITE_URL = "https://www.safecompanion.in";

const PRIORITY_CITIES = ["bhopal", "indore", "delhi"];
// Subset of priority cities that ALSO have a /for-women/<slug> page generated.
// Add a slug here when you create the corresponding entry in forWomen.js.
const FORWOMEN_CITIES = new Set(["bhopal", "indore"]);

// Service-specific item templates — each title/description is packed with
// the high-intent keyword variants (cheap rate, sasta, no advance, premium,
// safe, area names) so feed indexers pick up those signals immediately.
const SERVICE_TEMPLATES = [
  {
    slug: "callboy-service",
    label: "Callboy Service",
    titleFor: (c) =>
      `${c} Callboy Service — Direct Number, No Agency, Cheap Rate, No Advance (2026)`,
    descFor: (c) =>
      `Verified callboy service in ${c} for ladies, housewives & working women. Direct contact, no agency, no middleman. Sasta tier se premium tier tak, low rate options, no advance payment — pay only after service. WhatsApp/Telegram 24/7, MP Nagar / Vijay Nagar / Arera Colony / Palasia covered.`,
    contentFor: (c) =>
      `${c} callboy service — direct number, no agency. Safe, verified, cheap rate aur high profile dono available. Service ke baad payment, koi advance nahi. Same-day booking.`,
  },
  {
    slug: "gigolo-service",
    label: "Gigolo Service",
    titleFor: (c) =>
      `${c} Gigolo Service — Direct Contact, No Agency, Sasta + High Profile (No Advance)`,
    descFor: (c) =>
      `${c} mein verified gigolo service — sirf ladies ke liye. Direct contact, no middleman, no agency fees. Cheap rate se VIP tier tak. Koi advance nahi, payment service ke baad. Premium hotels covered, area-wise discreet meeting.`,
    contentFor: (c) =>
      `${c} gigolo direct number — no agency, low rate aur premium dono tier. Pay after meeting, no advance. Background-checked profiles.`,
  },
  {
    slug: "playboy-service",
    label: "Playboy Service",
    titleFor: (c) =>
      `Playboy Service Cheap Rate in ${c} — Direct Number, No Agency, No Advance Payment`,
    descFor: (c) =>
      `Affordable playboy service in ${c} for ladies, college girls aur housewives. Direct contact, no agency, no middleman. Cheap rate options, no advance payment, pay after meeting. Young verified profiles, same-day booking on WhatsApp.`,
    contentFor: (c) =>
      `${c} playboy direct number — no agency. Cheap rate, sasta options, premium tier bhi. Service ke baad payment, koi advance nahi.`,
  },
  {
    slug: "male-escort-service",
    label: "Male Escort Service",
    titleFor: (c) =>
      `${c} Male Escort Service — Premium & Affordable Tiers, No Advance`,
    descFor: (c) =>
      `${c} male escort service for women — high profile, premium events, weddings, dinners. Low rate aur VIP tier dono. No advance payment, pay after service.`,
    contentFor: (c) =>
      `${c} male escort service — Sayaji / Marriott / premium venues covered. Sasta tier bhi available. Payment after the service.`,
  },
  {
    slug: "boyfriend-on-rent",
    label: "Boyfriend on Rent",
    titleFor: (c) =>
      `Boyfriend on Rent ${c} — Cheap Rate, Sasta Paid Boyfriend (No Advance)`,
    descFor: (c) =>
      `${c} mein boyfriend on rent / paid boyfriend service — events, family functions, casual dates. Affordable rate, no advance payment, pay after meeting. Verified profiles.`,
    contentFor: (c) =>
      `${c} boyfriend on rent — sasta aur premium tier. Koi advance nahi, service ke baad payment.`,
  },
  {
    slug: "ladies-service",
    label: "Ladies Service",
    titleFor: (c) =>
      `${c} Ladies Service — Sasta & Safe Male Companion for Women`,
    descFor: (c) =>
      `${c} ladies service: gigolo, callboy, playboy, male escort, boyfriend on rent — sab female-client perspective se. Cheap rate options + premium tier. No advance payment.`,
    contentFor: (c) =>
      `${c} ladies service — sirf women ke liye. Sasta aur premium dono. Service ke baad payment.`,
  },
  {
    slug: "event-companion",
    label: "Event Companion",
    titleFor: (c) =>
      `${c} Event Companion — Wedding, Corporate, Dinner Partner (No Advance)`,
    descFor: (c) =>
      `${c} event companion service for women — weddings, corporate parties, dinners. Premium polished male partners, affordable tiers, no advance payment.`,
    contentFor: (c) =>
      `${c} event companion — Sayaji / Marriott / premium venues. Pay after event, no advance.`,
  },
  {
    slug: "travel-companion",
    label: "Travel Companion",
    titleFor: (c) =>
      `${c} Travel Companion — Weekend Trips, Safe, No Advance Payment`,
    descFor: (c) =>
      `${c} travel companion for women — Ujjain / Mandu / Sanchi / Pachmarhi trips. Verified, multilingual, safety-trained companions. Affordable rate, pay after trip.`,
    contentFor: (c) =>
      `${c} travel companion — weekend trips, day tours. No advance payment.`,
  },
];

export function GET() {
  const items = [];

  for (const slug of PRIORITY_CITIES) {
    const C = slug.charAt(0).toUpperCase() + slug.slice(1);

    // Main city page
    items.push({
      title: `${C} Male Service — Direct Number, No Agency, Cheap Rate, No Advance Payment`,
      link: `${SITE_URL}/city/${slug}`,
      description: `${C} verified male companion service for women — callboy, gigolo, playboy, male escort. Direct contact, no agency, no middleman. Sasta tier se premium tier tak. No advance payment — pay only after service. Every major area covered.`,
      content: `${C} mein safe, sasta aur high profile male companion service. Direct number, no agency. Koi advance nahi — service ke baad payment.`,
      pubDate: staggeredDate(`priority-city-${slug}`, 5),
      category: `${C} — Featured`,
    });

    // For-women page (only if the city has a /for-women/<slug> route)
    if (FORWOMEN_CITIES.has(slug)) {
      items.push({
        title: `${C} Service for Women — Verified Male Companion (No Advance, Pay After Service)`,
        link: `${SITE_URL}/for-women/${slug}`,
        description: `${C} mein ladies, housewives, working women aur college girls ke liye verified male companion service. Cheap rate aur premium tier dono. No advance payment.`,
        content: `${C} for women — area-wise availability, sasta + safe + premium.`,
        pubDate: staggeredDate(`priority-forwomen-${slug}`, 5),
        category: `${C} — For Women`,
      });
    }

    // Each service combo page
    for (const t of SERVICE_TEMPLATES) {
      items.push({
        title: t.titleFor(C),
        link: `${SITE_URL}/city/${slug}/${t.slug}`,
        description: t.descFor(C),
        content: t.contentFor(C),
        pubDate: staggeredDate(`priority-${slug}-${t.slug}`, 7),
        category: `${C} — ${t.label}`,
      });
    }
  }

  // Featured blogs — newest priority guides
  const priorityBlogs = [
    {
      slug: "boyfriend-on-rent-bhopal",
      title:
        "Boyfriend on Rent in Bhopal — Cheap Rate, Sasta, Safe Complete 2026 Guide",
      description:
        "Bhopal mein boyfriend on rent ki complete guide — areas, real cheap rate, sasta tier, premium tier, booking process, safety. No advance payment, pay after service.",
      content:
        "Bhopal boyfriend on rent — cheap rate aur premium dono tier. Safe, discreet, no advance.",
      category: "Bhopal — Blog Guide",
    },
    {
      slug: "bhopal-callboy-direct-number-no-agency",
      title:
        "Bhopal Callboy Direct Number — No Agency, No Middleman Complete Guide 2026",
      description:
        "Bhopal mein callboy ka direct number kaise milta hai, agency ka jhanjhat kyun avoid karein, no middleman booking ke fayde, aur safe direct contact ka full process — sirf ladies ke liye.",
      content:
        "Bhopal direct callboy contact, no agency, no middleman. Safe verified, no advance.",
      category: "Bhopal — Direct Contact",
    },
    {
      slug: "playboy-service-cheap-rate-bhopal",
      title:
        "Playboy Service Cheap Rate in Bhopal — Sasta, Safe & No Advance Guide 2026",
      description:
        "Bhopal mein sasta aur safe playboy service ka real pricing breakdown, cheap rate options, college girl tier, no advance payment process, aur kis tarah genuine low rate service identify karein.",
      content:
        "Bhopal cheap rate playboy — sasta tier ₹4,000+. Safe, verified, no advance.",
      category: "Bhopal — Cheap Rate",
    },
    {
      slug: "indore-callboy-direct-number-no-agency",
      title:
        "Indore Callboy Direct Number — No Agency, No Middleman Complete Guide 2026",
      description:
        "Indore mein callboy ka direct number kaise milta hai, agency model ka jhanjhat kyun avoid karein, no middleman booking ke fayde, aur Vijay Nagar/Palasia/AB Road tak direct contact process.",
      content:
        "Indore direct callboy contact, no agency. Vijay Nagar, Palasia, AB Road covered.",
      category: "Indore — Direct Contact",
    },
    {
      slug: "playboy-service-cheap-rate-indore",
      title:
        "Playboy Service Cheap Rate in Indore — Sasta, Safe & No Advance Guide 2026",
      description:
        "Indore mein sasta aur safe playboy service ka real pricing breakdown, cheap rate options, DAVV/IIT-Indore college tier, no advance payment process, aur kis tarah genuine low rate identify karein.",
      content:
        "Indore cheap rate playboy — sasta tier ₹4,500+. DAVV, IIT-Indore college tier. No advance.",
      category: "Indore — Cheap Rate",
    },
  ];

  for (const b of priorityBlogs) {
    items.push({
      title: b.title,
      link: `${SITE_URL}/blog/${b.slug}`,
      description: b.description,
      content: b.content,
      pubDate: staggeredDate(`priority-blog-${b.slug}`, 3),
      category: b.category,
    });
  }

  // Sort newest first
  items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  const xml = buildRss({
    title:
      "Safe Companion India — Bhopal & Indore Priority Feed (Cheap Rate, No Advance)",
    description:
      "Priority feed: Bhopal aur Indore mein verified male companion service — callboy, gigolo, playboy, male escort, boyfriend on rent. Cheap rate, sasta, safe, premium options. No advance payment — pay after service. Updated daily.",
    selfPath: "/feed/priority.xml",
    items,
    category: "Priority Cities",
  });

  return rssResponse(xml);
}
