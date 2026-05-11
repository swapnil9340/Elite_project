'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo" aria-label="Safe Companion India – Home">
          <Image
            src="/logo.svg"
            alt="Safe Companion India"
            width={200}
            height={54}
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="nav desktop">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/city">Cities</Link>
          <Link href="/for-women">For Women</Link>
          <Link href="/join">Apply Job</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/hi">हिन्दी</Link>
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
          <Link href="/for-women" onClick={() => setOpen(false)}>For Women</Link>
          <Link href="/join" onClick={() => setOpen(false)}>Apply Job</Link>
          <Link href="/blog" onClick={() => setOpen(false)}>Blog</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/hi" onClick={() => setOpen(false)}>हिन्दी</Link>
        </div>
      )}
    </header>
  );
}


