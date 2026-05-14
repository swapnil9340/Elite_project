import { getPool, ensureSchema, query } from "../../lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const startedAt = Date.now();
  const out = {
    ok: false,
    timestamp: new Date().toISOString(),
    config: {
      host: process.env.DB_HOST || "(not set)",
      port: process.env.DB_PORT || "(not set)",
      user: process.env.DB_USER || "(not set)",
      database: process.env.DB_NAME || "(not set)",
      ssl: process.env.DB_SSL === "true",
    },
  };

  try {
    // 1. Try basic ping
    const pingStart = Date.now();
    const ping = await query("SELECT 1 AS ok, NOW() AS server_time, VERSION() AS version");
    out.pingMs = Date.now() - pingStart;
    out.serverTime = ping[0].server_time;
    out.dbVersion = ping[0].version;

    // 2. Make sure schema exists
    await ensureSchema();

    // 3. Check tables exist + count rows
    const tables = await query(`
      SELECT TABLE_NAME, TABLE_ROWS
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = ?
      ORDER BY TABLE_NAME
    `, [process.env.DB_NAME]);

    out.tables = tables.map((t) => ({
      name: t.TABLE_NAME,
      rows: t.TABLE_ROWS,
    }));

    // 4. Live counts (more accurate than INFORMATION_SCHEMA cached counts)
    const inq = await query("SELECT COUNT(*) AS c FROM inquiries");
    const jobs = await query("SELECT COUNT(*) AS c FROM job_applications");
    out.liveCounts = {
      inquiries: inq[0].c,
      job_applications: jobs[0].c,
    };

    out.ok = true;
    out.totalMs = Date.now() - startedAt;
  } catch (err) {
    out.error = {
      message: err.message,
      code: err.code,
      errno: err.errno,
      sqlState: err.sqlState,
    };
    out.totalMs = Date.now() - startedAt;
    return Response.json(out, { status: 500 });
  }

  return Response.json(out);
}
