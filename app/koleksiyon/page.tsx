import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Koleksiyon',
  description: 'El yapımı lüks duvar sanatı, heykeller, dekoratif lambalar ve özel üretim eserlerden oluşan Malkoç Dizayn koleksiyonu.',
  alternates: { canonical: 'https://malkocdizayn.com/koleksiyon' },
  openGraph: {
    title: 'Koleksiyon | Malkoç Dizayn',
    description: 'El yapımı lüks duvar sanatı ve özgün heykel koleksiyonu.',
    images: [{ url: '/og-koleksiyon.jpg', width: 1200, height: 630 }],
  },
};

const works = Array.from({ length: 9 }, (_, i) => ({
  slug:     `eser-${i + 1}`,
  title:    ['Kızıl Akış', 'Altın Kıvrım', 'Siyah Dalgalar', 'Beyaz Form', 'Turuncu Katman', 'Bordo Oval', 'Krom Lamba', 'Altın Beyaz', 'Gece Mavisi'][i],
  material: ['Reçine', 'Altın Varak', 'Reçine · Lak', 'Alçı · Mat', 'Metal Boyası', 'Reçine · Cila', 'Krom Kaplama', 'Altın Varak · Alçı', 'Reçine · Pigment'][i],
  category: ['Duvar Sanatı', 'Duvar Sanatı', 'Duvar Sanatı', 'Heykel', 'Heykel', 'Duvar Sanatı', 'Lamba', 'Duvar Sanatı', 'Duvar Sanatı'][i],
  src:      `https://picsum.photos/seed/kol${i + 1}/600/700`,
  alt:      `${['Kızıl Akış', 'Altın Kıvrım', 'Siyah Dalgalar', 'Beyaz Form', 'Turuncu Katman', 'Bordo Oval', 'Krom Lamba', 'Altın Beyaz', 'Gece Mavisi'][i]} — el yapımı lüks sanat eseri, Malkoç Dizayn`,
}));

export default function KoleksiyonPage() {
  return (
    <div className="pt-28 min-h-screen" style={{ background: 'var(--black)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb — SEO */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 text-[11px] tracking-wider" style={{ color: 'var(--white-muted)' }}>
            <li><Link href="/" className="hover:text-[#C9A84C] transition-colors">Anasayfa</Link></li>
            <li style={{ color: 'var(--gold)' }}>›</li>
            <li style={{ color: 'var(--white)' }}>Koleksiyon</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-16">
          <span className="block font-script text-2xl mb-3" style={{ fontFamily: 'var(--font-great-vibes)', color: 'var(--gold)' }}>
            Tüm Eserler
          </span>
          <h1 className="text-5xl md:text-6xl font-light" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--white)' }}>
            Koleksiyon
          </h1>
          <span className="gold-line mx-auto mt-5 block" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {works.map((work) => (
            <article key={work.slug}>
              <Link href={`/koleksiyon/${work.slug}`} className="group block">
                <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '6/7', background: 'var(--black-card)' }}>
                  <Image
                    src={work.src}
                    alt={work.alt}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center" style={{ background: 'rgba(10,10,10,0.45)' }}>
                    <span className="px-5 py-2 text-[10px] tracking-[0.22em] uppercase" style={{ border: '1px solid rgba(201,168,76,0.70)', color: 'var(--gold)', background: 'rgba(10,10,10,0.80)' }}>İncele</span>
                  </div>
                </div>
                <h2 className="text-xl font-light mb-1" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--white)' }}>{work.title}</h2>
                <p className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--gold)' }}>{work.material}</p>
                <p className="text-[10px] tracking-wider mt-0.5" style={{ color: 'var(--white-muted)' }}>{work.category}</p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
