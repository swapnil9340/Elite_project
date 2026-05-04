'use client';

import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const whatsappNumber = "9340595938";

const whatsappLink = `https://wa.me/91${whatsappNumber}?text=Hello%2C%20I%20am%20interested%20in%20your%20premium%20companion%20service.`;

const callLink = `tel:+91${whatsappNumber}`;

export default function QuickActions() {
  return (
    <div className="quick-actions">

      <a className="quick-btn call" href={callLink}>
        <CallIcon fontSize="large" />
      </a>

      <a
        className="quick-btn whatsapp pulse"
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
      >
        <WhatsAppIcon fontSize="large" />
      </a>

      <button
        className="quick-btn top"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      >
        <KeyboardArrowUpIcon fontSize="large" />
      </button>

    </div>
  );
}