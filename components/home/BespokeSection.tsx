'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function BespokeSection() {
  return (
    <section
      aria-label="Özel sipariş"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="https://picsum.photos/seed/bespoke1/1600/700"
        alt="Özel sipariş lüks sanat eseri — Malkoç Dizayn"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.78)' }} />

      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease }}
        className="relative max-w-3xl mx-auto text-center"
      >
        <span
          className="font-script text-3xl mb-4 block"
          style={{ fontFamily: 'var(--font-great-vibes)', color: 'var(--gold)' }}
        >
          Özel Üretim
        </span>
        <h2
          className="text-5xl md:text-7xl font-light leading-tight mb-6"
          style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--white)' }}
        >
          Mekânınıza Özel
          <br />
          <em style={{ color: 'var(--gold)' }}>Benzersiz Eserler</em>
        </h2>
        <div className="flex justify-center mb-8">
          <span className="gold-line" style={{ width: '64px' }} />
        </div>
        <p
          className="text-[16px] leading-relaxed mb-12 max-w-xl mx-auto"
          style={{ color: 'var(--white-muted)' }}
        >
          Boyut, renk, malzeme ve form — her detayı sizinle birlikte tasarlıyoruz. Oturma odanızdan kurumsal lobi alanınıza kadar her mekâna özel, imzalı eserler üretiyoruz.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/ozel-siparis"
            className="px-10 py-4 text-[11px] tracking-[0.22em] uppercase font-medium transition-all duration-300 hover:bg-[#C9A84C] hover:text-black"
            style={{ background: 'var(--gold)', color: 'var(--black)' }}
          >
            Proje Başlat
          </Link>
          <Link
            href="/iletisim"
            className="px-10 py-4 text-[11px] tracking-[0.22em] uppercase transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C]"
            style={{ border: '1px solid rgba(245,245,240,0.25)', color: 'var(--white-muted)' }}
          >
            Bize Ulaşın
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
