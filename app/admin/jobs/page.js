import Link from "next/link";
import { ensureSchema, query } from "../../lib/db";
import { isAdmin, adminLoginGate } from "../../lib/adminAuth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Admin · All Job Applications",
  robots: { index: false, follow: false, nocache: true, noarchive: true },
};

const PAGE_SIZE = 25;

export default async function AdminJobs({ searchParams }) {
  if (!isAdmin(searchParams)) {
    return adminLoginGate("/admin/jobs");
  }

  const page = Math.max(1, parseInt(searchParams?.page || "1", 10));
  const offset = (page - 1) * PAGE_SIZE;
  const tokenQS = searchParams?.token ? `&token=${searchParams.token}` : "";

  let rows = [];
  let total = 0;
  let dbError = null;

  try {
    await ensureSchema();
    // LIMIT/OFFSET inlined because mysql2 prepared-statement protocol mishandles them on TiDB.
    // Safe: both values come from Math.max/parseInt and a constant, never user-controlled strings.
    rows = await query(
      `SELECT id, role, name, age, phone, email, city, height, languages, experience, about, source_page, status, created_at
       FROM job_applications
       ORDER BY created_at DESC
       LIMIT ${PAGE_SIZE} OFFSET ${offset}`
    );
    const c = await query("SELECT COUNT(*) AS c FROM job_applications");
    total = c[0].c;
  } catch (err) {
    dbError = err.message;
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main className="page-shell loaded">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href={`/admin?token=${searchParams.token}`}>Admin</Link>{" "}
        <span>›</span> <span>Job Applications</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">Admin · {total} Total Applications</p>
        <h1>All Job Applications</h1>
        <p className="hero-copy">
          Page {page} of {totalPages} · Showing {rows.length} of {total} records.
        </p>
      </section>

      {dbError && (
        <section className="section">
          <div style={{ padding: 20, background: "#7f1d1d", borderRadius: 12 }}>
            <h2>Database Error</h2>
            <pre style={{ whiteSpace: "pre-wrap" }}>{dbError}</pre>
          </div>
        </section>
      )}

      <section className="section" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #2a2f3a" }}>
              <th style={th}>ID</th>
              <th style={th}>When</th>
              <th style={th}>Role</th>
              <th style={th}>Name</th>
              <th style={th}>Age</th>
              <th style={th}>Phone</th>
              <th style={th}>Email</th>
              <th style={th}>City</th>
              <th style={th}>Height</th>
              <th style={th}>Languages</th>
              <th style={th}>Exp</th>
              <th style={th}>About</th>
              <th style={th}>Source</th>
              <th style={th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderBottom: "1px solid #1a1f2a" }}>
                <td style={td}>#{r.id}</td>
                <td style={td}>{new Date(r.created_at).toLocaleString("en-IN")}</td>
                <td style={td}>{r.role}</td>
                <td style={td}>{r.name}</td>
                <td style={td}>{r.age || "—"}</td>
                <td style={td}>
                  {r.phone ? (
                    <a href={`https://wa.me/${r.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                      {r.phone}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td style={td}>
                  {r.email ? <a href={`mailto:${r.email}`}>{r.email}</a> : "—"}
                </td>
                <td style={td}>{r.city || "—"}</td>
                <td style={td}>{r.height || "—"}</td>
                <td style={td}>{r.languages || "—"}</td>
                <td style={td}>{r.experience || "—"}</td>
                <td style={{ ...td, maxWidth: 240 }}>
                  {r.about ? (
                    <span title={r.about}>{r.about.slice(0, 80)}{r.about.length > 80 ? "…" : ""}</span>
                  ) : (
                    "—"
                  )}
                </td>
                <td style={td}>{r.source_page || "—"}</td>
                <td style={td}>{r.status}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={14} style={{ padding: 16, textAlign: "center", opacity: 0.6 }}>
                  No applications on this page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="section">
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          {page > 1 && (
            <Link className="button tertiary" href={`/admin/jobs?page=${page - 1}${tokenQS}`}>
              ← Prev
            </Link>
          )}
          <span style={{ alignSelf: "center" }}>
            Page {page} / {totalPages}
          </span>
          {page < totalPages && (
            <Link className="button tertiary" href={`/admin/jobs?page=${page + 1}${tokenQS}`}>
              Next →
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}

const th = { textAlign: "left", padding: "8px 6px", fontWeight: 700, opacity: 0.85 };
const td = { padding: "6px", verticalAlign: "top" };
