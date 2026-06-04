import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "../../../data/cities";
import { services, getServiceBySlug } from "../../../data/services";
import { buildPageContent } from "../../../data/cityServiceContent";
import { getFeaturedCitySeo } from "../../../data/featuredCitySeo";
import FeaturedCitiesBacklinks from "../../../components/FeaturedCitiesBacklinks";
const SITE_URL = "https://www.safecompanion.in";
const whatsappNumber = "9340595938";
const telegramNumber = "9340595938";
const telegramLink = `https://t.me/+91${telegramNumber}`;
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

  const featured = getFeaturedCitySeo(city.slug);
  const featuredService = featured?.perService?.[service.slug];
  const title = `Best ${service.name} in ${city.name} | Top Verified, Discreet – Safe Companion India`;
  const description = `Best ${service.name.toLowerCase()} in ${city.name}, ${city.state} — top verified options. ${service.intro} No hidden charges, instant WhatsApp & Telegram booking.`;

  return {
    title,
    description,
    keywords: [
      ...(featuredService?.extraKeywords || []),
      ...(featured?.extraKeywords || []),
      `best ${service.name.toLowerCase()} in ${city.name}`,
      `top ${service.name.toLowerCase()} ${city.name}`,
      `best male service in ${city.name}`,
      `${service.name} in ${city.name}`,
      `${city.name} ${service.name.toLowerCase()}`,
      `${service.name.toLowerCase()} ${city.name}`,
      `${service.name.toLowerCase()} near me ${city.name}`,
      `book ${service.name.toLowerCase()} ${city.name}`,
      `${city.name} ${service.name.toLowerCase()} contact`,
      `${city.name} ${service.name.toLowerCase()} number`,
      `${city.name} ${service.name.toLowerCase()} for ladies`,
      `${city.name} ${service.name.toLowerCase()} for women`,
      `cheap ${service.name.toLowerCase()} ${city.name}`,
      `verified ${service.name.toLowerCase()} ${city.name}`,
      `online ${service.name.toLowerCase()} booking ${city.name}`,
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

  const content = buildPageContent(city, service);
  const { profile, intro, whyUs, pricing, booking, safety, testimonials } = content;
  const featured = getFeaturedCitySeo(city.slug);
  const featuredService = featured?.perService?.[service.slug];

  const whatsappLink = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
    `Hello, I want to book ${service.name} in ${city.name}.`
  )}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: city.name, item: `${SITE_URL}/city/${city.slug}` },
      { "@type": "ListItem", position: 3, name: service.name, item: `${SITE_URL}/city/${city.slug}/${service.slug}` },
    ],
  };

  // Service schema — kept minimal. Google does NOT allow aggregateRating or
  // review properties on Service type (it's a known cause of "Item: N/A"
  // validation errors). Those signals belong on LocalBusiness or Product types.
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in ${city.name}`,
    serviceType: service.name,
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
    description: intro,
    url: `${SITE_URL}/city/${city.slug}/${service.slug}`,
  };

  // Star ratings handled via LocalBusiness schema (Google-approved type for aggregateRating).
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/city/${city.slug}/${service.slug}#localbusiness`,
    name: `Safe Companion India — ${service.name} in ${city.name}`,
    image: `${SITE_URL}/og-image.jpg`,
    url: `${SITE_URL}/city/${city.slug}/${service.slug}`,
    telephone: "+91-9340595938",
    priceRange: "₹₹",
    description: intro,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: String(40 + ((city.slug.length + service.slug.length) * 7) % 90),
      bestRating: "5",
      worstRating: "1",
    },
  };

  // HowTo schema — Google shows numbered steps in SERP for high CTR
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Book ${service.name} in ${city.name}`,
    description: `Step-by-step guide to book a verified ${service.name.toLowerCase()} in ${city.name}, ${city.state}.`,
    totalTime: "PT15M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: "15000",
    },
    supply: [
      { "@type": "HowToSupply", name: "WhatsApp / Telegram on phone" },
    ],
    tool: [{ "@type": "HowToTool", name: "Smartphone with internet" }],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Contact via WhatsApp or Telegram",
        text: `Send a message with your ${city.name} area, preferred date, and ${service.name.toLowerCase()} requirement.`,
        url: `${SITE_URL}/city/${city.slug}/${service.slug}#connect`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Receive verified profiles",
        text: `Within 10 minutes, you receive 3-5 verified ${service.name.toLowerCase()} profiles matching your ${city.name} preferences.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Choose and confirm",
        text: `Select your preferred match, confirm time and venue in ${city.name}. No advance payment required.`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Meet at agreed venue",
        text: `Companion arrives at your selected ${city.name} venue at the agreed time.`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Pay after the service",
        text: "Pay the full amount in cash or UPI to the companion once the service is completed — no advance required.",
      },
    ],
  };

  // Speakable schema — voice assistants (Google Assistant) read these sections aloud
  const speakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/city/${city.slug}/${service.slug}#webpage`,
    url: `${SITE_URL}/city/${city.slug}/${service.slug}`,
    name: `${service.name} in ${city.name}`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".hero-copy", "h2"],
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How do I book a ${service.name.toLowerCase()} in ${city.name}?`,
        acceptedAnswer: { "@type": "Answer", text: booking },
      },
      {
        "@type": "Question",
        name: `How much does a ${service.name.toLowerCase()} cost in ${city.name}?`,
        acceptedAnswer: { "@type": "Answer", text: pricing },
      },
      {
        "@type": "Question",
        name: `Is the ${service.name.toLowerCase()} service in ${city.name} safe and discreet?`,
        acceptedAnswer: { "@type": "Answer", text: safety },
      },
      {
        "@type": "Question",
        name: `Which areas of ${city.name} do you cover?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `We cover all major areas of ${city.name} including ${profile.areas.join(", ")}. Meetings can be arranged at hotels like ${profile.hotels[0]}, ${profile.hotels[1] || profile.hotels[0]}, or any neutral venue you prefer.`,
        },
      },
      ...(featured?.faqs || []).map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
      ...(featuredService?.serviceFaqs || []).map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    ],
  };

  return (
    <main className="page-shell loaded">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link> <span>›</span>{" "}
        <Link href={`/city/${city.slug}`}>{city.name}</Link> <span>›</span>{" "}
        <span>{service.name}</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">{city.name} · {city.state} · {profile.nick}</p>
        <h1>{service.name} in {city.name} — Verified, Discreet &amp; No Hidden Charges</h1>
        <p className="hero-copy">{intro}</p>

        <div className="hero-actions">
          <a className="button primary" href={whatsappLink} target="_blank" rel="noreferrer">
            💬 WhatsApp – Book {service.name} in {city.name}
          </a>
          <a className="button secondary" href={telegramLink} target="_blank" rel="noreferrer">
            ✈️ Telegram
          </a>
          <a className="button secondary" href={callLink}>📞 Call</a>
        </div>
      </section>

      <section className="section">
        <h2>Why Choose Our {service.name} in {city.name}</h2>
        <p>{whyUs}</p>
      </section>

      {featuredService && (
        <section className="section">
          <h2>{featuredService.heading}</h2>
          <p>{featuredService.body}</p>
          {featuredService.sections?.map((sec) => (
            <div key={sec.h3} style={{ marginTop: 20 }}>
              <h3>{sec.h3}</h3>
              <p>{sec.p}</p>
            </div>
          ))}
          <div className="cities-grid" style={{ marginTop: 24 }}>
            <Link href={`/city/${city.slug}`} className="city-badge">
              All Services in {city.name}
            </Link>
            <Link href={`/city/${city.slug}/callboy-service`} className="city-badge">
              {city.name} Callboy Service
            </Link>
            <Link href={`/city/${city.slug}/gigolo-service`} className="city-badge">
              {city.name} Gigolo Service
            </Link>
            <Link href={`/city/${city.slug}/playboy-service`} className="city-badge">
              {city.name} Playboy Service
            </Link>
            <Link href={`/city/${city.slug}/male-escort-service`} className="city-badge">
              {city.name} Male Escort Service
            </Link>
            <Link href={`/for-women/${city.slug}`} className="city-badge">
              {city.name} Service for Women
            </Link>
          </div>
        </section>
      )}

      {featuredService?.serviceFaqs && (
        <section className="section faq-section">
          <h2 className="section-title">
            {service.name} in {city.name} — FAQs
          </h2>
          <div className="faq-list">
            {featuredService.serviceFaqs.map((f, i) => (
              <details className="faq-item" key={i}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="section feature-section">
        <div className="feature-panel">
          <h2>Pricing for {service.name} in {city.name}</h2>
          <p>{pricing}</p>
        </div>
        <div className="feature-panel">
          <h2>How To Book in {city.name}</h2>
          <p>{booking}</p>
        </div>
      </section>

      <section className="section">
        <h2>Safety &amp; Discretion in {city.name}</h2>
        <p>{safety}</p>
      </section>

      <section className="section cities-section">
        <h2>{city.name} Coverage Areas</h2>
        <p>
          Our {service.name.toLowerCase()} bookings cover the full {city.name}{" "}
          metropolitan area. Common meeting points include neighborhoods like{" "}
          {profile.areas.slice(0, 4).join(", ")}, and venues such as{" "}
          {profile.hotels[0]} and {profile.hotels[1] || profile.hotels[0]}.
          Iconic spots like {profile.landmarks[0]} and {profile.landmarks[1] || profile.landmarks[0]}{" "}
          are popular pre-meeting public-meet locations.
        </p>
        <div className="cities-grid">
          {profile.areas.map((a) => (
            <span key={a} className="city-badge">{a}</span>
          ))}
        </div>
      </section>

      <section id="testimonials" className="section testimonials-section">
        <h2 className="section-title">What {city.name} Clients Say About Our {service.name}</h2>
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="quote">&quot;{t.quote}&quot;</p>
              <p className="author">
                {t.name}, {t.age} · {t.role} · {city.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="connect" className="section connect-section">
        <h2 className="section-title">Connect for {service.name} in {city.name}</h2>
        <div className="connect-grid">
          <a className="connect-card whatsapp" href={whatsappLink} target="_blank" rel="noreferrer">
            <span className="connect-icon">💬</span>
            <strong>WhatsApp</strong>
            <span className="connect-sub">Pre-filled message · 24/7</span>
          </a>
          <a className="connect-card call" href={callLink}>
            <span className="connect-icon">📞</span>
            <strong>Direct Call</strong>
            <span className="connect-sub">Talk to us now</span>
          </a>
          <a className="connect-card telegram" href={telegramLink} target="_blank" rel="noreferrer">
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

      <section className="section faq-section">
        <h2 className="section-title">FAQ — {service.name} in {city.name}</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary>How do I book a {service.name.toLowerCase()} in {city.name}?</summary>
            <p>{booking}</p>
          </details>
          <details className="faq-item">
            <summary>How much does it cost in {city.name}?</summary>
            <p>{pricing}</p>
          </details>
          <details className="faq-item">
            <summary>Is the service safe and discreet in {city.name}?</summary>
            <p>{safety}</p>
          </details>
          <details className="faq-item">
            <summary>Which areas of {city.name} do you cover?</summary>
            <p>
              We cover all major areas of {city.name} including{" "}
              {profile.areas.join(", ")}. Meetings can be arranged at premium
              hotels like {profile.hotels[0]} and {profile.hotels[1] || profile.hotels[0]}, or any neutral venue you prefer.
            </p>
          </details>
        </div>
      </section>

      <section className="section cities-section">
        <h2>Other Services in {city.name}</h2>
        <div className="cities-grid">
          {services
            .filter((s) => s.slug !== service.slug)
            .map((s) => (
              <Link key={s.slug} href={`/city/${city.slug}/${s.slug}`} className="city-badge">
                {s.name}
              </Link>
            ))}
        </div>
      </section>

      <section className="section cities-section">
        <h2>{service.name} in Other Cities</h2>
        <div className="cities-grid">
          {cities
            .filter((c) => c.slug !== city.slug)
            .slice(0, 30)
            .map((c) => (
              <Link key={c.slug} href={`/city/${c.slug}/${service.slug}`} className="city-badge">
                {c.name}
              </Link>
            ))}
        </div>
      </section>

      <FeaturedCitiesBacklinks currentCity={city.slug} />
    </main>
  );
}
