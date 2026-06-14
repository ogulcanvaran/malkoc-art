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
        <div className="text-center py-2" style={{ borderBottom: '1px solid var(--border)' }}>
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
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        onMouseEnter={() => clearTimeout(closeTimer.current)}
                        onMouseLeave={leave}
                        className="absolute top-full left-1/2 -translate-x-1/2"
                        style={{
                          background:     'var(--bg)',
                          border:         '1px solid var(--border)',
                          borderTop:      '2px solid var(--gold)',
                          boxShadow:      'var(--shadow-lg)',
                          width:          '360px',
                          padding:        '1.5rem 2rem',
                          marginTop:      '0px',
                        }}
                      >
                        <p className="text-[9px] tracking-[0.28em] uppercase font-semibold mb-3" style={{ color: 'var(--gold)' }}>
                          {link.label}
                        </p>
                        <ul className="flex flex-col">
                          {(link.mega === 'koleksiyon' ? koleksiyonLinks : hizmetlerLinks).map(item => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => setMegaOpen(null)}
                                className="group/item flex flex-col gap-0.5 py-2.5"
                                style={{ borderBottom: '1px solid var(--border)' }}
                              >
                                <span
                                  className="text-[12px] tracking-[0.05em] transition-colors duration-150"
                                  style={{ color: 'var(--text)' }}
                                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
                                >
                                  {item.label}
                                </span>
                                <span className="text-[10px]" style={{ color: 'var(--text-3)' }}>{item.desc}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={link.href}
                          onClick={() => setMegaOpen(null)}
                          className="mt-3 text-[9px] tracking-[0.20em] uppercase inline-flex items-center gap-1 transition-opacity hover:opacity-60"
                          style={{ color: 'var(--gold)' }}
                        >
                          Tümünü Gör →
                        </Link>
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
              className="hidden md:inline-flex items-center text-[9px] tracking-[0.22em] uppercase font-semibold transition-all duration-300 hover:brightness-110"
              style={{
                padding:    '0.45rem 1.1rem',
                background: 'linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 60%, var(--gold-deep) 100%)',
                color:      '#0C0B09',
              }}
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
              style={{ top: 'var(--navbar-h, 90px)', background: 'rgba(0,0,0,0.40)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
              <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4 flex flex-col gap-6">
                {[
                  { title: 'Koleksiyon', links: koleksiyonLinks },
                  { title: 'Hizmetler',  links: hizmetlerLinks },
                ].map(section => (
                  <section key={section.title}>
                    <p className="text-[9px] tracking-[0.28em] uppercase font-semibold mb-3" style={{ color: 'var(--gold)' }}>
                      {section.title}
                    </p>
                    <div className="h-px mb-4" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
                    <ul className="flex flex-col">
                      {section.links.map(item => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex flex-col gap-0.5 py-3.5"
                            style={{ borderBottom: '1px solid var(--border)' }}
                          >
                            <span className="text-[12px] tracking-[0.08em] uppercase" style={{ color: 'var(--text)' }}>
                              {item.label}
                            </span>
                            <span className="text-[10px]" style={{ color: 'var(--text-3)' }}>{item.desc}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}

                <section>
                  <p className="text-[9px] tracking-[0.28em] uppercase font-semibold mb-3" style={{ color: 'var(--gold)' }}>
                    Sayfalar
                  </p>
                  <div className="h-px mb-4" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
                  {[
                    { label: 'Projeler',  href: '/projeler' },
                    { label: 'Stüdyo',   href: '/hakkimizda' },
                    { label: 'İletişim', href: '/iletisim' },
                  ].map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center py-3.5 text-[12px] tracking-[0.08em] uppercase transition-colors"
                      style={{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </section>
              </div>

              <div className="px-5 pb-8 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <Link
                  href="/ozel-siparis"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center text-[10px] tracking-[0.22em] uppercase font-semibold text-[#0C0B09] hover:brightness-110 transition-all py-4"
                  style={{ background: 'linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 60%, var(--gold-deep) 100%)' }}
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
