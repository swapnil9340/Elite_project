// =============================================================================
// CONTACT INFO — single source of truth
// =============================================================================
// Mobile number / links yahin badlo + `npm run build` chalao + deploy
// — poori site (WhatsApp / Telegram / footer / sab pages) pe update ho jayega.
// =============================================================================

// Mobile number (bina country code ke)
export const PHONE_NUMBER = "8839247620";

// Country code (bina + ke)
export const COUNTRY_CODE = "91";

// Telegram username (bina @ ke) — Settings → Username me jo set hai, BILKUL wahi
// spelling. Abhi account: @safecampanion (dhyan: "campanion", "companion" nahi).
// NOTE: number-based `t.me/+91...` link kaam nahi karta — Telegram use private
// group invite-code samajhta hai, isliye username hi use karna zaroori hai.
export const TELEGRAM_USERNAME = "safecampanion";

// Telegram link — username se, taaki Chrome / mobile / app sab jagah seedha khule.
export const telegramLink = `https://t.me/${TELEGRAM_USERNAME}`;
