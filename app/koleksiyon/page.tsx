'use client';

// Metadata koleksiyon/layout.tsx'e taşındı — bu 'use client' page

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { images, type ImageItem } from '@/lib/images';

type Category = 'tumu' | 'duvar-sanati' | 'heykel' | 'lamba' | 'ozel-uretim';

const filters: { label: string; value: Category }[] = [
  { label: 'Tümü',         value: 'tumu' },
  { label: 'Duvar Sanatı', value: 'duvar-sanati' },
  { label: 'Heykeller',    value: 'heykel' },
  { label: 'Lambalar',     value: 'lamba' },
  { label: 'Özel Üretim',  value: 'ozel-uretim' },
];

const works = images.filter(i => i.category !== 'studyo' && i.category !== 'detay').map((img, i) => ({
  slug:     `eser-${i + 1}`,
  src:      img.src,
  alt:      img.alt,
  category: img.category,
  title:    [
    'Organik Form', 'Altın Kompozisyon', 'Derin Dalga', 'Siyah Asimetri', 'Krom Işık',
    'Beyaz Oval', 'Altın Spiral', 'Bronz Katman', 'Kızıl Akış', 'Gece Formu',
    'Mineral Doku', 'Soyut Yüzey', 'Premium Panel', 'Lüks Heykel', 'Dekoratif Form',
    'Özel Tasarım', 'El Yapımı', 'Stüdyo Eseri', 'Koleksiyon Parçası', 'Özgün Form',
  ][i % 20],
  material: [
    'Reçine · Altın Detay', 'Altın Varak · Alçı', 'Reçine · Lak', 'Metal · Siyah',
    'Krom · Cam', 'Alçı · Mat', 'Altın Varak', 'Bronz Kaplama', 'Reçine · Pigment',
    'Krom · Lak',
  ][i % 10],
  featured: img.featured,
}));

export default function KoleksiyonPage() {
  const [active,     setActive]   = useState<Category>('tumu');
  const [lightbox,   setLightbox] = useState<typeof works[0] | null>(null);

  const filtered = useMemo(
    () => active === 'tumu' ? works : works.filter(w => w.category === active),
    [active],
  );

  return (
    <div className="pt-28 min-h-screen" style={{ background: 'var(--black)' }}>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(8,7,5,0.96)', backdropFilter: 'blur(12px)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-[var(--taupe)] hover:text-[var(--gold)] transition-colors text-[22px]"
            aria-label="Kapat"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <div
            className="relative max-w-4xl w-full"
            style={{ maxHeight: '85vh', aspectRatio: '4/3' }}
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="font-light text-[1.2rem]" style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)' }}>
              {lightbox.title}
            </p>
            <p className="text-[10px] tracking-[0.18em] uppercase mt-1" style={{ color: 'var(--gold)' }}>
              {lightbox.material}
            </p>
            <Link
              href={`/koleksiyon/${lightbox.slug}`}
              className="mt-4 inline-flex items-center gap-2 text-[9px] tracking-[0.22em] uppercase transition-colors hover:text-[#C9A84C]"
              style={{ color: 'var(--taupe)' }}
              onClick={() => setLightbox(null)}
            >
              Detaylara Git →
            </Link>
          </div>
        </div>
      )}

      <div className="site-container">

        <div className="pt-10 pb-6">
          <Breadcrumb items={[{ label: 'Koleksiyon' }]} />
        </div>

        {/* Başlık */}
        <div className="text-center mb-12">
          <span
            className="block mb-3 text-gold-gradient"
            style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}
          >
            Tüm Eserler
          </span>
          <h1
            className="font-light mb-5"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 6vw, 5rem)', color: 'var(--cream)' }}
          >
            Koleksiyon
          </h1>
          <span className="gold-line mx-auto block" />
        </div>

        {/* Filtreler */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className="px-5 py-2.5 text-[10px] tracking-[0.20em] uppercase transition-all duration-300"
              style={{
                border:  '1px solid ' + (active === f.value ? '#C9A84C' : 'rgba(201,168,76,0.18)'),
                background: active === f.value ? 'rgba(201,168,76,0.10)' : 'transparent',
                color:   active === f.value ? '#C9A84C' : 'var(--taupe)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 mb-20">
          {filtered.map((work, i) => (
            <article
              key={work.slug + i}
              className="break-inside-avoid mb-4 group cursor-pointer"
              onClick={() => setLightbox(work)}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: [
                    '4/5', '3/4', '1/1', '4/5', '5/6',
                    '3/4', '4/5', '1/1', '5/6', '4/5',
                  ][i % 10],
                  background: 'var(--black-card)',
                }}
              >
                <Image
                  src={work.src}
                  alt={work.alt}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-center gap-2"
                  style={{ background: 'rgba(12,11,9,0.60)', backdropFilter: 'blur(2px)' }}
                >
                  <span
                    className="text-[9px] tracking-[0.22em] uppercase px-4 py-2"
                    style={{ border: '1px solid rgba(201,168,76,0.70)', color: 'var(--gold)', background: 'rgba(12,11,9,0.80)' }}
                  >
                    Büyüt
                  </span>
                  <Link
                    href={`/koleksiyon/${work.slug}`}
                    onClick={e => e.stopPropagation()}
                    className="text-[9px] tracking-[0.18em] uppercase transition-colors hover:text-[#C9A84C]"
                    style={{ color: 'rgba(245,240,232,0.60)' }}
                  >
                    Detay →
                  </Link>
                </div>
              </div>

              <div className="px-1 pt-3 pb-1">
                <h2
                  className="font-light mb-0.5"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'var(--cream)' }}
                >
                  {work.title}
                </h2>
                <p className="text-[9px] tracking-[0.15em] uppercase" style={{ color: 'var(--gold)' }}>
                  {work.material}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div
          className="text-center mb-20 py-14"
          style={{ border: '1px solid rgba(201,168,76,0.10)', background: 'var(--black-surface)' }}
        >
          <p className="text-[11px] tracking-[0.24em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
            Listede aradığınızı bulamadınız mı?
          </p>
          <p
            className="font-light mb-8"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'var(--cream)' }}
          >
            Mekânınıza Özel Üretim Yapalım
          </p>
          <Link
            href="/ozel-siparis"
            className="inline-flex items-center gap-2 text-[9px] tracking-[0.26em] uppercase font-semibold text-[#0C0B09] hover:brightness-110 hover:shadow-[0_0_28px_rgba(201,168,76,0.25)] transition-all duration-300"
            style={{ padding: '1rem 2.5rem', background: 'linear-gradient(135deg, #E8D49A 0%, #C9A84C 50%, #8A6E2C 100%)' }}
          >
            Özel Sipariş Ver →
          </Link>
        </div>
      </div>
    </div>
  );
}
