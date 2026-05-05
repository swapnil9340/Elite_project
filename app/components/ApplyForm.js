"use client";

import { useState } from "react";

const whatsappNumber = "919340595938";

export default function ApplyForm({ role = "Companion" }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [height, setHeight] = useState("");
  const [languages, setLanguages] = useState("");
  const [experience, setExperience] = useState("Fresher");
  const [about, setAbout] = useState("");

  const message = encodeURIComponent(
    `Hello, I want to apply for the ${role} job.\nName: ${name}\nAge: ${age}\nCity: ${city}\nHeight: ${height}\nLanguages: ${languages}\nExperience: ${experience}\nAbout me: ${about}`
  );

  const link = `https://wa.me/${whatsappNumber}?text=${message}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(link, "_blank");
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
          min="21"
          max="45"
          required
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
      <button type="submit" className="button primary">
        Submit Application via WhatsApp
      </button>
    </form>
  );
}
