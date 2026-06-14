'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { images } from '@/lib/images';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const works = [
  { slug: 'organik-form',       title: 'Organik Form',        material: 'Reçine · Altın',    i: 0 },
  { slug: 'altin-kompozisyon',  title: 'Altın Kompozisyon',   material: 'Altın Varak · Alçı', i: 1 },
  { slug: 'asimetrik-form',     title: 'Asimetrik Form',      material: 'Reçine · Lak',       i: 2 },
  { slug: 'doku-calisma',       title: 'Doku Çalışması',      material: 'Metal · Pigment',    i: 3 },
  { slug: 'kabartma-panel',     title: 'Kabartma Panel',      material: 'Alçı · Boya',        i: 4 },
  { slug: 'ozel-uretim-eser',   title: 'Özel Üretim',         material: 'Reçine · Folyo',     i: 9 },
];

export function FeaturedWorks() {
  return (
    <section
      id="one-koleksiyon"
      aria-label="Öne çıkan eserler"
      style={{ background: 'var(--bg)', paddingBlock: 'clamp(4rem, 8vw, 8rem)' }}
    >
      <div className="site-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease }}
          className="flex flex-col items-center text-center mb-10 w-full"
        >
          <span className="mb-2 text-gold-gradient" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1.4rem, 2vw, 1.8rem)' }}>
            Seçkimiz
          </span>
          <h2 className="font-light leading-tight mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.8rem)', color: 'var(--text)' }}>
            Öne Çıkan Eserler
          </h2>
          <span className="gold-line" />
        </motion.div>

        {/* 3×2 grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {works.map((work, idx) => (
            <motion.article
              key={work.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease, delay: idx * 0.07 }}
            >
              <Link href={`/koleksiyon/${work.slug}`} className="group block">
                {/* Fotoğraf */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={images[work.i].src}
                    alt={images[work.i].alt}
                    fill
                    sizes="(max-width:768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    priority={idx < 2}
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'rgba(184,148,42,0.06)' }} />

                  {/* Hover badge — sadece desktop */}
                  <div className="hidden md:block absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                    <span className="flex items-center justify-center gap-1 text-[9px] tracking-[0.18em] uppercase font-medium" style={{ padding: '0.45rem 0.9rem', border: '1px solid rgba(201,168,76,0.65)', color: '#C9A84C', background: 'rgba(12,11,9,0.80)', whiteSpace: 'nowrap' }}>
                      İncele →
                    </span>
                  </div>

                  {/* Label — sadece desktop, foto üstünde */}
                  <div className="hidden md:block absolute bottom-0 left-0 right-0" style={{ background: 'linear-gradient(to top, rgba(12,11,9,0.80) 0%, transparent 100%)', padding: '1.8rem 1.2rem 1.1rem' }}>
                    <p className="text-[8px] tracking-[0.22em] uppercase font-semibold mb-1" style={{ color: '#C9A84C' }}>
                      {work.material}
                    </p>
                    <h3 className="font-semibold leading-tight" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', color: '#F5F0E8', letterSpacing: '0.02em' }}>
                      {work.title}
                    </h3>
                  </div>
                </div>

                {/* Label — sadece mobil, foto altında */}
                <div className="md:hidden" style={{ padding: '10px 2px 12px', borderBottom: '1px solid var(--border)' }}>
                  <p className="text-[9px] tracking-[0.22em] uppercase font-bold mb-1" style={{ color: 'var(--gold)' }}>
                    {work.material}
                  </p>
                  <h3 className="font-bold text-[14px] leading-tight" style={{ color: 'var(--text)' }}>
                    {work.title}
                  </h3>
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
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-10"
        >
          <Link
            href="/koleksiyon"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase transition-colors duration-300 group hover:text-[var(--gold)]"
            style={{ color: 'var(--text-2)' }}
          >
            Tüm Koleksiyonu Görüntüle
            <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--gold)' }}>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
