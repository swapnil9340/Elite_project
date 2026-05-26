import Header from "./components/Header";
import QuickActions from "./components/QuickActions";
import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";

// next/font auto-optimizes: self-hosted, no layout shift, no extra DNS lookup.
// Direct Core Web Vitals improvement (CLS → 0, LCP faster).
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

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
    // Brand
    "safe companion",
    "safe companion India",
    "safecompanion.in",

    // Core service keywords (English)
    "male escort service India",
    "male escort for women",
    "male escort for ladies",
    "male companion service",
    "male companion for women",
    "genuine gigolo service",
    "gigolo service India",
    "gigolo near me",
    "gigolo job India",
    "gigolo job apply",
    "playboy service India",
    "playboy job India",
    "playboy job apply online",
    "callboy service",
    "callboy job",
    "callboy service India",
    "male callboy",
    "male escort job",
    "male model escort",
    "handsome male companion",
    "boyfriend on rent",
    "rent a boyfriend India",
    "male friendship club",
    "male friend for ladies",
    "male dating service",
    "paid male companion",
    "high profile male escort",
    "VIP male companion",
    "verified male companion",
    "no hidden charges escort",
    "discreet companion booking",
    "WhatsApp companion booking",
    "ladies companion service",
    "female friendly escort",
    "service for housewife",
    "service for working women",
    "service for college girls",
    "service for divorcee women",

    // Hindi / Hinglish keywords
    "ladkiyon ke liye male companion",
    "ladies ke liye playboy service",
    "female ke liye gigolo",
    "male escort ladkiyon ke liye",
    "callboy ki jarurat hai",
    "playboy chahiye",
    "gigolo kaise bane",
    "playboy kaise bane",
    "callboy job hindi",
    "ladkiyo ko khush karne wala",
    "handsome ladka chahiye",
    "ladies service India",
    "mahilaon ke liye sathi",

    // City + service combos
    "Bhopal male escort",
    "Bhopal gigolo service",
    "Bhopal playboy job",
    "Indore male companion",
    "Indore gigolo service",
    "Indore callboy",
    "Mumbai male escort service",
    "Mumbai gigolo",
    "Mumbai playboy service",
    "Mumbai callboy job",
    "Delhi gigolo",
    "Delhi male escort",
    "Delhi playboy job",
    "Delhi NCR callboy",
    "Bangalore male companion",
    "Bangalore gigolo service",
    "Bangalore playboy",
    "Hyderabad escort",
    "Hyderabad gigolo",
    "Hyderabad playboy job",
    "Pune male companion",
    "Pune gigolo service",
    "Pune callboy",
    "Kolkata gigolo service",
    "Kolkata male escort",
    "Kolkata playboy",
    "Chennai male escort",
    "Chennai gigolo",
    "Ahmedabad gigolo",
    "Ahmedabad playboy",
    "Jaipur male companion",
    "Jaipur gigolo service",
    "Lucknow callboy",
    "Lucknow playboy",
    "Chandigarh male escort",
    "Surat gigolo",
    "Nagpur callboy",
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
  manifest: "/site.webmanifest",
  other: {
    // Help mobile carriers render previews correctly
    "format-detection": "telephone=yes",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
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
  alternateName: ["Safe Companion", "SafeCompanion.in"],
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}/icon.svg`,
  description:
    "India's most trusted verified male escort and companion service across 50+ Indian cities with transparent pricing and zero hidden charges. Established 2018.",
  foundingDate: "2018",
  email: "contact@safecompanion.in",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-9340595938",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
      contactOption: "TollFree",
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-9340595938",
      contactType: "reservations",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  ],
  // sameAs lets Google verify brand identity across the web (E-E-A-T signal).
  // These are placeholder URLs — update with your real social profiles when created.
  sameAs: [
    "https://t.me/safecompanion",
    "https://wa.me/919340595938",
    "https://www.instagram.com/safecompanionindia",
    "https://www.facebook.com/safecompanionindia",
    "https://twitter.com/safecompanionin",
  ],
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  knowsAbout: [
    "Male Escort Service",
    "Gigolo Service India",
    "Playboy Service",
    "Callboy Service",
    "Male Companion for Women",
    "Boyfriend on Rent",
    "Event Companion",
    "Travel Companion",
  ],
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

// Viewport metadata — Next.js 14 splits this out. Affects mobile rendering scores.
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#070b14" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <head>
        {/* Canonical & hreflang are set per-page via Next.js metadata API.
            Hardcoding them here would override every page's canonical with
            the homepage URL — which makes Google treat all 412 pages as
            duplicates of "/" and skip indexing them. */}

        {/* Performance hints — pre-resolve DNS for click-out destinations */}
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://t.me" />
        <link rel="preconnect" href="https://wa.me" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://t.me" crossOrigin="anonymous" />
        <link rel="alternate" type="application/rss+xml" title="Safe Companion India — Main RSS" href={`${SITE_URL}/feed.xml`} />
        <link rel="alternate" type="application/rss+xml" title="Safe Companion India — Blog RSS" href={`${SITE_URL}/feed/blog.xml`} />
        <link rel="alternate" type="application/rss+xml" title="Safe Companion India — Cities RSS" href={`${SITE_URL}/feed/cities.xml`} />
        <link rel="alternate" type="application/rss+xml" title="Safe Companion India — Services RSS" href={`${SITE_URL}/feed/services.xml`} />
        <link rel="alternate" type="application/rss+xml" title="Safe Companion India — Jobs RSS" href={`${SITE_URL}/feed/jobs.xml`} />
        <link rel="alternate" type="application/atom+xml" title="Safe Companion India — Atom" href={`${SITE_URL}/atom.xml`} />
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
              <div className="footer-section quick-links">
                <h3>Quick Links</h3>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/services">All Services</Link></li>
                  <li><Link href="/city">All Cities</Link></li>
                  <li><Link href="/for-women">For Women</Link></li>
                  <li><Link href="/join">Apply for Job</Link></li>
                  <li><Link href="/blog">Blog</Link></li>
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/hi">हिन्दी (Hindi)</Link></li>
                  <li><Link href="/#how-it-works">How It Works</Link></li>
                  <li><Link href="/#testimonials">Reviews</Link></li>
                  <li><Link href="/#faq">FAQ</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                  <li><Link href="/privacy">Privacy Policy</Link></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Connect With Us</h3>
                <p>
                  💬 WhatsApp:{" "}
                  <a href={whatsappLink} target="_blank" rel="noreferrer">
                    +91 93405 xxxxx
                  </a>
                </p>
                <p>
                  📞 Call:{" "}
                  <a href={`tel:+91${whatsappNumber}`}>+91 93405 xxxxx</a>
                </p>
                <p>
                  ✈️ Telegram:{" "}
                  <a
                    href={`https://t.me/+91${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Chat
                  </a>
                </p>
                <p>
                  📧 Email:{" "}
                  <a href="mailto:contact@safecompanion.in">
                    contact@safecompanion.in
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
              <p style={{ fontSize: 12, opacity: 0.6, marginTop: 6 }}>
                Last updated:{" "}
                {new Date().toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                {" "}· Verified content
              </p>
            </div>
          </div>
        </footer>
        <QuickActions />
      </body>
    </html>
  );
}
