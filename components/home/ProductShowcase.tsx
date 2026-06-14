'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { images } from '@/lib/images';

type Product = {
  title:    string;
  material: string;
  href:     string;
  imgs:     { src: string; alt: string }[];
};

const products: Product[] = [
  {
    title:    'Organik Form',
    material: 'Reçine · Altın Detay',
    href:     '/koleksiyon/organik-form',
    imgs:     [images[0], images[1], images[2]],
  },
  {
    title:    'Asimetrik Heykel',
    material: 'Reçine · Lak · Metal',
    href:     '/koleksiyon/asimetrik-heykel',
    imgs:     [images[9], images[18], images[19]],
  },
  {
    title:    'Kabartma Panel',
    material: 'Alçı · Pigment · Boya',
    href:     '/koleksiyon/kabartma-panel',
    imgs:     [images[3], images[4], images[5]],
  },
  {
    title:    'Özel Üretim Eser',
    material: 'Reçine · Folyo · Metal',
    href:     '/koleksiyon/ozel-uretim-eser',
    imgs:     [images[11], images[12], images[13]],
  },
];

function ProductCard({ product }: { product: Product }) {
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  /* Desktop: mouse pozisyonuna göre foto değiştir */
  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, width } = cardRef.current.getBoundingClientRect();
    const zone = Math.floor(((e.clientX - left) / width) * 3);
    setIdx(Math.min(zone, product.imgs.length - 1));
  };

  /* Mobil: tap ile sonraki/önceki foto */
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!cardRef.current) return;
    const { left, width } = cardRef.current.getBoundingClientRect();
    const x = e.changedTouches[0].clientX - left;
    if (x < width / 2) {
      setIdx(i => (i - 1 + product.imgs.length) % product.imgs.length);
    } else {
      setIdx(i => (i + 1) % product.imgs.length);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Foto alanı */}
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setIdx(0); setHovered(false); }}
        onTouchEnd={onTouchEnd}
        style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--bg-card)', cursor: 'crosshair' }}
      >
        {product.imgs.map((img, i) => (
          <Image
            key={i}
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover"
            style={{
              opacity: idx === i ? 1 : 0,
              transition: 'opacity 0.25s ease',
              position: 'absolute',
              inset: 0,
            }}
            priority={i === 0}
          />
        ))}

        {/* Zone göstergesi — sadece desktop hover */}
        {hovered && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', pointerEvents: 'none' }}>
            {product.imgs.map((_, i) => (
              <div key={i} style={{ flex: 1, borderRight: i < product.imgs.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }} />
            ))}
          </div>
        )}

        {/* Dot indikatörler — mobilde her zaman, masaüstünde hover'da */}
        <div className="product-dots" style={{
          position: 'absolute', bottom: '10px', left: 0, right: 0,
          display: 'flex', justifyContent: 'center', gap: '5px',
          opacity: hovered ? 1 : undefined,
          transition: 'opacity 0.3s ease',
        }}>
          {product.imgs.map((_, i) => (
            <span key={i} style={{
              height: '3px',
              width: idx === i ? '18px' : '6px',
              borderRadius: '2px',
              background: idx === i ? '#C9A84C' : 'rgba(255,255,255,0.55)',
              transition: 'all 0.25s ease',
            }} />
          ))}
        </div>
      </div>

      {/* Bilgi */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minHeight: '72px', justifyContent: 'space-between' }} className="product-info">
        <div>
          <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '0.2rem' }}>
            {product.material}
          </p>
          <h3 style={{ fontSize: '15px', fontFamily: 'var(--font-display)', color: 'var(--text)', fontWeight: 500, letterSpacing: '0.02em', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {product.title}
          </h3>
        </div>
        <Link
          href={product.href}
          style={{
            fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--text-2)', fontWeight: 700,
            transition: 'color 0.2s ease', textDecoration: 'none',
            display: 'block', textAlign: 'right',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
        >
          Ürüne Git →
        </Link>
      </div>
    </div>
  );
}

export function ProductShowcase() {
  return (
    <section
      aria-label="Ürünler"
      style={{ background: 'var(--bg)', paddingTop: '0.75rem', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}
    >
      <style>{`
        /* Mobilde dotlar her zaman görünür, masaüstünde sadece hover'da */
        .product-dots { opacity: 1; }
        @media (hover: hover) {
          .product-dots { opacity: 0; }
        }
        /* Mobilde info alanı sıkıştır */
        @media (max-width: 767px) {
          .product-info { min-height: unset !important; gap: 0.25rem !important; }
        }
        /* Header — masaüstü: iki satır, mobil: tek satır */
        .showcase-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.15rem;
        }
        .showcase-script {
          font-family: var(--font-script), cursive;
          font-size: clamp(1.3rem, 1.8vw, 1.6rem);
          display: block;
        }
        .showcase-title {
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 5vw, 4rem);
          font-weight: 300;
          line-height: 1.1;
        }
        @media (max-width: 767px) {
          .showcase-header {
            flex-direction: row;
            align-items: baseline;
            justify-content: center;
            gap: 0.5rem;
          }
          .showcase-script {
            font-size: 1.9rem;
          }
          .showcase-title {
            font-size: 1.15rem;
            font-weight: 400;
            letter-spacing: 0.06em;
          }
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(0.75rem, 2vw, 1.5rem);
        }
        @media (min-width: 768px) {
          .product-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
      <div className="site-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          {/* Mobil: tek satır — Masaüstü: iki satır */}
          <div className="showcase-header">
            <span className="showcase-script text-gold-gradient">Koleksiyondan</span>
            <h2 className="showcase-title" style={{ color: 'var(--text)' }}>Seçili Eserler</h2>
          </div>
          <span className="gold-line" style={{ margin: '0.6rem auto 0' }} />
        </div>

        {/* Grid */}
        <div className="product-grid">
          {products.map(p => <ProductCard key={p.href} product={p} />)}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <Link
            href="/koleksiyon"
            style={{
              fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase',
              color: 'var(--text-2)', textDecoration: 'none', display: 'inline-flex',
              alignItems: 'center', gap: '0.5rem', transition: 'color 0.25s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
          >
            Tüm Koleksiyonu Görüntüle
            <span style={{ color: 'var(--gold)' }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
