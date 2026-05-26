export const WHATSAPP_NUMBER = "9340595938";

export const ALL_ENABLED = false;

export const ENABLED_CITIES = ["indore", "bhopal"];

export const NOT_AVAILABLE_TEXT = "Not available in your city";

export function isContactEnabled(pathname = "") {
  if (ALL_ENABLED) return true;
  const lower = pathname.toLowerCase();
  return ENABLED_CITIES.some((city) => lower.includes(city));
}

export function buildContactLinks(enabled) {
  if (!enabled) {
    return {
      enabled: false,
      whatsappLink: "#",
      telegramLink: "#",
      callLink: "#",
      smsLink: "#",
      emailLink:
        "mailto:contact@safecompanion.in?subject=Companion%20Booking%20Request&body=Hello%2C%20I%20would%20like%20to%20book%20a%20companion%20service.%20Please%20share%20details.",
    };
  }
  return {
    enabled: true,
    whatsappLink: `https://wa.me/91${WHATSAPP_NUMBER}?text=Hello%2C%20I%20am%20interested%20in%20your%20premium%20companion%20service.`,
    telegramLink: `https://t.me/+91${WHATSAPP_NUMBER}`,
    callLink: `tel:+91${WHATSAPP_NUMBER}`,
    smsLink: `sms:+91${WHATSAPP_NUMBER}?body=Hello%2C%20I%20want%20to%20book%20a%20companion%20service.`,
    emailLink:
      "mailto:contact@safecompanion.in?subject=Companion%20Booking%20Request&body=Hello%2C%20I%20would%20like%20to%20book%20a%20companion%20service.%20Please%20share%20details.",
  };
}
