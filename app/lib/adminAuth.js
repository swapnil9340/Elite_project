// Simple admin auth — token from query string or cookie.
// For higher security upgrade to JWT/session later.

import { cookies } from "next/headers";

export function isAdmin(searchParams) {
  const required = process.env.ADMIN_TOKEN;
  if (!required) return false; // safer to fail closed if not configured

  // 1. ?token=xxx query param (first-time access)
  const fromQuery = searchParams?.token;
  if (fromQuery && fromQuery === required) return true;

  // 2. sc_admin cookie (set after first valid query token)
  const cookie = cookies().get("sc_admin")?.value;
  if (cookie && cookie === required) return true;

  return false;
}

export function adminLoginGate(currentPath) {
  return (
    <main className="page-shell loaded">
      <section className="hero">
        <h1>Admin Access Required</h1>
        <p className="hero-copy">
          Append <code>?token=YOUR_ADMIN_TOKEN</code> to the URL to access this
          dashboard. The token is set in <code>.env.local</code> as{" "}
          <code>ADMIN_TOKEN</code>.
        </p>
        <p>
          Example: <code>{currentPath}?token=xxx</code>
        </p>
      </section>
    </main>
  );
}
