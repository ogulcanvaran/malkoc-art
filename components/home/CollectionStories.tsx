'use client';

import Link from 'next/link';
import Image from 'next/image';
import { duvarSanatiImages, heykelImages, ozelUretimImages, studyoImages } from '@/lib/images';

const stories = [
  { label: 'Duvar Sanatı', href: '/koleksiyon/duvar-sanati', img: duvarSanatiImages[3] },
  { label: 'Heykeller',    href: '/koleksiyon/heykeller',    img: heykelImages[0] },
  { label: 'Lambalar',     href: '/koleksiyon/lambalar',     img: studyoImages[0] },
  { label: 'Özel Üretim',  href: '/koleksiyon/ozel-uretim', img: ozelUretimImages[0] },
];

export function CollectionStories() {
  return (
    <section
      aria-label="Koleksiyonlar"
      style={{ paddingBlock: 'clamp(2rem, 4vw, 3.5rem)', background: 'var(--bg)' }}
    >
      <style>{`
        @keyframes story-spin {
          to { transform: rotate(360deg); }
        }
        .story-track {
          display: flex;
          gap: clamp(1.5rem, 4vw, 3rem);
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
          .story-track { justify-content: flex-start; }
        }
        .story-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.65rem;
          text-decoration: none;
          flex-shrink: 0;
          scroll-snap-align: start;
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
      `}</style>

      <div className="story-track">
        {stories.map(s => (
          <Link key={s.href} href={s.href} className="story-item">
            <div className="story-wrap">
              <div className="story-inner">
                <Image
                  src={s.img.src}
                  alt={s.img.alt}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            </div>
            <span className="story-label">{s.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
