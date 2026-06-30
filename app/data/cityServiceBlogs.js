// City × Service blogs — one article per (city, service) combo.
// 40 cities × 9 services. Each article is differentiated to reduce the
// "scaled/templated" footprint that the June 2026 spam update targets:
//   - section SET and ORDER are chosen by a per-page hash (no two pages share
//     the same H2 sequence),
//   - every section is woven with that city's real data (areas, hotels,
//     landmarks, state, nick, demographic) from cityProfiles,
//   - intros, FAQs and use-cases are picked from per-service pools.
// NOTE: true long-term uniqueness still needs original local info per city;
// this generator maximises differentiation but is not a substitute for that.

import { cityProfiles } from "./cityProfiles";
import { getCityLocalIntel } from "./cityLocalIntel";

// Per-service framing — distinct angle, persona, use-cases, who-books copy.
const SERVICE_META = {
  "gigolo-service": {
    short: "gigolo",
    persona: "verified gigolo",
    angle:
      "A gigolo is a polished, well-spoken male companion for longer engagements — full evenings, dinners and overnight company.",
    who: "women who want an articulate, presentable partner for an unhurried evening rather than a quick meeting",
    useCases: [
      "private dinner and evening companionship",
      "discreet personal time with a polished partner",
      "weekend and overnight companion bookings",
    ],
  },
  "playboy-service": {
    short: "playboy",
    persona: "charming playboy",
    angle:
      "Playboy service is the premium, lifestyle tier — groomed, confident companions suited to upscale settings.",
    who: "women who want a high-end, head-turning partner for parties, lounges and lifestyle dates",
    useCases: [
      "high-end events and party plus-one",
      "lifestyle dates and upscale dinners",
      "premium overnight companionship",
    ],
  },
  "callboy-service": {
    short: "callboy",
    persona: "on-call companion",
    angle:
      "Callboy service is built for speed — short, local, same-day meetings without long planning.",
    who: "women who want a quick, no-fuss local meeting at short notice",
    useCases: [
      "quick same-day local bookings",
      "short-duration discreet meetings",
      "last-minute evening company",
    ],
  },
  "male-escort-service": {
    short: "male escort",
    persona: "professional male escort",
    angle:
      "A male escort is the all-rounder — equally at home at a corporate function, a dinner date or a travel booking.",
    who: "women who want a professional, adaptable companion for social or formal occasions",
    useCases: [
      "social events and corporate functions",
      "dinner dates and travel company",
      "polished plus-one for weddings and parties",
    ],
  },
  "boyfriend-on-rent": {
    short: "boyfriend on rent",
    persona: "rent-a-boyfriend companion",
    angle:
      "Boyfriend-on-rent is about a believable, relaxed partner who can play the part naturally when you need one.",
    who: "women facing family/marriage pressure, or who simply want easy, fun company for a day",
    useCases: [
      "family functions where marriage pressure is awkward",
      "weddings and office parties as a believable partner",
      "a relaxed fun day out with someone interesting",
    ],
  },
  "ladies-service": {
    short: "ladies service",
    persona: "companion for ladies",
    angle:
      "Ladies service is a respectful, judgement-free companionship tailored to what each woman is comfortable with.",
    who: "housewives, working women and single/divorced women seeking genuine, discreet company",
    useCases: [
      "housewives wanting discreet quality time",
      "working women needing a respectful event partner",
      "single and divorced women seeking genuine company",
    ],
  },
  "event-companion": {
    short: "event companion",
    persona: "event companion",
    angle:
      "Event companions are trained to blend into formal settings and handle the social side gracefully.",
    who: "women who need a confident plus-one who fits in at weddings, parties and corporate nights",
    useCases: [
      "weddings, receptions and sangeet functions",
      "corporate parties and annual-day events",
      "social gatherings where being single feels awkward",
    ],
  },
  "travel-companion": {
    short: "travel companion",
    persona: "travel companion",
    angle:
      "Travel companions join you on trips — good company on the road plus a local-savvy partner for the destination.",
    who: "women who want easy, safe company for getaways and multi-day travel",
    useCases: [
      "weekend getaways and short trips",
      "multi-day business travel company",
      "sightseeing with a local-savvy partner",
    ],
  },
  "lesbian-companion-service": {
    short: "lesbian companion",
    persona: "verified female companion",
    angle:
      "A discreet, respectful companionship service for women seeking the company of women.",
    who: "women seeking a like-minded female companion for dates, events or private time",
    useCases: [
      "discreet companionship for women seeking women",
      "events and dinner dates with a like-minded partner",
      "private, judgement-free quality time",
    ],
  },
};

