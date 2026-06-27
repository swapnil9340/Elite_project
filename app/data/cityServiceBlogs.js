// City × Service blogs — one unique SEO article per (city, service) combo.
// 40 cities × 9 services = up to 360 long-tail buyer-intent articles.
// Content is templated but every article is city-specific (areas, hotels,
// landmarks, demographic from cityProfiles) AND service-specific (term, persona,
// use-cases), with section order rotated by a slug hash so no two read alike.
//
// Keyword focus: service + city long-tail
//   e.g. "gigolo service in mumbai", "callboy near me delhi",
//        "cheap playboy bhopal", "book male escort online pune".

import { cityProfiles } from "./cityProfiles";

// Per-service framing. `short` = natural keyword token, `persona` = how we refer
// to the companion, `useCases` = service-specific reasons people book.
const SERVICE_META = {
  "gigolo-service": {
    short: "gigolo",
    persona: "verified gigolo",
    useCases: [
      "private dinner and evening companionship",
      "discreet personal time with a polished partner",
      "weekend and overnight companion bookings",
    ],
  },
  "playboy-service": {
    short: "playboy",
    persona: "charming playboy",
    useCases: [
      "high-end events and party plus-one",
      "lifestyle dates and upscale dinners",
      "premium overnight companionship",
    ],
  },
  "callboy-service": {
    short: "callboy",
    persona: "on-call companion",
    useCases: [
      "quick same-day local bookings",
      "short-duration discreet meetings",
      "last-minute evening company",
    ],
  },
  "male-escort-service": {
    short: "male escort",
    persona: "professional male escort",
    useCases: [
      "social events and corporate functions",
      "dinner dates and travel company",
      "polished plus-one for weddings and parties",
    ],
  },
  "boyfriend-on-rent": {
    short: "boyfriend on rent",
    persona: "rent-a-boyfriend companion",
    useCases: [
      "family functions where marriage pressure is awkward",
      "weddings and office parties as a believable partner",
      "a fun day out with someone interesting",
    ],
  },
  "ladies-service": {
    short: "ladies service",
    persona: "companion for ladies",
    useCases: [
      "housewives wanting discreet quality time",
      "working women needing a respectful event partner",
      "single and divorced women seeking genuine company",
    ],
  },
  "event-companion": {
    short: "event companion",
    persona: "event companion",
    useCases: [
      "weddings, receptions and sangeet functions",
      "corporate parties and annual-day events",
      "social gatherings where being single feels awkward",
    ],
  },
  "travel-companion": {
    short: "travel companion",
    persona: "travel companion",
    useCases: [
      "weekend getaways and short trips",
      "multi-day business travel company",
      "sightseeing with a local-savvy partner",
    ],
  },
  "lesbian-companion-service": {
    short: "lesbian companion",
    persona: "verified female companion",
    useCases: [
      "discreet companionship for women seeking women",
      "events and dinner dates with a like-minded partner",
      "private, judgement-free quality time",
    ],
  },
};

// Deterministic hash so dates + content variants are stable across builds.
function djb2(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
  return h >>> 0;
}

function staggeredDate(seed, days) {
  const offset = djb2(seed) % days;
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return d.toISOString().slice(0, 10);
}

function titleCase(s) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

// Long-tail keyword set: service token × city, buyer intent.
function buildKeywords(short, city) {
  const c = city.name;
  return [
    `${short} service in ${c}`,
    `${short} in ${c}`,
    `${short} near me ${c}`,
    `${c} ${short} service`,
    `${short} ${c} contact number`,
    `cheap ${short} ${c}`,
    `${short} for women ${c}`,
    `book ${short} online ${c}`,
    `verified ${short} ${c}`,
    `${short} service ${c} price`,
    `best ${short} service ${c}`,
    `${short} ${c} no advance`,
  ];
}

// Title variants — rotated by hash so the SERP listing is not boilerplate.
const TITLE_TPL = [
  (svc, c) => `${svc.name} in ${c.name} — Verified, Discreet Booking & Real Rates (2026)`,
  (svc, c) => `${c.name} ${svc.name}: Genuine ${titleCase(svc.short)}, No Advance, Area-Wise Guide`,
  (svc, c) => `Book ${svc.name} in ${c.name} — Safe, Transparent & 24/7 (2026 Guide)`,
  (svc, c) => `${svc.name} ${c.name}: Pricing, Areas, Safety & Direct Booking Guide`,
];

