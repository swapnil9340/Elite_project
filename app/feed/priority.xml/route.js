// Priority feed: Bhopal + Indore URLs ONLY, with very recent pubDates so
// crawlers (Google/Bing/Yandex feed reader, and RSS aggregators) treat them
// as the freshest items on the site. Use this to push priority indexing.

import { buildRss, staggeredDate, rssResponse } from "../../data/feedBuilder";

const SITE_URL = "https://www.safecompanion.in";

const PRIORITY_CITIES = ["bhopal", "indore"];

// Service-specific item templates — each title/description is packed with
// the high-intent keyword variants (cheap rate, sasta, no advance, premium,
// safe, area names) so feed indexers pick up those signals immediately.
const SERVICE_TEMPLATES = [
  {
    slug: "callboy-service",
    label: "Callboy Service",
    titleFor: (c) =>
      `${c} Callboy Service — Cheap Rate, No Advance, Pay After Service (2026)`,
    descFor: (c) =>
      `Verified callboy service in ${c} for ladies, housewives & working women. Sasta tier se premium tier tak, low rate options, no advance payment — pay only after service. WhatsApp/Telegram 24/7, MP Nagar / Vijay Nagar / Arera Colony / Palasia covered.`,
    contentFor: (c) =>
      `${c} callboy service — safe, verified, cheap rate aur high profile dono available. Service ke baad payment, koi advance nahi. Same-day booking.`,
  },
  {
    slug: "gigolo-service",
    label: "Gigolo Service",
    titleFor: (c) =>
      `${c} Gigolo Service — Sasta, Safe, High Profile Verified (No Advance)`,
    descFor: (c) =>
      `${c} mein verified gigolo service — sirf ladies ke liye. Cheap rate se VIP tier tak. Koi advance nahi, payment service ke baad. Premium hotels covered, area-wise discreet meeting.`,
    contentFor: (c) =>
      `${c} gigolo service — low rate aur premium dono tier. Pay after meeting, no advance. Background-checked profiles.`,
  },
  {
    slug: "playboy-service",
    label: "Playboy Service",
    titleFor: (c) =>
      `Playboy Service Cheap Rate in ${c} — Sasta, Safe, No Advance Payment`,
    descFor: (c) =>
      `Affordable playboy service in ${c} for ladies, college girls aur housewives. Cheap rate options, no advance payment, pay after meeting. Young verified profiles, same-day booking on WhatsApp.`,
    contentFor: (c) =>
      `${c} playboy service — cheap rate, sasta options, premium tier bhi. Service ke baad payment, koi advance nahi.`,
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
      title: `${C} Male Service — Callboy, Gigolo, Playboy, Male Escort (Cheap Rate, No Advance)`,
      link: `${SITE_URL}/city/${slug}`,
      description: `${C} verified male companion service for women — callboy, gigolo, playboy, male escort. Sasta tier se premium tier tak. No advance payment — pay only after service. Every major area covered.`,
      content: `${C} mein safe, sasta aur high profile male companion service. Koi advance nahi — service ke baad payment.`,
      pubDate: staggeredDate(`priority-city-${slug}`, 5),
      category: `${C} — Featured`,
    });

    // For-women page
    items.push({
      title: `${C} Service for Women — Verified Male Companion (No Advance, Pay After Service)`,
      link: `${SITE_URL}/for-women/${slug}`,
      description: `${C} mein ladies, housewives, working women aur college girls ke liye verified male companion service. Cheap rate aur premium tier dono. No advance payment.`,
      content: `${C} for women — area-wise availability, sasta + safe + premium.`,
      pubDate: staggeredDate(`priority-forwomen-${slug}`, 5),
      category: `${C} — For Women`,
    });

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

  // Featured blog
  items.push({
    title:
      "Boyfriend on Rent in Bhopal — Cheap Rate, Sasta, Safe Complete 2026 Guide",
    link: `${SITE_URL}/blog/boyfriend-on-rent-bhopal`,
    description:
      "Bhopal mein boyfriend on rent ki complete guide — areas, real cheap rate, sasta tier, premium tier, booking process, safety. No advance payment, pay after service.",
    content:
      "Bhopal boyfriend on rent — cheap rate aur premium dono tier. Safe, discreet, no advance.",
    pubDate: staggeredDate(`priority-blog-bhopal-bor`, 3),
    category: "Bhopal — Blog Guide",
  });

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
