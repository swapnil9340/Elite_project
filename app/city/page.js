import Link from "next/link";
import { cities } from "../data/cities";

const SITE_URL = "https://www.safecompanion.in";

export const metadata = {
  title: "All Cities | Male Escort, Gigolo & Playboy Service India – Safe Companion",
  description:
    "Verified male companion, gigolo, playboy and callboy service across 40+ Indian cities. Choose your city and book discreetly on WhatsApp or Telegram.",
  keywords: [
    "male escort all cities India",
    "gigolo service Indian cities",
    "playboy service city list",
    "callboy service city wise India",
  ],
  alternates: { canonical: "/city" },
  openGraph: {
    title: "All Cities – Safe Companion India",
    description:
      "Choose your city and book a verified male companion. 40+ Indian cities supported.",
    url: `${SITE_URL}/city`,
    type: "website",
  },
};

export default function CitiesIndex() {
  return (
    <main className="page-shell loaded">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link> <span>›</span> <span>Cities</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">All Cities</p>
        <h1>Safe Companion India — Available in 40+ Cities</h1>
        <p className="hero-copy">
          Choose your city below to view local male escort, gigolo, playboy and
          callboy service details. Every city has verified companions,
          transparent pricing, and zero hidden charges.
        </p>
      </section>

      <section className="section cities-section">
        <div className="cities-grid">
          {cities.map((c) => (
            <Link key={c.slug} href={`/city/${c.slug}`} className="city-badge">
              {c.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
