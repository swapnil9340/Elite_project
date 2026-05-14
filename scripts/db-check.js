// Quick TiDB connection tester. Run: npm run db:check
// Loads .env.local, attempts ping, lists tables, shows row counts.

const path = require("path");
const fs = require("fs");

// Load .env.local manually (no dotenv dep needed)
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
    }
  }
} else {
  console.error("❌ .env.local file not found at", envPath);
  process.exit(1);
}

const mysql = require("mysql2/promise");

const cfg = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 4000),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true" ? { minVersion: "TLSv1.2" } : undefined,
  connectTimeout: 15000,
};

console.log("\n========================================");
console.log("  TiDB / MySQL Connection Test");
console.log("========================================\n");
console.log("Config:");
console.log("  Host:    ", cfg.host || "(MISSING)");
console.log("  Port:    ", cfg.port);
console.log("  User:    ", cfg.user || "(MISSING)");
console.log("  Password:", cfg.password ? "***" + cfg.password.slice(-4) : "(MISSING)");
console.log("  Database:", cfg.database || "(MISSING)");
console.log("  SSL:     ", cfg.ssl ? "enabled (TLSv1.2)" : "disabled");
console.log("");

if (!cfg.host || !cfg.user || !cfg.password || !cfg.database) {
  console.error("❌ Missing required env vars. Check .env.local file.");
  process.exit(1);
}

(async () => {
  let conn;
  try {
    console.log("⏳ Connecting...");
    const t0 = Date.now();
    conn = await mysql.createConnection(cfg);
    console.log(`✅ Connected in ${Date.now() - t0}ms\n`);

    console.log("⏳ Pinging server...");
    const t1 = Date.now();
    const [pingRows] = await conn.query("SELECT 1 AS ok, NOW() AS time, VERSION() AS ver");
    console.log(`✅ Ping OK in ${Date.now() - t1}ms`);
    console.log("   Server time:", pingRows[0].time);
    console.log("   DB version: ", pingRows[0].ver, "\n");

    console.log("⏳ Listing tables in", cfg.database, "...");
    const [tables] = await conn.query(
      "SELECT TABLE_NAME, TABLE_ROWS FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ? ORDER BY TABLE_NAME",
      [cfg.database]
    );

    if (tables.length === 0) {
      console.log("⚠️  No tables yet — they will auto-create on first form submission.");
      console.log("    OR run: db/migrations/001_initial_schema.sql in TiDB Chat2Query\n");
    } else {
      console.log(`✅ Found ${tables.length} table(s):`);
      for (const t of tables) {
        console.log(`   - ${t.TABLE_NAME.padEnd(20)} (~${t.TABLE_ROWS} rows)`);
      }
      console.log("");
    }

    // Live count of our 3 tables (if they exist)
    for (const tbl of ["inquiries", "job_applications", "rate_limit"]) {
      try {
        const [r] = await conn.query(`SELECT COUNT(*) AS c FROM \`${tbl}\``);
        console.log(`   ${tbl.padEnd(20)} live count: ${r[0].c}`);
      } catch (e) {
        // table doesn't exist yet — fine
      }
    }

    console.log("\n========================================");
    console.log("  ✅ ALL CHECKS PASSED — DB IS CONNECTED");
    console.log("========================================\n");
    process.exit(0);
  } catch (err) {
    console.log("\n========================================");
    console.log("  ❌ CONNECTION FAILED");
    console.log("========================================\n");
    console.error("Error:    ", err.message);
    if (err.code) console.error("Code:     ", err.code);
    if (err.errno) console.error("Errno:    ", err.errno);
    if (err.sqlState) console.error("SQL state:", err.sqlState);

    console.log("\nCommon causes:");
    console.log(" • Wrong DB_USER / DB_PASSWORD in .env.local");
    console.log(" • TiDB Cloud cluster not whitelisting your IP");
    console.log("   → TiDB Cloud → Cluster → Networking → 'Allow access from anywhere'");
    console.log(" • Wrong DB_HOST endpoint (check TiDB Cloud → Connect → Public Endpoint)");
    console.log(" • Database 'safeCamp' doesn't exist on the cluster yet");
    console.log("   → Open TiDB Chat2Query and run: CREATE DATABASE safeCamp;\n");
    process.exit(1);
  } finally {
    if (conn) await conn.end().catch(() => {});
  }
})();
