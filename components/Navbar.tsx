'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const megaItems = [
  {
    label: 'Duvar Sanatı',
    href: '/koleksiyon/duvar-sanati',
    desc: 'Metal ve ahşap rölyef paneller',
  },
  {
    label: 'Heykeller',
    href: '/koleksiyon/heykeller',
    desc: 'Özgün form ve doku çalışmaları',
  },
  {
    label: 'Lambalar',
    href: '/koleksiyon/lambalar',
    desc: 'Dekoratif aydınlatma objeleri',
  },
  {
    label: 'Özel Üretim',
    href: '/koleksiyon/ozel-uretim',
    desc: 'Mekâna özel tasarım eserleri',
  },
];

const navLinks = [
  { label: 'Koleksiyon', href: '/koleksiyon', hasMega: true },
  { label: 'Stüdyo',     href: '/hakkimizda' },
  { label: 'Projeler',   href: '/projeler' },
  { label: 'İletişim',   href: '/iletisim' },
];

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [megaOpen,    setMegaOpen]    = useState(false);
  const [mobileKol,   setMobileKol]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        'border-b-[2px] border-[rgba(201,168,76,0.55)]'
      }`}
      style={{
        background: scrolled ? 'rgba(10,10,10,0.97)' : 'rgba(10,10,10,0.75)',
        backdropFilter: 'blur(18px)',
      }}
    >
      {/* ── Script top bar ── */}
      <div className="w-full text-center py-2 border-b border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.04)]">
        <Link href="/">
          <span
            className="inline-block text-gold-gradient"
            style={{
              fontFamily: 'var(--font-great-vibes), cursive',
              fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
              letterSpacing: '0.06em',
            }}
          >
            Malkoç Dizayn
          </span>
        </Link>
      </div>

      {/* ── Main nav ── */}
      <nav
        className="site-container h-14 grid grid-cols-[1fr_auto_1fr] items-center gap-4"
      >
        {/* Col 1 — Logo left */}
        <Link href="/" className="group inline-flex items-center gap-2 justify-self-start">
          <span className="text-[16px] font-semibold tracking-[0.22em] uppercase text-white group-hover:text-[#C9A84C] transition-colors duration-300">
            MALKOÇ
          </span>
          <span className="text-[16px] font-light tracking-[0.22em] uppercase text-[#C9A84C]">
            DİZAYN
          </span>
        </Link>

        {/* Col 2 — Links center */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) =>
            link.hasMega ? (
              <div
                key={link.label}
                className="relative flex items-center h-14"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-[13px] tracking-[0.18em] uppercase text-[rgba(245,245,240,0.78)] hover:text-[#C9A84C] transition-colors duration-200"
                >
                  {link.label}
                  <svg
                    width="10" height="6" viewBox="0 0 10 6" fill="none"
                    className={`mt-px transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>

                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 w-[1060px]"
                      style={{
                        background: 'var(--black-warm)',
                        backdropFilter: 'blur(24px)',
                        borderTop: '3px solid #C9A84C',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.65)',
                      }}
                    >
                      <div className="flex" style={{ minHeight: '320px' }}>

                        {/* Col 1 — Kategoriye Göre */}
                        <div className="flex-1 border-r border-[rgba(201,168,76,0.10)]" style={{ padding: '2.5rem 3rem' }}>
                          <p style={{ color: 'var(--gold)', fontSize: '11px', letterSpacing: '0.30em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>
                            Kategoriye Göre
                          </p>
                          <ul className="flex flex-col gap-3">
                            {megaItems.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  onClick={() => setMegaOpen(false)}
                                  className="group flex flex-col gap-0.5"
                                >
                                  <span className="text-[13px] text-[rgba(245,245,240,0.85)] group-hover:text-[#C9A84C] transition-colors duration-150">
                                    {item.label}
                                  </span>
                                  <span className="text-[11px] text-[rgba(245,245,240,0.35)]">
                                    {item.desc}
                                  </span>
                                </Link>
                              </li>
                            ))}
                            <li className="pt-3 mt-1" style={{ borderTop: '1px solid rgba(201,168,76,0.10)' }}>
                              <Link
                                href="/koleksiyon"
                                onClick={() => setMegaOpen(false)}
                                className="text-[11px] tracking-[0.15em] uppercase text-[#C9A84C] hover:opacity-70 transition-opacity"
                              >
                                Tümünü Gör →
                              </Link>
                            </li>
                          </ul>
                        </div>

                        {/* Col 2 — Öne Çıkanlar */}
                        <div className="flex-1 border-r border-[rgba(201,168,76,0.10)]" style={{ padding: '2.5rem 3rem' }}>
                          <p style={{ color: 'var(--gold)', fontSize: '11px', letterSpacing: '0.30em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>
                            Öne Çıkanlar
                          </p>
                          <ul className="flex flex-col gap-3">
                            {[
                              { label: 'Yeni Gelenler',    href: '/koleksiyon?sort=yeni' },
                              { label: 'En Çok İlgi Görenler', href: '/koleksiyon?sort=populer' },
                              { label: 'Altın Koleksiyon', href: '/koleksiyon/duvar-sanati' },
                              { label: 'Siyah & Krom',     href: '/koleksiyon/heykeller' },
                              { label: 'Kurumsal Projeler',href: '/ozel-siparis' },
                            ].map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  onClick={() => setMegaOpen(false)}
                                  className="text-[13px] text-[rgba(245,245,240,0.85)] hover:text-[#C9A84C] transition-colors duration-150"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Col 3 — Fotoğraf kartı */}
                        <div className="w-[340px] relative overflow-hidden flex-shrink-0">
                          <Link
                            href="/ozel-siparis"
                            onClick={() => setMegaOpen(false)}
                            className="group block w-full h-full relative"
                          >
                            <img
                              src="/images/mega-menu/busemalkocart_balon.webp"
                              alt="Özel üretim lüks sanat eseri"
                              className="w-full h-full object-cover"
                              style={{ transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
                              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                            />
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.70) 0%, transparent 35%)' }} />
                            <div className="absolute bottom-0 left-0 right-0 flex justify-end" style={{ padding: '0 2rem 1.5rem' }}>
                              <span style={{
                                fontFamily: 'var(--font-great-vibes), cursive',
                                fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
                                background: 'linear-gradient(135deg,#E2C97E 0%,#C9A84C 50%,#9A7A30 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                display: 'block',
                              }}>
                                Malkoç Dizayn
                              </span>
                            </div>
                          </Link>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] tracking-[0.18em] uppercase text-[rgba(245,245,240,0.78)] hover:text-[#C9A84C] transition-colors duration-200"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Col 3 — CTA + Hamburger right */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/ozel-siparis"
            className="hidden md:inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase font-semibold transition-all duration-300 hover:opacity-80"
            style={{
              padding: '0.55rem 1.4rem',
              border: '1px solid #C9A84C',
              color: '#0A0A0A',
              background: 'linear-gradient(135deg, #E2C97E 0%, #C9A84C 50%, #9A7A30 100%)',
              letterSpacing: '0.22em',
            }}
          >
            Özel Sipariş
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={mobileOpen}
            className="md:hidden flex flex-col items-center justify-center w-9 h-9 gap-[5px]"
          >
            <span
              className="block w-5 h-[1.5px] bg-[#C9A84C] transition-all duration-300 origin-center"
              style={{ transform: mobileOpen ? 'translateY(3.25px) rotate(45deg)' : 'none' }}
            />
            <span
              className="block w-5 h-[1.5px] bg-[#C9A84C] transition-all duration-300"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-[1.5px] bg-[#C9A84C] transition-all duration-300 origin-center"
              style={{ transform: mobileOpen ? 'translateY(-3.25px) rotate(-45deg)' : 'none' }}
            />
          </button>
        </div>
      </nav>


      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-[rgba(201,168,76,0.10)]"
            style={{ background: 'rgba(10,10,10,0.99)' }}
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {/* Koleksiyon accordion */}
              <button
                onClick={() => setMobileKol((p) => !p)}
                className="flex items-center justify-between w-full text-[12px] tracking-[0.18em] uppercase py-3 border-b border-[rgba(201,168,76,0.08)] text-[rgba(245,245,240,0.78)]"
              >
                Koleksiyon
                <svg
                  width="10" height="6" viewBox="0 0 10 6" fill="none"
                  className={`transition-transform duration-200 ${mobileKol ? 'rotate-180' : ''}`}
                >
                  <path d="M1 1L5 5L9 1" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>

              <AnimatePresence>
                {mobileKol && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 pb-2 flex flex-col gap-1">
                      {megaItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => { setMobileOpen(false); setMobileKol(false); }}
                          className="text-[11px] tracking-[0.15em] uppercase py-2.5 text-[rgba(245,245,240,0.55)] hover:text-[#C9A84C] transition-colors border-b border-[rgba(201,168,76,0.05)]"
                        >
                          {item.label}
                        </Link>
                      ))}
                      <Link
                        href="/koleksiyon"
                        onClick={() => { setMobileOpen(false); setMobileKol(false); }}
                        className="text-[11px] tracking-[0.15em] uppercase py-2.5 text-[#C9A84C] hover:opacity-70 transition-opacity"
                      >
                        Tümünü Gör →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {navLinks.filter((l) => !l.hasMega).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[12px] tracking-[0.18em] uppercase py-3 border-b border-[rgba(201,168,76,0.08)] text-[rgba(245,245,240,0.78)] hover:text-[#C9A84C] transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/ozel-siparis"
                onClick={() => setMobileOpen(false)}
                className="mt-5 text-center py-3.5 text-[11px] tracking-[0.20em] uppercase border border-[rgba(201,168,76,0.50)] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
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
