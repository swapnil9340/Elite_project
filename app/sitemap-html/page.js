import Link from "next/link";
import { services } from "../data/services";
import { cities } from "../data/cities";
import { forWomenCities } from "../data/forWomen";

const SITE_URL = "https://www.safecompanion.in";

export const metadata = {
  title: "HTML Sitemap | All Pages – Safe Companion India",
  description:
    "Complete HTML sitemap of Safe Companion India — all service pages, city pages and city+service combinations. Easy navigation for users and search engine crawlers.",
  keywords: [
    "safe companion sitemap",
    "all pages safe companion India",
    "site index male companion",
  ],
  alternates: { canonical: "/sitemap-html" },
  robots: { index: true, follow: true },
};

export default function HtmlSitemap() {
  return (
    <main className="page-shell loaded">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link> <span>›</span> <span>HTML Sitemap</span>
      </nav>

      <section className="hero">
        <h1>HTML Sitemap — All Pages on Safe Companion India</h1>
        <p className="hero-copy">
          Complete index of every page on our site. Crawlers and users can
          navigate to any service, city, or city+service combination from here.
        </p>
      </section>

      <section className="section">
        <h2>Main Pages</h2>
        <ul className="feature-list">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/services">All Services</Link>
          </li>
          <li>
            <Link href="/city">All Cities</Link>
          </li>
          <li>
            <Link href="/for-women">For Women — Bhopal &amp; Indore</Link>
          </li>
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
        </ul>
      </section>

      <section className="section">
        <h2>For Women — Dedicated Female-Client Pages</h2>
        <ul className="feature-list">
          {forWomenCities.map((c) => (
            <li key={c.slug}>
              <Link href={`/for-women/${c.slug}`}>
                Male Companion Service for Women in {c.name} —{" "}
                {c.areas.slice(0, 4).join(", ")}…
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>All Services ({services.length})</h2>
        <ul className="feature-list">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`}>{s.name} – India</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>All Cities ({cities.length})</h2>
        <ul className="feature-list">
          {cities.map((c) => (
            <li key={c.slug}>
              <Link href={`/city/${c.slug}`}>
                {c.name} ({c.state}) — Male Companion Service
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>
          City × Service Combinations ({cities.length * services.length})
        </h2>
        {cities.map((c) => (
          <div key={c.slug} style={{ marginBottom: 24 }}>
            <h3>{c.name}</h3>
            <ul className="feature-list">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/city/${c.slug}/${s.slug}`}>
                    {s.name} in {c.name} – Verified &amp; Discreet
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
