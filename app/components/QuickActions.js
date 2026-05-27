'use client';

import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const whatsappNumber = "not avalible now ";

const whatsappLink = `https://wa.me/91${whatsappNumber}?text=Hello%2C%20I%20am%20interested%20in%20your%20premium%20companion%20service.`;

const callLink = `tel:+91${whatsappNumber}`;
const telegramLink = `https://t.me/+91${whatsappNumber}`;
const emailLink = `mailto:contact@safecompanion.in?subject=Companion%20Booking%20Request`;

export default function QuickActions() {
  return (
    <div className="quick-actions">

      <a className="quick-btn call" href={callLink} aria-label="Call us">
        <CallIcon fontSize="large" />
      </a>

      <a
        className="quick-btn whatsapp pulse"
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon fontSize="large" />
      </a>

      <a
        className="quick-btn telegram"
        href={telegramLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on Telegram"
      >
        <TelegramIcon fontSize="large" />
      </a>

      <a className="quick-btn email" href={emailLink} aria-label="Email us">
        <EmailIcon fontSize="large" />
      </a>

      <button
        className="quick-btn top"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        aria-label="Scroll to top"
      >
        <KeyboardArrowUpIcon fontSize="large" />
      </button>

    </div>
  );
}