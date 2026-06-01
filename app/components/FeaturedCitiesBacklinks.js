import Link from "next/link";

// Sitewide internal backlink block for priority cities (Bhopal / Indore / Delhi).
// Render at the bottom of non-priority city pages, service pages, blog posts,
// and job pages to give priority pages link equity from every URL on the site.
//
// Usage:
//   <FeaturedCitiesBacklinks currentCity="mumbai" />   // hides Mumbai if it's the current page
//   <FeaturedCitiesBacklinks />                        // shows all priority cities
//   <FeaturedCitiesBacklinks variant="compact" />      // smaller density variant

const PRIORITY_CITIES = [
  {
    slug: "bhopal",
    name: "Bhopal",
    tagline: "MP capital · MP Nagar, Arera Colony, Kolar Road",
    services: [
      { slug: "callboy-service", name: "Callboy Service" },
      { slug: "gigolo-service", name: "Gigolo Service" },
      { slug: "playboy-service", name: "Playboy Service" },
      { slug: "male-escort-service", name: "Male Escort Service" },
      { slug: "boyfriend-on-rent", name: "Boyfriend on Rent" },
    ],
    hasForWomen: true,
  },
  {
    slug: "indore",
    name: "Indore",
    tagline: "Mini-Mumbai · Vijay Nagar, Palasia, AB Road",
    services: [
      { slug: "callboy-service", name: "Callboy Service" },
      { slug: "gigolo-service", name: "Gigolo Service" },
      { slug: "playboy-service", name: "Playboy Service" },
      { slug: "male-escort-service", name: "Male Escort Service" },
      { slug: "boyfriend-on-rent", name: "Boyfriend on Rent" },
    ],
    hasForWomen: true,
  },
  {
    slug: "delhi",
    name: "Delhi NCR",
    tagline: "Capital · South Delhi, Gurgaon, Noida, CP, Saket",
    services: [
      { slug: "callboy-service", name: "Callboy Service" },
      { slug: "gigolo-service", name: "Gigolo Service" },
      { slug: "playboy-service", name: "Playboy Service" },
      { slug: "male-escort-service", name: "Male Escort Service" },
      { slug: "boyfriend-on-rent", name: "Boyfriend on Rent" },
    ],
    hasForWomen: false,
  },
];

export default function FeaturedCitiesBacklinks({
  currentCity = null,
  variant = "default",
}) {
  const cities = PRIORITY_CITIES.filter((c) => c.slug !== currentCity);
  if (cities.length === 0) return null;

  return (
    <section className="section internal-hub-section">
      <h2 className="section-title">Featured Service Cities</h2>
      <p className="section-subtitle">
        Verified male companion service in our top-priority cities — direct
        contact, no agency, no advance payment. Sasta tier se premium tier tak.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            variant === "compact"
              ? "repeat(auto-fit, minmax(220px, 1fr))"
              : "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        {cities.map((c) => (
          <div
            key={c.slug}
            style={{
              padding: 20,
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 6 }}>
              <Link href={`/city/${c.slug}`}>{c.name}</Link>
            </h3>
            <p style={{ fontSize: 13, opacity: 0.7, margin: "0 0 12px" }}>
              {c.tagline}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
              }}
            >
              {c.services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/city/${c.slug}/${s.slug}`}
                  className="city-badge"
                  style={{ fontSize: 12, padding: "6px 10px" }}
                >
                  {c.name} {s.name}
                </Link>
              ))}
              {c.hasForWomen && (
                <Link
                  href={`/for-women/${c.slug}`}
                  className="city-badge"
                  style={{ fontSize: 12, padding: "6px 10px" }}
                >
                  {c.name} Service for Women
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
