// =============================================================================
// FEATURE FLAGS — sitewide on/off switches
// =============================================================================
// Single source of truth. Yahan value badlo + `npm run build` chalao + deploy
// — saari pages pe asar ho jayega.
// =============================================================================

// false → WhatsApp buttons visible (DEFAULT, normal mode)
// true  → SAARI WhatsApp buttons site se HIDE ho jayengi (footer / hero /
//         connect cards / quick actions / city pages / blog / sab jagah).
//         Telegram + Call + Booking form unaffected rahenge.
export const WHATSAPP_HIDDEN = true
  ;
