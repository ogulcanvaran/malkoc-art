'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { studyoImages } from '@/lib/images';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function StudioTeaser() {
  const img = studyoImages[1] ?? studyoImages[0];

  return (
    <section
      aria-label="Stüdyo hakkında"
      className="grid grid-cols-1 md:grid-cols-2"
      style={{ minHeight: 'clamp(480px, 60vw, 640px)' }}
    >
      {/* Görsel tarafı */}
      <div className="relative overflow-hidden" style={{ minHeight: '360px' }}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(12,11,9,0.30)' }} />

        {/* Sayaç overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 grid grid-cols-3"
          style={{ background: 'rgba(12,11,9,0.75)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(201,168,76,0.12)' }}
        >
          {[
            { n: '500+', label: 'Tamamlanan Eser' },
            { n: '8+',   label: 'Yıl Deneyim' },
            { n: '100%', label: 'El Yapımı' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center text-center py-4"
              style={{ borderRight: i < 2 ? '1px solid rgba(201,168,76,0.10)' : 'none' }}
            >
              <span
                className="font-light text-[#C9A84C]"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}
              >
                {stat.n}
              </span>
              <span className="text-[9px] tracking-[0.18em] uppercase mt-0.5" style={{ color: 'rgba(245,240,232,0.40)' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Metin tarafı */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease }}
        className="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-16"
        style={{ background: 'var(--bg)' }}
      >
        <span
          className="mb-4 text-gold-gradient"
          style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}
        >
          Stüdyomuz
        </span>
        <h2
          className="font-light leading-tight mb-5"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', color: 'var(--text)' }}
        >
          Ellerin Yarattığı<br />
          <em style={{ color: 'var(--gold)' }}>Benzersiz Formlar</em>
        </h2>
        <span className="gold-line mb-7" />
        <p className="text-[14px] leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>
          Her eserimiz, hammaddeden son rötuşa kadar el emeğiyle şekillenir. Reçine, metal varak ve özel pigmentleri harmanlayarak lüks mekânlara ruh katan özgün parçalar üretiyoruz.
        </p>
        <p className="text-[14px] leading-relaxed mb-10" style={{ color: 'var(--text-2)' }}>
          Soyut dalgalardan asimetrik heykellere, monokrom formlara uzanan koleksiyonumuz sanat ve tasarımı bir arada sunar.
        </p>

        {/* Mini galeri */}
        <div className="flex gap-2 mb-10">
          {studyoImages.slice(0, 3).map((img, i) => (
            <div key={i} className="relative flex-1 overflow-hidden" style={{ aspectRatio: '1/1' }}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="15vw"
                className="object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>

        <Link
          href="/hakkimizda"
          className="inline-flex items-center gap-3 text-[10px] tracking-[0.24em] uppercase transition-colors duration-300 group hover:text-[#C9A84C] self-start"
          style={{ color: 'var(--text-2)' }}
        >
          Stüdyoyu Keşfet
          <span className="text-[#C9A84C] transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </motion.div>
    </section>
  );
}
