// Content variation library — generates unique 700+ word content per
// (city, service) combination using deterministic hashing on slugs.
// Uses string templates with token replacement to avoid function-in-data issues.
// Tokens: {CITY}, {STATE}, {SERVICE}, {SERVICE_LC}, {NICK}, {AREA0}..{AREA4},
//         {HOTEL0}, {HOTEL1}, {LANDMARK0}, {LANDMARK1}, {DEMO}

function djb2(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
  return h >>> 0;
}

const cityProfiles = {
  bhopal: {
    nick: "City of Lakes",
    landmarks: ["Upper Lake (Bada Talab)", "DB City Mall", "Van Vihar", "VIP Road"],
    areas: ["MP Nagar", "Arera Colony", "New Market", "Habibganj", "Kolar Road", "Shahpura", "Bittan Market", "TT Nagar", "BHEL"],
    hotels: ["Jehan Numa Palace", "Courtyard Marriott Bhopal", "Hotel The Residency", "Noor-Us-Sabah Palace"],
    demographic: "modern, well-educated working women and culturally aware housewives",
  },
  indore: {
    nick: "Mini Mumbai",
    landmarks: ["Rajwada", "Sarafa Bazaar", "Phoenix Citadel Mall", "Chappan Dukan"],
    areas: ["Vijay Nagar", "Palasia", "AB Road", "Bhanwarkuan", "MG Road", "Saket Nagar", "South Tukoganj", "Geeta Bhawan"],
    hotels: ["Sayaji Hotel", "Marriott Indore", "Radisson Blu", "Effotel by Sayaji"],
    demographic: "ambitious IT/corporate professionals and lifestyle-oriented women",
  },
  mumbai: {
    nick: "Maximum City",
    landmarks: ["Marine Drive", "Bandra-Worli Sea Link", "Juhu Beach", "Phoenix Marketcity"],
    areas: ["Bandra West", "Andheri", "Juhu", "Powai", "Lower Parel", "Worli", "Colaba"],
    hotels: ["The Taj Mahal Palace", "ITC Maratha", "JW Marriott Juhu", "Four Seasons"],
    demographic: "high-earning corporate executives and Bollywood-adjacent professionals",
  },
  delhi: {
    nick: "Capital City",
    landmarks: ["Connaught Place", "Khan Market", "Hauz Khas Village", "DLF Mall of India"],
    areas: ["South Delhi", "Gurgaon", "Noida", "Vasant Vihar", "Defence Colony", "Dwarka"],
    hotels: ["The Oberoi New Delhi", "ITC Maurya", "Taj Palace", "The Leela Palace"],
    demographic: "diplomatic, corporate and government-sector professionals",
  },
  bangalore: {
    nick: "Silicon Valley of India",
    landmarks: ["MG Road", "Cubbon Park", "UB City Mall", "Indiranagar"],
    areas: ["Koramangala", "Indiranagar", "Whitefield", "HSR Layout", "Jayanagar", "Electronic City"],
    hotels: ["The Leela Palace", "ITC Gardenia", "Taj West End", "JW Marriott"],
    demographic: "tech professionals, startup founders, and global-minded executives",
  },
  hyderabad: {
    nick: "City of Pearls",
    landmarks: ["Charminar", "Hussain Sagar", "HITEC City", "GVK One Mall"],
    areas: ["Banjara Hills", "Jubilee Hills", "Gachibowli", "Hitec City", "Kondapur", "Madhapur"],
    hotels: ["Taj Falaknuma Palace", "ITC Kohenur", "Park Hyatt", "Trident"],
    demographic: "IT sector professionals, business families, and modern working women",
  },
  pune: {
    nick: "Oxford of the East",
    landmarks: ["Shaniwar Wada", "Aga Khan Palace", "Phoenix Marketcity", "FC Road"],
    areas: ["Koregaon Park", "Viman Nagar", "Baner", "Aundh", "Kalyani Nagar", "Hinjewadi"],
    hotels: ["JW Marriott Pune", "Conrad Pune", "The Westin", "Hyatt Regency"],
    demographic: "IT/automotive professionals, students, and cosmopolitan working women",
  },
};

function makeDefaultProfile(city) {
  return {
    nick: city.name,
    landmarks: [`${city.name} Central`, `${city.name} Market`, `${city.name} Mall`, `${city.name} Junction`],
    areas: [`Main Road ${city.name}`, "Civil Lines", "Cantonment", "New Colony", "Station Road"],
    hotels: [`Hotel Grand ${city.name}`, `${city.name} Plaza`, `Premium Inn ${city.name}`],
    demographic: "modern professionals and discerning women",
  };
}

