import Link from 'next/link';

const koleksiyon = [
  { label: 'Heykeller',          href: '/koleksiyon/heykeller' },
  { label: 'Duvar Sanatı',       href: '/koleksiyon/duvar-sanati' },
  { label: 'Özel Üretim',        href: '/koleksiyon/ozel-uretim' },
  { label: 'Yeni Gelenler',      href: '/koleksiyon?sort=yeni' },
  { label: 'Dekoratif Lambalar', href: '/koleksiyon/lambalar' },
];

const hizmetler = [
  { label: 'Projeler',              href: '/projeler' },
  { label: 'Kurumsal Çözümler',     href: '/hizmetler/kurumsal' },
  { label: 'Özel Proje Üretimi',    href: '/hizmetler/ozel-proje' },
  { label: 'İç Mekan Danışmanlığı', href: '/hizmetler/ic-mekan-danismanligi' },
];

const kurumsal = [
  { label: 'İletişim',      href: '/iletisim' },
  { label: 'Hakkımızda',    href: '/hakkimizda' },
  { label: 'Özel Sipariş',  href: '/ozel-siparis' },
  { label: 'Üretim Süreci', href: '/hakkimizda#surec' },
  { label: 'Bakım Rehberi', href: '/bakim-rehberi' },
];

const legal = [
  { label: 'Gizlilik Politikası', href: '/gizlilik' },
  { label: 'KVKK',                href: '/kvkk' },
  { label: 'Çerez Politikası',    href: '/cerez-politikasi' },
];

export function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}
    >
      {/* CTA Band */}
      <div
        className="text-center"
        style={{
          padding:      'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 6rem)',
          borderBottom: '1px solid var(--border)',
          background:   'var(--bg-card)',
        }}
      >
        <p className="text-[11px] tracking-[0.30em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
          Projenizi Hayata Geçirelim
        </p>
        <h2
          className="font-light leading-tight mb-8"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--text)' }}
        >
          Mekânınız İçin Özel Bir Eser<br />
          <em style={{ color: 'var(--gold)' }}>Tasarlamaya Başlayalım</em>
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4" style={{ marginTop: '2.5rem' }}>
          <Link
            href="/ozel-siparis"
            className="btn-shimmer text-[11px] tracking-[0.22em] uppercase font-bold hover:brightness-110 transition-all duration-300"
            style={{ padding: '1rem 2.8rem', borderRadius: '999px' }}
          >
            Teklif Al →
          </Link>
          <a
            href="https://wa.me/905000000000?text=Merhaba%2C%20proje%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.22em] uppercase font-bold transition-all duration-300 hover:text-[var(--gold)] hover:border-[var(--gold)]"
            style={{ padding: '1rem 2.8rem', border: '1.5px solid var(--border-mid)', color: 'var(--text-2)', borderRadius: '999px' }}
          >
            WhatsApp ile Yazın
          </a>
        </div>
      </div>

      {/* Links grid */}
      <div className="site-container" style={{ paddingBlock: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="col-span-2 flex flex-col gap-5">
            <div>
              <span
                className="block mb-1 text-gold-gradient"
                style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}
              >
                Malkoç Design
              </span>
              <p className="text-[10px] tracking-[0.22em] uppercase" style={{ color: 'var(--gold)' }}>
                Lüks Sanat & İç Mekan Tasarımı
              </p>
            </div>

            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-2)', maxWidth: '280px' }}>
              El yapımı lüks duvar sanatı, özgün heykeller ve premium dekoratif eserler. İstanbul merkezli, yurt genelinde uygulama.
            </p>

            <div className="flex flex-col gap-3 mt-1">
              <a href="tel:+905000000000" className="flex items-center gap-2.5 text-[13px] hover:text-[var(--gold)] transition-colors" style={{ color: 'var(--text-2)' }}>
                <span style={{ color: 'var(--gold)', flexShrink: 0 }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                +90 500 000 00 00
              </a>
              <a href="mailto:info@malkocdizayn.com" className="flex items-center gap-2.5 text-[13px] hover:text-[var(--gold)] transition-colors" style={{ color: 'var(--text-2)' }}>
                <span style={{ color: 'var(--gold)', flexShrink: 0 }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                info@malkocdizayn.com
              </a>
              <div className="flex items-start gap-2.5 text-[13px]" style={{ color: 'var(--text-2)' }}>
                <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '1px' }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                <span>
                  İstanbul, Türkiye
                  <br />
                  <span className="text-[10px]" style={{ color: 'var(--text-3)' }}>Atölye ziyaretleri randevu ile</span>
                </span>
              </div>
            </div>

          </div>

          <FooterCol title="Koleksiyon" links={koleksiyon} />
          <FooterCol title="Hizmetler"  links={hizmetler} />
          <FooterCol title="Kurumsal"   links={kurumsal} />
        </div>

        {/* Legal bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--border)', marginTop: '2rem', paddingTop: '1.2rem' }}
        >
          <p className="text-[12px] tracking-wide" style={{ color: 'var(--text-3)' }}>
            © {new Date().getFullYear()} Malkoç Design. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6">
            {legal.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[11px] tracking-wide transition-colors hover:text-[var(--gold)]"
                style={{ color: 'var(--text-3)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="h-16 md:hidden" />
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-[12px] tracking-[0.20em] uppercase font-bold mb-2" style={{ color: 'var(--gold)' }}>
        {title}
      </h3>
      <div style={{ height: '1px', background: 'var(--text-2)', opacity: 0.25, marginBottom: '1rem' }} />
      <ul className="flex flex-col gap-2.5">
        {links.map(l => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group flex items-center gap-2 hover:text-[var(--gold)] hover:tracking-wide"
              style={{ fontSize: '14px', color: 'var(--text-2)', fontWeight: 500, transition: 'color 0.35s ease, letter-spacing 0.35s ease' }}
            >
              <span style={{ color: 'var(--gold)', opacity: 0.7, fontSize: '13px', lineHeight: 1, transition: 'transform 0.35s ease, opacity 0.35s ease' }} className="group-hover:opacity-100 group-hover:translate-x-0.5">›</span>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
