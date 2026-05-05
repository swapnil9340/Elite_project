import HomeContent from "./components/HomeContent";
import { faqItems } from "./components/faqData";

const SITE_URL = "https://www.safecompanion.in";

export const metadata = {
  title:
    "Safe Companion India | Genuine Male Escort, Gigolo & Playboy Service for Women – No Hidden Charges",
  description:
    "Safe Companion India – verified male escort, gigolo, playboy & callboy service for women, housewives, college girls and working ladies across 50+ Indian cities (Bhopal, Indore, Mumbai, Delhi, Bangalore, Hyderabad, Pune, Kolkata, Chennai). 100% transparent pricing, zero hidden charges, discreet 24/7 WhatsApp & Telegram bookings.",
  keywords: [
    "male escort for women",
    "male escort for ladies",
    "gigolo service India",
    "gigolo near me",
    "playboy service India",
    "playboy job India",
    "callboy service",
    "callboy job India",
    "male companion for women",
    "boyfriend on rent",
    "rent a boyfriend India",
    "ladies service India",
    "service for housewife",
    "service for working women",
    "service for college girls",
    "high profile male escort",
    "VIP male companion",
    "verified male companion",
    "discreet companion booking",
    "WhatsApp male escort booking",
    "Telegram gigolo booking",
    "ladkiyon ke liye male companion",
    "ladies ke liye playboy service",
    "callboy ki jarurat hai",
    "gigolo kaise bane",
    "playboy kaise bane",
    "Bhopal gigolo",
    "Indore playboy",
    "Mumbai callboy",
    "Delhi male escort",
    "Bangalore gigolo service",
    "Hyderabad playboy",
    "Pune male companion",
    "Kolkata callboy",
    "Chennai male escort",
    "Jaipur gigolo",
    "Lucknow playboy",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Safe Companion India | Genuine Male Companion Service – No Hidden Charges",
    description:
      "Verified male companion service across 50+ Indian cities. Transparent pricing, zero hidden charges. Book discreetly on WhatsApp.",
    url: SITE_URL,
    type: "website",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Male Companion & Escort Service",
  provider: {
    "@type": "Organization",
    name: "Safe Companion India",
    url: SITE_URL,
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  description:
    "Genuine male companion service for women across 50+ Indian cities with transparent pricing and no hidden charges.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "INR",
    url: `${SITE_URL}/contact`,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <HomeContent />
    </>
  );
}