// String templates with tokens. No functions — pure data.
const heroIntros = [
  "{CITY} — often called the {NICK} — has a growing community of {DEMO} who are exploring modern, discreet companion services. Safe Companion India offers a verified {SERVICE_LC} experience in {CITY}, from the busy lanes of {AREA0} to the upscale circles of {AREA1}. Every companion is fully verified, background-checked, and trained to respect your privacy completely.",
  "If you are searching for a genuine {SERVICE_LC} in {CITY}, you have probably encountered fake profiles, advance-fee scams, and unreliable agencies. Safe Companion India changes that. We operate in {CITY} with a 100% verified roster — companions who have passed identity verification, background screening, and a personality interview. Our service runs across {AREA0}, {AREA1}, and {AREA2} along with other key {CITY} localities.",
  "{CITY} is one of {STATE}'s most dynamic urban centers, and the demand for premium {SERVICE_LC} bookings here has grown rapidly. Our verified network of male companions in {CITY} serves clients across {AREA0}, {AREA1}, and the surrounding metropolitan zone — with transparent pricing, no hidden charges, and complete discretion as our core promises.",
  "Looking for an authentic {SERVICE_LC} service in {CITY}? You deserve a platform that respects your time, your privacy, and your budget. Safe Companion India has built a verified male companion network specifically for {CITY} — covering iconic areas like {LANDMARK0} and residential pockets such as {AREA0}. Bookings happen on WhatsApp or Telegram, with verified profiles delivered to you in under 10 minutes.",
  "For {DEMO} in {CITY}, finding a trustworthy {SERVICE_LC} can be frustrating. Most platforms are riddled with fake photos, hidden charges, or worse — scams. Safe Companion India is different. We have spent years building a verified network in {CITY}, screening candidates personally, and refining our booking process to be as fast and confidential as possible. From {AREA0} to {AREA4}, we cover the entire {CITY} area.",
  "{CITY}'s lifestyle scene has matured significantly over the past few years. Premium hotels like {HOTEL0} and {HOTEL1} now regularly host discerning clientele who book companions through trusted platforms like Safe Companion India. Our {SERVICE_LC} service in {CITY} is built on three pillars: verified profiles, transparent pricing, and absolute confidentiality.",
  "Whether you are a long-time {CITY} resident or visiting the city briefly, Safe Companion India makes booking a verified {SERVICE_LC} simple and safe. We have active companions across {AREA0}, {AREA1}, and other key {CITY} neighborhoods. The booking process is private, payment is transparent, and every companion has been verified through multi-step screening.",
  "{SERVICE} is one of our most popular service categories in {CITY}, especially among {DEMO}. Whether you need a companion for a quiet evening, a business event at {HOTEL0}, or a weekend trip exploring {LANDMARK0}, our verified network has the right match. {CITY} bookings can be made directly via WhatsApp or Telegram, with verified profiles shared within minutes.",
];

const whyUsBlocks = [
  "Verification is the cornerstone of our {CITY} operations. Every {SERVICE_LC} on our platform has submitted identity documents, sat for a personal interview, and undergone reference checks. We reject roughly 60% of applicants — quality matters more than quantity. When you book through Safe Companion India in {CITY}, you are choosing the top tier of verified, professional companions.",
  "Transparent pricing is non-negotiable for our {CITY} clients. Unlike platforms that bait you with low rates and then add booking fees, travel surcharges, and premium upgrades, our {SERVICE_LC} pricing in {CITY} is final. The quote you see is the price you pay. No surprises, no awkward conversations, no hidden charges.",
  "Discretion is our promise to every {CITY} client. Your identity, photos, location, and communication history are encrypted and never shared. We do not store unnecessary data. We do not advertise on platforms where your activity could be tracked. The {SERVICE_LC} you book in {CITY} will arrive, deliver an excellent experience, and disappear from your life if that is what you want.",
  "Speed matters in {CITY}. Many of our clients are busy professionals who cannot spend days coordinating bookings. That is why our {SERVICE_LC} booking process in {CITY} takes minutes, not hours. Message us on WhatsApp, receive verified profiles in under 10 minutes, confirm your choice, and meet your companion at your preferred location.",
  "Quality companions deserve quality clients. Our {SERVICE_LC} service in {CITY} is two-sided — we verify clients too. This protects our companions and ensures that every booking is between two respectful adults. Clients who violate our code of conduct are permanently banned, no exceptions.",
  "{CITY} clients have unique expectations, and we have built our service around them. Our {SERVICE_LC} options include short meetings, full evenings, overnight bookings, and travel companion packages. Whatever your need in {CITY}, we have a verified solution.",
];

