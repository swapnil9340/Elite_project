import crypto from "crypto";
import { ensureSchema, query, checkRateLimit } from "../../lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function hashIp(ip) {
  return crypto
    .createHash("sha256")
    .update(ip + (process.env.DB_PASSWORD || "salt"))
    .digest("hex")
    .slice(0, 32);
}

function badRequest(msg) {
  return Response.json({ ok: false, error: msg }, { status: 400 });
}

const ALLOWED_ROLES = new Set([
  "Gigolo",
  "Playboy",
  "Callboy",
  "Male Escort",
  "Companion",
]);

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));

    const role = String(body.role || "Companion").trim().slice(0, 60);
    if (!ALLOWED_ROLES.has(role)) return badRequest("Invalid role");

    const name = String(body.name || "").trim().slice(0, 120);
    const phone = String(body.phone || "").trim().slice(0, 20);
    const email = String(body.email || "").trim().slice(0, 150);
    const city = String(body.city || "").trim().slice(0, 80);
    const height = String(body.height || "").trim().slice(0, 20);
    const languages = String(body.languages || "").trim().slice(0, 200);
    const experience = String(body.experience || "Fresher").trim().slice(0, 40);
    const about = String(body.about || "").trim().slice(0, 2000);
    const ageNum = parseInt(body.age, 10);
    const age = Number.isFinite(ageNum) && ageNum >= 18 && ageNum < 80 ? ageNum : null;
    const sourcePage = String(body.sourcePage || "").trim().slice(0, 255);

    if (!name) return badRequest("Name is required");
    if (!age) return badRequest("Valid age (18-80) is required");
    if (!city) return badRequest("City is required");
    if (!phone && !email) return badRequest("Phone or email is required");

    if (body.website || body.companyName) {
      return Response.json({ ok: true, id: 0 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const ipHash = hashIp(ip);
    const ua = (request.headers.get("user-agent") || "").slice(0, 255);

    await ensureSchema();

    const ok = await checkRateLimit(`job:${ipHash}`, 3, 60);
    if (!ok) {
      return Response.json(
        { ok: false, error: "Too many applications. Try again in an hour." },
        { status: 429 }
      );
    }

    const result = await query(
      `INSERT INTO job_applications
        (role, name, age, phone, email, city, height, languages, experience, about, source_page, ip_hash, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [role, name, age, phone, email, city, height, languages, experience, about, sourcePage, ipHash, ua]
    );

    return Response.json({ ok: true, id: result.insertId });
  } catch (err) {
    console.error("[api/job-apply] error:", err);
    return Response.json(
      { ok: false, error: "Server error. Please use WhatsApp instead." },
      { status: 500 }
    );
  }
}
