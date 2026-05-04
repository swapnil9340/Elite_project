import Link from 'next/link';

const whatsappNumber = '91XXXXXXXXXX';
const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%2C%20I%20am%20interested%20in%20your%20premium%20companion%20service.`;

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Professional Companion Service</p>
          <h1>Elite Male Companion for Discreet Meetings in India</h1>
          <p className="hero-copy">
            Discover a premium companionship service with discreet, respectful, and personalized support.
            Book a confident gentleman for private outings, events, or quality time with full privacy.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={whatsappLink} target="_blank" rel="noreferrer">
              Contact on WhatsApp
            </a>
            <Link className="button secondary" href="/contact">
              Book Now
            </Link>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <h2>Our Services</h2>
        <div className="cards">
          <article className="card">
            <h3>Discreet Meetings</h3>
            <p>Private, confidential sessions arranged only at your convenience.</p>
          </article>
          <article className="card">
            <h3>Event Companion</h3>
            <p>Attend social gatherings or dinners with an elegant, confident companion.</p>
          </article>
          <article className="card">
            <h3>Personal Attention</h3>
            <p>Flexible bookings for quality time, tailored to your preferences.</p>
          </article>
        </div>
      </section>

      <section className="section alt">
        <h2>Why Choose Us</h2>
        <ul className="feature-list">
          <li>100% discreet and professional approach</li>
          <li>Customized time and meeting location</li>
          <li>Trusted male companion service across India</li>
          <li>Fast response through WhatsApp support</li>
        </ul>
      </section>

      <section className="section contact-section">
        <h2>Connect with Us</h2>
        <p>
          Click the WhatsApp button to send your booking request directly.
          You can also use our contact page to share details and receive a prompt reply.
        </p>
        <div className="hero-actions">
          <a className="button primary" href={whatsappLink} target="_blank" rel="noreferrer">
            Send WhatsApp Message
          </a>
          <Link className="button secondary" href="/contact">
            Fill Contact Form
          </Link>
        </div>
        <p style={{ marginTop: '20px' }}>
          Read our <Link href="/privacy">Privacy Policy</Link> for full confidentiality details.
        </p>
      </section>
    </main>
  );
}
