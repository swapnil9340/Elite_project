import './globals.css';

export const metadata = {
  title: 'Elite Male Companion India | Discreet Companion Service',
  description: 'Elite male companion service in India. Discreet bookings, professional companionship for private events and personalized time. Contact via WhatsApp or the booking form.',
  metadataBase: new URL('https://yourdomain.com'),
  openGraph: {
    title: 'Elite Male Companion India | Discreet Companion Service',
    description: 'Elite male companion service in India. Discreet bookings, professional companionship for private events and personalized time.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://yourdomain.com'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
