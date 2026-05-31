'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  {
    label: 'Koleksiyon',
    href: '/koleksiyon',
    children: [
      { label: 'Duvar Sanatı',  href: '/koleksiyon/duvar-sanati' },
      { label: 'Heykeller',     href: '/koleksiyon/heykeller' },
      { label: 'Lambalar',      href: '/koleksiyon/lambalar' },
      { label: 'Özel Üretim',   href: '/koleksiyon/ozel-uretim' },
    ],
  },
  { label: 'Stüdyo',      href: '/hakkimizda' },
  { label: 'Projeler',    href: '/projeler' },
  { label: 'İletişim',    href: '/iletisim' },
];

export function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [dropdownOpen,   setDropdownOpen]   = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(10,10,10,0.96)'
          : 'rgba(10,10,10,0.72)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : 'none',
      }}
    >
      {/* ── Script top bar ────────────────────────────────────────────────── */}
      <div
        className="w-full text-center py-[5px] text-[11px] tracking-[0.12em]"
        style={{
          borderBottom: '1px solid rgba(201,168,76,0.15)',
          background: 'rgba(201,168,76,0.04)',
        }}
      >
        <span
          className="font-script text-gold-gradient"
          style={{
            fontFamily: 'var(--font-great-vibes), cursive',
            fontSize: '1.15rem',
            letterSpacing: '0.04em',
            background: 'linear-gradient(135deg,#E2C97E 0%,#C9A84C 50%,#9A7A30 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Malkoç Dizayn
        </span>
      </div>

      {/* ── Main nav ──────────────────────────────────────────────────────── */}
      <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className="text-[13px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 group-hover:text-[#C9A84C]"
            style={{ color: 'var(--white)', letterSpacing: '0.22em' }}
          >
            MALKOÇ
          </span>
          <span
            className="text-[13px] tracking-[0.22em] uppercase"
            style={{ color: 'var(--gold)', fontWeight: 300 }}
          >
            DİZAYN
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative" ref={dropdownRef}>
                <button
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="flex items-center gap-1 text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:text-[#C9A84C]"
                  style={{ color: 'rgba(245,245,240,0.78)', fontFamily: 'var(--font-inter)' }}
                >
                  {link.label}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="mt-[1px]">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                      className="absolute top-full left-0 mt-2 w-48 py-2"
                      style={{
                        background: 'rgba(17,17,17,0.98)',
                        border: '1px solid rgba(201,168,76,0.15)',
                        backdropFilter: 'blur(12px)',
                      }}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase transition-colors duration-200 hover:text-[#C9A84C]"
                          style={{ color: 'rgba(245,245,240,0.65)' }}
                          onClick={() => setDropdownOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:text-[#C9A84C]"
                style={{ color: 'rgba(245,245,240,0.78)' }}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/ozel-siparis"
            className="hidden md:inline-flex items-center px-5 py-2 text-[10px] tracking-[0.20em] uppercase font-medium transition-all duration-300 hover:bg-[#C9A84C] hover:text-black"
            style={{
              border: '1px solid rgba(201,168,76,0.60)',
              color: 'var(--gold)',
            }}
          >
            Özel Sipariş
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-1"
            aria-label="Menüyü aç"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: 'var(--gold)',
                  transform:
                    mobileOpen
                      ? i === 0 ? 'rotate(45deg) translate(4px,4px)'
                      : i === 2 ? 'rotate(-45deg) translate(4px,-4px)'
                      : 'scaleX(0)'
                      : 'none',
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(10,10,10,0.98)', borderTop: '1px solid rgba(201,168,76,0.10)' }}
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.flatMap((link) =>
                link.children
                  ? [
                      <span
                        key={link.label + '_head'}
                        className="text-[10px] tracking-[0.25em] uppercase pt-4 pb-1"
                        style={{ color: 'var(--gold)' }}
                      >
                        {link.label}
                      </span>,
                      ...link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-[12px] tracking-[0.15em] uppercase py-2 pl-3 transition-colors hover:text-[#C9A84C]"
                          style={{ color: 'rgba(245,245,240,0.60)' }}
                        >
                          {child.label}
                        </Link>
                      )),
                    ]
                  : [
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-[12px] tracking-[0.18em] uppercase py-2.5 transition-colors hover:text-[#C9A84C] border-b"
                        style={{ color: 'rgba(245,245,240,0.78)', borderColor: 'rgba(201,168,76,0.08)' }}
                      >
                        {link.label}
                      </Link>,
                    ]
              )}
              <Link
                href="/ozel-siparis"
                onClick={() => setMobileOpen(false)}
                className="mt-4 text-center py-3 text-[11px] tracking-[0.20em] uppercase"
                style={{ border: '1px solid rgba(201,168,76,0.50)', color: 'var(--gold)' }}
              >
                Özel Sipariş
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
