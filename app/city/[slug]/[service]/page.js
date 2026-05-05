import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "../../../data/cities";
import { services, getServiceBySlug } from "../../../data/services";

const SITE_URL = "https://www.safecompanion.in";
const whatsappNumber = "9340595938";
const telegramLink = `https://t.me/+91${whatsappNumber}`;
const callLink = `tel:+91${whatsappNumber}`;
const emailLink = `mailto:contact@safecompanion.in?subject=Companion%20Booking%20Request`;

export function generateStaticParams() {
  const params = [];
  for (const c of cities) {
    for (const s of services) {
      params.push({ slug: c.slug, service: s.slug });
    }
  }
  return params;
}

export function generateMetadata({ params }) {
  const city = getCityBySlug(params.slug);
  const service = getServiceBySlug(params.service);
  if (!city || !service) return {};

  const title = `${service.name} in ${city.name} | Verified, Discreet – Safe Companion India`;
  const description = `Book a verified ${service.name.toLowerCase()} in ${city.name}, ${city.state}. ${service.intro} No hidden charges, instant WhatsApp & Telegram booking.`;

  return {
    title,
    description,
    keywords: [
      `${service.name} in ${city.name}`,
      `${city.name} ${service.name.toLowerCase()}`,
      `${service.name.toLowerCase()} ${city.name}`,
      `${service.name.toLowerCase()} near me ${city.name}`,
      `book ${service.name.toLowerCase()} ${city.name}`,
      `${city.name} ${service.name.toLowerCase()} contact`,
      `${city.name} ${service.name.toLowerCase()} number`,
      `cheap ${service.name.toLowerCase()} ${city.name}`,
      `best ${service.name.toLowerCase()} in ${city.name}`,
      `${city.name} ${service.name.toLowerCase()} for ladies`,
      `${city.name} ${service.name.toLowerCase()} for women`,
      ...service.keywords,
    ],
    alternates: { canonical: `/city/${city.slug}/${service.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/city/${city.slug}/${service.slug}`,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function CityServicePage({ params }) {
  const city = getCityBySlug(params.slug);
  const service = getServiceBySlug(params.service);
  if (!city || !service) notFound();

  const whatsappLink = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
    `Hello, I want to book ${service.name} in ${city.name}.`
  )}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: city.name,
        item: `${SITE_URL}/city/${city.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${SITE_URL}/city/${city.slug}/${service.slug}`,
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${service.name} in ${city.name}`,
    provider: {
      "@type": "Organization",
      name: "Safe Companion India",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "AdministrativeArea", name: city.state },
    },
    description: `${service.intro} Specifically available in ${city.name}.`,
  };

  return (
    <main className="page-shell loaded">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link> <span>›</span>{" "}
        <Link href={`/city/${city.slug}`}>{city.name}</Link> <span>›</span>{" "}
        <span>{service.name}</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">
          {city.name} · {city.state}
        </p>
        <h1>
          {service.name} in {city.name} — Verified, Discreet &amp; No Hidden
          Charges
        </h1>
        <p className="hero-copy">
          Looking for a genuine {service.name.toLowerCase()} in {city.name}?
          Safe Companion India offers verified, professional companions across
          {" "}
          {city.name} and the {city.state} region. {service.intro}
        </p>

        <div className="hero-actions">
          <a
            className="button primary"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            💬 WhatsApp – Book {service.name} in {city.name}
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
            📞 Call
          </a>
        </div>
      </section>

      <section className="section feature-section">
        <div className="feature-panel">
          <h2>
            Why Choose Our {service.name} in {city.name}?
          </h2>
          <ul className="feature-list">
            <li>✓ 100% Verified profiles in {city.name}</li>
            <li>✓ Transparent pricing — no hidden charges</li>
            <li>✓ Quick reply on WhatsApp, Telegram &amp; Call</li>
            <li>✓ Discreet &amp; confidential bookings</li>
            <li>✓ Available across all {city.name} areas</li>
          </ul>
        </div>
        <div className="feature-panel">
          <h2>How To Book in {city.name}</h2>
          <div className="step-card">
            <strong>1. Contact Us</strong>
            <p>WhatsApp, Telegram or call — choose what suits you.</p>
          </div>
          <div className="step-card">
            <strong>2. Share Your Preference</strong>
            <p>
              Date, time, area in {city.name}, and what kind of{" "}
              {service.name.toLowerCase()} you need.
            </p>
          </div>
          <div className="step-card">
            <strong>3. Get Transparent Quote</strong>
            <p>Confirm the booking with full pricing upfront.</p>
          </div>
        </div>
      </section>

      <section id="connect" className="section connect-section">
        <h2 className="section-title">
          Connect for {service.name} in {city.name}
        </h2>
        <div className="connect-grid">
          <a
            className="connect-card whatsapp"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            <span className="connect-icon">💬</span>
            <strong>WhatsApp</strong>
            <span className="connect-sub">Pre-filled message · 24/7</span>
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
        <h2>Other Services in {city.name}</h2>
        <div className="cities-grid">
          {services
            .filter((s) => s.slug !== service.slug)
            .map((s) => (
              <Link
                key={s.slug}
                href={`/city/${city.slug}/${s.slug}`}
                className="city-badge"
              >
                {s.name}
              </Link>
            ))}
        </div>
      </section>

      <section className="section cities-section">
        <h2>
          {service.name} in Other Cities
        </h2>
        <div className="cities-grid">
          {cities
            .filter((c) => c.slug !== city.slug)
            .slice(0, 30)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/city/${c.slug}/${service.slug}`}
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
