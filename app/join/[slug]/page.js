import Link from "next/link";
import { notFound } from "next/navigation";
import { jobs, getJobBySlug } from "../../data/jobs";
import { cities } from "../../data/cities";
import ApplyForm from "../../components/ApplyForm";

const SITE_URL = "https://www.safecompanion.in";
const whatsappNumber = "not avalible ";
const whatsappLink = `https://wa.me/91${whatsappNumber}?text=Hello%2C%20I%20want%20to%20apply%20for%20a%20job.`;
const telegramLink = `https://t.me/+91${whatsappNumber}`;

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export function generateMetadata({ params }) {
  const job = getJobBySlug(params.slug);
  if (!job) return {};
  return {
    title: job.title,
    description: job.intro,
    keywords: job.keywords,
    alternates: { canonical: `/join/${job.slug}` },
    openGraph: {
      title: job.title,
      description: job.intro,
      url: `${SITE_URL}/join/${job.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: job.title,
      description: job.intro,
    },
  };
}

export default function JobApplyPage({ params }) {
  const job = getJobBySlug(params.slug);
  if (!job) notFound();

  const jobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: `${job.role} – Verified Companion`,
    description: job.intro,
    datePosted: "2026-04-01",
    validThrough: "2027-04-01",
    employmentType: "PART_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Safe Companion India",
      sameAs: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressRegion: "India",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: {
        "@type": "QuantitativeValue",
        value: job.monthly,
        unitText: "MONTH",
      },
    },
    applicantLocationRequirements: { "@type": "Country", name: "India" },
    jobLocationType: "TELECOMMUTE",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Apply",
        item: `${SITE_URL}/join`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: job.role,
        item: `${SITE_URL}/join/${job.slug}`,
      },
    ],
  };

  return (
    <main className="page-shell loaded">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link> <span>›</span>{" "}
        <Link href="/join">Apply</Link> <span>›</span> <span>{job.role}</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">{job.role} Job · 100% Free Registration</p>
        <h1>{job.h1}</h1>
        <p className="hero-copy">{job.intro}</p>

        <div className="hero-stats">
          <div className="stat-card">
            <span>{job.earnings}</span>
            <p>Per Booking</p>
          </div>
          <div className="stat-card">
            <span>{job.monthly}</span>
            <p>Monthly Income</p>
          </div>
          <div className="stat-card">
            <span>48 Hours</span>
            <p>Verification Time</p>
          </div>
        </div>

        <div className="hero-actions">
          <a
            className="button primary"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            💬 Apply on WhatsApp
          </a>
          <a
            className="button secondary"
            href={telegramLink}
            target="_blank"
            rel="noreferrer"
          >
            ✈️ Apply on Telegram
          </a>
        </div>
      </section>

      <section className="section feature-section">
        <div className="feature-panel">
          <h2>Eligibility</h2>
          <ul className="feature-list">
            <li>✓ Age: 21 - 45 years</li>
            <li>✓ Indian citizen with valid ID (Aadhaar/PAN)</li>
            <li>✓ Good fitness, well-groomed appearance</li>
            <li>✓ Strong communication (Hindi/English)</li>
            <li>✓ Smartphone with WhatsApp + Telegram</li>
            <li>✓ Polite, respectful, professional attitude</li>
          </ul>
        </div>
        <div className="feature-panel">
          <h2>Why Apply With Us</h2>
          <ul className="feature-list">
            <li>✓ 100% FREE registration — never pay any fee</li>
            <li>✓ Verified high-profile clients only</li>
            <li>✓ Direct payment from client — no commission cut</li>
            <li>✓ Active in 40+ Indian cities</li>
            <li>✓ Discreet, professional, legal companion service</li>
            <li>✓ 24/7 support team</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>Submit Your Application</h2>
        <p>
          Fill the form — your message is auto-composed and opens in WhatsApp.
        </p>
        <ApplyForm role={job.role} />
      </section>

      <section className="section cities-section">
        <h2>{job.role} Job Available In These Cities</h2>
        <div className="cities-grid">
          {cities.map((c) => (
            <Link key={c.slug} href={`/city/${c.slug}`} className="city-badge">
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Other Job Roles</h2>
        <div className="cities-grid">
          {jobs
            .filter((j) => j.slug !== job.slug)
            .map((j) => (
              <Link
                key={j.slug}
                href={`/join/${j.slug}`}
                className="city-badge"
              >
                {j.role} Job
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
