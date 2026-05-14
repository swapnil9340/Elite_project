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

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));

    const name = String(body.name || "").trim().slice(0, 120);
    const phone = String(body.phone || "").trim().slice(0, 20);
    const email = String(body.email || "").trim().slice(0, 150);
    const city = String(body.city || "").trim().slice(0, 80);
    const service = String(body.service || body.preferences || "").trim().slice(0, 120);
    const bookingDate = String(body.bookingDate || "").trim().slice(0, 40);
    const budget = String(body.budget || "").trim().slice(0, 60);
    const details = String(body.details || body.message || "").trim().slice(0, 2000);
    const ageNum = parseInt(body.age, 10);
    const age = Number.isFinite(ageNum) && ageNum > 0 && ageNum < 120 ? ageNum : null;
    const sourcePage = String(body.sourcePage || "").trim().slice(0, 255);

    if (!name) return badRequest("Name is required");
    if (!phone && !email) return badRequest("Phone or email is required");

    // Honeypot: bots fill hidden fields; humans don't
    if (body.website || body.companyName) {
      return Response.json({ ok: true, id: 0 }); // silently accept and discard
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const ipHash = hashIp(ip);
    const ua = (request.headers.get("user-agent") || "").slice(0, 255);

    await ensureSchema();

    const ok = await checkRateLimit(ipHash, 5, 60);
    if (!ok) {
      return Response.json(
        { ok: false, error: "Too many requests. Try again in an hour." },
        { status: 429 }
      );
    }

    const result = await query(
      `INSERT INTO inquiries
        (name, age, phone, email, city, service_preference, booking_date, budget_range, details, source_page, ip_hash, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, age, phone, email, city, service, bookingDate, budget, details, sourcePage, ipHash, ua]
    );

    return Response.json({ ok: true, id: result.insertId });
  } catch (err) {
    console.error("[api/inquiry] error:", err);
    return Response.json(
      { ok: false, error: "Server error. Please use WhatsApp instead." },
      { status: 500 }
    );
  }
}
