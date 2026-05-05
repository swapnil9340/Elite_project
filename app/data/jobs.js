export const jobs = [
  {
    slug: "gigolo-job",
    role: "Gigolo",
    title: "Gigolo Job in India — Free Registration, Earn ₹1.5L+ Per Month",
    h1: "Apply for Gigolo Job in India — 100% Free Registration",
    intro:
      "Join India's most trusted gigolo platform. Free registration, fast verification, transparent payouts. Active in 40+ cities. Earn ₹15,000 - ₹80,000 per booking.",
    keywords: [
      "gigolo job India",
      "gigolo job apply",
      "gigolo job registration",
      "free gigolo registration",
      "gigolo job near me",
      "gigolo kaise bane",
      "gigolo job mumbai",
      "gigolo job delhi",
      "gigolo job bangalore",
    ],
    earnings: "₹15,000 - ₹80,000 per booking",
    monthly: "₹1.5L - ₹6L per month",
  },
  {
    slug: "playboy-job",
    role: "Playboy",
    title: "Playboy Job in India — Apply Online, Free Joining (2026)",
    h1: "Playboy Job India — Free Online Registration",
    intro:
      "Become a verified playboy and earn ₹20,000 - ₹1,00,000 per booking. India's leading platform with 40+ cities, transparent payouts, and zero registration fee.",
    keywords: [
      "playboy job India",
      "playboy job apply",
      "playboy job apply online",
      "playboy job registration",
      "free playboy job",
      "playboy job near me",
      "playboy kaise bane",
      "playboy job mumbai delhi bangalore",
    ],
    earnings: "₹20,000 - ₹1,00,000 per booking",
    monthly: "₹2L - ₹6L per month",
  },
  {
    slug: "callboy-job",
    role: "Callboy",
    title: "Callboy Job in India — Free Registration, Apply in 5 Minutes",
    h1: "Callboy Job India — Apply Free, Get Verified in 48 Hours",
    intro:
      "India's fastest-growing callboy registration platform. Free joining, verified clients, instant WhatsApp bookings. Active across 40+ cities.",
    keywords: [
      "callboy job India",
      "callboy job apply",
      "callboy registration",
      "callboy job free",
      "callboy job near me",
      "callboy kaise bane",
      "callboy job mumbai delhi",
    ],
    earnings: "₹10,000 - ₹50,000 per booking",
    monthly: "₹1L - ₹4L per month",
  },
  {
    slug: "male-escort-job",
    role: "Male Escort",
    title: "Male Escort Job in India — Verified Platform, Premium Earnings",
    h1: "Male Escort Job India — Apply Online for Free",
    intro:
      "Join India's premium male escort platform. Verified high-profile clientele, polished training, transparent earnings. ₹25,000 - ₹1,20,000 per booking.",
    keywords: [
      "male escort job India",
      "male escort job apply",
      "male escort registration",
      "male escort job free",
      "male model escort job",
    ],
    earnings: "₹25,000 - ₹1,20,000 per booking",
    monthly: "₹2.5L - ₹8L per month",
  },
];

export const getJobBySlug = (slug) => jobs.find((j) => j.slug === slug);
