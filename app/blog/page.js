import Link from "next/link";
import { posts } from "../data/blog";

const SITE_URL = "https://www.safecompanion.in";

export const metadata = {
  title:
    "Blog | Gigolo, Playboy, Callboy & Male Escort Career & Booking Guides – Safe Companion India",
  description:
    "Expert articles on gigolo jobs, playboy careers, callboy registration, male escort booking guides, pricing, safety, and legal status across India. Updated 2026.",
  keywords: [
    "gigolo blog India",
    "playboy job guide",
    "callboy career guide",
    "male escort booking blog",
    "companion service articles India",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Safe Companion India Blog – Career & Booking Guides",
    description:
      "Expert guides on gigolo, playboy, callboy and male escort services in India.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) =>
    a.date < b.date ? 1 : -1
  );

  return (
    <main className="page-shell loaded">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link> <span>›</span> <span>Blog</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">Safe Companion India Blog</p>
        <h1>
          Expert Guides — Gigolo, Playboy, Callboy &amp; Male Escort Careers in
          India
        </h1>
        <p className="hero-copy">
          Career guides, earnings breakdowns, legal information, safety tips
          and booking advice. Updated monthly.
        </p>
      </section>

      <section className="section service-grid">
        {sorted.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="service-card">
            <p className="eyebrow">
              {p.category} · {p.readMin} min · {p.date}
            </p>
            <h3>{p.title}</h3>
            <p>{p.excerpt}</p>
            <span className="button tertiary">Read Article →</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
