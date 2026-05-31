'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    title:   'Duvar Sanatı',
    sub:     'Organik form, premium yüzey',
    href:    '/koleksiyon/duvar-sanati',
    src:     'https://picsum.photos/seed/cat1/700/500',
    alt:     'Lüks duvar sanatı eserleri koleksiyonu — Malkoç Dizayn',
    span:    'md:col-span-2',
  },
  {
    title:   'Heykeller',
    sub:     'Üç boyutlu özgün formlar',
    href:    '/koleksiyon/heykeller',
    src:     'https://picsum.photos/seed/cat2/500/500',
    alt:     'Özgün heykel eserleri — Malkoç Dizayn',
    span:    'md:col-span-1',
  },
  {
    title:   'Lambalar',
    sub:     'Sanat & ışık bir arada',
    href:    '/koleksiyon/lambalar',
    src:     'https://picsum.photos/seed/cat3/500/500',
    alt:     'Dekoratif lüks lamba heykelleri — Malkoç Dizayn',
    span:    'md:col-span-1',
  },
  {
    title:   'Özel Üretim',
    sub:     'Sizin için tasarlandı',
    href:    '/koleksiyon/ozel-uretim',
    src:     'https://picsum.photos/seed/cat4/700/500',
    alt:     'Özel sipariş lüks sanat eseri üretimi — Malkoç Dizayn',
    span:    'md:col-span-2',
  },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Categories() {
  return (
    <section
      aria-label="Koleksiyon kategorileri"
      className="py-24"
      style={{ background: 'var(--black-surface)' }}
    >
      <div className="site-container">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col items-center text-center mb-16"
        >
          <span
            className="font-script text-2xl mb-3"
            style={{ fontFamily: 'var(--font-great-vibes)', color: 'var(--gold)' }}
          >
            Kategoriler
          </span>
          <h2
            className="text-5xl md:text-6xl font-light"
            style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--white)' }}
          >
            Koleksiyonlar
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.href}
              className={cat.span}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease, delay: i * 0.09 }}
            >
              <Link href={cat.href} className="group block relative overflow-hidden" style={{ aspectRatio: cat.span.includes('2') ? '16/8' : '1/1' }}>
                <Image
                  src={cat.src}
                  alt={cat.alt}
                  fill
                  sizes="(max-width:768px) 100vw, 66vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 transition-opacity duration-500" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.80) 0%, rgba(10,10,10,0.20) 60%, transparent 100%)' }} />
                {/* Gold hover tint */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: 'rgba(201,168,76,0.08)' }} />
                {/* Label */}
                <div className="absolute bottom-0 left-0 p-6">
                  <h3
                    className="text-3xl font-light mb-1"
                    style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--white)' }}
                  >
                    {cat.title}
                  </h3>
                  <p className="text-[11px] tracking-[0.15em] uppercase" style={{ color: 'rgba(201,168,76,0.80)' }}>
                    {cat.sub}
                  </p>
                </div>
                {/* Arrow */}
                <div
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                  style={{ border: '1px solid rgba(201,168,76,0.60)', color: 'var(--gold)' }}
                >
                  →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
