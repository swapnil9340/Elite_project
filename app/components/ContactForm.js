"use client";

import { useState } from "react";
const whatsappNumber = "9340595938";
const telegramNumber = "9340595938";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [preferences, setPreferences] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // "ok" | "error" | null
  const [errMsg, setErrMsg] = useState("");

  const message = encodeURIComponent(
    `Hello, I would like to book a companion service.\nName: ${name}\nAge: ${age}\nPhone: ${phone}\nEmail: ${email}\nCity: ${city}\nPreference: ${preferences}\nDate: ${bookingDate}\nBudget: ${budget}\nDetails: ${details}`
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
  const whatsappQuickLink = `https://wa.me/${whatsappNumber}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setStatus(null);
    setErrMsg("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          age,
          phone,
          email,
          city,
          service: preferences,
          bookingDate,
          budget,
          details,
          website, // honeypot
          sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) {
        setStatus("error");
        setErrMsg(data.error || "Submission failed. Please try again or use WhatsApp link below.");
      } else {
        setStatus("ok");
        // Reset form on success
        setName(""); setAge(""); setPhone(""); setEmail(""); setCity("");
        setPreferences(""); setBookingDate(""); setBudget(""); setDetails("");
      }
    } catch (err) {
      setStatus("error");
      setErrMsg("Network issue. Please try again or use the WhatsApp link below.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="section contact-hero">
        <div className="contact-hero-info">
          <p className="eyebrow">Book Premium Service</p>
          <h1>Contact Safe Companion India for Discreet Bookings</h1>
          <p className="hero-copy">
            Share your details and preferences below. Your request is saved
            securely and also opens in WhatsApp so we can reply fast,
            discreetly, and with personalized support across Bhopal, Indore,
            Mumbai, Delhi, Bangalore and 45+ more Indian cities.
          </p>
          <div className="hero-actions">
            <a
              className="button primary"
              href={whatsappQuickLink}
              target="_blank"
              rel="noreferrer"
            >
              Quick WhatsApp Chat
            </a>
          </div>
        </div>
        <div className="contact-hero-card">
          <h2>Need help?</h2>
          <p>
            Use the form to send your preferences, or start a direct WhatsApp
            chat anytime.
          </p>
          <ul className="feature-list">
            <li>Fast reply on WhatsApp</li>
            <li>Confidential bookings</li>
            <li>Personalized companion service</li>
            <li>No hidden charges, ever</li>
          </ul>
          <p className="contact-number">
            WhatsApp:{" "}
            <a href={whatsappQuickLink} target="_blank" rel="noreferrer">
              +91 93405 xxxxx
            </a>
          </p>
        </div>
      </section>

      <section className="section contact-form-section">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Send your booking request</h2>
            <p>
              Fill in the fields and click the button. Your request is saved
              securely and also opens in WhatsApp for confirmation.
            </p>
            <ul className="feature-list">
              <li>Encrypted &amp; private submission</li>
              <li>Direct WhatsApp delivery</li>
              <li>Reply within minutes</li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </label>

            <label>
              Age
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Your age"
                min="18"
                max="80"
              />
            </label>

            <label>
              Phone (WhatsApp)
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
              />
            </label>

            <label>
              Email (optional)
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </label>

            <label>
              City
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City or location"
                required
              />
            </label>

            <label>
              Service Preference
              <select
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                required
              >
                <option value="">-- Select --</option>
                <option>Gigolo Service</option>
                <option>Playboy Service</option>
                <option>Callboy Service</option>
                <option>Male Escort Service</option>
                <option>Boyfriend on Rent</option>
                <option>Event Companion</option>
                <option>Travel Companion</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Preferred Date / Time
              <input
                type="text"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                placeholder="e.g. 25 May 2026, evening"
              />
            </label>

            <label>
              Budget Range (optional)
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="">-- Select budget --</option>
                <option>₹5,000 - ₹15,000 (short)</option>
                <option>₹15,000 - ₹35,000 (half day)</option>
                <option>₹35,000 - ₹70,000 (full day)</option>
                <option>₹70,000+ (overnight / travel)</option>
              </select>
            </label>

            <label>
              Additional Details
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Anything specific we should know"
              />
            </label>

            {/* Honeypot field — hidden from humans, filled by bots */}
            <label style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }} aria-hidden="true">
              Website
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>

            <button type="submit" className="button primary" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Booking Request"}
            </button>

            {status === "ok" && (
              <div style={{
                color: "#10b981",
                marginTop: 16,
                padding: "12px 16px",
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: 8,
              }}>
                <strong>✓ Booking request received!</strong>
                <p style={{ margin: "4px 0 0", fontSize: 14, opacity: 0.9 }}>
                  Our team will contact you within 30 minutes during business hours.
                </p>
              </div>
            )}
            {status === "error" && (
              <div style={{
                color: "#f59e0b",
                marginTop: 16,
                padding: "12px 16px",
                background: "rgba(245, 158, 11, 0.1)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                borderRadius: 8,
              }}>
                <strong>⚠ {errMsg}</strong>
                <p style={{ margin: "8px 0 0" }}>
                  <a href={whatsappQuickLink} target="_blank" rel="noreferrer" style={{ color: "#10b981" }}>
                    → Click here to chat on WhatsApp
                  </a>
                </p>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
