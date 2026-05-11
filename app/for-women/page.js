import Link from "next/link";
import { forWomenCities } from "../data/forWomen";

const SITE_URL = "https://www.safecompanion.in";

export const metadata = {
  title:
    "Male Companion Service for Women — Bhopal & Indore Verified Listings | Safe Companion India",
  description:
    "Dedicated male companion, gigolo, playboy aur callboy service ladies, housewives aur working women ke liye — Bhopal aur Indore mein verified, discreet, transparent.",
  keywords: [
    "male companion service for women India",
    "male escort for ladies Bhopal Indore",
    "gigolo for women MP",
    "playboy service ladies Madhya Pradesh",
    "verified male companion for women",
    "ladies male escort Bhopal Indore",
  ],
  alternates: { canonical: "/for-women" },
  openGraph: {
    title: "Male Companion Service for Women — Bhopal & Indore",
    description:
      "Verified, discreet male companion service for ladies in Bhopal aur Indore. Transparent rates, no hidden charges.",
    url: `${SITE_URL}/for-women`,
    type: "website",
  },
};

export default function ForWomenIndex() {
  return (
    <main className="page-shell loaded">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link> <span>›</span> <span>For Women</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">Sirf Ladies, Housewives & Working Women Ke Liye</p>
        <h1>Male Companion Service for Women — Bhopal &amp; Indore</h1>
        <p className="hero-copy">
          Hamare dedicated female-client pages Bhopal aur Indore ki ladies ke
          liye specially designed hain — verified male companions, area-wise
          availability, Hindi/Hinglish FAQs, aur 100% discreet booking.
        </p>
      </section>

      <section className="section service-grid">
        {forWomenCities.map((c) => (
          <Link
            key={c.slug}
            href={`/for-women/${c.slug}`}
            className="service-card"
          >
            <h3>{c.name} — For Women</h3>
            <p>{c.tagline}</p>
            <p>
              <strong>Areas:</strong> {c.areas.slice(0, 5).join(", ")}…
            </p>
            <span className="button tertiary">Open {c.name} Page →</span>
          </Link>
        ))}
      </section>

      <section className="section">
        <h2>All-India Service Bhi Dekhein</h2>
        <p>
          Agar aap kisi aur city se hain, hum 40+ Indian cities mein available
          hain — <Link href="/city">all cities dekhein</Link> ya{" "}
          <Link href="/services">services browse karein</Link>.
        </p>
      </section>
    </main>
  );
}
