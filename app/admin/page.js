import Link from "next/link";
import { ensureSchema, query } from "../lib/db";
import { isAdmin, adminLoginGate } from "../lib/adminAuth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Admin Dashboard — Safe Companion India",
  robots: { index: false, follow: false, nocache: true, noarchive: true },
};

async function getStats() {
  await ensureSchema();
  const totalInq = await query("SELECT COUNT(*) AS c FROM inquiries");
  const newInq = await query(
    "SELECT COUNT(*) AS c FROM inquiries WHERE status = 'new'"
  );
  const totalJobs = await query("SELECT COUNT(*) AS c FROM job_applications");
  const newJobs = await query(
    "SELECT COUNT(*) AS c FROM job_applications WHERE status = 'new'"
  );
  const today = await query(
    "SELECT COUNT(*) AS c FROM inquiries WHERE DATE(created_at) = CURDATE()"
  );
  const todayJobs = await query(
    "SELECT COUNT(*) AS c FROM job_applications WHERE DATE(created_at) = CURDATE()"
  );
  const recentInq = await query(
    "SELECT id, name, city, service_preference, status, created_at FROM inquiries ORDER BY created_at DESC LIMIT 5"
  );
  const recentJobs = await query(
    "SELECT id, role, name, city, status, created_at FROM job_applications ORDER BY created_at DESC LIMIT 5"
  );
  const cityBreakdown = await query(
    "SELECT city, COUNT(*) AS c FROM inquiries WHERE city != '' GROUP BY city ORDER BY c DESC LIMIT 10"
  );
  return {
    totalInq: totalInq[0].c,
    newInq: newInq[0].c,
    totalJobs: totalJobs[0].c,
    newJobs: newJobs[0].c,
    today: today[0].c,
    todayJobs: todayJobs[0].c,
    recentInq,
    recentJobs,
    cityBreakdown,
  };
}

