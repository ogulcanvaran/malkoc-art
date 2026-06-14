'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

const koleksiyonLinks = [
  { label: 'Duvar Sanatı',       href: '/koleksiyon/duvar-sanati',           desc: 'Metal, reçine ve alçı duvar eserleri' },
  { label: 'Heykeller',          href: '/koleksiyon/heykeller',               desc: 'Özgün üç boyutlu form çalışmaları' },
  { label: 'Dekoratif Lambalar', href: '/koleksiyon/lambalar',                desc: 'Sanat ve aydınlatmanın buluşması' },
  { label: 'Özel Üretim',        href: '/koleksiyon/ozel-uretim',             desc: 'Mekânınıza özel tasarım eserler' },
];

const hizmetlerLinks = [
  { label: 'İç Mekan Danışmanlığı', href: '/hizmetler/ic-mekan-danismanligi', desc: 'Konsept ve uygulama' },
  { label: 'Özel Proje Üretimi',    href: '/hizmetler/ozel-proje',             desc: 'Sıfırdan tasarım ve üretim' },
  { label: 'Kurumsal Çözümler',     href: '/hizmetler/kurumsal',               desc: 'Ofis, otel ve ticari alanlar' },
];

const navLinks = [
  { label: 'Koleksiyon', href: '/koleksiyon', mega: 'koleksiyon' },
  { label: 'Projeler',   href: '/projeler' },
  { label: 'Hizmetler',  href: '/hizmetler',  mega: 'hizmetler' },
  { label: 'Stüdyo',     href: '/hakkimizda' },
];

type MegaType = 'koleksiyon' | 'hizmetler' | null;