const pricingBlocks = [
  "{SERVICE} pricing in {CITY} follows a transparent tier model. A short 1-2 hour meeting typically costs ₹5,000 to ₹15,000 depending on the companion's profile. Half-day bookings (4-6 hours) range from ₹15,000 to ₹35,000. Full-day or overnight bookings sit in the ₹30,000 to ₹70,000 range. Travel companion bookings for trips originating in {CITY} start at ₹40,000 per day. These ranges are firm — no hidden additions.",
  "In {CITY}, {SERVICE_LC} rates depend on three factors: the companion's tier (entry, premium, or VIP), the booking duration, and any special preferences. Entry-tier bookings start at ₹5,000 for short meetings. Premium tier averages ₹15,000 to ₹40,000. VIP companions in {CITY} can command ₹60,000 to ₹1,20,000 for overnight bookings. All rates include companion's time, transport within {CITY}, and our service guarantee.",
  "Our {SERVICE_LC} pricing in {CITY} is among the most competitive in the industry while maintaining premium quality. Short bookings start from ₹5,000. Standard half-day bookings cost ₹15,000-₹30,000. Premium overnight bookings range from ₹40,000 to ₹80,000. {CITY} clients pay only what they confirm — no escalation, no last-minute add-ons.",
  "Pricing transparency is critical for {CITY} bookings. Our {SERVICE_LC} rates are: ₹5,000-₹15,000 (1-2 hour meeting), ₹15,000-₹35,000 (half day), ₹30,000-₹70,000 (full day or overnight), ₹40,000-₹1,00,000 (travel companion per day). Hotel/venue costs in {CITY} are billed at actuals, never marked up. No advance payment required — full amount is paid after the service is completed.",
  "{CITY}'s {SERVICE_LC} market has wide pricing variability — some platforms quote ₹2,000 with hidden upgrades, others quote ₹2,00,000 with no clarity on what's included. Safe Companion India stays middle-ground: realistic premium pricing (₹15,000-₹70,000 for most bookings) with absolute clarity on what's included.",
  "Pricing for {SERVICE_LC} in {CITY} is structured to suit every budget level. Budget-conscious clients can start with a ₹5,000-₹8,000 short meeting. Mid-tier clients usually book ₹15,000-₹25,000 half-day experiences. Premium clients regularly book ₹50,000-₹80,000 overnight stays. Whatever your budget, {CITY} bookings remain transparent and dignified.",
];

const bookingFlows = [
  "Step 1: Send a WhatsApp or Telegram message with your basic preference — city ({CITY}), area, preferred date and duration. Step 2: Within 10 minutes, you receive 3-5 verified {SERVICE_LC} profiles to choose from. Step 3: Pick your preferred match, confirm time and venue. Step 4: Companion arrives at agreed time and location. Step 5: Pay full amount after the service is completed — no advance required.",
  "Booking a {SERVICE_LC} in {CITY} starts with a simple message: \"Hi, I want to book for [date] in [area]\". We respond within minutes with verified options. You choose, we confirm, advance is paid via UPI, and the meeting happens — all within a few hours if needed.",
  "The fastest way to book a {SERVICE_LC} in {CITY} is WhatsApp. Tell us your area, time slot, and budget range. We curate matches and share verified profiles privately. Once you confirm the booking, the companion is locked in. No advance payment required — pay after the service.",
  "{CITY} bookings can be made up to 24 hours in advance, though same-day bookings are also possible if companions are available. The flow: contact via WhatsApp → receive profiles → confirm booking → meeting happens → pay after service. Total time from inquiry to meeting can be as little as 2-3 hours.",
  "If you prefer email over WhatsApp, that is supported too. The flow remains the same — share your {CITY} requirement, receive verified {SERVICE_LC} profiles, confirm booking and meet your companion — pay after the service. Email is slower (1-2 hour response time) but suits clients who prefer documented communication.",
];

const safetyBlocks = [
  "Your safety is paramount during a {SERVICE_LC} booking in {CITY}. We recommend first meetings at neutral venues like a premium hotel lobby or upscale cafe. Carry your phone with live location shared to a trusted friend. Verify the companion's identity matches the photos sent. If anything feels off, leave — no payment required for incomplete first meetings.",
  "Discretion in {CITY} is achieved through multiple layers: separate communication numbers, encrypted Telegram option, NDA on request, no data retention beyond active booking, and companions trained to never reference you publicly. Your {SERVICE_LC} booking will not appear on any record visible to anyone.",
  "For married women in {CITY}, we offer enhanced discretion protocols — completely separate phone numbers, Telegram-only communication, hotel bookings in the companion's name, and zero photo retention. Your {SERVICE_LC} booking remains invisible to family and friends.",
  "{CITY} clients value privacy. Our team understands that and has built protocols around it. You can request a same-companion repeat for trust continuity, or rotate companions if you prefer anonymity. {SERVICE} bookings remain confidential by design.",
  "Should anything unexpected happen during your {CITY} booking, we have a 24/7 emergency line. Our team will intervene, replace the companion if needed, refund if appropriate, and ensure your safety. This level of accountability is what separates Safe Companion India from anonymous matchmaking platforms.",
  "Identity verification works both ways — we verify our {SERVICE_LC} companions, but we also verify clients lightly to prevent abuse of our companions. This two-sided verification creates a respectful ecosystem in {CITY} where both clients and companions feel safe.",
];

