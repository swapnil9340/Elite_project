"use client";

import { useState } from "react";

const whatsappNumber = "91930595938";

export default function ApplyForm({ role = "Companion" }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [height, setHeight] = useState("");
  const [languages, setLanguages] = useState("");
  const [experience, setExperience] = useState("Fresher");
  const [about, setAbout] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const message = encodeURIComponent(
    `Hello, I want to apply for the ${role} job.\nName: ${name}\nAge: ${age}\nPhone: ${phone}\nEmail: ${email}\nCity: ${city}\nHeight: ${height}\nLanguages: ${languages}\nExperience: ${experience}\nAbout me: ${about}`
  );

  const link = `https://wa.me/${whatsappNumber}?text=${message}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setStatus(null);
    setErrMsg("");

    try {
      const res = await fetch("/api/job-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          name,
          age,
          phone,
          email,
          city,
          height,
          languages,
          experience,
          about,
          website,
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
        setHeight(""); setLanguages(""); setExperience("Fresher"); setAbout("");
      }
    } catch (err) {
      setStatus("error");
      setErrMsg("Network issue. Please try again or use the WhatsApp link below.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Full Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          required
        />
      </label>
      <label>
        Age
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="21 - 45"
          min="18"
          max="60"
          required
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
          placeholder="Your current city"
          required
        />
      </label>
      <label>
        Height
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder={`e.g. 5'9"`}
        />
      </label>
      <label>
        Languages Known
        <input
          type="text"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
          placeholder="Hindi, English, Marathi..."
          required
        />
      </label>
      <label>
        Experience
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option>Fresher</option>
          <option>1-2 years</option>
          <option>3-5 years</option>
          <option>5+ years</option>
        </select>
      </label>
      <label>
        About Yourself
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Tell us about your appearance, personality, availability..."
        />
      </label>

      {/* Honeypot field — hidden from humans */}
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
        {submitting ? "Submitting..." : `Submit ${role} Application`}
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
          <strong>✓ Application submitted successfully!</strong>
          <p style={{ margin: "4px 0 0", fontSize: 14, opacity: 0.9 }}>
            Verification will be done within 48 hours. We will contact you on the phone/email you provided.
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
            <a href={link} target="_blank" rel="noreferrer" style={{ color: "#10b981" }}>
              → Click here to apply via WhatsApp instead
            </a>
          </p>
        </div>
      )}
    </form>
  );
}
