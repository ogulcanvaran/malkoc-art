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
      style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,168,76,0.15)' }}
    >
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column — 2 cols wide */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div>
              <span
                className="block font-script text-3xl mb-1"
                style={{ fontFamily: 'var(--font-great-vibes)', color: 'var(--gold)' }}
              >
                Malkoç Dizayn
              </span>
              <p
                className="text-[11px] tracking-[0.20em] uppercase mt-1"
                style={{ color: 'rgba(201,168,76,0.55)' }}
              >
                Lüks Sanat & Tasarım
              </p>
            </div>
            <p
              className="text-[13px] leading-relaxed max-w-xs"
              style={{ color: 'var(--white-muted)' }}
            >
              El yapımı lüks duvar sanatı, özgün heykeller ve premium dekoratif tasarım eserleri. Lüks mekânlar ve kurumsal projeler için özel üretim.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-4 mt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-[#C9A84C]"
                  style={{ color: 'rgba(245,245,240,0.40)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Koleksiyon */}
          <div>
            <h3
              className="text-[10px] tracking-[0.25em] uppercase mb-5"
              style={{ color: 'var(--gold)' }}
            >
              Koleksiyon
            </h3>
            <ul className="space-y-3">
              {collections.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] transition-colors duration-200 hover:text-[#C9A84C]"
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
              className="text-[10px] tracking-[0.25em] uppercase mb-5"
              style={{ color: 'var(--gold)' }}
            >
              Stüdyo
            </h3>
            <ul className="space-y-3">
              {studio.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] transition-colors duration-200 hover:text-[#C9A84C]"
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
              className="text-[10px] tracking-[0.25em] uppercase mb-5"
              style={{ color: 'var(--gold)' }}
            >
              Müşteri
            </h3>
            <ul className="space-y-3">
              {support.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] transition-colors duration-200 hover:text-[#C9A84C]"
                    style={{ color: 'var(--white-muted)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter bar */}
        <div
          className="mt-14 pt-10 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ borderTop: '1px solid rgba(201,168,76,0.10)' }}
        >
          <div>
            <p
              className="text-[13px] font-medium mb-1"
              style={{ color: 'var(--white)', fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}
            >
              Yeni eserlerden ilk siz haberdar olun
            </p>
            <p className="text-[12px]" style={{ color: 'var(--white-muted)' }}>
              Koleksiyon güncellemeleri ve özel davetler için bültenimize katılın.
            </p>
          </div>
          <form
            className="flex gap-0 w-full md:w-auto"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Bülten formu"
          >
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="px-4 py-3 text-[12px] bg-transparent outline-none w-64 placeholder:opacity-40"
              style={{
                border: '1px solid rgba(201,168,76,0.30)',
                color: 'var(--white)',
                borderRight: 'none',
              }}
              aria-label="E-posta adresi"
            />
            <button
              type="submit"
              className="px-5 py-3 text-[10px] tracking-[0.18em] uppercase font-medium transition-colors hover:bg-[#9A7A30]"
              style={{ background: 'var(--gold)', color: 'var(--black)' }}
            >
              Katıl
            </button>
          </form>
        </div>

        {/* Legal bar */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}
        >
          <p className="text-[11px] tracking-wide" style={{ color: 'rgba(245,245,240,0.28)' }}>
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
                className="text-[11px] transition-colors hover:text-[#C9A84C]"
                style={{ color: 'rgba(245,245,240,0.28)' }}
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
