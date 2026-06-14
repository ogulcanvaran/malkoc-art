'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { homeCategories } from '@/lib/images';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Categories() {
  return (
    <section
      aria-label="Koleksiyon kategorileri"
      style={{ background: 'var(--bg-surface)', paddingBlock: 'clamp(5rem, 10vw, 9rem)' }}
    >
      <div className="site-container">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          className="flex flex-col items-center text-center mb-12"
        >
          <span
            className="mb-3 text-gold-gradient"
            style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}
          >
            Kategoriler
          </span>
          <h2
            className="font-light"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)', color: 'var(--text)' }}
          >
            Koleksiyonlar
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {homeCategories.map((cat, i) => {
            const colSpan = cat.wide ? 'sm:col-span-2 md:col-span-2' : 'md:col-span-1';
            const aspect  = cat.wide ? '16/9' : '3/4';

            return (
              <motion.div
                key={cat.href}
                className={colSpan}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease, delay: i * 0.08 }}
              >
                <Link
                  href={cat.href}
                  className="group block relative overflow-hidden"
                  style={{ aspectRatio: aspect }}
                >
                  <Image
                    src={cat.src}
                    alt={cat.alt}
                    fill
                    sizes={cat.wide
                      ? '(max-width:640px) 100vw, (max-width:768px) 100vw, 66vw'
                      : '(max-width:640px) 100vw, (max-width:768px) 50vw, 33vw'
                    }
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(12,11,9,0.85) 0%, rgba(12,11,9,0.12) 55%, transparent 100%)' }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: 'rgba(184,148,42,0.05)' }}
                  />
                  <div className="absolute bottom-0 left-0 p-5 md:p-6">
                    <h3
                      className="font-light mb-1"
                      style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#F5F0E8' }}
                    >
                      {cat.title}
                    </h3>
                    <p className="text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgba(201,168,76,0.80)' }}>
                      {cat.sub}
                    </p>
                  </div>
                  <div
                    className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 text-sm"
                    style={{ border: '1px solid rgba(201,168,76,0.55)', color: '#C9A84C', background: 'rgba(12,11,9,0.70)' }}
                  >
                    →
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