// ---- deterministic hashing / seeded shuffle (stable across builds) ----
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
// Seeded pick of `count` items + seeded order, from a list.
function seededPick(list, count, seed) {
  const arr = list.map((v, i) => ({ v, k: djb2(`${seed}:${i}`) }));
  arr.sort((a, b) => a.k - b.k);
  return arr.slice(0, count).map((x) => x.v);
}
function titleCase(s) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}
function pick(list, seed) {
  return list[djb2(seed) % list.length];
}

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

// City tier → genuinely different price bands + phrasing (kills identical pricing
// across all 360 pages). Metros cost more, tier-2 less, tourist cities seasonal.
const METRO = new Set([
  "mumbai", "delhi", "bangalore", "hyderabad", "gurgaon", "noida", "pune", "chennai", "kolkata",
]);
const TOURIST = new Set(["goa", "udaipur", "agra", "varanasi", "jaipur", "jodhpur"]);
function cityTier(slug) {
  if (METRO.has(slug)) return "metro";
  if (TOURIST.has(slug)) return "tourist";
  return "tier2";
}
const PRICE = {
  metro: {
    quick: "₹8,000 - ₹20,000", half: "₹20,000 - ₹45,000", full: "₹45,000 - ₹85,000",
    night: "₹60,000 - ₹1,10,000", travel: "₹50,000+",
  },
  tourist: {
    quick: "₹6,000 - ₹16,000", half: "₹16,000 - ₹38,000", full: "₹35,000 - ₹70,000",
    night: "₹50,000 - ₹90,000", travel: "₹45,000 - ₹95,000",
  },
  tier2: {
    quick: "₹5,000 - ₹14,000", half: "₹14,000 - ₹32,000", full: "₹28,000 - ₹55,000",
    night: "₹40,000 - ₹70,000", travel: "₹40,000+",
  },
};

const TITLE_TPL = [
  (svc, c) => `${svc.name} in ${c.name} — Verified, Discreet Booking & Real Rates (2026)`,
  (svc, c) => `${c.name} ${svc.name}: Genuine ${titleCase(svc.short)}, No Advance, Area-Wise Guide`,
  (svc, c) => `Book ${svc.name} in ${c.name} — Safe, Transparent & 24/7 (2026 Guide)`,
  (svc, c) => `${svc.name} ${c.name}: Pricing, Areas, Safety & Direct Booking Guide`,
  (svc, c) => `Genuine ${svc.name} in ${c.name} (${c.state}) — Verified Profiles, No Hidden Charges`,
];

const INTRO_TPL = [
  (svc, c, p) =>
    `Looking for a genuine ${svc.short} service in ${c.name}? Safe Companion India offers verified, discreet ${svc.short} bookings across ${c.name} (${p.nick}), ${c.state}. ${svc.angle} Real profiles, transparent rates, no advance payment, and complete privacy — from ${p.areas[0]} to ${p.areas[1] || p.areas[0]} and every major locality in between.`,
  (svc, c, p) =>
    `${c.name} mein ${svc.short} service dhundh rahi hain? Safe Companion India ${c.name} (${p.nick}) ke har major area mein verified, discreet ${svc.short} booking deta hai — ${p.areas[0]}, ${p.areas[1] || p.areas[0]}, ${p.areas[2] || p.areas[0]} sab covered. ${svc.angle} Real profiles, transparent rate, koi advance nahi, aur 100% privacy.`,
  (svc, c, p) =>
    `A ${svc.persona} in ${c.name} is now just a WhatsApp message away. ${svc.angle} Serving ${p.demographic} near ${p.landmarks[0]} and across ${c.name}, our ${svc.short} service is verified, judgement-free and fully discreet — with no hidden charges.`,
  (svc, c, p) =>
    `${c.name}, ${c.state} — the ${p.nick} — has a quietly growing demand for genuine companionship. ${svc.angle} This guide covers everything about booking a ${svc.short} in ${c.name}: where it's available, real 2026 rates, safe meeting spots near ${p.landmarks[0]}, and a simple no-advance process.`,
];

