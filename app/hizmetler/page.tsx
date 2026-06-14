import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ozelUretimImages, duvarSanatiImages } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Hizmetler — İç Mekan Sanatı ve Özel Üretim',
  description:
    'Malkoç Design hizmetleri: iç mekan sanatı danışmanlığı, özel proje üretimi ve kurumsal çözümler. İstanbul\'da konut, ofis, otel ve ticari mekânlar için premium dekoratif tasarım.',
  alternates: { canonical: 'https://malkocdizayn.com/hizmetler' },
  openGraph: {
    title:       'Hizmetler | Malkoç Design',
    description: 'Premium iç mekan sanatı ve özel üretim hizmetleri.',
    images:      [{ url: '/og-hizmetler.jpg', width: 1200, height: 630 }],
  },
};

const services = [
  {
    slug:  'ic-mekan-danismanligi',
    n:     '01',
    title: 'İç Mekan Danışmanlığı',
    sub:   'Konsept · Planlama · Uygulama',
    desc:  'Mekânınızın karakterini, kullanım biçimini ve estetik vizyonunuzu dinliyoruz. Ardından sanat eserlerini mimarla ve iç mimar ekibinizle uyumlu olacak şekilde konumlandırıyor, boyutlandırıyor ve seçiyoruz.',
    feats: ['Mekân analizi ve ölçümleme', 'Renk ve malzeme uyum danışmanlığı', 'Armatür ve aydınlatma entegrasyonu', 'Taşıma ve montaj planlaması'],
    src:   duvarSanatiImages[2].src,
    alt:   'İç mekan sanatı danışmanlığı — Malkoç Design',
    href:  '/hizmetler/ic-mekan-danismanligi',
  },
  {
    slug:  'ozel-proje',
    n:     '02',
    title: 'Özel Proje Üretimi',
    sub:   'Sıfırdan Tasarım · El Yapımı Üretim',
    desc:  'Standart koleksiyonun ötesine geçin. Boyut, renk, malzeme ve formu tamamen sizinle birlikte tasarlıyoruz. Reçine, metal varak, pigment ve özel kaplamalarla tek parça eserler üretiyoruz.',
    feats: ['Özel boyut ve format', 'Renk eşleştirme (RAL / Pantone)', 'Kombine malzeme çalışmaları', 'Sertifikalı sanat eseri belgesi'],
    src:   ozelUretimImages[0].src,
    alt:   'Özel proje üretimi — Malkoç Design el yapımı sanat',
    href:  '/hizmetler/ozel-proje',
  },
  {
    slug:  'kurumsal',
    n:     '03',
    title: 'Kurumsal Çözümler',
    sub:   'Ofis · Otel · Restoran · Showroom',
    desc:  'Kurumsal kimliğinizi mekâna taşıyoruz. Holding genel merkezlerinden boutique otellere, fine dining restoranlardan marka showroom alanlarına kadar çok parçalı ve büyük format projeler.',
    feats: ['Çok mekânlı proje yönetimi', 'Kurumsal renk paleti entegrasyonu', 'Seri ve tekil üretim seçenekleri', 'Proje teslim ve montaj koordinasyonu'],
    src:   ozelUretimImages[2].src,
    alt:   'Kurumsal dekorasyon çözümleri — Malkoç Design İstanbul',
    href:  '/hizmetler/kurumsal',
  },
];

const schemaData = {
  '@context': 'https://schema.org',
  '@type':    'ItemList',
  name:       'Malkoç Design Hizmetleri',
  itemListElement: services.map((s, i) => ({
    '@type':    'ListItem',
    position:   i + 1,
    name:       s.title,
    description: s.desc,
    url:        `https://malkocdizayn.com${s.href}`,
  })),
};

