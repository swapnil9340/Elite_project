import Link from "next/link";

const SITE_URL = "https://www.safecompanion.in";

export const metadata = {
  title:
    "About Safe Companion India — India's Most Trusted Verified Male Companion Platform",
  description:
    "Learn about Safe Companion India — our mission, verification process, team, values and commitment to safe, transparent companion service across 40+ Indian cities.",
  keywords: [
    "about safe companion India",
    "trusted male companion India",
    "verified gigolo platform India",
    "safe companion company",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Safe Companion India",
    description:
      "India's most trusted verified male companion platform — discreet, transparent, no hidden charges.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Safe Companion India",
  url: `${SITE_URL}/about`,
  mainEntity: {
    "@type": "Organization",
    name: "Safe Companion India",
    foundingDate: "2018",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description:
      "India's most trusted verified male companion platform serving 40+ cities with transparent pricing and complete discretion.",
    areaServed: "IN",
    sameAs: [],
  },
};

export default function AboutPage() {
  return (
    <main className="page-shell loaded">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link> <span>›</span> <span>About</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">About Us</p>
        <h1>About Safe Companion India</h1>
        <p className="hero-copy">
          Safe Companion India is the country's most trusted verified male
          companion platform. Since 2018, we've connected thousands of women
          across 40+ Indian cities with discreet, professional companions for
          events, travel, dinners and personal time — always with transparent
          pricing and zero hidden charges.
        </p>
      </section>

      <section className="section feature-section">
        <div className="feature-panel">
          <h2>Our Mission</h2>
          <p>
            To provide women across India with a safe, transparent, and
            judgment-free way to book genuine male companionship. We believe
            every woman deserves the freedom to seek companionship on her own
            terms, without scams, without stigma, and without hidden costs.
          </p>
        </div>
        <div className="feature-panel">
          <h2>Our Values</h2>
          <ul className="feature-list">
            <li>✓ Verified profiles only — fully verified</li>
            <li>✓ Transparent pricing — no hidden charges</li>
            <li>✓ Complete discretion and confidentiality</li>
            <li>✓ Zero tolerance for scams or fake bookings</li>
            <li>✓ Safety-first for both clients and companions</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>Our Verification Process</h2>
        <div className="step-card">
          <strong>Step 1 — Identity Check</strong>
          <p>
            Every companion submits ID for verification. We confirm
            identity, age, and address.
          </p>
        </div>
        <div className="step-card">
          <strong>Step 2 — Photo Verification</strong>
          <p>
            We require recent clear photos that match the live person. Random
            video verification calls are conducted.
          </p>
        </div>
        <div className="step-card">
          <strong>Step 3 — Interview &amp; Training</strong>
          <p>
            A telephonic interview assesses communication skills, professional
            attitude, and fit for our platform.
          </p>
        </div>
        <div className="step-card">
          <strong>Step 4 — Background Check</strong>
          <p>
            Past complaints and behavioral history are reviewed before
            approval.
          </p>
        </div>
        <div className="step-card">
          <strong>Step 5 — Ongoing Quality Monitoring</strong>
          <p>
            Client feedback after every booking. Any companion with repeated
            negative reviews is permanently removed.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>By The Numbers</h2>
        <div className="hero-stats">
          <div className="stat-card">
            <span>2018</span>
            <p>Founded</p>
          </div>
          <div className="stat-card">
            <span>40+</span>
            <p>Cities Active</p>
          </div>
          <div className="stat-card">
            <span>10,000+</span>
            <p>Bookings Completed</p>
          </div>
          <div className="stat-card">
            <span>4.9 / 5</span>
            <p>Average Rating</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Get In Touch</h2>
        <p>
          Have questions? <Link href="/contact">Contact us</Link>, read our{" "}
          <Link href="/privacy">privacy policy</Link>, or browse our{" "}
          <Link href="/blog">blog</Link> for expert guides.
        </p>
      </section>
    </main>
  );
}