const INTRO_TPL = [
  (svc, c, p) =>
    `Looking for a genuine ${svc.short} service in ${c.name}? Safe Companion India offers verified, discreet ${svc.short} bookings across ${c.name} (${p.nick}), ${c.state}. Real profiles, transparent rates, no advance payment, and complete privacy — from ${p.areas[0]} to ${p.areas[1] || p.areas[0]} and every major locality in between.`,
  (svc, c, p) =>
    `${c.name} mein ${svc.short} service dhundh rahi hain? Safe Companion India ${c.name} (${p.nick}) ke har major area mein verified, discreet ${svc.short} booking deta hai — ${p.areas[0]}, ${p.areas[1] || p.areas[0]}, ${p.areas[2] || p.areas[0]} sab covered. Real profiles, transparent rate, koi advance nahi, aur 100% privacy.`,
  (svc, c, p) =>
    `A ${svc.persona} in ${c.name} is now just a WhatsApp message away. Serving ${p.demographic} across ${c.name}, our ${svc.short} service is verified, judgement-free and fully discreet — designed for ${svc.useCases[0]} and more, with no hidden charges.`,
];

function buildBody(svc, city, profile) {
  const v = djb2(`${city.slug}-${svc.slug}`);
  const intro = INTRO_TPL[v % INTRO_TPL.length](svc, city, profile);
  const A = profile.areas;
  const H = profile.hotels;
  const L = profile.landmarks;
  const Cap = titleCase(svc.short);

  return [
    { type: "p", text: intro },

    { type: "h2", text: `Why Book ${svc.name} in ${city.name}?` },
    {
      type: "p",
      text: `${city.name}, the ${profile.nick}, has a fast-growing demand for genuine companionship among ${profile.demographic}. People book our ${svc.short} service for ${svc.useCases[0]}, ${svc.useCases[1]}, and ${svc.useCases[2]}. Every ${svc.persona} on our ${city.name} roster is ID-verified and background-checked, so you get safety and discretion together.`,
    },

    { type: "h2", text: `${svc.name} Available Across ${city.name} — Area-Wise` },
    {
      type: "p",
      text: `Booking a ${svc.short} in the right ${city.name} area saves travel time and keeps things discreet. We cover every major locality:`,
    },
    {
      type: "ul",
      items: [
        `${A[0]} — prime hub, top-tier ${svc.short} profiles, premium hotels nearby`,
        `${A[1] || A[0]} — upscale residential, ideal for discreet bookings`,
        `${A[2] || A[0]} — central and well-connected, easy meeting points`,
        `${A[3] || A[1] || A[0]} — popular with ${profile.demographic}`,
        `${A[4] || A[2] || A[0]} — fast-growing demand, promotional rates`,
        `${A[5] || A[3] || A[0]} — outer-ring areas, discreet local meetings`,
      ],
    },

    { type: "h2", text: `${svc.name} Rate in ${city.name} (2026) — No Hidden Charges` },
    {
      type: "p",
      text: `${city.name} mein ${svc.short} service ka rate duration, area aur companion tier pe depend karta hai. Jo quote kiya jaata hai wahi final hota hai — koi hidden charge, koi membership fee nahi. Koi advance bhi nahi; payment service ke baad cash ya UPI mein.`,
    },
    {
      type: "ul",
      items: [
        `Quick meeting (1-2 hours): ₹5,000 - ₹15,000`,
        `Half day / event (4-6 hours): ₹15,000 - ₹35,000`,
        `Full day (8-12 hours): ₹30,000 - ₹60,000`,
        `Overnight: ₹40,000 - ₹70,000`,
        `Travel companion (per day from ${city.name}): ₹40,000+`,
      ],
    },

    { type: "h2", text: `Safe Meeting Spots in ${city.name}` },
    {
      type: "p",
      text: `For a first ${svc.short} meeting, always pick a public or semi-public spot. In ${city.name}, premium hotels like ${H[0]}${H[1] ? ` and ${H[1]}` : ""} offer private, secure check-in. Upscale cafes near ${L[0]}${L[1] ? ` and ${L[1]}` : ""} are perfect for an initial introduction before moving anywhere private. Meet in public first, get comfortable, then decide the next step on your terms.`,
    },

    { type: "h2", text: `How to Book ${svc.name} in ${city.name}` },
    {
      type: "ol",
      items: [
        `WhatsApp ya Telegram pe message bhejhein — apna ${city.name} area (jaise ${A[0]}), date/time aur "${svc.short}" requirement batayein`,
        `Hum 5-10 minute mein verified ${svc.short} profiles bhejhte hain — photos + details ke saath`,
        `Profile pasand karein aur meeting confirm karein — koi advance nahi`,
        `${Cap} aapke selected safe location (hotel/cafe) pe milta hai aapke time pe`,
        `Payment service ke baad directly — cash ya UPI, fully transparent`,
        `Service ke baad anonymous feedback de sakti hain taaki quality maintain rahe`,
      ],
    },

    { type: "h2", text: `Discretion & Safety — ${city.name}` },
    {
      type: "p",
      text: `Companion service mein trust aur privacy sabse pehle. Hamare sab ${city.name} ${svc.short} companions fully verified hain. Aapki identity, photos, location aur communication 100% confidential rakhi jaati hai — koi data leak, koi blackmail, koi judgment nahi. Pehli meeting public spot pe rakhein, ek trusted friend ko location batayein, aur comfortable na lagne pe kabhi bhi cancel karne ka full right aapke paas hai.`,
    },

    { type: "h3", text: `${city.name} mein ${svc.short} service ka rate kya hai?` },
    {
      type: "p",
      text: `${city.name} mein quick meeting (1-2 ghante) ₹5,000-₹15,000, half day ₹15,000-₹35,000 aur overnight ₹40,000-₹70,000. Sab transparent — koi advance aur koi hidden charge nahi.`,
    },
    { type: "h3", text: `Kya ${city.name} mein ${svc.short} bina advance book hota hai?` },
    {
      type: "p",
      text: `Haan. Safe Companion India koi advance nahi leta. Aap verified profile dekhte hain, meeting confirm karte hain, aur payment service ke baad cash ya UPI mein karte hain.`,
    },
    { type: "h3", text: `${city.name} ke kaunse areas mein ${svc.short} available hai?` },
    {
      type: "p",
      text: `${A[0]}, ${A[1] || A[0]}, ${A[2] || A[0]}, ${A[3] || A[0]} samet ${city.name} ke sab major areas covered hain. Aap apna nazdiki area mention karein, area-specific verified profiles milengi.`,
    },

    { type: "h2", text: `Book Your ${svc.name} in ${city.name} Today` },
    {
      type: "p",
      text: `${city.name} ki har woman ek safe, respectful aur discreet companionship deserve karti hai. Agar aap ${city.name} mein ${svc.short} service dhundh rahi hain, aaj hi WhatsApp ya Telegram pe contact karein — verified profiles minutes mein, aapki terms pe, aapki privacy ke saath.`,
    },
  ];
}

// Build one blog per (city, service). `services` and `cities` passed in to avoid
// circular imports.
export function buildCityServiceBlogPosts(cities, services) {
  const out = [];
  for (const city of cities) {
    const profile = cityProfiles[city.slug];
    if (!profile) continue;

    for (const service of services) {
      const meta = SERVICE_META[service.slug];
      if (!meta) continue;

      const svc = { ...service, short: meta.short, persona: meta.persona, useCases: meta.useCases };
      const slug = `${city.slug}-${service.slug}-guide`;
      const v = djb2(slug);

      out.push({
        slug,
        title: TITLE_TPL[v % TITLE_TPL.length](svc, city),
        excerpt: `Verified ${meta.short} service in ${city.name} — area-wise availability, real 2026 pricing, safe meeting spots, no advance and a simple WhatsApp booking process. 100% discreet for ladies, housewives and working women.`,
        keywords: buildKeywords(meta.short, city),
        category: service.name,
        date: staggeredDate(slug, 90),
        readMin: 7 + (v % 4), // 7-10 min
        body: buildBody(svc, city, profile),
        city: city.slug,
        service: service.slug,
        isCityBlog: true,
        isCityServiceBlog: true,
      });
    }
  }
  return out;
}
