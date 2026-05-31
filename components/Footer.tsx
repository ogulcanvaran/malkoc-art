'use client';

import Link from 'next/link';

const collections = [
  { label: 'Duvar Sanatı',  href: '/koleksiyon/duvar-sanati' },
  { label: 'Heykeller',     href: '/koleksiyon/heykeller' },
  { label: 'Lambalar',      href: '/koleksiyon/lambalar' },
  { label: 'Özel Üretim',   href: '/koleksiyon/ozel-uretim' },
  { label: 'Yeni Gelenler', href: '/koleksiyon?sort=yeni' },
];

const studio = [
  { label: 'Hakkımızda',  href: '/hakkimizda' },
  { label: 'Sürecimiz',   href: '/hakkimizda#surec' },
  { label: 'Malzemeler',  href: '/hakkimizda#malzemeler' },
  { label: 'Projeler',    href: '/projeler' },
  { label: 'Basın',       href: '/basin' },
];

const support = [
  { label: 'İletişim',       href: '/iletisim' },
  { label: 'Özel Sipariş',   href: '/ozel-siparis' },
  { label: 'Kargo & Teslimat', href: '/kargo' },
  { label: 'Bakım Rehberi',  href: '/bakim-rehberi' },
  { label: 'Sık Sorulanlar', href: '/sss' },
];

const socials = [
  {
    label: 'Instagram',
    href:  'https://instagram.com/malkocdizayn',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Pinterest',
    href:  'https://pinterest.com/malkocdizayn',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.772 1.208-5.12 1.208-5.12s-.308-.617-.308-1.53c0-1.433.832-2.506 1.866-2.506.88 0 1.306.66 1.306 1.452 0 .885-.563 2.209-.855 3.437-.243 1.027.514 1.862 1.524 1.862 1.83 0 3.238-1.928 3.238-4.712 0-2.463-1.77-4.185-4.296-4.185-2.926 0-4.644 2.194-4.644 4.463 0 .883.34 1.83.764 2.347a.307.307 0 01.07.294c-.078.323-.251 1.027-.285 1.17-.045.19-.151.23-.348.138-1.3-.605-2.112-2.506-2.112-4.034 0-3.28 2.383-6.295 6.876-6.295 3.613 0 6.42 2.574 6.42 6.013 0 3.588-2.263 6.48-5.405 6.48-1.056 0-2.05-.549-2.39-1.197l-.651 2.432c-.236.909-.872 2.047-1.298 2.74A10 10 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'Houzz',
    href:  'https://houzz.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L4 8.5V22h6v-6h4v6h6V8.5L12 2z"/>
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{ background: '#0A0A0A' }}
    >
      {/* Main grid */}
      <div style={{ padding: '2.5rem 18% 4rem' }}>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">

          {/* Brand column — 2 cols wide */}
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-5">
            <div>
              <span
                className="block font-script text-4xl mb-1"
                style={{ fontFamily: 'var(--font-great-vibes)', color: 'var(--gold)' }}
              >
                Malkoç Dizayn
              </span>
              <p
                className="text-[13px] tracking-[0.20em] uppercase mt-1"
                style={{ color: 'rgba(201,168,76,0.55)' }}
              >
                Lüks Sanat & Tasarım
              </p>
            </div>
            <p
              className="text-[15px] leading-relaxed max-w-xs"
              style={{ color: 'var(--white-muted)' }}
            >
              El yapımı lüks duvar sanatı, özgün heykeller ve premium dekoratif tasarım eserleri. Lüks mekânlar ve kurumsal projeler için özel üretim.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-3 mt-1">
              <a
                href="tel:+905000000000"
                className="flex items-center gap-2 text-[15px] transition-colors hover:text-[#C9A84C]"
                style={{ color: 'var(--white-muted)' }}
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--gold)', flexShrink: 0 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                +90 500 000 00 00
              </a>
              <a
                href="mailto:info@malkocdizayn.com"
                className="flex items-center gap-2 text-[15px] transition-colors hover:text-[#C9A84C]"
                style={{ color: 'var(--white-muted)' }}
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--gold)', flexShrink: 0 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                info@malkocdizayn.com
              </a>
              <div
                className="flex items-start gap-2 text-[15px]"
                style={{ color: 'var(--white-muted)' }}
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>İstanbul, Türkiye<br /><span style={{ color: 'rgba(245,245,240,0.35)', fontSize: '11px' }}>Atölye ziyaretleri randevu ile</span></span>
              </div>
              <a
                href="https://wa.me/905000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-1 px-4 py-2 text-[12px] tracking-[0.18em] uppercase font-medium transition-colors duration-300 hover:opacity-70 self-start"
                style={{ color: 'var(--gold)' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.832L.057 23.522a.5.5 0 00.611.625l5.797-1.522A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.524-5.188-1.437l-.372-.22-3.847 1.01 1.029-3.745-.242-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                WhatsApp ile Yazın
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 mt-8 mb-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:opacity-70"
                  style={{ color: 'var(--gold)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Koleksiyon */}
          <div>
            <h3
              className="text-[13px] tracking-[0.25em] uppercase font-bold mb-4"
              style={{ color: 'var(--gold)' }}
            >
              Koleksiyon
            </h3>
            <ul className="space-y-3 mt-4">
              {collections.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[15px] transition-colors duration-200 hover:text-[#C9A84C]"
                    style={{ color: 'var(--white-muted)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stüdyo */}
          <div>
            <h3
              className="text-[13px] tracking-[0.25em] uppercase font-bold mb-4"
              style={{ color: 'var(--gold)' }}
            >
              Stüdyo
            </h3>
            <ul className="space-y-3 mt-4">
              {studio.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[15px] transition-colors duration-200 hover:text-[#C9A84C]"
                    style={{ color: 'var(--white-muted)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Müşteri */}
          <div>
            <h3
              className="text-[13px] tracking-[0.25em] uppercase font-bold mb-4"
              style={{ color: 'var(--gold)' }}
            >
              Müşteri
            </h3>
            <ul className="space-y-3 mt-4">
              {support.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[15px] transition-colors duration-200 hover:text-[#C9A84C]"
                    style={{ color: 'var(--white-muted)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(201,168,76,0.45)', marginTop: '2.5rem', paddingTop: '1.5rem' }}
        >
          <p className="text-[15px] tracking-wide font-medium" style={{ color: 'var(--gold)' }}>
            © {new Date().getFullYear()} Malkoç Dizayn. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: 'Gizlilik Politikası', href: '/gizlilik' },
              { label: 'KVKK', href: '/kvkk' },
              { label: 'Çerez Politikası', href: '/cerez-politikasi' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[15px] font-medium transition-colors hover:opacity-70"
                style={{ color: 'var(--gold)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}













