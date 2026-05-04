import Header from "./components/Header";
import QuickActions from "./components/QuickActions";
import "./globals.css";
import Link from "next/link";

const SITE_URL = "https://www.safecompanion.in";
const whatsappNumber = "9340595938";
const whatsappLink = `https://wa.me/91${whatsappNumber}?text=Hello%2C%20I%20am%20interested%20in%20your%20premium%20companion%20service.`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Safe Companion India | Genuine Male Escort Service – No Hidden Charges",
    template: "%s | Safe Companion India",
  },
  description:
    "Safe Companion India offers a genuine, verified male escort & companion service across 50+ Indian cities including Bhopal, Indore, Mumbai, Delhi, Bangalore, Hyderabad, Pune, Kolkata & Chennai. 100% transparent pricing, no hidden charges, discreet bookings on WhatsApp.",
  keywords: [
    "safe companion",
    "safe companion India",
    "male escort service India",
    "male companion service",
    "genuine gigolo service",
    "no hidden charges escort",
    "verified male companion",
    "Bhopal male escort",
    "Indore male companion",
    "Mumbai male escort service",
    "Delhi gigolo",
    "Bangalore male companion",
    "Hyderabad escort",
    "Pune male companion",
    "Kolkata gigolo service",
    "Chennai male escort",
    "playboy job India",
    "discreet companion booking",
    "WhatsApp companion booking",
  ],
  authors: [{ name: "Safe Companion India" }],
  creator: "Safe Companion India",
  publisher: "Safe Companion India",
  category: "Lifestyle",
  applicationName: "Safe Companion India",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Safe Companion India",
    title:
      "Safe Companion India | Genuine Male Escort Service – No Hidden Charges",
    description:
      "Genuine, verified male companion service for women across 50+ Indian cities. Transparent pricing, zero hidden charges. Book discreetly on WhatsApp 24/7.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Safe Companion India – Genuine Male Companion Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safe Companion India | Genuine Male Companion Service",
    description:
      "Verified male escort & companion service across 50+ Indian cities. Transparent rates, no hidden charges. Book on WhatsApp.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "92d3a666e2b38f5e",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Safe Companion India",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Genuine male escort and companion service across 50+ Indian cities with transparent pricing and zero hidden charges.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9340595938",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [],
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Safe Companion India",
  image: `${SITE_URL}/og-image.jpg`,
  url: SITE_URL,
  telephone: "+91-9340595938",
  priceRange: "₹₹",
  description:
    "Verified male companion service for women across India – Bhopal, Indore, Mumbai, Delhi, Bangalore and 45+ more cities.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressRegion: "India",
  },
  areaServed: [
    "Bhopal",
    "Indore",
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Kolkata",
    "Chennai",
    "Jaipur",
    "Lucknow",
    "Chandigarh",
    "Surat",
    "Nagpur",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "248",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Safe Companion India",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="canonical" href={SITE_URL} />
        <meta name="theme-color" content="#070b14" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <Header />

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h3>Safe Companion India</h3>
                <p>
                  Genuine male companion service across 50+ Indian cities. No
                  hidden charges, transparent pricing, fully discreet bookings.
                </p>
              </div>
              <div className="footer-section">
                <h3>Quick Links</h3>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/#services">Services</Link>
                  </li>
                  <li>
                    <Link href="/#how-it-works">How It Works</Link>
                  </li>
                  <li>
                    <Link href="/#testimonials">Reviews</Link>
                  </li>
                  <li>
                    <Link href="/#faq">FAQ</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link href="/privacy">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Contact Us</h3>
                <p>
                  WhatsApp:{" "}
                  <a href={whatsappLink} target="_blank" rel="noreferrer">
                    +91 93405 xxxxx
                  </a>
                </p>
                <p>Available 24/7 for bookings</p>
                <p>Discreet &amp; Confidential</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>
                &copy; {new Date().getFullYear()} Safe Companion India. All
                rights reserved. | Genuine Service, No Hidden Charges
              </p>
            </div>
          </div>
        </footer>
        <QuickActions />
      </body>
    </html>
  );
}
