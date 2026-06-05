import Link from "next/link";
import { notFound } from "next/navigation";
import {
  forWomenCities,
  getForWomenBySlug,
} from "../../data/forWomen";
import { services } from "../../data/services";
const SITE_URL = "https://www.safecompanion.in";
const whatsappNumber = "8109156664";
const telegramNumber = "9340595938";
const telegramLink = `https://t.me/+91${telegramNumber}`;
const emailLink = `mailto:contact@safecompanion.in?subject=Companion%20Booking%20Request`;

export function generateStaticParams() {
  return forWomenCities.map((c) => ({ city: c.slug }));
}

export function generateMetadata({ params }) {
  const city = getForWomenBySlug(params.city);
  if (!city) return {};
  return {
    title: `Best Male Service in ${city.name} for Women | ${city.title}`,
    description: city.metaDescription,
    keywords: [
      `best male service in ${city.name} for women`,
      `top male escort ${city.name} ladies`,
      `best gigolo for women ${city.name}`,
      `best playboy ${city.name} ladies`,
      `top male companion ${city.name} for housewife`,
      `${city.name} ladies male companion contact`,
      `online male escort booking ${city.name} for women`,
      ...city.keywords,
    ],
    alternates: { canonical: `/for-women/${city.slug}` },
    openGraph: {
      title: city.title,
      description: city.metaDescription,
      url: `${SITE_URL}/for-women/${city.slug}`,
      type: "website",
      locale: "hi_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: city.title,
      description: city.metaDescription,
    },
  };
}

export default function ForWomenCityPage({ params }) {
  const city = getForWomenBySlug(params.city);
  if (!city) notFound();

  const whatsappMsg = encodeURIComponent(
    `Namaste, mujhe ${city.name} mein ladies ke liye companion service book karni hai. Please verified profiles bhejhein.`
  );
  const whatsappLink = `https://wa.me/91${whatsappNumber}?text=${whatsappMsg}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "For Women",
        item: `${SITE_URL}/for-women`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${city.name} (For Women)`,
        item: `${SITE_URL}/for-women/${city.slug}`,
      },
    ],
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/for-women/${city.slug}#localbusiness`,
    name: `Safe Companion India – ${city.name} (For Women)`,
    image: `${SITE_URL}/og-image.jpg`,
    url: `${SITE_URL}/for-women/${city.slug}`,
    telephone: "+91-8109156664",
    priceRange: "₹₹",
    description: city.metaDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: "IN",
    },
    areaServed: city.areas.map((a) => ({
      "@type": "Place",
      name: `${a}, ${city.name}`,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "184",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link> <span>›</span>{" "}
        <Link href="/for-women">For Women</Link> <span>›</span>{" "}
        <span>{city.name}</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">
          {city.name} · Sirf Ladies Ke Liye · 100% Discreet
        </p>
        <h1>{city.h1}</h1>
        <p className="hero-copy">{city.tagline}</p>

        <div className="hero-actions">
          <a
            className="button primary"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            💬 WhatsApp – {city.name} Mein Book Karein
          </a>
          <a
            className="button secondary"
            href={telegramLink}
            target="_blank"
            rel="noreferrer"
          >
            ✈️ Telegram
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span>100% Verified</span>
            <p>Fully Verified</p>
          </div>
          <div className="stat-card">
            <span>0 Hidden Charges</span>
            <p>Transparent Pricing</p>
          </div>
          <div className="stat-card">
            <span>24/7 Discreet</span>
            <p>Confidential Service</p>
          </div>
        </div>
      </section>

      <section className="section feature-section">
        {city.audienceSections.map((sec) => (
          <div className="feature-panel" key={sec.title}>
            <h2>{sec.title}</h2>
            <p>{sec.copy}</p>
            <a
              className="button tertiary"
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              💬 Discreet WhatsApp Booking
            </a>
          </div>
        ))}
      </section>

      <section className="section service-grid">
        <h2 className="section-title">
          {city.name} Mein Available Services (Sirf Ladies Ke Liye)
        </h2>
        {services.map((s) => (
          <div key={s.slug} className="service-card">
            <h3>
              {s.name} for Women in {city.name}
            </h3>
            <p>
              Verified {s.name.toLowerCase()} for ladies, housewives aur
              working women in {city.name}. Discreet bookings, transparent
              pricing.
            </p>
            <a
              className="button tertiary"
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              💬 Book on WhatsApp
            </a>
          </div>
        ))}
      </section>

      <section className="section cities-section">
        <h2>{city.name} Ke Areas Jahan Service Available Hai</h2>
        <p>
          Aapke nazdiki area mein discreet companion meet hota hai — apna
          preferred area select karein:
        </p>
        <div className="cities-grid">
          {city.areas.map((a) => (
            <span key={a} className="city-badge">
              {a}
            </span>
          ))}
        </div>
      </section>

      {city.seoSections && (
        <section className="section">
          {city.seoSections.map((sec) => (
            <div key={sec.heading} style={{ marginBottom: 24 }}>
              <h2>{sec.heading}</h2>
              <p>{sec.body}</p>
            </div>
          ))}
        </section>
      )}

      <section id="connect" className="section connect-section">
        <h2 className="section-title">
          Discreet Connect Options ({city.name})
        </h2>
        <p className="section-subtitle">
          Aapke comfort ke according — koi bhi channel choose karein. Sab
          private aur confidential.
        </p>
        <div className="connect-grid">
          <a
            className="connect-card whatsapp"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            <span className="connect-icon">💬</span>
            <strong>WhatsApp</strong>
            <span className="connect-sub">
              {city.name} pe pre-filled msg · 24/7
            </span>
          </a>
          <a
            className="connect-card telegram"
            href={telegramLink}
            target="_blank"
            rel="noreferrer"
          >
            <span className="connect-icon">✈️</span>
            <strong>Telegram</strong>
            <span className="connect-sub">Most private channel</span>
          </a>
          <a className="connect-card email" href={emailLink}>
            <span className="connect-icon">📧</span>
            <strong>Email</strong>
            <span className="connect-sub">contact@safecompanion.in</span>
          </a>
        </div>
      </section>

      <section className="section faq-section">
        <h2 className="section-title">
          FAQs — Ladies Ke Sawaal ({city.name})
        </h2>
        <div className="faq-list">
          {city.faqs.map((f, i) => (
            <details className="faq-item" key={i}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Yeh Bhi Dekhein</h2>
        <p>
          {city.name} ki All-India service page ya doosri city dekhna chahein:
        </p>
        <div className="cities-grid">
          <Link href={`/city/${city.slug}`} className="city-badge">
            {city.name} (Full Page)
          </Link>
          {forWomenCities
            .filter((c) => c.slug !== city.slug)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/for-women/${c.slug}`}
                className="city-badge"
              >
                {c.name} (For Women)
              </Link>
            ))}
          <Link href="/blog" className="city-badge">
            All Blog Articles
          </Link>
          <Link href="/contact" className="city-badge">
            Contact Form
          </Link>
        </div>
      </section>
    </main>
  );
}
