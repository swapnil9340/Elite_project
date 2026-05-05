import Link from "next/link";
import { jobs } from "../data/jobs";

const SITE_URL = "https://www.safecompanion.in";

export const metadata = {
  title:
    "Apply for Gigolo, Playboy, Callboy & Male Escort Jobs in India — 100% Free Registration",
  description:
    "Apply online for verified gigolo, playboy, callboy and male escort jobs across 40+ Indian cities. Free registration, fast verification, transparent payouts.",
  keywords: [
    "gigolo job India",
    "playboy job apply online",
    "callboy job free registration",
    "male escort job India",
    "companion job apply",
  ],
  alternates: { canonical: "/join" },
  openGraph: {
    title: "Apply for Companion Jobs – Safe Companion India",
    description:
      "Free online registration for gigolo, playboy, callboy and male escort jobs across India.",
    url: `${SITE_URL}/join`,
    type: "website",
  },
};

export default function JoinIndex() {
  return (
    <main className="page-shell loaded">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link> <span>›</span> <span>Apply</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">Join Our Network · 100% Free Registration</p>
        <h1>Apply for Gigolo, Playboy, Callboy &amp; Male Escort Jobs</h1>
        <p className="hero-copy">
          India's most trusted companion platform. Choose your preferred role
          below, fill the application, and get verified within 48 hours.
        </p>
      </section>

      <section className="section service-grid">
        {jobs.map((j) => (
          <Link key={j.slug} href={`/join/${j.slug}`} className="service-card">
            <h3>{j.role} Job</h3>
            <p>{j.intro}</p>
            <p>
              <strong>Earnings:</strong> {j.earnings}
            </p>
            <span className="button tertiary">Apply Now →</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
