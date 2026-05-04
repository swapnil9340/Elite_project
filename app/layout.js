    import Header from "./components/Header";
import QuickActions from "./components/QuickActions";
    import "./globals.css";
    import Link from "next/link";

    const whatsappNumber = "9340595938";
    const whatsappLink = `https://wa.me/91${whatsappNumber}?text=Hello%2C%20I%20am%20interested%20in%20your%20premium%20companion%20service.`;

    export const metadata = {
    title: "Genuine Male Escort Service India | No Hidden Charges | 50+ Cities",
    description:
        "Authentic male companion service across 50+ Indian cities: Bhopal, Indore, Mumbai, Delhi, Bangalore, and more. Zero hidden charges, transparent pricing. Genuine companion for women. Book via WhatsApp.",
    keywords:
        "male escort India, gigolo service, no hidden charges, genuine service, Bhopal, Indore, male companion, transparent pricing",
    metadataBase: new URL("https://yourdomain.com"),
    openGraph: {
        title: "Genuine Male Escort Service India | No Hidden Charges",
        description:
        "Authentic male companion service across 50+ Indian cities. Transparent pricing, zero hidden charges. Book safely.",
        type: "website",
    },
    alternates: {
        canonical: "https://yourdomain.com",
    },
    };

    export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
            <Header />

            <main>{children}</main>

            <footer className="site-footer">
            <div className="container">
                <div className="footer-content">
                <div className="footer-section">
                    <h3>Elite Companion India</h3>
                    <p>
                    Genuine male companion service across 50+ Indian cities. No
                    hidden charges, transparent pricing.
                    </p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                    <li>
                        <Link href="#services">Services</Link>
                    </li>
                    <li>
                        <Link href="#how-it-works">How It Works</Link>
                    </li>
                    <li>
                        <Link href="#testimonials">Reviews</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link href="/privacy">Privacy Policy</Link>
                    </li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>
                    WhatsApp:{" "}
                    <a href={whatsappLink} target="_blank" rel="noreferrer">
                        +91 93405 xxxxx
                    </a>
                    </p>
                    <p>Available 24/7 for bookings</p>
                    <p>Discreet & Confidential</p>
                </div>
                </div>
                <div className="footer-bottom">
                <p>
                    &copy; 2024 Elite Companion India. All rights reserved. |
                    Genuine Service, No Hidden Charges
                </p>
                </div>
            </div>
            </footer>
           <QuickActions></QuickActions>
        </body>
        </html>
    );
    }
