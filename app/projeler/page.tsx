import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ozelUretimImages, duvarSanatiImages, images } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Projeler — Uygulama ve Case Study\'ler',
  description:
    'Malkoç Design\'ın tamamladığı lüks iç mekan sanatı projeleri. Kurumsal ofisler, lüks konutlar, oteller ve ticari mekânlar için özel üretim duvar sanatı uygulamaları.',
  alternates: { canonical: 'https://malkocdizayn.com/projeler' },
  openGraph: {
    title:       'Projeler | Malkoç Design',
    description: 'Lüks iç mekan sanatı uygulama projeleri.',
    images:      [{ url: '/og-projeler.jpg', width: 1200, height: 630 }],
  },
};

const projects = [
  {
    slug:     'nisantasi-rezidans',
    title:    'Nişantaşı Rezidans',
    client:   'Özel Konut',
    location: 'Nişantaşı, İstanbul',
    year:     2024,
    sector:   'Konut',
    desc:     'Salon ve yemek odası için altın varak ve reçine duvar eserleri serisi. Toplam 4 özgün parça.',
    src:      ozelUretimImages[0].src,
    alt:      'Nişantaşı rezidans lüks duvar sanatı — Malkoç Design',
    tags:     ['Duvar Sanatı', 'Altın Varak', 'Konut'],
  },
  {
    slug:     'kurumsal-lobi-projesi',
    title:    'Kurumsal Lobi',
    client:   'Holding Genel Merkezi',
    location: 'Levent, İstanbul',
    year:     2024,
    sector:   'Kurumsal',
    desc:     'Genel merkez lobby alanı için 3m × 2m büyük format reçine panel. Kurumsal kimlikle uyumlu renk paleti.',
    src:      ozelUretimImages[2].src,
    alt:      'Kurumsal ofis lobi duvar sanatı uygulaması — Malkoç Design İstanbul',
    tags:     ['Özel Üretim', 'Kurumsal', 'Büyük Format'],
  },
  {
    slug:     'boutique-otel-uygulamasi',
    title:    'Butik Otel Projesi',
    client:   'Butik Otel',
    location: 'Beyoğlu, İstanbul',
    year:     2023,
    sector:   'Otel',
    desc:     'Resepsiyon, lobi bar ve 12 oda için farklı ölçeklerde özgün eser koleksiyonu.',
    src:      duvarSanatiImages[4].src,
    alt:      'Butik otel lüks duvar sanatı koleksiyonu — Malkoç Design',
    tags:     ['Koleksiyon', 'Otel', 'Seri Üretim'],
  },
  {
    slug:     'villa-ic-mekan',
    title:    'Boğaz Villası',
    client:   'Özel Konut',
    location: 'Bebek, İstanbul',
    year:     2023,
    sector:   'Konut',
    desc:     'Girişten terastan yatak odalarına kadar 8 farklı alan için özel tasarım ve uygulama.',
    src:      images[22].src,
    alt:      'Bebek villa lüks iç mekan sanatı projesi — Malkoç Design',
    tags:     ['Özel Üretim', 'Villa', 'Konut'],
  },
  {
    slug:     'restoran-tasarimi',
    title:    'Fine Dining Restoran',
    client:   'Restoran',
    location: 'Karaköy, İstanbul',
    year:     2023,
    sector:   'Restoran',
    desc:     'Restoran iç mekanı için cam ve metal birleşimleri ile özel aydınlatma entegreli panel sistemi.',
    src:      duvarSanatiImages[2].src,
    alt:      'Restoran iç mekan sanat uygulaması — Malkoç Design',
    tags:     ['Lamba', 'Restoran', 'Özel Tasarım'],
  },
  {
    slug:     'showroom-marka-deneyim',
    title:    'Marka Deneyim Alanı',
    client:   'Lüks Marka',
    location: 'Etiler, İstanbul',
    year:     2024,
    sector:   'Showroom',
    desc:     'Marka kimliğini yansıtan sıfırdan tasarlanmış showroom alanı. 3D form ve özel renk paleti.',
    src:      ozelUretimImages[3].src,
    alt:      'Showroom marka deneyim alanı duvar sanatı — Malkoç Design',
    tags:     ['Özel Üretim', 'Showroom', 'Kurumsal'],
  },
];

const sectorFilters = ['Tümü', 'Konut', 'Kurumsal', 'Otel', 'Restoran', 'Showroom'];

const projectSchema = {
  '@context': 'https://schema.org',
  '@type':    'CollectionPage',
  name:       'Malkoç Design Projeleri',
  description: 'Lüks iç mekan sanatı uygulama projeleri ve case study\'ler',
  url:        'https://malkocdizayn.com/projeler',
  hasPart:    projects.map(p => ({
    '@type':      'CreativeWork',
    name:         p.title,
    description:  p.desc,
    url:          `https://malkocdizayn.com/projeler/${p.slug}`,
    creator:      { '@type': 'Organization', name: 'Malkoç Design' },
    dateCreated:  `${p.year}`,
    locationCreated: { '@type': 'Place', name: p.location },
  })),
};