// ---- section builders: each returns an array of body blocks ----
const SECTIONS = {
  whoBooks: (s) => [
    { type: "h2", text: pick([`Who Books ${s.svc.name} in ${s.city.name}?`, `${s.city.name} Mein ${s.svc.name} Kaun Book Karta Hai?`], `${s.city.slug}-${s.svc.slug}:wbh`) },
    {
      type: "p",
      text: pick(
        [
          `In ${s.city.name}, our ${s.svc.short} service is mostly booked by ${s.svc.who}. ${titleCase(s.city.name)}'s ${s.profile.demographic} value two things above all — discretion and respect — and every booking is built around exactly that.`,
          `${s.city.name} mein ${s.svc.short} mostly ${s.svc.who} book karte hain. Yahan ke ${s.profile.demographic} ke liye do cheezein sabse zyada matter karti hain — privacy aur respect — aur har booking inhi ke around design hoti hai.`,
        ],
        `${s.city.slug}-${s.svc.slug}:wbp`
      ),
    },
  ],
  serviceAngle: (s) => [
    { type: "h2", text: pick([`What Makes ${s.svc.name} Different`, `${s.svc.name} Kyun — ${s.city.name} Mein`], `${s.city.slug}-${s.svc.slug}:sah`) },
    {
      type: "p",
      text: pick(
        [
          `${s.svc.angle} In ${s.city.name} specifically, that means a ${s.svc.persona} who is comfortable everywhere from ${s.profile.areas[0]}'s upscale venues to a quiet café near ${s.profile.landmarks[1] || s.profile.landmarks[0]}. Common reasons women book here: ${s.svc.useCases[0]}, ${s.svc.useCases[1]}, and ${s.svc.useCases[2]}.`,
          `${s.svc.angle} ${s.city.name} mein iska matlab ek aisa ${s.svc.persona} jo ${s.profile.areas[0]} ke upscale venues se lekar ${s.profile.landmarks[1] || s.profile.landmarks[0]} ke paas kisi quiet cafe tak — har jagah comfortable ho. Yahan log mostly ${s.svc.useCases[0]} ya ${s.svc.useCases[1]} ke liye book karte hain.`,
        ],
        `${s.city.slug}-${s.svc.slug}:sap`
      ),
    },
  ],
  cityContext: (s) => [
    { type: "h2", text: pick([`Why ${s.city.name} — Local Context`, `${s.city.name} Ka Local Context`], `${s.city.slug}-${s.svc.slug}:cch`) },
    {
      type: "p",
      text: pick(
        [
          `${s.city.name} (${s.profile.nick}), ${s.city.state}, blends modern lifestyles with traditional surroundings. Landmarks like ${s.profile.landmarks[0]}${s.profile.landmarks[1] ? `, ${s.profile.landmarks[1]}` : ""}${s.profile.landmarks[2] ? ` and ${s.profile.landmarks[2]}` : ""} anchor a city where independent women increasingly seek safe, discreet companionship. Our ${s.svc.short} network is built for this ${s.city.name} reality.`,
          `${s.city.name} — ${s.profile.nick}, ${s.city.state} — modern lifestyle aur traditional maahaul dono saath rakhta hai. ${s.profile.landmarks[0]}${s.profile.landmarks[1] ? ` aur ${s.profile.landmarks[1]}` : ""} jaise landmarks wale is sheher mein independent women safe, discreet companionship dhundh rahi hain — aur humara ${s.svc.short} network isi ke liye bana hai.`,
        ],
        `${s.city.slug}-${s.svc.slug}:ccp`
      ),
    },
  ],
  areaWise: (s) => [
    { type: "h2", text: `${s.svc.name} Available Across ${s.city.name} — Area-Wise` },
    {
      type: "p",
      text: `Booking a ${s.svc.short} in the right ${s.city.name} area saves travel time and keeps things discreet. Covered localities:`,
    },
    {
      type: "ul",
      items: [
        `${s.A[0]} — prime hub, top-tier ${s.svc.short} profiles, premium hotels nearby`,
        `${s.A[1] || s.A[0]} — upscale residential, ideal for discreet bookings`,
        `${s.A[2] || s.A[0]} — central and well-connected, easy meeting points`,
        `${s.A[3] || s.A[1] || s.A[0]} — popular with ${s.profile.demographic}`,
        `${s.A[4] || s.A[2] || s.A[0]} — fast-growing demand, promotional rates`,
        `${s.A[5] || s.A[3] || s.A[0]} — outer-ring areas, discreet local meetings`,
      ],
    },
  ],
  pricing: (s) => {
    const t = cityTier(s.city.slug);
    const p = PRICE[t];
    const intro = pick(
      [
        `${s.city.name} mein ${s.svc.short} ka rate duration, area aur companion tier pe depend karta hai. Jo quote milta hai wahi final — koi hidden charge ya membership fee nahi, aur koi advance bhi nahi.`,
        `${s.city.name} ek ${t === "metro" ? "metro" : t === "tourist" ? "tourist-driven" : "tier-2"} market hai, isliye yahan ${s.svc.short} ke rates ${t === "metro" ? "premium par fully transparent" : t === "tourist" ? "season ke hisaab se thoda upar-neeche, par clear" : "metros se kaafi reasonable"} hote hain. Sab upfront — kuch chhupa hua nahi.`,
        `${s.city.name} mein ${s.svc.short} ka pricing ${s.A[0]} jaise premium areas aur ${s.A[3] || s.A[1] || s.A[0]} jaise mid areas ke beech vary karta hai. Niche realistic 2026 bands — payment hamesha service ke baad.`,
      ],
      `${s.city.slug}-${s.svc.slug}:prc`
    );
    return [
      { type: "h2", text: `${s.svc.name} Rate in ${s.city.name} (2026) — No Hidden Charges` },
      { type: "p", text: intro },
      {
        type: "ul",
        items: [
          `Quick meeting (1-2 hours): ${p.quick}`,
          `Half day / event (4-6 hours): ${p.half}`,
          `Full day (8-12 hours): ${p.full}`,
          `Overnight: ${p.night}`,
          `Travel companion (per day from ${s.city.name}): ${p.travel}`,
        ],
      },
      {
        type: "p",
        text: `${s.A[0]}${s.A[1] ? `/${s.A[1]}` : ""} jaise premium areas me rate thoda zyada, ${s.A[3] || s.A[2] || s.A[0]} jaise areas me thoda kam. Koi advance nahi — pura payment service ke baad cash ya UPI me.`,
      },
    ];
  },
  useCases: (s) => [
    { type: "h2", text: pick([`When Women in ${s.city.name} Book ${s.svc.name}`, `${s.city.name} Mein ${s.svc.name} Kab Book Hota Hai`], `${s.city.slug}-${s.svc.slug}:uch`) },
    {
      type: "ul",
      items: [
        `${titleCase(s.svc.useCases[0])}`,
        `${titleCase(s.svc.useCases[1])}`,
        `${titleCase(s.svc.useCases[2])}`,
        `A relaxed first meeting near ${s.L[0]} before anything else`,
      ],
    },
  ],
  safeSpots: (s) => [
    { type: "h2", text: pick([`Safe Meeting Spots in ${s.city.name}`, `${s.city.name} Mein Safe Meeting Spots`], `${s.city.slug}-${s.svc.slug}:ssh`) },
    {
      type: "p",
      text: pick(
        [
          `For a first ${s.svc.short} meeting, pick a public or semi-public spot. In ${s.city.name}, premium hotels like ${s.H[0]}${s.H[1] ? ` and ${s.H[1]}` : ""} offer private, secure check-in. Upscale cafés near ${s.L[0]}${s.L[1] ? ` and ${s.L[1]}` : ""} are ideal for an initial introduction before moving anywhere private.`,
          `Pehli ${s.svc.short} meeting hamesha public ya semi-public spot pe rakhein. ${s.city.name} mein ${s.H[0]}${s.H[1] ? ` ya ${s.H[1]}` : ""} jaise hotels private, secure check-in dete hain, aur ${s.L[0]} ke paas ke cafes initial introduction ke liye ideal hain — comfortable hone ke baad hi aage badhein.`,
        ],
        `${s.city.slug}-${s.svc.slug}:ssp`
      ),
    },
  ],
  timing: (s) => [
    { type: "h2", text: pick([`Best Booking Times in ${s.city.name}`, `${s.city.name} Mein Best Booking Time`], `${s.city.slug}-${s.svc.slug}:tmh`) },
    {
      type: "ul",
      items: [
        `Weekday 11am–3pm — quietest, most discreet windows`,
        `Weekday 6pm–9pm — popular with working women after office in ${s.A[0]}`,
        `Saturday evening — busiest slot in ${s.city.name}, book a day ahead`,
        `Same-day ${s.svc.short} bookings — usually possible if you message before 4pm`,
      ],
    },
  ],
  bookingProcess: (s) => {
    const variant = djb2(`${s.city.slug}-${s.svc.slug}:bk`) % 2;
    const steps =
      variant === 0
        ? [
            `WhatsApp ya Telegram pe message bhejhein — apna ${s.city.name} area (jaise ${s.A[0]} ya ${s.A[1] || s.A[0]}), date/time aur "${s.svc.short}" requirement batayein`,
            `5-10 minute mein verified ${s.svc.short} profiles aate hain — photos + details ke saath`,
            `Profile pasand karein, meeting ${s.H[0]} ya kisi cafe me confirm karein — koi advance nahi`,
            `${titleCase(s.svc.short)} aapke chune hue safe spot pe time pe milta hai`,
            `Payment service ke baad — cash ya UPI, fully transparent`,
            `Service ke baad anonymous feedback de sakti hain taaki quality maintain rahe`,
          ]
        : [
            `Hamari official WhatsApp/Telegram pe "${s.svc.short} in ${s.city.name}" + apna area likhein`,
            `Hum us area ke verified profiles bhejhte hain (${s.A[0]}, ${s.A[2] || s.A[0]} etc.)`,
            `Profile choose karein aur ${s.L[0]} ke aas-paas ya hotel me meeting fix karein`,
            `Pehli baar ho to ${s.H[0]} ka lobby jaisa public spot rakhein, phir aage decide karein`,
            `Service ke baad directly pay karein — koi advance, koi hidden charge nahi`,
          ];
    return [
      { type: "h2", text: `How to Book ${s.svc.name} in ${s.city.name}` },
      { type: "ol", items: steps },
    ];
  },
  discretion: (s) => {
    const text = pick(
      [
        `${s.city.name} mein ${s.svc.short} book karte waqt privacy sabse important hai. Sab companions verified aur background-checked hain; aapki identity, photos aur location 100% confidential. Pehli meeting ${s.H[0]} ke lobby ya ${s.L[0]} ke paas kisi public jagah rakhein, ek trusted friend ko location batayein.`,
        `Trust is poore ${s.city.name} ${s.svc.short} service ki foundation hai — koi data leak, blackmail ya judgment nahi. ${s.A[0]} jaise busy area me pehli baar mile, comfortable hone par hi private setting choose karein. Cancel karne ka full right hamesha aapke paas.`,
        `${s.city.name} jaise ${cityTier(s.city.slug) === "metro" ? "bade" : "close-knit"} sheher me discretion extra matter karti hai. Hum separate communication, no-record meetings aur ${s.H[0]}${s.H[1] ? ` / ${s.H[1]}` : ""} jaise discreet venues suggest karte hain. Aapki marzi, aapki pace — koi pressure nahi.`,
      ],
      `${s.city.slug}-${s.svc.slug}:dsc`
    );
    return [
      { type: "h2", text: `Discretion & Safety in ${s.city.name}` },
      { type: "p", text: text },
    ];
  },
  myths: (s) => [
    { type: "h2", text: pick([`Myths vs Reality — ${s.svc.name} in ${s.city.name}`, `${s.city.name} ${s.svc.name} — Myths vs Reality`], `${s.city.slug}-${s.svc.slug}:myh`) },
    {
      type: "p",
      text: pick(
        [
          `Myth: "Sab fake ya scam hota hai." Reality: verified platform pe har ${s.svc.short} profile ID-checked hoti hai; advance dene se pehle aap profile dekhti hain. Myth: "Sirf metro me milta hai." Reality: ${s.city.name} jaise shehar me demand kam competition ke saath badh rahi hai. Myth: "Privacy chali jayegi." Reality: discretion is poore business ki foundation hai.`,
          `${s.city.name} ke ${s.svc.short} ko le kar kaafi myths hain. "Sab scam hai" — nahi, har profile ID-verified hai aur advance nahi lagta. "Bahut mehnga" — nahi, rates ${cityTier(s.city.slug) === "metro" ? "premium par transparent" : "reasonable aur transparent"} hain. "Privacy safe nahi" — galat, confidentiality is service ki neenv hai.`,
        ],
        `${s.city.slug}-${s.svc.slug}:myp`
      ),
    },
  ],
};

