import Link from "next/link";
import ContactForm from "../components/ContactForm";

const SITE_URL = "https://www.safecompanion.in";

export const metadata = {
  title: "Contact Safe Companion India | Book Discreet Companion on WhatsApp",
  description:
    "Contact Safe Companion India for verified male companion bookings across 50+ Indian cities. Send your booking request via the form or chat directly on WhatsApp – fast reply, transparent pricing, zero hidden charges.",
  keywords: [
    "contact safe companion",
    "book male companion India",
    "book gigolo India",
    "book playboy India",
    "book callboy India",
    "WhatsApp companion booking",
    "Telegram gigolo booking",
    "male escort booking India",
    "male escort for women contact",
    "ladies service contact number",
    "playboy job apply",
    "gigolo job apply",
    "callboy registration",
    "discreet companion contact",
    "ladkiyon ke liye companion contact",
    "playboy contact number India",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Safe Companion India | Book on WhatsApp",
    description:
      "Send your booking request to Safe Companion India. Verified male companion service across 50+ cities. Fast WhatsApp reply.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Safe Companion India",
    description:
      "Book a verified male companion across 50+ Indian cities. WhatsApp chat available 24/7.",
  },
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
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact",
      item: `${SITE_URL}/contact`,
    },
  ],
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Safe Companion India",
  url: `${SITE_URL}/contact`,
  description:
    "Contact page to book a verified male companion across India via WhatsApp or contact form.",
  mainEntity: {
    "@type": "Organization",
    name: "Safe Companion India",
    telephone: "+91-not avalible ",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-not avalible ",
      contactType: "Bookings",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  },
};

export default function ContactPage() {
  return (
    <main className="page-shell loaded">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link> <span>›</span> <span>Contact</span>
      </nav>
      <ContactForm />
    </main>
  );
}
