'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ozelUretimImages } from '@/lib/images';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const steps = [
  { n: '01', label: 'Konsept',  desc: 'Fikir ve ihtiyaç analizi' },
  { n: '02', label: 'Tasarım',  desc: 'Form ve malzeme seçimi' },
  { n: '03', label: 'Üretim',   desc: 'El işçiliği ile üretim' },
  { n: '04', label: 'Teslimat', desc: 'Kurulum ve montaj' },
];

export function BespokeSection() {
  const bgImg = ozelUretimImages[0];

  return (
    <section aria-label="Özel sipariş" className="relative overflow-hidden" style={{ paddingBlock: 'clamp(7rem, 14vw, 14rem)' }}>
      <Image src={bgImg.src} alt={bgImg.alt} fill className="object-cover" sizes="100vw" quality={85} />
      <div className="absolute inset-0" style={{ background: 'rgba(10,9,7,0.88)' }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, #C9A84C 50%, transparent 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, #C9A84C 50%, transparent 100%)' }} />

      {/* Tüm içerik tam merkezde */}
      <div className="relative w-full flex flex-col items-center px-6 sm:px-10 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease }}
          className="w-full text-center"
          style={{ maxWidth: '680px' }}
        >
          <span className="block mb-5 text-gold-gradient" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
            Özel Üretim
          </span>

          <h2 className="font-light leading-[1.12] mb-7" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: '#F5F0E8' }}>
            Mekânınıza Özel<br />
            <em style={{ color: '#C9A84C' }}>Benzersiz Eserler</em>
          </h2>

          <div className="flex justify-center mb-8">
            <span style={{ display: 'block', width: '56px', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
          </div>

          <p className="text-[15px] leading-[1.85] mb-14" style={{ color: 'rgba(245,240,232,0.78)' }}>
            Boyut, renk, malzeme ve form — her detayı sizinle birlikte tasarlıyoruz. Oturma odanızdan kurumsal lobi alanınıza kadar her mekâna özel, imzalı eserler.
          </p>

          {/* Süreç adımları — mobilde 2x2, masaüstünde 4x1 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 mb-10" style={{ border: '1px solid rgba(201,168,76,0.22)', background: 'rgba(10,9,7,0.60)' }}>
            {steps.map((step, i) => (
              <div
                key={step.n}
                className="flex flex-col items-center py-6 px-4"
                style={{
                  borderRight:  (i === 0 || i === 2) ? '1px solid rgba(201,168,76,0.22)' : 'none',
                  borderBottom: i < 2 ? '1px solid rgba(201,168,76,0.22)' : 'none',
                }}
              >
                <span className="font-light mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#C9A84C', lineHeight: 1 }}>
                  {step.n}
                </span>
                <span className="text-[10px] tracking-[0.18em] uppercase font-semibold mb-1" style={{ color: '#F5F0E8' }}>
                  {step.label}
                </span>
                <span className="text-[10px] leading-snug text-center" style={{ color: 'rgba(245,240,232,0.50)' }}>
                  {step.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Ayraç */}
          <div className="flex justify-center mb-10">
            <span style={{ display: 'block', width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(201,168,76,0.60), transparent)' }} />
          </div>

          {/* CTA butonlar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/ozel-siparis"
              className="btn-shimmer w-full sm:w-auto text-center text-[11px] tracking-[0.28em] uppercase font-semibold hover:brightness-110 transition-all duration-300"
              style={{ padding: '1.2rem 3.2rem', letterSpacing: '0.22em' }}
            >
              Proje Başlat →
            </Link>
            <Link
              href="/iletisim"
              className="w-full sm:w-auto text-center text-[11px] tracking-[0.22em] uppercase font-medium transition-all duration-300 hover:border-[rgba(201,168,76,0.70)] hover:text-[#C9A84C]"
              style={{ padding: '1.2rem 3.2rem', border: '1px solid rgba(245,240,232,0.40)', color: 'rgba(245,240,232,0.80)' }}
            >
              Bize Ulaşın
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