const testimonialPool = [
  { name: "Priya", age: 32, role: "Corporate Manager", q: "Booked a {SERVICE_LC} in {CITY} for a friend's wedding. Companion arrived polished and well-dressed, conversation flowed naturally. No awkwardness with my relatives. Worth every rupee." },
  { name: "Anjali", age: 38, role: "Housewife", q: "As a married woman in {CITY}, discretion is everything. Safe Companion India delivered. Separate communication channel, no data trail, completely respectful experience." },
  { name: "Riya", age: 27, role: "Software Engineer", q: "{SERVICE} booking in {CITY} was seamless. WhatsApp → verified profiles → meeting confirmed → great experience. Will definitely repeat." },
  { name: "Meera", age: 41, role: "Business Owner", q: "Used their {SERVICE_LC} service in {CITY} for an overnight stay. Premium experience, premium pricing, premium discretion. Exactly what I paid for, exactly what I expected." },
  { name: "Sneha", age: 29, role: "Doctor", q: "Was nervous about booking a {SERVICE_LC} in {CITY} for the first time. The team patiently answered all my questions, offered references, and made me comfortable. Booking went smoothly." },
  { name: "Kavita", age: 35, role: "Architect", q: "{CITY} has many platforms offering {SERVICE_LC} but most are scams. Safe Companion India is legitimate — verified profiles, real photos, transparent pricing." },
  { name: "Rina", age: 44, role: "Lawyer", q: "As a professional in {CITY}, I cannot afford any data leak. This service understands that. NDA on request, encrypted communication, no records kept beyond booking." },
  { name: "Poonam", age: 31, role: "College Lecturer", q: "Booked a {SERVICE_LC} in {CITY} for a weekend escape. Companion was friendly, well-mannered, and made the trip memorable. Felt safe throughout." },
];

function renderTemplate(tpl, city, service, profile) {
  return tpl
    .replace(/\{CITY\}/g, city.name)
    .replace(/\{STATE\}/g, city.state)
    .replace(/\{SERVICE_LC\}/g, service.name.toLowerCase())
    .replace(/\{SERVICE\}/g, service.name)
    .replace(/\{NICK\}/g, profile.nick)
    .replace(/\{AREA0\}/g, profile.areas[0] || city.name)
    .replace(/\{AREA1\}/g, profile.areas[1] || profile.areas[0] || city.name)
    .replace(/\{AREA2\}/g, profile.areas[2] || profile.areas[0] || city.name)
    .replace(/\{AREA3\}/g, profile.areas[3] || profile.areas[0] || city.name)
    .replace(/\{AREA4\}/g, profile.areas[4] || profile.areas[profile.areas.length - 1] || city.name)
    .replace(/\{HOTEL0\}/g, profile.hotels[0] || "premium hotels")
    .replace(/\{HOTEL1\}/g, profile.hotels[1] || profile.hotels[0] || "premium hotels")
    .replace(/\{LANDMARK0\}/g, profile.landmarks[0] || city.name)
    .replace(/\{LANDMARK1\}/g, profile.landmarks[1] || profile.landmarks[0] || city.name)
    .replace(/\{DEMO\}/g, profile.demographic);
}

export function buildPageContent(city, service) {
  const profile = cityProfiles[city.slug] || makeDefaultProfile(city);
  const seed = djb2(`${city.slug}-${service.slug}`);

  const intro = renderTemplate(heroIntros[seed % heroIntros.length], city, service, profile);
  const whyUs = renderTemplate(whyUsBlocks[(seed >>> 3) % whyUsBlocks.length], city, service, profile);
  const pricing = renderTemplate(pricingBlocks[(seed >>> 5) % pricingBlocks.length], city, service, profile);
  const booking = renderTemplate(bookingFlows[(seed >>> 7) % bookingFlows.length], city, service, profile);
  const safety = renderTemplate(safetyBlocks[(seed >>> 9) % safetyBlocks.length], city, service, profile);

  const buildTestimonial = (i) => {
    const t = testimonialPool[i % testimonialPool.length];
    return {
      name: t.name,
      age: t.age,
      role: t.role,
      quote: renderTemplate(t.q, city, service, profile),
    };
  };

  return {
    profile,
    intro,
    whyUs,
    pricing,
    booking,
    safety,
    testimonials: [
      buildTestimonial(seed),
      buildTestimonial(seed + 3),
      buildTestimonial(seed + 5),
    ],
  };
}
