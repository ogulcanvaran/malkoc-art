'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { duvarSanatiImages, heykelImages, ozelUretimImages, studyoImages } from '@/lib/images';

const stories = [
  { label: 'Duvar Sanatı', href: '/koleksiyon/duvar-sanati', img: duvarSanatiImages[3] },
  { label: 'Heykeller',    href: '/koleksiyon/heykeller',    img: heykelImages[0] },
  { label: 'Lambalar',     href: '/koleksiyon/lambalar',     img: studyoImages[0] },
  { label: 'Özel Üretim',  href: '/koleksiyon/ozel-uretim', img: ozelUretimImages[0] },
];

type Story = typeof stories[number];

export function CollectionStories() {
  const [active, setActive] = useState<Story | null>(null);

  const open  = (s: Story) => { setActive(s); document.body.style.overflow = 'hidden'; };
  const close = ()          => { setActive(null); document.body.style.overflow = ''; };

  return (
    <>
      <style>{`
        @keyframes divider-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .story-divider {
          display: block;
          margin: 0 auto;
          margin-top: clamp(1.2rem, 3vw, 2rem);
          width: clamp(280px, 70vw, 360px);
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #C9A84C 20%,
            #F5DC80 50%,
            #C9A84C 80%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: divider-shimmer 5s ease-in-out infinite;
          clip-path: polygon(6px 0%, calc(100% - 6px) 0%, 100% 50%, calc(100% - 6px) 100%, 6px 100%, 0% 50%);
        }
        @keyframes story-spin {
          to { transform: rotate(360deg); }
        }
        .story-track {
          display: flex;
          gap: clamp(0.75rem, 2vw, 1.5rem);
          padding-inline: clamp(1.5rem, 6vw, 4rem);
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          justify-content: center;
        }
        .story-track::-webkit-scrollbar { display: none; }
        @media (max-width: 520px) {
          .story-track {
            justify-content: flex-start;
            padding-inline-start: 20px;
          }
        }
        .story-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.65rem;
          text-decoration: none;
          flex-shrink: 0;
          scroll-snap-align: start;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }
        .story-wrap {
          position: relative;
          border-radius: 50%;
          width: clamp(74px, 9vw, 96px);
          height: clamp(74px, 9vw, 96px);
        }
        .story-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            #C9A84C 0%,
            #F5DC80 20%,
            #E8C85A 40%,
            rgba(201,168,76,0.08) 60%,
            #C9A84C 80%,
            #F5DC80 100%
          );
          animation: story-spin 3.5s linear infinite;
        }
        .story-item:hover .story-wrap::before {
          animation-duration: 1.6s;
        }
        .story-inner {
          position: absolute;
          inset: 3px;
          border-radius: 50%;
          background: var(--bg);
          overflow: hidden;
        }
        .story-label {
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-2);
          font-weight: 600;
          text-align: center;
          transition: color 0.25s ease;
          white-space: nowrap;
        }
        .story-item:hover .story-label {
          color: var(--gold);
        }

        /* Lightbox */
        @keyframes lb-in {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        .story-lb-backdrop {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(10,9,7,0.92);
          backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          padding: 2rem;
        }
        .story-lb-img {
          position: relative;
          width: min(88vw, 420px);
          aspect-ratio: 3/4;
          border-radius: 4px;
          overflow: hidden;
          animation: lb-in 0.3s cubic-bezier(0.16,1,0.3,1);
          border: 1px solid rgba(201,168,76,0.25);
        }
        .story-lb-close {
          position: absolute;
          top: 1.2rem;
          right: 1.2rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.35);
          background: rgba(10,9,7,0.70);
          color: #C9A84C;
          font-size: 18px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.2s;
        }
        .story-lb-close:hover { background: rgba(201,168,76,0.15); }
      `}</style>

      <section
        aria-label="Koleksiyonlar"
        style={{ paddingTop: '0.75rem', paddingBottom: '0.5rem', background: 'var(--bg)' }}
      >
        <div className="story-track">
          {stories.map(s => (
            <button key={s.href} className="story-item" onClick={() => open(s)}>
              <div className="story-wrap">
                <div className="story-inner">
                  <Image src={s.img.src} alt={s.img.alt} fill sizes="96px" className="object-cover" />
                </div>
              </div>
              <span className="story-label">{s.label}</span>
            </button>
          ))}
        </div>

        <span className="story-divider" aria-hidden="true" />
      </section>

      {/* Lightbox */}
      {active && (
        <div className="story-lb-backdrop" onClick={close}>
          <button className="story-lb-close" onClick={close} aria-label="Kapat">✕</button>
          <div className="story-lb-img" onClick={e => e.stopPropagation()}>
            <Image src={active.img.src} alt={active.img.alt} fill sizes="420px" className="object-cover" />
          </div>
          <Link
            href={active.href}
            onClick={close}
            style={{
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#C9A84C',
              border: '1px solid rgba(201,168,76,0.40)',
              padding: '0.7rem 2rem',
              borderRadius: '999px',
              transition: 'background 0.25s',
              textDecoration: 'none',
            }}
          >
            Koleksiyona Git →
          </Link>
        </div>
      )}
    </>
  );
}