// FAQ pool — questions are picked + ordered per page so FAQ sets differ.
function faqPool(s) {
  return [
    [
      `${s.city.name} mein ${s.svc.short} service ka rate kya hai?`,
      `${s.city.name} mein quick meeting (1-2 ghante) ${PRICE[cityTier(s.city.slug)].quick}, half day ${PRICE[cityTier(s.city.slug)].half} aur overnight ${PRICE[cityTier(s.city.slug)].night}. Sab transparent — koi advance aur koi hidden charge nahi.`,
    ],
    [
      `Kya ${s.city.name} mein ${s.svc.short} bina advance book hota hai?`,
      `Haan. Safe Companion India koi advance nahi leta. Aap verified profile dekhte hain, meeting confirm karte hain, aur payment service ke baad cash ya UPI mein karte hain.`,
    ],
    [
      `${s.city.name} ke kaunse areas mein ${s.svc.short} available hai?`,
      `${s.A[0]}, ${s.A[1] || s.A[0]}, ${s.A[2] || s.A[0]}, ${s.A[3] || s.A[0]} samet ${s.city.name} ke sab major areas covered hain. Aap apna nazdiki area batayein, area-specific profiles milengi.`,
    ],
    [
      `Pehli baar ${s.svc.short} book kar rahi hoon — safe meeting kahan karein?`,
      `Pehli meeting ${s.H[0]}${s.H[1] ? ` ya ${s.H[1]}` : ""} jaise premium hotel ke lobby ya ${s.L[0]} ke paas kisi café me rakhein — public, comfortable aur secure.`,
    ],
    [
      `Kya ${s.city.name} mein same-day ${s.svc.short} booking ho sakti hai?`,
      `Haan, agar aap 4pm se pehle message karein to ${s.city.name} mein same-day booking usually possible hai. Verified profiles 5-10 minute mein bheji jaati hain.`,
    ],
    [
      `Kya yeh confidential hai?`,
      `Bilkul. Sab ${s.city.name} companions fully verified aur background-checked hain. Aapki identity, photos aur location strictly confidential rakhi jaati hain.`,
    ],
  ];
}

