'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">Companion</div>

        {/* Desktop Menu */}
        <nav className="nav desktop">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/city">Cities</Link>
          <Link href="/#features">Why Us</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Mobile Hamburger */}
        <button className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/city" onClick={() => setOpen(false)}>Cities</Link>
          <Link href="/#features" onClick={() => setOpen(false)}>Why Us</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}


