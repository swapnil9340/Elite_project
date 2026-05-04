'use client';

import { useState } from 'react';

const whatsappNumber = '91XXXXXXXXXX';

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

  const handleSubmit = (event) => {
    event.preventDefault();
    window.open(whatsappLink, '_blank');
  };

  return (
    <main className="page-shell">
      <section className="section">
        <h1>Contact & Bookings</h1>
        <p className="hero-copy">
          Fill in your details below and send your request directly to WhatsApp.
          This helps us understand your needs and respond faster.
        </p>
      </section>

      <section className="section contact-form-section">
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
              placeholder="What kind of companion service you want"
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
            Send Details to WhatsApp
          </button>
        </form>
      </section>
    </main>
  );
}