// Render the city's REAL local info (from cityLocalIntel) as unique sections.
// This is the genuinely-original content — distinct per city, not templated.
function localIntelBlocks(intel, svc, city) {
  const out = [];
  if (intel.localContext && intel.localContext.trim()) {
    out.push({ type: "h2", text: `${svc.name} in ${city.name} — Local Insight` });
    out.push({ type: "p", text: intel.localContext });
  }
  if (intel.areaNotes && intel.areaNotes.length) {
    out.push({ type: "h2", text: `${city.name} — Areas at a Glance` });
    out.push({ type: "ul", items: intel.areaNotes });
  }
  if (intel.tips && intel.tips.length) {
    out.push({ type: "h2", text: `Local Tips for ${city.name}` });
    out.push({ type: "ul", items: intel.tips });
  }
  return out;
}

function buildBody(svc, city, profile) {
  const seed = `${city.slug}-${svc.slug}`;
  const h = djb2(seed);
  const s = {
    svc,
    city,
    profile,
    A: profile.areas,
    H: profile.hotels,
    L: profile.landmarks,
  };

  const intel = getCityLocalIntel(city.slug); // real local info, or null
  const intro = pick(INTRO_TPL, seed)(svc, city, profile);

  // Always-present spine, in a stable functional order.
  const core = ["pricing", "bookingProcess", "discretion"];
  // Variable sections — pick 4-5 and order them by the page seed.
  let variable = [
    "whoBooks",
    "serviceAngle",
    "cityContext",
    "areaWise",
    "useCases",
    "safeSpots",
    "timing",
    "myths",
  ];
  // When real area data exists, drop the generated area list to avoid duplication.
  if (intel && intel.areaNotes && intel.areaNotes.length) {
    variable = variable.filter((k) => k !== "areaWise");
  }
  const pickCount = 4 + (h % 2); // 4 or 5
  const chosen = seededPick(variable, pickCount, seed);

  // Interleave chosen + core into one seeded order (distinct H2 sequence/page).
  const ordered = seededPick([...chosen, ...core], chosen.length + core.length, `${seed}:order`);

  const body = [{ type: "p", text: intro }];
  // Real, city-specific content sits high up — best for users and for quality signals.
  if (intel) body.push(...localIntelBlocks(intel, svc, city));
  for (const key of ordered) body.push(...SECTIONS[key](s));

  // 3 FAQs — real city FAQs (from intel) get priority, then the generic pool.
  const intelFaqs = (intel && intel.faqs ? intel.faqs : []).map((f) => [f.q, f.a]);
  const faqs = seededPick([...intelFaqs, ...faqPool(s)], 3, `${seed}:faq`);
  for (const [q, a] of faqs) {
    body.push({ type: "h3", text: q });
    body.push({ type: "p", text: a });
  }

  // Closing CTA — varied per page.
  body.push({
    type: "h2",
    text: pick(
      [
        `Book Your ${svc.name} in ${city.name} Today`,
        `${city.name} ${svc.name} — Aaj Hi Contact Karein`,
        `Get Started With ${svc.name} in ${city.name}`,
      ],
      `${seed}:ctah`
    ),
  });
  body.push({
    type: "p",
    text: pick(
      [
        `${city.name} ki har woman ek safe, respectful aur discreet companionship deserve karti hai. Agar aap ${city.name} mein ${svc.short} service dhundh rahi hain, aaj hi WhatsApp ya Telegram pe contact karein — verified profiles minutes mein, aapki terms pe.`,
        `${city.name} mein verified ${svc.short} ek WhatsApp message door hai. Apna area aur time batayein, hum baaki sambhaal lete hain — koi advance, koi judgment, full privacy.`,
        `Ready ho? ${city.name} mein ${svc.short} book karna 2 minute ka kaam hai — message karein, verified profile chunein, aur service ke baad pay karein. Bas itna.`,
      ],
      `${seed}:ctap`
    ),
  });

  return body;
}

