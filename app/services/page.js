import Link from "next/link";
import { services } from "../data/services";

const SITE_URL = "https://www.safecompanion.in";

export const metadata = {
  title: "All Services | Gigolo, Playboy, Callboy & Male Escort – Safe Companion India",
  description:
    "Browse all services offered by Safe Companion India — gigolo, playboy, callboy, male escort, boyfriend on rent, ladies service, event & travel companion. 50+ Indian cities. No hidden charges.",
  keywords: [
    "all male companion services India",
    "gigolo playboy callboy India",
    "male escort services list",
    "ladies service options India",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "All Services – Safe Companion India",
    description:
      "Gigolo, playboy, callboy, male escort, boyfriend on rent, event & travel companion across 50+ Indian cities.",
    url: `${SITE_URL}/services`,
    type: "website",
  },
};

export default function ServicesIndex() {
  return (
    <main className="page-shell loaded">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link> <span>›</span> <span>Services</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">All Services</p>
        <h1>All Companion Services Offered by Safe Companion India</h1>
        <p className="hero-copy">
          Choose from our complete range of verified services. Every service is
          available in 50+ Indian cities with transparent pricing and zero
          hidden charges.
        </p>
      </section>

      <section className="section service-grid">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="service-card"
          >
            <h3>{s.name}</h3>
            <p>{s.intro}</p>
            <span className="button tertiary">View Details →</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
