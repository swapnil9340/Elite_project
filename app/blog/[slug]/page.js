import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "../../data/blog";
import { cities, getCityBySlug } from "../../data/cities";
import { services } from "../../data/services";
import BlogContent from "../../components/BlogContent";

const SITE_URL = "https://www.safecompanion.in";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Safe Companion India Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: "Safe Companion India Editorial",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Safe Companion India",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  const related = posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <main className="page-shell loaded">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link> <span>›</span>{" "}
        <Link href="/blog">Blog</Link> <span>›</span> <span>{post.title}</span>
      </nav>

      <article className="section">
        <p className="eyebrow">
          {post.category} · {post.readMin} min read · {post.date}
        </p>
        <h1>{post.title}</h1>
        <p className="hero-copy">{post.excerpt}</p>

        <BlogContent body={post.body} />
      </article>

      {related.length > 0 && (
        <section className="section">
          <h2>Related Articles</h2>
          <div className="cities-grid">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="city-badge"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* City-specific internal linking — boosts crawl + page authority */}
      {post.isCityBlog && post.city && (
        <CityBlogLinks citySlug={post.city} />
      )}

      {/* Universal internal linking — services + popular cities */}
      <UniversalBlogLinks />
    </main>
  );
}

function CityBlogLinks({ citySlug }) {
  const city = getCityBySlug(citySlug);
  if (!city) return null;

  return (
    <>
      <section className="section">
        <h2>All Services in {city.name}</h2>
        <p>
          Browse every service we offer in {city.name}, {city.state}:
        </p>
        <div className="cities-grid">
          <Link href={`/city/${city.slug}`} className="city-badge">
            All {city.name} Services
          </Link>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/city/${city.slug}/${s.slug}`}
              className="city-badge"
            >
              {s.name} in {city.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Quick Connect for {city.name}</h2>
        <p>
          For direct booking, see our <Link href={`/city/${city.slug}`}>{city.name} main page</Link>{" "}
          or read more <Link href="/blog">city guides on our blog</Link>.
        </p>
      </section>
    </>
  );
}

function UniversalBlogLinks() {
  // Top 12 cities for cross-linking from any blog post
  const popularCities = cities.slice(0, 12);

  return (
    <>
      <section className="section">
        <h2>Popular Service Cities</h2>
        <div className="cities-grid">
          {popularCities.map((c) => (
            <Link key={c.slug} href={`/city/${c.slug}`} className="city-badge">
              Best Male Service in {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Our Verified Services</h2>
        <div className="cities-grid">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="city-badge"
            >
              Best {s.name} India
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