export default async function AdminDashboard({ searchParams }) {
  if (!isAdmin(searchParams)) {
    return adminLoginGate("/admin");
  }

  let stats;
  let dbError = null;
  try {
    stats = await getStats();
  } catch (err) {
    dbError = err.message;
  }

  const tokenQS = searchParams?.token ? `?token=${searchParams.token}` : "";

  return (
    <main className="page-shell loaded">
      <section className="hero">
        <p className="eyebrow">Admin · Live Data</p>
        <h1>Safe Companion India — Admin Dashboard</h1>
        <p className="hero-copy">
          Real-time view of all form submissions from your TiDB Cloud database.
        </p>
      </section>

      {dbError && (
        <section className="section">
          <div style={{ padding: 20, background: "#7f1d1d", borderRadius: 12, color: "#fee" }}>
            <h2>Database Error</h2>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>{dbError}</pre>
            <p>
              Check <code>.env.local</code> credentials and verify the TiDB cluster is online.
            </p>
          </div>
        </section>
      )}

      {stats && (
        <>
          <section className="section">
            <h2>Counts</h2>
            <div className="hero-stats">
              <div className="stat-card">
                <span>{stats.totalInq}</span>
                <p>Total Inquiries</p>
              </div>
              <div className="stat-card">
                <span>{stats.newInq}</span>
                <p>New (Unread Inquiries)</p>
              </div>
              <div className="stat-card">
                <span>{stats.today}</span>
                <p>Today&apos;s Inquiries</p>
              </div>
              <div className="stat-card">
                <span>{stats.totalJobs}</span>
                <p>Total Job Applications</p>
              </div>
              <div className="stat-card">
                <span>{stats.newJobs}</span>
                <p>New (Unread Apps)</p>
              </div>
              <div className="stat-card">
                <span>{stats.todayJobs}</span>
                <p>Today&apos;s Applications</p>
              </div>
            </div>
          </section>

          <section className="section">
            <h2>Quick Links</h2>
            <div className="cities-grid">
              <Link className="city-badge" href={`/admin/inquiries${tokenQS}`}>
                📋 All Inquiries ({stats.totalInq})
              </Link>
              <Link className="city-badge" href={`/admin/jobs${tokenQS}`}>
                💼 All Job Applications ({stats.totalJobs})
              </Link>
            </div>
          </section>

          <section className="section">
            <h2>Top Cities by Inquiries</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #2a2f3a" }}>
                  <th style={{ textAlign: "left", padding: 8 }}>City</th>
                  <th style={{ textAlign: "right", padding: 8 }}>Inquiries</th>
                </tr>
              </thead>
              <tbody>
                {stats.cityBreakdown.map((r) => (
                  <tr key={r.city} style={{ borderBottom: "1px solid #1a1f2a" }}>
                    <td style={{ padding: 8 }}>{r.city}</td>
                    <td style={{ padding: 8, textAlign: "right" }}>{r.c}</td>
                  </tr>
                ))}
                {stats.cityBreakdown.length === 0 && (
                  <tr>
                    <td colSpan={2} style={{ padding: 12, textAlign: "center", opacity: 0.6 }}>
                      No inquiries yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>

          <section className="section">
            <h2>Recent Inquiries (Last 5)</h2>
            <RecentInqTable rows={stats.recentInq} />
            <p style={{ marginTop: 12 }}>
              <Link className="button tertiary" href={`/admin/inquiries${tokenQS}`}>
                View All →
              </Link>
            </p>
          </section>

          <section className="section">
            <h2>Recent Job Applications (Last 5)</h2>
            <RecentJobsTable rows={stats.recentJobs} />
            <p style={{ marginTop: 12 }}>
              <Link className="button tertiary" href={`/admin/jobs${tokenQS}`}>
                View All →
              </Link>
            </p>
          </section>
        </>
      )}
    </main>
  );
}

function RecentInqTable({ rows }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
      <thead>
        <tr style={{ borderBottom: "1px solid #2a2f3a" }}>
          <th style={{ textAlign: "left", padding: 8 }}>ID</th>
          <th style={{ textAlign: "left", padding: 8 }}>Name</th>
          <th style={{ textAlign: "left", padding: 8 }}>City</th>
          <th style={{ textAlign: "left", padding: 8 }}>Service</th>
          <th style={{ textAlign: "left", padding: 8 }}>Status</th>
          <th style={{ textAlign: "left", padding: 8 }}>When</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id} style={{ borderBottom: "1px solid #1a1f2a" }}>
            <td style={{ padding: 8 }}>#{r.id}</td>
            <td style={{ padding: 8 }}>{r.name}</td>
            <td style={{ padding: 8 }}>{r.city || "—"}</td>
            <td style={{ padding: 8 }}>{r.service_preference || "—"}</td>
            <td style={{ padding: 8 }}>
              <span style={statusStyle(r.status)}>{r.status}</span>
            </td>
            <td style={{ padding: 8, opacity: 0.7 }}>
              {new Date(r.created_at).toLocaleString("en-IN")}
            </td>
          </tr>
        ))}
        {rows.length === 0 && (
          <tr>
            <td colSpan={6} style={{ padding: 12, textAlign: "center", opacity: 0.6 }}>
              No inquiries yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function RecentJobsTable({ rows }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
      <thead>
        <tr style={{ borderBottom: "1px solid #2a2f3a" }}>
          <th style={{ textAlign: "left", padding: 8 }}>ID</th>
          <th style={{ textAlign: "left", padding: 8 }}>Role</th>
          <th style={{ textAlign: "left", padding: 8 }}>Name</th>
          <th style={{ textAlign: "left", padding: 8 }}>City</th>
          <th style={{ textAlign: "left", padding: 8 }}>Status</th>
          <th style={{ textAlign: "left", padding: 8 }}>When</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id} style={{ borderBottom: "1px solid #1a1f2a" }}>
            <td style={{ padding: 8 }}>#{r.id}</td>
            <td style={{ padding: 8 }}>{r.role}</td>
            <td style={{ padding: 8 }}>{r.name}</td>
            <td style={{ padding: 8 }}>{r.city || "—"}</td>
            <td style={{ padding: 8 }}>
              <span style={statusStyle(r.status)}>{r.status}</span>
            </td>
            <td style={{ padding: 8, opacity: 0.7 }}>
              {new Date(r.created_at).toLocaleString("en-IN")}
            </td>
          </tr>
        ))}
        {rows.length === 0 && (
          <tr>
            <td colSpan={6} style={{ padding: 12, textAlign: "center", opacity: 0.6 }}>
              No job applications yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function statusStyle(s) {
  const colors = {
    new: { bg: "#1d4ed8", fg: "#dbeafe" },
    contacted: { bg: "#854d0e", fg: "#fef9c3" },
    booked: { bg: "#166534", fg: "#dcfce7" },
    closed: { bg: "#374151", fg: "#e5e7eb" },
    spam: { bg: "#7f1d1d", fg: "#fecaca" },
    verifying: { bg: "#854d0e", fg: "#fef9c3" },
    approved: { bg: "#166534", fg: "#dcfce7" },
    rejected: { bg: "#7f1d1d", fg: "#fecaca" },
    onboarded: { bg: "#0f766e", fg: "#ccfbf1" },
  };
  const c = colors[s] || { bg: "#374151", fg: "#e5e7eb" };
  return {
    background: c.bg,
    color: c.fg,
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
  };
}
