'use client';

import { useState } from 'react';

const whatsappNumber = '919340595938';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [preferences, setPreferences] = useState('');
  const [details, setDetails] = useState('');

  const message = encodeURIComponent(
    `Hello, I would like to book a companion service.\nName: ${name}\nAge: ${age}\nCity: ${city}\nPreference: ${preferences}\nDetails: ${details}`
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
  const whatsappQuickLink = `https://wa.me/${whatsappNumber}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    window.open(whatsappLink, '_blank');
  };

  return (
    <main className="page-shell">
      <section className="section contact-hero">
        <div className="contact-hero-info">
          <p className="eyebrow">Book Premium Service</p>
          <h1>Contact Us for Discreet Companion Bookings</h1>
          <p className="hero-copy">
            Share your details and preferences below. Your request will be sent directly to WhatsApp so we can reply fast,
            discreetly, and with personalized support.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={whatsappQuickLink} target="_blank" rel="noreferrer">
              Quick WhatsApp Chat
            </a>
          </div>
        </div>
        <div className="contact-hero-card">
          <h2>Need help?</h2>
          <p>Use the form to send your preferences, or start a direct WhatsApp chat anytime.</p>
          <ul className="feature-list">
            <li>Fast reply on WhatsApp</li>
            <li>Confidential bookings</li>
            <li>Personalized companion service</li>
          </ul>
          <p className="contact-number">WhatsApp: <a href={whatsappQuickLink} target="_blank" rel="noreferrer">+91 93405 xxxxx</a></p>
        </div>
      </section>

      <section className="section contact-form-section">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Send your booking request</h2>
            <p>
              Fill in the fields and click the button below. Your message is composed automatically and opens in WhatsApp
              so you can confirm the details before sending.
            </p>
            <ul className="feature-list">
              <li>Simple booking form</li>
              <li>Direct WhatsApp delivery</li>
              <li>Private and secure contact</li>
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
                required
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
              Preference
              <input
                type="text"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder="Type of companion service"
                required
              />
            </label>

            <label>
              Additional details
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Write a short note about your requirements"
              />
            </label>

            <button type="submit" className="button primary">
              Send to WhatsApp
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
