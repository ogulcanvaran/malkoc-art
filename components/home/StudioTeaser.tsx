'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function StudioTeaser() {
  return (
    <section
      aria-label="Stüdyo hakkında"
      className="py-0 grid grid-cols-1 md:grid-cols-2 min-h-[560px]"
    >
      {/* Image side */}
      <div className="relative min-h-[360px] md:min-h-0 overflow-hidden">
        <Image
          src="https://picsum.photos/seed/studio1/900/700"
          alt="Malkoç Dizayn stüdyosu — el yapımı lüks sanat üretim süreci"
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.35)' }} />
      </div>

      {/* Text side */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease }}
        className="flex flex-col justify-center px-10 md:px-16 py-16"
        style={{ background: 'var(--black-surface)' }}
      >
        <span
          className="font-script text-2xl mb-4"
          style={{ fontFamily: 'var(--font-great-vibes)', color: 'var(--gold)' }}
        >
          Stüdyomuz
        </span>
        <h2
          className="text-4xl md:text-5xl font-light leading-tight mb-6"
          style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--white)' }}
        >
          Ellerin Yarattığı
          <br />
          <em style={{ color: 'var(--gold)' }}>Benzersiz Formlar</em>
        </h2>
        <span className="gold-line mb-8" />
        <p
          className="text-[15px] leading-relaxed mb-6"
          style={{ color: 'var(--white-muted)', fontFamily: 'var(--font-inter)' }}
        >
          Her eserimiz, hammaddeden son rötuşa kadar el emeğiyle şekillenir. Reçine, metal varak ve özel pigmentleri harmanlayarak lüks mekânlara ruh katan özgün parçalar üretiyoruz.
        </p>
        <p
          className="text-[15px] leading-relaxed mb-10"
          style={{ color: 'var(--white-muted)' }}
        >
          Organik dalgalardan soyut heykellere, tek renk monoformlardan altın-beyaz ikili kompozisyonlara uzanan koleksiyonumuz; sanat ve tasarımı bir arada sunar.
        </p>
        <Link
          href="/hakkimizda"
          className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase transition-colors duration-300 hover:text-[#C9A84C] self-start"
          style={{ color: 'var(--white-muted)' }}
        >
          Stüdyoyu Keşfet
          <span style={{ color: 'var(--gold)' }}>→</span>
        </Link>
      </motion.div>
    </section>
  );
}
