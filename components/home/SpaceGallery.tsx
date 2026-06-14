'use client';

import { useState } from 'react';
import Image from 'next/image';
import { images } from '@/lib/images';

const tabs = [
  { key: 'tumu',     label: 'Tümü' },
  { key: 'salon',    label: 'Salon' },
  { key: 'villa',    label: 'Villa' },
  { key: 'lobby',    label: 'Lobby' },
  { key: 'ofis',     label: 'Ofis' },
  { key: 'restoran', label: 'Restoran' },
] as const;

type TabKey = typeof tabs[number]['key'];

const mekanImages = images.filter(i => i.mekan);

export function SpaceGallery() {
  const [active, setActive] = useState<TabKey>('tumu');
  const [lightbox, setLightbox] = useState<typeof images[0] | null>(null);

  const filtered = active === 'tumu'
    ? mekanImages
    : mekanImages.filter(i => i.mekan === active);

  return (
    <section aria-label="Tamamlanmış Mekânlar" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: 'clamp(3rem, 7vw, 6rem) 0' }}>
      <style>{`
        .sg-tabs {
          display: flex;
          gap: 0;
          border-bottom: 1px solid var(--border);
          margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .sg-tabs::-webkit-scrollbar { display: none; }
        .sg-tab {
          padding: 0.65rem 1.4rem;
          font-size: 10px;
          letter-spacing: 0.20em;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: var(--text-3);
          transition: color 0.2s, border-color 0.2s;
          white-space: nowrap;
          margin-bottom: -1px;
        }
        .sg-tab:hover { color: var(--text); }
        .sg-tab.active { color: var(--gold); border-bottom-color: var(--gold); }
        .sg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(0.5rem, 1.5vw, 1rem);
        }
        @media (max-width: 767px) {
          .sg-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .sg-item {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          cursor: pointer;
        }
        .sg-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0);
          transition: background 0.3s;
          display: flex;
          align-items: flex-end;
          padding: 1rem;
        }
        .sg-item:hover .sg-overlay {
          background: rgba(0,0,0,0.38);
        }
        .sg-tag {
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          font-weight: 600;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.25s, transform 0.25s;
        }
        .sg-item:hover .sg-tag {
          opacity: 1;
          transform: translateY(0);
        }
        /* Lightbox */
        .sg-lb {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(10,9,7,0.94);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .sg-lb-img {
          position: relative;
          width: min(90vw, 860px);
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        .sg-lb-close {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.4);
          background: rgba(10,9,7,0.7);
          color: #C9A84C;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
        }
      `}</style>

      <div className="site-container">
        {/* Başlık */}
        <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.30em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '0.5rem' }}>
            Referans Projeler
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 300, color: 'var(--text)', lineHeight: 1.2 }}>
            Tamamlanmış Mekânlar
          </h2>
        </div>

        {/* Tab bar */}
        <div className="sg-tabs" role="tablist">
          {tabs.map(t => (
            <button
              key={t.key}
              role="tab"
              aria-selected={active === t.key}
              className={`sg-tab${active === t.key ? ' active' : ''}`}
              onClick={() => setActive(t.key)}
            >
              {t.label}
              {t.key !== 'tumu' && (
                <span style={{ marginLeft: '0.35rem', fontSize: '8px', opacity: 0.6 }}>
                  ({mekanImages.filter(i => i.mekan === t.key).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p style={{ fontSize: '13px', color: 'var(--text-3)', padding: '3rem 0', textAlign: 'center' }}>
            Bu kategoride henüz proje eklenmedi.
          </p>
        ) : (
          <div className="sg-grid">
            {filtered.map((img, i) => (
              <div key={i} className="sg-item" onClick={() => setLightbox(img)}>
                <Image src={img.src} alt={img.alt} fill sizes="(max-width:767px) 50vw, 33vw" className="object-cover" style={{ transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div className="sg-overlay">
                  <span className="sg-tag">{tabs.find(t => t.key === img.mekan)?.label}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="sg-lb" onClick={() => setLightbox(null)}>
          <button className="sg-lb-close" onClick={() => setLightbox(null)} aria-label="Kapat">✕</button>
          <div className="sg-lb-img" onClick={e => e.stopPropagation()}>
            <Image src={lightbox.src} alt={lightbox.alt} fill sizes="90vw" className="object-cover" />
          </div>
        </div>
      )}
    </section>
  );
}