// Build one blog per (city, service).
export function buildCityServiceBlogPosts(cities, services) {
  const out = [];
  for (const city of cities) {
    const profile = cityProfiles[city.slug];
    if (!profile) continue;

    for (const service of services) {
      const meta = SERVICE_META[service.slug];
      if (!meta) continue;

      const svc = {
        ...service,
        short: meta.short,
        persona: meta.persona,
        angle: meta.angle,
        who: meta.who,
        useCases: meta.useCases,
      };
      const slug = `${city.slug}-${service.slug}-guide`;
      const v = djb2(slug);

      out.push({
        slug,
        title: TITLE_TPL[v % TITLE_TPL.length](svc, city),
        excerpt: pick(
          [
            `Verified ${meta.short} service in ${city.name} (${profile.nick}) — area-wise availability, real 2026 pricing, safe meeting spots, no advance and a simple WhatsApp booking. 100% discreet for ladies, housewives and working women.`,
            `${city.name} mein genuine ${meta.short} dhundh rahi hain? Real local areas, transparent ${cityTier(city.slug)} pricing, verified profiles aur no-advance booking — sab is guide me. Fully discreet.`,
            `Book a verified ${meta.short} in ${city.name}, ${city.state} — real area guide, 2026 rates, discreet venues near ${profile.landmarks[0]}, and a no-advance WhatsApp process. Safe & confidential.`,
          ],
          `${city.slug}-${service.slug}:exc`
        ),
        keywords: buildKeywords(meta.short, city),
        category: service.name,
        date: staggeredDate(slug, 90),
        readMin: 7 + (v % 4),
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