export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen,   setMegaOpen]   = useState<MegaType>(null);
  const headerRef  = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      if (headerRef.current)
        document.documentElement.style.setProperty('--navbar-h', `${headerRef.current.offsetHeight}px`);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const enter = (t: MegaType) => { clearTimeout(closeTimer.current); setMegaOpen(t); };
  const leave = () => { closeTimer.current = setTimeout(() => setMegaOpen(null), 120); };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background:     scrolled
            ? 'color-mix(in srgb, var(--bg) 97%, transparent)'
            : 'color-mix(in srgb, var(--bg) 88%, transparent)',
          backdropFilter: 'blur(20px)',
          borderBottom:   '1px solid var(--border)',
        }}
      >
        {/* Üst bar */}
        <div className="text-center py-2" style={{ borderBottom: '1px solid var(--border)', paddingTop: '0.6rem' }}>
          <Link href="/" className="inline-block">
            <span
              className="text-gold-gradient"
              style={{
                fontFamily:    'var(--font-script), cursive',
                fontSize:      'clamp(1.4rem, 2.5vw, 1.9rem)',
                letterSpacing: '0.04em',
                lineHeight:    1.2,
              }}
            >
              Malkoç Design
            </span>
          </Link>
        </div>

        {/* Ana nav */}
        <nav className="site-container h-13 flex items-center justify-between" style={{ height: '52px' }}>

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[13px] font-semibold tracking-[0.22em] uppercase transition-colors duration-200" style={{ color: 'var(--text)', opacity: 0.85 }}>
              MALKOÇ
            </span>
            <span className="text-[13px] font-light tracking-[0.22em] uppercase" style={{ color: 'var(--gold)' }}>
              DESIGN
            </span>
          </Link>

          {/* Center links */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 lg:gap-10">
            {navLinks.map((link) =>
              link.mega ? (
                <div
                  key={link.label}
                  className="relative flex items-center"
                  style={{ height: '52px' }}
                  onMouseEnter={() => enter(link.mega as MegaType)}
                  onMouseLeave={leave}
                >
                  <button
                    className="flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase transition-colors duration-200"
                    style={{ color: 'var(--text-2)' }}
                    aria-haspopup="true"
                    aria-expanded={megaOpen === link.mega}
                  >
                    <span className="hover:text-[var(--gold)] transition-colors">{link.label}</span>
                    <svg
                      width="8" height="5" viewBox="0 0 8 5" fill="none"
                      className={`mt-px transition-transform duration-200 ${megaOpen === link.mega ? 'rotate-180' : ''}`}
                    >
                      <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {megaOpen === link.mega && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        onMouseEnter={() => clearTimeout(closeTimer.current)}
                        onMouseLeave={leave}
                        className="absolute top-full"
                        style={{
                          left:       link.mega === 'koleksiyon' ? '-120px' : '-60px',
                          background: 'var(--bg)',
                          borderTop:  '2px solid var(--gold)',
                          border:     '1px solid var(--border)',
                          borderTopColor: 'var(--gold)',
                          boxShadow:  'var(--shadow-lg)',
                          width:      link.mega === 'koleksiyon' ? '860px' : '360px',
                        }}
                      >
                        {link.mega === 'koleksiyon' ? (
                          /* ── 3 kolon mega menü ── */
                          <div style={{ display: 'flex', minHeight: '300px' }}>
                            {/* Kolon 1 — kategoriler */}
                            <div style={{ flex: 1, borderRight: '1px solid var(--border)', padding: '2rem 2.5rem' }}>
                              <p style={{ color: 'var(--gold)', fontSize: '10px', letterSpacing: '0.30em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.2rem' }}>
                                Kategoriye Göre
                              </p>
                              <ul style={{ display: 'flex', flexDirection: 'column' }}>
                                {koleksiyonLinks.map(item => (
                                  <li key={item.href}>
                                    <Link
                                      href={item.href}
                                      onClick={() => setMegaOpen(null)}
                                      style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0.75rem 0', borderBottom: '1px solid var(--border)', textDecoration: 'none' }}
                                      onMouseEnter={e => ((e.currentTarget.querySelector('.mega-label') as HTMLElement).style.color = 'var(--gold)')}
                                      onMouseLeave={e => ((e.currentTarget.querySelector('.mega-label') as HTMLElement).style.color = 'var(--text)')}
                                    >
                                      <span className="mega-label" style={{ fontSize: '12px', letterSpacing: '0.05em', color: 'var(--text)', transition: 'color 0.15s' }}>{item.label}</span>
                                      <span style={{ fontSize: '10px', color: 'var(--text-3)' }}>{item.desc}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Kolon 2 — öne çıkanlar */}
                            <div style={{ flex: 1, borderRight: '1px solid var(--border)', padding: '2rem 2.5rem' }}>
                              <p style={{ color: 'var(--gold)', fontSize: '10px', letterSpacing: '0.30em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.2rem' }}>
                                Öne Çıkanlar
                              </p>
                              <ul style={{ display: 'flex', flexDirection: 'column' }}>
                                {[
                                  { label: 'Yeni Gelenler',        href: '/koleksiyon?sort=yeni' },
                                  { label: 'En Çok İlgi Görenler', href: '/koleksiyon?sort=populer' },
                                  { label: 'Altın Koleksiyon',     href: '/koleksiyon/duvar-sanati' },
                                  { label: 'Kurumsal Projeler',    href: '/ozel-siparis' },
                                ].map(item => (
                                  <li key={item.href}>
                                    <Link
                                      href={item.href}
                                      onClick={() => setMegaOpen(null)}
                                      style={{ display: 'block', fontSize: '12px', padding: '0.75rem 0', borderBottom: '1px solid var(--border)', color: 'var(--text)', textDecoration: 'none', transition: 'color 0.15s' }}
                                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Kolon 3 — fotoğraf kartı */}
                            <div style={{ width: '280px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                              <Link href="/ozel-siparis" onClick={() => setMegaOpen(null)} style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}>
                                <img
                                  src="/images/mega-menu/busemalkocart_balon.webp"
                                  alt="Özel üretim sanat eseri"
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)', display: 'block' }}
                                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 40%)' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 1.5rem 1.5rem' }}>
                                  <span style={{ fontFamily: 'var(--font-script), cursive', fontSize: '1.7rem', background: 'linear-gradient(135deg,#E2C97E 0%,#C9A84C 50%,#9A7A30 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'block' }}>
                                    Malkoç Design
                                  </span>
                                </div>
                              </Link>
                            </div>
                          </div>
                        ) : (
                          /* ── Hizmetler — tek kolon ── */
                          <div style={{ padding: '1.5rem 2rem' }}>
                            <p style={{ color: 'var(--gold)', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>
                              {link.label}
                            </p>
                            <ul style={{ display: 'flex', flexDirection: 'column' }}>
                              {hizmetlerLinks.map(item => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setMegaOpen(null)}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0.65rem 0', borderBottom: '1px solid var(--border)', textDecoration: 'none' }}
                                    onMouseEnter={e => ((e.currentTarget.querySelector('.mega-label') as HTMLElement).style.color = 'var(--gold)')}
                                    onMouseLeave={e => ((e.currentTarget.querySelector('.mega-label') as HTMLElement).style.color = 'var(--text)')}
                                  >
                                    <span className="mega-label" style={{ fontSize: '12px', color: 'var(--text)', transition: 'color 0.15s' }}>{item.label}</span>
                                    <span style={{ fontSize: '10px', color: 'var(--text-3)' }}>{item.desc}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:text-[var(--gold)]"
                  style={{ color: 'var(--text-2)' }}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Sağ: theme toggle + CTA + hamburger */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Link
              href="/ozel-siparis"
              className="hidden md:inline-flex items-center text-[11px] tracking-[0.18em] uppercase font-bold transition-all duration-300 hover:brightness-110"
              style={{ padding: '0.5rem 1.3rem', border: '1.5px solid var(--gold)', color: 'var(--gold)', background: 'var(--bg)', borderRadius: '999px' }}
            >
              Teklif Al
            </Link>

            <button
              onClick={() => setMobileOpen(p => !p)}
              aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={mobileOpen}
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-[5px]"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-px transition-all duration-300 origin-center"
                  style={{
                    width:       i === 1 ? '14px' : '20px',
                    background:  'var(--gold)',
                    transform:   mobileOpen
                      ? i === 0 ? 'translateY(5px) rotate(45deg)'
                      : i === 2 ? 'translateY(-5px) rotate(-45deg)'
                      : 'scaleX(0)'
                      : 'none',
                    opacity: mobileOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="bd"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-30 md:hidden"
              style={{ top: 'var(--navbar-h, 90px)', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 bottom-0 z-40 md:hidden flex flex-col"
              style={{
                top:        'var(--navbar-h, 90px)',
                width:      '82%',
                maxWidth:   '320px',
                background: 'var(--bg)',
                borderLeft: '1px solid var(--border)',
                borderTop:  '2px solid var(--gold)',
              }}
            >
              {/* Üst dekor çizgisi */}
              <div style={{ height: '1px', background: 'linear-gradient(90deg, var(--gold), transparent)', margin: '0 1.5rem' }} />

              <div className="flex-1 overflow-y-auto pb-4 flex flex-col gap-7" style={{ paddingInline: '1.5rem', paddingTop: '1rem' }}>
                {/* Koleksiyon */}
                <div>
                  <p style={{ fontSize: '13px', letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '0.3rem' }}>
                    <span style={{ fontSize: '15px', lineHeight: 1 }}>›</span> Koleksiyon
                  </p>
                  <div style={{ height: '1px', background: 'var(--gold)', opacity: 0.2, marginBottom: '0.75rem' }} />
                  <ul style={{ display: 'flex', flexDirection: 'column' }}>
                    {koleksiyonLinks.map(item => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 0', borderBottom: '1px solid var(--border)', textDecoration: 'none', paddingLeft: '0.3rem' }}
                        >
                          <span style={{ color: 'var(--gold)', opacity: 0.55, fontSize: '13px', lineHeight: 1 }}>›</span>
                          <span style={{ fontSize: '11px', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--text)', fontWeight: 500 }}>
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hizmetler */}
                <div>
                  <p style={{ fontSize: '13px', letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '0.3rem' }}>
                    <span style={{ fontSize: '15px', lineHeight: 1 }}>›</span> Hizmetler
                  </p>
                  <div style={{ height: '1px', background: 'var(--gold)', opacity: 0.2, marginBottom: '0.75rem' }} />
                  <ul style={{ display: 'flex', flexDirection: 'column' }}>
                    {hizmetlerLinks.map(item => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 0', borderBottom: '1px solid var(--border)', textDecoration: 'none', paddingLeft: '0.3rem' }}
                        >
                          <span style={{ color: 'var(--gold)', opacity: 0.55, fontSize: '13px', lineHeight: 1 }}>›</span>
                          <span style={{ fontSize: '11px', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--text)', fontWeight: 500 }}>
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sayfalar */}
                <div>
                  <p style={{ fontSize: '13px', letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '0.3rem' }}>
                    <span style={{ fontSize: '15px', lineHeight: 1 }}>›</span> Sayfalar
                  </p>
                  <div style={{ height: '1px', background: 'var(--gold)', opacity: 0.2, marginBottom: '0.75rem' }} />
                  <ul style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                      { label: 'Projeler',  href: '/projeler' },
                      { label: 'Stüdyo',   href: '/hakkimizda' },
                      { label: 'İletişim', href: '/iletisim' },
                    ].map(link => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 0', borderBottom: '1px solid var(--border)', textDecoration: 'none', paddingLeft: '0.3rem' }}
                        >
                          <span style={{ color: 'var(--gold)', opacity: 0.55, fontSize: '13px', lineHeight: 1 }}>›</span>
                          <span style={{ fontSize: '11px', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--text)', fontWeight: 500 }}>
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Alt CTA */}
              <div style={{ padding: '1.25rem 1.5rem 2.5rem', borderTop: '1px solid var(--border)' }}>
                <Link
                  href="/ozel-siparis"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block', textAlign: 'center',
                    padding: '1rem', fontSize: '10px', letterSpacing: '0.24em',
                    textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none',
                    color: '#0A0908',
                    background: 'linear-gradient(135deg, #E2C97E 0%, #C9A84C 60%, #9A7A30 100%)',
                  }}
                >
                  Teklif Al
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