export default function HizmetlerPage() {
  return (
    <div className="pt-28 min-h-screen" style={{ background: 'var(--black)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <div className="site-container py-14">
        <Breadcrumb items={[{ label: 'Hizmetler' }]} />

        {/* Başlık */}
        <div className="mb-16 max-w-2xl">
          <span
            className="block mb-3 text-gold-gradient"
            style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}
          >
            Ne Yapıyoruz
          </span>
          <h1
            className="font-light leading-tight mb-5"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--cream)' }}
          >
            Hizmetler
          </h1>
          <span className="gold-line" />
          <p className="mt-6 text-[15px] leading-relaxed" style={{ color: 'var(--taupe)' }}>
            Bir sanat eserinin yolculuğu ilk konsept görüşmesinden montaja kadar tamamen bizim koordinasyonumuzda ilerler.
          </p>
        </div>

        {/* Hizmet kartları */}
        <div className="flex flex-col gap-0">
          {services.map((s, i) => (
            <article
              key={s.slug}
              className={`grid grid-cols-1 md:grid-cols-2 ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}
              style={{
                borderTop:    '1px solid rgba(201,168,76,0.08)',
                borderBottom: i === services.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none',
              }}
            >
              {/* Görsel */}
              <div
                className="relative overflow-hidden"
                style={{ minHeight: 'clamp(300px, 40vw, 520px)', direction: 'ltr' }}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.2s] hover:scale-[1.03]"
                />
                <div className="absolute inset-0" style={{ background: 'rgba(12,11,9,0.25)' }} />
                <div
                  className="absolute top-6 left-6 text-[#C9A84C]"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 300, opacity: 0.25 }}
                >
                  {s.n}
                </div>
              </div>

              {/* Metin */}
              <div
                className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-14"
                style={{ background: i % 2 === 0 ? 'var(--black-surface)' : 'var(--black-card)', direction: 'ltr' }}
              >
                <p className="text-[9px] tracking-[0.28em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
                  {s.sub}
                </p>
                <h2
                  className="font-light leading-tight mb-5"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'var(--cream)' }}
                >
                  {s.title}
                </h2>
                <span className="gold-line mb-6" />
                <p className="text-[14px] leading-relaxed mb-8" style={{ color: 'var(--taupe)' }}>
                  {s.desc}
                </p>

                <ul className="flex flex-col gap-2.5 mb-10">
                  {s.feats.map(feat => (
                    <li key={feat} className="flex items-start gap-3 text-[12px]" style={{ color: 'var(--taupe)' }}>
                      <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }}>✦</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-6">
                  <Link
                    href="/ozel-siparis"
                    className="text-[9px] tracking-[0.24em] uppercase font-semibold text-[#0C0B09] hover:brightness-110 transition-all duration-300"
                    style={{ padding: '0.85rem 2rem', background: 'linear-gradient(135deg, #E8D49A 0%, #C9A84C 50%, #8A6E2C 100%)' }}
                  >
                    Teklif Al
                  </Link>
                  <Link
                    href={`/projeler`}
                    className="text-[10px] tracking-[0.20em] uppercase transition-colors duration-200 hover:text-[#C9A84C] group inline-flex items-center gap-1.5"
                    style={{ color: 'var(--taupe)' }}
                  >
                    Projeleri Gör
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Neden Malkoç Design */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '✦', title: 'Tamamen El Yapımı', desc: 'Her eser atölyemizde, baştan sona el işçiliği ile üretilir.' },
            { icon: '◈', title: 'Premium Malzemeler', desc: 'Ithal reçine, 24 ayar varak, seçkin pigmentler ve özel kaplamalar.' },
            { icon: '◉', title: 'Beyaz Eldiven Teslimat', desc: 'Eseri mekânınıza özel paketleme ile teslim edip bizzat monte ediyoruz.' },
          ].map(item => (
            <div
              key={item.title}
              className="flex flex-col gap-4 p-8"
              style={{ border: '1px solid rgba(201,168,76,0.10)', background: 'var(--black-surface)' }}
            >
              <span className="text-2xl" style={{ color: 'var(--gold)' }}>{item.icon}</span>
              <h3
                className="font-light"
                style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--cream)' }}
              >
                {item.title}
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--taupe)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