export default function ProjelerPage() {
  return (
    <div className="pt-28 min-h-screen" style={{ background: 'var(--black)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }} />

      {/* Header hero */}
      <div
        className="relative overflow-hidden flex items-end"
        style={{ minHeight: 'clamp(240px, 40vw, 420px)' }}
      >
        <Image
          src={ozelUretimImages[1].src}
          alt="Malkoç Design proje portföyü"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(12,11,9,0.95) 0%, rgba(12,11,9,0.50) 60%, transparent 100%)' }} />
        <div className="relative site-container pb-12">
          <span
            className="block mb-2 text-gold-gradient"
            style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}
          >
            Portfolyomuz
          </span>
          <h1
            className="font-light"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: 'var(--cream)' }}
          >
            Projeler
          </h1>
        </div>
      </div>

      <div className="site-container py-14">
        <Breadcrumb items={[{ label: 'Projeler' }]} />

        {/* Sektör filtreleri */}
        <div className="flex flex-wrap gap-2 mb-14">
          {sectorFilters.map(filter => (
            <button
              key={filter}
              className="px-5 py-2 text-[10px] tracking-[0.20em] uppercase transition-all duration-200"
              style={{
                border:  '1px solid rgba(201,168,76,0.20)',
                color:   filter === 'Tümü' ? '#0C0B09' : 'var(--taupe)',
                background: filter === 'Tümü'
                  ? 'linear-gradient(135deg, #E8D49A 0%, #C9A84C 50%, #8A6E2C 100%)'
                  : 'transparent',
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Proje grid — editorial masonry feel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {projects.map((project, i) => (
            <article
              key={project.slug}
              className={i === 0 ? 'md:col-span-2 lg:col-span-2' : ''}
            >
              <Link href={`/projeler/${project.slug}`} className="group block">
                {/* Görsel */}
                <div
                  className="relative overflow-hidden mb-4"
                  style={{ aspectRatio: i === 0 ? '16/8' : '4/5', background: 'var(--black-card)' }}
                >
                  <Image
                    src={project.src}
                    alt={project.alt}
                    fill
                    sizes={i === 0 ? '(max-width:768px) 100vw, 66vw' : '(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw'}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    priority={i < 2}
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: 'rgba(201,168,76,0.05)' }} />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                      className="text-[9px] tracking-[0.22em] uppercase px-4 py-2"
                      style={{ border: '1px solid rgba(201,168,76,0.65)', color: 'var(--gold)', background: 'rgba(12,11,9,0.85)' }}
                    >
                      Projeyi İncele →
                    </span>
                  </div>

                  {/* Sektör badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-[8px] tracking-[0.20em] uppercase px-3 py-1.5"
                      style={{ background: 'rgba(201,168,76,0.90)', color: '#0C0B09', fontWeight: 600 }}
                    >
                      {project.sector}
                    </span>
                  </div>
                </div>

                {/* Bilgi */}
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-1.5">
                    <h2
                      className="font-light"
                      style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: 'var(--cream)' }}
                    >
                      {project.title}
                    </h2>
                    <span className="text-[10px] tracking-wider flex-shrink-0" style={{ color: 'var(--taupe-muted)' }}>
                      {project.year}
                    </span>
                  </div>
                  <p className="text-[11px] tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--gold)' }}>
                    {project.location}
                  </p>
                  <p className="text-[12px] leading-relaxed mb-3" style={{ color: 'var(--taupe)' }}>
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[8px] tracking-[0.18em] uppercase px-2.5 py-1"
                        style={{ border: '1px solid rgba(201,168,76,0.15)', color: 'var(--taupe-muted)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div
          className="text-center py-16"
          style={{ border: '1px solid rgba(201,168,76,0.10)', background: 'var(--black-surface)' }}
        >
          <p
            className="font-light mb-2"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'var(--cream)' }}
          >
            Mekânınız için Benzer Bir Proje mi?
          </p>
          <p className="text-[13px] mb-8" style={{ color: 'var(--taupe)' }}>
            Vizyonunuzu paylaşın, birlikte tasarlayalım.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/ozel-siparis"
              className="text-[10px] tracking-[0.26em] uppercase font-semibold text-[#0C0B09] hover:brightness-110 transition-all duration-300"
              style={{ padding: '1rem 2.5rem', background: 'linear-gradient(135deg, #E8D49A 0%, #C9A84C 50%, #8A6E2C 100%)' }}
            >
              Teklif Al →
            </Link>
            <a
              href="https://wa.me/905000000000?text=Proje%20teklifi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.22em] uppercase transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C]"
              style={{ padding: '1rem 2.5rem', border: '1px solid rgba(245,240,232,0.18)', color: 'rgba(245,240,232,0.60)' }}
            >
              WhatsApp ile Yazın
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
