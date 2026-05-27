import Link from "next/link";
import { services } from "../data/services";
import { cities } from "../data/cities";

const SITE_URL = "https://www.safecompanion.in";
const whatsappNumber = "not avalible now ";
const whatsappLink = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
  "Namaste, mujhe companion service book karni hai."
)}`;
const telegramLink = `https://t.me/+91${whatsappNumber}`;
const callLink = `tel:+91${whatsappNumber}`;

export const metadata = {
  title:
    "Safe Companion India | Asli Gigolo, Playboy & Callboy Service – Bina Hidden Charges",
  description:
    "Safe Companion India – ladies, housewives aur working women ke liye verified male escort, gigolo, playboy aur callboy service. 50+ Indian cities mein available. 100% transparent rates, koi hidden charges nahi, 24/7 WhatsApp aur Telegram pe booking.",
  keywords: [
    "ladkiyon ke liye gigolo",
    "ladies ke liye playboy service",
    "callboy ki jarurat hai",
    "playboy kaise bane",
    "gigolo kaise bane",
    "mahilaon ke liye companion",
    "ladies service hindi",
    "playboy job hindi",
    "callboy job hindi",
    "Mumbai gigolo hindi",
    "Delhi playboy hindi",
  ],
  alternates: {
    canonical: "/hi",
    languages: {
      "hi-IN": "/hi",
      "en-IN": "/",
    },
  },
  openGraph: {
    title: "Safe Companion India – Hindi mein Verified Companion Service",
    description:
      "Asli male companion service ladies aur housewives ke liye, 50+ Indian cities mein, transparent pricing ke saath.",
    url: `${SITE_URL}/hi`,
    type: "website",
    locale: "hi_IN",
  },
};

export default function HindiHomePage() {
  return (
    <main className="page-shell loaded">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">English</Link> <span>·</span>{" "}
        <span>हिन्दी होमपेज</span>
      </nav>

      <section className="hero hero-grid">
        <div className="hero-copy-block">
          <p className="eyebrow">Asli Verified Companion Service</p>
          <h1>
            Bharat Bhar Mein Discreet Male Companion Book Karein — Bina Hidden
            Charges
          </h1>
          <p className="hero-copy">
            Safe Companion India offer karta hai asli male companion service
            unn ladies aur housewives ke liye jo genuine companionship chahti
            hain. Available hai{" "}
            <strong>Bhopal, Indore, Mumbai, Delhi, Bangalore, Hyderabad, Pune, Kolkata, Chennai</strong>{" "}
            aur 40+ aur cities mein. Koi hidden charges nahi. Transparent
            rates. Asli service.
          </p>

          <div className="hero-actions">
            <a
              className="button primary"
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              💬 WhatsApp Pe Baat Karein
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
              📞 Call Karein
            </a>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span>50+ Sheher</span>
            <p>Pure Bharat Mein</p>
          </div>
          <div className="stat-card">
            <span>Koi Extra Fees Nahi</span>
            <p>Transparent Pricing</p>
          </div>
          <div className="stat-card">
            <span>100% Asli</span>
            <p>Verified Service</p>
          </div>
        </div>
      </section>

      <section className="section service-grid">
        <h2 className="section-title">
          Hum Kya Service Dete Hain
        </h2>
        {services.map((s) => {
          const hindi = {
            "gigolo-service": "Gigolo Service – Asli aur Verified",
            "playboy-service": "Playboy Service – Premium aur Discreet",
            "callboy-service": "Callboy Service – Quick Booking",
            "male-escort-service": "Male Escort – Events Aur Dinner Ke Liye",
            "boyfriend-on-rent": "Boyfriend On Rent – Function Ke Liye",
            "ladies-service": "Ladies Service – Sirf Mahilaon Ke Liye",
            "event-companion": "Event Companion – Wedding/Party Ke Liye",
            "travel-companion": "Travel Companion – Vacation Ke Liye",
          };
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="service-card"
            >
              <h3>{hindi[s.slug] || s.name}</h3>
              <p>
                Asli, verified service pure Bharat mein. Bina hidden charges
                ke. Quick WhatsApp aur Telegram booking.
              </p>
              <span className="button tertiary">Aur Jaane →</span>
            </Link>
          );
        })}
      </section>

      <section className="section feature-section">
        <div className="feature-panel">
          <h2>Hume Kyun Choose Karein?</h2>
          <ul className="feature-list">
            <li>✓ Bilkul Hidden Charges Nahi — Jo Quote Wahi Pay</li>
            <li>✓ 100% Asli Service Pure Bharat Mein</li>
            <li>✓ 50+ Sheheron Mein Available</li>
            <li>✓ Discreet, Professional, Bharosemand</li>
            <li>✓ 24/7 WhatsApp Support — Turant Reply</li>
            <li>✓ Aadhaar/PAN Verified Companions</li>
          </ul>
        </div>
        <div className="feature-panel">
          <h2>Booking Kaise Karein (3 Easy Steps)</h2>
          <div className="step-card">
            <strong>1. Apne Details Bhejein</strong>
            <p>
              Apna sheher, date, time aur kya chahiye batayein WhatsApp pe.
            </p>
          </div>
          <div className="step-card">
            <strong>2. Transparent Quote Lein</strong>
            <p>
              Hum aapko full price upfront batate hain — koi surprise charges
              nahi.
            </p>
          </div>
          <div className="step-card">
            <strong>3. Book Karein Aur Enjoy Karein</strong>
            <p>
              Booking confirm karein aur apne discreet companion se milein.
            </p>
          </div>
        </div>
      </section>

      <section className="section cities-section">
        <h2>50+ Indian Cities Mein Available</h2>
        <div className="cities-grid">
          {cities.slice(0, 30).map((c) => (
            <Link key={c.slug} href={`/city/${c.slug}`} className="city-badge">
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Job Apply Karna Chahte Hain?</h2>
        <p>
          Agar aap gigolo, playboy ya callboy ki job dhundh rahe hain — humari{" "}
          <Link href="/join">apply page</Link> dekhein. Bilkul free
          registration, 48 ghante mein verification.
        </p>
      </section>
    </main>
  );
}
