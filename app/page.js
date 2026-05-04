import HomeContent from "./components/HomeContent";
import { faqItems } from "./components/faqData";

const SITE_URL = "https://www.safecompanion.in";

export const metadata = {
  title:
    "Safe Companion India | Genuine Male Escort & Companion Service – No Hidden Charges",
  description:
    "Safe Companion India – verified male escort & companion service for women across 50+ Indian cities (Bhopal, Indore, Mumbai, Delhi, Bangalore, Hyderabad, Pune, Kolkata, Chennai). 100% transparent pricing, zero hidden charges, discreet 24/7 WhatsApp bookings.",
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
