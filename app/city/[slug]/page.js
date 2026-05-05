import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "../../data/cities";
import { services } from "../../data/services";

const SITE_URL = "https://www.safecompanion.in";
const whatsappNumber = "9340595938";
const whatsappLink = `https://wa.me/91${whatsappNumber}?text=Hello%2C%20I%20am%20interested%20in%20your%20premium%20companion%20service.`;
const telegramLink = `https://t.me/+91${whatsappNumber}`;
const callLink = `tel:+91${whatsappNumber}`;
const emailLink = `mailto:contact@safecompanion.in?subject=Companion%20Booking%20Request`;

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const city = getCityBySlug(params.slug);
  if (!city) return {};

  const title = `${city.name} Male Escort, Gigolo, Playboy & Callboy Service | Safe Companion India`;
  const description = `Verified male escort, gigolo, playboy and callboy service in ${city.name}, ${city.state}. Discreet bookings, transparent pricing, no hidden charges. WhatsApp & Telegram support 24/7.`;

  return {
    title,
    description,
    keywords: [
      `${city.name} male escort`,
      `${city.name} gigolo`,
      `${city.name} gigolo service`,
      `${city.name} playboy`,
      `${city.name} playboy job`,
      `${city.name} callboy`,
      `${city.name} callboy job`,
      `${city.name} male companion`,
      `${city.name} ladies service`,
      `${city.name} boyfriend on rent`,
      `male escort in ${city.name}`,
      `gigolo near me ${city.name}`,
      `playboy in ${city.name}`,
      `callboy in ${city.name}`,
    ],
    alternates: { canonical: `/city/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/city/${city.slug}`,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function CityPage({ params }) {
  const city = getCityBySlug(params.slug);
  if (!city) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cities",
        item: `${SITE_URL}/city`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: city.name,
        item: `${SITE_URL}/city/${city.slug}`,
      },
    ],
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/city/${city.slug}#localbusiness`,
    name: `Safe Companion India – ${city.name}`,
    image: `${SITE_URL}/og-image.jpg`,
    url: `${SITE_URL}/city/${city.slug}`,
    telephone: "+91-9340595938",
    priceRange: "₹₹",
    description: `Verified male companion, gigolo, playboy and callboy service in ${city.name}, ${city.state}.`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: "IN",
    },
    areaServed: city.name,
  };

  return (
    <main className="page-shell loaded">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />

      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link> <span>›</span>{" "}
        <Link href="/city">Cities</Link> <span>›</span>{" "}
        <span>{city.name}</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">{city.name}, {city.state}</p>
        <h1>
          Male Escort, Gigolo, Playboy &amp; Callboy Service in {city.name}
        </h1>
        <p className="hero-copy">
          Safe Companion India provides verified male companion service in{" "}
          {city.name}. Whether you&apos;re looking for a gigolo, playboy,
          callboy, or a polished male escort for an event — every booking is
          discreet, transparent, and 100% genuine. No hidden charges.
        </p>

        <div className="hero-actions">
          <a
            className="button primary"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            💬 WhatsApp – Book in {city.name}
          </a>
          <a
            className="button secondary"
            href={telegramLink}
            target="_blank"
            rel="noreferrer"
          >
            ✈️ Telegram
          </a>
          <a className="button secondary" href={callLink}>
            📞 Call Now
          </a>
        </div>
      </section>

      <section className="section service-grid">
        <h2 className="section-title">Services Available in {city.name}</h2>
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/city/${city.slug}/${s.slug}`}
            className="service-card"
          >
            <h3>
              {s.name} in {city.name}
            </h3>
            <p>
              Verified {s.name.toLowerCase()} for women in {city.name}.
              Transparent pricing, discreet bookings.
            </p>
            <span className="button tertiary">View Details →</span>
          </Link>
        ))}
      </section>

      <section id="connect" className="section connect-section">
        <h2 className="section-title">Connect With Us in {city.name}</h2>
        <div className="connect-grid">
          <a
            className="connect-card whatsapp"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            <span className="connect-icon">💬</span>
            <strong>WhatsApp</strong>
            <span className="connect-sub">Fastest reply · 24/7</span>
          </a>
          <a className="connect-card call" href={callLink}>
            <span className="connect-icon">📞</span>
            <strong>Direct Call</strong>
            <span className="connect-sub">Talk to us now</span>
          </a>
          <a
            className="connect-card telegram"
            href={telegramLink}
            target="_blank"
            rel="noreferrer"
          >
            <span className="connect-icon">✈️</span>
            <strong>Telegram</strong>
            <span className="connect-sub">Private &amp; secure</span>
          </a>
          <a className="connect-card email" href={emailLink}>
            <span className="connect-icon">📧</span>
            <strong>Email</strong>
            <span className="connect-sub">contact@safecompanion.in</span>
          </a>
        </div>
      </section>

      <section className="section cities-section">
        <h2>Other Cities We Serve</h2>
        <div className="cities-grid">
          {cities
            .filter((c) => c.slug !== city.slug)
            .slice(0, 30)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/city/${c.slug}`}
                className="city-badge"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
