"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { faqItems } from "./faqData";
import { services } from "../data/services";
import { cities } from "../data/cities";

const whatsappNumber = "9340595938";
const whatsappLink = `https://wa.me/91${whatsappNumber}?text=Hello%2C%20I%20am%20interested%20in%20your%20premium%20companion%20service.`;
const telegramLink = `https://t.me/+91${whatsappNumber}`;
const callLink = `tel:+91${whatsappNumber}`;
const smsLink = `sms:+91${whatsappNumber}?body=Hello%2C%20I%20want%20to%20book%20a%20companion%20service.`;
const emailLink = `mailto:contact@safecompanion.in?subject=Companion%20Booking%20Request&body=Hello%2C%20I%20would%20like%20to%20book%20a%20companion%20service.%20Please%20share%20details.`;

export default function HomeContent() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`page-shell ${isLoaded ? "loaded" : ""}`}>
      <section className="hero hero-grid">
        <div className="hero-copy-block">
          <p className="eyebrow animate-fade-in">
            Genuine Male Companion Service
          </p>
          <h1 className="animate-slide-up">
            Book a Discreet Male Companion Across India — Zero Hidden Charges
          </h1>
          <p className="hero-copy animate-fade-in-delay">
            Safe Companion India offers an authentic male companion service for
            women seeking genuine companionship. Available in{" "}
            <span className="highlight-city">Bhopal</span>,{" "}
            <span className="highlight-city">Indore</span>,{" "}
            <span className="highlight-city">Mumbai</span>,{" "}
            <span className="highlight-city">Delhi</span>,{" "}
            <span className="highlight-city">Bangalore</span>,{" "}
            <span className="highlight-city">Hyderabad</span>,{" "}
            <span className="highlight-city">Pune</span>,{" "}
            <span className="highlight-city">Ahmedabad</span>,{" "}
            <span className="highlight-city">Kolkata</span>,{" "}
            <span className="highlight-city">Chennai</span>, and 40+ cities. No
            hidden charges. Transparent rates. Real service.
          </p>

          <div className="hero-actions animate-bounce-in">
            <a
              className="button primary"
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              <span className="button-icon">💬</span>
              Chat on WhatsApp
            </a>
            <Link className="button secondary" href="/contact">
              <span className="button-icon">📝</span>
              Book a Session
            </Link>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span>50+ Cities</span>
            <p>All India Coverage</p>
          </div>
          <div className="stat-card">
            <span>No Extra Fees</span>
            <p>Transparent Pricing</p>
          </div>
          <div className="stat-card">
            <span>100% Genuine</span>
            <p>Real Service</p>
          </div>
        </div>
      </section>

      <section id="services" className="section service-grid">
        <h2 className="section-title animate-fade-in">
          Services Available in All Major Cities
        </h2>
        <div className="service-card float-animation">
          <div className="service-icon">🏙️</div>
          <h3>Discreet Meetings (All Cities)</h3>
          <p>
            Confidential meetings in Bhopal, Indore, Mumbai, Delhi, Bangalore,
            Hyderabad — all major Indian cities. No hidden charges.
          </p>
          <a
            className="button tertiary"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            <span className="button-icon">📍</span>
            Request Info
          </a>
        </div>
        <div className="service-card float-animation">
          <div className="service-icon">🎭</div>
          <h3>Event Companion</h3>
          <p>
            Attend events, dinners, or outings with a polished, confident
            partner.
          </p>
          <a
            className="button tertiary"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            <span className="button-icon">🎪</span>
            Check Availability
          </a>
        </div>
        <div className="service-card float-animation">
          <div className="service-icon">⏰</div>
          <h3>Personal Attention</h3>
          <p>
            Flexible and personalized time tailored to your comfort and
            schedule.
          </p>
          <a
            className="button tertiary"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            <span className="button-icon">💝</span>
            Send Request
          </a>
        </div>
      </section>

      <section id="features" className="section alt feature-section">
        <div className="feature-panel">
          <h2>Why Choose Safe Companion India — Genuine &amp; Trustworthy</h2>
          <p>
            Safe Companion India is a verified male companion service active
            across 50+ Indian cities. Transparent pricing, no hidden charges,
            real service. We are discreet, professional, and committed to
            genuine companionship.
          </p>
          <ul className="feature-list">
            <li>✓ Zero Hidden Charges — What You Quote Is What You Pay</li>
            <li>✓ 100% Genuine Service Across All India</li>
            <li>
              ✓ Available in Bhopal, Indore, Mumbai, Delhi, Bangalore, and 40+
              cities
            </li>
            <li>✓ Discreet, Professional, Trustworthy</li>
            <li>✓ 24/7 WhatsApp Support with Instant Replies</li>
          </ul>
        </div>
        <div className="feature-panel steps-panel" id="how-it-works">
          <h2>How to Book (Simple 3 Steps)</h2>
          <div className="step-card">
            <strong>1. Share Details</strong>
            <p>
              Tell us your city (Bhopal, Indore, Delhi, etc.), date, time, and
              what you&apos;re looking for.
            </p>
          </div>
          <div className="step-card">
            <strong>2. Get Transparent Quote</strong>
            <p>
              Receive a genuine quote with NO HIDDEN CHARGES. Full price upfront
              with no surprise fees.
            </p>
          </div>
          <div className="step-card">
            <strong>3. Book &amp; Enjoy</strong>
            <p>
              Confirm booking and meet your discreet male companion. Genuine,
              trustworthy service.
            </p>
          </div>
        </div>
      </section>

      <section id="testimonials" className="section testimonials-section">
        <h2 className="section-title animate-fade-in">What Our Clients Say</h2>
        <p className="section-subtitle animate-fade-in-delay">
          Real reviews from satisfied clients across India
        </p>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="quote">
              &quot;Amazing experience! The service was genuine and exactly as
              described. No hidden charges, very professional and discreet.
              Highly recommend for anyone in Delhi.&quot;
            </p>
            <p className="author">Priya S., Delhi</p>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="quote">
              &quot;Booked for an event in Mumbai. My companion was charming,
              well-mannered, and made the evening perfect. Transparent pricing,
              no surprises. Will book again!&quot;
            </p>
            <p className="author">Anjali M., Mumbai</p>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="quote">
              &quot;First time trying this service in Bangalore. Was nervous but
              the team was very professional. Genuine service, no extra
              charges. Felt safe and respected.&quot;
            </p>
            <p className="author">Kavita R., Bangalore</p>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="quote">
              &quot;Outstanding companion service in Pune. Very discreet,
              professional, and the pricing was exactly as quoted. No hidden
              fees whatsoever. Great experience!&quot;
            </p>
            <p className="author">Sneha K., Pune</p>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="quote">
              &quot;As a guy looking for genuine companionship, I found this
              service to be authentic and trustworthy. No scams, transparent
              rates. Highly satisfied with the experience.&quot;
            </p>
            <p className="author">Rahul V., Hyderabad</p>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="quote">
              &quot;Booked in Chennai for a special occasion. The companion was
              perfect - charming, respectful, and professional. No hidden
              charges, genuine service. Would recommend to friends.&quot;
            </p>
            <p className="author">Meera L., Chennai</p>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="quote">
              &quot;Great service in Kolkata. Very discreet and professional.
              The pricing was transparent with no extra fees. Had a wonderful
              time and felt completely safe.&quot;
            </p>
            <p className="author">Rina D., Kolkata</p>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="quote">
              &quot;As a male client, I was impressed by the genuine approach.
              No fake profiles or scams. Transparent pricing and professional
              service. Definitely worth it.&quot;
            </p>
            <p className="author">Arjun P., Ahmedabad</p>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="quote">
              &quot;Booked in Jaipur for a weekend. The companion was amazing -
              respectful, fun, and professional. No hidden charges, genuine
              service. Had an unforgettable experience.&quot;
            </p>
            <p className="author">Poonam T., Jaipur</p>
          </div>
        </div>
      </section>

      <section id="faq" className="section faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Everything you need to know before booking with Safe Companion India.
        </p>
        <div className="faq-list">
          {faqItems.map((item, idx) => (
            <details className="faq-item" key={idx}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="connect" className="section connect-section">
        <h2 className="section-title">Connect With Us — 5 Easy Ways</h2>
        <p className="section-subtitle">
          Choose your preferred channel. Reply within minutes, fully discreet
          and confidential.
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
          <a className="connect-card sms" href={smsLink}>
            <span className="connect-icon">✉️</span>
            <strong>SMS</strong>
            <span className="connect-sub">Quick text booking</span>
          </a>
          <a className="connect-card email" href={emailLink}>
            <span className="connect-icon">📧</span>
            <strong>Email</strong>
            <span className="connect-sub">contact@safecompanion.in</span>
          </a>
          <Link className="connect-card form" href="/contact">
            <span className="connect-icon">📝</span>
            <strong>Booking Form</strong>
            <span className="connect-sub">Fill &amp; submit</span>
          </Link>
        </div>
      </section>

      <section className="section contact-section">
        <h2>Book Your Genuine Male Companion Now</h2>
        <p>
          Authentic companion service for women across India — Bhopal, Indore,
          Mumbai, Delhi, Bangalore, Hyderabad, Pune, and 40+ cities. No extra
          charges. Transparent rates. Real service. Start your booking today.
        </p>
        <div className="hero-actions">
          <a
            className="button primary"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            Send WhatsApp Message
          </a>
          <Link className="button secondary" href="/contact">
            Fill Contact Form
          </Link>
        </div>
        <p className="privacy-note">
          You can also view our <Link href="/privacy">Privacy Policy</Link> for
          secure handling.
        </p>
      </section>

      <section className="section internal-hub-section">
        <h2 className="section-title">Browse All Services</h2>
        <p className="section-subtitle">
          Click any service to see full details, pricing &amp; city
          availability.
        </p>
        <div className="cities-grid">
          {services.map((s) => (
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

      <section className="section internal-hub-section">
        <h2 className="section-title">All Cities We Serve ({cities.length})</h2>
        <p className="section-subtitle">
          Click your city for verified male companion service in that area.
        </p>
        <div className="cities-grid">
          {cities.map((c) => (
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

      <section className="section internal-hub-section">
        <h2 className="section-title">For Women — Dedicated Pages</h2>
        <p className="section-subtitle">
          Special female-client-focused pages with area-wise availability.
        </p>
        <div className="cities-grid">
          <Link href="/for-women" className="city-badge">For Women — Index</Link>
          <Link href="/for-women/bhopal" className="city-badge">Bhopal — Ladies</Link>
          <Link href="/for-women/indore" className="city-badge">Indore — Ladies</Link>
        </div>
      </section>

      <section className="section internal-hub-section">
        <h2 className="section-title">Bhopal — Verified Service (Now Active)</h2>
        <p className="section-subtitle">
          Bhopal callboy, gigolo, playboy &amp; male escort service — sirf ladies,
          housewives aur working women ke liye. MP Nagar, Arera Colony, New
          Market, Kolar Road covered. 100% discreet, transparent rates.
        </p>
        <div className="cities-grid">
          <Link href="/city/bhopal" className="city-badge">Bhopal Male Service</Link>
          <Link href="/city/bhopal/callboy-service" className="city-badge">Bhopal Callboy Service</Link>
          <Link href="/city/bhopal/gigolo-service" className="city-badge">Bhopal Gigolo Service</Link>
          <Link href="/city/bhopal/playboy-service" className="city-badge">Bhopal Playboy Service</Link>
          <Link href="/city/bhopal/male-escort-service" className="city-badge">Bhopal Male Escort Service</Link>
          <Link href="/city/bhopal/boyfriend-on-rent" className="city-badge">Boyfriend on Rent Bhopal</Link>
          <Link href="/for-women/bhopal" className="city-badge">Bhopal Service for Women</Link>
          <Link href="/blog/boyfriend-on-rent-bhopal" className="city-badge">Bhopal Booking Guide 2026</Link>
        </div>
      </section>

      <section className="section internal-hub-section">
        <h2 className="section-title">Indore — Verified Service (Now Active)</h2>
        <p className="section-subtitle">
          Indore callboy, gigolo, playboy &amp; male escort service — sirf
          ladies, housewives aur working women ke liye. Vijay Nagar, Palasia,
          AB Road, Rajwada, Bhanwarkuan covered. 100% discreet, transparent rates.
        </p>
        <div className="cities-grid">
          <Link href="/city/indore" className="city-badge">Indore Male Service</Link>
          <Link href="/city/indore/callboy-service" className="city-badge">Indore Callboy Service</Link>
          <Link href="/city/indore/gigolo-service" className="city-badge">Indore Gigolo Service</Link>
          <Link href="/city/indore/playboy-service" className="city-badge">Indore Playboy Service</Link>
          <Link href="/city/indore/male-escort-service" className="city-badge">Indore Male Escort Service</Link>
          <Link href="/city/indore/boyfriend-on-rent" className="city-badge">Boyfriend on Rent Indore</Link>
          <Link href="/for-women/indore" className="city-badge">Indore Service for Women</Link>
        </div>
      </section>

      <section className="section internal-hub-section">
        <h2 className="section-title">Apply for Jobs</h2>
        <p className="section-subtitle">
          100% free registration, 48-hour verification.
        </p>
        <div className="cities-grid">
          <Link href="/join" className="city-badge">All Job Roles</Link>
          <Link href="/join/gigolo-job" className="city-badge">Gigolo Job</Link>
          <Link href="/join/playboy-job" className="city-badge">Playboy Job</Link>
          <Link href="/join/callboy-job" className="city-badge">Callboy Job</Link>
          <Link href="/join/male-escort-job" className="city-badge">Male Escort Job</Link>
        </div>
      </section>

      <section className="section internal-hub-section">
        <h2 className="section-title">Read Our Latest Articles</h2>
        <p className="section-subtitle">
          Career guides, pricing, safety, legal status, city guides — all updated 2026.
        </p>
        <div className="cities-grid">
          <Link href="/blog" className="city-badge">All Articles</Link>
          <Link href="/blog/how-to-become-a-gigolo-in-india" className="city-badge">How to Become a Gigolo</Link>
          <Link href="/blog/playboy-job-salary-india" className="city-badge">Playboy Salary in India</Link>
          <Link href="/blog/callboy-job-legal-status-india" className="city-badge">Callboy Job Legal Status</Link>
          <Link href="/blog/how-to-find-genuine-male-escort-india" className="city-badge">Find Genuine Male Escort</Link>
          <Link href="/blog/gigolo-job-near-me" className="city-badge">Gigolo Job Near Me</Link>
          <Link href="/blog/boyfriend-on-rent-india" className="city-badge">Boyfriend on Rent</Link>
          <Link href="/blog/callboy-vs-gigolo-vs-playboy" className="city-badge">Callboy vs Gigolo vs Playboy</Link>
          <Link href="/blog/how-much-do-male-escorts-charge-india" className="city-badge">Male Escort Pricing</Link>
          <Link href="/blog/is-it-safe-to-book-male-companion" className="city-badge">Is It Safe to Book?</Link>
          <Link href="/blog/playboy-job-apply-online" className="city-badge">Apply Playboy Online</Link>
          <Link href="/blog/boyfriend-on-rent-bhopal" className="city-badge">Boyfriend on Rent in Bhopal</Link>
          <Link href="/blog/best-male-companion-service-bhopal-women" className="city-badge">Bhopal Women Guide</Link>
          <Link href="/blog/best-male-companion-service-indore-women" className="city-badge">Indore Women Guide</Link>
          <Link href="/blog/why-women-bhopal-indore-choose-male-companion" className="city-badge">Why Women Choose Us</Link>
          <Link href="/blog/first-time-booking-male-companion-women-guide" className="city-badge">First-Time Booking Guide</Link>
          <Link href="/blog/ladies-special-discreet-meeting-tips" className="city-badge">Discreet Meeting Tips</Link>
        </div>
      </section>

      <section className="section internal-hub-section">
        <h2 className="section-title">Featured Service × City Combinations</h2>
        <p className="section-subtitle">
          High-priority city + service combos — Bhopal &amp; Indore. Other
          cities listed on the full sitemap.
        </p>
        <div className="cities-grid">
          {cities
            .filter((c) => c.slug === "bhopal" || c.slug === "indore")
            .flatMap((c) =>
              services.map((s) => (
                <Link
                  key={`${c.slug}-${s.slug}`}
                  href={`/city/${c.slug}/${s.slug}`}
                  className="city-badge"
                >
                  {s.name} in {c.name}
                </Link>
              ))
            )}
        </div>
        <p style={{ textAlign: "center", marginTop: 16 }}>
          <Link href="/sitemap-html" className="button tertiary">
            View All {cities.length * services.length} City × Service Combos →
          </Link>
        </p>
      </section>
    </div>
  );
}
