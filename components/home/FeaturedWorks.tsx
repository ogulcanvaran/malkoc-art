'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const works = [
  {
    slug:     'kirmizi-akis',
    title:    'Kızıl Akış',
    material: 'Reçine · Duvar Paneli',
    size:     '80 × 80 cm',
    src:      'https://picsum.photos/seed/malkoc1/800/900',
    alt:      'Kızıl akış organik reçine duvar sanatı eseri — Malkoç Dizayn',
  },
  {
    slug:     'altin-kivrım',
    title:    'Altın Kıvrım',
    material: 'Altın Varak · Alçı',
    size:     '100 × 120 cm',
    src:      'https://picsum.photos/seed/malkoc2/800/900',
    alt:      'Altın varak kıvrımlı lüks duvar sanatı — Malkoç Dizayn',
  },
  {
    slug:     'siyah-dalgalar',
    title:    'Siyah Dalgalar',
    material: 'Reçine · Lak',
    size:     '90 × 90 cm',
    src:      'https://picsum.photos/seed/malkoc3/800/900',
    alt:      'Parlak siyah dalgalı reçine duvar heykeli — Malkoç Dizayn',
  },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function FeaturedWorks() {
  return (
    <section
      id="one-koleksiyon"
      aria-label="Öne çıkan eserler"
      className="py-28 px-6"
      style={{ background: 'var(--black)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          className="flex flex-col items-center text-center mb-20"
        >
          <span
            className="font-script text-2xl mb-3"
            style={{ fontFamily: 'var(--font-great-vibes)', color: 'var(--gold)' }}
          >
            Seçkimiz
          </span>
          <h2
            className="text-5xl md:text-6xl font-light leading-tight mb-5"
            style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--white)' }}
          >
            Öne Çıkan Eserler
          </h2>
          <span className="gold-line" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {works.map((work, i) => (
            <motion.article
              key={work.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease, delay: i * 0.12 }}
            >
              <Link href={`/koleksiyon/${work.slug}`} className="group block">
                {/* Image */}
                <div
                  className="relative overflow-hidden mb-5"
                  style={{ aspectRatio: '8/9', background: 'var(--black-card)' }}
                >
                  <Image
                    src={work.src}
                    alt={work.alt}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gold overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'rgba(201,168,76,0.06)' }}
                  />
                  {/* View label */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                      className="px-5 py-2 text-[10px] tracking-[0.22em] uppercase"
                      style={{ border: '1px solid rgba(201,168,76,0.70)', color: 'var(--gold)', background: 'rgba(10,10,10,0.75)' }}
                    >
                      İncele
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <h3
                    className="text-2xl font-light"
                    style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--white)' }}
                  >
                    {work.title}
                  </h3>
                  <p className="text-[11px] tracking-[0.15em] uppercase" style={{ color: 'var(--gold)' }}>
                    {work.material}
                  </p>
                  <p className="text-[11px] tracking-wider" style={{ color: 'var(--white-muted)' }}>
                    {work.size}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/koleksiyon"
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase transition-colors duration-300 hover:text-[#C9A84C]"
            style={{ color: 'var(--white-muted)' }}
          >
            Tüm Koleksiyonu Görüntüle
            <span style={{ color: 'var(--gold)' }}>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
