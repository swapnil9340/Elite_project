import Link from "next/link";

const SITE_URL = "https://www.safecompanion.in";

export const metadata = {
  title: "Privacy Policy | Safe Companion India",
  description:
    "Read the privacy policy of Safe Companion India. We protect your booking details, WhatsApp number, name, and city information. 100% confidential, never shared with third parties.",
  keywords: [
    "safe companion privacy",
    "companion service privacy policy",
    "data protection booking",
    "confidential male companion",
  ],
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | Safe Companion India",
    description:
      "How Safe Companion India protects your privacy and booking details. 100% confidential, no third-party sharing.",
    url: `${SITE_URL}/privacy`,
    type: "article",
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
      name: "Privacy Policy",
      item: `${SITE_URL}/privacy`,
    },
  ],
};

export default function PrivacyPage() {
  return (
    <main className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link> <span>›</span> <span>Privacy Policy</span>
      </nav>

      <section className="section">
        <h1>Privacy Policy</h1>
        <p className="hero-copy">
          Your privacy is the foundation of Safe Companion India. We never
          share your WhatsApp number, name, city, or booking details with any
          third party. All communication is kept confidential and used solely
          to process your companion service request.
        </p>
        <p>
          <strong>Last updated:</strong>{" "}
          {new Date().toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </section>

      <section className="section alt">
        <h2>1. Information We Collect</h2>
        <p>
          We collect only the details you voluntarily provide on our contact
          form or WhatsApp chat: your name, age, city, preferences, and any
          additional notes you share. No tracking cookies, no analytics
          fingerprinting, no data resale.
        </p>
      </section>

      <section className="section alt">
        <h2>2. How We Use Your Information</h2>
        <ul className="feature-list">
          <li>To respond to your booking request</li>
          <li>To match you with the right companion in your city</li>
          <li>To send you a transparent quote with no hidden charges</li>
          <li>
            To follow up via WhatsApp if you have questions about your booking
          </li>
        </ul>
        <p>
          We do not use your data for marketing, advertising, or analytics
          purposes outside the booking workflow.
        </p>
      </section>

      <section className="section alt">
        <h2>3. WhatsApp Communication</h2>
        <p>
          When you submit the booking form, your details are forwarded directly
          to our WhatsApp number so we can reply quickly and discreetly. We do
          not store your details on any third-party server beyond what
          WhatsApp&apos;s end-to-end encrypted infrastructure provides.
        </p>
      </section>

      <section className="section alt">
        <h2>4. Data Sharing &amp; Disclosure</h2>
        <p>
          Safe Companion India does not sell, rent, trade, or transfer your
          personal information to any external party. The only exception is
          when disclosure is required by Indian law or to protect our legal
          rights.
        </p>
      </section>

      <section className="section alt">
        <h2>5. Data Retention</h2>
        <p>
          Booking-related messages are kept only for as long as needed to
          coordinate your booking and resolve any follow-up questions. You may
          request deletion of your chat history at any time by sending us a
          message on WhatsApp.
        </p>
      </section>

      <section className="section alt">
        <h2>6. Your Rights</h2>
        <ul className="feature-list">
          <li>Right to access the data you have shared with us</li>
          <li>Right to request deletion of your data</li>
          <li>Right to opt out of any further communication</li>
          <li>Right to a copy of your booking conversation</li>
        </ul>
      </section>

      <section className="section alt">
        <h2>7. Age Restriction</h2>
        <p>
          Safe Companion India services are strictly for adults aged 18 years
          and above. We do not knowingly collect or process information from
          minors. If you are under 18, please do not contact us.
        </p>
      </section>

      <section className="section alt">
        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. The latest
          version will always be available on this page with an updated
          revision date.
        </p>
      </section>

      <section className="section alt">
        <h2>9. Contact</h2>
        <p>
          If you have questions about this privacy policy or your data, please{" "}
          <Link href="/contact">contact us</Link> via WhatsApp or our contact
          form.
        </p>
      </section>
    </main>
  );
}
