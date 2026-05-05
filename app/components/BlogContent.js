import Link from "next/link";

export default function BlogContent({ body }) {
  return (
    <div className="blog-content">
      {body.map((block, i) => {
        if (block.type === "h2")
          return <h2 key={i}>{block.text}</h2>;
        if (block.type === "h3")
          return <h3 key={i}>{block.text}</h3>;
        if (block.type === "p")
          return <p key={i}>{block.text}</p>;
        if (block.type === "ul")
          return (
            <ul key={i} className="feature-list">
              {block.items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ul>
          );
        if (block.type === "ol")
          return (
            <ol key={i} className="feature-list">
              {block.items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ol>
          );
        return null;
      })}

      <div className="blog-cta">
        <h3>Ready to Get Started?</h3>
        <p>
          Whether you want to <Link href="/join">apply for a job</Link>, or{" "}
          <Link href="/contact">book a companion</Link> — we're available 24/7.
        </p>
      </div>
    </div>
  );
}
