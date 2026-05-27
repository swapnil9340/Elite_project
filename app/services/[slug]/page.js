import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "../../data/services";
import { cities } from "../../data/cities";

const SITE_URL = "https://www.safecompanion.in";
const whatsappNumber = "not avalible now ";
const whatsappLink = `https://wa.me/91${whatsappNumber}?text=Hello%2C%20I%20am%20interested%20in%20your%20premium%20companion%20service.`;
const telegramLink = `https://t.me/+91${whatsappNumber}`;
const callLink = `tel:+91${whatsappNumber}`;
const emailLink = `mailto:contact@safecompanion.in?subject=Companion%20Booking%20Request`;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  const title = `Best ${service.name} India | Top Verified, Discreet & No Hidden Charges – Safe Companion`;
  const description = `Best ${service.name.toLowerCase()} in India — top verified options. ${service.intro} Available in 50+ Indian cities with transparent pricing.`;

  return {
    title,
    description,
    keywords: [
      `best ${service.name.toLowerCase()} India`,
      `top ${service.name.toLowerCase()} India`,
      `best ${service.name.toLowerCase()} near me`,
      `top verified ${service.name.toLowerCase()}`,
      `${service.name.toLowerCase()} contact number India`,
      `cheap ${service.name.toLowerCase()} India`,
      `online ${service.name.toLowerCase()} booking`,
      `verified ${service.name.toLowerCase()} India`,
      ...service.keywords,
    ],
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/services/${service.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_URL}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${SITE_URL}/services/${service.slug}`,
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: {
      "@type": "Organization",
      name: "Safe Companion India",
      url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "India" },
    description: service.intro,
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
        <Link href="/services">Services</Link> <span>›</span>{" "}
        <span>{service.name}</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">{service.name} – All India</p>
        <h1>{service.h1}</h1>
        <p className="hero-copy">{service.intro}</p>

        <div className="hero-actions">
          <a
            className="button primary"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            💬 WhatsApp Now
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
          <Link className="button tertiary" href="/contact">
            📝 Booking Form
          </Link>
        </div>
      </section>

      <section id="connect" className="section connect-section">
        <h2 className="section-title">Connect With Us</h2>
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
        <h2>{service.name} Available In These Cities</h2>
        <p>Click your city to view local {service.name.toLowerCase()} details.</p>
        <div className="cities-grid">
          {cities.slice(0, 30).map((c) => (
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

      <section className="section">
        <h2>Other Services</h2>
        <div className="cities-grid">
          {services
            .filter((s) => s.slug !== service.slug)
            .map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="city-badge"
              >
                {s.name}
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
