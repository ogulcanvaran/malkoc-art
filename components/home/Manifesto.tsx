'use client';

import Image from 'next/image';
import { studyoImages } from '@/lib/images';

const photo = studyoImages.find(i => i.featured) ?? studyoImages[0];

export function Manifesto() {
  return (
    <section aria-label="Marka Manifestosu" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <style>{`
        .manifesto-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 480px;
        }
        @media (max-width: 767px) {
          .manifesto-grid { grid-template-columns: 1fr; }
          .manifesto-photo { aspect-ratio: 4/3; position: relative; }
        }
      `}</style>

      <div className="manifesto-grid">
        {/* Sol — metin */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 5vw, 5rem)' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.30em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '1.75rem' }}>
            Felsefemiz
          </p>

          <blockquote style={{ margin: 0, padding: 0 }}>
            <p style={{
              fontFamily:  'var(--font-display)',
              fontSize:    'clamp(1.6rem, 3vw, 2.6rem)',
              fontWeight:  300,
              color:       'var(--text)',
              lineHeight:  1.3,
              marginBottom: '1.5rem',
            }}>
              Her mekân bir hikâye anlatır.
            </p>

            <p style={{ fontSize: 'clamp(14px, 1.4vw, 16px)', lineHeight: 1.85, color: 'var(--text-2)', marginBottom: '0.75rem' }}>
              Biz duvarları yalnızca kaplamıyor,
            </p>
            <p style={{
              fontFamily: 'var(--font-script)',
              fontSize:   'clamp(1.2rem, 2vw, 1.6rem)',
              color:      'var(--gold)',
              lineHeight: 1.4,
              marginBottom: '2rem',
            }}>
              sanat ile karakter kazandırıyoruz.
            </p>
          </blockquote>

          <div style={{ height: '1px', width: '48px', background: 'var(--gold)', opacity: 0.5, marginBottom: '1.75rem' }} />

          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'var(--text-2)', maxWidth: '440px' }}>
            İstanbul atölyemizde doğan her eser, tasarımdan uygulamaya kadar ustalarımızın elinden geçer. Reçine, metal varak ve özel pigmentlerle şekillenen bu eserler; konut, otel ve kurumsal mekânlara kalıcı bir kimlik kazandırır.
          </p>
        </div>

        {/* Sağ — atölye fotoğrafı */}
        <div className="manifesto-photo" style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width:767px) 100vw, 50vw"
            className="object-cover"
            style={{ transition: 'transform 1.4s cubic-bezier(0.16,1,0.3,1)' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, transparent 60%, var(--bg) 100%)' }} />

          {/* Atölye rozeti */}
          <div style={{
            position:   'absolute',
            bottom:     'clamp(1.5rem, 4vw, 2.5rem)',
            right:      'clamp(1.5rem, 4vw, 2.5rem)',
            padding:    '0.75rem 1.25rem',
            background: 'rgba(10,9,7,0.72)',
            backdropFilter: 'blur(10px)',
            border:     '1px solid rgba(201,168,76,0.25)',
          }}>
            <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.55)', marginBottom: '0.2rem' }}>
              İstanbul Atölyesi
            </p>
            <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.1rem', color: '#C9A84C' }}>
              Malkoç Design
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
