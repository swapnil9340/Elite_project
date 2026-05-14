// TiDB Cloud connection (MySQL-compatible) using mysql2 promise pool.
// SSL is mandatory for TiDB Cloud public endpoint.

import mysql from "mysql2/promise";

let pool;

export function getPool() {
  if (pool) return pool;

  const required = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
  for (const k of required) {
    if (!process.env[k]) {
      throw new Error(
        `Missing env var ${k}. Add it to .env.local and restart the server.`
      );
    }
  }

  pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 4000),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === "true" ? { minVersion: "TLSv1.2" } : undefined,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
  });

  return pool;
}

export async function query(sql, params = []) {
  const [rows] = await getPool().execute(sql, params);
  return rows;
}

// Idempotent table bootstrap — runs CREATE TABLE IF NOT EXISTS on first call.
// Safe to invoke per-request (it's a no-op once tables exist).
let bootstrapped = false;
export async function ensureSchema() {
  if (bootstrapped) return;
  const sql = [
    `CREATE TABLE IF NOT EXISTS inquiries (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(120) NOT NULL,
      age INT,
      phone VARCHAR(20),
      email VARCHAR(150),
      city VARCHAR(80),
      service_preference VARCHAR(120),
      booking_date VARCHAR(40),
      budget_range VARCHAR(60),
      details TEXT,
      source_page VARCHAR(255),
      ip_hash VARCHAR(64),
      user_agent VARCHAR(255),
      status ENUM('new','contacted','booked','closed','spam') NOT NULL DEFAULT 'new',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_status (status),
      INDEX idx_city (city),
      INDEX idx_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS job_applications (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      role VARCHAR(60) NOT NULL,
      name VARCHAR(120) NOT NULL,
      age INT,
      phone VARCHAR(20),
      email VARCHAR(150),
      city VARCHAR(80),
      height VARCHAR(20),
      languages VARCHAR(200),
      experience VARCHAR(40),
      about TEXT,
      source_page VARCHAR(255),
      ip_hash VARCHAR(64),
      user_agent VARCHAR(255),
      status ENUM('new','verifying','approved','rejected','onboarded') NOT NULL DEFAULT 'new',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_status (status),
      INDEX idx_role (role),
      INDEX idx_city (city),
      INDEX idx_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS rate_limit (
      bucket VARCHAR(80) PRIMARY KEY,
      count INT NOT NULL DEFAULT 0,
      window_start TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
  ];

  for (const stmt of sql) {
    await getPool().query(stmt);
  }
  bootstrapped = true;
}

// Simple IP-based rate limit. Returns true if within limit, false if blocked.
export async function checkRateLimit(ipHash, limit = 5, windowMinutes = 60) {
  const bucket = `${ipHash}:${new Date().toISOString().slice(0, 13)}`;
  await getPool().query(
    `INSERT INTO rate_limit (bucket, count) VALUES (?, 1)
     ON DUPLICATE KEY UPDATE count = count + 1`,
    [bucket]
  );
  const [rows] = await getPool().query(
    `SELECT count FROM rate_limit WHERE bucket = ?`,
    [bucket]
  );
  return rows[0]?.count <= limit;
}
